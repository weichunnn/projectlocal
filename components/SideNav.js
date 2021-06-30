import { Box, Flex, Stack, Button, Icon, Link } from '@chakra-ui/react';
import { FaHome, FaBookmark, FaSearch } from 'react-icons/fa';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import Filters from '@/components/Filters';

const Navigator = ({ href, icon, text }) => {
  const router = useRouter();
  const currentRoute = router.route;
  return (
    <NextLink href={href} passHref>
      <Link style={{ textDecoration: 'none' }}>
        <Button
          justifyContent="flex-start"
          leftIcon={<Icon as={icon} />}
          w="full"
          colorScheme="teal"
          variant={currentRoute == href ? 'solid' : 'ghost'}
        >
          {text}
        </Button>
      </Link>
    </NextLink>
  );
};

const PageLink = () => {
  return (
    <Stack spacing="2" w="full" my="4">
      <Navigator href="/" icon={FaHome} text="Home" />
      <Navigator href="/discover" icon={FaSearch} text="Discover" />
      <Navigator href="/favourites" icon={FaBookmark} text="Favourites" />
    </Stack>
  );
};

export default function SideNav() {
  return (
    <Box
      pos="fixed"
      top="75px"
      maxW="18rem"
      w="full"
      h="full"
      bg="white"
      borderRightWidth="1px"
      py="4"
      px="8"
    >
      <Flex direction="column" align="center">
        <PageLink />
        <Filters />
      </Flex>
    </Box>
  );
}
