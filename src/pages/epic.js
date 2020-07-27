import { useState, useContext, useEffect } from 'react';
import EpicContext from '../context/epic/epicContext';
import LinearProgress from '../components/LinearProgress';

const epic = ({ data }) => {
  const epicContext = useContext(EpicContext);
  const {
    naturalMetadata,
    enhancedMetadata,
    currentMetadata,
    type,
    getMostRecentNatural,
    getMostRecentEnhanced,
    getNaturalByDate,
    getEnhancedByDate,
    error,
    errorMessage,
    loading,
  } = epicContext;
  const [naturalInput, setNaturalInput] = useState('');
  const [enhancedInput, setEnhancedInput] = useState('');

  useEffect(() => {
    // getMostRecentNatural();
  }, []);

  return (
    <>
      <div className='container'>
        {loading && <LinearProgress />}
        <p>{`error status: ${error}`}</p>
        <p>error message: {errorMessage}</p>
        <div>
          <button
            className='px-4 py-2 m-2 bg-primary'
            onClick={getMostRecentEnhanced}
          >
            Enhanced
          </button>
          <button
            className='px-4 py-2 m-2 bg-primary'
            onClick={getMostRecentNatural}
          >
            Natural
          </button>
        </div>
        <div>
          <div>
            <button
              className='px-4 py-2 m-2 bg-primary'
              onClick={() => getEnhancedByDate(enhancedInput)}
            >
              Enhanced By Date
            </button>
            <input
              className='text-black'
              type='text'
              onChange={e => setEnhancedInput(e.target.value)}
            />
          </div>
          <div>
            <button
              className='px-4 py-2 m-2 bg-primary'
              onClick={() => getNaturalByDate(naturalInput)}
            >
              Natural By Date
            </button>
            <input
              className='text-black'
              type='text'
              onChange={e => setNaturalInput(e.target.value)}
            />
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  console.log(e.target.value);
                }}
              >
                <input
                  type='date'
                  className='rounded-lg bg-primary appearance-none cursor-pointer'
                  defaultValue='2017-06-01'
                  min='2017-01-01'
                  max='2018-12-31'
                  onChange={e => console.log(e.target.value)}
                  onSelect={() => console.log('select')}
                />
              </form>
            </div>
          </div>
        </div>
        <div className='flex flex-wrap'>
          {currentMetadata?.map(item => {
            const year = item?.date.slice(0, 4);
            const month = item?.date.slice(5, 7);
            const day = item?.date.slice(8, 10);
            const image = item?.image;

            return (
              <div key={item?.identifier} className='m-4'>
                <img
                  src={`https://epic.gsfc.nasa.gov/archive/${type}/${year}/${month}/${day}/thumbs/${image}.jpg`}
                  alt='earth'
                  width='120px'
                  height='120px'
                  // className='m-4'
                />
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        input[type='date']::-webkit-calendar-picker-indicator {
          background-color: white;
          color: white;
          opacity: 1;
        }
        input[type='date']::-webkit-calendar-picker-indicator::after {
          color: white;
          opacity: 1;
        }
      `}</style>
    </>
  );
};

// // This gets called on every request
// export async function getServerSideProps(req) {
//   // Fetch data from external API
//   const res = await fetch(
//     `https://api.nasa.gov/EPIC/api/natural?api_key=${process.env.NASA_API_KEY}`
//   );
//   const data = await res.json();

//   console.log(req.query);

//   // Pass data to the page via props
//   return { props: { data } };
// }

export default epic;
