import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useRef, createRef, useEffect } from 'react';

const ThumbnailSlider = props => {
  const { currentMetadata, currentIndex, setCurrentIndex, type } = props;
  const containerRef = useRef();
  let adjustedWidth =
    containerRef?.current?.scrollWidth - containerRef?.current?.clientWidth;
  const thumbRefs = useRef([]);

  useEffect(() => {
    thumbRefs.current = [];
    currentMetadata.map(() => {
      thumbRefs.current.push(createRef());
    });
  }, [currentMetadata]);

  useEffect(() => {
    thumbRefs.current.map((item, index) => {
      if (currentIndex === index && item.current !== null) {
        containerRef.current.scrollTo({
          top: 0,
          left: item.current.offsetLeft - 40,
          behavior: 'smooth',
        });
      }
    });
  }, [currentIndex]);

  const scroll = direction => {
    containerRef?.current.scrollBy({
      top: 0,
      left:
        direction === 'left'
          ? -containerRef?.current?.clientWidth + 40
          : containerRef?.current?.clientWidth - 40,
      behavior: 'smooth',
    });
  };

  const handleImgClick = index => {
    setCurrentIndex(index);
  };

  return (
    <>
      <div
        className='thumb-container flex relative transform overflow-x-auto overflow-y-hidden select-none bg-black mt-6 rounded-lg'
        ref={containerRef}
      >
        <div
          className={`${
            adjustedWidth === 0 ? 'sm:hidden' : 'flex'
          } hidden sm:flex sticky inset-y-0 left-0 items-center justify-center cursor-pointer bg-primary lg:hover:text-black`}
          style={{ zIndex: 1 }}
          onClick={() => scroll('left')}
          aria-label='scroll-left-button'
          role='button'
          title='scroll-left-button'
        >
          <FiChevronLeft className='flex-shrink-0 text-3xl' />
        </div>
        {currentMetadata?.map((item, index) => {
          const year = item?.date.slice(0, 4);
          const month = item?.date.slice(5, 7);
          const day = item?.date.slice(8, 10);
          const image = item?.image;

          return (
            <div
              key={item?.identifier}
              ref={thumbRefs.current[index]}
              className={`relative z-0 m-4 flex-shrink-0 rounded-lg overflow-hidden ${
                index === currentIndex ? 'border border-primary' : ''
              }`}
            >
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={`https://epic.gsfc.nasa.gov/archive/${type}/${year}/${month}/${day}/thumbs/${image}.jpg`}
                alt={`Earth ${index + 1}`}
                title={`Earth ${index + 1}`}
                width='120px'
                height='120px'
                className='cursor-pointer rounded-lg'
                onClick={() => handleImgClick(index)}
              />
              <div className='absolute top-0 left-0 text-gray-400 p-1'>
                {index + 1}
              </div>
            </div>
          );
        })}
        <div
          className={`${
            adjustedWidth === 0 ? 'sm:hidden' : 'flex'
          }  hidden sticky inset-y-0 right-0 sm:flex items-center justify-center cursor-pointer bg-primary lg:hover:text-black`}
          onClick={() => scroll('right')}
          aria-label='scroll-right-button'
          role='button'
          title='scroll-right-button'
        >
          <FiChevronRight className='flex-shrink-0 text-3xl' />
        </div>
      </div>
      <style jsx>{`
        .thumb-container {
          scrollbar-color: #2d3748 #1a202c;
        }
        .thumb-container::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        .thumb-container::-webkit-scrollbar-thumb {
          background: #2d3748;
          border-radius: 10px;
          box-shadow: inset 2px 2px 2px hsla(0, 0%, 100%, 0.25),
            inset -2px -2px 2px rgba(0, 0, 0, 0.25);
        }
        .thumb-container::-webkit-scrollbar-track {
          background: #1a202c;
        }
      `}</style>
    </>
  );
};

export default ThumbnailSlider;
