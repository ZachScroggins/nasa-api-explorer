import {
  GET_MOST_RECENT_NATURAL_METADATA,
  GET_MOST_RECENT_ENHANCED_METADATA,
  SET_LOADING,
  SET_TYPE,
  GET_NATURAL_METADATA_BY_DATE,
  GET_ENHANCED_METADATA_BY_DATE,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_MOST_RECENT_NATURAL_METADATA:
      return {
        ...state,
        naturalMetadata: action.payload.data,
        currentMetadata: action.payload.data,
        error: action.payload.error.status,
        errorMessage: action.payload.error.message,
      };
    case GET_MOST_RECENT_ENHANCED_METADATA:
      return {
        ...state,
        enhancedMetadata: action.payload.data,
        currentMetadata: action.payload.data,
        error: action.payload.error.status,
        errorMessage: action.payload.error.message,
      };
    case GET_NATURAL_METADATA_BY_DATE:
      return {
        ...state,
        naturalMetadata: action.payload.data,
        currentMetadata: action.payload.data,
        error: action.payload.error.status,
        errorMessage: action.payload.error.message,
      };
    case GET_ENHANCED_METADATA_BY_DATE:
      return {
        ...state,
        enhancedMetadata: action.payload.data,
        currentMetadata: action.payload.data,
        error: action.payload.error.status,
        errorMessage: action.payload.error.message,
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
    default:
      return state;
  }
};
