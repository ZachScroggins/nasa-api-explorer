import { useState, useRef, useEffect } from 'react';

const ImageSlider = ({ current, type }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageHeight, setImageHeight] = useState(1080);
  const imageRef = useRef();
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

  const handleIncrement = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleDecrement = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      <button
        className='px-4 py-2 bg-primary rounded-lg m-2'
        onClick={handleDecrement}
      >
        decrease index: {currentIndex}
      </button>
      <button
        className='px-4 py-2 bg-primary rounded-lg m-2'
        onClick={handleIncrement}
      >
        increase index: {currentIndex}
      </button>
      <div
        className='relative top-0 left-0'
        style={{ height: `${imageHeight}px` }}
      >
        {images.map((item, index) => {
          return (
            <img
              key={index}
              src={item}
              alt='earth'
              ref={imageRef}
              width='1080px'
              height='1080px'
              className='absolute left-0 top-0'
              style={{
                zIndex: `${currentIndex === index ? 1 : 0}`,
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default ImageSlider;
