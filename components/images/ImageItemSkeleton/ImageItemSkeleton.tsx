const ImageItemSkeleton = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='container bg-black rounded-lg lg:flex lg:bg-transparent'>
        <div className='w-full bg-gray-900 rounded-lg h-72 animate-pulse' />
        <div className='w-full p-4 overflow-auto lg:pt-0'>
          <p className='text-2xl font-bold'>A Whole Bunch Of Words</p>
          <p className='py-2 font-light text-gray-500'>2008-08-08</p>
          <hr className='pt-1 pb-2 border-gray-900' />
          <p className='inline mr-1 text-lg text-gray-400'>Keywords:</p>
          <div className='py-4'>
            <p className='inline text-lg text-gray-400'>Secondary Creator:</p>
          </div>
          <div className='pb-4'>
            <p className='inline text-lg text-gray-400'>NASA ID: </p>
          </div>
          <div className='pb-4'>
            <p className='inline text-lg text-gray-400'>Center: </p>
          </div>
          <hr className='pt-1 pb-2 border-gray-900' />
          <div>
            <p className='text-lg leading-loose'>
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
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageItemSkeleton;
