const Features = () => {
  return (
    <div className='px-4 -mx-4 bg-black bg-opacity-50'>
      <div className='container grid py-10 mx-auto lg:grid-cols-2 lg:px-5 xl:px-20'>
        <div className='flex items-center justify-center lg:justify-start'>
          <div className='w-full max-w-screen-md sm:w-64 lg:w-full'>
            <img src='/M81.png' alt='Galaxy Image' />
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <div className='mt-4 text-center lg:mt-0'>
            <h2 className='text-4xl font-bold glow xl:text-5xl'>Features</h2>
            <h2 className='mt-4 text-2xl font-bold xl:text-3xl'>JAMstack</h2>
            <h3 className='mt-2 text-xl font-light text-white text-opacity-75'>
              Built with JavaScript, APIs, and markup.
            </h3>
            <h2 className='mt-4 text-2xl font-bold xl:text-3xl'>Full Stack</h2>
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
  );
};

export default Features;
