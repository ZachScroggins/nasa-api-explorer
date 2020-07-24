import { useReducer, useEffect } from 'react';
import EpicReducer from './epicReducer';
import EpicContext from './epicContext';
import { GET_APOD, SET_LOADING } from '../types';

const EpicState = props => {
  const initialState = {
    date: '',
    type: '',
    naturalMetadata: [],
    enhancedMetadata: [],
    loading: false,
    statusCode: undefined,
    error: null,
  };
  const [state, dispatch] = useReducer(EpicReducer, initialState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      getMostRecentNatural();
    }
  }, []);

  const getMostRecentNatural = async () => {
    let res = await fetch(
      `https://api.nasa.gov/EPIC/api/natural?api_key=${process.env.API_KEY}`
    );

    let data = await res.json();

    setLoading();

    dispatch({ type: GET_APOD, payload: data });
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <EpicContext.Provider
      value={{
        date: state.date,
        type: state.type,
        naturalMetadata: state.naturalMetadata,
        enhancedMetadata: state.enhancedMetadata,
        loading: state.loading,
        statusCode: state.statusCode,
        error: state.error,
        getMostRecentNatural,
        setLoading,
      }}
    >
      {props.children}
    </EpicContext.Provider>
  );
};

export default EpicState;
