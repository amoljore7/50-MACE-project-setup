import {
  SITES_AND_CATEGORIES_LOADING,
  SITES_AND_CATEGORIES_SUCCESS,
  SITES_AND_CATEGORIES_FAIL
} from '../types';

export interface sitesItem {
  id: number;
  site: string;
}

export interface catergoryItem {
  id: number;
  specialties: string;
}

export interface DefaultState {
  sitesAndCategoriesLoading: boolean;
  sites: sitesItem[];
  categories: catergoryItem[];
  error: string;
}

const defaultState: DefaultState = {
  sitesAndCategoriesLoading: false,
  sites: [],
  categories: [],
  error: ''
};

interface payload {
  sitesList: sitesItem[];
  categoryList: catergoryItem[];
  error: string;
}

interface actionType {
  type: string;
  payload: payload;
}

export const sitesAndCategoriesReducer = (
  state: DefaultState = defaultState,
  action: actionType
): DefaultState => {
  switch (action.type) {
    case SITES_AND_CATEGORIES_LOADING:
      return {
        ...state,
        sitesAndCategoriesLoading: true
      };
    case SITES_AND_CATEGORIES_SUCCESS:
      return {
        ...state,
        sitesAndCategoriesLoading: false,
        sites: action.payload.sitesList,
        categories: action.payload.categoryList,
        error: ''
      };
    case SITES_AND_CATEGORIES_FAIL:
      return {
        ...state,
        sitesAndCategoriesLoading: false,
        sites: [],
        categories: [],
        error: action.payload.error
      };
    default:
      return state;
  }
};
