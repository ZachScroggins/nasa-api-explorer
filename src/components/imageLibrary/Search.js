import { useRef, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import ImageContext from '../../context/images/imageContext';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import UndoRoundedIcon from '@material-ui/icons/UndoRounded';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';

const Search = () => {
  const imageContext = useContext(ImageContext);
  const { query, setQuery, getResults, error } = imageContext;
  const [input, setInput] = useState(query);
  const router = useRouter();
  const inputRef = useRef(null);

  const handleClick = () => {
    getResults(query);
    router.push({
      pathname: '/images',
      query: { query: `${query}` },
    });
  };

  const handleEnter = e => {
    if (e.keyCode === 13) {
      getResults(query);
      inputRef.current.blur();
      router.push({
        pathname: '/images',
        query: { query: `${query}` },
      });
    }
  };

  const handleReset = () => {
    setQuery('Nebula');
    getResults('Nebula');
    router.push({
      pathname: '/images',
      query: { query: 'Nebula' },
    });
  };

  return (
    <>
      <TextField
        label='Search'
        value={query}
        id='search'
        variant='outlined'
        fullWidth
        type='text'
        error={error.status}
        helperText={error.message}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleEnter}
        inputProps={{ ref: inputRef }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton aria-label='reset' edge='end' onClick={handleReset}>
                <UndoRoundedIcon />
              </IconButton>
              <IconButton aria-label='search' edge='end' onClick={handleClick}>
                <SearchRoundedIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};
// const Search = () => {
//   const imageContext = useContext(ImageContext);
//   const { query, setQuery, getResults, error } = imageContext;
//   const inputRef = useRef(null);

//   const handleEnter = e => {
//     if (e.keyCode === 13) {
//       getResults(query);
//       inputRef.current.blur();
//     }
//   };

//   const handleReset = () => {
//     setQuery('Nebula');
//     getResults('Nebula');
//   };

//   return (
//     <>
//       <TextField
//         label='Search'
//         value={query}
//         id='search'
//         variant='outlined'
//         fullWidth
//         type='text'
//         error={error.status}
//         helperText={error.message}
//         onChange={e => setQuery(e.target.value)}
//         onKeyDown={handleEnter}
//         inputProps={{ ref: inputRef }}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position='end'>
//               <IconButton aria-label='reset' edge='end' onClick={handleReset}>
//                 <UndoRoundedIcon />
//               </IconButton>
//               <IconButton
//                 aria-label='search'
//                 edge='end'
//                 onClick={() => getResults(query)}
//               >
//                 <SearchRoundedIcon />
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />
//     </>
//   );
// };

export default Search;
