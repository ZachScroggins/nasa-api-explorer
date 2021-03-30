import Link from 'next/link';
import { RocketIcon } from 'components/ui';

export default function MobileHeader({ setIsOpen }) {
  return (
    <div className='fixed top-0 left-0 z-10 w-full lg:hidden'>
      <div className='flex items-center justify-between px-4 py-2 bg-black border-b border-black'>
        <Link href='/'>
          <a className='flex items-center flex-shrink-0 text-2xl font-medium'>
            <RocketIcon className='inline w-11 h-11' />
            <span className='ml-3 text-2xl font-medium text-primary'>
              NASA API Explorer
            </span>
          </a>
        </Link>
        <div>
          <button
            type='button'
            className='inline-flex items-center justify-center w-12 h-12 -mr-3 text-gray-300 rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600'
            onClick={() => setIsOpen(true)}
          >
            <span className='sr-only'>Open sidebar</span>
            <svg
              className='w-6 h-6'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
