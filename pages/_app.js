import { ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from '../lib/auth';
import { SearchProvider } from '../lib/search';

import customTheme from '../styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <SearchProvider>
          <Component {...pageProps} />
        </SearchProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
