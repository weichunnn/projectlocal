import {
  Box,
  Flex,
  Link,
  Stack,
  IconButton,
  useColorMode
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

import Logo from './Logo';
import MobileNav from './MobileNav';
import SearchBar from './SearchBar';
import HeaderButtons from './HeaderButtons';

export default function Header({ withLogoName }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = { light: 'white', dark: 'gray.800' };

  return (
    <Box
      pos="fixed"
      w="full"
      h="75px"
      zIndex="1000"
      bg={bg[colorMode]}
      margin="0 auto"
      px="8"
      borderBottomWidth="1px"
    >
      <Flex align="center" justify="space-between" h="100%">
        <NextLink href="/" passHref>
          <Box as="a">
            <Logo boxSize="10" withLogoName={withLogoName} />
          </Box>
        </NextLink>
        <SearchBar mx="16" />
        <Flex align="center">
          <Stack
            direction="row"
            spacing="12"
            display={['none', null, 'inline-flex']}
          >
            <HeaderButtons />
          </Stack>
          <Stack direction="row" spacing="4" ml="8">
            <IconButton
              aria-label={`Switching to ${
                colorMode === 'light' ? 'dark' : 'light'
              } mode`}
              onClick={toggleColorMode}
              rounded="xl"
              icon={colorMode == 'light' ? <SunIcon /> : <MoonIcon />}
            />
            <MobileNav display={['block', null, 'none']} />
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
