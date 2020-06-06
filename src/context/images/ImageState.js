import { useReducer, useEffect } from 'react';
import ImageContext from './imageContext';
import ImageReducer from './imageReducer';
import {
  SET_QUERY,
  GET_RESULTS,
  SET_CURRENT,
  SET_LOADING,
  SET_ERROR,
} from '../types';

const ImageState = props => {
  const initialState = {
    query: 'Nebula',
    results: [],
    current: {},
    loading: false,
    error: { status: false, message: '' },
  };

  const [state, dispatch] = useReducer(ImageReducer, initialState);

  useEffect(() => {
    getResults('Nebula');
  }, []);

  const setQuery = input => {
    dispatch({ type: SET_QUERY, payload: input });
  };

  const getResults = async query => {
    setLoading();

    let res = await fetch(
      `https://images-api.nasa.gov/search?q=${query}&media_type=image`
    );

    let data = await res.json();

    try {
      dispatch({
        type: GET_RESULTS,
        payload: data.collection.items,
      });
    } catch (e) {
      dispatch({
        type: SET_ERROR,
        payload: data.reason,
      });
    }
  };

  const setCurrent = currentItem => {
    dispatch({ type: SET_CURRENT, payload: currentItem });
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <ImageContext.Provider
      value={{
        query: state.query,
        results: state.results,
        current: state.current,
        loading: state.loading,
        error: state.error,
        setQuery,
        getResults,
        setCurrent,
        setLoading,
      }}
    >
      {props.children}
    </ImageContext.Provider>
  );
};

export default ImageState;
