import {
  INSURANCE_AND_DISTANCE_LOADING,
  INSURANCE_AND_DISTANCE_SUCCESS,
  INSURANCE_AND_DISTANCE_FAIL
} from '../types';

export interface insuranceItem {
  id: number;
  insurance: string;
}

export interface distanceItem {
  id: number;
  specialties: string;
}

export interface DefaultState {
  insuranceAndDistanceLoading: boolean;
  insurance: insuranceItem[];
  distance: distanceItem[];
  error: string;
}

const defaultState: DefaultState = {
  insuranceAndDistanceLoading: false,
  insurance: [],
  distance: [],
  error: ''
};

interface payload {
  insuranceList: insuranceItem[];
  distanceList: distanceItem[];
  error: string;
}

interface actionType {
  type: string;
  payload: payload;
}

export const insuranceAndDistanceReducer = (
  state: DefaultState = defaultState,
  action: actionType
): DefaultState => {
  switch (action.type) {
    case INSURANCE_AND_DISTANCE_LOADING:
      return {
        ...state,
        insuranceAndDistanceLoading: true
      };
    case INSURANCE_AND_DISTANCE_SUCCESS:
      return {
        ...state,
        insuranceAndDistanceLoading: false,
        insurance: action.payload.insuranceList,
        distance: action.payload.distanceList,
        error: ''
      };
    case INSURANCE_AND_DISTANCE_FAIL:
      return {
        ...state,
        insuranceAndDistanceLoading: false,
        insurance: [],
        distance: [],
        error: action.payload.error
      };
    default:
      return state;
  }
};
