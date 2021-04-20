import { SAVE_STACK, UPDATE_STACK } from '../../types';

export interface userData {
  username: string;
  password: string;
}
export interface userLoginReturnType {
  type: string;
  payload: userData;
}

export const stackGenerateLink: (user: userData) => userLoginReturnType = (payload: userData) => {
  return {
    type: SAVE_STACK,
    payload: payload
  };
};

export const updateStackData: (user: userData) => userLoginReturnType = (payload: userData) => {
  return {
    type: UPDATE_STACK,
    payload: payload
  };
};
