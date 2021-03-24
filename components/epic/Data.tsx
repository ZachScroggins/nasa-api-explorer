import { useEffect, useState } from 'react';
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
import Link from 'next/link';
import { useRouter } from 'next/router';

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

export default function Data({ data, type, currentIndex }) {
  const router = useRouter();
  const [km, setKm] = useState(true);
  const [curr, setCurr] = useState(data[currentIndex] || null);
  const year = curr?.date?.slice(0, 4);
  const month = curr?.date?.slice(5, 7);
  const day = curr?.date?.slice(8, 10);
  const imageName = curr?.image;
  const [yearInput, setYearInput] = useState(year);
  const [monthInput, setMonthInput] = useState(month);
  const [dayInput, setDayInput] = useState(day);
  const dscovr = {
    x: data[currentIndex]?.dscovr_j2000_position.x,
    y: data[currentIndex]?.dscovr_j2000_position.y,
    z: data[currentIndex]?.dscovr_j2000_position.z,
  };
  const sun = {
    x: data[currentIndex]?.sun_j2000_position.x,
    y: data[currentIndex]?.sun_j2000_position.y,
    z: data[currentIndex]?.sun_j2000_position.z,
  };
  const moon = {
    x: data[currentIndex]?.lunar_j2000_position.x,
    y: data[currentIndex]?.lunar_j2000_position.y,
    z: data[currentIndex]?.lunar_j2000_position.z,
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

  useEffect(() => {
    if (data.length) {
      setYearInput(data[currentIndex]?.date?.slice(0, 4));
      setMonthInput(data[currentIndex]?.date?.slice(5, 7));
      setDayInput(data[currentIndex]?.date?.slice(8, 10));
    }
  }, [data]);

  return (
    <>
      <div className='overflow-auto bg-black border border-gray-700 rounded-lg data-container'>
        <div
          className='flex items-center justify-center p-1 mt-1 text-2xl cursor-pointer text-primary-light lg:hover:underline'
          // onClick={() => setCalendarOpen(!calendarOpen)}
        >
          <FiCalendar className='mr-2' />
          <p className='flex-shrink'>{data[currentIndex].date.slice(0, 10)}</p>
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            console.log(`${yearInput}-${monthInput}-${dayInput}`);
            router.push({
              pathname: '/epic',
              query: { type, date: `${yearInput}-${monthInput}-${dayInput}` },
            });
          }}
          className='flex justify-center text-black'
        >
          <select
            name='year'
            id='year'
            value={yearInput}
            onChange={e => setYearInput(e.target.value)}
          >
            {Array.from(new Array(year - 2014), (x, i) => i + 2015).map(
              (date, index) => (
                <option value={date} key={index}>
                  {date}
                </option>
              )
            )}
          </select>
          <select
            name='month'
            id='month'
            value={monthInput}
            onChange={e => setMonthInput(e.target.value)}
          >
            {Array.from(new Array(12), (x, i) => i + 1).map((date, index) => (
              <option value={date < 10 ? `0${date}` : date} key={index}>
                {date < 10 ? `0${date}` : date}
              </option>
            ))}
          </select>
          <select
            name='day'
            id='day'
            value={dayInput}
            onChange={e => setDayInput(e.target.value)}
          >
            {Array.from(new Array(31), (x, i) => i + 1).map((date, index) => (
              <option value={date < 10 ? `0${date}` : date} key={index}>
                {date < 10 ? `0${date}` : date}
              </option>
            ))}
          </select>
          <button type='submit' className='text-white'>
            submit
          </button>
        </form>
        <div className='flex items-center justify-between p-2 text-xl bg-opacity-50 rounded-t-lg text-primary-light'>
          <a
            className='flex items-center justify-center w-full border-r border-gray-700 lg:hover:underline'
            href={`https://epic.gsfc.nasa.gov/archive/${type}/${year}/${month}/${day}/png/${imageName}.png`}
          >
            <FiZoomIn className='mr-2' />
            <p className='flex-shrink'>Zoom</p>
          </a>
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
              <div className='flex pb-1 text-xl text-primary'>
                <GiEarthAmerica className='mr-3' />
                <FiArrowRight className='mr-3' />
                <FiSun />
              </div>
              <h3 className='pb-1 text-lg font-bold'>Earth to Sun</h3>
              <p className='text-gray-300'>
                {km
                  ? `${Math.round(earthToSunDistance).toLocaleString()} km`
                  : `${miles.earthToSun} mi`}
              </p>
            </div>
            <div className='my-4'>
              <div className='flex pb-1 text-xl text-primary'>
                <GiEarthAmerica className='mr-3' />
                <FiArrowRight className='mr-3' />
                <FiMoon />
              </div>
              <h3 className='pb-1 text-lg font-bold'>Earth to Moon</h3>
              <p className='text-gray-300'>
                {km
                  ? `${Math.round(earthToMoonDistance).toLocaleString()} km`
                  : `${miles.earthToMoon} mi`}
              </p>
            </div>
            <div className='my-4'>
              <div className='flex pb-1 text-xl text-primary'>
                <FaSatellite className='mr-3' />
                <FiArrowRight className='mr-3' />
                <FiSun />
              </div>
              <h3 className='pb-1 text-lg font-bold'>EPIC to Sun</h3>
              <p className='text-gray-300'>
                {km
                  ? `${Math.round(dscovrToSunDistance).toLocaleString()} km`
                  : `${miles.dscovrToSunDistance} mi`}
              </p>
            </div>
            <div className='my-4'>
              <div className='flex pb-1 text-xl text-primary'>
                <FaSatellite className='mr-3' />
                <FiArrowRight className='mr-3' />
                <FiMoon />
              </div>
              <h3 className='pb-1 text-lg font-bold'>EPIC to Moon</h3>
              <p className='text-gray-300'>
                {km
                  ? `${Math.round(dscovrToMoonDistance).toLocaleString()} km`
                  : `${miles.dscovrToMoonDistance} mi`}
              </p>
            </div>
            <div className='my-4'>
              <div className='flex pb-1 text-xl text-primary'>
                <GiEarthAmerica className='mr-3' />
                <FiArrowRight className='mr-3' />
                <FaSatellite />
              </div>
              <h3 className='pb-1 text-lg font-bold'>Earth to EPIC</h3>
              <p className='text-gray-300'>
                {km
                  ? `${Math.round(earthToDscovrDistance).toLocaleString()} km`
                  : `${miles.earthToDscovr} mi`}
              </p>
            </div>
            <div className='my-4'>
              <div className='flex pb-1 text-xl text-primary'>
                <FiSun className='mr-3' />
                <GiEarthAmerica className='mr-3' />
                <FaSatellite />
              </div>
              <h3 className='pb-1 text-lg font-bold'>SEV Angle</h3>
              <p className='text-gray-300'>{sevAngle.toFixed(2)}&deg;</p>
            </div>
          </div>
          <div className='mt-4'>
            <h2 className='flex items-center pb-2 text-2xl font-bold glow'>
              <FiStar className='mr-2 text-primary' /> Notable Events
            </h2>
            <ul className='pl-2 text-lg list-disc list-inside'>
              <li className='mb-2 cursor-pointer text-primary-light lg:hover:underline'>
                <Link href={'/epic?type=natural&date=2020-06-18'}>
                  <a>Saharan Dust Storm 2020</a>
                </Link>
              </li>
              <li className='mb-2 cursor-pointer text-primary-light lg:hover:underline'>
                <Link href={'/epic?type=natural&date=2017-08-21'}>
                  <a>Total Solar Eclipse 2017</a>
                </Link>
              </li>
              <li className='mb-2 cursor-pointer text-primary-light lg:hover:underline'>
                <Link href={'/epic?type=natural&date=2017-02-26'}>
                  <a>Annular Solar Eclipse 2017</a>
                </Link>
              </li>
              <li className='mb-2 cursor-pointer text-primary-light lg:hover:underline'>
                <Link href={'/epic?type=natural&date=2016-03-09'}>
                  <a>Solar Eclipse 2016</a>
                </Link>
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
        @media (min-width: 640px) {
          max-height: 90vh;
        }
      `}</style>
    </>
  );
}

/*
@media (min-width: 640px) {
  max-height: ${imageHeight}px;
}
*/
