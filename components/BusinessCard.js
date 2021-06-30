import {
  Box,
  Badge,
  Image,
  Stack,
  Text,
  Center,
  Spinner,
  LinkBox,
  LinkOverlay
} from '@chakra-ui/react';
import NextLink from 'next/link';

export default function BusinessCard({
  id,
  name,
  categories,
  shortDesc,
  location,
  image
}) {
  return (
    <LinkBox maxW="xs" boxShadow="xl" borderRadius="xl" overflow="hidden">
      <Image
        src={image}
        alt={image}
        w="full"
        maxH="200px"
        fit="fill"
        fallback={<Box bg="gray.300" h="full"></Box>}
      />
      <Box py="6" px="4">
        <Stack direction="row" spacing="4">
          {categories.map((category) => (
            <Badge key={category} px="2" colorScheme="teal">
              {category}
            </Badge>
          ))}
        </Stack>
        <NextLink href={`/discover/${id}`} passHref>
          <LinkOverlay>
            <Text mt="2" fontWeight="medium" as="h2" fontSize="xl">
              {name}
            </Text>
          </LinkOverlay>
        </NextLink>
        <Text fontSize="xs">Location: {location}</Text>
        <Text mt="1" fontWeight="normal" fontSize="sm">
          {shortDesc}
        </Text>
      </Box>
    </LinkBox>
  );
}
