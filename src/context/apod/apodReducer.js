import { GET_APOD, SET_LOADING } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_APOD:
      return {
        ...state,
        date: action.payload.date,
        explanation: action.payload.explanation,
        hdurl: action.payload.hdurl,
        mediaType: action.payload.media_type,
        title: action.payload.title,
        url: action.payload.url,
        copyright: action.payload.copyright,
        statusCode: action.payload.code,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
