import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Search() {
  const router = useRouter();
  const [query, setQuery] = useState('Supernova');

  useEffect(() => {
    if (router.query.q) {
      setQuery(router.query.q.toString());
    }
  }, [router.query]);

  const handleSearch = e => {
    e.preventDefault();
    router.push({
      pathname: '/images',
      query: { q: query },
    });
  };

  return (
    <div className='fixed left-0 z-10 flex flex-shrink-0 w-full h-16 mr-64 bg-black border-b border-gray-900 lg:right-0 lg:left-64 top-16 lg:top-0'>
      <div className='flex justify-between flex-1 px-4'>
        <div className='flex flex-1'>
          <form className='flex w-full lg:ml-0' onSubmit={e => handleSearch(e)}>
            <label htmlFor='search_field' className='sr-only'>
              Search
            </label>
            <div className='relative w-full text-gray-300 lg:right-0 focus-within:text-gray-100'>
              <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none'>
                <svg
                  className='w-5 h-5'
                  x-description='Heroicon name: solid/search'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <input
                id='search_field'
                className='block w-full h-full py-2 pl-8 pr-3 text-gray-300 bg-black border-transparent focus:outline-none focus:text-gray-100 focus:ring-0 focus:border-transparent sm:text-sm'
                type='search'
                name='search'
                required
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            <div className='flex items-center ml-4 lg:ml-6 lg:mr-64'>
              <button
                type='submit'
                className='inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
