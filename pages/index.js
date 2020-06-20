import { Type } from '../src/components/Type';
import Link from '../src/components/Link';
import RocketSvg from '../src/components/RocketSvg';
import { Container, Box, Button, makeStyles, Grid } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
  },
  heroImg: {
    width: '15rem',
    height: 'auto',
  },
}));

const buttonVariant = {
  hidden: {
    scale: 0,
    y: -40,
  },
  visible: {
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  whileHover: { scale: 1.03 },
};

const Index = () => {
  const classes = useStyles();
  const scrollRef = useRef(null);

  const handleLearnMore = () => {
    scrollRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center', // or 'start'
    });
  };

  return (
    <Box>
      <Container maxWidth='sm' className={classes.root}>
        <Box py={{ xs: 1 }} mb={50}>
          <Grid container spacing={2} justify='center' alignItems='center'>
            <Grid item container xs={12} justify='center' alignItems='center'>
              <Grid item>
                <RocketSvg />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Type variant='h2' align='center' fontWeight='fontWeightBold'>
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
                    underline='hover'
                  >
                    api.nasa.gov
                  </Link>
                </Box>
              </Type>
            </Grid>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1,
                }}
              >
                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  size='large'
                  component={Link}
                  naked
                  href='/images'
                >
                  Start Exploring
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <Box color='primary.light'>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3,
                  }}
                >
                  <Button
                    variant='outlined'
                    color='inherit'
                    fullWidth
                    size='large'
                    onClick={handleLearnMore}
                  >
                    Learn More
                  </Button>
                </motion.div>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Grid container>
          <Grid item>
            <Type variant='h4' id='description'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio quam, ea consequuntur reiciendis dolores provident
              natus pariatur delectus maxime quidem asperiores vitae sunt iure
              perspiciatis voluptatum porro ab harum dignissimos ad ipsa, rem
              dolore quae consectetur. Enim explicabo officiis ab tempora, non
              distinctio dicta eius. Nisi aliquam pariatur corrupti velit.
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio quam, ea consequuntur reiciendis dolores provident
              natus pariatur delectus maxime quidem asperiores vitae sunt iure
              perspiciatis voluptatum porro ab harum dignissimos ad ipsa, rem
              dolore quae consectetur. Enim explicabo officiis ab tempora, non
              distinctio dicta eius. Nisi aliquam pariatur corrupti velit.
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio quam, ea consequuntur reiciendis dolores provident
              natus pariatur delectus maxime quidem asperiores vitae sunt iure
              perspiciatis voluptatum porro ab harum dignissimos ad ipsa, rem
              dolore quae consectetur. Enim explicabo officiis ab tempora, non
              distinctio dicta eius. Nisi aliquam pariatur corrupti velit.
            </Type>
            <p ref={scrollRef}>eyy</p>
            <Type variant='h4'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio quam, ea consequuntur reiciendis dolores provident
              natus pariatur delectus maxime quidem asperiores vitae sunt iure
              perspiciatis voluptatum porro ab harum dignissimos ad ipsa, rem
              dolore quae consectetur. Enim explicabo officiis ab tempora, non
              distinctio dicta eius. Nisi aliquam pariatur corrupti velit.
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio quam, ea consequuntur reiciendis dolores provident
              natus pariatur delectus maxime quidem asperiores vitae sunt iure
              perspiciatis voluptatum porro ab harum dignissimos ad ipsa, rem
              dolore quae consectetur. Enim explicabo officiis ab tempora, non
              distinctio dicta eius. Nisi aliquam pariatur corrupti velit.
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio quam, ea consequuntur reiciendis dolores provident
              natus pariatur delectus maxime quidem asperiores vitae sunt iure
              perspiciatis voluptatum porro ab harum dignissimos ad ipsa, rem
              dolore quae consectetur. Enim explicabo officiis ab tempora, non
              distinctio dicta eius. Nisi aliquam pariatur corrupti velit.
            </Type>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Index;
