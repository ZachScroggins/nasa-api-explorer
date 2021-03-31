import { useEffect, useState } from 'react';
import { EpicData, J2000Position } from 'types';
import { getAngleBetweenVectors, getDistance, lawOfCosines } from './utils';

type DataHook = (props: {
  data: EpicData['items'];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setDateQuery: React.Dispatch<React.SetStateAction<string>>;
  setTypeQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  day: string;
  dayInput: string;
  dscovrToMoonDistance: number;
  dscovrToSunDistance: number;
  earthToDscovrDistance: number;
  earthToMoonDistance: number;
  earthToSunDistance: number;
  isPickerOpen: boolean;
  km: boolean;
  mevAngle: number;
  miles: Miles;
  month: string;
  monthInput: string;
  name: string;
  setKm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPrickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDayInput: React.Dispatch<React.SetStateAction<string>>;
  setMonthInput: React.Dispatch<React.SetStateAction<string>>;
  setYearInput: React.Dispatch<React.SetStateAction<string>>;
  sevAngle: number;
  switchTypes: (newType: EpicData['type']) => void;
  year: string;
  yearInput: string;
};

interface Miles {
  earthToDscovr: string;
  earthToSun: string;
  earthToMoon: string;
  dscovrToSunDistance: string;
  dscovrToMoonDistance: string;
}

const useData: DataHook = ({
  data,
  currentIndex,
  setCurrentIndex,
  setDateQuery,
  setTypeQuery,
}) => {
  const [km, setKm] = useState(true);
  const [isPickerOpen, setIsPrickerOpen] = useState(false);

  const year: string = data[currentIndex]?.date?.slice(0, 4);
  const month: string = data[currentIndex]?.date?.slice(5, 7);
  const day: string = data[currentIndex]?.date?.slice(8, 10);
  const name: string = data[currentIndex]?.image;
  const [yearInput, setYearInput] = useState(year);
  const [monthInput, setMonthInput] = useState(month);
  const [dayInput, setDayInput] = useState(day);

  const dscovr: J2000Position = {
    x: data[currentIndex]?.dscovr_j2000_position.x,
    y: data[currentIndex]?.dscovr_j2000_position.y,
    z: data[currentIndex]?.dscovr_j2000_position.z,
  };
  const sun: J2000Position = {
    x: data[currentIndex]?.sun_j2000_position.x,
    y: data[currentIndex]?.sun_j2000_position.y,
    z: data[currentIndex]?.sun_j2000_position.z,
  };
  const moon: J2000Position = {
    x: data[currentIndex]?.lunar_j2000_position.x,
    y: data[currentIndex]?.lunar_j2000_position.y,
    z: data[currentIndex]?.lunar_j2000_position.z,
  };

  const earthToDscovrDistance: number = getDistance(
    dscovr.x,
    dscovr.y,
    dscovr.z
  );
  const earthToSunDistance: number = getDistance(sun.x, sun.y, sun.z);
  const earthToMoonDistance: number = getDistance(moon.x, moon.y, moon.z);

  const sevAngle: number = getAngleBetweenVectors(sun, dscovr);
  const mevAngle: number = getAngleBetweenVectors(moon, dscovr);

  const dscovrToSunDistance: number = lawOfCosines(
    earthToSunDistance,
    earthToDscovrDistance,
    sevAngle
  );
  const dscovrToMoonDistance: number = lawOfCosines(
    earthToMoonDistance,
    earthToDscovrDistance,
    mevAngle
  );

  const miles: Miles = {
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

  const switchTypes = (newType: EpicData['type']) => {
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
