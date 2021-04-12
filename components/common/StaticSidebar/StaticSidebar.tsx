import Link from 'next/link';
import { RocketIcon } from 'components/ui';
import { classNames } from 'lib/classNames';
import {
  FiCamera,
  FiCode,
  FiGithub,
  FiGlobe,
  FiHome,
  FiImage,
  FiInfo,
} from 'react-icons/fi';

interface StaticSidebarProps {
  currentIndex: number;
}

const StaticSidebar = ({ currentIndex }: StaticSidebarProps) => {
  return (
    <div className='fixed top-0 left-0 z-20 hidden w-64 h-full lg:flex lg:flex-shrink-0'>
      <div className='flex flex-col w-64'>
        <div className='flex flex-col flex-1 h-0 bg-black border-r border-gray-900'>
          <div className='flex flex-col flex-1 pt-5 pb-4 overflow-y-auto'>
            <Link href='/'>
              <a className='flex items-center flex-shrink-0 px-2 text-2xl font-medium'>
                <RocketIcon className='inline w-10 h-10' />
                <span className='ml-3 text-xl font-medium text-primary-light'>
                  NASA API Explorer
                </span>
              </a>
            </Link>
            <nav className='flex-1 mt-5' aria-label='Sidebar'>
              <div className='px-2 space-y-1'>
                <Link href='/'>
                  <a
                    className={classNames(
                      'flex items-center px-2 py-2 text-sm font-medium rounded-md group',
                      currentIndex === 0
                        ? 'bg-gray-200 text-gray-900'
                        : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <FiHome className='flex-shrink-0 w-6 h-6 mr-3 text-gray-500' />
                    Home
                  </a>
                </Link>
                <Link href='/about'>
                  <a
                    className={classNames(
                      'flex items-center px-2 py-2 text-sm font-medium rounded-md group',
                      currentIndex === 1
                        ? 'bg-gray-200 text-gray-900'
                        : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <FiInfo className='flex-shrink-0 w-6 h-6 mr-3 text-gray-500' />
                    About the APIs
                  </a>
                </Link>
                <Link href='/images?q=Supernova'>
                  <a
                    className={classNames(
                      'flex items-center px-2 py-2 text-sm font-medium rounded-md group',
                      currentIndex === 2
                        ? 'bg-gray-200 text-gray-900'
                        : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <FiImage className='flex-shrink-0 w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500' />
                    Image Library
                  </a>
                </Link>
                <Link href='/epic'>
                  <a
                    className={classNames(
                      'flex items-center px-2 py-2 text-sm font-medium rounded-md group',
                      currentIndex === 3
                        ? 'bg-gray-200 text-gray-900'
                        : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <FiGlobe className='flex-shrink-0 w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500' />
                    Earth Polychromatic Imaging Camera
                  </a>
                </Link>
                <Link href='/apod'>
                  <a
                    className={classNames(
                      'flex items-center px-2 py-2 text-sm font-medium rounded-md group',
                      currentIndex === 4
                        ? 'bg-gray-200 text-gray-900'
                        : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <FiCamera className='flex-shrink-0 w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500' />
                    Astronomy Picture of the Day
                  </a>
                </Link>
              </div>
              <hr
                className='my-5 border-t border-gray-900'
                aria-hidden='true'
              />
              <div className='flex-1 px-2 space-y-1'>
                <a
                  href='https://github.com/ZachScroggins/nasa-api-explorer'
                  className='flex items-center px-2 py-2 text-sm font-medium text-gray-400 rounded-md hover:bg-gray-50 hover:text-gray-900 group'
                >
                  <FiGithub className='flex-shrink-0 w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500' />
                  GitHub
                </a>
                <a
                  href='https://zachscroggins.com'
                  className='flex items-center px-2 py-2 text-sm font-medium text-gray-400 rounded-md hover:bg-gray-50 hover:text-gray-900 group'
                >
                  <FiCode className='flex-shrink-0 w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500' />
                  My Work
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticSidebar;
