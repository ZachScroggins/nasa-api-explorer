import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type LayoutHook = () => {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
};

const regex = RegExp(/^\/images/, 'i');

const useLayout: LayoutHook = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return { isOpen, setIsOpen, currentIndex, setCurrentIndex };
};

export default useLayout;
