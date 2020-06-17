import { useContext } from 'react';
import { useRouter } from 'next/router';
import ImageContext from '../../context/images/imageContext';
import { Type } from '../Type';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Avatar,
  Grid,
  Button,
  Box,
  Zoom,
} from '@material-ui/core';
import { motion, useAnimation } from 'framer-motion';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 320,
    minWidth: 320,
    [theme.breakpoints.only('sm')]: {
      maxWidth: 300,
      minWidth: 300,
    },
    '&:hover': {
      cursor: 'pointer',
      border: `1px solid ${theme.palette.primary.main}`,
      boxShadow:
        '0px 3px 5px -1px rgba(112, 93, 207,0.2),0px 5px 8px 0px rgba(112, 93, 207,0.14),0px 1px 14px 0px rgba(112, 93, 207,0.12)',
    },
    '@media (max-width: 350px)': {
      maxWidth: 300,
      minWidth: 300,
    },
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  cardHeader: {
    height: 90,
    [theme.breakpoints.only('sm')]: {
      height: 100,
    },
    '@media (max-width: 350px)': {
      height: 100,
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  boxLink: {
    textDecoration: 'none',
  },
}));

const Results = ({ results }) => {
  const classes = useStyles();
  const router = useRouter();
  const imageContext = useContext(ImageContext);
  const { setCurrent } = imageContext;
  let delay = 0;
  const resultsBeginning = results.slice(0, 20);
  const resultsEnd = results.slice(20);

  const handleClick = currentItem => {
    setCurrent(currentItem);
    router.push('/imageItem');
  };

  const beginningContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.05,
      },
    },
  };

  const framerItem = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  if (results.length === 0) {
    return (
      <Grid container spacing={2} justify='center'>
        <Grid item>
          <Type>No results... Please search again</Type>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <motion.div
        variants={beginningContainer}
        initial='hidden'
        animate='visible'
      >
        <Grid container spacing={2} justify='center'>
          {resultsBeginning.map(item => {
            return (
              <Grid item key={item.data[0].nasa_id}>
                <motion.div variants={framerItem} whileHover={{ scale: 1.08 }}>
                  <Card
                    className={classes.root}
                    onClick={() => handleClick(item)}
                  >
                    <CardHeader
                      className={classes.cardHeader}
                      avatar={
                        <Avatar aria-label='center' className={classes.avatar}>
                          <Type variant='button' color='primary.contrastText'>
                            {item.data[0].center === 'Select'
                              ? ''
                              : item.data[0].center}
                          </Type>
                        </Avatar>
                      }
                      title={item.data[0].title}
                      titleTypographyProps={{ color: 'textPrimary' }}
                      subheader={item.data[0].date_created.slice(0, 10)}
                    />
                    <CardMedia
                      className={classes.media}
                      image={item.links[0].href}
                      title={item.data[0].title}
                    />
                    <CardActions disableSpacing>
                      <Box color='primary.light'>
                        <Button
                          color='inherit'
                          onClick={() => handleClick(item)}
                        >
                          Learn More
                        </Button>
                      </Box>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </motion.div>
      <Grid container spacing={2} justify='center'>
        {resultsEnd.map(item => {
          return (
            <Grid item key={item.data[0].nasa_id}>
              <motion.div variants={framerItem} whileHover={{ scale: 1.08 }}>
                <Card
                  className={classes.root}
                  onClick={() => handleClick(item)}
                >
                  <CardHeader
                    className={classes.cardHeader}
                    avatar={
                      <Avatar aria-label='center' className={classes.avatar}>
                        <Type variant='button' color='primary.contrastText'>
                          {item.data[0].center === 'Select'
                            ? ''
                            : item.data[0].center}
                        </Type>
                      </Avatar>
                    }
                    title={item.data[0].title}
                    titleTypographyProps={{ color: 'textPrimary' }}
                    subheader={item.data[0].date_created.slice(0, 10)}
                  />
                  <CardMedia
                    className={classes.media}
                    image={item.links[0].href}
                    title={item.data[0].title}
                  />
                  <CardActions disableSpacing>
                    <Box color='primary.light'>
                      <Button color='inherit' onClick={() => handleClick(item)}>
                        Learn More
                      </Button>
                    </Box>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Results;
