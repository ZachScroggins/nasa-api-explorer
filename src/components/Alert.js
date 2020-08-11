import { useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiX } from 'react-icons/fi';

const alertVariant = {
  hidden: {
    opacity: 0,
    scale: 0,
    x: '-50%',
    y: 100,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: '-50%',
    y: 0,
  },
};

const Alert = ({ open, message, setError }) => {
  const alertTimerRef = useRef(null);
  const errorRef = useRef({});

  useEffect(() => {
    if (open) {
      errorRef.current = { status: false, message: null };
      alertTimerRef.current = setTimeout(() => {
        setError(errorRef.current);
      }, 5000);
    } else {
      clearTimeout(alertTimerRef.current);
    }
  }, [open]);

  return (
    <>
      <motion.div
        initial='hidden'
        animate={open ? 'visible' : 'hidden'}
        variants={alertVariant}
        aria-label='alert-popup'
        className='fixed right-auto z-50 flex items-center justify-center'
        style={{
          left: '50%',
          bottom: '4rem',
          // transform: 'translateX(-50%)',
          minWidth: '18rem',
        }}
      >
        <div className='flex items-center justify-center bg-red-600 rounded-lg px-4 py-2'>
          <FiAlertCircle className='text-3xl flex-shrink-0' />
          <p className='text-lg ml-2'>{message}</p>
          <FiX
            className='text-xl flex-shrink-0 cursor-pointer lg:ml-8'
            title='Close Alert'
            aria-label='close-alert'
            onClick={() => setError({ status: false, message: null })}
          />
        </div>
      </motion.div>
    </>
  );
};

export default Alert;
