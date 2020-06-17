import { Type } from '../src/components/Type';
import Link from '../src/components/Link';
import {
  Container,
  Box,
  Button,
  makeStyles,
  Grid,
  Hidden,
} from '@material-ui/core';
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
    '@media (min-width: 960px)': {
      // width: '23rem',
    },
  },
}));

const Index = () => {
  const classes = useStyles();

  return (
    <motion.div initial={{ opacity: 0, y: 200 }} animate={{ opacity: 1, y: 0 }}>
      <Box>
        <Container maxWidth='sm' className={classes.root}>
          <Box py={{ xs: 1 }}>
            <Grid container spacing={2} justify='center' alignItems='center'>
              <Grid item container xs={12} justify='center' alignItems='center'>
                <Grid item>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <img
                      src='/rocket-orig.svg'
                      alt='rocket'
                      className={classes.heroImg}
                    />
                  </motion.div>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 3 }}
                >
                  <Type
                    variant='h2'
                    align='center'
                    fontWeight='fontWeightBold'
                    // fontSize='2.8rem'
                  >
                    Explore NASA Imagery and Data
                  </Type>
                </motion.div>
              </Grid>
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 4 }}
                >
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
                </motion.div>
              </Grid>
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 4 }}
                >
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
                </motion.div>
              </Grid>
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 4 }}
                >
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
                </motion.div>
              </Grid>
            </Grid>
            {/* <Grid container>
              <Grid item>
                <Type>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Distinctio quam, ea consequuntur reiciendis dolores provident
                  natus pariatur delectus maxime quidem asperiores vitae sunt
                  iure perspiciatis voluptatum porro ab harum dignissimos ad
                  ipsa, rem dolore quae consectetur. Enim explicabo officiis ab
                  tempora, non distinctio dicta eius. Nisi aliquam pariatur
                  corrupti velit.
                </Type>
              </Grid>
            </Grid> */}
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Index;
