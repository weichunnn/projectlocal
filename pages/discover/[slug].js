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
  Divider,
  Link
} from '@chakra-ui/react';
import { FaHeart, FaBookmark } from 'react-icons/fa';
import NextLink from 'next/link';

import Header from '@/components/Header';
import Carousel from '@/components/Carousel';
import { getAllBusinesses, getBusiness } from '@/lib/db-admin';

export async function getStaticProps(context) {
  const businessId = context.params.slug;
  const { business } = await getBusiness(businessId);

  return {
    props: {
      business: business
    },
    revalidate: 3600
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
export default function Business({ business }) {
  const { name, carouselImages, longDesc, link, image, address } = business;

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
                  leftIcon={<Icon as={FaHeart} />}
                  colorScheme="teal"
                  variant="solid"
                  mr="8"
                >
                  Like
                </Button>
                <Button
                  leftIcon={<Icon as={FaBookmark} />}
                  colorScheme="teal"
                  variant="outline"
                >
                  Save
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
                <Stack direction="column" w="25%">
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
            <Box mt="8">
              <Heading size="lg">Comments and Reviews</Heading>
              <Box w="65%" mt="4">
                <Flex align="center">
                  <Heading size="sm" fontWeight="medium">
                    Jack Septic
                  </Heading>
                </Flex>
                <Text color="gray.500" mb="4" fontSize="xs">
                  15th January 2018
                </Text>
                <Text mb="4" fontSize="sm">
                  lorem in fermentum posuere urna nec tincidunt. Mauris commodo
                  quis imperdiet massa tincidunt nunc pulvinar sapien et.
                  Porttitor lacus luctus accumsan tortor posuere ac ut
                  consequat.
                </Text>
                <Divider borderColor="gray.900" w="75%" m="0 auto" my="6" />
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
