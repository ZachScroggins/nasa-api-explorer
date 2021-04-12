import Image from 'next/image';
import React from 'react';
import { FiServer, FiZap } from 'react-icons/fi';
import { SiJavascript } from 'react-icons/si';

const FrontEndDetails = () => {
  return (
    <>
      <section className='lg:col-start-2'>
        <h4 className='text-2xl font-extrabold tracking-tight text-white glow sm:text-3xl 2xl:text-4xl'>
          Jamstack
        </h4>
        <p className='mt-3 text-lg text-gray-400 sm:text-xl 2xl:text-2xl'>
          <a href='https://jamstack.org/'>Jamstack</a> is an architecture
          designed to make the web faster, more secure, and easier to scale. It
          builds on many of the tools and workflows which developers love, and
          which bring maximum productivity.
        </p>
        <dl className='mt-10 space-y-10'>
          <div className='relative'>
            <dt>
              <div className='absolute flex items-center justify-center w-12 h-12 text-white bg-indigo-500 rounded-md'>
                <FiZap className='w-6 h-6' aria-hidden='true' />
              </div>
              <p className='ml-16 text-lg font-medium leading-6 sm:text-xl 2xl:text-2xl'>
                Pre-rendering
              </p>
            </dt>
            <dd className='mt-2 ml-16 text-base leading-relaxed text-gray-400 sm:text-lg 2xl:text-xl'>
              With Jamstack, the entire front-end is prebuilt into highly
              optimized static pages and assets during a build process. This
              process of pre-rendering results in sites which can be served
              directly from a{' '}
              <a href='https://jamstack.org/glossary/cdn/'>CDN</a>, reducing the
              cost, complexity and risk, of dynamic servers as critical
              infrastructure.
            </dd>
          </div>
          <div className='relative'>
            <dt>
              <div className='absolute flex items-center justify-center w-12 h-12 text-indigo-500 bg-white rounded-md'>
                <SiJavascript
                  className='w-full h-full rounded-md'
                  aria-hidden='true'
                />
              </div>
              <p className='ml-16 text-lg font-medium leading-6 sm:text-xl 2xl:text-2xl'>
                Enhancing with JavaScript
              </p>
            </dt>
            <dd className='mt-2 ml-16 text-base leading-relaxed text-gray-400 sm:text-lg 2xl:text-xl'>
              With the{' '}
              <a href='https://developer.mozilla.org/en-US/docs/Glossary/markup'>
                markup
              </a>{' '}
              and other user interface assets of Jamstack sites served directly
              from a CDN, they can be delivered very quickly and securely. On
              this foundation, Jamstack sites can use JavaScript and APIs to
              talk to backend services, allowing experiences to be enhanced and
              personalized.
            </dd>
          </div>
          <div className='relative'>
            <dt>
              <div className='absolute flex items-center justify-center w-12 h-12 text-white bg-indigo-500 rounded-md'>
                <FiServer className='w-6 h-6' aria-hidden='true' />
              </div>
              <p className='ml-16 text-lg font-medium leading-6 sm:text-xl 2xl:text-2xl'>
                Supercharging with services
              </p>
            </dt>
            <dd className='mt-2 ml-16 text-base leading-relaxed text-gray-400 sm:text-lg 2xl:text-xl'>
              The thriving{' '}
              <a href='https://jamstack.org/glossary/api-economy/'>
                API economy
              </a>{' '}
              has become a significant enabler for Jamstack sites. The ability
              to leverage domain experts who offer their products and service
              via APIs has allowed developers to build far more complex
              applications than if they were to take on the risk and burden of
              such capabilities themselves.
            </dd>
          </div>
        </dl>
      </section>
      <div className='mt-10 lg:relative lg:h-full lg:mt-0 lg:col-start-1'>
        <div className='lg:sticky lg:top-0'>
          <a href='/AlertComponent.png' className='cursor-zoom-in'>
            <Image
              src='/AlertComponent.png'
              alt='Alert Component Screenshot'
              width={1396}
              height={1776}
              quality={100}
            />
          </a>
        </div>
      </div>
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

export default FrontEndDetails;
