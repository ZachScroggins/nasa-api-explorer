import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ImageSlider from 'components/epic/ImageSlider';
import Data from 'components/epic/Data';
import { useQuery } from 'react-query';

const Inner = ({ data, setTypeQuery, setDateQuery, isFetching }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <>
      <ImageSlider
        data={data?.items}
        type={data?.type}
        year={data?.items[currentIndex]?.date?.slice(0, 4)}
        month={data?.items[currentIndex]?.date?.slice(5, 7)}
        day={data?.items[currentIndex]?.date?.slice(8, 10)}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      <div>
        <Data
          data={data?.items}
          type={data?.type}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setTypeQuery={setTypeQuery}
          setDateQuery={setDateQuery}
          isFetching={isFetching}
        />
      </div>
    </>
  );
};

export default function epic() {
  const router = useRouter();
  const [typeQuery, setTypeQuery] = useState('');
  const [dateQuery, setDateQuery] = useState('');
  const [prevData, setPrevData] = useState(null);

  const { data, error, isFetching, status } = useQuery<any, Error>(
    ['epic', { typeQuery, dateQuery }],
    async ({ queryKey }) => {
      const [_key, { typeQuery, dateQuery }] = queryKey;
      const res = await fetch(
        `/api/epic${typeQuery && `?type=${typeQuery}`}${
          dateQuery && `&date=${dateQuery}`
        }`
      );
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json?.error);
      }
      return res.json();
    },
    {
      keepPreviousData: true,
      onSuccess: data => setPrevData(data),
    }
  );

  return (
    <div className='min-h-screen'>
      <div>
        <Head>
          <title>Earth Polychromatic Imaging Camera | NASA API Explorer</title>
        </Head>
        <div className='container grid grid-cols-1 p-4 pt-20 mx-auto 2xl:px-10 lg:pt-10 lg:grid-cols-2 lg:gap-4'>
          {status === 'loading' ? (
            <span>Loading...</span>
          ) : status === 'error' ? (
            <>
              <div className='row-start-2 p-4 mb-2 bg-red-100 rounded-md lg:row-start-1 lg:mb-0 lg:col-span-2'>
                <div className='flex'>
                  <div className='flex-shrink-0'>
                    <svg
                      className='w-5 h-5 text-red-400'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <div className='flex-1 ml-3 md:flex md:justify-between'>
                    <p className='text-sm text-red-700'>{error.message}</p>
                    <p className='mt-3 text-sm md:mt-0 md:ml-6'>
                      <button
                        type='button'
                        className='font-medium text-red-700 whitespace-nowrap hover:text-red-600'
                        onClick={() => router.reload()}
                      >
                        Reset <span aria-hidden='true'>→</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              {prevData && (
                <Inner
                  data={prevData}
                  setTypeQuery={setTypeQuery}
                  setDateQuery={setDateQuery}
                  isFetching={isFetching}
                />
              )}
            </>
          ) : (
            <Inner
              data={data}
              setTypeQuery={setTypeQuery}
              setDateQuery={setDateQuery}
              isFetching={isFetching}
            />
          )}
        </div>
      </div>
    </div>
  );
}
