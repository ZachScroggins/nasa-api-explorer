import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import ImageContext from '../context/images/imageContext';
import Search from '../components/imageLibrary/Search';
import Results from '../components/imageLibrary/Results';
import ScrollTop from '../components/ScrollTop';
import LinearProgress from '../components/LinearProgress';

const searchVariant = {
  hidden: {
    y: -200,
  },
  visible: {
    y: 0,
  },
};

const images = () => {
  const router = useRouter();
  const imageContext = useContext(ImageContext);
  const { getResults, results, loading, query, setQuery } = imageContext;

  useEffect(() => {
    if (router.asPath.slice(14) === '') {
      router.replace({
        pathname: '/images',
        query: { query: `${query}` },
      });
    }
  }, []);

  useEffect(() => {
    if (router.query.query !== undefined && router.query.query !== query) {
      setQuery(router.query.query);
      getResults(router.query.query);
    }
  }, [router.query.query]);

  return (
    <>
      <div className='px-4'>
        {loading && <LinearProgress />}
        <div className='grid gap-4'>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.div
              initial='hidden'
              animate='visible'
              variants={searchVariant}
              className='flex flex-col justify-center items-center'
            >
              <Search />
            </motion.div>
            <div className='flex justify-center mt-8'>
              <Results results={results} />
            </div>
          </motion.div>
        </div>
      </div>
      <ScrollTop />
    </>
  );
};

export default images;
