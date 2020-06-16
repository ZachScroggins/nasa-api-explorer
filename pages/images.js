import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import ImageContext from '../src/context/images/imageContext';
import ScrollTop from '../src/components/ScrollTop';
import Search from '../src/components/imageLibrary/Search';
import Results from '../src/components/imageLibrary/Results';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, LinearProgress } from '@material-ui/core';
import { motion } from 'framer-motion';

const useStyles = makeStyles(theme => ({
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: '10000',
  },
}));

const index = () => {
  const classes = useStyles();
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
      console.log('setQuery & getResults ran with:' + router.query.query);
    }
  }, [router.query.query]);

  return (
    <motion.div
      // initial={{ opacity: 0, y: 200 }}
      // animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <Grid container justify='center'>
        <Grid item xs={12} sm={7}>
          <Search />
        </Grid>
        {loading ? (
          // <Box display='flex' justifyContent='center' width={300}>
          // <Box className={classes.progress}>
          //   <LinearProgress />
          // </Box>
          <Grid item xs={12} sm={7}>
            <Box pt={0.5}>
              <LinearProgress />
            </Box>
          </Grid>
        ) : (
          // <Grid item xs={12} sm={7}>
          //   <Box pt={1}>
          //     <LinearProgress className={classes.progress} />
          //   </Box>
          // </Grid>
          <Grid item xs={12}>
            <Box pt={2}>
              <Results results={results} />
            </Box>
          </Grid>
        )}
      </Grid>
      <ScrollTop />
    </motion.div>
  );
};

export default index;
