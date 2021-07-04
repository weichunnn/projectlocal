import { Box, Text, Heading, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import Lottie from 'react-lottie';
import animationData from '../public/static/launch.json';

export default function EmptyPersonalBusiness() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData
  };

  return (
    <Box w="full" align="center" maxW="500" m="auto" mt="8">
      <Lottie options={defaultOptions} height={250} width={350} />
      <Heading size="md" mt="4" mb="2">
        Launch yourself onto Project Local.
      </Heading>
      <Text>
        What are you still waiting? Join others in growing Project Local into a
        one stop - for Malaysian by Malaysian - platform.
      </Text>
      <NextLink href="add-business" passHref>
        <Button mt="4" colorScheme="teal" variant="solid">
          Add Business
        </Button>
      </NextLink>
    </Box>
  );
}
