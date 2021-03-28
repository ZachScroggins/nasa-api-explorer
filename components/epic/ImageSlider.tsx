import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function ImageSlider({
  data,
  type,
  year,
  month,
  day,
  currentIndex,
  setCurrentIndex,
}) {
  return (
    <Carousel
      infiniteLoop
      selectedItem={currentIndex}
      swipeable={false}
      renderItem={(item: React.ReactNode) => (
        <a
          href={React.isValidElement(item) && item.props.children.props.src}
          className='cursor-zoom-in'
          tabIndex={-1}
        >
          {item}
        </a>
      )}
      onChange={index => setCurrentIndex(index)}
    >
      {data?.map((image, index) => (
        <div key={index}>
          <img
            src={`https://epic.gsfc.nasa.gov/archive/${type}/${year}/${month}/${day}/png/${image.image}.png`}
            alt={image.caption}
            className='rounded-lg'
          />
        </div>
      ))}
    </Carousel>
  );
}
