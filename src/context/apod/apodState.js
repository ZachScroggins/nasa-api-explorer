import { useReducer, useEffect } from 'react';
import ApodContext from './apodContext';
import ApodReducer from './apodReducer';
import { GET_APOD, SET_LOADING } from '../types';

const ApodState = props => {
  const initialState = {
    date: '',
    explanation: '',
    hdurl: '',
    mediaType: '',
    title: '',
    url: '',
    copyright: '',
    loading: true,
    statusCode: undefined,
  };
  const [state, dispatch] = useReducer(ApodReducer, initialState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      getApod();
    }
  }, []);

  const getApod = async () => {
    let res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&date=2002-03-04` // remove date
    );

    let data = await res.json();

    console.log(data.code === 500);

    setLoading();

    dispatch({ type: GET_APOD, payload: data });
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <ApodContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        date: state.date,
        explanation: state.explanation,
        hdurl: state.hdurl,
        mediaType: state.mediaType,
        title: state.title,
        url: state.url,
        copyright: state.copyright,
        statusCode: state.statusCode,
        getApod,
        setLoading,
      }}
    >
      {props.children}
    </ApodContext.Provider>
  );
};

export default ApodState;
