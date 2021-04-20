import { DELETE_SAVED_SEARCH_FAIL, DELETE_SAVED_SEARCH_SUCCESS } from '../types';

export interface DefaultState {
  deleteSavedSearchError: any;
}

const defaultState: DefaultState = {
  deleteSavedSearchError: { error: '' }
};

interface actionType {
  type: string;
  payload: any;
}

export const deleteSavedSearchesReducer = (
  state: DefaultState = defaultState,
  action: actionType
): DefaultState => {
  switch (action.type) {
    case DELETE_SAVED_SEARCH_SUCCESS:
      return {
        ...state,
        deleteSavedSearchError: { ...action.payload.deletionError }
      };
    case DELETE_SAVED_SEARCH_FAIL:
      return {
        ...state,
        deleteSavedSearchError: { ...action.payload.deletionError }
      };
    default:
      return state;
  }
};
