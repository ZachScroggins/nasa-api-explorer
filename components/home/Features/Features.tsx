import { FeatureCard } from 'components/home';

const Features = () => {
  return (
    <section className=''>
      <div className='relative mb-2 lg:col-span-2'>
        <h3
          id='about-app'
          className='text-3xl font-extrabold leading-8 tracking-tight text-center sm:text-4xl 2xl:text-5xl glow'
        >
          About This App
        </h3>
        <p className='max-w-6xl mx-auto mt-4 text-xl text-center text-gray-400 sm:text-2xl 2xl:text-3xl'>
          The goal of this application is to create a front-end for the REST
          APIs that are found in the{' '}
          <a
            href='https://api.nasa.gov'
            className='hover:underline text-primary-light'
          >
            api.nasa.gov
          </a>{' '}
          catalog. These APIs expose a wealth of images and information, such as
          data on comets, measurements of mars, and real-time imagery of earth.
        </p>
      </div>
      <div className='grid gap-8 mx-auto my-16 sm:grid-cols-2 xl:grid-cols-3'>
        <FeatureCard
          title='NASA Image and Video Library'
          description="Search NASA's official database of over 140,000 photos. Browse stunning images of outer space, astronauts, rocket launches, and much more."
          url='/images'
          aboutUrl='/about#images'
          imgUrl='/ImagesScreenshot.png'
        />
        <FeatureCard
          title='Earth Polychromatic Imaging Camera'
          description="Daily imagery and data collected by the DSCOVR satellite's Earth Polychromatic Imaging Camera (EPIC) instrument."
          url='/epic'
          aboutUrl='/about#epic'
          imgUrl='/EpicScreenshot.png'
        />
        <FeatureCard
          title='Astronomy Picture of the Day'
          description='Each day a different image or video of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.'
          url='/apod'
          aboutUrl='/about#apod'
          imgUrl='/ApodScreenshot.png'
        />
      </div>
    </section>
  );
};

export default Features;
