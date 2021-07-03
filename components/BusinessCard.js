import {
  Box,
  Badge,
  Image,
  Text,
  LinkBox,
  LinkOverlay,
  Wrap,
  Flex
} from '@chakra-ui/react';
import NextLink from 'next/link';
import DeleteBusinessButton from './DeleteBusinessButton';

const badgeColors = {
  'Food & Beverage': 'teal',
  'Health & Beauty': 'red',
  Education: 'orange',
  active: 'green',
  pending: 'yellow'
};

export default function BusinessCard({
  id,
  name,
  categories,
  shortDesc,
  location,
  businessImage,
  status,
  editable
}) {
  return (
    <LinkBox maxW="xs" boxShadow="xl" borderRadius="xl" overflow="hidden">
      <Box pos="relative">
        <Image
          src={businessImage}
          alt={businessImage}
          w="full"
          h="200px"
          fit="cover"
          fallback={<Box bg="gray.300" h="full"></Box>}
        />
        {editable && (
          <Flex
            w="100%"
            pos="absolute"
            zIndex="5"
            top="0"
            pt="2"
            px="4"
            align="center"
            justify="space-between"
          >
            <Badge px="2" colorScheme={badgeColors[status]}>
              {status}
            </Badge>
            <DeleteBusinessButton businessId={id} status={status} />
          </Flex>
        )}
      </Box>
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
