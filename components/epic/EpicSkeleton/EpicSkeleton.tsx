import { RiRulerLine } from 'react-icons/ri';
import { BsClipboardData } from 'react-icons/bs';
import { GiEarthAmerica } from 'react-icons/gi';
import { FaSatellite } from 'react-icons/fa';
import {
  FiCalendar,
  FiZoomIn,
  FiArrowRight,
  FiSun,
  FiMoon,
  FiStar,
} from 'react-icons/fi';

const EpicSkeleton = () => {
  return (
    <>
      <div className='w-full mb-4 rounded-lg lg:mb-0'>
        <div className='bg-gray-900 rounded-lg cursor-wait aspect-w-6 aspect-h-6 animate-pulse' />
        <div className='h-20 my-4 bg-gray-900 rounded-lg cursor-wait animate-pulse' />
      </div>
      <div className='-mx-4 -mb-4 bg-black rounded-lg cursor-wait sm:border sm:border-gray-700 data-container sm:-mx-0 sm:-mb-0'>
        <div className='flex content-center justify-between rounded-t-lg bg-gradient-to-r from-primary via-black to-primary'>
          <div className='h-full py-3 pl-2 text-lg rounded-lg sm:pl-6'>
            Natural
          </div>
          <div className='flex items-center justify-center p-1 mt-1 text-2xl text-primary-light'>
            <FiCalendar className='mr-2' />
            <p className='text-center animate-pulse' aria-hidden='true'>
              0000-00-00
            </p>
          </div>
          <div className={`h-full py-3 pr-2 sm:pr-6 text-lg rounded-lg`}>
            Enhanced
          </div>
        </div>

        <div className='relative pt-2'>
          <div className='flex items-center justify-between p-2 text-xl bg-opacity-50 rounded-t-lg text-primary-light'>
            <div className='flex items-center justify-center w-full border-r border-gray-700'>
              <FiZoomIn className='mr-2' />
              <p className='flex-shrink'>Zoom</p>
            </div>
            <div className='flex items-center justify-center w-full'>
              <RiRulerLine className='mr-2' />
              <p className='flex-shrink'>km/mi</p>
            </div>
          </div>
          <div className='p-4 text-center'>
            <h2 className='flex items-center justify-center pb-2 text-2xl font-bold glow'>
              <BsClipboardData className='mr-2 text-primary' /> Image Data
            </h2>
            <p className='pb-4 text-lg text-gray-300'>
              This image was taken by NASA's EPIC camera onboard the NOAA DSCOVR
              spacecraft.
            </p>
            <div className='grid grid-cols-2 grid-rows-3'>
              <div className='my-4'>
                <div className='flex justify-center pb-1 text-xl text-primary'>
                  <GiEarthAmerica className='mr-3' />
                  <FiArrowRight className='mr-3' />
                  <FiSun />
                </div>
                <h3 className='pb-1 text-lg font-bold'>Earth to Sun</h3>
                <div className='w-32 h-5 mx-auto mt-1 bg-gray-900 rounded animate-pulse' />
              </div>
              <div className='my-4'>
                <div className='flex justify-center pb-1 text-xl text-primary'>
                  <GiEarthAmerica className='mr-3' />
                  <FiArrowRight className='mr-3' />
                  <FiMoon />
                </div>
                <h3 className='pb-1 text-lg font-bold'>Earth to Moon</h3>
                <div className='w-32 h-5 mx-auto mt-1 bg-gray-900 rounded animate-pulse' />
              </div>
              <div className='my-4'>
                <div className='flex justify-center pb-1 text-xl text-primary'>
                  <FaSatellite className='mr-3' />
                  <FiArrowRight className='mr-3' />
                  <FiSun />
                </div>
                <h3 className='pb-1 text-lg font-bold'>EPIC to Sun</h3>
                <div className='w-32 h-5 mx-auto mt-1 bg-gray-900 rounded animate-pulse' />
              </div>
              <div className='my-4'>
                <div className='flex justify-center pb-1 text-xl text-primary'>
                  <FaSatellite className='mr-3' />
                  <FiArrowRight className='mr-3' />
                  <FiMoon />
                </div>
                <h3 className='pb-1 text-lg font-bold'>EPIC to Moon</h3>
                <div className='w-32 h-5 mx-auto mt-1 bg-gray-900 rounded animate-pulse' />
              </div>
              <div className='my-4'>
                <div className='flex justify-center pb-1 text-xl text-primary'>
                  <GiEarthAmerica className='mr-3' />
                  <FiArrowRight className='mr-3' />
                  <FaSatellite />
                </div>
                <h3 className='pb-1 text-lg font-bold'>Earth to EPIC</h3>
                <div className='w-32 h-5 mx-auto mt-1 bg-gray-900 rounded animate-pulse' />
              </div>
              <div className='my-4'>
                <div className='flex justify-center pb-1 text-xl text-primary'>
                  <FiSun className='mr-3' />
                  <GiEarthAmerica className='mr-3' />
                  <FaSatellite />
                </div>
                <h3 className='pb-1 text-lg font-bold'>SEV Angle</h3>
                <div className='w-16 h-5 mx-auto mt-1 bg-gray-900 rounded animate-pulse' />
              </div>
            </div>
            <div className='mt-4'>
              <h2 className='flex items-center justify-center pb-2 text-2xl font-bold glow'>
                <FiStar className='mr-2 text-primary' /> Notable Events
              </h2>
              <ul className='pl-2 text-lg list-disc list-inside'>
                <li className='mb-2 text-primary-light'>
                  Saharan Dust Storm 2020
                </li>
                <li className='mb-2 text-primary-light'>
                  Total Solar Eclipse 2017
                </li>
                <li className='mb-2 text-primary-light'>
                  Annular Solar Eclipse 2017
                </li>
                <li className='mb-2 text-primary-light'>Solar Eclipse 2016</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EpicSkeleton;
