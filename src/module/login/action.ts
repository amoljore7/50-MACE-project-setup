import { LOGIN } from './types';

export interface userData {
  username: string;
  password: string;
}
export interface userLoginReturnType {
  type: string;
  payload: userData;
}

export const userLogin: (user: userData) => userLoginReturnType = (user: userData) => {
  return {
    type: LOGIN,
    payload: user
  };
};
