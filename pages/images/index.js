import { useEffect, useContext } from 'react';
import ImageContext from '../../src/context/images/imageContext';
import ScrollTop from '../../src/components/ScrollTop';
import Search from '../../src/components/imageLibrary/Search';
import Results from '../../src/components/imageLibrary/Results';
import { Box, Grid, LinearProgress } from '@material-ui/core';

const index = () => {
  const imageContext = useContext(ImageContext);
  const { getResults, results, loading, query } = imageContext;

  return (
    <>
      <Grid container justify='center'>
        <Grid item xs={12} sm={7}>
          <Search />
        </Grid>
        {loading ? (
          // <Box display='flex' justifyContent='center' width={300}>
          <Grid item xs={12} sm={7}>
            <Box pt={1}>
              <LinearProgress />
            </Box>
          </Grid>
        ) : (
          <Grid item>
            <Box pt={2}>
              <Results results={results} />
            </Box>
          </Grid>
        )}
      </Grid>
      <ScrollTop />
    </>
  );
};

export default index;
