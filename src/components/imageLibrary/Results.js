import { useContext } from 'react';
import { useRouter } from 'next/router';
import ImageContext from '../../context/images/imageContext';
import { Type } from '../Type';
import Link from '../Link';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Avatar,
  Grid,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 320,
    minWidth: 320,
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
}));

const Results = ({ results }) => {
  const classes = useStyles();
  const router = useRouter();
  const imageContext = useContext(ImageContext);
  const { setCurrent } = imageContext;

  const handleClick = currentItem => {
    setCurrent(currentItem);
    router.push('/images/imageItem', `images/${currentItem.data[0].nasa_id}`);
  };

  return (
    <Grid container spacing={2} justify='center'>
      {results.map(item => (
        <Grid item key={item.data[0].nasa_id}>
          <Card className={classes.root} variant='outlined'>
            <CardHeader
              className={classes.cardHeader}
              avatar={
                <Avatar aria-label='center' className={classes.avatar}>
                  <Type variant='button'>
                    {item.data[0].center === 'Select'
                      ? ''
                      : item.data[0].center}
                  </Type>
                </Avatar>
              }
              title={item.data[0].title}
              subheader={item.data[0].date_created.slice(0, 10)}
            />
            <CardMedia
              className={classes.media}
              image={item.links[0].href}
              title={item.data[0].title}
            />
            <CardActions disableSpacing>
              <Button
                color='primary'
                // component='a'
                // naked
                // href='/images/imageItem'
                // as={item.data[0].nasa_id}
                onClick={() => handleClick(item)}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Results;
