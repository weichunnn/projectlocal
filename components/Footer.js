import { Flex, Stack, Link, Text, useColorMode } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Footer(props) {
  const { colorMode } = useColorMode();
  const bg = { light: 'white', dark: 'gray.800' };

  return (
    <Flex
      bg={bg[colorMode]}
      direction="row"
      bottom="0"
      w="full"
      minH="75px"
      px="8"
      align="center"
      justify="center"
      borderTopWidth="1px"
      {...props}
    >
      <Text display={['none', null, 'block']} mr="12">
        Made with ☕️ and ❤️ in Kuala Lumpur
      </Text>
      <NextLink href="/privacy" passHref>
        <Link fontSize="md" fontWeight="medium" mr="12">
          Privacy
        </Link>
      </NextLink>
      <NextLink href="/terms" passHref>
        <Link fontSize="md" fontWeight="medium">
          Terms
        </Link>
      </NextLink>
    </Flex>
  );
}
