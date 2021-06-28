import { Box, Text, Heading } from '@chakra-ui/react';
import Lottie from 'react-lottie';
import animationData from '../public/noresults.json';

export default function EmptyState() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Box align="center">
      <Lottie options={defaultOptions} height={250} width={250} />
      <Heading size="lg" mb="2">
        Oh no, we could not find your search.
      </Heading>
      <Text>
        Either this hasn't been added onto the platform or it's spelt
        differently.
      </Text>
    </Box>
  );
}
