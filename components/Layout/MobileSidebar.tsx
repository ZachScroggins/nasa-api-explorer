import Link from 'next/link';
import { Transition } from '@headlessui/react';
import RocketIcon from 'components/RocketIcon';
import { classNames } from 'lib/classNames';
import {
  FiCamera,
  FiCode,
  FiGithub,
  FiGlobe,
  FiHome,
  FiImage,
} from 'react-icons/fi';

export default function MobileSidebar({ isOpen, setIsOpen, currentIndex }) {
  return (
    <Transition show={isOpen}>
      <div
        className='fixed inset-0 z-40 flex lg:hidden'
        role='dialog'
        aria-modal='true'
      >
        <Transition.Child
          enter='transition-opacity ease-linear duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity ease-linear duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div
            className='fixed inset-0 bg-gray-600 bg-opacity-75'
            aria-hidden='true'
            onClick={() => setIsOpen(false)}
          />
        </Transition.Child>
        <Transition.Child
          enter='transition ease-in-out duration-300 transform'
          enterFrom='-translate-x-full'
          enterTo='translate-x-0'
          leave='transition ease-in-out duration-300 transform'
          leaveFrom='translate-x-0'
          leaveTo='-translate-x-full'
        >
          <div className='relative flex flex-col flex-1 h-screen max-w-xs bg-black focus:outline-none'>
            <Transition.Child
              enter='ease-in-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in-out duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='absolute top-0 right-0 pt-2 -mr-12'>
                <button
                  type='button'
                  className='flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                  onClick={() => setIsOpen(false)}
                >
                  <span className='sr-only'>Close sidebar</span>
                  {/* Heroicon name: outline/x */}
                  <svg
                    className='w-6 h-6 text-white'
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
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            </Transition.Child>
            <div className='flex-1 h-0 pt-5 pb-4 overflow-y-auto'>
              <div className='flex items-center flex-shrink-0 px-2 text-2xl'>
                <RocketIcon className='inline w-10 h-10' />
                <span className='ml-3 text-primary'>NASA API Explorer</span>
              </div>
              <nav aria-label='Sidebar' className='mt-5'>
                <div className='px-2 space-y-1'>
                  <Link href='/'>
                    <a
                      className={classNames(
                        'flex items-center px-2 py-2 text-base font-medium rounded-md group',
                        currentIndex === 0
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {/* Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" */}
                      <FiHome className='flex-shrink-0 w-6 h-6 mr-4 text-gray-400 group-hover:text-gray-500' />
                      Home
                    </a>
                  </Link>
                  <Link href='/images?q=Supernova'>
                    <a
                      className={classNames(
                        'flex items-center px-2 py-2 text-base font-medium rounded-md group',
                        currentIndex === 1
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <FiImage className='flex-shrink-0 w-6 h-6 mr-4 text-gray-400 group-hover:text-gray-500' />
                      Image Library
                    </a>
                  </Link>
                  <Link href='/epic'>
                    <a
                      className={classNames(
                        'flex items-center px-2 py-2 text-base font-medium rounded-md group',
                        currentIndex === 2
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <FiGlobe className='flex-shrink-0 w-6 h-6 mr-4 text-gray-400 group-hover:text-gray-500' />
                      Earth Polychromatic Imaging Camera
                    </a>
                  </Link>
                  <Link href='/apod'>
                    <a
                      className={classNames(
                        'flex items-center px-2 py-2 text-base font-medium rounded-md group',
                        currentIndex === 3
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <FiCamera className='flex-shrink-0 w-6 h-6 mr-4 text-gray-400 group-hover:text-gray-500' />
                      Astronomy Picture of the Day
                    </a>
                  </Link>
                </div>
                <hr
                  className='my-5 border-t border-gray-800'
                  aria-hidden='true'
                />
                <div className='px-2 space-y-1'>
                  <a
                    href='https://github.com/ZachScroggins/nasa-api-explorer'
                    className='flex items-center px-2 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-50 hover:text-gray-900 group'
                    onClick={() => setIsOpen(false)}
                  >
                    <FiGithub className='flex-shrink-0 w-6 h-6 mr-4 text-gray-400 group-hover:text-gray-500' />
                    GitHub
                  </a>
                  <a
                    href='https://zachscroggins.com'
                    className='flex items-center px-2 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-50 hover:text-gray-900 group'
                    onClick={() => setIsOpen(false)}
                  >
                    <FiCode className='flex-shrink-0 w-6 h-6 mr-4 text-gray-400 group-hover:text-gray-500' />
                    My Work
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </Transition.Child>
        <div className='flex-shrink-0 w-14' aria-hidden='true'>
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </div>
    </Transition>
  );
}
