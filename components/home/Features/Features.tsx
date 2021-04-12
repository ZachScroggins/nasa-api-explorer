import { FeatureCard } from 'components/home';

const Features = () => {
  return (
    <section className=''>
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
      <div className='grid max-w-md gap-8 px-4 mx-auto my-12 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-3 lg:max-w-7xl'>
        <FeatureCard
          title='NASA Image and Video Library'
          description='API to access the NASA Image and Video Library site at images.nasa.gov'
          url='/images'
          aboutUrl='/about#images'
          imgUrl=''
        />
        <FeatureCard
          title='Earth Polychromatic Imaging Camera'
          description='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, dolorum beatae! Voluptatem libero doloribus iste consequatur sit? Repudiandae, qui debitis.'
          url='/epic'
          aboutUrl='/about#epic'
          imgUrl=''
        />
        <FeatureCard
          title='Astronomy Picture of the Day'
          description='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, dolorum beatae!'
          url='/apod'
          aboutUrl='/about#apod'
          imgUrl=''
        />
      </div>
    </section>
  );
};

export default Features;
