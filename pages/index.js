import { Type } from '../src/components/Type';
import Link from '../src/components/Link';
import { Container, Box, Button, makeStyles, Grid } from '@material-ui/core';
import { motion } from 'framer-motion';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
  },
  nasaLink: {
    // fontWeight: '300',
    // textDecoration: 'underline',
  },
  heroImg: {
    width: '15rem',
    height: 'auto',
    '@media (min-width: 350px)': {},
  },
}));

const Index = () => {
  const classes = useStyles();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // initial={{ opacity: 0, y: 200 }}
      // animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0 }}

      // animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0 }}
    >
      <Box>
        <Container maxWidth='xs' className={classes.root}>
          <Box py={{ xs: 1 }}>
            <Grid container spacing={2} justify='center' alignItems='center'>
              <Grid item container xs={12} justify='center' alignItems='center'>
                <Grid item>
                  <img
                    src='/rocket-orig.svg'
                    alt='rocket'
                    className={classes.heroImg}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Type
                  variant='h2'
                  align='center'
                  fontWeight='fontWeightBold'
                  // fontSize='2.8rem'
                >
                  Explore NASA Imagery and Data
                </Type>
              </Grid>
              <Grid item xs={12}>
                <Type
                  variant='h4'
                  align='center'
                  fontWeight='fontWeightLight'
                  color='text.secondary'
                >
                  A free and open source project, built with REST APIs from{' '}
                  <Box fontWeight='fontWeightLight' component='span'>
                    <Link
                      href='https://api.nasa.gov'
                      color='textSecondary'
                      className={classes.nasaLink}
                      underline='hover'
                    >
                      api.nasa.gov
                    </Link>
                  </Box>
                </Type>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  size='large'
                  component={Link}
                  href='/images'
                >
                  Start Exploring
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Box color='primary.light'>
                  <Button
                    variant='outlined'
                    color='inherit'
                    fullWidth
                    size='large'
                  >
                    Learn More
                  </Button>
                </Box>
              </Grid>
              <Grid item>
                <Type>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
                  facilis est obcaecati nobis aperiam atque suscipit. Magni
                  dolor, officia dignissimos repellendus unde iusto inventore
                  voluptatem reiciendis. Accusamus, voluptates. Fugit,
                  perspiciatis. Lorem ipsum dolor, sit amet consectetur
                  adipisicing elit. Nam facilis est obcaecati nobis aperiam
                  atque suscipit. Magni dolor, officia dignissimos repellendus
                  unde iusto inventore voluptatem reiciendis. Accusamus,
                  voluptates. Fugit, perspiciatis. Lorem ipsum dolor, sit amet
                  consectetur adipisicing elit. Nam facilis est obcaecati nobis
                  aperiam atque suscipit. Magni dolor, officia dignissimos
                  repellendus unde iusto inventore voluptatem reiciendis.
                  Accusamus, voluptates. Fugit, perspiciatis.
                </Type>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Index;
