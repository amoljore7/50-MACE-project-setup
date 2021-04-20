import { RESET_PASSWORD } from './types';

export interface userData {
  firstReset: boolean;
  password: string;
}
export interface userPasswordReturnType {
  type: string;
  payload: userData;
}

export const resetPassword: (user: userData) => userPasswordReturnType = (user: userData) => {
  return {
    type: RESET_PASSWORD,
    payload: user
  };
};
