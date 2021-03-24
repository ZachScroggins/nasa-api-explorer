import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ImageSlider from 'components/epic/ImageSlider';
import Data from 'components/epic/Data';
// import CalendarModal from 'components/epic/CalendarModal';
// import ImageModal from 'components/epic/ImageModal';
import ThumbnailSlider from 'components/epic/ThumbnailSlider';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function epic({ data, type, error }) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  let curr = null;
  let year = null;
  let month = null;
  let day = null;
  let imageName = null;
  let currImgUrl = null;

  if (data) {
    curr = data[currentIndex] || null;
    year = curr?.date?.slice(0, 4);
    month = curr?.date?.slice(5, 7);
    day = curr?.date?.slice(8, 10);
    imageName = curr?.image;
    currImgUrl = `https://epic.gsfc.nasa.gov/archive/${type}/${year}/${month}/${day}/png/${imageName}.png`;
  }

  const switchTypes = (newType: string) => {
    if (newType === 'natural') {
      router.push('/epic');
    }
    if (newType === 'enhanced') {
      router.push({
        pathname: '/epic',
        query: { type: 'enhanced' },
      });
    }
  };

  if (!data || !data.length) {
    console.log(data);
    return <p>no data</p>;
  }

  if (error) {
    console.log(error);
    return <p>error</p>;
  }

  return (
    <div className='h-screen'>
      <Head>
        <title>Earth Polychromatic Imaging Camera | NASA API Explorer</title>
      </Head>
      <div className='container grid grid-cols-1 p-4 mx-auto lg:grid-cols-2 lg:gap-4'>
        <ImageSlider
          data={data}
          type={type}
          year={year}
          month={month}
          day={day}
          setCurrentIndex={setCurrentIndex}
        />
        <div>
          <div className='flex justify-center pb-2'>
            <button
              type='button'
              className='px-6 py-3 mr-2 text-lg rounded-lg bg-primary'
              onClick={() => switchTypes('natural')}
            >
              Natural
            </button>
            <button
              type='button'
              className='px-6 py-3 text-lg border rounded-lg border-primary text-primary-light'
              onClick={() => switchTypes('enhanced')}
            >
              Enhanced
            </button>
          </div>
          <Data data={data} type={type} currentIndex={currentIndex} />
        </div>
        {/* {relatedProducts && (
          <div className='mt-16 overflow-hidden lg:col-span-2'>
            <h2 className='text-3xl text-center underline'>Related Products</h2>
            <RelatedProducts relatedProducts={relatedProducts} />
          </div>
        )} */}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context;
  let data = null;
  let error = null;
  let type = 'natural';
  let url = `https://api.nasa.gov/EPIC/api/natural?api_key=${process.env.NASA_API_KEY}`;
  if (!query.date && query.type) {
    if (query.type === 'enhanced') {
      url = `https://api.nasa.gov/EPIC/api/enhanced?api_key=${process.env.NASA_API_KEY}`;
      type = 'enhanced';
    }
  }
  if (query.date) {
    url = `https://api.nasa.gov/EPIC/api/${query.type}/date/${query.date}?api_key=${process.env.NASA_API_KEY}`;
    type = query.type.toString();
  }

  // console.log(url);

  try {
    const res = await fetch(url);
    const json = await res.json();
    if (res.ok) {
      data = json;
    } else {
      throw new Error(`Error ${res.status}: ${json?.reason}`);
    }
  } catch (e) {
    console.log(e.message);
    error = true;
  }

  // console.log(data);

  return {
    props: { data, type, error },
  };
};
