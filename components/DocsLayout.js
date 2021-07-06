import { Box, Flex, useColorMode } from '@chakra-ui/react';

import Header from './Header';
import Footer from './Footer';

export default function DocsLayout({ children }) {
  const { colorMode } = useColorMode();
  const bg = { light: 'gray.100', dark: 'gray.800' };

  return (
    <Box bg={bg[colorMode]} minH="100vh" overflow="auto">
      <Header />
      <Box mt="75px" mb="4" minH="calc(100vh - 75px - 75px)">
        <Box maxW="750px" p="8" mx="auto">
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
