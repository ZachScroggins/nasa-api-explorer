const ImageItemSkeleton = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='container rounded-lg lg:flex lg:bg-transparent'>
        <div className='w-full bg-gray-900 rounded-lg h-[50vh] mb-4 lg:mb-0 animate-pulse' />
        <div className='w-full p-4 overflow-auto bg-black lg:bg-transparent lg:pt-0'>
          <div className='h-8 bg-gray-900 rounded animate-pulse' />
          <div className='w-24 h-4 my-2 bg-gray-900 rounded animate-pulse' />
          <hr className='mt-1 mb-2 border-gray-900' />
          <div className='h-6 my-4 bg-gray-900 rounded animate-pulse' />
          <div className='w-4/5 h-6 my-4 bg-gray-900 rounded animate-pulse' />
          <div className='h-6 my-4 bg-gray-900 rounded w-44 animate-pulse' />
          <div className='w-24 h-6 my-4 bg-gray-900 rounded animate-pulse' />
          <hr className='pt-1 pb-2 border-gray-900' />
          <div>
            {Array.from(new Array(12)).map(index => {
              return (
                <div
                  key={index}
                  className='h-6 mb-4 bg-gray-900 rounded animate-pulse'
                />
              );
            })}
            {/* <p className='text-lg leading-loose'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque
              nesciunt tempore iusto, animi temporibus optio obcaecati iure
              ipsum commodi, velit amet odio officiis. Provident reiciendis
              cupiditate eius harum assumenda numquam delectus accusamus nobis,
              magni iure voluptates voluptatibus atque a, quod amet asperiores
              ratione totam expedita quos dolorum fugit unde quo fugiat! Qui
              illo eaque repudiandae facilis totam a ratione quidem possimus
              aliquid? Voluptas expedita ea odit temporibus hic ex saepe
              quaerat, nam quibusdam distinctio molestias necessitatibus
              accusantium minima unde quam reprehenderit. Laborum quo velit
              labore ducimus error quis asperiores magni! Dolores laboriosam
              recusandae nemo. Ex at quas dignissimos id reprehenderit.
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageItemSkeleton;
