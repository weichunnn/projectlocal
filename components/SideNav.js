import { Box, Flex, Stack, Button, Icon } from '@chakra-ui/react';
import { FaHome, FaBookmark, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';

import Filters from '@/components/Filters';
import { withAuthModal } from './AuthModal';
import { useAuth } from '@/lib/auth';

const Navigator = ({ href, icon, text, openAuthModal }) => {
  const { user } = useAuth();
  const router = useRouter();
  const currentRoute = router.route;

  return (
    <Button
      as="a"
      justifyContent="flex-start"
      leftIcon={<Icon as={icon} />}
      w="full"
      colorScheme="teal"
      variant={currentRoute == href ? 'solid' : 'ghost'}
      onClick={
        user
          ? () => router.push(href)
          : openAuthModal
          ? openAuthModal
          : () => router.push(href)
      }
    >
      {text}
    </Button>
  );
};

const PageLink = ({ openAuthModal }) => {
  return (
    <Stack spacing="2" w="full" my="4">
      <Navigator href="/" icon={FaHome} text="Home" />
      <Navigator href="/discover" icon={FaSearch} text="Discover" />
      <Navigator
        href="/favourites"
        icon={FaBookmark}
        text="Favourites"
        openAuthModal={openAuthModal}
      />
    </Stack>
  );
};

const SideNav = ({ openAuthModal }) => {
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
        <PageLink openAuthModal={openAuthModal} />
        <Filters />
      </Flex>
    </Box>
  );
};

export default withAuthModal(SideNav);
