import { useState, useRef, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiPlay, FiPause } from 'react-icons/fi';

const ImageSlider = ({ current, type, currentIndex, setCurrentIndex }) => {
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [imageHeight, setImageHeight] = useState(1080);
  const [playing, setPlaying] = useState(false);
  const imageRef = useRef();
  const timerIdRef = useRef(null);
  const indexRef = useRef(0);
  const images = current.map(item => {
    const year = item?.date.slice(0, 4);
    const month = item?.date.slice(5, 7);
    const day = item?.date.slice(8, 10);
    const image = item?.image;
    const url = `https://epic.gsfc.nasa.gov/archive/${type}/${year}/${month}/${day}/jpg/${image}.jpg`;
    return url;
  });

  useEffect(() => {
    const updateImageHeight = () => {
      setImageHeight(imageRef.current?.offsetHeight);
    };

    window.addEventListener('resize', updateImageHeight);

    updateImageHeight();

    return () => window.removeEventListener('resize', updateImageHeight);
  });

  useEffect(() => {
    setCurrentIndex(0);
  }, [current]);

  useEffect(() => {
    if (playing) {
      indexRef.current = currentIndex;
      timerIdRef.current = setInterval(() => {
        if (indexRef.current < images.length - 1) {
          indexRef.current = indexRef.current + 1;
          setCurrentIndex(indexRef.current);
        } else {
          indexRef.current = 0;
          setCurrentIndex(indexRef.current);
        }
      }, 500);
    } else {
      clearInterval(timerIdRef.current);
    }
  }, [playing]);

  const handleIncrement = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleDecrement = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(images.length - 1);
    }
  };

  const handlePlay = () => {
    setPlaying(true);
  };
  const handlePause = () => {
    setPlaying(false);
  };

  return (
    <>
      <div
        className='relative top-0 left-0 mx-auto'
        style={{
          height: `${imageHeight}px`,
          maxWidth: `${imageHeight}px`,
        }}
      >
        <div className='absolute top-0 z-10 w-full text-center text-xl text-gray-400 mt-2'>
          {currentIndex + 1}/{images.length}
        </div>
        <FiChevronLeft
          className='rounded-full cursor-pointer absolute left-0 z-10 text-4xl'
          style={{ top: '50%' }}
          onClick={handleDecrement}
          title='Previous Image'
        />
        <FiChevronRight
          className='rounded-full cursor-pointer absolute right-0 z-10 text-4xl'
          style={{ top: '50%' }}
          onClick={handleIncrement}
          title='Next Image'
        />
        <div className='absolute bottom-0 z-10 w-full flex justify-center'>
          {playing ? (
            <FiPause
              className='rounded-full cursor-pointer text-2xl mb-2'
              onClick={handlePause}
              title='Play/Pause Slideshow'
            />
          ) : (
            <FiPlay
              className='rounded-full cursor-pointer text-2xl mb-2'
              onClick={handlePlay}
              title='Play/Pause Slideshow'
            />
          )}
        </div>
        {images.map((item, index) => {
          return (
            <img
              key={index}
              src={item}
              alt='earth'
              ref={imageRef}
              width='1080px'
              height='1080px'
              className='absolute left-0 top-0 rounded-lg'
              style={{
                zIndex: `${currentIndex === index ? 1 : 0}`,
                maxHeight: '80vh',
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default ImageSlider;
