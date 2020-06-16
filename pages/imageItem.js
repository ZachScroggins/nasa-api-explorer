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
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

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
  modalAnimation: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    // transform: 'translate(-50%, -50%)',
    // maxWidth: '90vw',
    // maxHeight: '90vh',
    // height: 'auto',
  },
  modalImg: {
    maxWidth: '90vw',
    maxHeight: '90vh',
    height: 'auto',
  },
}));

const imageItem = () => {
  const classes = useStyles();
  const router = useRouter();
  const imageContext = useContext(ImageContext);
  const {
    current,
    currentManifest,
    getCurrentManifest,
    setQuery,
    getResults,
  } = imageContext;
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     window.scroll(0, 0);
  //   }
  // }, []);

  useEffect(() => {
    getCurrentManifest(current.data[0].nasa_id);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const chipSearch = keyword => {
    setQuery(keyword);
    getResults(keyword);
    router.push({
      pathname: '/images',
      query: { query: keyword },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <Box p={{ lg: 5 }}>
        <Grid container justify='center' alignItems='center'>
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
                  <Type
                    variant='body1'
                    fontWeight='fontWeightBold'
                    display='inline'
                    mr={1}
                  >
                    Keywords:
                  </Type>
                  <Box className={classes.chipRoot}>
                    {current.data[0].keywords.map((keyword, index) => (
                      <Box clone key={index}>
                        <Chip
                          label={keyword}
                          size='small'
                          color='secondary'
                          onClick={() => chipSearch(keyword)}
                        />
                      </Box>
                    ))}
                  </Box>
                  <Box py={2}>
                    <Type
                      variant='body1'
                      fontWeight='fontWeightBold'
                      display='inline'
                    >
                      Secondary Creator:{' '}
                    </Type>
                    <Type variant='body1' display='inline'>
                      {current.data[0].secondary_creator}
                    </Type>
                  </Box>
                  <Box pb={2}>
                    <Type
                      variant='body1'
                      fontWeight='fontWeightBold'
                      display='inline'
                    >
                      NASA ID:{' '}
                    </Type>
                    <Type variant='body1' display='inline'>
                      {current.data[0].nasa_id}
                    </Type>
                  </Box>
                  <Box pb={2}>
                    <Type
                      variant='body1'
                      fontWeight='fontWeightBold'
                      display='inline'
                    >
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
        </Grid>
        <Modal
          disablePortal
          open={open}
          onClose={handleClose}
          aria-label='image-modal'
          closeAfterTransition
        >
          <motion.div
            initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            className={classes.modalAnimation}
          >
            <img
              src={currentManifest && currentManifest[0].href}
              title={current.data[0].title}
              className={classes.modalImg}
            />
          </motion.div>
        </Modal>
      </Box>
    </motion.div>
  );
};

export default imageItem;
