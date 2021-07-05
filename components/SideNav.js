import { Box, Flex, Stack, Button, Icon } from '@chakra-ui/react';
import { FaHome, FaBookmark, FaSearch, FaUserAlt } from 'react-icons/fa';
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
      <Navigator
        href="/personal"
        icon={FaUserAlt}
        text="Personal"
        openAuthModal={openAuthModal}
      />
    </Stack>
  );
};

const SideNav = ({ openAuthModal, ...props }) => {
  return (
    <Box pos="fixed" maxW="18rem" w="full" h="full" bg="white" {...props}>
      <Flex direction="column">
        <PageLink openAuthModal={openAuthModal} />
        <Filters mt="8" />
      </Flex>
    </Box>
  );
};

export default withAuthModal(SideNav);
