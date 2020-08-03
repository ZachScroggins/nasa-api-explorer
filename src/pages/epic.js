import { useState, useContext, useEffect } from 'react';
import Calendar from 'react-calendar';
import EpicContext from '../context/epic/epicContext';
import LinearProgress from '../components/LinearProgress';
import ImageSlider from '../components/epic/ImageSlider';

const epic = () => {
  const epicContext = useContext(EpicContext);
  const {
    // naturalMetadata,
    // enhancedMetadata,
    currentMetadata,
    type,
    getMostRecentNatural,
    getMostRecentEnhanced,
    getNaturalByDate,
    getEnhancedByDate,
    error,
    errorMessage,
    loading,
    date,
  } = epicContext;

  const handleDateChange = value => {
    if (type === 'natural') {
      getNaturalByDate(value.toISOString().slice(0, 10));
    } else {
      getEnhancedByDate(value.toISOString().slice(0, 10));
    }
  };

  return (
    <>
      <div className='container mx-auto'>
        {loading && <LinearProgress />}
        <p>{`error status: ${error}`}</p>
        <p>error message: {errorMessage}</p>
        <p>date: {date.toISOString().slice(0, 10)}</p>
        <div>
          <button
            className='px-4 py-2 m-2 bg-primary'
            onClick={getMostRecentEnhanced}
          >
            Enhanced
          </button>
          <button
            className='px-4 py-2 m-2 bg-primary'
            onClick={getMostRecentNatural}
          >
            Natural
          </button>
        </div>
        <div className=''>
          <Calendar
            onChange={(value, event) => handleDateChange(value, event)}
            value={date}
            minDate={new Date('2015-06-13')}
            maxDate={new Date()}
            className='text-black'
            tileClassName=''
          />
        </div>
        <ImageSlider current={currentMetadata} type={type} />
        <div className='flex flex-wrap'>
          {currentMetadata?.map(item => {
            const year = item?.date.slice(0, 4);
            const month = item?.date.slice(5, 7);
            const day = item?.date.slice(8, 10);
            const image = item?.image;

            return (
              <div key={item?.identifier} className='m-4'>
                <img
                  src={`https://epic.gsfc.nasa.gov/archive/${type}/${year}/${month}/${day}/thumbs/${image}.jpg`}
                  alt='earth'
                  width='120px'
                  height='120px'
                  // className='m-4'
                />
                <p>{item?.date}</p>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        input[type='date']::-webkit-calendar-picker-indicator {
          background-color: white;
          color: white;
          opacity: 1;
        }
        input[type='date']::-webkit-calendar-picker-indicator::after {
          color: white;
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default epic;
