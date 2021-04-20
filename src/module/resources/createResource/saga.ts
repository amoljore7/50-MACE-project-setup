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
  ADD_RESOURCE_SUCCESS,
  ADD_RESOURCE_FAIL,
  GET_RESOURCE_FIELDS_SUCCESS,
  GET_RESOURCE_FIELDS_FAIL,
  GET_RESOURCE_FIELDS_LOADING,
  SITES_AND_CATEGORIES,
  SITES_AND_CATEGORIES_LOADING,
  SITES_AND_CATEGORIES_SUCCESS,
  SITES_AND_CATEGORIES_FAIL
} from './types';
import { AppConfig } from '../../../config/app-config';
import Axios from '../../../config/axios';
import { history } from '../../../App';
import { notification } from 'antd';
import 'antd/dist/antd.css';
import { AxiosResponse } from 'axios';

import { catergoryItem, sitesItem } from '../reducers/sitesAndCategoriesReducer';

interface addResourceResponse {
  id: string;
  message: string;
  status: string;
  statusCode: string;
}

export function* addResource({
  payload
}: {
  type: string;
  payload: any;
}): Generator<
  | SimpleEffect<'CALL', CallEffectDescriptor<unknown>>
  | PutEffect<{
      type: string;
    }>
  | Promise<addResourceResponse>
> {
  try {
    yield call(Axios.post, `${AppConfig.serverUrl}/resources`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    yield put({ type: ADD_RESOURCE_SUCCESS });
    notification.open({
      message: 'Resource Created Successfully',
      duration: 3,
      type: 'success'
    });
    history.goBack();
  } catch (error) {
    yield put({ type: ADD_RESOURCE_FAIL, payload: error.message });
    history.goBack();
    notification.open({
      message: 'Resource could not be created something went wrong',
      duration: 5,
      type: 'error'
    });
  }
}

export interface locationAndSitesItemType {
  locationName: string;
  sites: string[];
}

interface getResourceFieldsResponseType {
  fields: string[];
  locationAndSites: locationAndSitesItemType[];
  resource: string;
  spId: number;
  uiFields: string[];
}

export function* getResourceFields({
  payload
}: {
  type: string;
  payload: string;
}): Generator<
  | SimpleEffect<'CALL', CallEffectDescriptor<unknown>>
  | PutEffect<{
      type: string;
    }>
  | Promise<getResourceFieldsResponseType>
> {
  yield put({ type: GET_RESOURCE_FIELDS_LOADING });
  try {
    const response = (yield call(
      Axios.get,
      `${AppConfig.serverUrl}/resourceFieldMap/getByResourceName?resourceName=${payload}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }
    )) as AxiosResponse<getResourceFieldsResponseType>;
    const responseData: getResourceFieldsResponseType = response.data;
    const payload_1: {
      spId: any;
      fields: any;
      uiFields: string[];
      temp_array: any;
      locationAndSites: locationAndSitesItemType[];
    } = { spId: '', fields: [], uiFields: [], temp_array: [], locationAndSites: [] };

    const arr_1 = responseData.fields;
    const arr_2 = responseData.uiFields;
    const temp_array = [];
    for (let i = 0; i < arr_1.length; i++) {
      for (let j = 0; j < arr_2.length; j++) {
        if (i == j) {
          temp_array.push({ key: arr_1[i], label: arr_2[j] });
        }
      }
    }

    payload_1.locationAndSites = responseData.locationAndSites;
    payload_1.fields = temp_array;
    payload_1.uiFields = responseData.uiFields;
    payload_1.spId = responseData.spId;

    yield put({ type: GET_RESOURCE_FIELDS_SUCCESS, payload: { ...payload_1 } });
  } catch (error) {
    yield put({ type: GET_RESOURCE_FIELDS_FAIL, payload: { resourceFieldsError: error.message } });
  }
}

interface sitesAndCategoriesResponse {
  categoryList: catergoryItem[];
  sitesList: sitesItem[];
}

export function* sitesAndCategories(): Generator<
  | SimpleEffect<'CALL', CallEffectDescriptor<unknown>>
  | PutEffect<{
      type: string;
    }>
  | Promise<sitesAndCategoriesResponse>,
  void,
  unknown
> {
  yield put({ type: SITES_AND_CATEGORIES_LOADING });
  const responsePayload: {
    sitesList: sitesItem[];
    categoryList: catergoryItem[];
    error: string;
  } = { sitesList: [], categoryList: [], error: '' };
  try {
    const response = (yield call(Axios.get, `${AppConfig.serverUrl}/getAllSitesAndCategories`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })) as AxiosResponse<sitesAndCategoriesResponse>;
    const responseData = response.data;
    responsePayload.sitesList = responseData.sitesList;
    responsePayload.categoryList = responseData.categoryList;

    yield put({ type: SITES_AND_CATEGORIES_SUCCESS, payload: responsePayload });
  } catch (error) {
    yield put({
      type: SITES_AND_CATEGORIES_FAIL,
      payload: { ...responsePayload, error: error.message }
    });
  }
}

export function* watchAddResource(): Generator<ForkEffect<never> | string> {
  yield takeLatest('ADD_RESOURCE', addResource);
}
export function* watchResourceFields(): Generator<ForkEffect<never> | string> {
  yield takeLatest('RESOURCE_FIELDS', getResourceFields);
}

export function* watchSitesAndCategories(): Generator<ForkEffect<never> | string> {
  yield takeLatest(SITES_AND_CATEGORIES, sitesAndCategories);
}
