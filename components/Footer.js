import { Flex, Link, useColorMode } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Footer(props) {
  const { colorMode } = useColorMode();
  const bg = { light: 'white', dark: 'gray.800' };

  return (
    <Flex
      bottom="0"
      bg={bg[colorMode]}
      w="full"
      py="4"
      align="center"
      justify="center"
      minH="75px"
      borderTopWidth="1px"
      {...props}
    >
      <NextLink href="/privacy" passHref>
        <Link fontSize="sm" mr={4} fontWeight="medium">
          Privacy
        </Link>
      </NextLink>
    </Flex>
  );
}
