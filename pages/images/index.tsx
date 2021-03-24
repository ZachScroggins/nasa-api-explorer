import Results from 'components/images/Results';
import Search from 'components/images/Search';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

export default function images({ data, error }) {
  return (
    <>
      <Head>
        <title>Images | NASA API Explorer</title>
      </Head>
      <div className='flex min-h-screen overflow-hidden'>
        <div className='flex flex-col flex-1 overflow-hidden'>
          <Search />
          <Results data={data} error={error} />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context;
  let data = null;
  let error = null;
  const url = query.q
    ? `https://images-api.nasa.gov/search?q=${query.q}&media_type=image`
    : `https://images-api.nasa.gov/search?q=Supernova&media_type=image`;

  try {
    const res = await fetch(url);
    const json = await res.json();
    if (res.ok) {
      data = json.collection;
    } else {
      throw new Error(`Error ${res.status}: ${json?.reason}`);
    }
  } catch (e) {
    console.log(e.message);
    error = true;
  }

  return {
    props: { data, error },
  };
};
