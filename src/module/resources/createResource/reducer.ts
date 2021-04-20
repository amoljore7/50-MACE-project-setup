import {
  ADD_RESOURCE_SUCCESS,
  ADD_RESOURCE_FAIL,
  GET_RESOURCE_FIELDS_SUCCESS,
  GET_RESOURCE_FIELDS_FAIL,
  GET_RESOURCE_FIELDS_LOADING
} from './types';
import { locationAndSitesItemType } from './saga';

export const noErrorMessage = 'No Error';

export interface DefaultState {
  error: string;
  status: string;
  resourceFieldsLoading: boolean;
  spId: any;
  resourceFields: string[];
  uiFields: any;
  locationAndSites: locationAndSitesItemType[];
  resourceFieldsError: string;
}

const defaultState: DefaultState = {
  error: '',
  status: '',
  resourceFieldsLoading: false,
  spId: '',
  resourceFields: [],
  uiFields: [{}],
  resourceFieldsError: '',
  locationAndSites: []
};

interface payload {
  locationAndSites: locationAndSitesItemType[];
  fields: string[];
  uiFields: any;
  error: string;
  spId: any;
  resourceFieldsError: string;
}

interface actionType {
  type: string;
  payload: payload;
}

export const createResource = (
  state: DefaultState = defaultState,
  action: actionType
): DefaultState => {
  switch (action.type) {
    case GET_RESOURCE_FIELDS_LOADING:
      return {
        ...state,
        resourceFieldsLoading: true
      };
    case GET_RESOURCE_FIELDS_SUCCESS:
      return {
        ...state,
        resourceFieldsLoading: false,
        spId: action.payload.spId,
        resourceFields: action.payload.fields,
        uiFields: action.payload.uiFields,
        locationAndSites: action.payload.locationAndSites
      };
    case GET_RESOURCE_FIELDS_FAIL:
      return {
        ...state,
        resourceFieldsLoading: false,
        resourceFieldsError: action.payload.resourceFieldsError
      };
    case ADD_RESOURCE_SUCCESS:
      return {
        ...state,
        error: 'No Error'
      };
    case ADD_RESOURCE_FAIL:
      return {
        ...state,
        error: action.payload.error
      };
    default:
      return state;
  }
};
