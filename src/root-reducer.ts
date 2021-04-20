import { combineReducers } from 'redux';

import { login as loginReducer } from './module/login/reducer';
import { forgotPassword as forgotPasswordReducer } from './module/forgotPassword/reducer';
import { resetPassword as resetPasswordReducer } from './module/resetPassword/reducer';
import { nearByResourcesReducer } from './module/resources/reducers/nearByResourcesReducer';
import { addressSuggestionReducer } from './module/resources/reducers/addressSuggestionsReducer';
import { sitesAndCategoriesReducer } from './module/resources/reducers/sitesAndCategoriesReducer';
import { getSavedSearchesReducer } from './module/resources/reducers/savedSearchesReducer';
import { deleteSavedSearchesReducer } from './module/resources/reducers/deleteSavedSearchReducer';
import { insuranceAndDistanceReducer } from './module/resources/reducers/insuranceAndDistanceReducer';
import { resource as resourceDetailsReducer } from './module/resources/resourceDetails/reducer';
import { createResource as createResourceReducer } from './module/resources/createResource/reducer';
const rootReducer = combineReducers({
  loginReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
  nearByResourcesReducer,
  addressSuggestionReducer,
  sitesAndCategoriesReducer,
  getSavedSearchesReducer,
  deleteSavedSearchesReducer,
  insuranceAndDistanceReducer,
  resourceDetailsReducer,
  createResourceReducer
});

export default rootReducer;

export type rootReducerType = ReturnType<typeof rootReducer>;
