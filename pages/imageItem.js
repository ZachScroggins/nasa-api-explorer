import { useContext } from 'react';
import ImageContext from '../src/context/images/imageContext';
import { Type } from '../src/components/Type';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Paper } from '@material-ui/core';
import { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
  img: {
    maxWidth: '100%',
    height: 'auto',
  },
}));

const imageItem = () => {
  const classes = useStyles();
  const imageContext = useContext(ImageContext);
  const { current, currentManifest, getCurrentManifest } = imageContext;
  let prevCurrent;
  if (typeof window !== 'undefined') {
    prevCurrent = JSON.parse(localStorage.getItem('current'));
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scroll(0, 0);
    }
  }, []);

  useEffect(() => {
    if (current) {
      getCurrentManifest(current.data[0].nasa_id);
      console.log('ran current');
    } else {
      getCurrentManifest(prevCurrent.data[0].nasa_id);
      console.log('ran prevCurrent');
    }
  }, []);
  console.log(currentManifest && currentManifest[0].href);

  return (
    <Box p={{ lg: 10 }}>
      <Paper>
        <Grid container>
          {current ? (
            <>
              <Grid
                item
                container
                xs={12}
                md={6}
                justify='flex-start'
                // justify='center'
                alignItems='center'
              >
                <Grid item>
                  <Box overflow='hidden'>
                    <img src={current.links[0].href} className={classes.img} />
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Type variant='h4'>{current.data[0].title}</Type>
                <p>current</p>
                <h1>{current.data[0].nasa_id}</h1>
              </Grid>
            </>
          ) : (
            <>
              <Grid
                item
                container
                xs={12}
                md={6}
                justify='flex-start'
                alignItems='center'
              >
                <Grid item>
                  {/* <Box overflow='hidden'> */}
                  <img
                    src={prevCurrent.links[0].href}
                    className={classes.img}
                  />
                  {/* </Box> */}
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Type variant='h4'>{prevCurrent.data[0].title}</Type>
                <h1>{prevCurrent.data[0].nasa_id}</h1>
              </Grid>
              <p>prevCurrent</p>
              <img src={currentManifest && currentManifest[0].href} />
            </>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default imageItem;
