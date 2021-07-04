import { Center, Spinner } from '@chakra-ui/react';

export default function LoadingAppState() {
  return (
    <Center mt="24" w="full">
      <Spinner size="xl" speed="0.5s" />
    </Center>
  );
}
