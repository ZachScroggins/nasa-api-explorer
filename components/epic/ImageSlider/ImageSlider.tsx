import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { EpicData } from 'types';

interface ImageSliderProps {
  data: EpicData['items'];
  type: EpicData['type'];
  year: string;
  month: string;
  day: string;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ImageSlider = ({
  data,
  type,
  year,
  month,
  day,
  currentIndex,
  setCurrentIndex,
}: ImageSliderProps) => {
  return (
    <Carousel
      infiniteLoop
      selectedItem={currentIndex}
      swipeable={false}
      onChange={index => setCurrentIndex(index)}
      renderItem={(item: React.ReactNode) => (
        <a
          href={React.isValidElement(item) && item.props.children.props.src}
          className='cursor-zoom-in'
          tabIndex={-1}
        >
          {item}
        </a>
      )}
    >
      {data?.map((image, index) => (
        <div key={index}>
          <img
            src={`https://epic.gsfc.nasa.gov/archive/${type}/${year}/${month}/${day}/png/${image.image}.png`}
            alt={image.caption}
            className='rounded-lg'
            width='800'
            height='800'
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
