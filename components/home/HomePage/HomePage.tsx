import Head from 'next/head';
import { Details, Features, Header, TechStack } from 'components/home';

const Home = () => {
  return (
    <>
      <Head>
        <title>NASA API Explorer</title>
        <meta
          name='description'
          content='Explore the public APIs of The National Aeronautics and Space Administration. A free and open source project, built with REST APIs from api.nasa.gov.'
        />
      </Head>
      <div className='container grid min-h-screen gap-12 px-4 pt-20 pb-12 mx-auto sm:px-6 md:px-8 lg:pt-0'>
        <Header />
        <Features />
        <Details />
        <TechStack />
      </div>
    </>
  );
};

export default Home;
