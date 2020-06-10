import { useContext } from 'react';
import ImageContext from '../../src/context/images/imageContext';
import { Type } from '../../src/components/Type';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  img: {
    maxWidth: '100%',
    height: 'auto',
  },
}));

const imageItem = () => {
  const classes = useStyles();
  const imageContext = useContext(ImageContext);
  const { current } = imageContext;
  let prevCurrent;
  if (typeof window !== 'undefined') {
    prevCurrent = JSON.parse(localStorage.getItem('current'));
  }

  return (
    <Grid container>
      {current ? (
        <>
          <Grid item xs={12} md={6}>
            <Box overflow='hidden'>
              <img src={current.links[0].href} className={classes.img} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Type variant='h4'>{current.data[0].title}</Type>
            <p>current</p>
          </Grid>
        </>
      ) : (
        <Box overflow='hidden'>
          <img src={prevCurrent.links[0].href} className={classes.img} />
          <Type variant='h4'>{prevCurrent.data[0].title}</Type>
          <p>prevCurrent</p>
        </Box>
      )}
    </Grid>
  );
};

export default imageItem;
