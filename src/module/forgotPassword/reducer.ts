import { LOADING, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL } from './types';

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

export const forgotPassword = (
  state: DefaultState = defaultState,
  action: actionType
): DefaultState => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: ''
      };
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
