import useLayout from './useLayout';
import { MobileHeader, MobileSidebar, StaticSidebar } from 'components/common';

const Layout = ({ children }) => {
  const { isOpen, setIsOpen, currentIndex } = useLayout();

  return (
    <>
      <div className='flex'>
        <MobileSidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          currentIndex={currentIndex}
        />
        <StaticSidebar currentIndex={currentIndex} />
        <div className='relative top-0 left-0 flex flex-col flex-1 min-w-0'>
          <MobileHeader setIsOpen={setIsOpen} />
          <div className='relative top-0 z-0 flex flex-1 lg:left-64 lg:mr-64'>
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
};

export default Layout;
