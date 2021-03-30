import { useEffect, useState } from 'react';
import { getAngleBetweenVectors, getDistance, lawOfCosines } from './utils';

const useData = ({
  data,
  currentIndex,
  setDateQuery,
  setTypeQuery,
  setCurrentIndex,
}) => {
  const [km, setKm] = useState(true);
  const [isPickerOpen, setIsPrickerOpen] = useState(false);

  const year = data[currentIndex]?.date?.slice(0, 4);
  const month = data[currentIndex]?.date?.slice(5, 7);
  const day = data[currentIndex]?.date?.slice(8, 10);
  const name = data[currentIndex]?.image;
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

  const switchTypes = (newType: string) => {
    setDateQuery('');
    setTypeQuery(newType);
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [data]);

  useEffect(() => {
    if (data.length) {
      setYearInput(data[currentIndex]?.date?.slice(0, 4));
      setMonthInput(data[currentIndex]?.date?.slice(5, 7));
      setDayInput(data[currentIndex]?.date?.slice(8, 10));
    }
  }, [data]);

  return {
    day,
    dayInput,
    dscovrToMoonDistance,
    dscovrToSunDistance,
    earthToDscovrDistance,
    earthToMoonDistance,
    earthToSunDistance,
    isPickerOpen,
    km,
    mevAngle,
    miles,
    month,
    monthInput,
    name,
    setKm,
    setIsPrickerOpen,
    setDayInput,
    setMonthInput,
    setYearInput,
    sevAngle,
    switchTypes,
    year,
    yearInput,
  };
};

export default useData;
