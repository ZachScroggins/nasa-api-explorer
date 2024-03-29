import Image from 'next/image';
import Link from 'next/link';
import { ImageDataItem } from 'types';

interface ThumbnailCardProps {
  item: ImageDataItem;
}

const ThumbnailCard = ({ item }: ThumbnailCardProps) => {
  return (
    <li className='flex flex-col overflow-hidden rounded-lg shadow-lg cursor-pointer hover:shadow-2xl focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-0 focus-within:ring-indigo-400'>
      <Link href={`/images/${item.data[0].nasa_id}`}>
        <a className='overflow-hidden bg-black h-96'>
          <div className='relative flex-shrink-0 w-full h-48 bg-gray-900'>
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
  );
};

export default ThumbnailCard;
