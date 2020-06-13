import { useContext, useState } from 'react';
import ImageContext from '../src/context/images/imageContext';
import { Type } from '../src/components/Type';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
  Divider,
  Modal,
} from '@material-ui/core';
import { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  cardContent: {
    overflow: 'auto',
  },
  chipRoot: {
    display: 'inline',
    '& > *': {
      margin: '4px 4px 4px 0',
    },
  },
  img: {
    maxWidth: '100%',
    height: 'auto',
    maxHeight: '70vh', // move this to box that clones image for responsive values
    '&:hover': {
      cursor: 'pointer',
    },
  },
  modalImg: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '100%',
    height: 'auto',
    maxHeight: '90vh',
  },
}));

const imageItem = () => {
  const classes = useStyles();
  const imageContext = useContext(ImageContext);
  const { current, currentManifest, getCurrentManifest } = imageContext;
  const [open, setOpen] = useState(false);
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box p={{ lg: 5 }}>
      <Grid container justify='center' alignItems='center'>
        {current ? (
          <Grid item>
            <Box
              clone
              display={{ xs: 'block', md: 'flex' }}
              maxWidth={{ xs: '90vw', xl: '75%' }}
              maxHeight={{ md: '70vh' }}
            >
              <Card>
                {/* <CardActionArea> */}
                <CardMedia
                  className={classes.img}
                  component='img'
                  src={current.links[0].href}
                  title={current.data[0].title}
                  onClick={handleOpen}
                />
                {/* </CardActionArea> */}
                <CardContent className={classes.cardContent}>
                  <Type variant='h4'>{current.data[0].title}</Type>
                  <Type
                    variant='subtitle1'
                    color='text.secondary'
                    fontWeight='fontWeightLight'
                  >
                    {current.data[0].date_created.slice(0, 10)}
                  </Type>
                  <Box pb={2} pt={1}>
                    <Divider />
                  </Box>
                  <Type variant='body1' display='inline' mr={1}>
                    Keywords:
                  </Type>
                  <Box className={classes.chipRoot}>
                    {current.data[0].keywords.map(keyword => (
                      <Box clone key={keyword}>
                        <Chip label={keyword} size='small' color='secondary' />
                      </Box>
                    ))}
                  </Box>
                  <Box py={2}>
                    <Type variant='body1' display='inline'>
                      Secondary Creator:{' '}
                    </Type>
                    <Type variant='body1' display='inline'>
                      {current.data[0].secondary_creator}
                    </Type>
                  </Box>
                  <Box pb={2}>
                    <Type variant='body1' display='inline'>
                      NASA ID:{' '}
                    </Type>
                    <Type variant='body1' display='inline'>
                      {current.data[0].nasa_id}
                    </Type>
                  </Box>
                  <Box pb={2}>
                    <Type variant='body1' display='inline'>
                      Center:{' '}
                    </Type>
                    <Type variant='body1' display='inline'>
                      {current.data[0].center}
                    </Type>
                  </Box>
                  <Box pb={2}>
                    <Divider />
                  </Box>
                  <Type variant='body1'>{current.data[0].description}</Type>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ) : (
          <Grid item>
            <Box
              clone
              display={{ xs: 'block', md: 'flex' }}
              maxWidth={{ xs: '90vw', xl: '1920px' }}
              maxHeight={{ md: '70vh' }}
            >
              <Card>
                <CardMedia
                  className={classes.img}
                  component='img'
                  src={prevCurrent.links[0].href}
                  title={prevCurrent.data[0].title}
                  onClick={handleOpen}
                />
                <CardContent className={classes.cardContent}>
                  <Type variant='h4'>{prevCurrent.data[0].title}</Type>
                  <Type
                    variant='subtitle1'
                    color='text.secondary'
                    fontWeight='fontWeightLight'
                  >
                    {prevCurrent.data[0].date_created.slice(0, 10)}
                  </Type>
                  <Box pb={2} pt={1}>
                    <Divider />
                  </Box>
                  <Type variant='body1' display='inline' mr={1}>
                    Keywords:
                  </Type>
                  <Box className={classes.chipRoot}>
                    {prevCurrent.data[0].keywords.map(keyword => (
                      <Box clone key={keyword}>
                        <Chip label={keyword} size='small' color='secondary' />
                      </Box>
                    ))}
                  </Box>
                  <Box py={2}>
                    <Type variant='body1' display='inline'>
                      Secondary Creator:{' '}
                    </Type>
                    <Type variant='body1' display='inline'>
                      {prevCurrent.data[0].secondary_creator}
                    </Type>
                  </Box>
                  <Box pb={2}>
                    <Type variant='body1' display='inline'>
                      NASA ID:{' '}
                    </Type>
                    <Type variant='body1' display='inline'>
                      {prevCurrent.data[0].nasa_id}
                    </Type>
                  </Box>
                  <Box pb={2}>
                    <Type variant='body1' display='inline'>
                      Center:{' '}
                    </Type>
                    <Type variant='body1' display='inline'>
                      {prevCurrent.data[0].center}
                    </Type>
                  </Box>
                  <Box pb={2}>
                    <Divider />
                  </Box>
                  <Type variant='body1'>{prevCurrent.data[0].description}</Type>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        )}
      </Grid>
      <p>{current ? 'current' : 'prevCurrent'}</p>
      <Modal
        disablePortal
        open={open}
        onClose={handleClose}
        aria-label='image-modal'
      >
        <img
          src={currentManifest && currentManifest[0].href}
          // alt={current ? current.data[0].title : prevCurrent.data[0].title}
          title={current ? current.data[0].title : prevCurrent.data[0].title}
          className={classes.modalImg}
        />
      </Modal>
    </Box>
  );
};

export default imageItem;
