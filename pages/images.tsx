import { GetServerSideProps } from 'next';
import Head from 'next/head';

export default function images() {
  return (
    <div>
      <Head>
        <title>Images | NASA API Explorer</title>
      </Head>
      <p>images</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {},
  };
};
