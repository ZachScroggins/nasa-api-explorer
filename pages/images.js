import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import ImageContext from '../src/context/images/imageContext';
import ScrollTop from '../src/components/ScrollTop';
import Search from '../src/components/imageLibrary/Search';
import Results from '../src/components/imageLibrary/Results';
// import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, LinearProgress } from '@material-ui/core';
import { motion } from 'framer-motion';

// const useStyles = makeStyles(theme => ({
//   progress: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     zIndex: '10000',
//   },
// }));

const index = () => {
  // const classes = useStyles();
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

  const searchXYZ = {
    hidden: {
      y: -200,
    },
    visible: {
      y: 0,
    },
  };

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
                variants={searchXYZ}
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
