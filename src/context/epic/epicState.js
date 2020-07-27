import { useReducer, useEffect } from 'react';
import EpicReducer from './epicReducer';
import EpicContext from './epicContext';
import {
  GET_MOST_RECENT_NATURAL_METADATA,
  GET_MOST_RECENT_ENHANCED_METADATA,
  SET_LOADING,
  SET_TYPE,
  // SET_CURRENT_METADATA,
  GET_NATURAL_METADATA_BY_DATE,
  GET_ENHANCED_METADATA_BY_DATE,
  SET_ERROR,
} from '../types';

const EpicState = props => {
  const initialState = {
    date: new Date(),
    type: '',
    naturalMetadata: [],
    enhancedMetadata: [],
    currentMetadata: [],
    loading: false,
    statusCode: undefined,
    error: null,
    errorMessage: null,
  };
  const [state, dispatch] = useReducer(EpicReducer, initialState);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      document.cookie = 'visited=true; max-age=604800; samesite=strict';
    } else {
      document.cookie = 'visited=true; max-age=604800; samesite=strict; secure';
    }
    getMostRecentNatural();
  }, []);

  const setType = type => {
    dispatch({ type: SET_TYPE, payload: type });
  };

  // const setCurrentMetadata = () => {
  //   dispatch({ type: SET_CURRENT_METADATA, payload: null });
  // };

  const getMostRecentNatural = async () => {
    setLoading();

    const res = await fetch('/api/epic/natural');

    const json = await res.json();

    if (res.status === 200) {
      const currentDate = new Date(json.data[0].date);
      dispatch({
        type: GET_MOST_RECENT_NATURAL_METADATA,
        payload: { json, currentDate },
      });
    } else {
      setError(json.error);
    }

    setType('natural');

    setLoading();
  };

  const getNaturalByDate = async date => {
    setLoading();

    const res = await fetch(`/api/epic/natural/date?q=${date}`);

    const json = await res.json();

    if (res.status === 200) {
      const currentDate = new Date(json.data[0].date);
      dispatch({
        type: GET_NATURAL_METADATA_BY_DATE,
        payload: { json, currentDate },
      });
    } else {
      setError(json.error);
    }

    setType('natural');

    setLoading();
  };

  const getMostRecentEnhanced = async () => {
    setLoading();

    const res = await fetch('/api/epic/enhanced');

    const json = await res.json();

    if (res.status === 200) {
      const currentDate = new Date(json.data[0].date);
      dispatch({
        type: GET_MOST_RECENT_ENHANCED_METADATA,
        payload: { json, currentDate },
      });
    } else {
      setError(json.error);
    }

    setType('enhanced');

    setLoading();
  };

  const getEnhancedByDate = async date => {
    setLoading();

    const res = await fetch(`/api/epic/enhanced/date?q=${date}`);

    const json = await res.json();

    if (res.status === 200) {
      const currentDate = new Date(json.data[0].date);
      dispatch({
        type: GET_ENHANCED_METADATA_BY_DATE,
        payload: { json, currentDate },
      });
    } else {
      setError(json.error);
    }

    setType('enhanced');

    setLoading();
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  const setError = error => dispatch({ type: SET_ERROR, payload: error });

  return (
    <EpicContext.Provider
      value={{
        date: state.date,
        type: state.type,
        naturalMetadata: state.naturalMetadata,
        enhancedMetadata: state.enhancedMetadata,
        currentMetadata: state.currentMetadata,
        loading: state.loading,
        statusCode: state.statusCode,
        error: state.error,
        errorMessage: state.errorMessage,
        getMostRecentNatural,
        getMostRecentEnhanced,
        getNaturalByDate,
        getEnhancedByDate,
        setLoading,
        setType,
        setError,
      }}
    >
      {props.children}
    </EpicContext.Provider>
  );
};

export default EpicState;
