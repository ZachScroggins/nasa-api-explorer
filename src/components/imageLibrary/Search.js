import { useRef, useContext } from 'react';
import ImageContext from '../../context/images/imageContext';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';

const Search = () => {
  const imageContext = useContext(ImageContext);
  const { query, setQuery, getResults, error } = imageContext;
  const inputRef = useRef(null);

  const handleEnter = e => {
    if (e.keyCode === 13) {
      getResults(query);
      inputRef.current.blur();
    }
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
              <IconButton
                aria-label='search'
                edge='end'
                onClick={() => getResults(query)}
              >
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
//   const { query, setQuery, error } = imageContext;
//   const [input, setInput] = useState('');
//   const inputRef = useRef(null);

//   const handleEnter = e => {
//     if (e.keyCode === 13) {
//       setQuery(input);
//       inputRef.current.blur();
//     }
//   };

//   return (
//     <>
//       <TextField
//         label='Search'
//         id='search'
//         variant='outlined'
//         fullWidth
//         type='text'
//         error={error.status}
//         helperText={error.message}
//         onChange={e => setInput(e.target.value)}
//         onKeyDown={handleEnter}
//         inputProps={{ ref: inputRef }}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position='end'>
//               <IconButton
//                 aria-label='search'
//                 edge='end'
//                 onClick={() => setQuery(input)}
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
