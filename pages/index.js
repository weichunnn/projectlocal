import NextLink from 'next/link';
import { Box, Button, Flex, Heading, Text, Link } from '@chakra-ui/react';

import { useAuth } from '../lib/auth';
import Logo from '@/components/Logo';

export default function Home() {
  const auth = useAuth();
  return (
    <Box bg="gray.100" h="100vh">
      <Flex
        bg="white"
        w="full"
        h="75px"
        px="8"
        align="center"
        justify="space-between"
      >
        <NextLink href="/" passHref>
          <Link>
            <Logo boxSize="10" />
          </Link>
        </NextLink>
        <Box>
          <NextLink href="/discover">
            <Button variant="ghost" px={[2, 4]}>
              Discover
            </Button>
          </NextLink>
          <NextLink href="/">
            <Button variant="ghost" px={[2, 4]}>
              Sign In
            </Button>
          </NextLink>
        </Box>
      </Flex>
      <Flex
        direction="column"
        maxW="750px"
        margin="0 auto"
        align="center"
        textAlign="center"
        pt="40"
        px="8"
      >
        <Logo boxSize="20" mb="4" />
        <Heading as="h1" fontWeight="bold" mb="8">
          Discover local businesses around you right now.
        </Heading>
        <Text opacity="0.7" fontSize="lg" mb="4">
          Project Local helps you discover and find local businesses. View
          interesting ventures created by fellow Malaysian and filter down to
          exactly what you're searching for.
        </Text>
        {auth.user ? (
          <Button colorScheme="teal" onClick={() => auth.signout()}>
            Sign Out
          </Button>
        ) : (
          <Button
            size="md"
            colorScheme="teal"
            isLoading={auth.loading}
            onClick={() => auth.signinWithGoogle()}
          >
            Get Started
          </Button>
        )}
      </Flex>
    </Box>
  );
}
