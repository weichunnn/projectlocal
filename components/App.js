import { Box, Flex } from '@chakra-ui/react';

import Header from './Header';
import SideNav from './SideNav';

export default function App({ children }) {
  return (
    <Box bg="gray.100">
      <Header />
      <Flex w="full" minHeight="calc(100vh - 75px)">
        <SideNav />
        <Box flex="1" py="4" px="8">
          {children}
        </Box>
      </Flex>
    </Box>
  );
}
