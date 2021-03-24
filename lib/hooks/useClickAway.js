import { useEffect } from 'react';

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

  // escape key event listener
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleEscapeKey = event => {
        if (event.key == 'Escape') {
          setState(false);
        }
      };
      document.body.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.body.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, []);
};

export default useClickAway;
