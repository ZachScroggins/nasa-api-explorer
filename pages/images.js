import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import ImageContext from '../src/context/images/imageContext';
import ScrollTop from '../src/components/ScrollTop';
import Search from '../src/components/imageLibrary/Search';
import Results from '../src/components/imageLibrary/Results';
import { Box, Grid, LinearProgress } from '@material-ui/core';

const searchVariant = {
  hidden: {
    y: -200,
  },
  visible: {
    y: 0,
  },
};

const index = () => {
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
      {loading ? (
        <LinearProgress />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Grid container justify='center'>
            <Grid item xs={12} sm={7}>
              <motion.div
                initial='hidden'
                animate='visible'
                variants={searchVariant}
              >
                <Search />
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <Box pt={2}>
                <Results results={results} />
              </Box>
            </Grid>
          </Grid>
          <ScrollTop />
        </motion.div>
      )}
    </>
  );
};

export default index;
