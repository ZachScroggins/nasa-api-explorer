export const classNames = (
  ...classes: (false | null | undefined | string)[]
): string => {
  return classes.filter(Boolean).join(' ');
};

// usage example
//
// import { classNames } from 'lib/classNames';
//
// <button
//   className={classNames(
//     'this is always applied',
//     isTruthy && 'this only when the isTruthy is truthy',
//     active ? 'active classes' : 'inactive classes'
//   )}
// >
//   Text
// </button>;
