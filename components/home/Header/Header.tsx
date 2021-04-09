import Link from 'next/link';
import { Rocket } from 'components/ui';

const Header = () => {
  return (
    <div className='container grid pb-10 mx-auto sm:px-32 lg:grid-cols-2 lg:px-5 xl:px-20'>
      <div className='flex items-center justify-center'>
        <div className='w-64 max-w-screen-md lg:w-3/4'>
          <Rocket />
        </div>
      </div>
      <div className='flex-col justify-center mt-4 text-center lg:text-left lg:row-start-1 lg:flex lg:mt-0 xl:items-center'>
        <div>
          <h2 className='text-4xl font-bold glow xl:text-5xl'>
            Explore NASA Imagery and Data
          </h2>
          <h3 className='mt-2 text-2xl font-light text-white text-opacity-75 lg:mt-4 lg:w-2/3 xl:w-3/5 xl:mt-6 xl:text-3xl'>
            A free and open source project, built with REST APIs from{' '}
            <a
              href='https://api.nasa.gov'
              className='rounded-md lg:hover:underline'
            >
              api.nasa.gov
            </a>
          </h3>
          <div className='lg:flex lg:mt-4 xl:mt-8'>
            <Link href='/images?q=Supernova'>
              <a className='block px-4 py-2 mt-4 text-center rounded bg-primary lg:w-64'>
                START EXPLORING
              </a>
            </Link>
            <a
              href='https://github.com/ZachScroggins/nasa-api-explorer'
              className='block px-4 py-2 mt-4 text-center border rounded border-primary text-primary-light lg:w-64 lg:ml-4'
            >
              CONTRIBURE
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
