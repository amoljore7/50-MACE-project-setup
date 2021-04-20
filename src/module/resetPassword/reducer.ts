import { RESET_PASSWORD_LOADING, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL } from './types';

export interface DefaultState {
  loading: boolean;
  error?: string;
}

const defaultState: DefaultState = {
  loading: false,
  error: ''
};

interface actionType {
  type: string;
  payload: string;
}

export const resetPassword = (
  state: DefaultState = defaultState,
  action: actionType
): DefaultState => {
  switch (action.type) {
    case RESET_PASSWORD_LOADING:
      return {
        ...state,
        loading: true
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: ''
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
