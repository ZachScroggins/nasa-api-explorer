import { ResultsSkeleton, ThumbnailCard } from 'components/images';
import { ImagesData } from 'types';

interface ResultsProps {
  data: ImagesData;
  status: 'error' | 'idle' | 'loading' | 'success';
  error: Error;
}

const Results = ({ data, status, error }: ResultsProps) => {
  return (
    <div
      className='relative flex-1 overflow-y-auto focus:outline-none'
      tabIndex={-1}
    >
      <div className='px-4 pt-40 pb-6 mx-auto lg:pt-20 xl:pb-8 max-w-screen-2xl'>
        {status === 'loading' ? (
          <ResultsSkeleton />
        ) : status === 'error' ? (
          <p>{error.message}</p>
        ) : (
          <ul className='relative grid flex-1 grid-cols-1 gap-6 p-1 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
            {data.collection.items.slice(0, 40).map(item => (
              <ThumbnailCard item={item} key={item.data[0].nasa_id} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Results;
