import { useState } from 'react';
import { Data, ImageSlider } from 'components/epic';

const EpicContent = ({ data, setTypeQuery, setDateQuery, isFetching }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <>
      <ImageSlider
        data={data?.items}
        type={data?.type}
        year={data?.items[currentIndex]?.date?.slice(0, 4)}
        month={data?.items[currentIndex]?.date?.slice(5, 7)}
        day={data?.items[currentIndex]?.date?.slice(8, 10)}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      <div>
        <Data
          data={data?.items}
          type={data?.type}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setTypeQuery={setTypeQuery}
          setDateQuery={setDateQuery}
          isFetching={isFetching}
        />
      </div>
    </>
  );
};

export default EpicContent;
