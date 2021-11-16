import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type LayoutHook = () => {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  mainClasses: string;
};

const regex = RegExp(/^\/images/, 'i');

const useLayout: LayoutHook = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mainClasses, setMainClasses] = useState(
    // 'relative z-0 flex-1 overflow-x-hidden overflow-y-scroll text-white bg-background focus:outline-none xl:order-last'
    ''
  );

  useEffect(() => {
    window.matchMedia('(min-width: 1024px)').matches
      ? setMainClasses(
          'relative z-0 flex-1 text-white lg:block bg-background focus:outline-none xl:order-last'
        )
      : setMainClasses(
          'relative z-0 flex-1 overflow-x-hidden overflow-y-scroll text-white bg-background focus:outline-none xl:order-last'
        );
  }, [mainClasses]);

  useEffect(() => {
    if (router.pathname === '/') {
      setCurrentIndex(0);
    }
    if (router.pathname === '/about') {
      setCurrentIndex(1);
    }
    if (regex.test(router.pathname)) {
      setCurrentIndex(2);
    }
    if (router.pathname === '/epic') {
      setCurrentIndex(3);
    }
    if (router.pathname === '/apod') {
      setCurrentIndex(4);
    }
  }, [router.pathname]);

  return { isOpen, setIsOpen, currentIndex, setCurrentIndex, mainClasses };
};

export default useLayout;
