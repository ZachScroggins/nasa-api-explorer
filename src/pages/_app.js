import Head from 'next/head';
import Layout from '../components/Layout';
import ImageState from '../context/images/ImageState';

import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>NASA API Explorer Tailwind</title>
      </Head>
      <Layout>
        <ImageState>
          <Component {...pageProps} />
        </ImageState>
      </Layout>
    </>
  );
}

export default MyApp;
