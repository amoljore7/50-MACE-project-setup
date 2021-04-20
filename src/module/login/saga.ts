import {
  call,
  CallEffectDescriptor,
  ForkEffect,
  put,
  PutEffect,
  SimpleEffect,
  takeLatest
} from 'redux-saga/effects';
import Axios, { AxiosResponse } from 'axios';
import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN } from './types';
import { AppConfig } from '../../config/app-config';

interface payloadData {
  type: string;
  payload: {
    username: string;
    password: string;
  };
}

interface loginResponseType {
  accessToken: string;
  tokenType: string;
}

export function* userLogin(
  payloadData: payloadData
): Generator<
  | SimpleEffect<'CALL', CallEffectDescriptor<unknown>>
  | PutEffect<{
      type: string;
    }>
  | Promise<loginResponseType>
> {
  yield put({ type: LOGIN_LOADING });
  try {
    const response = (yield call(
      Axios.post,
      `${AppConfig.serverUrl}/auth`,
      payloadData.payload
    )) as AxiosResponse<loginResponseType>;
    const responseData: loginResponseType = response.data;
    const user = {
      currentUser: payloadData.payload.username
    };
    localStorage.setItem('currentUser', JSON.stringify(user.currentUser));
    localStorage.setItem('accessToken', responseData.accessToken);

    yield put({ type: LOGIN_SUCCESS, payload: user.currentUser });
  } catch (error) {
    yield put({ type: LOGIN_FAIL, payload: error.message });
  }
}

export function* watchLogin(): Generator<ForkEffect<never> | string> {
  yield takeLatest(LOGIN, userLogin);
}
