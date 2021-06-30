import { Box, Flex, Heading, Text, Divider } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

export default function Review({ author, createdAt, text }) {
  return (
    <Box w="65%" mt="4">
      <Flex align="center">
        <Heading size="sm" fontWeight="medium">
          {author}
        </Heading>
      </Flex>
      <Text color="gray.500" mb="4" fontSize="xs">
        {format(parseISO(createdAt), 'PPpp')}
      </Text>
      <Text mb="4" fontSize="sm">
        {text}
      </Text>
      <Divider borderColor="gray.900" m="0 auto" my="6" />
    </Box>
  );
}
