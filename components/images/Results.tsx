import Image from 'next/image';
import Link from 'next/link';

export default function Results({ data, isLoading, isError, error }) {
  if (isLoading) {
    return <p className='pt-40 lg:pt-20'>loading...</p>;
  }

  if (isError) {
    return (
      <div className='pt-40 lg:pt-20'>
        <p>{`${error}`}</p>
      </div>
    );
  }

  if (!data.collection.items.length) {
    return (
      <div className='pt-40 lg:pt-20'>
        <p>No results</p>
      </div>
    );
  }

  return (
    <div
      className='relative flex-1 overflow-y-auto focus:outline-none'
      tabIndex={-1}
    >
      <div className='px-4 pt-40 pb-6 mx-auto lg:pt-20 xl:pb-8 max-w-screen-2xl'>
        <ul className='relative grid flex-1 grid-cols-1 gap-6 p-1 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
          {data.collection.items.slice(0, 40).map(item => (
            <li
              key={item.data[0].nasa_id}
              className='flex flex-col overflow-hidden rounded-lg shadow-lg cursor-pointer hover:shadow-2xl focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-400'
            >
              <Link href={`/images/${item.data[0].nasa_id}`}>
                <a className='overflow-hidden bg-black h-96'>
                  <div className='relative flex-shrink-0 w-full h-48'>
                    <Image
                      src={item.links[0].href}
                      alt={`${item.data[0].title}`}
                      layout='fill'
                      objectFit='cover'
                      objectPosition='top'
                    />
                  </div>
                  <div className='h-48 p-6 bg-black'>
                    <p className='text-sm font-medium text-cyan-700'>
                      {item.data[0].date_created.slice(0, 10)}
                    </p>
                    <div className='flex flex-col justify-between h-full'>
                      <p className='mt-2 hover:underline line-clamp-3'>
                        {item.data[0].title}
                      </p>
                      <p className='pb-4 text-primary-light lg:hover:underline'>
                        DETAILS
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
