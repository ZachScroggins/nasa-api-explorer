import { motion } from 'framer-motion';
import Link from 'next/link';
import RocketSvg from '../components/RocketSvg';
import MotionGalaxy from '../components/MotionGalaxy';

export default function IndexPage() {
  return (
    <>
      <div className='root px-4'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='grid mx-auto lg:grid-cols-2 lg:px-5 xl:px-20 pb-10'
          style={{ maxWidth: '2000px' }}
        >
          <div className='flex justify-center items-center lg:justify-end'>
            <div className='w-64 max-w-screen-md lg:w-3/4'>
              <RocketSvg />
            </div>
          </div>
          <div className='mt-4 text-center lg:text-left lg:row-start-1 lg:flex flex-col justify-center lg:mt-0 xl:items-center'>
            <div>
              <h2 className='text-4xl font-bold glow xl:text-5xl'>
                Explore NASA Imagery and Data
              </h2>
              <h3 className='text-2xl font-light text-opacity-75 text-white mt-2 lg:mt-4 lg:w-2/3 xl:w-3/5 xl:mt-6 xl:text-3xl'>
                A free and open source project, built with REST APIs from{' '}
                <a href='https://api.nasa.gov' className='hover:underline'>
                  api.nasa.gov
                </a>
              </h3>
              <div className='lg:flex lg:mt-4 xl:mt-8'>
                <Link href='/images'>
                  <a className='block bg-primary rounded px-4 py-2 mt-4 text-center lg:w-64'>
                    START EXPLORING
                  </a>
                </Link>
                <a
                  href='#about'
                  className='block border border-primary rounded px-4 py-2 text-primary-light mt-4 text-center lg:w-64 lg:ml-4'
                >
                  LEARN MORE
                </a>
              </div>
            </div>
          </div>
        </motion.div>
        <div className='bg-black bg-opacity-50 -mx-4 px-4'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='grid mx-auto py-10 lg:grid-cols-2 lg:px-5 xl:px-20'
            style={{ maxWidth: '2000px' }}
          >
            <div className='flex justify-center items-center lg:justify-start'>
              <div className='w-64 max-w-screen-md lg:w-3/4'>
                {/* <img src='/M81.png' title='M81 Galaxy' /> */}
                <MotionGalaxy />
              </div>
            </div>
            {/* <div className='flex justify-center items-center'> */}
            <div className='mt-4 text-center lg:text-left lg:mt-0'>
              <h2 className='text-4xl text-primary glow font-bold xl:text-5xl'>
                Features
              </h2>
              <h2 className='text-2xl font-bold mt-4 xl:text-3xl'>JAMstack</h2>
              <h3 className='text-xl font-light text-opacity-75 text-white mt-2 lg:w-2/3 xl:text-2xl'>
                Built with JavaScript, APIs, and markup.
              </h3>
              <h2 className='text-2xl font-bold mt-4 xl:text-3xl'>
                Full Stack
              </h2>
              <h3 className='text-xl font-light text-opacity-75 text-white mt-2 lg:w-2/3 xl:text-2xl'>
                Serverless Node.js REST API for fetching data from NASA.
              </h3>
              <h2 className='text-2xl font-bold mt-4 xl:text-3xl'>
                Live Project
              </h2>
              <h3 className='text-xl font-light text-opacity-75 text-white mt-2 lg:w-2/3 xl:text-2xl'>
                New features and API integrations in development.
              </h3>
            </div>
            {/* </div> */}
          </motion.div>
        </div>
      </div>
      <style jsx>{`
        .glow {
          text-shadow: 2px 8px 30px #705dcf;
        }
      `}</style>
    </>
  );
}
