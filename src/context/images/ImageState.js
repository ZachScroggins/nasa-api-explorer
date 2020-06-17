import { useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';
import ImageContext from './imageContext';
import ImageReducer from './imageReducer';
import {
  SET_QUERY,
  GET_RESULTS,
  SET_CURRENT,
  GET_CURRENT_MANIFEST,
  SET_LOADING,
  SET_ERROR,
} from '../types';

const ImageState = props => {
  const router = useRouter();
  let tryGetCurrent;
  try {
    tryGetCurrent =
      typeof window !== 'undefined' &&
      JSON.parse(localStorage.getItem('current'));
  } catch (err) {
    tryGetCurrent = null;
  }
  const initialState = {
    query:
      process.env.NODE_ENV === 'development'
        ? router.asPath.slice(14) || 'Supernova'
        : router.asPath.slice(15) || 'Supernova',
    results: [],
    current: tryGetCurrent,
    currentManifest: null,
    loading: false,
    error: { status: false, message: '' },
  };
  const [state, dispatch] = useReducer(ImageReducer, initialState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      getResults(initialState.query);
    }
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

    if (typeof window !== 'undefined') {
      localStorage.setItem('current', JSON.stringify(currentItem));
    }
  };

  const getCurrentManifest = async nasa_id => {
    let res = await fetch(`https://images-api.nasa.gov/asset/${nasa_id}`);

    let data = await res.json();

    dispatch({ type: GET_CURRENT_MANIFEST, payload: data.collection.items });
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <ImageContext.Provider
      value={{
        query: state.query,
        results: state.results,
        current: state.current,
        currentManifest: state.currentManifest,
        loading: state.loading,
        error: state.error,
        setQuery,
        getResults,
        setCurrent,
        getCurrentManifest,
        setLoading,
      }}
    >
      {props.children}
    </ImageContext.Provider>
  );
};

export default ImageState;
