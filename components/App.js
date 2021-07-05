import { Box, useColorMode } from '@chakra-ui/react';

import Header from './Header';
import SideNav from './SideNav';

export default function App({ children }) {
  const { colorMode } = useColorMode();
  const bg = { light: 'white', dark: 'gray.800' };

  return (
    <>
      <Header />
      <SideNav
        display={['none', null, 'block']}
        top="75px"
        py="4"
        px="8"
        borderRightWidth="1px"
      />
      <Box pl={['0', null, '18rem']} pt="75px">
        <Box
          bg={bg[colorMode]}
          minHeight="calc(100vh - 75px)"
          py="4"
          px="8"
          overflow="auto"
        >
          {children}
        </Box>
      </Box>
    </>
  );
}
