import {
  call,
  CallEffectDescriptor,
  ForkEffect,
  put,
  PutEffect,
  takeEvery,
  SimpleEffect
} from 'redux-saga/effects';
import { AppConfig } from '../../config/app-config';
import Axios, { AxiosResponse } from 'axios';
import {
  RESET_PASSWORD_LOADING,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
} from './types';

interface payloadData {
  type: string;
  payload: {
    firstReset: boolean;
    password: string;
  };
}

interface resetPasswordResponseType {
  id: string;
  message: string;
  status: string;
  statusCode: string;
}

export function* changeUserPassword(
  payloadData: payloadData
): Generator<
  | PutEffect<{
      type: string;
    }>
  | Promise<resetPasswordResponseType>
> {
  yield put({ type: RESET_PASSWORD_LOADING });
  const id = window.location.href.split('?id=')[1];
  try {
    const response = (yield Axios.put(
      `${AppConfig.serverUrl}/users/updatePassword/${id}`,
      payloadData.payload
    )) as AxiosResponse<resetPasswordResponseType>;

    yield put({ type: RESET_PASSWORD_SUCCESS });

    if (response) {
      window.location.href = '/';
    }
  } catch (error) {
    yield put({ type: RESET_PASSWORD_FAIL, payload: error.message });
  }
}

export function* watchResetPassword(): Generator<ForkEffect<never> | string> {
  yield takeEvery(RESET_PASSWORD, changeUserPassword);
}
