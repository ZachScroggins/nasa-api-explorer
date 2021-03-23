import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import ImageContext from '../context/images/imageContext';
import { FiX } from 'react-icons/fi';

const imageItem = () => {
  const router = useRouter();
  const imageContext = useContext(ImageContext);
  const {
    current,
    currentManifest,
    getCurrentManifest,
    setQuery,
    getResults,
  } = imageContext;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scroll(0, 0);
    }
  }, []);

  useEffect(() => {
    try {
      getCurrentManifest(current.data[0].nasa_id);
    } catch (err) {
      return;
    }
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const chipSearch = keyword => {
    setQuery(keyword);
    getResults(keyword);
    router.push({
      pathname: '/images',
      query: { query: keyword },
    });
  };

  try {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className='px-4'>
            <div className='flex justify-center items-center'>
              <div className='max-w-full bg-black rounded-lg lg:flex lg:bg-transparent'>
                <div className='lg:w-1/2'>
                  <img
                    src={current.links[0].href}
                    title={current.data[0].title}
                    onClick={handleOpen}
                    className='w-full h-auto cursor-pointer rounded-lg'
                  />
                </div>
                <div className='overflow-auto p-4 lg:pt-0 lg:w-1/2'>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.15,
                    }}
                  >
                    <p className='text-2xl font-bold'>
                      {current.data[0].title}
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.3,
                    }}
                  >
                    <p className='text-gray-500 font-light py-2'>
                      {current.data[0].date_created.slice(0, 10)}
                    </p>
                  </motion.div>
                  <hr className='border-gray-900 pb-2 pt-1' />
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.45,
                    }}
                  >
                    <p className='text-lg inline mr-1 text-gray-400'>
                      Keywords:
                    </p>
                    <div className='inline'>
                      {current.data[0].keywords.map((keyword, index) => (
                        <span
                          key={index}
                          // className='bg-primary-dark rounded-full px-2 py-1 mt-1 mr-1 mb-1 ml-0'
                          className='text-primary text-lg cursor-pointer'
                          onClick={() => chipSearch(keyword)}
                        >
                          {keyword},{' '}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                  <div className='py-4'>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.6,
                      }}
                    >
                      <p className='text-lg inline text-gray-400'>
                        Secondary Creator:{' '}
                      </p>
                      <p className='inline'>
                        {current.data[0].secondary_creator}
                      </p>
                    </motion.div>
                  </div>
                  <div className='pb-4'>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.75,
                      }}
                    >
                      <p className='text-lg inline text-gray-400'>NASA ID: </p>
                      <p className='inline'>{current.data[0].nasa_id}</p>
                    </motion.div>
                  </div>
                  <div className='pb-4'>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.9,
                      }}
                    >
                      <p className='text-lg inline text-gray-400'>Center: </p>
                      <p className='inline'>{current.data[0].center}</p>
                    </motion.div>
                  </div>
                  <hr className='border-gray-900 pb-2 pt-1' />
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 1.05,
                    }}
                  >
                    <p className='leading-loose text-lg'>
                      {current.data[0].description}
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {open && (
          <div
            className='fixed inset-0 z-30 bg-black bg-opacity-50'
            onClick={handleClose}
            aria-label='image-modal'
          >
            <div className='flex justify-center items-center w-full h-full'>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <img
                  src={
                    currentManifest &&
                    currentManifest[0].href.slice(0, 4) +
                      's' +
                      currentManifest[0].href.slice(4)
                  }
                  title={current.data[0].title}
                  className='w-full h-auto'
                  style={{ maxWidth: '90vw', maxHeight: '90vh' }}
                />
                <div
                  className='absolute top-0 right-0 z-40 flex justify-center items-center p-4 cursor-pointer'
                  title='Close'
                >
                  <FiX size='2em' />
                </div>
              </motion.div>
            </div>
          </div>
        )}
        <style jsx>{`
          .card {
            max-width: 90vw;
          }
        `}</style>
      </>
    );
  } catch (err) {
    return <p>Image not available</p>;
  }
};

export default imageItem;
