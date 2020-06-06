import { useContext, useEffect } from 'react';
import ImageContext from '../../src/context/images/imageContext';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

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
    <>
      {current ? (
        <Box overflow='hidden'>
          <img src={current.links[0].href} className={classes.img} />
          <h1>{current.data[0].nasa_id}</h1>
          <p>current</p>
        </Box>
      ) : (
        <Box overflow='hidden'>
          <img src={prevCurrent.links[0].href} className={classes.img} />
          <h1>{prevCurrent.data[0].nasa_id}</h1>
          <p>prevCurrent</p>
        </Box>
      )}
    </>
  );
};

export default imageItem;
