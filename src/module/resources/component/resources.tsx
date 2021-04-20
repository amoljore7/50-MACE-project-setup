import React from 'react';
import { createMuiTheme, makeStyles, Theme } from '@material-ui/core/styles';
import { notification } from 'antd';
// @ts-ignore
import { Multiselect } from 'multiselect-react-dropdown';
import {
  TextField,
  Card,
  GridList,
  GridListTile,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Grid,
  Paper,
  MenuItem,
  Checkbox,
  Modal,
  Divider,
  IconButton,
  Box,
  FormControlLabel,
  Tooltip,
  CardHeader,
  Collapse,
  CardContent
} from '@material-ui/core';
import jwtDecode from 'jwt-decode';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { RouteComponentProps } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import debounce from 'lodash.debounce';
import SearchIcon from '../../../assets/svg/search.svg';
import FilterIcon from '../../../assets/svg/filter.svg';
import EmptyHeartIcon from '../../../assets/svg/Icon ionic-md-heart-empty.svg';
import FilledHeartIcon from '../../../assets/svg/Icon ionic-md-heart.svg';
import IconPharmacy from '../../../assets/svg/IconPharmacy.svg';
import MetroEyeIcon from '../../../assets/svg/Icon metro-eye.svg';
import DeleteIcon from '../../../assets/svg/Icon feather-trash-2.svg';
import DistanceIcon from '../../../assets/svg/distance.svg';
import { noErrorMessage } from '../reducers/nearByResourcesReducer';
import CircularProgressOverlay from '../../../components/circular-progress-overlay';
import { latLngForPatientAddress, nearByResource } from '../saga';
import { catergoryItem, sitesItem } from '../reducers/sitesAndCategoriesReducer';
import { insuranceItem, distanceItem } from '../reducers/insuranceAndDistanceReducer';
// @ts-ignore
import MUIPlacesAutocomplete from 'mui-places-autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import GoogleMapsComponent from './gMap';

import { Row, Col } from 'reactstrap';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  userInputWrapper: {
    marginTop: '2rem'
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  addResourceButton: {
    width: '230px',
    height: '60px',
    boxShadow: '0px 3px 1px #0000001F',
    background: '#4491E0 0% 0% no-repeat padding-box',
    borderRadius: '10px',
    opacity: '1',
    color: '#4491E0',
    border: '1px solid #4491E0'
  },
  addResourceText: {
    textAlign: 'left',
    font: '400 22px/23px "FuturaMediumBT"',
    letterSpacing: '0px',
    color: '#ffffff',
    opacity: 1,
    textTransform: 'none'
  },
  GridSpace: {
    marginTop: '2rem'
  },
  IconStyle: {
    marginRight: '2rem',
    width: '1.1rem',
    height: '2rem'
  },
  SectionHeading: {
    font: '900 30px/35px "FuturaMediumBT"',
    letterSpacing: '0px',
    color: '#323648',
    opacity: 1,
    textAlign: 'left',
    position: 'absolute'
  },
  TypographyTitle: {
    cursor: 'pointer',
    font: '500 20px/25px "FuturaMediumBT"',
    letterSpacing: '0px',
    color: '#323648',
    opacity: 1,
    textAlign: 'left',
    width: '250px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textTransform: 'capitalize'
  },
  inputFieldLabel: {
    textAlign: 'left',
    font: '400 26px/32px "FuturaMediumBT"',
    letterSpacing: '0px',
    color: '#323648',
    opacity: 1,
    margin: '0'
  },
  Heading: {
    font: '600 20px/25px "FuturaMediumBT"',
    letterSpacing: '0px',
    color: '#323648',
    opacity: 1
  },
  HeadingFilter: {
    font: '600 20px/25px "FuturaMediumBT"',
    letterSpacing: '0px',
    color: '#323648',
    opacity: 1
  },
  textFieldStyle: {
    width: '100%',
    backgroundColor: '#FFF',
    boxShadow: '0px 0px 6px #00000029',
    border: '1px solid #ECECEC',
    borderRadius: '10px',
    marginBottom: '0px',
    font: '400 18px "FuturaMediumBT"'
  },
  textFieldInputValue: {
    textAlign: 'left',
    font: '400 20px "FuturaMediumBT"',
    letterSpacing: '0px',
    color: '#323648',
    opacity: 1
  },
  FQHCInputStyle: {
    padding: '5px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: '0px 0px 6px #00000029',
    border: '1px solid #ECECEC'
  },
  FQHCTextSize: {
    textAlign: 'center',
    font: '400 20px/25px "FuturaMediumBT"',
    letterSpacing: '0px',
    color: '#323648',
    opacity: 1,
    paddingLeft: '8px'
  },
  SelectedCategories: {
    padding: '10px',
    borderRadius: '10px'
  },
  SaveSearchAsButton: {
    width: '230px',
    height: '60px',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    boxShadow: '0px 3px 1px #0000001F',
    border: '1px solid #4491E0',
    borderRadius: '10px',
    color: '#4491E0',
    textTransform: 'none',
    padding: '5px 25px'
  },
  SaveSearchAsText: {
    textAlign: 'left',
    font: '400 22px/23px "FuturaMediumBT"',
    letterSpacing: '0px',
    color: '#4491E0',
    opacity: 1,
    textTransform: 'none'
  },
  CancelButton: {
    border: '1px solid #4491E0',
    borderRadius: '10px',
    textTransform: 'none',
    marginLeft: '10px',
    boxShadow: '0px 3px 1px #0000001F',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    width: '180px',
    height: '60px',
    padding: '5px 25px'
  },
  ConfirmButton: {
    border: '1px solid #4491E0',
    borderRadius: '10px',
    textTransform: 'none',
    marginLeft: '10px',
    boxShadow: '0px 3px 1px #0000001F',
    background: '#4491E0 0% 0% no-repeat padding-box',
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
  searchHeading: {
    font: '400 22px "FuturaMediumBT"',
    letterSpacing: '0px',
    color: '#323648',
    opacity: 1
  },
  resourceHeading: {
    display: 'inline',
    fontSize: '0.8rem',
    color: '#707070',
    opacity: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  SavedSearchPaper: {
    padding: theme.spacing(1),
    borderRadius: '10px'
  },
  outLinedInput: {
    padding: '10px 10px'
  },
  paperr: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    padding: theme.spacing(1, 2, 1),
    width: '90%',
    overflowX: 'scroll',
    height: '70%'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  gridListWrapper: {
    display: 'flex',
    flexDirection: 'column',
    // height: '10rem',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: '#FFFFFF',
    boxShadow: '0px 3px 6px #00000029',
    borderRadius: '10px'
  },
  cardHeaderStyle: {
    padding: '8px',
    width: '100%'
  },
  gridListItem: {
    width: '100%',
    height: '3rem'
  },
  gridList: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    flexWrap: 'nowrap',
    // height: '24rem',
    width: '100%',
    alignItems: 'center',
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#AFD3F7'
    }
  },
  tileStyling: {
    display: 'flex',
    justifyContent: 'center'
  },
  resourceListWrapper: {
    height: '100%',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#AFD3F7'
    }
  },
  resourceCardStyle: {
    position: 'absolute',
    paddingTop: '0.5rem',
    height: '98%',
    width: '98%'
  },
  resourceCardIconStyle: {
    height: '1rem',
    width: '1rem',
    marginRight: '0.4rem',
    cursor: 'pointer'
  },
  resourceAddress: {
    display: 'block',
    fontSize: '0.8rem',
    color: '#00000066',
    opacity: 1
  },
  distanceIconStyle: {
    display: 'inline',
    marginTop: '0.4rem',
    marginRight: '0.6rem '
  },
  distanceStyle: {
    fontSize: '0.6rem'
  },
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
  },
  muiPlacesAutocompleteWrapper: {
    position: 'relative',
    zIndex: 2,
    width: '10rem',
    height: '100%'
  },
  resourceMessage: {
    textAlign: 'center',
    font: '400 26px/32px "FuturaMediumBT"',
    letterSpacing: '0px',
    color: '#323648',
    opacity: 1
  },
  dialogContentStyle: {
    textAlign: 'center',
    font: '400 26px/32px "FuturaMediumBT"',
    letterSpacing: '0px',
    color: '#323648',
    opacity: 1
  },
  leftColumn: {
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      '& > .MuiGrid-item': {
        padding: 0
      }
    }
  }
}));

export interface nearByResourceAndFieldsItemType {
  resourceType: string;
  resourceFormFields: string[];
  patientNearByResourceDtoList: nearByResource[];
}

interface StoreProps {
  sitesAndCategoriesLoading: boolean;
  savedSearchesLoading: boolean;
  addressesLoading: boolean;
  nearByResourcesLoading: boolean;
  nearByResourceAndFieldsDTO: nearByResourceAndFieldsItemType[];
  latLngForPatientAddress: latLngForPatientAddress;
  sites: sitesItem[];
  categories: catergoryItem[];
  savedSearchesList: any[];
  insurance: insuranceItem[];
  distance: distanceItem[];
  addresses: string[];
  error: string;
  nearByResourcesError: string;
  addressInput: string;
  siteInput: string;
  resourceInput: string;
  formData: any;
  saveToFavouritesError: { error: string };
  deleteFromFavouritesError: { error: string };
  deleteSavedSearchError: { error: string };
}

export interface nearByResourcesPayload {
  address: string;
  site: string;
  userId: string;
  nearByResourceFilters: {
    maxDistance: string;
    insuranceType: any;
    resourceType: any;
    fqhc: boolean;
  };
}

const theme = createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        '& $notchedOutline': {
          borderColor: 'green'
        },
        '&:hover $notchedOutline': {
          borderColor: 'red'
        },
        '&$focused $notchedOutline': {
          borderColor: 'purple'
        }
      }
    }
  }
});

interface DispatchProps {
  getAllSitesAndCategories: () => void;
  getAllSavedSearches: () => void;
  getInsuranceAndDistance: () => void;
  addressSuggestion: (value: string) => void;
  saveSearchResources: (value: any) => void;
  updateSaveSearch: (value: any) => void;
  findNearByResources: (nearByResourcesPayload: nearByResourcesPayload) => void;
  deleteResource: (id: number, resourceTypeForDeletion: string) => void;
  handleDeleteSavedSearch: (id: any) => void;
  addNearByResourcesToMap: (resources: any, latLngForPatientAddress: any) => void;
  saveFormData: (formData: any) => void;
  saveToFavoriteResources: (payload: { nearById: number; userId: string }) => void;
  deleteFromFavouriteResources: (payload: { nearById: number; userId: string }) => void;
}

type Props = StoreProps & DispatchProps & RouteComponentProps;

const Resources: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const token: any = localStorage.getItem('accessToken');
  const { userId }: any = jwtDecode(token);

  const gridListEl = React.useRef() as React.MutableRefObject<HTMLUListElement>;
  const [open, setOpen] = React.useState(false);
  const [SavedSearchOpen, setSavedSearchOpen] = React.useState(false);
  const [deleteSavedSearchOpen, setDeleteSavedSearchOpen] = React.useState(false);
  const [saveAsTrue, setSaveAsTrue] = React.useState(false);
  const [saveSearchTitle, setSaveSearchTitle] = React.useState('');
  const [searchID, setSearchID] = React.useState('');
  const [addressInput, setAddressInput] = React.useState('');
  const [siteInput, setSiteInput] = React.useState('');
  const [objectArray, setObjectArray] = React.useState() as any;
  const [insuranceArray, setInsuranceArray] = React.useState() as any;

  const [isResourceNotFound, setIsResourceNotFound] = React.useState(false);
  const [formData, setFormData] = React.useState({
    address: '',
    site: '',
    maxDistance: '',
    insuranceType: [],
    resourceType: [],
    fqhc: false
  });

  const [isNearByResourcesFetched, setNearByResourcesFetched] = React.useState(false);
  const [isResourceDetailsOpen, setResourceDetailsOpen] = React.useState(false);
  const [selectedDetailViewId, setSelectedDetailViewId] = React.useState(-1);
  const [isDeleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [selectedResourceId, setSelectedResourceId] = React.useState(-1);
  const [selectedResourceCardId, setSelectedResourceCardId] = React.useState(-1);
  const [nearByResourcesError, setNearByResourcesError] = React.useState(false);
  const [nearByResourcesForMap, setNearByResourcesForMap] = React.useState() as any;

  const [resourceDistance, setResourceDistance] = React.useState(-1);
  const [resourceTravellingTime, setResourceTravellingTime] = React.useState('');
  const [resourceType, setResourceType] = React.useState('');
  const [resourceTypeForDeletion, setResourceTypeFrDeletion] = React.useState('');
  // const [screenOpen, setScreenOpen] = React.useState('');
  // const [isStackViewOpen, setStackViewOpen] = React.useState(false);

  React.useEffect(() => {
    if (
      'address' in props.formData &&
      props.formData.address !== '' &&
      props.formData.resourceType !== []
    ) {
      const resourceType = props.formData.resourceType.map((item: any) => item.specialties);
      const insuranceType = props.formData.insuranceType.map((item: any) => item.insurance);
      setFormData({ ...props.formData });
      props.findNearByResources({
        address: props.formData.address,
        site: props.formData.site,
        userId: userId,
        nearByResourceFilters: {
          maxDistance: props.formData.maxDistance,
          insuranceType: insuranceType,
          fqhc: props.formData.fqhc,
          resourceType: resourceType
        }
      });
      setIsResourceNotFound(true);
    }
  }, []);

  React.useEffect(() => {
    let resourcesForMap: any[] = [];
    for (let i = 0; i < props.nearByResourceAndFieldsDTO.length; i++) {
      resourcesForMap = [
        ...resourcesForMap,
        ...props.nearByResourceAndFieldsDTO[i].patientNearByResourceDtoList
      ];
    }
    setNearByResourcesForMap(resourcesForMap);
    props.addNearByResourcesToMap(resourcesForMap, props.latLngForPatientAddress);
  }, [props.nearByResourceAndFieldsDTO]);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  React.useEffect(() => {
    props.getAllSitesAndCategories();
    props.getInsuranceAndDistance();
    props.getAllSavedSearches();
  }, []);

  const firstRenderDeleteSavedSearchError = React.useRef(true);
  React.useEffect(() => {
    if (firstRenderDeleteSavedSearchError.current) {
      firstRenderDeleteSavedSearchError.current = false;
    } else {
      if (props.deleteSavedSearchError.error === 'NoError') {
        props.getAllSavedSearches();
      }
    }
  }, [props.deleteSavedSearchError]);

  React.useEffect(() => {
    setObjectArray(props.categories);
  }, [props.categories]);

  React.useEffect(() => {
    const newObj = props.insurance.map((op, index) => {
      return { id: index, insurance: op };
    });
    setInsuranceArray(newObj);
  }, [props.insurance]);

  React.useEffect(() => {
    if (
      props.nearByResourceAndFieldsDTO != null &&
      props.nearByResourceAndFieldsDTO != [] &&
      props.nearByResourceAndFieldsDTO.length != 0
    ) {
      // setSelectedResourceCardId(props.nearByResourceAndFieldsDTO.length - 1);
      setNearByResourcesFetched(true);
    } else {
      setNearByResourcesFetched(false);
    }
  }, [props.nearByResourceAndFieldsDTO]);

  React.useEffect(() => {
    if (props.nearByResourcesError !== noErrorMessage) {
      setNearByResourcesError(false);
    }
  }, [props.nearByResourcesError]);

  const delayedQuery = React.useRef(
    debounce((addressInput: string) => {
      props.addressSuggestion(addressInput);
    }, 500)
  ).current;

  React.useEffect(() => {
    delayedQuery(addressInput);
  }, [addressInput]);

  const delayedQuerySite = React.useRef(
    debounce((siteInput: string) => {
      props.addressSuggestion(siteInput);
    }, 500)
  ).current;

  React.useEffect(() => {
    delayedQuerySite(siteInput);
  }, [siteInput]);

  const searchAddressHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressInput(e.target.value);
    setSaveSearchTitle(e.target.value);
    setFormData({ ...formData, address: e.target.value, site: '' });
  };
  const searchSiteHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiteInput(e.target.value);
    setSaveSearchTitle(e.target.value);
    setFormData({ ...formData, site: e.target.value, address: '' });
  };

  const selectChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };
  const FQHCHandleChange = (event: any) => {
    setFormData((formData) => ({ ...formData, [event.target.name]: event.target.checked }));
  };

  const addNewResourceHandler = () => {
    props.history.push({ pathname: `${props.match.url}/new` });
  };

  const findResourcesHandler = () => {
    // setStackViewOpen(false);
    setSelectedResourceCardId(-1);
    setResourceDetailsOpen(false);

    if (!formData.address && !formData.site) {
      notification.open({
        message: 'Address OR Site field is required!',
        duration: 3,
        type: 'warning'
      });
      return;
    }
    setSaveSearchTitle(formData.address || formData.site);
    setSearchID('');
    setSaveAsTrue(false);

    const resourceTypeData: any = [];

    if (formData.fqhc) {
      resourceTypeData.push('Free Clinics');
    } else {
      formData.resourceType.map((resource: any) => {
        resourceTypeData.push(resource.specialties);
        return resource.specialties;
      });
    }

    if (formData.fqhc === false && resourceTypeData.length === 0) {
      notification.open({
        message: 'Categories type is required!',
        duration: 3,
        type: 'warning'
      });
      return;
    }
    const insuranceTypeData: any = [];
    formData.insuranceType.map((resource: any) => {
      insuranceTypeData.push(resource.insurance);
      return resource.insurance;
    });

    props.findNearByResources({
      address: formData.address,
      site: formData.site,
      userId: userId,
      nearByResourceFilters: {
        maxDistance: formData.maxDistance,
        insuranceType: insuranceTypeData,
        fqhc: formData.fqhc,
        resourceType: resourceTypeData
      }
    });
    setIsResourceNotFound(true);
  };

  const handleSaveSearch = () => {
    if (!formData.address && !formData.site) {
      notification.open({
        message: 'Address OR Site field is required!',
        duration: 3,
        type: 'warning'
      });
      return;
    }

    const resourceTypeData: any = [];

    if (formData.fqhc) {
      resourceTypeData.push('Free Clinics');
    } else {
      formData.resourceType.map((resource: any) => {
        resourceTypeData.push(resource.specialties);
        return resource.specialties;
      });
    }

    if (formData.fqhc === false && resourceTypeData.length === 0) {
      notification.open({
        message: 'Categories type is required!',
        duration: 3,
        type: 'warning'
      });
      return;
    }

    const insuranceTypeData: any = [];
    formData.insuranceType.map((resource: any) => {
      insuranceTypeData.push(resource.insurance);
      return resource.insurance;
    });

    if (searchID && saveAsTrue === false) {
      // PUT call
      props.updateSaveSearch({
        address: formData.address,
        site: formData.site,
        userId: userId,
        searchId: searchID,
        title: saveSearchTitle,
        filters: [
          {
            filterName: 'insuranceType',
            value: insuranceTypeData
          },
          {
            filterName: 'maxDistance',
            value: formData.maxDistance
          },
          {
            filterName: 'fqhc',
            value: formData.fqhc
          },
          {
            filterName: 'resourceType',
            value: resourceTypeData
          }
        ]
      });
    } else {
      // POST call
      props.saveSearchResources({
        address: formData.address,
        site: formData.site,
        userId: userId,
        title: saveSearchTitle,
        filters: [
          {
            filterName: 'insuranceType',
            value: insuranceTypeData
          },
          {
            filterName: 'maxDistance',
            value: formData.maxDistance
          },
          {
            filterName: 'fqhc',
            value: formData.fqhc
          },
          {
            filterName: 'resourceType',
            value: resourceTypeData
          }
        ]
      });
    }

    setSavedSearchOpen(false);
    setTimeout(() => {
      props.getAllSavedSearches();
    }, 500);
    // props.getAllSavedSearches();
  };

  const handleSaveSearchDelete = () => {
    const ID = searchID;
    props.handleDeleteSavedSearch(ID);

    setSearchID('');
    setOpen(false);
    setDeleteSavedSearchOpen(false);
    // props.getAllSavedSearches();
  };

  const deleteSavedSearchHandler = (id: any) => {
    setDeleteSavedSearchOpen(true);
    setSearchID(id);
  };
  const deleteSavedSearchCancel = () => {
    setDeleteSavedSearchOpen(false);
    setSearchID('');
  };

  const savedSearchesHandler = (data: any) => {
    setSearchID(data.searchId);
    setSaveSearchTitle(data.title);
    const responsePayload: {
      insuranceType: any;
      maxDistance: any;
      fqhc: any;
      resourceType: any;
      categoriysList: any;
      insuranceList: any;
    } = {
      insuranceType: [],
      maxDistance: {},
      fqhc: '',
      resourceType: [],
      categoriysList: [],
      insuranceList: []
    };

    for (let i = 0; i < data.filters.length; i++) {
      if (data.filters[i].filterName === 'insuranceType') {
        responsePayload.insuranceType = data.filters[i].value;
        responsePayload.insuranceList = data.filters[i].value.map((op: any) => {
          return { id: '', insurance: op };
        });
      } else if (data.filters[i].filterName === 'maxDistance') {
        responsePayload.maxDistance = data.filters[i].value;
      } else if (data.filters[i].filterName === 'fqhc') {
        responsePayload.fqhc = data.filters[i].value;
      } else if (data.filters[i].filterName === 'resourceType') {
        responsePayload.resourceType = data.filters[i].value;
        responsePayload.categoriysList = data.filters[i].value.map((op: any) => {
          return { id: '', specialties: op };
        });
      }
    }
    if (responsePayload.fqhc == 'false') {
      responsePayload.fqhc = false;
    } else if (responsePayload.fqhc == 'true') {
      responsePayload.fqhc = true;
    }

    setFormData({
      ...formData,
      address: data.address ? data.address : '',
      site: data.site ? data.site : '',
      insuranceType: responsePayload.insuranceList,
      maxDistance: responsePayload.maxDistance,
      fqhc: responsePayload.fqhc,
      resourceType: responsePayload.categoriysList
    });

    props.findNearByResources({
      address: data.address ? data.address : '',
      site: data.site ? data.site : '',
      userId: userId,
      nearByResourceFilters: {
        maxDistance: responsePayload.maxDistance,
        insuranceType: responsePayload.insuranceType,
        fqhc: responsePayload.fqhc,
        resourceType: responsePayload.resourceType
      }
    });
    setIsResourceNotFound(true);
    setOpen(false);
  };

  const showMoreHandler = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const createSaveAs = () => {
    setSaveAsTrue(true);
  };
  const createSave = () => {
    setSaveAsTrue(false);
  };
  const handleSavedSearchOpen = () => {
    if (!formData.address && !formData.site) {
      notification.open({
        message: 'Address OR Site field is required!',
        duration: 3,
        type: 'warning'
      });
      return;
    }
    setSavedSearchOpen(true);
  };

  const handleSavedSearchClose = () => {
    setSavedSearchOpen(false);
  };

  const toggleExpandHandler = (id: number) => {
    if (id === selectedResourceCardId) {
      setSelectedResourceCardId(-1);
    } else {
      setSelectedResourceCardId(id);
    }
  };

  const resourceDetailsHandler = (resource: any) => {
    localStorage.setItem('isResourceFavourite', resource.isFav);
    localStorage.setItem('resourceNearById', resource.nearbyId);
    props.saveFormData(formData);
    props.history.push(`${props.match.url}/${resource.resourceId}`, {
      distance: resource.distance,
      resourceTravellingTime: resource.travellingTime,
      resourceType: resource.resourceType
    });
  };

  const openDeleteModal = (id: number, resourceType: string) => {
    setDeleteModalOpen(true);
    setSelectedResourceId(id);
    setResourceTypeFrDeletion(resourceType);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedResourceId(-1);
  };

  const deleteResource = () => {
    props.deleteResource(selectedResourceId, resourceTypeForDeletion);
    setDeleteModalOpen(false);
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
  };

  const onSelect = (selectedList: any, selectedItem: any) => {
    setFormData({ ...formData, resourceType: selectedList });
  };

  const onRemove = (selectedList: any, removedItem: any) => {
    setFormData({ ...formData, resourceType: selectedList });
  };
  const removeSelectedCategory = (specialties: any, index: any) => {
    // @ts-ignore
    const filteredData = formData.resourceType.filter((item) => item.specialties !== specialties);
    setFormData({ ...formData, resourceType: filteredData });
  };

  const insuranceOnSelect = (selectedList: any, selectedItem: any) => {
    setFormData({ ...formData, insuranceType: selectedList });
  };

  const insuranceOnRemove = (selectedList: any, removedItem: any) => {
    setFormData({ ...formData, insuranceType: selectedList });
  };

  let deleteSavedSearch = null;
  if (deleteSavedSearchOpen) {
    deleteSavedSearch = (
      <React.Fragment>
        <Dialog
          open={deleteSavedSearchOpen}
          disableBackdropClick
          onClose={deleteSavedSearchCancel}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            <span className={classes.SectionHeading}>Delete Search</span>
          </DialogTitle>
          <DialogContent style={{ marginTop: '25px' }}>
            <span className={classes.dialogContentStyle}>
              Do you want to delete this saved search?
            </span>
          </DialogContent>
          <DialogActions>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              style={{ marginRight: '2%' }}>
              <Button className={classes.CancelButton} onClick={deleteSavedSearchCancel}>
                <span className={classes.ShowMoreText}>Cancel</span>
              </Button>
              <Button
                variant="contained"
                className={classes.ConfirmButton}
                onClick={handleSaveSearchDelete}>
                <span className={classes.ShowMoreText} style={{ color: '#FFFFFF' }}>
                  Delete
                </span>
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }

  let dialog = null;
  if (SavedSearchOpen) {
    dialog = (
      <React.Fragment>
        <Dialog
          fullWidth={true}
          // maxWidth="md"
          open={SavedSearchOpen}
          disableBackdropClick
          onClose={handleSavedSearchClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            <span className={classes.SectionHeading}>Save search</span>
          </DialogTitle>
          <DialogContent style={{ marginTop: '25px' }}>
            <span className={classes.dialogContentStyle}>
              Do you want to rename/save this search?
            </span>
            <TextField
              id="outlined-search"
              label="Rename"
              name="title"
              value={saveSearchTitle}
              fullWidth
              type="search"
              onChange={(e) => setSaveSearchTitle(e.target.value)}
              variant="outlined"
              style={{ marginTop: '25px' }}
            />
          </DialogContent>
          <DialogActions>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              style={{ marginRight: '2%' }}>
              <Button className={classes.CancelButton} onClick={handleSavedSearchClose}>
                <span className={classes.ShowMoreText}> Cancel</span>
              </Button>
              <Button
                onClick={handleSaveSearch}
                className={classes.ConfirmButton}
                variant="contained"
                disabled={saveSearchTitle ? false : true}>
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
  let modal = null;
  if (open) {
    modal = (
      <React.Fragment>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          disableBackdropClick
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}>
          <Fade in={open}>
            <Paper className={classes.paperr}>
              <Box display="flex" alignItems="center">
                <Box flexGrow={1}>
                  <Typography variant="h4">
                    <span className={classes.SectionHeading}>Saved searches</span>
                  </Typography>
                </Box>
                <Box>
                  <IconButton onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
              <Divider className={classes.divider} />
              <Grid container spacing={2}>
                {props.savedSearchesList &&
                  props.savedSearchesList.length &&
                  props.savedSearchesList.map((id: any) => {
                    return (
                      <Tooltip key={id.id} title={id.title ? id.title : ''} placement="top">
                        <Grid container direction="column" item md={2} xs={6} sm={4} key={id}>
                          <Paper
                            className={classes.SavedSearchPaper}
                            style={{
                              backgroundColor: id.searchId === searchID ? '#AADAFF' : ''
                            }}>
                            <Row noGutters={true}>
                              <Col
                                xs={8}
                                md={10}
                                className="d-flex align-items-center justify-content-start">
                                <Typography
                                  style={{ paddingLeft: '4px' }}
                                  className={classes.TypographyTitle}
                                  onClick={() => savedSearchesHandler(id)}
                                  noWrap>
                                  {id.title ? id.title : ''}
                                </Typography>
                              </Col>
                              <Col xs={4} md={2} className="d-flex align-items-center">
                                <IconButton onClick={() => deleteSavedSearchHandler(id.searchId)}>
                                  <CloseIcon />
                                </IconButton>
                              </Col>
                            </Row>
                          </Paper>
                        </Grid>
                      </Tooltip>
                    );
                  })}
              </Grid>
              <Divider className={classes.divider} />
            </Paper>
          </Fade>
        </Modal>
      </React.Fragment>
    );
  }

  const [favouriteResources, setFavouriteResources] = React.useState([]) as any[];
  const firstRenderSaveToFavouritesError = React.useRef(true);
  const firstRenderDeleteFromFavouritesError = React.useRef(true);
  React.useEffect(() => {
    if (firstRenderSaveToFavouritesError.current) {
      firstRenderSaveToFavouritesError.current = false;
    } else {
      if (props.saveToFavouritesError.error === 'NoError') {
        const nearByResourcesOfRequiredCategory: nearByResourceAndFieldsItemType[] = nearByResourceAndFieldsDTO.filter(
          (element: any) => element.resourceType === selectedResourceTypeForFavourites
        );
        const otherResources: nearByResourceAndFieldsItemType[] = nearByResourceAndFieldsDTO.filter(
          (element: any) => element.resourceType !== selectedResourceTypeForFavourites
        );
        const filteredNearByResourcesOfRequiredCategory: nearByResourceAndFieldsItemType[] = [
          {
            ...nearByResourcesOfRequiredCategory[0],
            patientNearByResourceDtoList:
              nearByResourcesOfRequiredCategory[0] &&
              nearByResourcesOfRequiredCategory[0].patientNearByResourceDtoList.map(
                (element: any) => {
                  const isFav = element.isFav;
                  if (element.resourceId === selectedIdForFavourites) {
                    return { ...element, isFav: !isFav };
                  } else {
                    return element;
                  }
                }
              )
          }
        ];
        const filteredResources: nearByResourceAndFieldsItemType[] = [
          ...filteredNearByResourcesOfRequiredCategory,
          ...otherResources
        ];

        let favouritesResources: any[] = [];
        // let id = 0;
        filteredResources.map((nearByResourceAndFieldsItem: nearByResourceAndFieldsItemType) => {
          nearByResourceAndFieldsItem.patientNearByResourceDtoList &&
            nearByResourceAndFieldsItem.patientNearByResourceDtoList.map((resource: any) => {
              if (resource.isFav) {
                console.log(resource.resourceId);
                favouritesResources = [...favouritesResources, resource];
              }
            });
        });

        setFavouriteResources(favouritesResources);
        setNearByResourceAndFieldsDTO(filteredResources);
        setSelectedResourceTypeForFavourites('');
        setSelectedIdForFavourites(-1);
      }
    }
  }, [props.saveToFavouritesError]);

  React.useEffect(() => {
    if (firstRenderDeleteFromFavouritesError.current) {
      firstRenderDeleteFromFavouritesError.current = false;
    } else {
      if (props.deleteFromFavouritesError.error === 'NoError') {
        const nearByResourcesOfRequiredCategory: nearByResourceAndFieldsItemType[] = nearByResourceAndFieldsDTO.filter(
          (element: any) => element.resourceType === selectedResourceTypeForFavourites
        );
        const otherResources: nearByResourceAndFieldsItemType[] = nearByResourceAndFieldsDTO.filter(
          (element: any) => element.resourceType !== selectedResourceTypeForFavourites
        );
        const filteredNearByResourcesOfRequiredCategory: nearByResourceAndFieldsItemType[] = [
          {
            ...nearByResourcesOfRequiredCategory[0],
            patientNearByResourceDtoList:
              nearByResourcesOfRequiredCategory[0] &&
              nearByResourcesOfRequiredCategory[0].patientNearByResourceDtoList.map(
                (element: any) => {
                  const isFav = element.isFav;
                  if (element.resourceId === selectedIdForFavourites) {
                    return { ...element, isFav: !isFav };
                  } else {
                    return element;
                  }
                }
              )
          }
        ];
        const filteredResources: nearByResourceAndFieldsItemType[] = [
          ...filteredNearByResourcesOfRequiredCategory,
          ...otherResources
        ];

        let favouritesResources: any[] = [];
        filteredResources.map((nearByResourceAndFieldsItem: nearByResourceAndFieldsItemType) => {
          nearByResourceAndFieldsItem.patientNearByResourceDtoList &&
            nearByResourceAndFieldsItem.patientNearByResourceDtoList.map((resource: any) => {
              if (resource.isFav) {
                favouritesResources = [...favouritesResources, resource];
              }
            });
        });
        setFavouriteResources(favouritesResources);
        setNearByResourceAndFieldsDTO(filteredResources);
        setSelectedResourceTypeForFavourites('');
        setSelectedIdForFavourites(-1);
      }
    }
  }, [props.deleteFromFavouritesError]);

  const [nearByResourceAndFieldsDTO, setNearByResourceAndFieldsDTO] = React.useState(
    props.nearByResourceAndFieldsDTO
  );
  const [selectedResourceTypeForFavourites, setSelectedResourceTypeForFavourites] = React.useState(
    ''
  );

  const [selectedIdForFavourites, setSelectedIdForFavourites] = React.useState(-1);
  React.useEffect(() => {
    setNearByResourceAndFieldsDTO(props.nearByResourceAndFieldsDTO);
    let favouriteResources: any[] = [];
    props.nearByResourceAndFieldsDTO.map(
      (nearByResourceAndFieldsItem: nearByResourceAndFieldsItemType) => {
        nearByResourceAndFieldsItem.patientNearByResourceDtoList.map((resource: any) => {
          if (resource.isFav) {
            favouriteResources = [...favouriteResources, resource];
          }
        });
      }
    );
    setFavouriteResources(favouriteResources);
  }, [props.nearByResourceAndFieldsDTO]);

  const likeButtonClickHandler = (resource: any) => {
    setSelectedResourceTypeForFavourites(resource.resourceType);
    setSelectedIdForFavourites(resource.resourceId);
    console.log(resource.isFav, resource.nearById);
    if (resource.isFav) {
      props.deleteFromFavouriteResources({ nearById: resource.nearbyId, userId: userId });
    } else {
      props.saveToFavoriteResources({ nearById: resource.nearbyId, userId: userId });
    }
  };

  const [isFavouritesExpanded, setFavouritesExpanded] = React.useState(false);
  const toggleFavouritesHandler = () => {
    setFavouritesExpanded(!isFavouritesExpanded);
  };

  if (props.nearByResourcesLoading || props.savedSearchesLoading) {
    return (
      <div>
        <CircularProgressOverlay />
      </div>
    );
  } else {
    return (
      <div>
        <div className={classes.userInputWrapper}>
          <Grid className={classes.GridSpace}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={6}
                sm={4}
                md={12}
                container
                direction="row"
                justify="flex-end"
                alignItems="center">
                <Button
                  variant="contained"
                  className={classes.addResourceButton}
                  onClick={addNewResourceHandler}>
                  <span className={classes.addResourceText}>Add Resources</span>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.GridSpace}>
            <Typography className={classes.Heading}>
              <img className={classes.IconStyle} src={FilterIcon} alt="Search Icon" />
              <span className={classes.SectionHeading}>Saved searches</span>
            </Typography>{' '}
            {props.savedSearchesList && props.savedSearchesList.length ? (
              <Grid container spacing={2} className={classes.GridSpace}>
                {props.savedSearchesList &&
                  props.savedSearchesList.length &&
                  props.savedSearchesList.slice(0, 11).map((id: any) => {
                    return (
                      <Tooltip key={id.id} title={id.title ? id.title : ''} placement="top">
                        <Grid container direction="column" item xs={6} sm={4} md={2} key={id}>
                          <Paper
                            className={classes.SavedSearchPaper}
                            style={{ backgroundColor: id.searchId === searchID ? '#AADAFF' : '' }}>
                            <Row noGutters={true}>
                              <Col
                                xs={8}
                                md={10}
                                className="d-flex align-items-center justify-content-start">
                                <Typography
                                  style={{ paddingLeft: '4px' }}
                                  className={classes.TypographyTitle}
                                  onClick={() => savedSearchesHandler(id)}
                                  noWrap>
                                  {id.title ? id.title : ''}
                                </Typography>
                              </Col>
                              <Col xs={4} md={2} className="d-flex align-items-center">
                                <IconButton onClick={() => deleteSavedSearchHandler(id.searchId)}>
                                  <CloseIcon />
                                </IconButton>
                              </Col>
                            </Row>
                          </Paper>
                        </Grid>
                      </Tooltip>
                    );
                  })}

                {props.savedSearchesList && props.savedSearchesList.length > 11 ? (
                  <Grid
                    item
                    xs={6}
                    sm={2}
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center">
                    <Button className={classes.SaveSearchAsButton} onClick={showMoreHandler}>
                      <span className={classes.SaveSearchAsText}> Show more</span>
                    </Button>
                  </Grid>
                ) : (
                  ''
                )}
              </Grid>
            ) : (
              <Grid container spacing={2}>
                <Typography variant="h5" style={{ margin: 'auto' }}>
                  <span className={classes.resourceMessage}>
                    <span className={classes.searchHeading}>
                      Any saved searches will appear here !
                    </span>
                  </span>
                </Typography>
              </Grid>
            )}
          </Grid>
          <Grid className={classes.GridSpace}>
            <Typography className={classes.Heading}>
              <img
                className={classes.IconStyle}
                src={SearchIcon}
                alt="Filter Icon"
                style={{ width: '25px', marginRight: '1.6rem' }}
              />
              <span className={classes.SectionHeading}>New search</span>
            </Typography>
            <Grid container spacing={2} className={classes.GridSpace}>
              <Grid item xs={6} sm={6} className={classes.muiPlacesAutocompleteWrapper}>
                <label htmlFor="address" className={classes.inputFieldLabel}>
                  Address
                </label>
                <MUIPlacesAutocomplete
                  onSuggestionSelected={(result: { description: string }) => {
                    const { description } = result;
                    setSaveSearchTitle(description);
                    setFormData((formData) => ({
                      ...formData,
                      address: description,
                      site: ''
                    }));
                  }}
                  textFieldProps={{
                    className: classes.textFieldStyle,
                    defaultValue: 'Normal',
                    variant: 'outlined',
                    required: true,
                    placeholder: 'Search Address',
                    onChange: searchAddressHandler,
                    value: formData.address
                  }}
                  renderTarget={() => <div />}
                />
              </Grid>
              <Grid item xs={6} sm={6} className={classes.muiPlacesAutocompleteWrapper}>
                <label htmlFor="site" className={classes.inputFieldLabel}>
                  Site
                </label>
                <TextField
                  className={classes.textFieldStyle}
                  label="Or type patients site"
                  name="site"
                  defaultValue="Normal"
                  variant="outlined"
                  select
                  value={formData.site}
                  onChange={searchSiteHandler}>
                  {props.sites &&
                    props.sites.map((site: any, i: any) => (
                      <MenuItem value={site.site} key={i.id}>
                        <span className={classes.textFieldInputValue}>
                          {site.site ? site.site : ''}
                        </span>
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.GridSpace}>
            <Typography className={classes.HeadingFilter}>
              <span className={classes.inputFieldLabel}>Filters</span>
            </Typography>{' '}
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <Multiselect
                  style={{
                    multiselectContainer: {
                      backgroundColor: '#FFF',
                      width: '100%',
                      boxShadow: '0px 0px 6px #00000029',
                      border: '1px solid #ECECEC'
                    },
                    chips: {
                      background: ' #FFFFFF 0% 0% no-repeat padding-box',
                      boxShadow: '0px 0px 2px #00000029',
                      border: '1px solid #ECECEC',
                      borderRadius: '40px',
                      opacity: '1',
                      color: '#323648',
                      font: '400 18px "FuturaMediumBT"'
                    },
                    searchBox: {
                      padding: '12px 10px'
                    }
                  }}
                  placeholder="Insurance Type"
                  options={insuranceArray}
                  displayValue="insurance"
                  showCheckbox={true}
                  selectedValues={formData.insuranceType}
                  closeIcon="close"
                  avoidHighlightFirstOption
                  onSelect={insuranceOnSelect}
                  onRemove={insuranceOnRemove}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  className={classes.textFieldStyle}
                  label="Max distance"
                  name="maxDistance"
                  defaultValue="Normal"
                  variant="outlined"
                  select
                  value={formData.maxDistance}
                  onChange={selectChangeHandler}>
                  {props.distance &&
                    props.distance.map((distance: any, i: any) => (
                      <MenuItem value={distance} key={i.id}>
                        <span className={classes.textFieldInputValue}>
                          {distance ? distance : ''}
                        </span>
                        {' miles'}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper className={classes.FQHCInputStyle}>
                  <Row noGutters={true}>
                    <Col xs={8} md={10} className="d-flex align-items-center justify-content-start">
                      <Typography className={classes.FQHCTextSize} noWrap>
                        FQHC
                      </Typography>
                    </Col>
                    <Col xs={4} md={2} className="d-flex align-items-center justify-content-start">
                      <FormControlLabel
                        className={classes.FQHCTextSize}
                        checked={formData.fqhc}
                        onChange={FQHCHandleChange}
                        name="fqhc"
                        style={{ textAlign: 'left' }}
                        value={formData.fqhc}
                        control={<Checkbox style={{ color: '#4491E0' }} />}
                        label=""
                        labelPlacement="start"
                      />
                    </Col>
                  </Row>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          {formData.fqhc == false && (
            <Grid className={classes.GridSpace}>
              <Typography className={classes.HeadingFilter}>
                <span className={classes.inputFieldLabel}>Categories</span>
              </Typography>{' '}
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6}>
                  <Multiselect
                    style={{
                      multiselectContainer: {
                        backgroundColor: '#FFF',
                        width: '100%',
                        boxShadow: '0px 0px 6px #00000029',
                        border: '1px solid #ECECEC'
                      },
                      chips: {
                        background: ' #FFFFFF 0% 0% no-repeat padding-box',
                        boxShadow: '0px 0px 2px #00000029',
                        border: '1px solid #ECECEC',
                        borderRadius: '40px',
                        opacity: '1',
                        color: '#323648',
                        font: '400 18px "FuturaMediumBT"'
                      },
                      searchBox: {
                        padding: '14px 10px'
                      }
                    }}
                    placeholder="Categories Search"
                    options={objectArray}
                    displayValue="specialties"
                    showCheckbox={true}
                    selectedValues={formData.resourceType}
                    closeIcon="close"
                    avoidHighlightFirstOption
                    onSelect={onSelect}
                    onRemove={onRemove}
                  />
                </Grid>

                <Grid
                  item
                  xs={6}
                  sm={6}
                  container
                  spacing={2}
                  classes={{
                    root: classes.leftColumn
                  }}>
                  {formData.resourceType && formData.resourceType.length
                    ? formData.resourceType.map((currentValue: any, index: any) => {
                        return (
                          <Grid container direction="column" item xs={12} sm={6} md={6} key={''}>
                            <Paper className={classes.SelectedCategories}>
                              <Row noGutters={true}>
                                <Col
                                  xs={8}
                                  md={10}
                                  className="d-flex align-items-center justify-content-start">
                                  <Typography className={classes.TypographyTitle} noWrap>
                                    {currentValue.specialties ? currentValue.specialties : ''}
                                  </Typography>
                                </Col>
                                <Col
                                  xs={4}
                                  md={2}
                                  className="d-flex align-items-center"
                                  style={{ justifyContent: 'flex-end' }}>
                                  <IconButton
                                    onClick={() =>
                                      removeSelectedCategory(currentValue.specialties, index)
                                    }>
                                    <CloseIcon />
                                  </IconButton>
                                </Col>
                              </Row>
                            </Paper>
                          </Grid>
                        );
                      })
                    : ''}
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid className={classes.GridSpace}>
            <Grid container spacing={2}>
              <Grid item md={12} sm={12} xs={12}></Grid>
              <Grid
                item
                md={12}
                sm={12}
                xs={12}
                container
                direction="row"
                justify="flex-end"
                alignItems="center">
                <Button
                  className={classes.SaveSearchAsButton}
                  onClick={() => {
                    handleSavedSearchOpen();
                    createSaveAs();
                  }}>
                  <span className={classes.SaveSearchAsText}> Save Search As</span>
                </Button>
                <Button
                  className={classes.SaveSearchAsButton}
                  style={{ marginLeft: '30px' }}
                  onClick={() => {
                    handleSavedSearchOpen();
                    createSave();
                  }}>
                  <span className={classes.SaveSearchAsText}> Save Search</span>
                </Button>
                <Button
                  className={classes.SaveSearchAsButton}
                  style={{ backgroundColor: '#4491E0', marginLeft: '30px' }}
                  variant="contained"
                  onClick={findResourcesHandler}>
                  <span className={classes.SaveSearchAsText} style={{ color: '#FFFFFF' }}>
                    Search
                  </span>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/* Google Map Integration */}
          <Divider className={classes.divider} />
          <Grid className={classes.GridSpace}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} style={{ height: '32rem' }}>
                {isNearByResourcesFetched ? (
                  <>
                    <div className={classes.resourceListWrapper}>
                      {/* <Typography variant="h6">
                        Below are the resources for selected categories
                      </Typography> */}
                      <Card
                        elevation={0}
                        className={classes.gridListWrapper}
                        style={{ marginBottom: '10px' }}>
                        <CardHeader
                          className={classes.cardHeaderStyle}
                          title={
                            <Typography className={classes.Heading}>
                              <img
                                className={classes.IconStyle}
                                src={IconPharmacy}
                                alt="IconPharmacy"
                              />
                              Favourite Resources
                            </Typography>
                          }
                          action={
                            <IconButton onClick={toggleFavouritesHandler}>
                              <ExpandMoreIcon />
                            </IconButton>
                          }>
                          <hr color="#3366ff" />
                        </CardHeader>
                        <Collapse in={isFavouritesExpanded} unmountOnExit style={{ width: '100%' }}>
                          <CardContent>
                            <>
                              {favouriteResources.length === 0 || favouriteResources === null ? (
                                <Typography style={{ fontWeight: 800 }}>
                                  There are no favourite resources
                                </Typography>
                              ) : (
                                <GridList
                                  id="gridList"
                                  ref={gridListEl}
                                  className={classes.gridList}
                                  cols={3}>
                                  {favouriteResources.map((resource: any, index: number) => {
                                    return (
                                      <GridListTile
                                        style={{ height: '6rem', width: '100%' }}
                                        className={classes.gridListItem}
                                        classes={{ tile: classes.tileStyling }}
                                        key={index}>
                                        <div
                                          className={classes.resourceCardStyle}
                                          style={{
                                            borderBottom: '0.1px solid black'
                                          }}>
                                          <div style={{ display: 'block' }}>
                                            <Typography style={{ fontWeight: 600 }}>
                                              {resource.name}
                                            </Typography>
                                            <div
                                              style={{
                                                float: 'right',
                                                display: 'flex'
                                              }}>
                                              <img
                                                className={classes.resourceCardIconStyle}
                                                src={
                                                  resource.isFav ? FilledHeartIcon : EmptyHeartIcon
                                                }
                                                // src={FilledHeartIcon}
                                                alt="EmptyHeartIcon"
                                                onClick={() => likeButtonClickHandler(resource)}
                                              />
                                              <img
                                                className={classes.resourceCardIconStyle}
                                                src={MetroEyeIcon}
                                                onClick={() => resourceDetailsHandler(resource)}
                                                alt="MetroEyeIcon"
                                              />
                                              {/* <img
                                              className={classes.resourceCardIconStyle}
                                              src={DeleteIcon}
                                              onClick={() =>
                                                openDeleteModal(
                                                  resource.resourceId,
                                                  resource.resourceType
                                                )
                                              }
                                              alt="DeleteIcon"
                                            /> */}
                                            </div>
                                          </div>
                                          <span className={classes.resourceAddress}>
                                            {resource.address}
                                          </span>
                                          <img
                                            className={classes.distanceIconStyle}
                                            src={DistanceIcon}
                                            alt="distance"></img>
                                          <span className={classes.distanceStyle}>
                                            {resource.distance || '0'} miles
                                          </span>
                                        </div>
                                      </GridListTile>
                                    );
                                  })}
                                </GridList>
                              )}
                            </>
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
                          </CardContent>
                        </Collapse>
                      </Card>
                      {nearByResourceAndFieldsDTO &&
                        nearByResourceAndFieldsDTO.map(
                          (
                            nearByResourceAndFieldsItem: nearByResourceAndFieldsItemType,
                            index: number
                          ) => {
                            return (
                              <Card
                                elevation={0}
                                key={index}
                                className={classes.gridListWrapper}
                                style={{ marginBottom: '10px' }}>
                                <CardHeader
                                  className={classes.cardHeaderStyle}
                                  title={
                                    <Typography className={classes.Heading}>
                                      <img
                                        className={classes.IconStyle}
                                        src={IconPharmacy}
                                        alt="IconPharmacy"
                                      />
                                      {nearByResourceAndFieldsItem.resourceType}
                                    </Typography>
                                  }
                                  action={
                                    <IconButton onClick={() => toggleExpandHandler(index)}>
                                      <ExpandMoreIcon />
                                    </IconButton>
                                  }>
                                  <hr color="#3366ff" />
                                </CardHeader>
                                <Collapse
                                  in={index === selectedResourceCardId}
                                  unmountOnExit
                                  style={{ width: '100%' }}>
                                  <CardContent>
                                    <GridList
                                      id="gridList"
                                      ref={gridListEl}
                                      className={classes.gridList}
                                      cols={3}>
                                      {nearByResourceAndFieldsItem.patientNearByResourceDtoList ===
                                        [] ||
                                      nearByResourceAndFieldsItem.patientNearByResourceDtoList ===
                                        null ? (
                                        <Skeleton />
                                      ) : (
                                        nearByResourceAndFieldsItem.patientNearByResourceDtoList.map(
                                          (resource: any, index: number) => {
                                            return (
                                              <GridListTile
                                                style={{ height: '6rem', width: '100%' }}
                                                className={classes.gridListItem}
                                                classes={{ tile: classes.tileStyling }}
                                                key={index}>
                                                <div
                                                  className={classes.resourceCardStyle}
                                                  style={{
                                                    borderBottom: '0.1px solid black'
                                                  }}>
                                                  <div style={{ display: 'block' }}>
                                                    <Typography style={{ fontWeight: 600 }}>
                                                      {resource.name}
                                                    </Typography>
                                                    <div
                                                      style={{
                                                        float: 'right',
                                                        display: 'flex'
                                                      }}>
                                                      <img
                                                        className={classes.resourceCardIconStyle}
                                                        src={
                                                          resource.isFav
                                                            ? FilledHeartIcon
                                                            : EmptyHeartIcon
                                                        }
                                                        // src={FilledHeartIcon}
                                                        alt="EmptyHeartIcon"
                                                        onClick={() =>
                                                          likeButtonClickHandler(resource)
                                                        }
                                                      />
                                                      <img
                                                        className={classes.resourceCardIconStyle}
                                                        src={MetroEyeIcon}
                                                        onClick={() =>
                                                          resourceDetailsHandler(resource)
                                                        }
                                                        alt="MetroEyeIcon"
                                                      />
                                                      <img
                                                        className={classes.resourceCardIconStyle}
                                                        src={DeleteIcon}
                                                        onClick={() =>
                                                          openDeleteModal(
                                                            resource.resourceId,
                                                            resource.resourceType
                                                          )
                                                        }
                                                        alt="DeleteIcon"
                                                      />
                                                    </div>
                                                  </div>
                                                  <span className={classes.resourceAddress}>
                                                    {resource.address}
                                                  </span>
                                                  <img
                                                    className={classes.distanceIconStyle}
                                                    src={DistanceIcon}
                                                    alt="distance"></img>
                                                  <span className={classes.distanceStyle}>
                                                    {resource.distance || '0'} miles
                                                  </span>
                                                </div>
                                              </GridListTile>
                                            );
                                          }
                                        )
                                      )}
                                    </GridList>
                                    <Dialog
                                      fullWidth={true}
                                      open={isDeleteModalOpen}
                                      onClose={closeDeleteModal}
                                      aria-labelledby="alert-dialog-title"
                                      aria-describedby="alert-dialog-description">
                                      <>
                                        <DialogTitle id="form-dialog-title">
                                          <span className={classes.SectionHeading}>
                                            Delete Resource ?
                                          </span>
                                        </DialogTitle>
                                        <DialogContent>
                                          <DialogContentText
                                            id="alert-dialog-description"
                                            style={{ marginTop: '25px' }}>
                                            <span className={classes.dialogContentStyle}>
                                              Do you want to delete this resource ?
                                            </span>
                                          </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                          <Grid
                                            container
                                            direction="row"
                                            justify="flex-end"
                                            alignItems="center"
                                            style={{ marginRight: '2%' }}>
                                            <Button
                                              className={classes.CancelButton}
                                              onClick={cancelDelete}>
                                              <span className={classes.ShowMoreText}>Cancel</span>
                                            </Button>
                                            <Button
                                              variant="contained"
                                              className={classes.ConfirmButton}
                                              onClick={deleteResource}>
                                              <span
                                                className={classes.ShowMoreText}
                                                style={{ color: '#FFFFFF' }}>
                                                Delete
                                              </span>
                                            </Button>
                                          </Grid>
                                        </DialogActions>
                                      </>
                                    </Dialog>
                                  </CardContent>
                                </Collapse>
                              </Card>
                            );
                          }
                        )}
                    </div>
                  </>
                ) : (
                  <Card>
                    <Row noGutters={true}>
                      <Col className="d-flex align-items-center justify-content-center p-3">
                        <Typography>
                          {isResourceNotFound === true &&
                          props.nearByResourceAndFieldsDTO.length === 0 ? (
                            <span className={classes.searchHeading}>
                              Resources matching these criteria not available
                            </span>
                          ) : (
                            <span className={classes.searchHeading}>
                              Start a search to see results here
                            </span>
                          )}
                        </Typography>{' '}
                      </Col>
                    </Row>
                  </Card>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={8}>
                <GoogleMapsComponent
                  nearByResources={nearByResourcesForMap}
                  latLngForPatientAddress={props.latLngForPatientAddress}
                />
              </Grid>
            </Grid>
          </Grid>
          {modal}
          {dialog}
          {deleteSavedSearch}
        </div>
      </div>
    );
  }
};

export default Resources;
