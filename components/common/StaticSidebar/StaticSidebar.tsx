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
                      'flex items-center px-2 py-2 text-sm font-medium rounded-md group hover:text-primary',
                      currentIndex === 0 ? 'text-white' : 'text-primary-light'
                    )}
                  >
                    <FiHome className='flex-shrink-0 w-6 h-6 mr-3' />
                    Home
                  </a>
                </Link>
                <Link href='/about'>
                  <a
                    className={classNames(
                      'flex items-center px-2 py-2 text-sm font-medium rounded-md group hover:text-primary',
                      currentIndex === 1 ? 'text-white' : 'text-primary-light'
                    )}
                  >
                    <FiInfo className='flex-shrink-0 w-6 h-6 mr-3' />
                    About the APIs
                  </a>
                </Link>
                <Link href='/images?q=Supernova'>
                  <a
                    className={classNames(
                      'flex items-center px-2 py-2 text-sm font-medium rounded-md group hover:text-primary',
                      currentIndex === 2 ? 'text-white' : 'text-primary-light'
                    )}
                  >
                    <FiImage className='flex-shrink-0 w-6 h-6 mr-3' />
                    Image Library
                  </a>
                </Link>
                <Link href='/epic'>
                  <a
                    className={classNames(
                      'flex items-center px-2 py-2 text-sm font-medium rounded-md group hover:text-primary',
                      currentIndex === 3 ? 'text-white' : 'text-primary-light'
                    )}
                  >
                    <FiGlobe className='flex-shrink-0 w-6 h-6 mr-3' />
                    Earth Polychromatic Imaging Camera
                  </a>
                </Link>
                <Link href='/apod'>
                  <a
                    className={classNames(
                      'flex items-center px-2 py-2 text-sm font-medium rounded-md group hover:text-primary',
                      currentIndex === 4 ? 'text-white' : 'text-primary-light'
                    )}
                  >
                    <FiCamera className='flex-shrink-0 w-6 h-6 mr-3' />
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
                  className='flex items-center px-2 py-2 text-sm font-medium rounded-md text-primary-light hover:text-primary'
                >
                  <FiGithub className='flex-shrink-0 w-6 h-6 mr-3' />
                  GitHub
                </a>
                <a
                  href='https://zachscroggins.com'
                  className='flex items-center px-2 py-2 text-sm font-medium rounded-md text-primary-light hover:text-primary'
                >
                  <FiCode className='flex-shrink-0 w-6 h-6 mr-3' />
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
