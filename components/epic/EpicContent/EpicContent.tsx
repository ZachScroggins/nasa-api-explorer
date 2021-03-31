import { useState } from 'react';
import { EpicData } from 'types';
import { Data, ImageSlider } from 'components/epic';

interface EpicContentProps {
  data: EpicData;
  setDateQuery: React.Dispatch<React.SetStateAction<string>>;
  setTypeQuery: React.Dispatch<React.SetStateAction<string>>;
  isFetching: boolean;
}

const EpicContent = ({
  data,
  setTypeQuery,
  setDateQuery,
  isFetching,
}: EpicContentProps) => {
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
