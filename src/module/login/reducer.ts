import { getCurrentUser } from '../../utils/local-storage';
import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_FAIL } from './types';

export interface DefaultState {
  loading: boolean;
  currentUser: string;
  error: string;
}

const defaultState: DefaultState = {
  loading: false,
  currentUser: '',
  error: ''
};

interface actionType {
  type: string;
  payload: string;
}

const currentUser = getCurrentUser();

export const login = (state: DefaultState = defaultState, action: actionType): DefaultState => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: currentUser,
        error: ''
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
