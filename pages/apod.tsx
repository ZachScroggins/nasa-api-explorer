import { GetServerSideProps } from 'next';
import Head from 'next/head';

export default function apod() {
  return (
    <div className='h-screen'>
      <Head>
        <title>Astronomy Picture of the Day | NASA API Explorer</title>
      </Head>
      <p>apod</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {},
  };
};
