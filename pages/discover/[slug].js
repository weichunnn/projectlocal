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
  FormControl,
  FormErrorMessage,
  Textarea,
  Wrap,
  Link,
  useBreakpointValue
} from '@chakra-ui/react';
import {
  FaHeart,
  FaBookmark,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn
} from 'react-icons/fa';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import useSWR, { mutate } from 'swr';
import { useForm } from 'react-hook-form';

import Header from '@/components/Header';
import Carousel from '@/components/Carousel';
import Review from '@/components/Review';
import ContactLinkBox from '@/components/ContactLinkBox';
import { withAuthModal } from '@/components/AuthModal';
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

const Business = ({ openAuthModal, business, initialReviews }) => {
  const { user } = useAuth();
  const {
    name,
    carouselImages,
    story,
    primaryLink,
    businessImage,
    address,
    contactNumber,
    facebookLink,
    instagramLink,
    linkedinLink,
    whatsappLink
  } = business;

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

  const numberOfContactLinks = [
    facebookLink,
    instagramLink,
    linkedinLink,
    whatsappLink
  ].filter((link) => link.length).length;

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
    if (!user) {
      openAuthModal();
    } else {
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
    }
  };

  return (
    <>
      <Header />
      <Box pt="75px">
        <Box px={['8', null, '24']} py="8">
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
            <Flex
              direction={['column', null, 'row']}
              mt="8"
              align="center"
              justify="space-between"
            >
              <Flex align="center" w="full" justify="flex-start">
                <Avatar
                  mr="8"
                  size={useBreakpointValue({ base: 'lg', md: 'xl' })}
                  src={businessImage}
                />
                <Heading size={useBreakpointValue({ base: 'lg', md: 'xl' })}>
                  {name}
                </Heading>
              </Flex>
              <Flex direction="row" mt={['8', null, '0']}>
                <Button
                  leftIcon={<Icon as={FaHeart} />}
                  colorScheme={isCurrentPageliked ? 'red' : 'teal'}
                  variant={isCurrentPageliked ? 'solid' : 'outline'}
                  mr="8"
                  onClick={user ? onLike : openAuthModal}
                >
                  {isCurrentPageliked ? 'Liked' : 'Like'}
                </Button>
                <Button
                  leftIcon={<Icon as={FaBookmark} />}
                  colorScheme="teal"
                  variant={isCurrentPageBookmarked ? 'solid' : 'outline'}
                  onClick={user ? onBookmark : openAuthModal}
                >
                  {isCurrentPageBookmarked ? 'Saved' : 'Save'}
                </Button>
              </Flex>
            </Flex>
            {carouselImages.length != 0 && (
              <Box px={['4', null, '12']} mt="12">
                <Carousel imageUrls={carouselImages} />
              </Box>
            )}
            <Box mt="12">
              <Heading size="lg">Our Beginning and Story</Heading>
              <Flex
                direction={['column', null, 'row']}
                align="start"
                justify="space-between"
                mt="4"
              >
                <Text
                  w={['100%', null, '65%']}
                  align="justify"
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {story}
                </Text>
                <Stack
                  direction="column"
                  w={['100%', null, '25%']}
                  spacing="8"
                  mt={['8', null, '0']}
                >
                  {primaryLink && (
                    <Link
                      href={primaryLink}
                      isExternal
                      style={{ textDecoration: 'none' }}
                    >
                      <Button colorScheme="teal" variant="solid" w="full">
                        More Info
                      </Button>
                    </Link>
                  )}
                  {numberOfContactLinks && (
                    <Wrap
                      align="center"
                      justify={
                        numberOfContactLinks >= 3
                          ? 'space-between'
                          : numberOfContactLinks == 2
                          ? 'center'
                          : null
                      }
                      spacing="8"
                    >
                      {true && (
                        <ContactLinkBox
                          link={whatsappLink}
                          backgroundColor="#22D266"
                          icon={FaWhatsapp}
                        />
                      )}
                      {true && (
                        <ContactLinkBox
                          link={facebookLink}
                          backgroundColor="#3b5998"
                          icon={FaFacebookF}
                          color="white"
                        />
                      )}
                      {instagramLink && (
                        <ContactLinkBox
                          link={instagramLink}
                          style={{
                            background:
                              'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)'
                          }}
                          icon={FaInstagram}
                        />
                      )}
                      {linkedinLink && (
                        <ContactLinkBox
                          link={linkedinLink}
                          backgroundColor="#0077B5"
                          icon={FaLinkedinIn}
                          color="white"
                        />
                      )}
                    </Wrap>
                  )}
                  {address && (
                    <Box bg="cyan.200" p="4" fontSize="sm" rounded="xl">
                      <Text fontWeight="bold">Address</Text>
                      <Text>{address}</Text>
                    </Box>
                  )}
                  {contactNumber && (
                    <Box bg="red.200" p="4" fontSize="sm" rounded="xl">
                      <Text fontWeight="bold">Contact Number</Text>
                      <Text>{contactNumber}</Text>
                    </Box>
                  )}
                </Stack>
              </Flex>
            </Box>
            <Box my="8">
              <Heading size="lg">Comments and Reviews</Heading>
              <Box
                my="4"
                w={['100%', null, '65%']}
                as="form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <FormControl isInvalid={errors.text}>
                  <Textarea
                    placeholder="Leave a review"
                    {...register('text', {
                      required: 'Please write a review before submitting'
                    })}
                  />
                  <Flex mt="4" justify="space-between" align="center">
                    {errors.text ? (
                      <FormErrorMessage>{errors.text.message}</FormErrorMessage>
                    ) : (
                      <Box></Box>
                    )}
                    <Button
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
                </FormControl>
              </Box>
              {reviews?.map((review) => (
                <Box w={['100%', null, '65%']}>
                  <Review key={review.id} {...review} />
                </Box>
              ))}
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default withAuthModal(Business);
