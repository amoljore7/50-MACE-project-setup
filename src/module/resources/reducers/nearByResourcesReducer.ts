import {
  NEAR_BY_RESOURCES_LOADING,
  NEAR_BY_RESOURCES_SUCCESS,
  NEAR_BY_RESOURCES_FAIL,
  DELETE_RESOURCE_SUCCESS,
  DELETE_RESOURCE_FAIL
} from '../types';
import { nearByResource, latLngForPatientAddress } from '../saga';
import { AnyMxRecord } from 'dns';
import { nearByResourceAndFieldsItemType } from '../component/resources';

export const noErrorMessage = 'No Error';

export interface DefaultState {
  nearByResourcesLoading: boolean;
  nearByResourceAndFieldsDTO: nearByResourceAndFieldsItemType[];
  latLngForPatientAddress: any;
  addressInput: string;
  resourceInput: string;
  siteInput: string;
  nearByResourcesError: string;
  deletionError: any;
  resourcesForMap: any;
  formData: any;
  saveToFavouritesError: { error: string };
  deleteFromFavouritesError: { error: string };
}

const defaultState: DefaultState = {
  nearByResourcesLoading: false,
  nearByResourceAndFieldsDTO: [],
  latLngForPatientAddress: {},
  addressInput: '',
  resourceInput: '',
  siteInput: '',
  nearByResourcesError: noErrorMessage,
  deletionError: { error: '' },
  resourcesForMap: [],
  formData: {},
  saveToFavouritesError: { error: '' },
  deleteFromFavouritesError: { error: '' }
};

interface payload {
  patientLocation: any;
  nearByResourceAndFieldsDTO: nearByResourceAndFieldsItemType[];
  latLngForPatientAddress: any;
  resources_fields: string;
  address: string;
  resource: string;
  error: string;
  resourceIdToBeDeleted: string;
  deletionError: any;
  resourceTypeForDeletion: string;
  nearByResourcesForMap: any;
  formData: any;
  saveToFavouritesError: { error: string };
  deleteFromFavouritesError: { error: string };
}

interface actionType {
  type: string;
  payload: payload;
}

export const nearByResourcesReducer = (
  state: DefaultState = defaultState,
  action: actionType
): DefaultState => {
  switch (action.type) {
    case NEAR_BY_RESOURCES_LOADING:
      return {
        ...state,
        nearByResourcesLoading: true
      };
    case NEAR_BY_RESOURCES_SUCCESS:
      return {
        ...state,
        nearByResourcesLoading: false,
        nearByResourceAndFieldsDTO: action.payload.nearByResourceAndFieldsDTO,
        latLngForPatientAddress: action.payload.patientLocation,
        nearByResourcesError: ''
      };

    case 'SAVE_SITE_AND_RESOURCE_CATEGORY':
      return {
        ...state,
        addressInput: action.payload.address,
        resourceInput: action.payload.resource
        // siteInput: action.payload.site
      };
    case NEAR_BY_RESOURCES_FAIL:
      return {
        ...state,
        nearByResourcesLoading: false,
        nearByResourceAndFieldsDTO: [],
        nearByResourcesError: action.payload.error
      };
    case DELETE_RESOURCE_SUCCESS: {
      const nearByResourcesOfRequiredCategory: nearByResourceAndFieldsItemType[] = state.nearByResourceAndFieldsDTO.filter(
        (element: any) => element.resourceType === action.payload.resourceTypeForDeletion
      );
      const otherResources: nearByResourceAndFieldsItemType[] = state.nearByResourceAndFieldsDTO.filter(
        (element: any) => element.resourceType !== action.payload.resourceTypeForDeletion
      );
      const filteredNearByResourcesOfRequiredCategory: nearByResourceAndFieldsItemType[] = [
        {
          ...nearByResourcesOfRequiredCategory[0],
          patientNearByResourceDtoList: nearByResourcesOfRequiredCategory[0].patientNearByResourceDtoList.filter(
            (element: any) => {
              console.log(element.resourceId);
              return element.resourceId !== action.payload.resourceIdToBeDeleted;
            }
          )
        }
      ];
      const filteredResources: nearByResourceAndFieldsItemType[] = [
        ...filteredNearByResourcesOfRequiredCategory,
        ...otherResources
      ];

      return {
        ...state,
        nearByResourceAndFieldsDTO: filteredResources,
        deletionError: { ...action.payload.deletionError }
      };
    }
    case DELETE_RESOURCE_FAIL: {
      return {
        ...state,
        deletionError: { ...action.payload.deletionError }
      };
    }
    case 'Add_NEAR_BY_RESOURCES_TO_MAP': {
      return {
        ...state,
        resourcesForMap: action.payload.nearByResourcesForMap
      };
    }
    case 'SAVE_FORM_DATA': {
      return {
        ...state,
        formData: { ...action.payload }
      };
    }
    case 'SAVE_TO_FAVOURITE_SUCCESS': {
      return {
        ...state,
        saveToFavouritesError: { ...action.payload.saveToFavouritesError }
      };
    }
    case 'SAVE_TO_FAVOURITE_FAIL': {
      return {
        ...state,
        saveToFavouritesError: { ...action.payload.saveToFavouritesError }
      };
    }
    case 'DELETE_FROM_FAVOURITES_SUCCESS': {
      return {
        ...state,
        deleteFromFavouritesError: { ...action.payload.deleteFromFavouritesError }
      };
    }
    case 'DELETE_FROM_FAVOURITES_FAIL': {
      return {
        ...state,
        deleteFromFavouritesError: { ...action.payload.deleteFromFavouritesError }
      };
    }
    default:
      return state;
  }
};
