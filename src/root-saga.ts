import { all, AllEffect, fork, ForkEffect } from 'redux-saga/effects';

import { watchLogin } from './module/login/saga';
import { watchForgotPassword } from './module/forgotPassword/saga';
import { watchResetPassword } from './module/resetPassword/saga';
import {
  watchResource,
  watchSaveResourceDetails,
  watchSaveStack,
  watchUpdateStack
} from './module/resources/resourceDetails/saga';
import { watchAddResource, watchResourceFields } from './module/resources/createResource/saga';
import {
  watchSitesAndCategories,
  watchGetAllSavedSearches,
  watchNearByResources,
  watchSaveSearchResources,
  watchUpdateSaveSearch,
  watchDeleteResource,
  watchDeleteSavedSearch,
  watchInsuranceAndDistance,
  watchSaveToFavoriteResources,
  watchDeleteFromFavouriteResources
} from './module/resources/saga';

export default function* rootSaga(): Generator<AllEffect<Generator<string | ForkEffect<never>>>> {
  yield all([
    watchLogin(),
    watchForgotPassword(),
    watchResetPassword(),
    watchSitesAndCategories(),
    watchGetAllSavedSearches(),
    watchInsuranceAndDistance(),
    watchNearByResources(),
    watchSaveSearchResources(),
    watchUpdateSaveSearch(),
    watchResource(),
    watchSaveResourceDetails(),
    watchSaveStack(),
    watchUpdateStack(),
    watchAddResource(),
    watchResourceFields(),
    watchDeleteResource(),
    watchDeleteSavedSearch(),
    watchSaveToFavoriteResources(),
    watchDeleteFromFavouriteResources()
  ]);
}
