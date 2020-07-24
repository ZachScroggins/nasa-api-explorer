import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

const ScrollTop = () => {
  const prevScrollY = useRef(0);

  const [goingUp, setGoingUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // if (prevScrollY.current < currentScrollY && goingUp) {
      //   setGoingUp(false);
      // }
      // if (prevScrollY.current > currentScrollY && !goingUp) {
      //   setGoingUp(true);
      // }
      if (prevScrollY.current < 150) {
        setGoingUp(false);
      }
      if (prevScrollY.current > 150) {
        setGoingUp(true);
      }

      prevScrollY.current = currentScrollY;
      // console.log(goingUp, currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [goingUp]);

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const scrollVariant = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
  };

  return (
    <>
      <motion.div
        className='cursor-pointer rounded-full w-12 h-12 fixed bottom-0 right-0 bg-primary flex items-center justify-center mb-4 mr-4'
        onClick={handleClick}
        initial='hidden'
        animate={goingUp ? 'visible' : 'hidden'}
        variants={scrollVariant}
      >
        <FiArrowUp size='2em' />
      </motion.div>
    </>
  );
};

export default ScrollTop;
