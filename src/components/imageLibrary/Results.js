import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import ImageContext from '../../context/images/imageContext';

const containerVariant = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.005,
    },
  },
};

const resultVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

const noResultVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const Results = ({ results }) => {
  const router = useRouter();
  const imageContext = useContext(ImageContext);
  const { setCurrent } = imageContext;

  const handleClick = currentItem => {
    setCurrent(currentItem);
    router.push('/imageItem');
  };

  if (results.length === 0) {
    return (
      <>
        <motion.div
          variants={noResultVariant}
          initial='hidden'
          animate='visible'
        >
          <p>No results...</p>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <motion.div
        variants={containerVariant}
        initial='hidden'
        animate='visible'
      >
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {results.map(item => {
            return (
              <motion.div
                key={item.data[0].nasa_id}
                variants={resultVariant}
                whileHover={{ scale: 1.08 }}
              >
                <div
                  className='bg-black root cursor-pointer hover:border border-primary rounded-lg'
                  onClick={() => handleClick(item)}
                >
                  <div
                    style={{ backgroundImage: `url(${item.links[0].href})` }}
                    title={item.data[0].title}
                    alt={item.data[0].title}
                    className='h-0 img block bg-cover bg-no-repeat bg-center rounded-t-lg'
                  ></div>
                  <div className='p-4'>
                    <p className='h-20'>{item.data[0].title}</p>
                    <div className='flex justify-between items-center mt-2'>
                      <p className='text-gray-500'>
                        {item.data[0].date_created.slice(0, 10)}
                      </p>
                      <Link href='/imageItem'>
                        <a className='text-primary-light hover:underline'>
                          DETAILS
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      <style jsx>{`
        .root {
          width: 300px;
        }

        .root:hover {
          box-shadow: 0px 3px 5px -1px rgba(112, 93, 207, 0.2),
            0px 5px 8px 0px rgba(112, 93, 207, 0.14),
            0px 1px 14px 0px rgba(112, 93, 207, 0.12);
        }

        .img {
          padding-top: 56.25%;
        }
      `}</style>
    </>
  );
};

export default Results;
