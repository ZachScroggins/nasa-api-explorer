import { useEffect, useState } from 'react';
import Link from 'next/link';
import MobileHeader from './MobileHeader';
import MobileSidebar from './MobileSidebar';
import StaticSidebar from './StaticSidebar';
import RocketIcon from 'components/RocketIcon';
import { useRouter } from 'next/router';

const regex = RegExp(/^\/images/, 'i');

export default function Layout({ children }) {
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

  return (
    <>
      <div className='flex h-screen overflow-hidden bg-white'>
        <MobileSidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          currentIndex={currentIndex}
        />
        <StaticSidebar currentIndex={currentIndex} />
        <div className='flex flex-col flex-1 min-w-0 overflow-hidden'>
          <MobileHeader setIsOpen={setIsOpen} />
          <div className='relative z-0 flex flex-1 overflow-hidden'>
            <main
              className='relative z-0 flex-1 overflow-y-auto text-white bg-background focus:outline-none xl:order-last'
              tabIndex={0}
              style={{ backgroundImage: 'url(/topography.svg)' }}
            >
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
