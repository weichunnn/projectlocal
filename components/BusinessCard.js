import { Box, Badge, Image, Stack, Text } from '@chakra-ui/react';

const property = {
  imageUrl: 'https://bit.ly/2Z4KKcF',
  imageAlt: 'Rear view of modern home with pool',
  title: 'Google',
  location: 'Kuala Lumpur'
};
export default function BusinessCard() {
  return (
    <Box
      maxW="xs"
      borderWidth="1px"
      borderRadius="xl"
      borderColor="red"
      overflow="hidden"
    >
      <Image
        src={property.imageUrl}
        alt={property.imageAlt}
        w="full"
        maxH="200px"
        fit="fill"
      />
      <Box py="6" px="4">
        <Stack direction="row" spacing="4">
          <Badge px="2" colorScheme="teal">
            New
          </Badge>
          <Badge px="2" colorScheme="teal">
            New
          </Badge>
        </Stack>
        <Text mt="2" fontWeight="medium" as="h2" fontSize="xl">
          {property.title}
        </Text>
        <Text fontWeight="medium" as="h2" fontSize="xs">
          Location: {property.location}
        </Text>
        <Text fontWeight="medium" as="h2" fontSize="sm">
          nisi vitae suscipit tellus mauris a diam maecenas sed enim ut sem
          viverra aliquet eget sit amet tellus cras adipiscing enim eu turpis
        </Text>
      </Box>
    </Box>
  );
}
