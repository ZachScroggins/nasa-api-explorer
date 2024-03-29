import Head from 'next/head';
import Image from 'next/image';
import useApodPage from './useApodPage';
import { ApodSkeleton } from 'components/apod';

const ApodPage = () => {
  const { data, error, status } = useApodPage();

  return (
    <div className='min-h-screen'>
      <Head>
        <title>Astronomy Picture of the Day | NASA API Explorer</title>
      </Head>
      <div className='container p-4 pt-20 mx-auto sm:px-8 lg:pt-10'>
        {status === 'loading' ? (
          <ApodSkeleton />
        ) : status === 'error' ? (
          <p>{error.message}</p>
        ) : (
          <div className='grid lg:grid-cols-2 lg:gap-4'>
            {data?.media_type === 'video' ? (
              <div className='relative h-[50vh] mb-4 lg:mb-0'>
                <iframe
                  src={data?.url}
                  title={data?.title}
                  width='560'
                  height='349'
                  className='absolute top-0 left-0 w-full rounded-t-lg lg:rounded-lg'
                  frameBorder='0'
                  allowFullScreen
                />
              </div>
            ) : (
              <div className='relative h-[50vh] rounded-lg mb-4 lg:mb-0 lg:h-auto focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-0 focus-within:ring-indigo-400'>
                <a
                  href={data?.hdurl}
                  className='rounded-lg lg:hidden focus:ring-0 focus:ring-offset-0 focus:ring-transparent'
                >
                  <Image
                    src={data?.url}
                    alt={data?.title}
                    className='object-contain object-center rounded-lg lg:object-top'
                    layout='fill'
                    priority={true}
                    loading='eager'
                    quality={100}
                  />
                </a>
                <div className='hidden lg:sticky lg:block lg:top-10'>
                  <a
                    href={data?.hdurl}
                    className='rounded-lg focus:ring-0 focus:ring-offset-0 focus:ring-transparent'
                  >
                    <img
                      src={data?.url}
                      alt={data?.title}
                      loading='eager'
                      className='rounded-lg'
                    />
                  </a>
                </div>
              </div>
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
