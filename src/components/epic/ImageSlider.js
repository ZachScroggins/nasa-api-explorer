import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from '@popmotion/popcorn';

const variants = {
  enter: direction => {
    return {
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: direction => {
    return {
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    };
  },
};

const imgVariant = {
  init: {
    opacity: 0,
  },
  anim: {
    opacity: 1,
    transition: {
      duration: 3,
      delay: 1,
    },
  },
};

const ImageSlider = ({ current, type }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [loaded, setLoaded] = useState(false);
  const images = current.map(item => {
    const year = item?.date.slice(0, 4);
    const month = item?.date.slice(5, 7);
    const day = item?.date.slice(8, 10);
    const image = item?.image;
    const url = `https://epic.gsfc.nasa.gov/archive/${type}/${year}/${month}/${day}/jpg/${image}.jpg`;
    return url;
  });
  // const images = [
  //   'https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png',
  //   'https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png',
  //   'https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png',
  // ];

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page);

  const paginate = newDirection => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <AnimatePresence
        initial={false}
        custom={direction}
        style={{ width: '501px', height: '501px' }}
        exitBeforeEnter
      >
        <motion.div
          key={page}
          className='bg-black'
          style={{ width: '500px', height: '500px' }}
          custom={direction}
          variants={variants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 200 },
            opacity: { duration: 0.2 },
          }}
          drag='x'
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
          <motion.img
            key={page}
            src={images[imageIndex]}
            width='500px'
            height='500px'
            className='bg-black'
            onLoad={() => {
              setLoaded(true);
            }}
            loading='eager'
            variants={imgVariant}
            initial='init'
            animate='anim'
          />
        </motion.div>
        {/* <motion.img
          key={page}
          src={images[imageIndex]}
          width='500px'
          height='500px'
          className='bg-black'
          onLoad={() => {}}
          loading='eager'
          custom={direction}
          variants={variants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 200 },
            opacity: { duration: 0.2 },
          }}
          drag='x'
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        /> */}
      </AnimatePresence>
      <div className='next' onClick={() => paginate(1)}>
        {'‣'}
      </div>
      <div className='prev' onClick={() => paginate(-1)}>
        {'‣'}
      </div>
      <style jsx>{`
        .next,
        .prev {
          top: calc(50% - 20px);
          position: absolute;
          background: white;
          border-radius: 30px;
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          user-select: none;
          cursor: pointer;
          font-weight: bold;
          font-size: 18px;
          z-index: 2;
        }

        .next {
          right: 10px;
        }

        .prev {
          left: 10px;
          transform: scale(-1);
        }

        img {
          position: absolute;
          max-width: 500px;
        }
      `}</style>
    </>
  );
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default ImageSlider;
