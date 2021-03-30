import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const regex = RegExp(/^\/images/, 'i');

const useLayout = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (router.pathname === '/') {
      setCurrentIndex(0);
    }
    if (regex.test(router.pathname)) {
      setCurrentIndex(1);
    }
    if (router.pathname === '/epic') {
      setCurrentIndex(2);
    }
    if (router.pathname === '/apod') {
      setCurrentIndex(3);
    }
  }, [router.pathname]);

  return { isOpen, setIsOpen, currentIndex, setCurrentIndex };
};

export default useLayout;
