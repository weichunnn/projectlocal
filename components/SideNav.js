import { Box, Flex } from '@chakra-ui/react';

import Filters from '@/components/Filters';

export default function SideNav() {
  return (
    <Box
      pos="fixed"
      top="75px"
      maxW="18rem"
      w="full"
      h="full"
      bg="white"
      borderRightWidth="1px"
      py="4"
      px="8"
    >
      <Flex direction="column" align="center">
        <Filters />
      </Flex>
    </Box>
  );
}
