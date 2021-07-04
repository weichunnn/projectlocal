import { Box, Text, Heading } from '@chakra-ui/react';
import Lottie from 'react-lottie';
import animationData from '../public/static/cow.json';

export default function EmptyState() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData
  };

  return (
    <Box w="full" align="center" maxW="500" m="auto" mt="8">
      <Lottie options={defaultOptions} height={250} width={350} />
      <Heading size="md" mb="2">
        Seems like you haven't had any favourites
      </Heading>
      <Text>
        Head over to the discover page and explore. Don't worry, we will keep
        the ones you favourited over here.
      </Text>
    </Box>
  );
}
