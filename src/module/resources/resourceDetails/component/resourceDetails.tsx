import React from 'react';
import { Grid, Card, makeStyles, Theme, Chip, Button, Typography } from '@material-ui/core';
import DetailView from './subcomponents/detailsView';
import EditView from './subcomponents/editView';
import StackView from './subcomponents/stackView';
import StackListView from './subcomponents/stackListView';
import { stackDetailsType } from './subcomponents/stackView';
import GoogleMapsComponent from '../../component/gMap';
import { RouteComponentProps } from 'react-router';
import StackDescription from './stackDescription/stackDescription';

const useStyles = makeStyles((theme: Theme) => ({
  stackResourcesStyle: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: '1rem',
    overflow: 'auto',
    width: '82%',
    '&::-webkit-scrollbar': {
      height: '0.2rem'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#AFD3F7'
    }
  }
}));

interface StoreProps {
  resourceLoading: boolean;
  resource: Record<string, string>;
  uiFields: any;
  error: string;
  stackList: stackDetailsType[];
  spId: number;
  resourcesForMap: any;
  latLngForPatientAddress: any;
  saveError: { error: string };
  deletionError: { error: string };
  idAfterUpdate: string;
  deleteFromFavouritesError: { error: string };
  saveToFavouritesError: { error: string };
}

interface DispatchProps {
  saveResourceDetails: (id: string | undefined, resourceDetails: any) => void;
  getResourceDetails: (id: string | undefined) => void;
  addResourceToStack: (stackDetails: stackDetailsType) => void;
  removeResourceFromStack: (name: string) => void;
  flushStack: () => void;
  deleteResource: (resourceId: number, resourceType: string) => void;
  saveToFavoriteResources: (payload: { nearById: number; userId: string }) => void;
  deleteFromFavouriteResources: (payload: { nearById: number; userId: string }) => void;
}

interface MatchParams {
  match: {
    params: {
      id: string;
    };
  };
}

interface locationProps {
  location: {
    pathname: string;
    state: {
      distance: string;
      resourceTravellingTime: string;
      resourceType: string;
    };
  };
}

export type Props = DispatchProps & StoreProps & MatchParams & RouteComponentProps & locationProps;

const ResourceDetails: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const [screenOpen, setScreenOpen] = React.useState('detailsView');

  const screenOpenHandler = (value: string) => {
    setScreenOpen(value);
  };

  const [isEmailSmsSectionOpen, setEmailSmsSectionOpen] = React.useState(false);
  const emailSmsSectionViewHandler = (value: boolean) => {
    setEmailSmsSectionOpen(value);
  };

  const [isStackCardVisible, setStackCardVisible] = React.useState(true);

  const stackCardViewHandler = (value: boolean) => {
    setStackCardVisible(value);
  };

  const viewStackHandler = () => {
    setEmailSmsSectionOpen(true);
    setScreenOpen('stackListView');
  };

  const newStackHandler = () => {
    props.flushStack();
  };

  React.useEffect(() => {
    props.getResourceDetails(props.match.params.id.toString());
  }, []);

  const resourceInStack: { key: number; label: string }[] = [];
  let stackResourceId = 0;
  const [stackResources, setStackResources] = React.useState(resourceInStack);

  React.useEffect(() => {
    props.stackList !== [] &&
      props.stackList.map((resource: any) => {
        resourceInStack.push({ key: stackResourceId++, label: resource.name });
      });
    setStackResources(resourceInStack);
  }, [props.stackList]);

  const handleDeleteResourceFromStack = (name: string) => {
    props.removeResourceFromStack(name);
  };

  return (
    <>
      <div style={{ height: '80vh', marginBottom: '5vh' }}>
        <Grid
          container
          spacing={2}
          style={{ marginTop: '20px', height: isStackCardVisible ? '80vh' : '95vh' }}>
          <Grid item xs={12} sm={6} md={4} spacing={0} style={{ height: '100%' }}>
            {screenOpen === 'detailsView' ? (
              <DetailView
                getResourceDetails={props.getResourceDetails}
                screenOpenHandler={screenOpenHandler}
                resource={props.resource}
                uiFields={props.uiFields}
                resourceLoading={props.resourceLoading}
                error={props.error}
                history={props.history}
                location={props.location}
                match={props.match}
                deleteResource={props.deleteResource}
                deletionError={props.deletionError}
                stackCardViewHandler={stackCardViewHandler}
                saveToFavoriteResources={props.saveToFavoriteResources}
                deleteFromFavouriteResources={props.deleteFromFavouriteResources}
                deleteFromFavouritesError={props.deleteFromFavouritesError}
                saveToFavouritesError={props.saveToFavouritesError}
              />
            ) : screenOpen === 'editView' ? (
              <EditView
                getResourceDetails={props.getResourceDetails}
                screenOpenHandler={screenOpenHandler}
                saveResourceDetails={props.saveResourceDetails}
                resource={props.resource}
                uiFields={props.uiFields}
                spId={props.spId}
                history={props.history}
                match={props.match}
                stackCardViewHandler={stackCardViewHandler}
                saveError={props.saveError}
                idAfterUpdate={props.idAfterUpdate}
              />
            ) : screenOpen === 'stackDetailsView' ? (
              <StackView
                getResourceDetails={props.getResourceDetails}
                screenOpenHandler={screenOpenHandler}
                addResourceToStack={props.addResourceToStack}
                resource={props.resource}
                spId={props.spId}
                location={props.location}
                emailSmsSectionViewHandler={emailSmsSectionViewHandler}
                stackCardViewHandler={stackCardViewHandler}
                stackList={props.stackList}
              />
            ) : screenOpen === 'stackListView' ? (
              <StackListView
                screenOpenHandler={screenOpenHandler}
                stackList={props.stackList}
                removeResourceFromStack={props.removeResourceFromStack}
                emailSmsSectionViewHandler={emailSmsSectionViewHandler}
                stackCardViewHandler={stackCardViewHandler}
              />
            ) : null}
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            {isEmailSmsSectionOpen ? (
              <StackDescription stackList={props.stackList} />
            ) : (
              <GoogleMapsComponent
                nearByResources={props.resourcesForMap}
                latLngForPatientAddress={props.latLngForPatientAddress}
              />
            )}
          </Grid>
        </Grid>
        {isStackCardVisible ? (
          <div style={{ width: '100%', height: '15vh' }}>
            <Card style={{ height: '4rem' }}>
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: '1rem'
                }}>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    display: 'inline-block'
                  }}>
                  Your Stack:
                </div>
                <div className={classes.stackResourcesStyle}>
                  {stackResources.length !== 0 ? (
                    stackResources.map((resource: any) => {
                      return (
                        <Chip
                          style={{ marginRight: '10px' }}
                          key={resource.key}
                          label={resource.label}
                          onDelete={() => {
                            handleDeleteResourceFromStack(resource.label);
                          }}
                          variant="outlined"
                        />
                      );
                    })
                  ) : (
                    <Typography
                      style={{
                        fontWeight: 800,
                        fontSize: '1.1rem',
                        display: 'inline-block'
                      }}>
                      No Resource exists in the Stack
                    </Typography>
                  )}
                </div>
                <div style={{ marginRight: '10px', marginLeft: '10px' }}>
                  <Button
                    style={{ borderRadius: '0.5rem', textTransform: 'none', width: 'max-content' }}
                    color="primary"
                    variant="contained"
                    onClick={newStackHandler}>
                    New Stack
                  </Button>
                </div>
                <div style={{ marginRight: '10px', marginLeft: '10px' }}>
                  <Button
                    style={{ borderRadius: '0.5rem', textTransform: 'none', width: 'max-content' }}
                    color="primary"
                    variant="contained"
                    disabled={props.stackList.length ? false : true}
                    onClick={viewStackHandler}>
                    View Stack
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ResourceDetails;
