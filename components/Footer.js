import { Stack, Link, useColorMode } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Footer(props) {
  const { colorMode } = useColorMode();
  const bg = { light: 'white', dark: 'gray.800' };

  return (
    <Stack
      bg={bg[colorMode]}
      direction="row"
      spacing="12"
      bottom="0"
      w="full"
      minH="75px"
      px="8"
      align="center"
      justify="center"
      borderTopWidth="1px"
      {...props}
    >
      <NextLink href="/privacy" passHref>
        <Link fontSize="md" fontWeight="medium">
          Privacy
        </Link>
      </NextLink>
      <NextLink href="/terms" passHref>
        <Link fontSize="md" fontWeight="medium">
          Terms
        </Link>
      </NextLink>
    </Stack>
  );
}
