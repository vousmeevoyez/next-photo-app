import { CacheProvider } from '@chakra-ui/next-js';
import {
  ChakraProvider,
  ColorModeScript,
  cookieStorageManager,
} from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import customTheme from '@/libs/styles/theme/index';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const rJson = await res.json();
    throw new Error(rJson.msg);
  }

  return res.json();
};

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SWRConfig
    value={{
      refreshInterval: 50000,
      fetcher,
    }}
  >
    <CacheProvider>
      <ColorModeScript
        initialColorMode={customTheme.config?.initialColorMode}
        type="cookie"
      />
      <ChakraProvider
        colorModeManager={cookieStorageManager}
        theme={customTheme}
      >
        <Component {...pageProps} />
      </ChakraProvider>
    </CacheProvider>
  </SWRConfig>
);

export default MyApp;
