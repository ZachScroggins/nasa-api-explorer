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
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      duration: 2,
    },
  },
};

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
