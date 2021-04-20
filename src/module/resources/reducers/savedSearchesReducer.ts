import {
  GET_SAVED_SEARCHES_FAIL,
  GET_SAVED_SEARCHES_LOADING,
  GET_SAVED_SEARCHES_SUCCESS
} from '../types';

export interface DefaultState {
  savedSearchesLoading: boolean;
  savedSearchesList: any;
  error: string;
}

const defaultState: DefaultState = {
  savedSearchesLoading: false,
  savedSearchesList: [],
  error: ''
};

interface payload {
  savedSearchesList: any[];
  error: string;
}

interface actionType {
  type: string;
  payload: payload;
}

export const getSavedSearchesReducer = (
  state: DefaultState = defaultState,
  action: actionType
): DefaultState => {
  switch (action.type) {
    case GET_SAVED_SEARCHES_LOADING:
      return {
        ...state,
        savedSearchesLoading: true
      };
    case GET_SAVED_SEARCHES_SUCCESS:
      return {
        ...state,
        savedSearchesLoading: false,
        savedSearchesList: action.payload,
        error: 'NoError'
      };
    case GET_SAVED_SEARCHES_FAIL:
      return {
        ...state,
        savedSearchesLoading: false,
        savedSearchesList: [],
        error: 'Error'
      };
    default:
      return state;
  }
};
