import { useEffect, useRef } from 'react';

const useClickAway = (ref, setState) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target)) {
          setState(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [ref]);
};

export default useClickAway;
