import React from 'react';
import { FrontEndDetails, BackEndDetails } from 'components/home';

const Details = () => {
  return (
    <>
      <div className='container py-6 mx-auto lg:grid lg:grid-flow-row-dense lg:px-5 xl:px-20 lg:grid-cols-2 lg:gap-8 lg:items-center'>
        <div className='relative mb-2 lg:col-span-2'>
          <h2 className='text-3xl font-extrabold leading-8 tracking-tight text-center lg:text-4xl glow'>
            Technical Details
          </h2>
          <p className='max-w-3xl mx-auto mt-4 text-xl text-center text-gray-400'>
            The NASA API Explorer consists of a Jamstack React app as the
            front-end and a serverless, Node.js REST API as the back-end. It is
            hosted by <a href='https://vercel.com/home'>Vercel</a> and written
            in <a href='https://www.typescriptlang.org/'>TypeScript</a>.
          </p>
        </div>
        <FrontEndDetails />
        <BackEndDetails />
      </div>
      <style jsx>{`
        a {
          color: #8c7dd8;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default Details;