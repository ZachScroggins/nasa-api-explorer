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

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 320,
    minWidth: 320,
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

  const handleClick = currentItem => {
    setCurrent(currentItem);
    router.push('/images/imageItem');
  };

  return (
    <Grid container spacing={2} justify='center'>
      {results.map(item => {
        if (delay < 300) {
          delay = delay + 30;
        }
        return (
          <Grid item key={item.data[0].nasa_id}>
            <Zoom in={true}>
              {/* <Zoom in={true} style={{ transitionDelay: `${delay}ms` }}> */}
              <Card
                className={classes.root}
                variant='outlined'
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
            </Zoom>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Results;
