import { ChakraProvider } from '@chakra-ui/react';
import { MDXProvider } from '@mdx-js/react';

import { AuthProvider } from '@/lib/auth';
import { SearchProvider } from '@/lib/search';
import MDXComponents from '@/components/MDXComponents';
import customTheme from '../styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <SearchProvider>
          <MDXProvider components={MDXComponents}>
            <Component {...pageProps} />
          </MDXProvider>
        </SearchProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
