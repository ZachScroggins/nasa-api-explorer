import useLayout from './useLayout';
import { MobileHeader, MobileSidebar, StaticSidebar } from 'components/common';

const Layout: React.FC<{}> = ({ children }) => {
  const { isOpen, setIsOpen, currentIndex, mainClasses } = useLayout();

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
              className={mainClasses}
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
