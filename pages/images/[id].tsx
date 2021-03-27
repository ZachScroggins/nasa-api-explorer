import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

export default function imageItem() {
  const router = useRouter();
  const { data, isLoading, isError, error } = useQuery<any, Error>(
    ['imageItem', { id: router.asPath.slice(8) }],
    async ({ queryKey }) => {
      const [_key, { id }] = queryKey;
      const res = await fetch(`/api/images?id=${id}`);
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json?.error);
      }
      return res.json();
    }
  );

  if (isLoading) {
    return (
      <div className='min-h-screen p-4 pt-20 lg:pt-10'>
        <p>Loading...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className='min-h-screen p-4 pt-20 lg:pt-10'>
        <p>{error?.message}</p>
      </div>
    );
  }

  if (!data.items.length || !data.images.href) {
    return (
      <div className='min-h-screen p-4 pt-20 lg:pt-10'>
        <p>No results</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen p-4 pt-20 lg:pt-10'>
      <div className='flex items-center justify-center'>
        <div className='max-w-full bg-black rounded-lg lg:flex lg:bg-transparent'>
          <div className='lg:w-1/2'>
            <a href={data.images.items[0].href}>
              <img
                src={data.items[0].links[0].href}
                title={data.items[0].data[0].title}
                className='w-full h-auto rounded-lg cursor-pointer'
              />
            </a>
          </div>
          <div className='p-4 overflow-auto lg:pt-0 lg:w-1/2'>
            <div>
              <p className='text-2xl font-bold'>
                {data.items[0].data[0].title}
              </p>
            </div>
            <div>
              <p className='py-2 font-light text-gray-500'>
                {data.items[0].data[0].date_created.slice(0, 10)}
              </p>
            </div>
            <hr className='pt-1 pb-2 border-gray-900' />
            <div>
              <p className='inline mr-1 text-lg text-gray-400'>Keywords:</p>
              <div className='inline'>
                {data.items[0].data[0]?.keywords?.map((keyword, index) => (
                  <Link href={`/images?q=${keyword}`} key={index}>
                    <a className='text-lg cursor-pointer text-primary'>
                      {keyword},{' '}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
            <div className='py-4'>
              <div>
                <p className='inline text-lg text-gray-400'>
                  Secondary Creator:{' '}
                </p>
                <p className='inline'>
                  {data.items[0].data[0].secondary_creator}
                </p>
              </div>
            </div>
            <div className='pb-4'>
              <div>
                <p className='inline text-lg text-gray-400'>NASA ID: </p>
                <p className='inline'>{data.items[0].data[0].nasa_id}</p>
              </div>
            </div>
            <div className='pb-4'>
              <div>
                <p className='inline text-lg text-gray-400'>Center: </p>
                <p className='inline'>{data.items[0].data[0].center}</p>
              </div>
            </div>
            <hr className='pt-1 pb-2 border-gray-900' />
            <div>
              <p className='text-lg leading-loose'>
                {data.items[0].data[0].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
