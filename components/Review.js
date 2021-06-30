import { Box, Heading, Text, Divider } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

export default function Review({ author, createdAt, text }) {
  return (
    <Box w="65%" my="4">
      <Heading size="sm" fontWeight="medium">
        {author}
      </Heading>
      <Text color="gray.500" mb="4" fontSize="xs">
        {format(parseISO(createdAt), 'PPpp')}
      </Text>
      <Text mb="4" fontSize="sm" style={{ whiteSpace: 'pre-wrap' }}>
        {text}
      </Text>
      <Divider borderColor="gray" w="85%" margin="auto" />
    </Box>
  );
}
