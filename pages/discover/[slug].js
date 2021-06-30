import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Avatar,
  Button,
  Icon,
  Heading,
  Text,
  Stack,
  Link,
  FormControl,
  Textarea
} from '@chakra-ui/react';
import { FaHeart, FaBookmark } from 'react-icons/fa';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import useSWR, { mutate } from 'swr';
import { useForm } from 'react-hook-form';

import Header from '@/components/Header';
import Carousel from '@/components/Carousel';
import Review from '@/components/Review';
import { useAuth } from '@/lib/auth';
import {
  createReview,
  createBookmark,
  createLike,
  removeBookmark,
  removeLike
} from '@/lib/db';
import { getAllBusinesses, getAllReviews, getBusiness } from '@/lib/db-admin';
import fetcher from '@/utils/fetcher';

export async function getStaticProps(context) {
  const businessId = context.params.slug;
  const { business } = await getBusiness(businessId);
  const { reviews } = await getAllReviews(businessId);

  return {
    props: {
      business: business,
      initialReviews: reviews
    },
    revalidate: 60
  };
}

export async function getStaticPaths(context) {
  const { businesses } = await getAllBusinesses();

  const paths = businesses.map((business) => ({
    params: {
      slug: business.id.toString()
    }
  }));

  return {
    paths,
    fallback: false
  };
}

export default function Business({ business, initialReviews }) {
  const { user } = useAuth();
  const { name, carouselImages, longDesc, link, image, address } = business;

  const router = useRouter();
  const { slug } = router.query;
  const { data: reviewsData } = useSWR(`/api/reviews/${slug}`, fetcher, {
    initialReviews
  });
  const reviews = reviewsData?.reviews;

  const { data: preferencesData } = useSWR(
    user ? ['/api/preferences', user.token] : null,
    fetcher
  );
  const bookmarkedBusinessIds = preferencesData?.preferences.bookmarks;
  const isCurrentPageBookmarked = bookmarkedBusinessIds?.includes(slug);
  const likedBusinessIds = preferencesData?.preferences.likes;
  const isCurrentPageliked = likedBusinessIds?.includes(slug);

  const onBookmark = () => {
    if (isCurrentPageBookmarked) {
      removeBookmark(user.uid, slug);
      mutate(
        ['/api/preferences', user.token],
        {
          preferences: {
            ...preferencesData.preferences,
            bookmarks: bookmarkedBusinessIds.filter(
              (businessId) => businessId !== slug
            )
          }
        },
        false
      );
    } else {
      createBookmark(user.uid, slug);
      mutate(
        ['/api/preferences', user.token],
        {
          preferences: {
            ...preferencesData.preferences,
            bookmarks: [...bookmarkedBusinessIds, slug]
          }
        },
        false
      );
    }
  };

  const onLike = () => {
    if (isCurrentPageliked) {
      removeLike(user.uid, slug);
      mutate(
        ['/api/preferences', user.token],
        {
          preferences: {
            ...preferencesData.preferences,
            likes: likedBusinessIds.filter((businessId) => businessId !== slug)
          }
        },
        false
      );
    } else {
      createLike(user.uid, slug);
      mutate(
        ['/api/preferences', user.token],
        {
          preferences: {
            ...preferencesData.preferences,
            likes: [...likedBusinessIds, slug]
          }
        },
        false
      );
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data, e) => {
    const newReview = {
      author: user.name,
      authorId: user.uid,
      businessId: slug,
      createdAt: new Date().toISOString(),
      text: data.text
    };
    createReview(newReview);
    e.target.reset();
    mutate(
      `/api/reviews/${slug}`,
      {
        reviews: [newReview, ...reviews]
      },
      false
    );
  };

  return (
    <>
      <Header />
      <Box pt="75px">
        <Box px="24" py="8">
          <Breadcrumb>
            <BreadcrumbItem>
              <NextLink href="/" passHref>
                <BreadcrumbLink>Home</BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <NextLink href="/discover" passHref>
                <BreadcrumbLink>Discover</BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>{name}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex direction="column">
            <Flex mt="8" align="center" justify="space-between">
              <Flex align="center">
                <Avatar mr="8" size="xl" src={image} />
                <Heading size="xl">Cape Diem</Heading>
              </Flex>
              <Box>
                <Button
                  isDisabled={!user}
                  leftIcon={<Icon as={FaHeart} />}
                  colorScheme={isCurrentPageliked ? 'red' : 'teal'}
                  variant={isCurrentPageliked ? 'solid' : 'outline'}
                  mr="8"
                  onClick={onLike}
                >
                  {isCurrentPageliked ? 'Liked' : 'Like'}
                </Button>
                <Button
                  isDisabled={!user}
                  leftIcon={<Icon as={FaBookmark} />}
                  colorScheme="teal"
                  variant={isCurrentPageBookmarked ? 'solid' : 'outline'}
                  onClick={onBookmark}
                >
                  {isCurrentPageBookmarked ? 'Saved' : 'Save'}
                </Button>
              </Box>
            </Flex>
            <Box p="12">
              <Carousel imageUrls={carouselImages} />
            </Box>
            <Box>
              <Heading size="lg">Our Beginning and Story</Heading>
              <Flex align="start" justify="space-between" mt="4">
                <Text w="65%" align="justify">
                  {longDesc}
                </Text>
                <Stack direction="column" w="25%" spacing="8">
                  <Link
                    style={{ textDecoration: 'none' }}
                    isExternal
                    href={link}
                  >
                    <Button colorScheme="teal" variant="solid" w="full">
                      More Info
                    </Button>
                  </Link>
                  <Text fontSize="sm">{address}</Text>
                </Stack>
              </Flex>
            </Box>
            <Box my="8">
              <Heading size="lg">Comments and Reviews</Heading>
              <Box my="4" w="65%" as="form" onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                  <Textarea
                    placeholder="Leave a review"
                    isDisabled={!user}
                    {...register('text', {
                      required: 'Please write a review before submitting'
                    })}
                  ></Textarea>
                  <Flex justify="flex-end">
                    <Button
                      mt="4"
                      px="8"
                      type="submit"
                      colorScheme="teal"
                      _hover={{ bg: 'teal.300' }}
                      _active={{
                        bg: 'teal.300',
                        transform: 'scale(0.95)'
                      }}
                    >
                      Leave Review
                    </Button>
                  </Flex>
                  {errors.text && (
                    <Text pt="2" color="red.400">
                      {errors.text.message}
                    </Text>
                  )}
                </FormControl>
              </Box>
              {reviews?.map((review) => (
                <Review key={review.id} {...review} />
              ))}
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
