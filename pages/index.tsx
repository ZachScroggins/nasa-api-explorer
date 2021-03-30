import Head from 'next/head';
import Link from 'next/link';
import { Rocket } from 'components/ui';

const Home = () => {
  return (
    <>
      <Head>
        <title>NASA API Explorer</title>
      </Head>
      <div className='min-h-screen px-4 pt-20 lg:pt-16'>
        <div
          className='grid pb-10 mx-auto sm:px-32 lg:grid-cols-2 lg:px-5 xl:px-20'
          style={{ maxWidth: '2000px' }}
        >
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
                <a href='https://api.nasa.gov' className='lg:hover:underline'>
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
        <div className='px-4 -mx-4 bg-black bg-opacity-50'>
          <div
            className='grid py-10 mx-auto lg:grid-cols-2 lg:px-5 xl:px-20'
            style={{ maxWidth: '2000px' }}
          >
            <div className='flex items-center justify-center lg:justify-start'>
              <div className='w-full max-w-screen-md sm:w-64 lg:w-full'>
                <img src='/M81.png' alt='Galaxy Image' />
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <div className='mt-4 text-center lg:mt-0'>
                <h2 className='text-4xl font-bold text-primary glow xl:text-5xl'>
                  Features
                </h2>
                <h2 className='mt-4 text-2xl font-bold xl:text-3xl'>
                  JAMstack
                </h2>
                <h3 className='mt-2 text-xl font-light text-white text-opacity-75'>
                  Built with JavaScript, APIs, and markup.
                </h3>
                <h2 className='mt-4 text-2xl font-bold xl:text-3xl'>
                  Full Stack
                </h2>
                <h3 className='mt-2 text-xl font-light text-white text-opacity-75'>
                  <ul>
                    <li>React SSG for speed and SEO.</li>
                    <li>Serverless functions for fetching data from NASA.</li>
                  </ul>
                </h3>
                <h2 className='mt-4 text-2xl font-bold xl:text-3xl'>
                  Live Project
                </h2>
                <h3 className='mt-2 text-xl font-light text-white text-opacity-75'>
                  New features and API integrations in development.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
