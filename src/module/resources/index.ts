import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import resources from './component/resources';
import { nearByResourcesPayload } from './component/resources';
import { rootReducerType } from '../../root-reducer';
import {
  DELETE_RESOURCE,
  ADDRESS_SUGGESTION,
  SITES_AND_CATEGORIES,
  NEAR_BY_RESOURCES,
  INSURANCE_AND_DISTANCE,
  SAVE_SEARCH_RESOURCES,
  GET_SAVED_SEARCHES,
  UPDATE_SAVE_SEARCH,
  DELETE_SAVED_SEARCH
} from './types';

const mapStateToProps = (state: rootReducerType) => {
  const {
    categories,
    error: sitesAndCategoriesError,
    sites,
    sitesAndCategoriesLoading
  } = state.sitesAndCategoriesReducer;
  const { deleteSavedSearchError: deleteSavedSearchError } = state.deleteSavedSearchesReducer;

  const { error, savedSearchesList, savedSearchesLoading } = state.getSavedSearchesReducer;
  const {
    insuranceAndDistanceLoading,
    insurance,
    distance,
    error: insuranceAndDistanceError
  } = state.insuranceAndDistanceReducer;
  const {
    addressesLoading,
    addresses,
    error: addressSuggestionError
  } = state.addressSuggestionReducer;
  const {
    nearByResourcesLoading,
    nearByResourceAndFieldsDTO,
    latLngForPatientAddress,
    resourceInput,
    siteInput,
    addressInput,
    nearByResourcesError,
    formData,
    saveToFavouritesError,
    deleteFromFavouritesError
  } = state.nearByResourcesReducer;
  return {
    sitesAndCategoriesLoading: sitesAndCategoriesLoading,
    sites: sites,
    categories: categories,
    sitesAndCategoriesError: sitesAndCategoriesError,
    error: error,
    savedSearchesList: savedSearchesList,
    savedSearchesLoading: savedSearchesLoading,
    insuranceAndDistanceLoading: insuranceAndDistanceLoading,
    insurance: insurance,
    distance: distance,
    insuranceAndDistanceError: insuranceAndDistanceError,
    addressesLoading: addressesLoading,
    addresses: addresses,
    addressSuggestionError: addressSuggestionError,
    nearByResourcesLoading: nearByResourcesLoading,
    nearByResourceAndFieldsDTO: nearByResourceAndFieldsDTO,
    latLngForPatientAddress: latLngForPatientAddress,
    nearByResourcesError: nearByResourcesError,
    resourceInput: resourceInput,
    siteInput: siteInput,
    addressInput: addressInput,
    formData: formData,
    saveToFavouritesError: saveToFavouritesError,
    deleteFromFavouritesError: deleteFromFavouritesError,
    deleteSavedSearchError: deleteSavedSearchError
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getAllSitesAndCategories: () => dispatch({ type: SITES_AND_CATEGORIES }),
    getAllSavedSearches: () => dispatch({ type: GET_SAVED_SEARCHES }),
    getInsuranceAndDistance: () => dispatch({ type: INSURANCE_AND_DISTANCE }),
    addressSuggestion: (value: string) =>
      dispatch({ type: ADDRESS_SUGGESTION, payload: { address: value } }),
    findNearByResources: (nearByResourcesPayload: nearByResourcesPayload) => {
      dispatch({ type: NEAR_BY_RESOURCES, payload: nearByResourcesPayload });
    },
    saveSearchResources: (saveSearchpayload: any) => {
      dispatch({ type: SAVE_SEARCH_RESOURCES, payload: saveSearchpayload });
    },
    updateSaveSearch: (updatePayload: any) => {
      dispatch({ type: UPDATE_SAVE_SEARCH, payload: updatePayload });
    },
    deleteResource: (id: number, resourceTypeForDeletion: string) => {
      dispatch({
        type: DELETE_RESOURCE,
        payload: { id: id, resourceTypeForDeletion: resourceTypeForDeletion }
      });
    },
    handleDeleteSavedSearch: (id: any) => {
      dispatch({
        type: DELETE_SAVED_SEARCH,
        payload: id
      });
    },
    addNearByResourcesToMap: (resources: any, latLngForPatientAddress: any) => {
      dispatch({
        type: 'Add_NEAR_BY_RESOURCES_TO_MAP',
        payload: {
          nearByResourcesForMap: resources,
          latLngForPatientAddress: { latLngForPatientAddress }
        }
      });
    },
    saveFormData: (formData: any) => {
      dispatch({
        type: 'SAVE_FORM_DATA',
        payload: formData
      });
    },
    saveToFavoriteResources: (payload: { nearById: number; userId: string }) => {
      dispatch({ type: 'SAVE_TO_FAVOURITE_RESOURCES', payload: payload });
    },
    deleteFromFavouriteResources: (payload: { nearById: number; userId: string }) => {
      dispatch({ type: 'DELETE_FROM_FAVOURITE_RESOURCES', payload: payload });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(resources);
