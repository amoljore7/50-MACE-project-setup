export const RESET_PASSWORD_LOADING = 'RESET_PASSWORD_LOADING';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAIL = 'RESET_PASSWORD_FAIL';

export interface Loading {
  type: typeof RESET_PASSWORD_LOADING;
}
export interface Reset_Password {
  type: typeof RESET_PASSWORD;
}

export interface LoginSuccess {
  type: typeof RESET_PASSWORD_SUCCESS;
  payload: SuccessPayloadType;
}

export type SuccessPayloadType = {
  email: string;
};

export interface LoginFail {
  type: typeof RESET_PASSWORD_FAIL;
  payload: string;
}

export type LoginDispatch = Loading | Reset_Password | LoginSuccess | LoginFail;
