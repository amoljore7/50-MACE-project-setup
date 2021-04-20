export const LOGIN_LOADING = 'LOGIN_LOADING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN = 'LOGIN';

export interface LoginLoading {
  type: typeof LOGIN_LOADING;
}
export interface Login {
  type: typeof LOGIN;
}

export interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: LoginSuccessPayloadType;
}

export type LoginSuccessPayloadType = {
  userName: string;
  password: string;
};

export interface LoginFail {
  type: typeof LOGIN_FAIL;
  payload: string;
}

export type LoginDispatch = LoginLoading | LoginSuccess | LoginFail | Login;
