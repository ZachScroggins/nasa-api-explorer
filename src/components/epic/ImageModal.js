import { useContext, useRef } from 'react';
import { motion } from 'framer-motion';
import EpicContext from '../../context/epic/epicContext';
import useClickAway from '../../utils/useClickAway';
import { FiX } from 'react-icons/fi';

const ImageModal = ({ imageOpen, setImageOpen, currentIndex }) => {
  const imageModalRef = useRef();
  useClickAway(imageModalRef, setImageOpen);
  const epicContext = useContext(EpicContext);
  const { currentMetadata, type, date } = epicContext;
  const year = date?.toISOString().slice(0, 4);
  const month = date?.toISOString().slice(5, 7);
  const day = date?.toISOString().slice(8, 10);
  const imageName = currentMetadata[currentIndex]?.image;

  return (
    <>
      {imageOpen && (
        <div
          className='fixed inset-0 z-30 bg-black bg-opacity-50'
          aria-label='image-modal'
        >
          <div className='flex justify-center items-center w-full h-screen'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div
                ref={imageModalRef}
                className='flex justify-center items-center'
              >
                <img
                  src={`https://epic.gsfc.nasa.gov/archive/${type}/${year}/${month}/${day}/png/${imageName}.png`}
                  title={imageName}
                  alt='earth full resolution'
                  width='2048px'
                  height='2048px'
                  className='w-auto max-h-screen'
                />
              </div>
              <div
                className='absolute top-0 right-0 z-40 flex justify-center items-center p-4 cursor-pointer'
                title='Close'
                onClick={() => setImageOpen(false)}
              >
                <FiX size='2em' />
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageModal;
