import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import resource from './component/resourceDetails';
import { rootReducerType } from '../../../root-reducer';
import { stackDetailsType } from './component/subcomponents/stackView';
import { STACK_FLUSH_DATA } from './types';

interface ownPropsType {
  id: number;
  resourceDistance: number;
  resourceTravellingTime: string;
  resourceType: string;
  resourceDetailsViewHandler: any;
  stackViewHandler: (value: boolean) => void;
  stackCardViewHandler: (value: boolean) => void;
  screenOpen: string;
  deleteResource: (resourceId: number, resourceType: string) => void;
}

const mapStateToProps = (state: rootReducerType, ownProps: ownPropsType) => {
  const {
    resourceLoading,
    resource,
    uiFields,
    error,
    stackList,
    saveError,
    idAfterUpdate
  } = state.resourceDetailsReducer;
  const {
    resourcesForMap,
    latLngForPatientAddress,
    deletionError,
    deleteFromFavouritesError,
    saveToFavouritesError
  } = state.nearByResourcesReducer;
  const { categories } = state.sitesAndCategoriesReducer;
  const category = categories.find((element) => element.specialties === ownProps.resourceType);
  const spId = (category && category.id) || -1;
  return {
    resourceLoading: resourceLoading,
    resource: resource,
    uiFields: uiFields,
    error: error,
    stackList: stackList,
    spId: spId,
    resourcesForMap: resourcesForMap,
    latLngForPatientAddress: latLngForPatientAddress,
    saveError: saveError,
    deletionError: deletionError,
    idAfterUpdate: idAfterUpdate,
    deleteFromFavouritesError: deleteFromFavouritesError,
    saveToFavouritesError: saveToFavouritesError
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: ownPropsType) => {
  return {
    getResourceDetails: (id: string | undefined) =>
      dispatch({ type: 'RESOURCE_DETAILS', payload: { id: id } }),
    saveResourceDetails: (id: string | undefined, resourceDetails: any) =>
      dispatch({
        type: 'SAVE_RESOURCE_DETAILS',
        payload: { id: id, resourceDetails: resourceDetails }
      }),
    addResourceToStack: (stackDetails: stackDetailsType) =>
      dispatch({ type: 'Add_RESOURCE_TO_STACK', payload: stackDetails }),
    removeResourceFromStack: (name: string) => {
      console.log('removeResourceFromStack');
      dispatch({ type: 'REMOVE_RESOURCE_FROM_STACK', payload: { name: name } });
    },
    flushStack: () => {
      console.log('flush Stack');
      dispatch({ type: STACK_FLUSH_DATA });
    },
    deleteResource: (id: number, resourceTypeForDeletion: string) => {
      dispatch({
        type: 'DELETE_RESOURCE',
        payload: { id: id, resourceTypeForDeletion: resourceTypeForDeletion }
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

export default connect(mapStateToProps, mapDispatchToProps)(resource);
