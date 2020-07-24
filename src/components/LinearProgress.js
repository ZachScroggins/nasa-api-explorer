import { motion } from 'framer-motion';

const LinearProgress = ({ bgClasses, fgClasses = 'bg-black' }) => {
  return (
    <div
      className={`h-1 w-full overflow-hidden fixed top-0 left-0 z-30 ${bgClasses}`}
    >
      <motion.div
        className={`h-5 ${fgClasses}`}
        initial={{ x: '-100vw' }}
        animate={{ x: '100vw' }}
        transition={{ loop: Infinity, duration: 1.3 }}
      ></motion.div>
    </div>
  );
};

export default LinearProgress;
