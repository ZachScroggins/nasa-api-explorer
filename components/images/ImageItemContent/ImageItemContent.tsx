import Link from 'next/link';
import { ImageItemData } from 'types';

interface ImageItemContentProps {
  data: ImageItemData;
}

const ImageItemContent = ({ data }: ImageItemContentProps) => {
  return (
    <div className='flex items-center justify-center'>
      <div className='max-w-full bg-black rounded-lg lg:flex lg:bg-transparent'>
        <div className='overflow-auto aspect-w-9 aspect-h-9 lg:h-auto lg:w-1/2'>
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
            <p className='text-2xl font-bold'>{data.items[0].data[0].title}</p>
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
  );
};

export default ImageItemContent;
