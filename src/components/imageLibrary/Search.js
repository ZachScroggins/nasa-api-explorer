import { useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import ImageContext from '../../context/images/imageContext';
import { FiSearch, FiRotateCcw, FiX } from 'react-icons/fi';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);

const Search = () => {
  const imageContext = useContext(ImageContext);
  const { query, setQuery, getResults, error } = imageContext;
  const router = useRouter();
  const inputRef = useRef(null);

  const handleClick = () => {
    getResults(query);
    router.push({
      pathname: '/images',
      query: { query: `${query}` },
    });
  };

  const handleEnter = e => {
    if (e.keyCode === 13) {
      getResults(query);
      inputRef.current.blur();
      router.push({
        pathname: '/images',
        query: { query: `${query}` },
      });
    }
  };

  const handleReset = () => {
    setQuery('Supernova');
    getResults('Supernova');
    router.push({
      pathname: '/images',
      query: { query: 'Supernova' },
    });
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <>
      <div
        className={`root relative inline-flex flex-col align-top max-w-full w-full lg:w-3/4 lg:max-w-screen-xl rounded border border-gray-500 focus-within:border-primary p-3 z-0 ${
          error.status && 'border-red-600'
        }`}
      >
        <label
          htmlFor='search'
          className={`block absolute top-0 left-0 bg-background ${
            query.length > 0 && 'animated'
          } ${error.status && 'text-red-600'}`}
        >
          Search
        </label>
        <div className='flex'>
          <input
            type='text'
            className='bg-transparent block min-w-0 w-full'
            // placeholder='Search'
            value={query}
            id='search'
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleEnter}
            ref={inputRef}
          />
          <div className='p-1 ml-2 cursor-pointer' onClick={handleClear}>
            <FiX className='text-gray-600' size='1.3em' title='Clear' />
          </div>
          <div className='p-1 ml-2 cursor-pointer' onClick={handleReset}>
            <FiRotateCcw size='1.3em' title='Reset' />
          </div>
          <div className='p-1 ml-2 cursor-pointer' onClick={handleClick}>
            <FiSearch size='1.3em' title='Search' />
          </div>
        </div>
      </div>
      {error.status && <p className='text-red-600 text-sm'>{error.message}</p>}
      <style jsx>{`
        .root:focus-within > label {
          transform: translate(10px, -10px) scale(0.75);
          transition: 0.15s, color 0s;
          padding-left: 0.5rem;
          padding-right: 0.5rem;
          color: ${fullConfig.theme.colors.primary.default};
        }

        .animated {
          transform: translate(10px, -10px) scale(0.75);
          transition: 0.15s, color 0s;
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }

        label {
          transform-origin: top left;
          transform: translate(14px, 15px) scale(1);
          transition: 0.15s, color 0s;
        }
      `}</style>
    </>
  );
};

export default Search;
