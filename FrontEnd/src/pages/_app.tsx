// Data and Imports
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { FunctionComponent } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { EuiErrorBoundary } from '@elastic/eui';
import { Global } from '@emotion/react';
import Chrome from '../components/chrome';
import { Theme } from '../components/theme';
import { globalStyes } from '../styles/global.styles';
import Footer from './footer'

// --------

// building the page's actual composition and styling
// by returning a React component containing mostly EUI html
const EuiApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>NMT Schedule Building</title>
      <link rel="shortcut icon" href="/images/logo.ico" />
    </Head>

    <Global styles={globalStyes} />
    <Theme>
      <Chrome>
        <EuiErrorBoundary>
          <Component {...pageProps} />
        </EuiErrorBoundary>
      </Chrome>
      <Footer />
    </Theme>
  </>
);

// rendering contents for display
export default EuiApp;