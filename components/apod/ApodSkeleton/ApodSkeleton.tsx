const ApodSkeleton = () => {
  return (
    <div className='grid lg:grid-cols-2 lg:gap-4'>
      <div className='w-full bg-gray-900 rounded-lg h-[50vh] mb-4 lg:mb-0 animate-pulse' />
      <div className='w-full p-4 bg-black rounded-b-lg sm:p-8 lg:rounded-lg'>
        <div className='w-24 h-4 my-2 bg-gray-900 rounded animate-pulse' />
        <div className='h-12 mt-4 bg-gray-900 rounded animate-pulse' />
        {Array.from(new Array(12)).map((number, index) => {
          return (
            <div
              key={index}
              className='h-6 my-4 bg-gray-900 rounded animate-pulse'
            />
          );
        })}
      </div>
    </div>
  );
};

export default ApodSkeleton;
