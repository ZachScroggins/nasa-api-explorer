import Head from 'next/head';
import { EpicContent, ErrorContent, EpicSkeleton } from 'components/epic';
import useEpicPage from './useEpicPage';

const EpicPage = () => {
  const {
    router,
    setTypeQuery,
    setDateQuery,
    prevData,
    data,
    error,
    isFetching,
    status,
  } = useEpicPage();

  return (
    <div className='min-h-screen'>
      <div>
        <Head>
          <title>Earth Polychromatic Imaging Camera | NASA API Explorer</title>
        </Head>
        <div className='container grid grid-cols-1 p-4 pt-20 mx-auto 2xl:px-10 lg:pt-10 lg:grid-cols-2 lg:gap-4'>
          {status === 'loading' ? (
            <EpicSkeleton />
          ) : status === 'error' ? (
            <ErrorContent
              error={error}
              isFetching={isFetching}
              prevData={prevData}
              router={router}
              setDateQuery={setDateQuery}
              setTypeQuery={setTypeQuery}
            />
          ) : (
            <EpicContent
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
};

export default EpicPage;
