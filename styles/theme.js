import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
};

const customTheme = extendTheme({
  ...config,
  fonts: {
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700
  }
});

export default customTheme;
