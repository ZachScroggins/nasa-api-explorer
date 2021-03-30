import Head from 'next/head';
import useImagesPage from './useImagesPage';
import { Results, Search } from 'components/images';

const ImagesPage = () => {
  const { setQuery, data, error, status } = useImagesPage();

  return (
    <>
      <Head>
        <title>Images | NASA API Explorer</title>
      </Head>
      <div className='flex min-h-screen overflow-hidden'>
        <div className='flex flex-col flex-1 overflow-hidden'>
          <Search setQuery={setQuery} />
          <Results data={data} status={status} error={error} />
        </div>
      </div>
    </>
  );
};

export default ImagesPage;
