import Link from 'next/link';

const Header = () => {
  return (
    <header className='grid lg:grid-cols-2 md:max-w-2xl lg:max-w-max'>
      <img
        src='/M81.png'
        alt='M81 Galaxy'
        width={795}
        height={614}
        className='w-full h-auto'
      />
      <div className='flex-col justify-center mt-4 text-center lg:text-left lg:row-start-1 lg:flex lg:mt-0 xl:items-center'>
        <div>
          <h1 className='text-4xl font-bold glow xl:text-5xl'>
            Explore NASA Imagery and Data
          </h1>
          <h2 className='mt-2 text-2xl font-light text-white text-opacity-75 lg:mt-4 xl:mt-6 xl:text-3xl'>
            A free and open source project, built with REST APIs from{' '}
            <a
              href='https://api.nasa.gov'
              className='rounded-md lg:hover:underline'
            >
              api.nasa.gov
            </a>
          </h2>
          <div className='sm:flex sm:mt-4 xl:mt-8'>
            <Link href='/images?q=Supernova'>
              <a className='block px-4 py-2 mt-4 text-center rounded bg-primary sm:w-full'>
                START EXPLORING
              </a>
            </Link>
            <a
              href='https://github.com/ZachScroggins/nasa-api-explorer'
              className='block px-4 py-2 mt-4 text-center border rounded border-primary text-primary-light sm:ml-4 sm:w-full'
            >
              CONTRIBURE
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
