import { GetServerSideProps } from 'next';
import Head from 'next/head';

export default function epic() {
  return (
    <div>
      <Head>
        <title>Earth Polychromatic Imaging Camera | NASA API Explorer</title>
      </Head>
      <p>epic</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {},
  };
};
