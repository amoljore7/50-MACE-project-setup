import {
  ADDRESS_SUGGESTION_LOADING,
  ADDRESS_SUGGESTION_SUCCESS,
  ADDRESS_SUGGESTION_FAIL
} from '../types';

export interface DefaultState {
  addressesLoading: boolean;
  addresses: string[];
  error: string;
}

const defaultState: DefaultState = {
  addressesLoading: false,
  addresses: [],
  error: ''
};

interface actionType {
  type: string;
  payload: any;
}

export const addressSuggestionReducer = (
  state: DefaultState = defaultState,
  action: actionType
): DefaultState => {
  switch (action.type) {
    case ADDRESS_SUGGESTION_LOADING:
      return {
        ...state,
        addressesLoading: true
      };
    case ADDRESS_SUGGESTION_SUCCESS:
      return {
        ...state,
        addressesLoading: false,
        addresses: action.payload,
        error: ''
      };
    case ADDRESS_SUGGESTION_FAIL:
      return {
        ...state,
        addressesLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
