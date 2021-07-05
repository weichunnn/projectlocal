import { Button, useBreakpointValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '@/lib/auth';

export default function HeaderButtons({ openAuthModal }) {
  const router = useRouter();
  const { user, signout } = useAuth();
  const restrictDiscoverRoutes = ['/discover', '/favourites', '/personal'];

  const variant = useBreakpointValue({ base: 'outline', md: 'ghost' });
  const colorScheme = useBreakpointValue({ base: 'teal', md: 'black' });

  return user ? (
    <>
      {!restrictDiscoverRoutes.includes(router.route) && (
        <NextLink href="/discover" passHref>
          <Button
            as="a"
            colorScheme={colorScheme}
            variant={variant}
            px={[2, 4]}
          >
            Discover
          </Button>
        </NextLink>
      )}
      <NextLink href="/add-business" passHref>
        <Button as="a" colorScheme={colorScheme} variant={variant} px={[2, 4]}>
          Add a business
        </Button>
      </NextLink>
      <Button
        colorScheme={colorScheme}
        variant={variant}
        px={[2, 4]}
        onClick={() => signout()}
      >
        Sign Out
      </Button>
    </>
  ) : (
    <>
      <Button
        as="a"
        variant={variant}
        colorScheme={colorScheme}
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
  );
}
