const Features = () => {
  return (
    <div className='px-4 -mx-4 bg-black bg-opacity-50'>
      {/* <div className='container grid py-10 mx-auto lg:grid-cols-2 lg:px-5 xl:px-20'>
        <div className='flex items-center justify-center lg:justify-start'>
          <div className='w-full max-w-screen-md sm:w-64 lg:w-full'>
            <img src='/M81.png' alt='Galaxy Image' />
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <div className='mt-4 text-center lg:mt-0'>
            <h2 className='text-4xl font-bold glow xl:text-5xl'>Features</h2>
            <h2 className='mt-8 text-2xl font-bold xl:text-3xl text-primary-light'>
              JAMstack
            </h2>
            <h3 className='mt-2 text-xl font-light text-white text-opacity-75'>
              Built with JavaScript, APIs, and markup.
            </h3>
            <h2 className='mt-4 text-2xl font-bold xl:text-3xl text-primary-light'>
              Full Stack
            </h2>
            <h3 className='mt-2 text-xl font-light text-white text-opacity-75'>
              <ul>
                <li>React SSG for speed and SEO.</li>
                <li>
                  Node.js serverless functions for fetching data from NASA.
                </li>
              </ul>
            </h3>
            <h2 className='mt-4 text-2xl font-bold xl:text-3xl text-primary-light'>
              Live Project
            </h2>
            <h3 className='mt-2 text-xl font-light text-white text-opacity-75'>
              New features and API integrations in development.
            </h3>
          </div>
        </div>
      </div> */}
      <div className='container py-20 mx-auto lg:grid lg:grid-flow-row-dense lg:px-5 xl:px-20 lg:grid-cols-2 lg:gap-8 lg:items-center'>
        <div className='lg:col-start-2'>
          <h3 className='text-2xl font-extrabold tracking-tight text-white glow sm:text-3xl'>
            About This App
          </h3>
          <p className='mt-3 text-lg text-gray-400'>
            The goal of this application is to create a front-end for all of the
            REST APIs that are found in the{' '}
            <a href='https://api.nasa.gov'>api.nasa.gov</a> catalog. These APIs
            expose a wealth of images and information, such as data on comets,
            measurements of mars, and real-time imagery of earth.
          </p>
          <dl className='mt-10 space-y-10'>
            <div className='relative'>
              <dt>
                <div className='absolute flex items-center justify-center w-12 h-12 text-white bg-indigo-500 rounded-md'>
                  <svg
                    className='w-6 h-6'
                    x-description='Heroicon name: outline/annotation'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
                    />
                  </svg>
                </div>
                <p className='ml-16 text-lg font-medium leading-6'>JAMstack</p>
              </dt>
              <dd className='mt-2 ml-16 text-base text-gray-400'>
                <a href='https://jamstack.org/'>Jamstack</a> is an architecture
                designed to make the web faster, more secure, and easier to
                scale. It builds on many of the tools and workflows which
                developers love, and which bring maximum productivity.
              </dd>
            </div>
            <div className='relative'>
              <dt>
                <div className='absolute flex items-center justify-center w-12 h-12 text-white bg-indigo-500 rounded-md'>
                  <svg
                    className='w-6 h-6'
                    x-description='Heroicon name: outline/mail'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                <p className='ml-16 text-lg font-medium leading-6'>
                  Full Stack
                </p>
              </dt>
              <dd className='mt-2 ml-16 text-base text-gray-400'>
                Statically generated React front-end for performance and search
                engine optimization. Serverless Node.js REST API for fetching
                data from NASA.
              </dd>
            </div>
            <div className='relative'>
              <dt>
                <div className='absolute flex items-center justify-center w-12 h-12 text-white bg-indigo-500 rounded-md'>
                  <svg
                    className='w-6 h-6'
                    x-description='Heroicon name: outline/mail'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                <p className='ml-16 text-lg font-medium leading-6'>
                  Live Project
                </p>
              </dt>
              <dd className='mt-2 ml-16 text-base text-gray-400'>
                New features and API integrations in development.
              </dd>
            </div>
          </dl>
        </div>
        <div className='relative mt-10 -mx-4 lg:mt-0 lg:col-start-1'>
          <img
            className='relative mx-auto'
            width={490}
            src='/M81.png'
            alt='Galaxy Image'
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
