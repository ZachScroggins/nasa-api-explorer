import Head from 'next/head';
import { Features, Header, TechStack } from 'components/home';

const Home = () => {
  return (
    <>
      <Head>
        <title>NASA API Explorer</title>
      </Head>
      <div className='min-h-screen px-4 pt-20 lg:pt-16'>
        <Header />
        <Features />
        <TechStack />
      </div>
    </>
  );
};

export default Home;