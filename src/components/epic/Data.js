import { useContext, useState } from 'react';
import {
  FiCalendar,
  FiZoomIn,
  FiArrowRight,
  FiSun,
  FiMoon,
  FiStar,
} from 'react-icons/fi';
import { RiRulerLine } from 'react-icons/ri';
import { BsClipboardData } from 'react-icons/bs';
import { GiEarthAmerica } from 'react-icons/gi';
import { FaSatellite } from 'react-icons/fa';
import EpicContext from '../../context/epic/epicContext';

// Calculus vector magnitude/distance = sqrt(x^2 + y^2 + z^2)
const getDistance = (x, y, z) => {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
};

// Calculus/Trig - Angle between 3d vectors - sun/moon earth vehicle angle
const getAngleBetweenVectors = (body, dscovr) => {
  const dotProduct = body.x * dscovr.x + body.y * dscovr.y + body.z * dscovr.z;
  const magnitudeA = Math.sqrt(
    Math.pow(body.x, 2) + Math.pow(body.y, 2) + Math.pow(body.z, 2)
  );
  const magnitudeB = Math.sqrt(
    Math.pow(dscovr.x, 2) + Math.pow(dscovr.y, 2) + Math.pow(dscovr.z, 2)
  );
  const cosAngle = dotProduct / (magnitudeA * magnitudeB);
  const angle = Math.acos(cosAngle) * (180 / Math.PI);
  return angle;
};

// Trig - Law of cosines - c = sqrt(a^2 + b^2 - 2ab * cos(y))
const lawOfCosines = (distance1, distance2, angle) => {
  const result = Math.sqrt(
    Math.pow(distance1, 2) +
      Math.pow(distance2, 2) -
      2 * distance1 * distance2 * Math.cos(angle * (Math.PI / 180))
  );
  return result;
};

const Data = ({
  currentIndex,
  // setCurrentIndex,
  calendarOpen,
  setCalendarOpen,
  imageOpen,
  setImageOpen,
  imageHeight,
}) => {
  const epicContext = useContext(EpicContext);
  const { currentMetadata, date, getNaturalByDate } = epicContext;
  const [km, setKm] = useState(true);
  const dscovr = {
    x: currentMetadata[currentIndex]?.dscovr_j2000_position.x,
    y: currentMetadata[currentIndex]?.dscovr_j2000_position.y,
    z: currentMetadata[currentIndex]?.dscovr_j2000_position.z,
  };
  const sun = {
    x: currentMetadata[currentIndex]?.sun_j2000_position.x,
    y: currentMetadata[currentIndex]?.sun_j2000_position.y,
    z: currentMetadata[currentIndex]?.sun_j2000_position.z,
  };
  const moon = {
    x: currentMetadata[currentIndex]?.lunar_j2000_position.x,
    y: currentMetadata[currentIndex]?.lunar_j2000_position.y,
    z: currentMetadata[currentIndex]?.lunar_j2000_position.z,
  };
  const earthToDscovrDistance = getDistance(dscovr.x, dscovr.y, dscovr.z);
  const earthToSunDistance = getDistance(sun.x, sun.y, sun.z);
  const earthToMoonDistance = getDistance(moon.x, moon.y, moon.z);
  const sevAngle = getAngleBetweenVectors(sun, dscovr);
  const mevAngle = getAngleBetweenVectors(moon, dscovr);
  const dscovrToSunDistance = lawOfCosines(
    earthToSunDistance,
    earthToDscovrDistance,
    sevAngle
  );
  const dscovrToMoonDistance = lawOfCosines(
    earthToMoonDistance,
    earthToDscovrDistance,
    mevAngle
  );
  const miles = {
    earthToDscovr: Math.round(earthToDscovrDistance * 0.6213).toLocaleString(),
    earthToSun: Math.round(earthToSunDistance * 0.6213).toLocaleString(),
    earthToMoon: Math.round(earthToMoonDistance * 0.6213).toLocaleString(),
    dscovrToSunDistance: Math.round(
      dscovrToSunDistance * 0.6213
    ).toLocaleString(),
    dscovrToMoonDistance: Math.round(
      earthToDscovrDistance * 0.6213
    ).toLocaleString(),
  };

  return (
    <>
      <div className='data-container border border-gray-700 bg-black rounded-lg h-full overflow-auto'>
        <div
          className='flex items-center justify-center text-primary-light text-2xl p-1 mt-1 cursor-pointer lg:hover:underline'
          onClick={() => setCalendarOpen(!calendarOpen)}
        >
          <FiCalendar className='mr-2' />
          <p className='flex-shrink'>{date.toISOString().slice(0, 10)}</p>
        </div>
        <div className='flex items-center justify-between text-primary-light text-xl bg-opacity-50 rounded-t-lg p-2'>
          <div
            className='flex items-center justify-center w-full border-r border-gray-700 cursor-pointer lg:hover:underline'
            onClick={() => setImageOpen(!imageOpen)}
          >
            <FiZoomIn className='mr-2' />
            <p className='flex-shrink'>Zoom</p>
          </div>
          <div
            className='flex items-center justify-center w-full cursor-pointer lg:hover:underline'
            onClick={() => setKm(!km)}
          >
            <RiRulerLine className='mr-2' />
            <p className='flex-shrink'>km/mi</p>
          </div>
        </div>
        <div className='p-4'>
          <h2 className='flex items-center pb-2 text-2xl font-bold glow'>
            <BsClipboardData className='mr-2 text-primary' /> Image Data
          </h2>
          <p className='pb-4 text-lg text-gray-300'>
            This image was taken by NASA's EPIC camera onboard the NOAA DSCOVR
            spacecraft.
          </p>
          <div className='grid grid-cols-2 grid-rows-3'>
            <div className='my-4'>
              <div className='flex text-xl text-primary pb-1'>
                <GiEarthAmerica className='mr-3' />
                <FiArrowRight className='mr-3' />
                <FiSun />
              </div>
              <h3 className='text-lg font-bold pb-1'>Earth to Sun</h3>
              <p className='text-gray-300'>
                {km
                  ? `${Math.round(earthToSunDistance).toLocaleString()} km`
                  : `${miles.earthToSun} mi`}
              </p>
            </div>
            <div className='my-4'>
              <div className='flex text-xl text-primary pb-1'>
                <GiEarthAmerica className='mr-3' />
                <FiArrowRight className='mr-3' />
                <FiMoon />
              </div>
              <h3 className='text-lg font-bold pb-1'>Earth to Moon</h3>
              <p className='text-gray-300'>
                {km
                  ? `${Math.round(earthToMoonDistance).toLocaleString()} km`
                  : `${miles.earthToMoon} mi`}
              </p>
            </div>
            <div className='my-4'>
              <div className='flex text-xl text-primary pb-1'>
                <FaSatellite className='mr-3' />
                <FiArrowRight className='mr-3' />
                <FiSun />
              </div>
              <h3 className='text-lg font-bold pb-1'>EPIC to Sun</h3>
              <p className='text-gray-300'>
                {km
                  ? `${Math.round(dscovrToSunDistance).toLocaleString()} km`
                  : `${miles.dscovrToSunDistance} mi`}
              </p>
            </div>
            <div className='my-4'>
              <div className='flex text-xl text-primary pb-1'>
                <FaSatellite className='mr-3' />
                <FiArrowRight className='mr-3' />
                <FiMoon />
              </div>
              <h3 className='text-lg font-bold pb-1'>EPIC to Moon</h3>
              <p className='text-gray-300'>
                {km
                  ? `${Math.round(dscovrToMoonDistance).toLocaleString()} km`
                  : `${miles.dscovrToMoonDistance} mi`}
              </p>
            </div>
            <div className='my-4'>
              <div className='flex text-xl text-primary pb-1'>
                <GiEarthAmerica className='mr-3' />
                <FiArrowRight className='mr-3' />
                <FaSatellite />
              </div>
              <h3 className='text-lg font-bold pb-1'>Earth to EPIC</h3>
              <p className='text-gray-300'>
                {km
                  ? `${Math.round(earthToDscovrDistance).toLocaleString()} km`
                  : `${miles.earthToDscovr} mi`}
              </p>
            </div>
            <div className='my-4'>
              <div className='flex text-xl text-primary pb-1'>
                <FiSun className='mr-3' />
                <GiEarthAmerica className='mr-3' />
                <FaSatellite />
              </div>
              <h3 className='text-lg font-bold pb-1'>SEV Angle</h3>
              <p className='text-gray-300'>{sevAngle.toFixed(2)}&deg;</p>
            </div>
          </div>
          <div className='mt-4'>
            <h2 className='flex items-center pb-2 text-2xl font-bold glow'>
              <FiStar className='mr-2 text-primary' /> Notable Events
            </h2>
            <ul className='list-disc list-inside pl-2 text-lg'>
              <li
                className='text-primary-light cursor-pointer lg:hover:underline mb-2'
                onClick={() => getNaturalByDate('2020-06-18')}
              >
                Saharan Dust Storm 2020
              </li>
              <li
                className='text-primary-light cursor-pointer lg:hover:underline mb-2'
                onClick={() => getNaturalByDate('2017-08-21')}
              >
                Total Solar Eclipse 2017
              </li>
              <li
                className='text-primary-light cursor-pointer lg:hover:underline mb-2'
                onClick={() => getNaturalByDate('2017-02-26')}
              >
                Annular Solar Eclipse 2017
              </li>
              <li
                className='text-primary-light cursor-pointer lg:hover:underline mb-2'
                onClick={() => getNaturalByDate('2016-03-09')}
              >
                Solar Eclipse 2016
              </li>
            </ul>
          </div>
        </div>
      </div>
      <style jsx>{`
        .data-container {
          scrollbar-color: #2d3748 #1a202c;
        }
        .data-container::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        .data-container::-webkit-scrollbar-thumb {
          background: #2d3748;
          border-radius: 10px;
          box-shadow: inset 2px 2px 2px hsla(0, 0%, 100%, 0.25),
            inset -2px -2px 2px rgba(0, 0, 0, 0.25);
        }
        .data-container::-webkit-scrollbar-track {
          background: #1a202c;
        }
        /*
        @media (min-width: 640px) {
          max-height: ${imageHeight}px;
        }
        */
        @media (min-width: 640px) {
          max-height: 90vh;
        }
      `}</style>
    </>
  );
};

export default Data;
