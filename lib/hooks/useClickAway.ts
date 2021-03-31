import React, { useEffect } from 'react';

type ClickAwayHook = (
  ref: React.RefObject<HTMLElement>,
  setState: React.Dispatch<React.SetStateAction<boolean>>
) => null;

type AnyEvent = MouseEvent | TouchEvent;

const useClickAway: ClickAwayHook = (ref, setState) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleClickOutside = (event: AnyEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setState(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
      };
    }
  }, [ref, setState]);

  // escape key event listener
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key == 'Escape') {
          setState(false);
        }
      };
      document.body.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.body.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [ref, setState]);

  return null;
};

export default useClickAway;
