import Head from 'next/head';
import useApodPage from './useApodPage';

const ApodPage = () => {
  const { data, error, status } = useApodPage();

  return (
    <div className='h-screen'>
      <Head>
        <title>Astronomy Picture of the Day | NASA API Explorer</title>
      </Head>
      <div className='container p-4 pt-20 mx-auto sm:px-8 lg:pt-10'>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : status === 'error' ? (
          <p>{error.message}</p>
        ) : (
          <div className='grid lg:grid-cols-2 lg:gap-4'>
            {data?.media_type === 'video' ? (
              <div className='relative h-0 aspect-h-9 aspect-w-16'>
                <iframe
                  src={data?.url}
                  title={data?.title}
                  width='560'
                  height='349'
                  className='absolute top-0 left-0 w-full h-full rounded-t-lg lg:rounded-lg'
                  frameBorder='0'
                  allowFullScreen
                />
              </div>
            ) : (
              <a href={data?.hdurl} className='cursor-zoom-in'>
                <img
                  src={data?.url}
                  alt={data?.title}
                  className='rounded-t-lg lg:rounded-lg'
                />
              </a>
            )}

            <div className='p-4 bg-black rounded-b-lg sm:p-8 lg:rounded-lg'>
              <p className='pt-2 text-primary lg:pt-0'>{data?.date}</p>
              <h1 className='py-2 text-4xl font-medium text-gray-200 glow'>
                {data?.title}
              </h1>
              {data?.copyright ? (
                <h2 className='text-lg text-gray-400'>{`Credit: ${data.copyright}`}</h2>
              ) : null}
              <p className='pt-2 text-xl leading-relaxed text-gray-300'>
                {data?.explanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApodPage;
