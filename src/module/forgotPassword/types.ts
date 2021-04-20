export const LOADING = 'LOADING';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL';

export interface Loading {
  type: typeof LOADING;
}

export interface Forgot_Password {
  type: typeof FORGOT_PASSWORD;
}

export interface LoginSuccess {
  type: typeof FORGOT_PASSWORD_SUCCESS;
  payload: SuccessPayloadType;
}

export type SuccessPayloadType = {
  email: string;
};

export interface LoginFail {
  type: typeof FORGOT_PASSWORD_FAIL;
  payload: string;
}

export type LoginDispatch = Loading | Forgot_Password | LoginSuccess | LoginFail;
