type AlertType = 'danger' | 'warning' | 'success';

interface Props {
  type: AlertType;
  message: string;
  action: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Alert: React.FC<Props> = ({ type, message, action }) => {
  return (
    <div className='row-start-2 p-4 mb-2 bg-red-100 rounded-md lg:row-start-1 lg:mb-0 lg:col-span-2'>
      <div className='flex'>
        <div className='flex-shrink-0'>
          <svg
            className='w-5 h-5 text-red-400'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
              clipRule='evenodd'
            />
          </svg>
        </div>
        <div className='flex-1 ml-3 md:flex md:justify-between'>
          <p className='text-sm text-red-700'>{message}</p>
          {/* <p className='text-sm text-red-700'>{error.message}</p> */}
          <p className='mt-3 text-sm md:mt-0 md:ml-6'>
            <button
              type='button'
              className='font-medium text-red-700 whitespace-nowrap hover:text-red-600'
              onClick={action}
              // onClick={() => router.reload()}
            >
              Reset <span aria-hidden='true'>→</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
