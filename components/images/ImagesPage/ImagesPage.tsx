import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Results, Search } from 'components/images';

const fetchImages = async ({ queryKey }) => {
  const [_key, query] = queryKey;
  const res = await fetch(`/api/images?q=${query}`);
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json?.message);
  }
  return res.json();
};

const ImagesPage = () => {
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

  console.log(isLoading);

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
};

export default ImagesPage;
