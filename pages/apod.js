import { useState } from 'react';
import { useContext } from 'react';
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
} from '@material-ui/core';
import { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
  img: {
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
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // marginTop: -50,
    // marginLeft: -100,
  },
}));

const apod = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:960px)');
  const [open, setOpen] = useState(false);
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
  } = apodContext;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return (
      <div className={classes.progress}>
        <CircularProgress size={100} />
      </div>
    );
  } else if (copyright) {
    return (
      <Grid container justify='center' alignContent='center'>
        <Grid item>
          <Type variant='h2' align='center'>
            Sorry, today's image is copyrighted...
          </Type>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <>
        <Container maxWidth='lg'>
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Grid container justify='center' alignContent='center'>
              <Grid item>
                <Card>
                  {mediaType === 'video' ? (
                    <CardMedia
                      src={url}
                      title={title}
                      component='iframe'
                      className={classes.vid}
                    />
                  ) : (
                    <CardMedia
                      src={url}
                      title={title}
                      component='img'
                      className={classes.img}
                      onClick={handleOpen}
                    />
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
                        <Type variant='h5'>{title}</Type>
                      </Grid>
                      <Grid
                        item
                        container
                        justify={matches ? 'flex-end' : 'flex-start'}
                        alignItems='center'
                        xs={12}
                        md={6}
                      >
                        <Type color='text.secondary' fontSize={{ md: '20px' }}>
                          {date}
                        </Type>
                      </Grid>
                    </Grid>
                    <Box py={2}>
                      <Divider />
                    </Box>
                    <Type>{explanation}</Type>
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
          closeAfterTransition
        >
          <motion.div
            initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={classes.modalAnimation}
          >
            <img src={hdurl} title={title} className={classes.modalImg} />
          </motion.div>
        </Modal>
      </>
    );
  }
};

export default apod;
