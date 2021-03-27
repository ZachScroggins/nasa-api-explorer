import { GetServerSideProps, GetStaticProps } from 'next';
import Head from 'next/head';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import Results from 'components/images/Results';
import Search from 'components/images/Search';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const fetchImages = async ({ queryKey }) => {
  const [_key, query] = queryKey;
  const res = await fetch(`/api/images?q=${query}`);
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json?.message);
  }
  return res.json();
};

export default function images({ data, error }) {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.q || 'Supernova');

  const { isLoading, isError, data: other, error: err } = useQuery(
    ['images', query],
    fetchImages
  );

  useEffect(() => {
    if (router.query.q && router.query.q !== query) {
      setQuery(router.query.q);
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Images | NASA API Explorer</title>
      </Head>
      <div className='flex min-h-screen overflow-hidden'>
        <div className='flex flex-col flex-1 overflow-hidden'>
          <Search setQuery={setQuery} />
          <Results
            data={other}
            isLoading={isLoading}
            isError={isError}
            error={err}
          />
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async context => {
  const queryClient = new QueryClient();

  const query = 'Supernova';

  await queryClient.prefetchQuery(['images', query], async ({ queryKey }) => {
    const [_key, query] = queryKey;
    const res = await fetch(
      `https://images-api.nasa.gov/search?q=${query}&media_type=image`
    );
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
