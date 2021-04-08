const ResultsSkeleton = () => {
  return (
    <ul className='relative grid flex-1 grid-cols-1 gap-6 p-1 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
      {Array.from(new Array(40)).map((item, index) => (
        <li
          key={index}
          className='flex flex-col overflow-hidden rounded-lg shadow-lg cursor-pointer hover:shadow-2xl focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-400'
        >
          <div className='overflow-hidden bg-black h-96'>
            <div className='relative flex-shrink-0 w-full h-48 bg-gray-900 animate-pulse' />
            <div className='h-48 p-6 bg-black'>
              <div className='text-sm font-medium text-cyan-700'>
                <div className='w-20 h-3 bg-gray-900 rounded animate-pulse' />
              </div>
              <div className='flex flex-col justify-between h-full'>
                <div className='mt-2 hover:underline line-clamp-3'>
                  <div className='w-full h-4 mt-2 bg-gray-900 rounded animate-pulse' />
                  <div className='w-full h-4 mt-3 bg-gray-900 rounded animate-pulse' />
                  <div className='w-full h-4 mt-3 bg-gray-900 rounded animate-pulse' />
                </div>
                <div className='pb-3 text-primary-light lg:hover:underline'>
                  <div className='w-16 h-4 bg-gray-900 rounded animate-pulse' />
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ResultsSkeleton;
