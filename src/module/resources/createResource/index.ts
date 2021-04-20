import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import resourceForm from './component/resourceForm';
import { rootReducerType } from '../../../root-reducer';
import { INSURANCE_AND_DISTANCE, SITES_AND_CATEGORIES } from '../types';

const mapStateToProps = (state: rootReducerType) => {
  const {
    categories,
    error: sitesAndCategoriesError,
    sites,
    sitesAndCategoriesLoading
  } = state.sitesAndCategoriesReducer;

  const {
    insuranceAndDistanceLoading,
    insurance,
    distance,
    error: insuranceAndDistanceError
  } = state.insuranceAndDistanceReducer;

  const {
    error,
    status,
    resourceFields,
    resourceFieldsLoading,
    locationAndSites,
    spId
  } = state.createResourceReducer;

  return {
    sitesAndCategoriesLoading: sitesAndCategoriesLoading,
    sites: sites,
    categories: categories,
    sitesAndCategoriesError: sitesAndCategoriesError,

    insurance: insurance,

    resourceFields: resourceFields,
    spId: spId,
    locationAndSites: locationAndSites,
    error: error,
    status: status,
    resourceFieldsLoading: resourceFieldsLoading
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getAllSitesAndCategories: () => dispatch({ type: SITES_AND_CATEGORIES }),
    getInsuranceAndDistance: () => dispatch({ type: INSURANCE_AND_DISTANCE }),
    getResourceFields: (categoryName: string) =>
      dispatch({ type: 'RESOURCE_FIELDS', payload: categoryName }),
    addResource: (resourceDetails: any) =>
      dispatch({ type: 'ADD_RESOURCE', payload: resourceDetails })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(resourceForm);
