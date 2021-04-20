import {
  call,
  CallEffectDescriptor,
  ForkEffect,
  put,
  PutEffect,
  SimpleEffect,
  takeLatest
} from 'redux-saga/effects';
import Axios from '../../config/axios';
import jwtDecode from 'jwt-decode';
import {
  SITES_AND_CATEGORIES,
  SITES_AND_CATEGORIES_LOADING,
  SITES_AND_CATEGORIES_SUCCESS,
  SITES_AND_CATEGORIES_FAIL,
  ADDRESS_SUGGESTION,
  ADDRESS_SUGGESTION_LOADING,
  ADDRESS_SUGGESTION_SUCCESS,
  ADDRESS_SUGGESTION_FAIL,
  NEAR_BY_RESOURCES,
  NEAR_BY_RESOURCES_LOADING,
  NEAR_BY_RESOURCES_SUCCESS,
  SAVE_SITE_AND_RESOURCE_CATEGORY,
  NEAR_BY_RESOURCES_FAIL,
  DELETE_RESOURCE,
  DELETE_RESOURCE_SUCCESS,
  DELETE_RESOURCE_FAIL,
  INSURANCE_AND_DISTANCE,
  INSURANCE_AND_DISTANCE_FAIL,
  INSURANCE_AND_DISTANCE_LOADING,
  INSURANCE_AND_DISTANCE_SUCCESS,
  SAVE_SEARCH_RESOURCES,
  SAVE_SEARCH_RESOURCES_FAIL,
  SAVE_SEARCH_RESOURCES_SUCCESS,
  SAVE_SEARCH_RESOURCES_LOADING,
  GET_SAVED_SEARCHES,
  GET_SAVED_SEARCHES_FAIL,
  GET_SAVED_SEARCHES_LOADING,
  GET_SAVED_SEARCHES_SUCCESS,
  UPDATE_SAVE_SEARCH,
  UPDATE_SAVE_SEARCH_LOADING,
  DELETE_SAVED_SEARCH_FAIL,
  DELETE_SAVED_SEARCH_SUCCESS
} from './types';
import { AppConfig } from '../../config/app-config';
import { nearByResourcesPayload } from './component/resources';
import { notification } from 'antd';
import { AxiosResponse } from 'axios';
import { catergoryItem, sitesItem } from './reducers/sitesAndCategoriesReducer';

export type nearByResource = {
  address: string;
  addrsId: number;
  distance: number;
  lat: number;
  lng: number;
  name: string;
  nearbyId: number;
  resourceId: number;
  resourceType: string;
  status: string;
  travellingTime: string;
};

export type latLngForPatientAddress = { address: string; lat: string; lng: string };

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
export function* getAllSavedSearches(): Generator<
  | SimpleEffect<'CALL', CallEffectDescriptor<unknown>>
  | PutEffect<{
      type: string;
    }>
  | Promise<any>,
  void,
  unknown
> {
  const token: any = localStorage.getItem('accessToken');
  const { userId }: any = jwtDecode(token);

  yield put({ type: GET_SAVED_SEARCHES_LOADING });
  try {
    const response = (yield call(Axios.get, `${AppConfig.serverUrl}/saveSearches/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })) as AxiosResponse<any>;
    const responseData = response.data;

    yield put({ type: GET_SAVED_SEARCHES_SUCCESS, payload: responseData });
  } catch (error) {
    yield put({
      type: GET_SAVED_SEARCHES_FAIL,
      payload: error
    });
  }
}

export function* InsuranceAndDistance(): Generator<
  | SimpleEffect<'CALL', CallEffectDescriptor<unknown>>
  | PutEffect<{
      type: string;
    }>
  | Promise<any>,
  void,
  unknown
> {
  yield put({ type: INSURANCE_AND_DISTANCE_LOADING });
  const responsePayload: {
    insuranceList: any;
    distanceList: any;
    error: string;
  } = { insuranceList: [], distanceList: [], error: '' };
  try {
    const response = (yield call(Axios.get, `${AppConfig.serverUrl}/filters`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })) as AxiosResponse<sitesAndCategoriesResponse>;
    const responseData: any = response.data;

    for (let i = 0; i < responseData.length; i++) {
      if (responseData[i].filterName === 'insuranceType') {
        responsePayload.insuranceList = [...responseData[i].values];
      } else if (responseData[i].filterName === 'maxDistance') {
        responsePayload.distanceList = [...responseData[i].values];
      }
    }
    yield put({ type: INSURANCE_AND_DISTANCE_SUCCESS, payload: responsePayload });
  } catch (error) {
    yield put({
      type: INSURANCE_AND_DISTANCE_FAIL,
      payload: { ...responsePayload, error: error.message }
    });
  }
}

export type nearByResourcesResponse = {
  // latLngForPatientAddress: latLngForPatientAddress;
  nearByResourceAndFieldsDTO: any[];
  patientLocation: any;
};

export function* nearByResources({
  payload
}: {
  type: string;
  payload: nearByResourcesPayload;
}): Generator<
  | SimpleEffect<'CALL', CallEffectDescriptor<unknown>>
  | PutEffect<{
      type: string;
    }>
  | Promise<nearByResourcesResponse>
> {
  yield put({ type: NEAR_BY_RESOURCES_LOADING });
  const responsePayload = {
    nearByResources: [],
    latLngForPatientAddress: {
      address: '',
      lat: '',
      lng: ''
    },
    resources_fields: [],
    error: ''
  };
  try {
    const response = (yield call(Axios.post, `${AppConfig.serverUrl}/getNearByResources`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })) as AxiosResponse<nearByResourcesResponse>;
    const responseData: nearByResourcesResponse = response.data;
    yield put({
      type: NEAR_BY_RESOURCES_SUCCESS,
      payload: {
        // ...responsePayload,
        ...responseData
      }
    });
    const message =
      responseData.nearByResourceAndFieldsDTO === null ||
      responseData.nearByResourceAndFieldsDTO.length === 0
        ? 'No Resources Found'
        : 'Resources fetched Successfully';
    notification.success({
      message: message,
      duration: 3,
      type: 'success'
    });
    yield put({
      type: SAVE_SITE_AND_RESOURCE_CATEGORY,
      payload: {
        ...responsePayload,
        ...responseData,
        resource: payload.nearByResourceFilters.resourceType,
        address: payload.address
      }
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: NEAR_BY_RESOURCES_FAIL,
      payload: { ...responsePayload, error: error.message }
    });
    notification.error({
      message: 'Resources could not be fetched Successfully !',
      duration: 5,
      type: 'error'
    });
  }
}

export function* saveSearchResources({
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
  yield put({ type: SAVE_SEARCH_RESOURCES_LOADING });

  try {
    const response = (yield call(Axios.post, `${AppConfig.serverUrl}/saveSearches/`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })) as AxiosResponse<any>;
    const responseData: any = response.data;

    notification.success({
      message: 'Saved search  created successfully',
      duration: 3,
      type: 'success'
    });
  } catch (error) {
    notification.error({
      message: 'Resources could not be saved Successfully !',
      duration: 5,
      type: 'error'
    });
  }
}

export function* updateSavedSearch({
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
  yield put({ type: UPDATE_SAVE_SEARCH_LOADING });
  try {
    const response = (yield call(Axios.put, `${AppConfig.serverUrl}/saveSearches/`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })) as AxiosResponse<any>;
    const responseData: any = response.data;

    notification.success({
      message: 'Saved search updated successfully',
      duration: 3,
      type: 'success'
    });
  } catch (error) {
    notification.error({
      message: 'Saved search could not be updated Successfully !',
      duration: 5,
      type: 'error'
    });
  }
}

interface deleteResourceResponse {
  id: string;
  message: string;
  status: string;
  statusCode: string;
}

export function* deleteResource({
  payload
}: {
  type: string;
  payload: { id: number; resourceTypeForDeletion: string };
}): Generator<
  | SimpleEffect<'CALL', CallEffectDescriptor<unknown>>
  | PutEffect<{
      type: string;
    }>
  | Promise<deleteResourceResponse>
> {
  try {
    yield call(Axios.delete, `${AppConfig.serverUrl}/resources/${payload.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    yield put({
      type: DELETE_RESOURCE_SUCCESS,
      payload: {
        resourceIdToBeDeleted: payload.id,
        resourceTypeForDeletion: payload.resourceTypeForDeletion,
        deletionError: { error: 'NoError' }
      }
    });
    notification.success({
      message: 'Resource deleted Successfully',
      duration: 3,
      type: 'success'
    });
  } catch (error) {
    yield put({
      type: DELETE_RESOURCE_FAIL,
      payload: { resourceIdToBeDeleted: '', deletionError: { error: error.message } }
    });
    notification.error({
      message: error.message,
      description: 'Resource could not be deleted Successfully',
      duration: 5,
      type: 'error'
    });
  }
}

export function* deleteSavedSearch({
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
  try {
    yield call(Axios.delete, `${AppConfig.serverUrl}/saveSearches/${payload}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });

    yield put({
      type: DELETE_SAVED_SEARCH_SUCCESS,
      payload: {
        deletionError: { error: 'NoError' }
      }
    });

    notification.success({
      message: 'Saved search deleted successfully',
      duration: 3,
      type: 'success'
    });
  } catch (error) {
    yield put({
      type: DELETE_SAVED_SEARCH_FAIL,
      payload: {
        deletionError: { error: 'Error' }
      }
    });

    notification.error({
      message: 'Saved search could not be deleted Successfully !',
      duration: 5,
      type: 'error'
    });
  }
}

export function* saveToFavouriteResources({
  payload
}: {
  type: string;
  payload: { nearById: number; userId: string };
}): Generator<
  | SimpleEffect<'CALL', CallEffectDescriptor<unknown>>
  | PutEffect<{
      type: string;
    }>
  // | Promise<deleteResourceResponse>
> {
  try {
    yield call(Axios.post, `${AppConfig.serverUrl}/fav/save`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    yield put({
      type: 'SAVE_TO_FAVOURITE_SUCCESS',
      payload: {
        saveToFavouritesError: { error: 'NoError' }
      }
    });
    notification.success({
      message: 'Resource added to Favourites list',
      duration: 3,
      type: 'success'
    });
  } catch (error) {
    yield put({
      type: 'SAVE_TO_FAVOURITE_FAIL',
      payload: {
        saveToFavouritesError: { error: error.message }
      }
    });
    notification.error({
      // message: error.message,
      message: 'Resource could not be added to Favourites list',
      duration: 5,
      type: 'error'
    });
  }
}

export function* deleteFromFavouriteResources({
  payload
}: {
  type: string;
  payload: { nearById: number; userId: string };
}): Generator<
  | SimpleEffect<'CALL', CallEffectDescriptor<unknown>>
  | PutEffect<{
      type: string;
    }>
  | Promise<deleteResourceResponse>
> {
  try {
    yield call(
      Axios.delete,
      `${AppConfig.serverUrl}/fav/unlike/${payload.nearById}/${payload.userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }
    );
    yield put({
      type: 'DELETE_FROM_FAVOURITES_SUCCESS',
      payload: {
        deleteFromFavouritesError: { error: 'NoError' }
      }
    });
    notification.success({
      message: 'Resource deleted from Favourites list Successfully',
      duration: 3,
      type: 'success'
    });
  } catch (error) {
    yield put({
      type: 'DELETE_FROM_FAVOURITES_FAIL',
      payload: {
        deleteFromFavouritesError: { error: error.message }
      }
    });
    notification.error({
      // message: error.message,
      message: 'Resource could not be deleted From Favourites list Successfully',
      duration: 3,
      type: 'error'
    });
  }
}

export function* switchToStackView(): Generator<PutEffect<{ type: string }>, any, undefined> {
  yield put({ type: 'SWITCH_TO_STACK' });
}

export function* watchSitesAndCategories(): Generator<ForkEffect<never> | string> {
  yield takeLatest(SITES_AND_CATEGORIES, sitesAndCategories);
}

export function* watchGetAllSavedSearches(): Generator<ForkEffect<never> | string> {
  yield takeLatest(GET_SAVED_SEARCHES, getAllSavedSearches);
}

export function* watchInsuranceAndDistance(): Generator<ForkEffect<never> | string> {
  yield takeLatest(INSURANCE_AND_DISTANCE, InsuranceAndDistance);
}

export function* watchDeleteResource(): Generator<ForkEffect<never> | string> {
  yield takeLatest(DELETE_RESOURCE, deleteResource);
}
export function* watchDeleteSavedSearch(): Generator<ForkEffect<never> | string> {
  yield takeLatest('DELETE_SAVED_SEARCH', deleteSavedSearch);
}
export function* watchNearByResources(): Generator<ForkEffect<never> | string> {
  yield takeLatest(NEAR_BY_RESOURCES, nearByResources);
}

export function* watchSaveSearchResources(): Generator<ForkEffect<never> | string> {
  yield takeLatest(SAVE_SEARCH_RESOURCES, saveSearchResources);
}

export function* watchUpdateSaveSearch(): Generator<ForkEffect<never> | string> {
  yield takeLatest(UPDATE_SAVE_SEARCH, updateSavedSearch);
}

export function* watchSwitchToStackView(): Generator<ForkEffect<never> | string> {
  yield takeLatest('SWITCH_TO_STACK', switchToStackView);
}

export function* watchSaveToFavoriteResources(): Generator<ForkEffect<never> | string> {
  yield takeLatest('SAVE_TO_FAVOURITE_RESOURCES', saveToFavouriteResources);
}

export function* watchDeleteFromFavouriteResources(): Generator<ForkEffect<never> | string> {
  yield takeLatest('DELETE_FROM_FAVOURITE_RESOURCES', deleteFromFavouriteResources);
}
