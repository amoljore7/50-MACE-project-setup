import React from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Card,
  Button,
  MenuItem,
  Divider,
  Theme,
  Paper,
  Container,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle
} from '@material-ui/core';
import { notification } from 'antd';
// @ts-ignore
import { useAlert } from 'react-alert';
import { ValidatorForm } from 'react-material-ui-form-validator';

import { makeStyles } from '@material-ui/styles';
import CircularProgressOverlay from '../../../../components/circular-progress-overlay';
import { RouteComponentProps } from 'react-router-dom';
import { locationAndSitesItemType } from '../saga';
import FilterIcon from '../../../../assets/svg/filter.svg';
import BackIcon from '../../../../assets/svg/Icon material-keyboard-backspace.svg';

import { catergoryItem, sitesItem } from '../../reducers/sitesAndCategoriesReducer';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  GridSpace: {
    marginTop: '2rem',
    marginBottom: '2rem'
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  dividerTop: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: '#4491E0'
  },
  paperr: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    padding: theme.spacing(1, 2, 1),
    width: '100%',
    height: '100%',
    marginTop: '1.5rem'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  IconStyle: {
    marginRight: '0.5rem',
    width: '1rem',
    height: '2rem'
  },
  topButtons: {
    color: '#4491E0',
    textTransform: 'none'
  },
  cancelButton: {
    color: '#999999',
    textTransform: 'none'
  },
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8)
  },
  textFieldStyle: {
    width: '100%',
    backgroundColor: '#FFF',
    boxShadow: '0px 0px 6px #00000029',
    border: '1px solid #ECECEC',
    borderRadius: '10px'
  },
  ShowMoreButton: {
    color: '#4491E0',
    border: '1px solid #4491E0',
    borderRadius: '10px',
    textTransform: 'none',
    marginLeft: '10px',
    boxShadow: '0px 3px 1px #0000001F',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    width: '180px',
    height: '60px'
  },
  ShowMoreMainButton: {
    color: '#4491E0',
    border: '1px solid #4491E0',
    borderRadius: '10px',
    textTransform: 'none',
    marginLeft: '10px',
    boxShadow: '0px 3px 1px #0000001F',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    width: '173px',
    height: '60px'
  },
  ShowMoreText: {
    textAlign: 'left',
    font: '400 20px "FuturaMediumBT"',
    letterSpacing: '0px',
    color: '#4491E0',
    opacity: 1,
    textTransform: 'none'
  },
  button: {
    textTransform: 'none',
    padding: '5px 50px',
    marginLeft: '10px'
  },
  inputFieldLabel: {
    textAlign: 'left',
    font: '400 20px "FuturaMediumBT"',
    letterSpacing: '0px',
    color: '#323648',
    opacity: 1
  },
  resourceMessage: {
    textAlign: 'center',
    font: '400 26px/32px "FuturaMediumBT"',
    letterSpacing: '0px',
    color: '#323648',
    opacity: 1
  },
  SectionHeading: {
    font: '900 28px "FuturaMediumBT"',
    letterSpacing: '0px',
    color: '#323648',
    opacity: 1,
    textAlign: 'left',
    position: 'absolute'
  },
  dialogContentStyle: {
    textAlign: 'center',
    font: '400 26px/32px "FuturaMediumBT"',
    letterSpacing: '0px',
    color: '#323648',
    opacity: 1
  }
}));

interface StoreProps {
  resourceFields: any;
  locationAndSites: locationAndSitesItemType[];
  status: string;
  error: string;
  spId: any;
  resourceFieldsLoading: boolean;
  sitesAndCategoriesLoading: boolean;
  sites: sitesItem[];
  categories: catergoryItem[];
  insurance: any;
}

interface DispatchProps {
  getAllSitesAndCategories: () => void;
  getInsuranceAndDistance: () => void;
  addResource: (resourceDetails: any) => void;
  getResourceFields: (categoryName: string) => void;
}

interface locationProps {
  location: {
    pathname: string;
    state: { address: string; category: string };
  };
}

type Props = StoreProps & DispatchProps & RouteComponentProps & locationProps;

const ResourceForm: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const alert = useAlert();
  const [categoryName, setCategoryName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [locationIndex, setLocationIndex] = React.useState() as any;
  const [site, setSite] = React.useState('');
  const [saveData, setSaveData] = React.useState(false);
  const [saveFormOpen, setSaveFormOpen] = React.useState(false);
  const [resetFormOpen, setResetFormOpen] = React.useState(false);

  const [resourceDetails, setResourceDetails] = React.useState({
    // spId: 2,
    // siteId: 23
  }) as any;

  React.useEffect(() => {
    props.getAllSitesAndCategories();
    props.getInsuranceAndDistance();
  }, []);
  React.useEffect(() => {
    if (saveData) {
      props.addResource(resourceDetails);
    }
  }, [saveData]);

  React.useEffect(() => {
    if (categoryName) {
      props.getResourceFields(categoryName);
    }
  }, [categoryName]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setResourceDetails({ ...resourceDetails, [name]: value });
  };

  const locationChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setLocation(e.target.value);
    const locationIndex = props.locationAndSites.findIndex(
      (obj) => obj.locationName === e.target.value
    );
    setLocationIndex(locationIndex);
  };

  const addResourceHandler = () => {
    setSaveFormOpen(false);
    setResetFormOpen(false);
    if (!categoryName || !location || !site || !resourceDetails.name || !resourceDetails.address) {
      notification.open({
        message: 'Category, Location, Site, Address & Name is required !',
        duration: 4,
        type: 'warning'
      });
      return;
    }

    setResourceDetails({
      ...resourceDetails,
      resourceType: categoryName,
      location: location,
      siteName: site.trim(),
      spId: props.spId
    });
    setSaveData(true);
    // props.addResource(resourceDetails);
  };

  const resetHandler = () => {
    // window.location.reload();
    setSaveFormOpen(false);
    setResetFormOpen(false);
    props.resourceFields.map((resource: string) => {
      setResourceDetails({
        [resource]: ''
      });
    });
    setCategoryName(''), setLocation(''), setSite('');
    setLocationIndex('');
  };
  const backHandler = () => {
    props.history.goBack();
  };

  const FormCancel = () => {
    setSaveFormOpen(false);
    setResetFormOpen(false);
  };

  let saveForm = null;
  if (saveFormOpen) {
    saveForm = (
      <React.Fragment>
        <Dialog
          fullWidth={true}
          open={saveFormOpen}
          disableBackdropClick
          onClose={FormCancel}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            <span className={classes.SectionHeading}>Save Resource</span>
          </DialogTitle>
          <DialogContent style={{ marginTop: '25px' }}>
            <span className={classes.dialogContentStyle}>Do you want to save this resource ?</span>
          </DialogContent>
          <DialogActions>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              style={{ marginTop: '25px' }}>
              <Button
                className={classes.ShowMoreButton}
                onClick={FormCancel}
                style={{ padding: '5px 25px' }}>
                <span className={classes.ShowMoreText}> Cancel</span>
              </Button>
              <Button
                onClick={addResourceHandler}
                className={classes.ShowMoreMainButton}
                variant="contained"
                // disabled={saveSearchTitle ? false : true}
                style={{ backgroundColor: '#4491E0' }}>
                <span className={classes.ShowMoreText} style={{ color: '#FFFFFF' }}>
                  Save
                </span>
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
  let resetForm = null;
  if (resetFormOpen) {
    resetForm = (
      <React.Fragment>
        <Dialog
          fullWidth={true}
          open={resetFormOpen}
          disableBackdropClick
          onClose={FormCancel}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            <span className={classes.SectionHeading}>Reset Form</span>
          </DialogTitle>
          <DialogContent style={{ marginTop: '25px' }}>
            <span className={classes.dialogContentStyle}>Do you want to reset this form ?</span>
          </DialogContent>
          <DialogActions>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              style={{ marginRight: '2%' }}>
              <Button
                className={classes.ShowMoreButton}
                onClick={FormCancel}
                style={{ padding: '5px 25px' }}>
                <span className={classes.ShowMoreText}> Cancel</span>
              </Button>
              <Button
                onClick={resetHandler}
                className={classes.ShowMoreMainButton}
                style={{ backgroundColor: '#4491E0' }}
                variant="contained"
                // disabled={saveSearchTitle ? false : true}
              >
                <span className={classes.ShowMoreText} style={{ color: '#FFFFFF' }}>
                  Reset
                </span>
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }

  return (
    <Paper className={classes.paperr}>
      {props.resourceFieldsLoading ? (
        <CircularProgressOverlay />
      ) : (
        <Grid item xs={12}>
          {/* <ValidatorForm key="form" onSubmit={addResourceHandler}> */}
          <Grid container spacing={2}>
            <Grid
              item
              xs={6}
              sm={6}
              container
              direction="row"
              justify="flex-start"
              alignItems="center">
              <Button className={classes.topButtons} onClick={() => backHandler()}>
                <img className={classes.IconStyle} src={BackIcon} alt="back" />
                <span className={classes.inputFieldLabel} style={{ color: '#4491E0' }}>
                  Back
                </span>
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              container
              direction="row"
              justify="flex-end"
              alignItems="center">
              <Button onClick={() => setResetFormOpen(true)}>
                <span className={classes.ShowMoreText} style={{ color: '#999999' }}>
                  Reset
                </span>
              </Button>
              <Button type="submit" onClick={() => setSaveFormOpen(true)}>
                <span className={classes.ShowMoreText} style={{ color: '#4491E0' }}>
                  Save
                </span>
              </Button>
            </Grid>
          </Grid>
          <Divider className={classes.dividerTop} />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <label htmlFor="Categories" className={classes.inputFieldLabel}>
                Categories
              </label>
              <TextField
                className={classes.textFieldStyle}
                fullWidth
                name="categories"
                size="small"
                variant="outlined"
                select
                value={categoryName || ''}
                onChange={(e) => setCategoryName(e.target.value)}>
                {props.categories &&
                  props.categories.map((index) => (
                    <MenuItem value={index.specialties} key={index.id}>
                      {index.specialties ? index.specialties : ''}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>

            <Grid item xs={4}>
              <label htmlFor="location" className={classes.inputFieldLabel}>
                Location
              </label>
              <TextField
                className={classes.textFieldStyle}
                fullWidth
                name="location"
                size="small"
                variant="outlined"
                select
                value={location || ''}
                onChange={locationChangeHandler}>
                {props.locationAndSites &&
                  props.locationAndSites.length &&
                  props.locationAndSites.map((index, id) => (
                    <MenuItem value={index.locationName} key={id} data-my-value={id}>
                      {index.locationName ? index.locationName : ''}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <label htmlFor="site" className={classes.inputFieldLabel}>
                Site
              </label>
              <TextField
                className={classes.textFieldStyle}
                fullWidth
                name="site"
                size="small"
                variant="outlined"
                select
                value={site || ''}
                onChange={(e) => setSite(e.target.value)}>
                {location != '' &&
                  props.locationAndSites.length &&
                  props.locationAndSites[locationIndex].sites.map((site: string, index: number) => (
                    <MenuItem value={site} key={site}>
                      {site ? site : ''}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />

          {categoryName && props.resourceFields && props.resourceFields.length ? (
            <Grid container spacing={2}>
              {props.resourceFields &&
                props.resourceFields.length &&
                props.resourceFields.map((resource: any, index: any) => {
                  return (
                    <Grid item xs={6} key={resource.key}>
                      <label htmlFor={resource.label} className={classes.inputFieldLabel}>
                        {resource.label.trim()}
                      </label>
                      <TextField
                        className={classes.textFieldStyle}
                        variant="outlined"
                        margin="normal"
                        required
                        size="small"
                        id={resource.key}
                        name={resource.key}
                        value={resourceDetails[resource.key] || ''}
                        onChange={inputChangeHandler}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          ) : (
            <Grid container spacing={2} zeroMinWidth>
              <Typography variant="h5" style={{ margin: 'auto' }}>
                <span className={classes.resourceMessage}>
                  No fields, please select categories first !
                </span>
              </Typography>
            </Grid>
          )}

          <Divider className={classes.divider} />
          {/* </ValidatorForm> */}
        </Grid>
      )}
      {saveForm}
      {resetForm}
    </Paper>
  );
};

export default ResourceForm;
