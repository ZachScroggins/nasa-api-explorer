import React from 'react';
import { FrontEndDetails, BackEndDetails } from 'components/home';

const Details = () => {
  return (
    <>
      <section className='relative space-y-10 lg:space-y-0 lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center'>
        <div className='relative lg:col-span-2'>
          <h3 className='text-3xl font-extrabold leading-8 tracking-tight text-center sm:text-4xl 2xl:text-5xl glow'>
            Technical Details
          </h3>
          <p className='max-w-5xl mx-auto mt-4 text-xl text-center text-gray-400 sm:text-2xl 2xl:text-3xl'>
            The NASA API Explorer consists of a Jamstack React app as the{' '}
            <a href='https://airfocus.com/glossary/what-is-a-front-end/'>
              front-end
            </a>{' '}
            and a serverless, Node.js REST API as the{' '}
            <a href='https://airfocus.com/glossary/what-is-a-back-end/'>
              back-end
            </a>
            . It is hosted by <a href='https://vercel.com/home'>Vercel</a> and
            written in <a href='https://www.typescriptlang.org/'>TypeScript</a>.
          </p>
        </div>
        <FrontEndDetails />
        <BackEndDetails />
      </section>
      <style jsx>{`
        a {
          color: #8c7dd8;
          border-radius: 0.25rem;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default Details;
