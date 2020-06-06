import { useContext } from 'react';
import ImageContext from '../../src/context/images/imageContext';
import { Box } from '@material-ui/core';

const imageItem = () => {
  const imageContext = useContext(ImageContext);
  const { current } = imageContext;
  const data = current.data[0];

  return (
    <Box overflow='hidden'>
      <h1>{data.nasa_id}</h1>
      <img src={current.links[0].href} />
    </Box>
  );
};

export default imageItem;
