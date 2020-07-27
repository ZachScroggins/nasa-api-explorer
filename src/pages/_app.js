import { useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import EpicState from '../context/epic/epicState';
import ImageState from '../context/images/ImageState';

import '../styles/index.css';
import 'react-calendar/dist/Calendar.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      document.cookie = 'visited=true; max-age=604800; samesite=strict';
    } else {
      document.cookie = 'visited=true; max-age=604800; samesite=strict; secure';
    }
  }, []);

  return (
    <>
      <Head>
        <title>NASA API Explorer</title>
      </Head>
      <Layout>
        <ImageState>
          <EpicState>
            <Component {...pageProps} />
          </EpicState>
        </ImageState>
      </Layout>
    </>
  );
}

export default MyApp;
