import { Box, Flex, Link, Stack, IconButton } from '@chakra-ui/react';
import { MoonIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

import Logo from './Logo';
import MobileNav from './MobileNav';
import SearchBar from './SearchBar';
import HeaderButtons from './HeaderButtons';
import { withAuthModal } from './AuthModal';

const Header = ({ openAuthModal }) => {
  return (
    <Box
      pos="fixed"
      w="full"
      h="75px"
      zIndex="1000"
      bg="white"
      margin="0 auto"
      px="8"
      borderBottomWidth="1px"
    >
      <Flex align="center" justify="space-between" h="100%">
        <NextLink href="/" passHref>
          <Link>
            <Logo boxSize="10" />
          </Link>
        </NextLink>
        <SearchBar mx="16" />
        <Stack
          direction="row"
          spacing="12"
          display={['none', null, 'inline-flex']}
        >
          <HeaderButtons openAuthModal={openAuthModal} />
        </Stack>
        <Stack direction="row" spacing="4" ml="8">
          <IconButton rounded="xl" icon={<MoonIcon />} />
          <MobileNav display={['block', null, 'none']} />
        </Stack>
      </Flex>
    </Box>
  );
};

export default withAuthModal(Header);
