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
  Divider
} from '@chakra-ui/react';
import { FaHeart, FaBookmark } from 'react-icons/fa';

import NextLink from 'next/link';

import Header from '@/components/Header';
import Carousel from '@/components/Carousel';

export default function Site() {
  const imageUrls = [
    'https://firebasestorage.googleapis.com/v0/b/projectlocal-e450c.appspot.com/o/images%2Fcarpe-diem.jpeg?alt=media&token=a7733093-23af-48c4-b8ce-8bfaec574001',
    'https://firebasestorage.googleapis.com/v0/b/projectlocal-e450c.appspot.com/o/images%2Fcape-diem-2.jpeg?alt=media&token=e2124665-0190-4240-85d4-e49c4403fe7a',
    'https://firebasestorage.googleapis.com/v0/b/projectlocal-e450c.appspot.com/o/images%2Fcape-diem-3.jpeg?alt=media&token=156319a1-04b4-4714-9bac-c73047ac1fcb'
  ];

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
              <BreadcrumbLink>Cape Diem</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex direction="column">
            <Flex mt="8" align="center" justify="space-between">
              <Flex align="center">
                <Avatar
                  mr="8"
                  size="xl"
                  src="https://firebasestorage.googleapis.com/v0/b/projectlocal-e450c.appspot.com/o/images%2Fcarpe-diem.jpeg?alt=media&token=a7733093-23af-48c4-b8ce-8bfaec574001"
                />
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
              <Carousel imageUrls={imageUrls} />
            </Box>
            <Box>
              <Heading size="lg">Our Beginning and Story</Heading>
              <Flex align="start" justify="space-between" mt="4">
                <Text w="65%" align="justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Hac habitasse platea dictumst quisque sagittis. Amet mauris
                  commodo quis imperdiet massa tincidunt. Et netus et malesuada
                  fames. Nisl condimentum id venenatis a condimentum vitae
                  sapien. Cursus eget nunc scelerisque viverra mauris in
                  aliquam. In nibh mauris cursus mattis molestie a. Sed arcu non
                  odio euismod lacinia at quis risus. Sed adipiscing diam donec
                  adipiscing tristique risus nec. Tincidunt tortor aliquam nulla
                  facilisi cras. Sed nisi lacus sed viverra tellus in hac
                  habitasse. Sociis natoque penatibus et magnis dis parturient
                  montes. Eget gravida cum sociis natoque penatibus et magnis
                  dis parturient. Scelerisque purus semper eget duis at. Nisi
                  porta lorem mollis aliquam. Pharetra et ultrices neque ornare
                  aenean. Nunc sed augue lacus viverra vitae congue eu consequat
                  ac. Lacus suspendisse faucibus interdum posuere lorem ipsum
                  dolor sit amet. In fermentum posuere urna nec tincidunt.
                  Mauris commodo quis imperdiet massa tincidunt nunc pulvinar
                  sapien et. Porttitor lacus luctus accumsan tortor posuere ac
                  ut consequat. Tincidunt tortor aliquam nulla facilisi cras.
                  Sed nisi lacus sed viverra tellus in hac habitasse. Sociis
                  natoque penatibus et magnis dis parturient montes. Eget
                  gravida cum sociis natoque penatibus et magnis dis parturient.
                  Scelerisque purus semper eget duis at. Nisi porta lorem mollis
                  aliquam. Pharetra et ultrices neque ornare aenean. Nunc sed
                  augue lacus viverra vitae congue eu consequat ac. Lacus
                  suspendisse faucibus interdum posuere lorem ipsum dolor sit
                  amet. In fermentum posuere urna nec tincidunt. Mauris commodo
                  quis imperdiet massa tincidunt nunc pulvinar sapien et.
                  Porttitor lacus luctus accumsan tortor posuere ac ut
                  consequat.
                </Text>
                <Stack direction="column" w="25%">
                  <Button colorScheme="teal" variant="solid">
                    More Info
                  </Button>
                  <Text fontSize="sm">
                    Suite 3-7 685, Menara Oval Damansara, Jalan Damansara, Bukit
                    Kiara, 60000 Kuala Lumpur, Federal Territory of Kuala Lumpur
                  </Text>
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
