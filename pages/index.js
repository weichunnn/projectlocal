import { Box, Flex, Heading, Text, useColorMode } from '@chakra-ui/react';

import Logo from '@/components/Logo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const { colorMode } = useColorMode();
  const bg = { light: 'gray.100', dark: 'gray.800' };

  return (
    <Box bg={bg[colorMode]} minH="100vh" overflow="auto">
      <Header withLogoName={true} />
      <Flex
        mt="75px"
        minH="calc(100vh - 75px - 75px)"
        align="center"
        justify="center"
      >
        <Flex
          direction="column"
          maxW="750px"
          align="center"
          textAlign="center"
          p="8"
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
        </Flex>
      </Flex>
      <Footer />
    </Box>
  );
}
