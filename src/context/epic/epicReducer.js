import {
  GET_MOST_RECENT_NATURAL_METADATA,
  GET_MOST_RECENT_ENHANCED_METADATA,
  SET_LOADING,
  SET_TYPE,
  SET_ERROR,
  GET_NATURAL_METADATA_BY_DATE,
  GET_ENHANCED_METADATA_BY_DATE,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_MOST_RECENT_NATURAL_METADATA:
      return {
        ...state,
        naturalMetadata: action.payload.json.data,
        currentMetadata: action.payload.json.data,
        error: action.payload.json.error.status,
        errorMessage: action.payload.json.error.message,
        date: action.payload.currentDate,
        type: 'natural',
      };
    case GET_MOST_RECENT_ENHANCED_METADATA:
      return {
        ...state,
        enhancedMetadata: action.payload.json.data,
        currentMetadata: action.payload.json.data,
        error: action.payload.json.error.status,
        errorMessage: action.payload.json.error.message,
        date: action.payload.currentDate,
        type: 'enhanced',
      };
    case GET_NATURAL_METADATA_BY_DATE:
      return {
        ...state,
        naturalMetadata: action.payload.json.data,
        currentMetadata: action.payload.json.data,
        error: action.payload.json.error.status,
        errorMessage: action.payload.json.error.message,
        date: action.payload.currentDate,
        type: 'natural',
      };
    case GET_ENHANCED_METADATA_BY_DATE:
      return {
        ...state,
        enhancedMetadata: action.payload.json.data,
        currentMetadata: action.payload.json.data,
        error: action.payload.json.error.status,
        errorMessage: action.payload.json.error.message,
        date: action.payload.currentDate,
        type: 'enhanced',
      };
    case SET_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case SET_TYPE:
      return {
        ...state,
        type: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload.status,
        errorMessage: action.payload.message,
      };
    default:
      return state;
  }
};
