import Head from 'next/head';
import useImageItemPage from './useImageItemPage';
import { ImageItemContent } from 'components/images';

const ImageItemPage = () => {
  const { data, status, error } = useImageItemPage();

  return (
    <>
      <Head>
        <title>
          Image {data?.items[0]?.data[0]?.nasa_id || ''} | NASA API Explorer
        </title>
      </Head>
      <div className='min-h-screen p-4 pt-20 lg:pt-10'>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : status === 'error' ? (
          <p>{error.message}</p>
        ) : !data.items.length || !data.images.href ? (
          <p>No results</p>
        ) : (
          <ImageItemContent data={data} />
        )}
      </div>
    </>
  );
};

export default ImageItemPage;
