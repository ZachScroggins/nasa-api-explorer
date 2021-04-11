import Image from 'next/image';
import React from 'react';
import { FiDownloadCloud, FiGitPullRequest } from 'react-icons/fi';

const BackEndDetails = () => {
  return (
    <>
      <div className='relative mt-8 lg:col-span-2'>
        <div className='lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center'>
          <div className=''>
            <h3 className='text-2xl font-extrabold tracking-tight text-white glow sm:text-3xl'>
              Fullstack
            </h3>
            <p className='mt-3 text-lg text-gray-500'>
              Along with the Jamstack front-end, this application includes a
              serverless JSON <a href='https://restfulapi.net/'>REST API</a> as
              the back-end. The application API fetches and returns data from
              NASA, to be consumed by the front-end.
            </p>
            <dl className='mt-10 space-y-10'>
              <div className='relative'>
                <dt>
                  <div className='absolute flex items-center justify-center w-12 h-12 text-white bg-indigo-500 rounded-md'>
                    <FiGitPullRequest className='w-6 h-6' aria-hidden='true' />
                  </div>
                  <p className='ml-16 text-lg font-medium leading-6'>
                    Next.js API Routes
                  </p>
                </dt>
                <dd className='mt-2 ml-16 text-base text-gray-500'>
                  The request (req) object is an instance of{' '}
                  <a href='https://nodejs.org/api/http.html#http_class_http_incomingmessage'>
                    http.IncomingMessage
                  </a>
                  , plus some pre-built middlewares you can see{' '}
                  <a href='https://nextjs.org/docs/api-routes/api-middlewares'>
                    here
                  </a>
                  . The response (res) object is an instance of{' '}
                  <a href='https://nodejs.org/api/http.html#http_class_http_serverresponse'>
                    http.ServerResponse
                  </a>
                  , plus some Express.js-like helper functions you can see{' '}
                  <a href='https://nextjs.org/docs/api-routes/response-helpers'>
                    here
                  </a>
                  .
                </dd>
              </div>
              <div className='relative'>
                <dt>
                  <div className='absolute flex items-center justify-center w-12 h-12 text-white bg-indigo-500 rounded-md'>
                    <FiDownloadCloud className='w-6 h-6' aria-hidden='true' />
                  </div>
                  <p className='ml-16 text-lg font-medium leading-6'>
                    Serverless Functions
                  </p>
                </dt>
                <dd className='mt-2 ml-16 text-base text-gray-500'>
                  <a href='https://www.cloudflare.com/learning/serverless/what-is-serverless/'>
                    Serverless computing
                  </a>{' '}
                  offers a number of advantages over traditional server-centric
                  infrastructure: greater scalability, more flexibility, and
                  quicker time to release, all at a reduced cost. With
                  serverless architectures, we do not need to worry about
                  purchasing, provisioning, and managing backend servers.
                </dd>
              </div>
            </dl>
          </div>
          <div className='mt-10 lg:mt-0'>
            <a href='/ApiRoute.png' className='cursor-zoom-in'>
              <Image
                width={1716}
                height={1704}
                src='/ApiRoute.png'
                alt='API Route Image Image'
                quality={100}
              />
            </a>
          </div>
        </div>
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

export default BackEndDetails;
