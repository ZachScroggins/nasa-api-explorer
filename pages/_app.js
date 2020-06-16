import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AnimatePresence } from 'framer-motion';
import theme from '../src/theme';
import Layout from '../src/components/Layout';
import ImageState from '../src/context/images/ImageState';

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const router = useRouter();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const handleExitComplete = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0 });
    }
  };

  console.log(router.route);

  return (
    <React.Fragment>
      <Head>
        <title>NASA API Explorer</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <ImageState>
            {/* <Component {...pageProps} /> */}
            <AnimatePresence
              exitBeforeEnter
              onExitComplete={handleExitComplete}
            >
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </ImageState>
        </Layout>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};
