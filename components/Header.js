import NextLink from 'next/link';
import { Box, Flex, Link, Stack, Button } from '@chakra-ui/react';

import Logo from './Logo';
import SearchBar from '@/components/SearchBar';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/auth';
import { withAuthModal } from './AuthModal';

const Header = ({ openAuthModal }) => {
  const { user, signout } = useAuth();
  const router = useRouter();
  const showSearchBarRoutes = ['/discover', '/favourites', '/personal'];
  const restrictDiscoverRoutes = ['/discover', '/favourites', '/personal'];

  const showSearchBar = showSearchBarRoutes.includes(router.route);

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
        {showSearchBar && <SearchBar />}
        <Stack direction="row" spacing={[2, 12]}>
          {user ? (
            <>
              {!restrictDiscoverRoutes.includes(router.route) && (
                <NextLink href="/discover" passHref>
                  <Button as="a" variant="ghost" px={[2, 4]}>
                    Discover
                  </Button>
                </NextLink>
              )}
              <NextLink href="/add-business" passHref>
                <Button as="a" variant="ghost" px={[2, 4]}>
                  Add a business
                </Button>
              </NextLink>
              <Button variant="ghost" px={[2, 4]} onClick={() => signout()}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                as="a"
                variant="ghost"
                px={[2, 4]}
                onClick={openAuthModal}
              >
                Sign In
              </Button>
              <NextLink href="/signup" passHref>
                <Button as="a" variant="solid" colorScheme="teal" px={[2, 4]}>
                  Sign Up
                </Button>
              </NextLink>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default withAuthModal(Header);
