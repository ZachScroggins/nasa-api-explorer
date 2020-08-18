import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useClickAway from '../utils/useClickAway';
import { motion } from 'framer-motion';
import {
  FiMenu,
  FiArrowLeft,
  FiHome,
  FiArrowRight,
  FiImage,
  FiGithub,
  FiCode,
  FiChevronsLeft,
  FiGlobe,
} from 'react-icons/fi';

const topNavVariant = {
  visible: {
    y: 0,
    transition: {
      damping: 5,
      delay: 0.3,
    },
  },
  hidden: {
    y: -100,
    transition: {
      delay: 0.3,
    },
  },
};

const bottomNavVariant = {
  visible: {
    y: 0,
    transition: {
      damping: 5,
      delay: 0.3,
    },
  },
  hidden: {
    y: 100,
    transition: {
      delay: 0.3,
    },
  },
};

const navMenuVariant = {
  hidden: {
    y: '100vh',
    transition: {
      damping: 5,
      duration: 1,
    },
  },
  visible: {
    y: 0,
    transition: {
      damping: 5,
    },
  },
};
const navMenuLgVariant = {
  hidden: {
    x: '-100vw',
    transition: {
      damping: 5,
      duration: 1,
    },
  },
  visible: {
    x: 0,
    transition: {
      damping: 5,
    },
  },
};

const titles = [
  'NASA API Explorer',
  'NASA Image Library',
  'Astronomy Picture of the Day',
  // 'EPIC',
  'Earth Polychromatic Imaging Camera',
];
const routes = ['/', '/images', '/apod', '/epic'];
const regex = RegExp(/^\/image/, 'i');

const Layout = props => {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [appBarTitle, setAppBarTitle] = useState(titles[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [navVariant, setNavVariant] = useState(navMenuVariant);
  let matchesHomePage = currentIndex === 0 ? true : false;
  const navRef = useRef(null);
  useClickAway(navRef, setDrawerOpen);

  const prevScrollY = useRef(0);
  const [goingUp, setGoingUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current < currentScrollY && currentScrollY > 50) {
        setGoingUp(true);
      }
      if (prevScrollY.current > currentScrollY) {
        setGoingUp(false);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [goingUp]);

  useEffect(() => {
    if (router.pathname === '/') {
      setCurrentIndex(0);
    } else if (regex.test(router.pathname)) {
      // } else if (router.pathname === '/images') {
      setCurrentIndex(1);
    } else if (router.pathname === '/apod') {
      setCurrentIndex(2);
    } else if (router.pathname === '/epic') {
      setCurrentIndex(3);
    }
  }, [router.pathname]);

  useEffect(() => {
    setAppBarTitle(titles[currentIndex]);
  }, [currentIndex]);

  useEffect(() => {
    const size = window.matchMedia('(min-width: 1024px)');
    size.matches === true
      ? setNavVariant(navMenuLgVariant)
      : setNavVariant(navMenuVariant);
  }, []);

  const handleBottomDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleBottomDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handlePreviousPage = () => {
    window.history.back();
  };
  const handleNextPage = () => {
    window.history.forward();
  };

  const Menu = () => {
    return (
      <motion.div
        className='fixed inset-x-0 bottom-0 lg:inset-x-auto lg:inset-y-0 lg:left-0 lg:pt-20 bg-black p-6 pb-20 z-10'
        initial='hidden'
        animate={drawerOpen ? 'visible' : 'hidden'}
        variants={navVariant}
        ref={navRef}
      >
        <nav>
          <ul
            className='text-primary-light'
            onClick={() => setDrawerOpen(false)}
          >
            <li
              className={`py-2 text-lg lg:text-xl ${
                currentIndex === 0 && 'text-white'
              }`}
            >
              <Link href='/'>
                <a className='flex items-center'>
                  <FiHome className='inline mr-4' /> Home
                </a>
              </Link>
            </li>
            <li
              className={`py-2 text-lg lg:text-xl ${
                currentIndex === 1 && 'text-white'
              }`}
            >
              <Link href='/images'>
                <a className='flex items-center'>
                  <FiImage className='inline mr-4' /> NASA Image Library
                </a>
              </Link>
            </li>
            <li
              className={`py-2 text-lg lg:text-xl ${
                currentIndex === 3 && 'text-white'
              }`}
            >
              <Link href='/epic'>
                <a className='flex items-center'>
                  <FiGlobe className='inline mr-4' /> Earth Polychromatic
                  Imaging Camera
                </a>
              </Link>
            </li>
            <li>
              <hr className='border-gray-900 my-2 -mx-6' />
            </li>
            <li className='py-2 text-lg lg:text-xl'>
              <a
                href='https://github.com/ZachScroggins/nasa-api-explorer'
                className='flex items-center'
              >
                <FiGithub className='inline mr-4' /> GitHub
              </a>
            </li>
            <li className='py-2 text-lg lg:text-xl'>
              <a
                href='https://github.com/ZachScroggins'
                className='flex items-center'
              >
                <FiCode className='inline mr-4' /> My Work
              </a>
            </li>
          </ul>
        </nav>
      </motion.div>
    );
  };

  return (
    <>
      <motion.div
        id='mobile-top-app-bar'
        className='fixed top-0 left-0 py-3 bg-primary w-full z-20 sm:hidden'
        initial='visible'
        // animate={goingUp ? 'hidden' : 'visible'}
        variants={topNavVariant}
      >
        <h1 className='text-center text-2xl truncate px-4'>{appBarTitle}</h1>
      </motion.div>
      <div className='fixed top-0 left-0 py-3 bg-primary w-full z-20 hidden lg:block'>
        <div className='absolute py-4 top-0 left-0 cursor-pointer'>
          <div
            className='flex justify-center items-center w-20'
            title='Open Navigation Menu'
            onClick={handleBottomDrawerOpen}
          >
            {drawerOpen ? (
              <FiChevronsLeft size='1.7em' />
            ) : (
              <FiMenu size='1.5em' />
            )}
          </div>
        </div>
        <h1 className='text-center text-2xl pl-20'>{appBarTitle}</h1>
      </div>
      <div className='py-20 sm:py-0 sm:pt-10 sm:pb-20 lg:pt-20 lg:pb-0 lg:pl-20'>
        <main>{props.children}</main>
      </div>
      <motion.div
        id='bottom-app-bar'
        className='lg:hidden fixed flex bottom-0 left-0 z-20 px-4 bg-primary w-full py-4'
        initial='visible'
        // animate={goingUp ? 'hidden' : 'visible'}
        variants={bottomNavVariant}
      >
        <div
          className='flex justify-center items-center'
          aria-label='open navigation menu'
          onClick={handleBottomDrawerOpen}
        >
          <FiMenu size='1.5em' />
        </div>
        <h1 className='hidden sm:block ml-4 text-lg'>{appBarTitle}</h1>
        <div className='flex-grow'></div>
        <div className='flex justify-center items-center'>
          <div className='ml-6' onClick={handlePreviousPage}>
            <FiArrowLeft size='1.5em' />
          </div>
          <Link href='/'>
            <a aria-label='Home'>
              <div className='ml-6'>
                <FiHome size='1.5em' />
              </div>
            </a>
          </Link>
          <div className='ml-6' onClick={handleNextPage}>
            <FiArrowRight size='1.5em' />
          </div>
        </div>
      </motion.div>
      <Menu />
      <div className='hidden lg:block fixed inset-y-0 left-0 bg-black pt-16 px-2'>
        <ul className='text-primary-light'>
          <li className={`py-2 ${currentIndex === 0 && 'text-white'}`}>
            <Link href='/'>
              <a className='flex flex-col items-center'>
                <FiHome className='text-2xl' />
                <div>Home</div>
              </a>
            </Link>
          </li>
          <li className={`py-2 ${currentIndex === 1 && 'text-white'}`}>
            <Link href='/images'>
              <a className='flex flex-col items-center'>
                <FiImage className='text-2xl' />
                <div>Images</div>
              </a>
            </Link>
          </li>
          <li className={`py-2 ${currentIndex === 3 && 'text-white'}`}>
            <Link href='/epic'>
              <a className='flex flex-col items-center'>
                <FiGlobe className='text-2xl' />
                <div>EPIC</div>
              </a>
            </Link>
          </li>
          <li>
            <hr className='border-gray-900 my-2' />
          </li>
          <li className='py-2'>
            <a
              href='https://github.com/ZachScroggins/nasa-api-explorer'
              className='flex flex-col items-center'
            >
              <FiGithub className='text-2xl' />
              <div>GitHub</div>
            </a>
          </li>
          <li className='py-2'>
            <a
              href='https://github.com/ZachScroggins'
              className='flex flex-col items-center'
            >
              <FiCode className='text-2xl' />
              <div>My Work</div>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Layout;
