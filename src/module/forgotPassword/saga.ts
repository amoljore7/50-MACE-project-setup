import {
  call,
  CallEffectDescriptor,
  ForkEffect,
  put,
  PutEffect,
  SimpleEffect,
  takeEvery
} from 'redux-saga/effects';
import Axios, { AxiosResponse } from 'axios';
import { AppConfig } from '../../config/app-config';
import { FORGOT_PASSWORD, LOADING, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL } from './types';

interface payloadData {
  type: string;
  payload: {
    email: string;
  };
}

interface forgotUserPasswordResponseType {
  id: string;
  message: string;
  status: string;
  statusCode: string;
}

export function* forgotUserPassword(
  payloadData: payloadData
): Generator<
  | SimpleEffect<'CALL', CallEffectDescriptor<unknown>>
  | PutEffect<{
      type: string;
    }>
  | Promise<forgotUserPasswordResponseType>
> {
  yield put({ type: LOADING });

  try {
    const response = (yield call(
      Axios.post,
      `${AppConfig.serverUrl}/users/forgotPassword`,
      payloadData.payload
    )) as AxiosResponse<forgotUserPasswordResponseType>;

    yield put({ type: FORGOT_PASSWORD_SUCCESS });

    if (response) {
      window.location.href = '/';
    }
  } catch (error) {
    yield put({ type: FORGOT_PASSWORD_FAIL, payload: error.message });
  }
}

export function* watchForgotPassword(): Generator<ForkEffect<never> | string> {
  yield takeEvery(FORGOT_PASSWORD, forgotUserPassword);
}
