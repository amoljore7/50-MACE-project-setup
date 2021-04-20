import {
  RESOURCE_LOADING,
  RESOURCE_SUCCESS,
  RESOURCE_FAIL,
  SAVE_STACK_SUCCESS,
  SAVE_STACK_FAIL,
  UPDATE_STACK_LOADING,
  SAVE_STACK_LOADING,
  UPDATE_STACK_FAIL,
  UPDATE_STACK_SUCCESS,
  STACK_FLUSH_DATA
} from './types';
import { stackDetailsType } from './component/subcomponents/stackView';

export interface DefaultState {
  resourceLoading: boolean;
  stackLoading: boolean;
  updateStackLoading: boolean;
  resource: any;
  uiFields: any;
  error: string;
  stackList: stackDetailsType[];
  saveError: any;
  idAfterUpdate: string;
  stackID: any;
}

const defaultState: DefaultState = {
  resourceLoading: false,
  stackLoading: false,
  updateStackLoading: false,
  resource: {},
  uiFields: [],
  error: '',
  stackList: [],
  saveError: { error: '' },
  idAfterUpdate: '',
  stackID: ''
};

interface actionType {
  type: string;
  payload: any;
}

export const resource = (state: DefaultState = defaultState, action: actionType): DefaultState => {
  switch (action.type) {
    case RESOURCE_LOADING:
      return {
        ...state,
        resourceLoading: true
      };
    case RESOURCE_SUCCESS:
      return {
        ...state,
        resourceLoading: false,
        resource: action.payload.responseData,
        uiFields: action.payload.uiFields,
        error: ''
      };
    case RESOURCE_FAIL:
      return {
        ...state,
        resourceLoading: false,
        error: action.payload
      };
    case 'Add_RESOURCE_TO_STACK':
      return {
        ...state,
        stackList: [...state.stackList, action.payload]
      };
    case 'REMOVE_RESOURCE_FROM_STACK':
      const filteredStackList = state.stackList.filter(
        (resource: stackDetailsType) => resource.name !== action.payload.name
      );
      return {
        ...state,
        stackList: filteredStackList
      };
    case 'SAVE_RESOURCE_DETAILS_FAIL':
      return {
        ...state,
        saveError: { ...action.payload.saveError }
      };
    case 'SAVE_RESOURCE_DETAILS_SUCCESS':
      return {
        ...state,
        idAfterUpdate: action.payload.id,
        saveError: { ...action.payload.saveError }
      };
    case SAVE_STACK_LOADING:
      return {
        ...state,
        stackLoading: true
      };
    case SAVE_STACK_SUCCESS:
      return {
        ...state,
        stackLoading: false,
        stackID: action.payload.id
      };
    case SAVE_STACK_FAIL:
      return {
        ...state,
        stackLoading: false
        // stackID: ''
      };
    case UPDATE_STACK_LOADING:
      return {
        ...state,
        updateStackLoading: true
      };
    case UPDATE_STACK_SUCCESS:
      return {
        ...state,
        updateStackLoading: false
      };
    case UPDATE_STACK_FAIL:
      return {
        ...state,
        updateStackLoading: false
        // stackID: ''
      };
    case STACK_FLUSH_DATA:
      return {
        ...state,
        stackList: [],
        stackID: null
      };
    default:
      return state;
  }
};
