import { useState, useContext } from 'react';
import EpicContext from '../context/epic/epicContext';
import LinearProgress from '../components/LinearProgress';
import ImageSlider from '../components/epic/ImageSlider';
import Data from '../components/epic/Data';
import CalendarModal from '../components/epic/CalendarModal';
import ImageModal from '../components/epic/ImageModal';
import Alert from '../components/Alert';
import ThumbnailSlider from '../components/epic/ThumbnailSlider';

const epic = () => {
  const epicContext = useContext(EpicContext);
  const {
    currentMetadata,
    type,
    getMostRecentNatural,
    getMostRecentEnhanced,
    error,
    errorMessage,
    setError,
    loading,
    // date,
  } = epicContext;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);

  return (
    <>
      <div className='container mx-auto px-2'>
        {loading && <LinearProgress />}
        <div className='flex justify-center items-center mb-4 lg:hidden'>
          <button
            className={`text-lg px-4 py-2 border border-primary rounded-l-lg hover:bg-primary hover:text-black ${
              type === 'natural'
                ? 'bg-primary text-black font-semibold'
                : 'text-primary-light'
            }`}
            onClick={getMostRecentNatural}
          >
            Natural
          </button>
          <button
            className={`text-lg px-4 py-2 border border-primary border-l-black rounded-r-lg hover:bg-primary hover:text-black ${
              type === 'enhanced'
                ? 'bg-primary text-black font-semibold'
                : 'text-primary-light'
            }`}
            onClick={getMostRecentEnhanced}
          >
            Enhanced
          </button>
        </div>
        <div className='grid gap-4 lg:grid-cols-3'>
          <div className='block lg:col-span-2 select-none bg-black rounded-lg'>
            <ImageSlider
              current={currentMetadata}
              type={type}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          </div>
          <div className='flex flex-col lg:row-start-1'>
            <div className='justify-center items-center hidden mb-4 lg:flex'>
              <button
                className={`text-lg px-4 py-2 border border-primary rounded-l-lg hover:bg-primary hover:text-black ${
                  type === 'natural'
                    ? 'bg-primary text-black font-semibold'
                    : 'text-primary-light'
                }`}
                onClick={getMostRecentNatural}
              >
                Natural
              </button>
              <button
                className={`text-lg px-4 py-2 border border-primary border-l-black rounded-r-lg hover:bg-primary hover:text-black ${
                  type === 'enhanced'
                    ? 'bg-primary text-black font-semibold'
                    : 'text-primary-light'
                }`}
                onClick={getMostRecentEnhanced}
              >
                Enhanced
              </button>
            </div>
            <Data
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              calendarOpen={calendarOpen}
              setCalendarOpen={setCalendarOpen}
              imageOpen={imageOpen}
              setImageOpen={setImageOpen}
            />
          </div>
        </div>
        <ThumbnailSlider
          currentMetadata={currentMetadata}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          type={type}
        />
      </div>
      <Alert open={error} message={errorMessage} setError={setError} />
      <CalendarModal
        calendarOpen={calendarOpen}
        setCalendarOpen={setCalendarOpen}
      />
      <ImageModal
        imageOpen={imageOpen}
        setImageOpen={setImageOpen}
        currentIndex={currentIndex}
      />
      <style jsx>{``}</style>
    </>
  );
};

export default epic;
