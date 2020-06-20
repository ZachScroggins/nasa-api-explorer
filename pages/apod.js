import { useState, useContext, useEffect } from 'react';
import ApodContext from '../src/context/apod/apodContext';
import { Type } from '../src/components/Type';
import { motion } from 'framer-motion';
import {
  Box,
  Grid,
  Container,
  Card,
  CardMedia,
  CardContent,
  Divider,
  useMediaQuery,
  Modal,
  makeStyles,
  CircularProgress,
  LinearProgress,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  img: {
    maxHeight: '70vh',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  cardContent: {
    overflow: 'auto',
  },
  modalAnimation: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  modalImg: {
    maxWidth: '90vw',
    maxHeight: '90vh',
    height: 'auto',
  },
  vid: {
    minHeight: '25vh',
    [theme.breakpoints.up('sm')]: {
      minHeight: '50vh',
      width: '100%',
    },
  },
}));

const containerVariant = {
  hidden: {
    opacity: 0,
    y: 200,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const imgVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 2,
    },
  },
};

const modalLoaderVariant = {
  visible: {
    opacity: 1,
    x: '-50%',
    y: '-50%',
  },
  hidden: {
    opacity: 0,
  },
};

const modalVariant = {
  hidden: {
    opacity: 0,
    scale: 0,
    x: '-50%',
    y: '-50%',
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
    },
  },
};

const errorVariant = {
  hidden: {
    y: -200,
  },
  visible: {
    y: 0,
  },
};

const apod = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:960px)');
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [modalLoaded, setModalLoaded] = useState(false);
  const apodContext = useContext(ApodContext);
  const {
    date,
    explanation,
    hdurl,
    mediaType,
    title,
    url,
    copyright,
    loading,
    statusCode,
  } = apodContext;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scroll(0, 0);
    }
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return (
      <>
        <LinearProgress />
      </>
    );
  } else if (statusCode === 500) {
    return (
      <Grid container justify='center' alignContent='center'>
        <Grid item>
          <motion.div
            variants={errorVariant}
            initial='hidden'
            animate='visible'
          >
            <Type variant='h2' align='center'>
              Sorry, there was an error with NASA's servers...
            </Type>
          </motion.div>
        </Grid>
      </Grid>
    );
  } else if (copyright) {
    return (
      <Grid container justify='center' alignContent='center'>
        <Grid item>
          <motion.div
            variants={errorVariant}
            initial='hidden'
            animate='visible'
          >
            <Type variant='h2' align='center'>
              Sorry, today's image is copyrighted...
            </Type>
          </motion.div>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <>
        <Container maxWidth='lg'>
          <motion.div
            variants={containerVariant}
            initial='hidden'
            animate={loaded && 'visible'}
          >
            <Grid container justify='center' alignContent='center'>
              <Grid item>
                <Card>
                  {mediaType === 'video' ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 2,
                      }}
                    >
                      <CardMedia
                        src={url}
                        title={title}
                        component='iframe'
                        className={classes.vid}
                        onLoad={() => setLoaded(true)}
                      />
                    </motion.div>
                  ) : (
                    // <motion.div
                    //   initial={{ opacity: 0 }}
                    //   animate={{ opacity: 1 }}
                    //   transition={{
                    //     duration: 2,
                    //   }}
                    // >
                    <motion.div
                      // initial='hidden'
                      // animate={loaded && 'visible'}
                      variants={imgVariant}
                    >
                      <CardMedia
                        src={url}
                        title={title}
                        component='img'
                        className={classes.img}
                        onClick={handleOpen}
                        onLoad={() => setLoaded(true)}
                      />
                    </motion.div>
                  )}
                  <CardContent className={classes.cardContent}>
                    <Grid container>
                      <Grid
                        item
                        container
                        justify='flex-start'
                        alignItems='center'
                        xs={12}
                        md={6}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.5,
                          }}
                        >
                          <Type variant='h5'>{title}</Type>
                        </motion.div>
                      </Grid>
                      <Grid
                        item
                        container
                        justify={matches ? 'flex-end' : 'flex-start'}
                        alignItems='center'
                        xs={12}
                        md={6}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.75,
                          }}
                        >
                          <Type
                            color='text.secondary'
                            fontSize={{ md: '20px' }}
                          >
                            {date}
                          </Type>
                        </motion.div>
                      </Grid>
                    </Grid>
                    <Box py={2}>
                      <Divider />
                    </Box>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 1,
                      }}
                    >
                      <Type>{explanation}</Type>
                    </motion.div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
        <Modal
          disablePortal
          open={open}
          onClose={handleClose}
          aria-label='image-modal'
        >
          <>
            <motion.div
              variants={modalLoaderVariant}
              initial='visible'
              animate={!modalLoaded && 'hidden'}
              className={classes.modalAnimation}
            >
              <CircularProgress size={150} />
            </motion.div>
            <motion.div
              initial='hidden'
              animate={modalLoaded && 'visible'}
              variants={modalVariant}
              className={classes.modalAnimation}
            >
              <img
                src={hdurl}
                title={title}
                className={classes.modalImg}
                onLoad={() => setModalLoaded(true)}
              />
            </motion.div>
          </>
        </Modal>
      </>
    );
  }
};

export default apod;
