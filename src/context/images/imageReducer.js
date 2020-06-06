import {
  SET_QUERY,
  GET_RESULTS,
  SET_CURRENT,
  SET_LOADING,
  SET_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case GET_RESULTS:
      return {
        ...state,
        results: action.payload,
        loading: false,
        error: { status: false, message: '' },
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_ERROR:
      return {
        ...state,
        error: { status: true, message: action.payload },
        loading: false,
      };
    default:
      return state;
  }
};
