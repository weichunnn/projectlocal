import {
  Box,
  Badge,
  Image,
  Text,
  LinkBox,
  LinkOverlay,
  Wrap
} from '@chakra-ui/react';
import NextLink from 'next/link';

const badgeColors = {
  'Food & Beverage': 'teal',
  'Health & Beauty': 'red',
  Education: 'orange'
};

export default function BusinessCard({
  id,
  name,
  categories,
  shortDesc,
  location,
  businessImage
}) {
  return (
    <LinkBox maxW="xs" boxShadow="xl" borderRadius="xl" overflow="hidden">
      <Image
        src={businessImage}
        alt={businessImage}
        w="full"
        h="200px"
        fit="cover"
        fallback={<Box bg="gray.300" h="full"></Box>}
      />
      <Box py="6" px="4">
        <Wrap direction="row" spacing="2" h="50px">
          {categories.map((category) => (
            <Badge key={category} px="2" colorScheme={badgeColors[category]}>
              {category}
            </Badge>
          ))}
        </Wrap>
        <NextLink href={`/discover/${id}`} passHref>
          <LinkOverlay>
            <Text mt="2" fontWeight="medium" as="h2" fontSize="xl">
              {name}
            </Text>
          </LinkOverlay>
        </NextLink>
        <Text fontSize="xs">
          <b>Location:</b> {location}
        </Text>
        <Text mt="1" fontWeight="normal" fontSize="sm">
          {shortDesc}
        </Text>
      </Box>
    </LinkBox>
  );
}
