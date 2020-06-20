import React from 'react';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  m81: {
    width: '100%',
    height: 'auto',
  },
}));

const containerVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const galaxyVariant = {
  hidden: {
    y: 0,
    scale: 1.005,
    // skew: 1,
  },
  visible: {
    y: 10,
    scale: 1,
    transition: {
      yoyo: Infinity,
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

const MotionGalaxy = () => {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      variants={containerVariant}
      initial='hidden'
      animate={loaded && 'visible'}
    >
      <motion.img
        src='/M81.png'
        title='M81 Galaxy'
        className={classes.m81}
        width='795'
        height='614'
        variants={galaxyVariant}
        onLoad={() => setLoaded(true)}
      />
    </motion.div>
  );
};

export default MotionGalaxy;
