import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

export default function imageItem({ data, images, error }) {
  if (error) {
    return (
      <div>
        <p>Oops... Something went wrong</p>
      </div>
    );
  }

  if (!data.items.length || !images.href) {
    return (
      <div>
        <p>No results</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen p-4 pt-20 lg:pt-10'>
      <div className='flex items-center justify-center'>
        <div className='max-w-full bg-black rounded-lg lg:flex lg:bg-transparent'>
          <div className='lg:w-1/2'>
            <a href={images.items[0].href}>
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
                {data.items[0].data[0].keywords.map((keyword, index) => (
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

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context;
  let images = null;
  let data = null;
  let error = null;
  const imageUrl = query.id
    ? `https://images-api.nasa.gov/asset/${query.id}`
    : `https://images-api.nasa.gov/asset/PIA06907`;
  const dataUrl = query.id
    ? `https://images-api.nasa.gov/search?nasa_id=${query.id}`
    : `https://images-api.nasa.gov/search?nasa_id=PIA06907`;

  try {
    const res = await fetch(imageUrl);
    const json = await res.json();
    if (res.ok) {
      images = json.collection;
    } else {
      throw new Error(`Error ${res.status}: ${json?.reason}`);
    }
  } catch (e) {
    console.log(e.message);
    error = true;
  }
  try {
    const res = await fetch(dataUrl);
    const json = await res.json();
    if (res.ok) {
      data = json.collection;
    } else {
      throw new Error(`Error ${res.status}: ${json?.reason}`);
    }
  } catch (e) {
    console.log(e.message);
    error = true;
  }

  return {
    props: { data, images, error },
  };
};
