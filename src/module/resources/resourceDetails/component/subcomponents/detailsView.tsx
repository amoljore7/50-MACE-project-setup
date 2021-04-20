import React from 'react';
import {
  Typography,
  TextField,
  Link,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import BackIcon from '../../../../../assets/svg/Icon material-keyboard-backspace.svg';
import EmptyHeartIcon from '../../../../../assets/svg/Icon ionic-md-heart-empty.svg';
import FilledHeartIcon from '../../../../../assets/svg/Icon ionic-md-heart.svg';
import DeleteIcon from '../../../../../assets/svg/Icon feather-trash-2.svg';
import EditIcon from '../../../../../assets/svg/Union 3.svg';
import SearchIcon from '../../../../../assets/svg/Icon ionic-md-search.svg';
import LocationIcon from '../../../../../assets/svg/Icon metro-location.svg';
import CallIcon from '../../../../../assets/svg/Icon zocial-call.svg';
import GlobeIcon from '../../../../../assets/svg/Icon feather-globe.svg';
import TimeIcon from '../../../../../assets/svg/Icon ionic-md-time.svg';
import PlayArrow from '../../../../../assets/svg/Icon material-play-arrow.svg';
import StackIcon from '../../../../../assets/svg/noun_layer_3640609.svg';
import SearchCloseIcon from '../../../../../assets/svg/Icon ionic-md-close.svg';
import jwtDecode from 'jwt-decode';

const useStyles = makeStyles(() => ({
  resourceCardIconStyle: {
    height: '1rem',
    width: '1rem',
    marginRight: '0.4rem',
    cursor: 'pointer'
  },
  detailsCardWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: '#FFFFFF',
    boxShadow: '0px 3px 6px #00000029',
    borderRadius: '10px',
    height: '100%'
  },
  textfieldInputStyle: {
    padding: '10px',
    borderRadius: '1rem'
  },
  fieldIconStyle: {
    marginRight: '0.5rem',
    height: '1rem',
    width: '1rem'
  },
  fieldStyle: {
    display: 'block',
    padding: '0.6rem 0 0.6rem 0',
    width: '100%'
  },
  fieldsWrapper: {
    '&::-webkit-scrollbar': {
      width: '0.4em',
      height: '0.4rem'
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

interface Props {
  getResourceDetails: (id: string | undefined) => void;
  resourceLoading: boolean;
  resource: Record<string, string>;
  uiFields: any;
  error: string;
  screenOpenHandler: (value: string) => void;
  history: any;
  location: any;
  match: any;
  deleteResource: (resourceId: number, resourceType: string) => void;
  deletionError: { error: string };
  saveToFavoriteResources: (payload: { nearById: number; userId: string }) => void;
  deleteFromFavouriteResources: (payload: { nearById: number; userId: string }) => void;
  deleteFromFavouritesError: { error: string };
  saveToFavouritesError: { error: string };
  stackCardViewHandler: (value: boolean) => void;
}

const DetailsView: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const [isFavourite, setIsFavourite] = React.useState(false);
  const [nearbyId, setNearById] = React.useState(-1);
  React.useEffect(() => {
    const isFav = localStorage.getItem('isResourceFavourite') === 'true' ? true : false;
    setIsFavourite(isFav);
    setNearById(parseInt(localStorage.getItem('resourceNearById') || '') || -1);
    return () => {
      localStorage.removeItem('isResourceFavourite');
      localStorage.removeItem('resourceNearById');
    };
  }, []);
  const token: any = localStorage.getItem('accessToken');
  const { userId }: any = jwtDecode(token);

  const firstRenderSaveToFavouritesError = React.useRef(true);
  const firstRenderDeleteFromFavouritesError = React.useRef(true);
  React.useEffect(() => {
    if (firstRenderSaveToFavouritesError.current) {
      firstRenderSaveToFavouritesError.current = false;
    } else {
      if (props.saveToFavouritesError.error === 'NoError') {
        setIsFavourite(true);
        localStorage.setItem('isResourceFavourite', 'true');
      }
    }
  }, [props.saveToFavouritesError]);

  React.useEffect(() => {
    if (firstRenderDeleteFromFavouritesError.current) {
      firstRenderDeleteFromFavouritesError.current = false;
    } else {
      if (props.deleteFromFavouritesError.error === 'NoError') {
        setIsFavourite(false);
        localStorage.setItem('isResourceFavourite', 'false');
      }
    }
  }, [props.deleteFromFavouritesError]);

  const heartIconClickHandler = () => {
    console.log(isFavourite);
    if (isFavourite) {
      props.deleteFromFavouriteResources({ nearById: nearbyId, userId: userId });
    } else {
      props.saveToFavoriteResources({ nearById: nearbyId, userId: userId });
    }
  };

  // let workingHoursArray: string[] = [];
  // React.useEffect(() => {
  //   let filteredWorkingHours = props.resource.workingHrs.replace('"Office hours: | ', '');
  //   filteredWorkingHours = filteredWorkingHours.replaceAll('â€“', '-');
  //   const workingHours = filteredWorkingHours.split('|  |');
  //   workingHoursArray = workingHours[0].split('|');
  // }, [props.resource]);

  React.useEffect(() => {
    props.stackCardViewHandler(true);
  }, []);

  const [isDeleteModalOpen, setDeleteModalOpen] = React.useState(false);

  // const openDeleteModal = (id: number, resourceType: string) => {
  //   setDeleteModalOpen(true);
  // };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
  };

  const [isResourceSelectedForDeletion, setResourceSelectedForDeletion] = React.useState(false);
  const deleteModalOpenHandler = () => {
    setResourceSelectedForDeletion(true);
    setDeleteModalOpen(true);
  };

  React.useEffect(() => {
    if (props.deletionError.error === 'NoError' && isResourceSelectedForDeletion) {
      props.history.goBack();
    }
  }, [props.deletionError]);

  const deleteResource = () => {
    props.deleteResource(
      props.match.params.id,
      // props.location.state.resourceType
      props.resource.resourceType
    );
    setDeleteModalOpen(false);
  };

  const editIconClickHandler = (value: string) => {
    props.screenOpenHandler(value);
  };

  const stackIconClickHandler = (value: string) => {
    props.screenOpenHandler(value);
  };

  const backHandler = () => {
    props.history.goBack();
  };

  // const [resourceFieldsToBeDisplayed, setResourceFieldsToBeDisplayed] = React.useState(
  //   props.resource
  // );

  // React.useEffect(() => {
  //   setResourceFieldsToBeDisplayed(props.resource);
  // }, [props.resource]);

  // const [searchText, setSearchText] = React.useState('');
  // const searchChangeHandler = (
  //   event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  // ) => {
  //   setSearchText(event.target.value);
  //   const resourceFieldsToBeDisplayed: any = {};
  //   for (const item in props.resource) {
  //     if (props.resource[item] && props.resource[item].includes(event.target.value)) {
  //       resourceFieldsToBeDisplayed[item] = props.resource[item];
  //     }
  //   }
  //   console.log(resourceFieldsToBeDisplayed);
  //   setResourceFieldsToBeDisplayed(resourceFieldsToBeDisplayed);
  // };

  const [resourceFieldsToBeDisplayed, setResourceFieldsToBeDisplayed] = React.useState(
    props.uiFields
  );

  React.useEffect(() => {
    setResourceFieldsToBeDisplayed(props.uiFields);
  }, [props.uiFields]);

  const [searchText, setSearchText] = React.useState('');
  const searchChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
    const resourceFieldsToBeDisplayed: any = [];
    for (let i = 0; i < props.uiFields.length; i++) {
      if (props.uiFields[i] && props.uiFields[i].columnValue.includes(event.target.value)) {
        resourceFieldsToBeDisplayed.push(props.uiFields[i]);
      }
    }
    console.log(resourceFieldsToBeDisplayed);
    setResourceFieldsToBeDisplayed(resourceFieldsToBeDisplayed);
  };

  const initialFields = ['name', 'address', 'workingHrs', 'phoneNo'];

  const resourceFieldsToBeDisplayedColumnTypes = [] as any;

  if (resourceFieldsToBeDisplayed) {
    resourceFieldsToBeDisplayed.map((i: any) => {
      resourceFieldsToBeDisplayedColumnTypes.push(i.columnType);
    });
  }

  if (props.resourceLoading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div className={classes.detailsCardWrapper}>
        <div style={{ width: '100%', padding: '0.5rem', height: '2.5rem' }}>
          <Link style={{ display: 'inline' }} onClick={backHandler}>
            <img src={BackIcon} alt="back" />
            <span style={{ marginLeft: '5px' }}>Back To List</span>
          </Link>
          <div style={{ float: 'right', display: 'flex' }}>
            <img
              className={classes.resourceCardIconStyle}
              src={StackIcon}
              alt="StackIcon"
              onClick={() => stackIconClickHandler('stackDetailsView')}
            />
            <img
              className={classes.resourceCardIconStyle}
              src={isFavourite ? FilledHeartIcon : EmptyHeartIcon}
              alt="EmptyHeartIcon"
              onClick={heartIconClickHandler}
            />
            <img
              className={classes.resourceCardIconStyle}
              src={EditIcon}
              alt="EditIcon"
              onClick={() => editIconClickHandler('editView')}
            />
            <img
              className={classes.resourceCardIconStyle}
              src={DeleteIcon}
              onClick={deleteModalOpenHandler}
              alt="DeleteIcon"
            />
          </div>
        </div>
        <hr color="#3366ff" style={{ width: '100%', margin: '0' }} />
        <div
          style={{ width: '100%', overflow: 'auto', padding: '0.5rem', height: '80vh' }}
          className={classes.fieldsWrapper}>
          <div className={classes.fieldStyle}>
            <TextField
              style={{ width: '100%' }}
              variant="outlined"
              placeholder="Search"
              type="search"
              InputProps={{
                endAdornment: (
                  <img
                    style={{ height: '1rem', width: '1rem', cursor: 'pointer' }}
                    src={searchText === '' ? SearchIcon : SearchCloseIcon}
                    alt="search Icon"
                    onClick={() => {
                      setSearchText('');
                      setResourceFieldsToBeDisplayed(props.resource);
                    }}
                  />
                ),
                classes: { input: classes.textfieldInputStyle }
              }}
              value={searchText}
              onChange={searchChangeHandler}
            />
          </div>
          {resourceFieldsToBeDisplayedColumnTypes.length &&
          resourceFieldsToBeDisplayedColumnTypes.includes('name') ? (
            <div className={classes.fieldStyle}>
              <Typography style={{ fontWeight: 800 }}>{props.resource.name}</Typography>
            </div>
          ) : null}
          {resourceFieldsToBeDisplayedColumnTypes.includes('address') ? (
            <div className={classes.fieldStyle} style={{ height: '4rem' }}>
              <div style={{ display: 'inline-block' }}>
                <img className={classes.fieldIconStyle} src={LocationIcon} alt="location" />
                <span>{props.resource.address}</span>
              </div>
              <div
                style={{
                  float: 'right',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <span style={{ fontWeight: 800 }}>
                  {props.location.state && props.location.state.resourceTravellingTime}
                </span>
                <span style={{ fontWeight: 800 }}>
                  {props.location.state && props.location.state.distance + ' miles away'}
                </span>
              </div>
            </div>
          ) : null}
          {resourceFieldsToBeDisplayedColumnTypes.includes('phoneNo') ? (
            <div className={classes.fieldStyle}>
              <img className={classes.fieldIconStyle} src={CallIcon} alt="Call" />
              <span style={{ fontWeight: 800 }}>{props.resource.phoneNo}</span>
            </div>
          ) : null}
          {resourceFieldsToBeDisplayedColumnTypes.includes('infoFound') ? (
            <div className={classes.fieldStyle}>
              <img className={classes.fieldIconStyle} src={GlobeIcon} alt="Globe" />
              <span>
                <Link>{props.resource.infoFound}</Link>
              </span>
            </div>
          ) : null}
          {resourceFieldsToBeDisplayedColumnTypes.includes('workingHrs') ? (
            <div className={classes.fieldStyle}>
              <img className={classes.fieldIconStyle} src={TimeIcon} alt="Time" />
              <span style={{ color: '#999999' }}>Working Hours</span>
              <div style={{ color: '#323648' }}>{props.resource.workingHrs}</div>
              {/* <div style={{ marginTop: '0.5rem' }}>
                              {workingHoursArray.map((hours: string) => (
                                <span key={hours} style={{ display: 'block' }}>
                                  {hours}
                                </span>
                              ))}
                            </div> */}
            </div>
          ) : null}
          <hr style={{ width: '100%', margin: '0' }} />

          {props.uiFields &&
            props.uiFields.length &&
            resourceFieldsToBeDisplayed.map((resource: any, index: any) => {
              if (!initialFields.includes(resource.columnType)) {
                return (
                  <div className={classes.fieldStyle}>
                    <img className={classes.fieldIconStyle} src={PlayArrow} alt="Arrow" />
                    <span style={{ color: '#999999' }}>{resource.columnName}</span>
                    <div style={{ color: '#323648' }}>{resource.columnValue}</div>
                  </div>
                );
              }
            })}
          {/* {Object.entries(resourceFieldsToBeDisplayed).map((prop: string[]) => {
            if (!initialFields.includes(prop[0])) {
              console.log('>>>prop[0]>>', prop[0]);
              return (
                <div className={classes.fieldStyle}>
                  <img className={classes.fieldIconStyle} src={PlayArrow} alt="Arrow" />
                  <span style={{ color: '#999999' }}>{prop[0]}</span>
                  <div style={{ color: '#323648' }}>{prop[1]}</div>
                </div>
              );
            }
          })} */}
        </div>
        <Dialog
          open={isDeleteModalOpen}
          onClose={closeDeleteModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <>
            <DialogTitle id="alert-dialog-title">
              {'Do you want to delete this resource ?'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This Action will permanently delete the resource.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button color="secondary" onClick={deleteResource}>
                Delete
              </Button>
            </DialogActions>
          </>
        </Dialog>
      </div>
    );
  }
};

export default DetailsView;
