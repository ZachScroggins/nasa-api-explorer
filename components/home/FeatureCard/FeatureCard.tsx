import Link from 'next/link';
import React from 'react';
import { FiArrowRight, FiInfo } from 'react-icons/fi';

interface FeatureCardProps {
  title: string;
  description: string;
  url: string;
  aboutUrl: string;
  imgUrl: string;
}

const FeatureCard = ({
  title,
  description,
  url,
  aboutUrl,
  imgUrl,
}: FeatureCardProps) => {
  return (
    <div className='flex flex-col overflow-hidden border shadow-lg cursor-pointer border-opacity-30 border-primary rounded-2xl hover:shadow-2xl focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary'>
      <Link href={url}>
        <a className='overflow-hidden bg-black h-96'>
          <div className='flex-shrink-0'>
            <img
              className='object-cover object-top w-full h-48 rounded-t-lg'
              src={imgUrl}
              alt={`${title} Screenshot`}
            />
          </div>
          <div className='flex flex-col justify-between flex-1 p-6 bg-black'>
            <div className='flex-1'>
              <div className='mt-2'>
                <p className='text-xl font-semibold line-clamp-2 hover:underline'>
                  {title}
                </p>
                <p className='mt-3 text-base text-gray-400 line-clamp-3'>
                  {description}
                </p>
              </div>
            </div>
          </div>
        </a>
      </Link>
      <div className='flex bg-black border-t border-opacity-25 divide-x border-primary divide-primary divide-opacity-25'>
        <div className='flex flex-1 w-0'>
          <Link href={url}>
            <a className='relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium border border-transparent rounded-bl-lg text-primary-light hover:text-primary'>
              <FiArrowRight className='inline text-lg align-middle' />
              <span className='ml-3'>Check it out</span>
            </a>
          </Link>
        </div>
        <div className='flex flex-1 w-0 -ml-px'>
          <Link href={aboutUrl}>
            <a className='relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-medium border border-transparent rounded-br-lg text-primary-light hover:text-primary'>
              <FiInfo className='inline text-lg align-middle' />
              <span className='ml-3'>About API</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
