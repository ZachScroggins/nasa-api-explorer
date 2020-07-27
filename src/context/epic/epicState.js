import { useReducer, useEffect } from 'react';
import EpicReducer from './epicReducer';
import EpicContext from './epicContext';
import {
  GET_MOST_RECENT_NATURAL_METADATA,
  GET_MOST_RECENT_ENHANCED_METADATA,
  SET_LOADING,
  SET_TYPE,
  SET_CURRENT_METADATA,
  GET_NATURAL_METADATA_BY_DATE,
  GET_ENHANCED_METADATA_BY_DATE,
} from '../types';

const EpicState = props => {
  const initialState = {
    date: '',
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

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     getMostRecentNatural();
  //   }
  // }, []);

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

    dispatch({ type: GET_MOST_RECENT_NATURAL_METADATA, payload: json });

    setType('natural');

    setLoading();
  };

  const getNaturalByDate = async date => {
    setLoading();

    const res = await fetch(`/api/epic/natural/date?q=${date}`);

    const json = await res.json();

    dispatch({ type: GET_NATURAL_METADATA_BY_DATE, payload: json });

    setType('natural');

    setLoading();
  };

  const getMostRecentEnhanced = async () => {
    setLoading();

    const res = await fetch('/api/epic/enhanced');

    const json = await res.json();

    dispatch({ type: GET_MOST_RECENT_ENHANCED_METADATA, payload: json });

    setType('enhanced');

    setLoading();
  };

  const getEnhancedByDate = async date => {
    setLoading();

    const res = await fetch(`/api/epic/enhanced/date?q=${date}`);

    const json = await res.json();

    dispatch({ type: GET_ENHANCED_METADATA_BY_DATE, payload: json });

    setType('enhanced');

    setLoading();
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

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
      }}
    >
      {props.children}
    </EpicContext.Provider>
  );
};

export default EpicState;
