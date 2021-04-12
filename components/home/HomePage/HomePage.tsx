import Head from 'next/head';
import { Details, Features, Header, TechStack } from 'components/home';

const Home = () => {
  return (
    <>
      <Head>
        <title>NASA API Explorer</title>
      </Head>
      <div className='container grid min-h-screen gap-12 px-4 pt-20 mx-auto sm:px-6 md:px-8 lg:pt-0'>
        <Header />
        <Features />
        <Details />
        <TechStack />
      </div>
    </>
  );
};

export default Home;
