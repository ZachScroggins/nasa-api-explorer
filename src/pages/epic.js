import { useState, useContext } from 'react';
import Calendar from 'react-calendar';
import { FiCalendar } from 'react-icons/fi';
import EpicContext from '../context/epic/epicContext';
import LinearProgress from '../components/LinearProgress';
import ImageSlider from '../components/epic/ImageSlider';

// Calculus vector magnitude - distance = sqrt(x^2 + y^2 + z^2)
const getDistance = (x, y, z) => {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
};

// Calculus/Trig - Angle between 3d vectors - sun earth vehicle angle
const getSev = (sun, dscovr) => {
  const dotProduct = sun.x * dscovr.x + sun.y * dscovr.y + sun.z * dscovr.z;
  const magnitudeA = Math.sqrt(
    Math.pow(sun.x, 2) + Math.pow(sun.y, 2) + Math.pow(sun.z, 2)
  );
  const magnitudeB = Math.sqrt(
    Math.pow(dscovr.x, 2) + Math.pow(dscovr.y, 2) + Math.pow(dscovr.z, 2)
  );
  const cosAngle = dotProduct / (magnitudeA * magnitudeB);
  const angle = Math.acos(cosAngle) * (180 / Math.PI);
  return angle;
};

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const dscovr = {
    x: currentMetadata[currentIndex]?.dscovr_j2000_position.x,
    y: currentMetadata[currentIndex]?.dscovr_j2000_position.y,
    z: currentMetadata[currentIndex]?.dscovr_j2000_position.z,
  };
  const dscovrDistance = getDistance(dscovr.x, dscovr.y, dscovr.z);
  const sun = {
    x: currentMetadata[currentIndex]?.sun_j2000_position.x,
    y: currentMetadata[currentIndex]?.sun_j2000_position.y,
    z: currentMetadata[currentIndex]?.sun_j2000_position.z,
  };
  const sunDistance = getDistance(sun.x, sun.y, sun.z);
  const sevAngle = getSev(sun, dscovr);
  // Trig - Law of cosines - c = sqrt(a^2 + b^2 - 2ab * cos(y))
  const distanceToSun = Math.sqrt(
    Math.pow(sunDistance, 2) +
      Math.pow(dscovrDistance, 2) -
      2 * sunDistance * dscovrDistance * Math.cos(sevAngle * (Math.PI / 180))
  );

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
          <div className='block lg:col-span-2'>
            <ImageSlider
              current={currentMetadata}
              type={type}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          </div>
          <div className='flex flex-col lg:row-start-1'>
            <div className='justify-center items-center mb-4 hidden lg:flex'>
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
            <div className='bg-black border border-gray-700 rounded-lg p-4 lg:h-40'>
              <div className='flex items-center text-primary cursor-pointer hover:underline'>
                <FiCalendar className='mr-2' />
                <p className='flex-shrink'>{date.toISOString().slice(0, 10)}</p>
              </div>
              <p>
                Distance to Earth: {Math.round(dscovrDistance).toLocaleString()}{' '}
                km
              </p>
              <p>
                Distance to Sun: {Math.round(distanceToSun).toLocaleString()} km
              </p>
              <p>Sun to Earth: {Math.round(sunDistance).toLocaleString()} km</p>
              <p>SEV Angle: {sevAngle.toFixed(2)}&deg;</p>
            </div>
          </div>
        </div>
        <p>{`error status: ${error}`}</p>
        <p>error message: {errorMessage}</p>
        <p>date: {date.toISOString().slice(0, 10)}</p>
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
      <style jsx>{``}</style>
    </>
  );
};

export default epic;
