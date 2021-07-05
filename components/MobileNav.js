import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  useDisclosure,
  Box,
  Stack
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import HeaderButtons from './HeaderButtons';
import SearchBar from './SearchBar';
import SideNav from './SideNav';

const useRouteChanged = (callback) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (err, url) => {
      callback();
      console.log('App is changing to: ', url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, callback]);
};

export default function MobileNav(props) {
  const { isOpen, onToggle, onClose } = useDisclosure();

  useRouteChanged(onClose);

  return (
    <Box {...props}>
      <IconButton variant="ghost" icon={<HamburgerIcon />} onClick={onToggle} />
      <Drawer size="xs" isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton pos="absolute" zIndex="5" />
          <DrawerBody>
            <Box mt="12" px="4">
              <SearchBar showSearch={true} my="8" />
              <Stack direction="column" spacing="4">
                <HeaderButtons />
              </Stack>
              <SideNav pos="relative" pt="4" />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
