const Features = () => {
  return (
    <div className=''>
      <div className='relative mb-2 lg:col-span-2'>
        <h2 className='text-3xl font-extrabold leading-8 tracking-tight text-center lg:text-4xl glow'>
          About This App
        </h2>
        <p className='max-w-3xl mx-auto mt-4 text-xl text-center text-gray-400'>
          The goal of this application is to create a front-end for the REST
          APIs that are found in the{' '}
          <a
            href='https://api.nasa.gov'
            className='underline text-primary-light'
          >
            api.nasa.gov
          </a>{' '}
          catalog. These APIs expose a wealth of images and information, such as
          data on comets, measurements of mars, and real-time imagery of earth.
        </p>
      </div>
    </div>
  );
};

export default Features;
