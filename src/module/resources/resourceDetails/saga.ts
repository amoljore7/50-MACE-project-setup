import {
  call,
  CallEffectDescriptor,
  ForkEffect,
  put,
  PutEffect,
  SimpleEffect,
  takeLatest
} from 'redux-saga/effects';
import {
  RESOURCE_LOADING,
  RESOURCE_SUCCESS,
  RESOURCE_FAIL,
  SAVE_STACK,
  SAVE_STACK_SUCCESS,
  SAVE_STACK_LOADING,
  SAVE_STACK_FAIL,
  UPDATE_STACK,
  UPDATE_STACK_FAIL,
  UPDATE_STACK_LOADING,
  UPDATE_STACK_SUCCESS
} from './types';
import { AppConfig } from '../../../config/app-config';
import Axios from '../../../config/axios';
import { notification } from 'antd';
import { AxiosResponse } from 'axios';
/* eslint-disable  @typescript-eslint/no-explicit-any */

export function* resourceDetails({
  payload
}: {
  type: string;
  payload: { id: string | undefined };
}): Generator<
  | SimpleEffect<'CALL', CallEffectDescriptor<unknown>>
  | PutEffect<{
      type: string;
    }>
  | Promise<any>,
  void,
  unknown
> {
  yield put({ type: RESOURCE_LOADING });
  try {
    const response: any = yield call(Axios.get, `${AppConfig.serverUrl}/resources/${payload.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    let responseData: any = response.data;
    let uiFields: any = response.data;

    responseData = responseData.resource;
    uiFields = uiFields.uiFields;

    const columnNameArray = uiFields;
    const columnTypeArray = Object.keys(responseData);
    const columnValuesArray = Object.values(responseData);
    const tempArray = [];

    // console.log('>>>>1>> ', columnTypeArray);
    // console.log('>>>>2>> ', columnValuesArray);
    // console.log('>>>>3>> ', columnNameArray);

    if (columnNameArray.length == columnTypeArray.length) {
      if (columnTypeArray.length == columnValuesArray.length) {
        for (let i = 0; i < columnTypeArray.length; i++) {
          if (columnTypeArray[i] !== 'resourceId') {
            tempArray.push({
              columnType: columnTypeArray[i],
              columnName: columnNameArray[i],
              columnValue: columnValuesArray[i]
            });
          }
        }
      }
    }

    delete responseData['spId'];
    delete responseData['siteId'];
    // delete responseData['resourceId'];
    delete responseData['status'];
    delete responseData['lat'];
    delete responseData['lng'];

    yield put({
      type: RESOURCE_SUCCESS,
      payload: { responseData: responseData, uiFields: tempArray }
    });
  } catch (error) {
    yield put({ type: RESOURCE_FAIL, payload: error.message });
  }
}

export function* watchResource(): Generator<ForkEffect<never> | string> {
  console.log('resource details watcher');
  yield takeLatest('RESOURCE_DETAILS', resourceDetails);
}

export function* saveResourceDetails({
  payload
}: {
  type: string;
  payload: { id: string | undefined; resourceDetails: any };
}): Generator<
  | SimpleEffect<'CALL', CallEffectDescriptor<unknown>>
  | PutEffect<{
      type: string;
    }>
  | Promise<any>,
  void,
  unknown
> {
  // yield put({ type: SAVE_RESOURCE_DETAILS_LOADING });
  try {
    const response: any = yield call(
      Axios.put,
      `${AppConfig.serverUrl}/resources/${payload.id}`,
      payload.resourceDetails,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }
    );
    const responseData: any = response.data;
    notification.success({
      message: 'Resource edited Successfully',
      duration: 3
    });

    yield put({
      type: 'SAVE_RESOURCE_DETAILS_SUCCESS',
      payload: { id: responseData.id, saveError: { error: 'NoError' } }
    });
  } catch (error) {
    notification.error({
      message: error.message,
      description: 'Resource could not edited Successfully',
      duration: 3
    });
    yield put({
      type: 'SAVE_RESOURCE_DETAILS_FAIL',
      payload: { saveError: { error: error.message } }
    });
  }
}

export function* saveStack({
  payload
}: {
  type: string;
  payload: any;
}): Generator<
  | SimpleEffect<'CALL', CallEffectDescriptor<unknown>>
  | PutEffect<{
      type: string;
    }>
  | Promise<any>
> {
  yield put({ type: SAVE_STACK_LOADING });
  try {
    const response = (yield call(Axios.post, `${AppConfig.serverUrl}/stack/`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })) as AxiosResponse<any>;
    const responseData: any = response.data;
    const ID = parseInt(responseData.id);
    yield put({
      type: SAVE_STACK_SUCCESS,
      payload: { id: ID }
    });

    notification.success({
      message: 'Stack Saved successfully',
      duration: 3,
      type: 'success'
    });
  } catch (error) {
    yield put({
      type: SAVE_STACK_FAIL
    });
    notification.success({
      message: 'Stack Not Saved successfully',
      duration: 3,
      type: 'error'
    });
  }
}
export function* updateStack({
  payload
}: {
  type: string;
  payload: any;
}): Generator<
  | SimpleEffect<'CALL', CallEffectDescriptor<unknown>>
  | PutEffect<{
      type: string;
    }>
  | Promise<any>
> {
  yield put({ type: UPDATE_STACK_LOADING });
  try {
    const response = (yield call(
      Axios.put,
      `${AppConfig.serverUrl}/stack/${payload.id}`,
      payload.stackResourceData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }
    )) as AxiosResponse<any>;
    const responseData: any = response.data;
    yield put({
      type: UPDATE_STACK_SUCCESS
    });

    notification.success({
      message: 'Stack Updated successfully',
      duration: 3,
      type: 'success'
    });
  } catch (error) {
    yield put({
      type: UPDATE_STACK_FAIL
    });
    notification.success({
      message: 'Stack Not Updated successfully',
      duration: 3,
      type: 'error'
    });
  }
}

export function* watchSaveResourceDetails(): Generator<ForkEffect<never> | string> {
  yield takeLatest('SAVE_RESOURCE_DETAILS', saveResourceDetails);
}
export function* watchSaveStack(): Generator<ForkEffect<never> | string> {
  yield takeLatest(SAVE_STACK, saveStack);
}
export function* watchUpdateStack(): Generator<ForkEffect<never> | string> {
  yield takeLatest(UPDATE_STACK, updateStack);
}
