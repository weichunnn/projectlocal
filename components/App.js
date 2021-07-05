import { Box } from '@chakra-ui/react';

import Header from './Header';
import SideNav from './SideNav';

export default function App({ children }) {
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
        <Box bg="gray.100" minHeight="calc(100vh - 75px)" py="4" px="8">
          {children}
        </Box>
      </Box>
    </>
  );
}
