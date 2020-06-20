import { useContext } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
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
} from '@material-ui/core';

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
  glow: {
    textShadow: `2px 8px 15px ${theme.palette.primary.main}`,
  },
}));

const containerVariant = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.005,
    },
  },
};

const resultVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

const noResultVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const Results = ({ results }) => {
  const classes = useStyles();
  const router = useRouter();
  const imageContext = useContext(ImageContext);
  const { setCurrent } = imageContext;

  const handleClick = currentItem => {
    setCurrent(currentItem);
    router.push('/imageItem');
  };

  if (results.length === 0) {
    return (
      <Grid container spacing={2} justify='center'>
        <Grid item>
          <Box pt={2}>
            <motion.div
              variants={noResultVariant}
              initial='hidden'
              animate='visible'
            >
              <Type variant='h4' className={classes.glow}>
                No results...
              </Type>
            </motion.div>
          </Box>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <motion.div
        variants={containerVariant}
        initial='hidden'
        animate='visible'
      >
        <Grid container spacing={2} justify='center'>
          {results.map(item => {
            return (
              <Grid item key={item.data[0].nasa_id}>
                <motion.div
                  variants={resultVariant}
                  whileHover={{ scale: 1.08 }}
                >
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
    </>
  );
};

export default Results;
