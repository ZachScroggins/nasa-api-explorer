import { useContext, useRef } from 'react';
import Calendar from 'react-calendar';
import { motion } from 'framer-motion';
import EpicContext from '../../context/epic/epicContext';
import useClickAway from '../../utils/useClickAway';
import { FiX } from 'react-icons/fi';

const CalendarModal = ({ calendarOpen, setCalendarOpen }) => {
  const epicContext = useContext(EpicContext);
  const { type, getNaturalByDate, getEnhancedByDate, date } = epicContext;
  const calendarRef = useRef();
  useClickAway(calendarRef, setCalendarOpen);

  const handleDateChange = value => {
    if (type === 'natural') {
      getNaturalByDate(value.toISOString().slice(0, 10));
    } else {
      getEnhancedByDate(value.toISOString().slice(0, 10));
    }
    setCalendarOpen(false);
  };

  return (
    <>
      {calendarOpen && (
        <div
          className='fixed inset-0 z-30 bg-black bg-opacity-50'
          aria-label='calendar-modal'
        >
          <div className='flex justify-center items-center w-full h-full'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div ref={calendarRef}>
                <Calendar
                  onChange={(value, event) => handleDateChange(value, event)}
                  value={date}
                  minDate={new Date('2015-06-13')}
                  maxDate={new Date()}
                  className='text-black'
                  tileClassName=''
                  // onClickDay={() => setCalendarOpen(false)}
                />
              </div>
              <div
                className='absolute top-0 right-0 z-40 flex justify-center items-center p-4 cursor-pointer'
                title='Close'
                onClick={() => setCalendarOpen(false)}
              >
                <FiX size='2em' />
              </div>
            </motion.div>
          </div>
        </div>
      )}
      <style jsx global>{`
        body {
          overflow: ${calendarOpen ? 'hidden' : 'visible'};
        }
      `}</style>
    </>
  );
};

export default CalendarModal;
