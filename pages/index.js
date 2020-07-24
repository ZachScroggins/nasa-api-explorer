import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Type } from '../src/components/Type';
import Link from '../src/components/Link';
import RocketSvg from '../src/components/RocketSvg';
import MotionGalaxy from '../src/components/MotionGalaxy';
import {
  Container,
  Box,
  Button,
  makeStyles,
  Grid,
  useTheme,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  glow: {
    textShadow: `2px 8px 30px ${theme.palette.primary.main}`,
  },
  firstSection: {
    width: '100vw',
    height: 'auto',
    [theme.breakpoints.up('md')]: {
      paddingRight: '8rem',
    },
  },
  m81: {
    width: '100%',
    height: 'auto',
  },
}));

// const galaxyContainer = {
//   hidden: {

//   }
// }

const galaxyVariant = {
  hidden: {
    y: 0,
    scale: 1.005,
  },
  visible: {
    y: 1,
    scale: 1,
    rotate: -360,
    transition: {
      yoyo: Infinity,
      duration: 2,
      ease: 'easeInOut',
      rotate: {
        loop: Infinity,
        duration: 120,
        ease: 'linear',
      },
    },
  },
};

const Index = () => {
  const classes = useStyles();
  const theme = useTheme();
  const scrollRef = useRef(null);

  const handleLearnMore = () => {
    scrollRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center', // or 'start'
    });
  };

  return (
    <Box>
      <Container maxWidth='sm'>
        <Box>
          <Grid container spacing={2} justify='center' alignItems='center'>
            <Grid item container xs={12} justify='center' alignItems='center'>
              <Grid item>
                <RocketSvg />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Type
                variant='h2'
                align='center'
                fontWeight='fontWeightBold'
                className={classes.glow}
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
      </Container>
      <Box
        bgcolor='background.paper'
        my={2}
        pb={2}
        className={classes.firstSection}
        ref={scrollRef}
      >
        <Container maxWidth='sm'>
          {/* <motion.img
            src='/M81.png'
            title='M81 Galaxy'
            className={classes.m81}
            width='795'
            height='614'
            variants={galaxyVariant}
            initial='hidden'
            animate='visible'
          /> */}
          <MotionGalaxy />
          <Type variant='h4'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            quam, ea consequuntur reiciends dolores provident natus pariatur
            delectus maxime quidem asperiores vitae sunt iure perspiciatis
            voluptatum porro ab harum dignissimos ad ipsa, rem dolore quae
            consectetur. Enim explicabo officiis ab tempora, non distinctio
          </Type>
        </Container>
      </Box>
      <Container maxWidth='lg'>
        <Grid container>
          <Grid item>
            <Type variant='h4' id='description'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio quam, ea consequuntur reiciends dolores provident natus
              pariatur delectus maxime quidem asperiores vitae sunt iure
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
