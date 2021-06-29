import {
  Box,
  Badge,
  Image,
  Stack,
  Text,
  Center,
  Spinner
} from '@chakra-ui/react';

export default function BusinessCard({
  name,
  categories,
  shortDesc,
  location,
  image
}) {
  return (
    <Box maxW="xs" boxShadow="xl" borderRadius="xl" overflow="hidden">
      <Image
        src={image}
        alt={image}
        w="full"
        maxH="200px"
        fit="fill"
        fallback={
          <Center h="full">
            <Spinner />
          </Center>
        }
      />
      <Box py="6" px="4">
        <Stack direction="row" spacing="4">
          {categories.map((category) => (
            <Badge key={category} px="2" colorScheme="teal">
              {category}
            </Badge>
          ))}
        </Stack>
        <Text mt="2" fontWeight="medium" as="h2" fontSize="xl">
          {name}
        </Text>
        <Text fontSize="xs">Location: {location}</Text>
        <Text mt="1" fontWeight="normal" fontSize="sm">
          {shortDesc}
        </Text>
      </Box>
    </Box>
  );
}
