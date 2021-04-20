import { FORGOT_PASSWORD } from './types';

export interface userData {
  email: string;
}
export interface userPasswordReturnType {
  type: string;
  payload: userData;
}

export const forgotPassword: (user: userData) => userPasswordReturnType = (user: userData) => {
  return {
    type: FORGOT_PASSWORD,
    payload: user
  };
};
