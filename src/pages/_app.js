import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';

import { MoralisProvider } from "react-moralis";

import { defaults } from 'react-chartjs-2';
defaults.font.family = theme.typography.fontFamily;

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          Real Vision Pro Crypto NFT
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <MoralisProvider appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID} serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </LocalizationProvider>
      </MoralisProvider>
    </CacheProvider>
  );
};

export default App;
