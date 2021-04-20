import React from 'react';
import { Typography, TextField, Link, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import BackIcon from '../../../../../assets/svg/Icon material-keyboard-backspace.svg';
import ConfirmationDialog from '../../../../../common-components/confirmationDialog';

const useStyles = makeStyles(() => ({
  resourceCardIconStyle: {
    height: '1rem',
    width: '1rem',
    marginRight: '0.4rem',
    cursor: 'pointer'
  },
  editCardWrapper: {
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
  nameInputStyle: {
    fontWeight: 800
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
  },
  labelStyle: {
    color: '#999999'
  },
  fieldValueStyle: {
    color: '#323648'
  }
}));

interface MatchParams {
  match: {
    params: {
      id: string;
    };
  };
}

interface DispatchProps {
  getResourceDetails: (id: string | undefined) => void;
  screenOpenHandler: (value: string) => void;
  saveResourceDetails: (id: string | undefined, resourceDetails: any) => void;
  resource: Record<string, string>;
  uiFields: any;
  spId: number;
  saveError: { error: string };
  stackCardViewHandler: (value: boolean) => void;
  idAfterUpdate: string;
  history: any;
}

type Props = DispatchProps & MatchParams;

const EditView: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  React.useEffect(() => {
    props.stackCardViewHandler(false);
  }, []);

  const [resourceDetails, setResourceDetails] = React.useState(props.resource);
  const [duplicateResourceDetails, setDuplicateResourceDetails] = React.useState(resourceDetails);

  React.useEffect(() => {
    console.log(props.resource);
    setResourceDetails(props.resource);
    setDuplicateResourceDetails(props.resource);
  }, [props.resource]);

  React.useEffect(() => {
    console.log(
      duplicateResourceDetails.name,
      resourceDetails.name,
      duplicateResourceDetails === resourceDetails
    );
  }, [resourceDetails]);

  const extraResourceFields = {
    spId: props.match.params.id.toString(),
    siteId: 1,
    resourceType: props.resource.resourceType
  };

  // let filteredWorkingHours = props.resource.workingHrs.replace('"Office hours: | ', '');
  // filteredWorkingHours = filteredWorkingHours.replaceAll('â€“', '-');
  // const [workingHours, setWorkingHours] = React.useState(filteredWorkingHours);

  const [workingHours, setWorkingHours] = React.useState(props.resource.workingHrs);
  const workingHoursChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setWorkingHours(e.target.value);
    setResourceDetails({ ...resourceDetails, workingHrs: e.target.value });
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setResourceDetails({ ...resourceDetails, [name]: value });
  };

  const [isCancelConfirmationDialogOpen, setCancelConfirmationDialogOpen] = React.useState(false);

  const saveResourceDetailsHandler = () => {
    console.log({
      ...resourceDetails,
      ...extraResourceFields
    });
    props.saveResourceDetails(props.match.params.id.toString(), {
      ...resourceDetails,
      ...extraResourceFields
    });
  };

  const firstRenderIdAfterUpdate = React.useRef(true);
  const firstRenderSaveError = React.useRef(true);

  const [idAfterUpdate, setIdAfterUpdate] = React.useState('');
  React.useEffect(() => {
    if (firstRenderIdAfterUpdate.current) {
      firstRenderIdAfterUpdate.current = false;
    } else {
      if (props.match.params.id.toString() === idAfterUpdate) {
        props.getResourceDetails(props.match.params.id.toString());
      } else if (idAfterUpdate !== '') {
        props.getResourceDetails(idAfterUpdate);
        props.history.replace(`/user/resources/${idAfterUpdate}`);
      }
    }
  }, [idAfterUpdate]);

  React.useEffect(() => {
    if (firstRenderSaveError.current) {
      firstRenderSaveError.current = false;
    } else {
      if (props.saveError.error === 'NoError') {
        setIdAfterUpdate(props.idAfterUpdate);
      }
    }
  }, [props.saveError]);

  const cancelHandler = () => {
    if (duplicateResourceDetails !== resourceDetails) {
      setCancelConfirmationDialogOpen(true);
    } else {
      props.screenOpenHandler('detailsView');
    }
  };

  const backHandler = () => {
    console.log(duplicateResourceDetails !== resourceDetails);
    if (duplicateResourceDetails !== resourceDetails) {
      setCancelConfirmationDialogOpen(true);
    } else {
      props.screenOpenHandler('detailsView');
    }
  };

  const confirmationDialogHandler = (value: boolean) => {
    if (value) {
      setResourceDetails(duplicateResourceDetails);
      setWorkingHours(props.resource.workingHrs);
      props.screenOpenHandler('detailsView');
    }
    setCancelConfirmationDialogOpen(false);
  };

  const textFieldInputs = ['name', 'address', 'infoFound', 'phoneNo', 'workingHrs'];
  return (
    <div className={classes.editCardWrapper}>
      <div
        style={{
          width: '100%',
          padding: '0.5rem',
          height: '2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <Link style={{ display: 'inline' }} onClick={backHandler}>
          <img src={BackIcon} alt="back" />
          Back
        </Link>
        <div style={{ float: 'right', marginRight: '10px' }}>
          <Button style={{ marginRight: '20px', padding: '0' }} onClick={cancelHandler}>
            Cancel
          </Button>
          <Button style={{ padding: '0', color: '#007EFF' }} onClick={saveResourceDetailsHandler}>
            Save
          </Button>
        </div>
      </div>
      <hr color="#3366ff" style={{ width: '100%', margin: '0' }} />
      <div
        style={{ padding: '0.5rem', overflow: 'auto', height: '80vh', width: '100%' }}
        className={classes.fieldsWrapper}>
        <TextField
          style={{ width: '100%', marginBottom: '10px' }}
          label="Name"
          name="name"
          value={resourceDetails.name}
          onChange={inputChangeHandler}
          InputProps={{
            classes: { input: classes.nameInputStyle }
          }}
        />
        <TextField
          style={{ width: '100%', marginBottom: '10px' }}
          label="Address"
          name="address"
          value={resourceDetails.address}
          onChange={inputChangeHandler}
        />
        <TextField
          style={{ width: '100%', marginBottom: '10px' }}
          label="Phone Numbers"
          name="phoneNo"
          value={resourceDetails.phoneNo}
          onChange={inputChangeHandler}
        />
        <TextField
          style={{ width: '100%', marginBottom: '10px' }}
          label="Website Address"
          name="infoFound"
          value={resourceDetails.infoFound}
          onChange={inputChangeHandler}
        />
        <div>
          <label className={classes.labelStyle} htmlFor={'workingHrs'}>
            {'Working Hours'}
          </label>
          <TextField
            style={{ width: '100%', marginBottom: '10px' }}
            // classes= {{label: classes.fieldValueStyle}}
            variant="outlined"
            multiline
            name={'workingHrs'}
            value={workingHours}
            onChange={workingHoursChangeHandler}
          />
        </div>

        {props.uiFields &&
          props.uiFields.length &&
          props.uiFields.map((resource: any, index: any) => {
            if (!textFieldInputs.includes(resource.columnType)) {
              return (
                <div>
                  <label className={classes.labelStyle} htmlFor={resource.columnName}>
                    {resource.columnName}
                  </label>
                  <TextField
                    style={{ width: '100%', marginBottom: '10px' }}
                    variant="outlined"
                    multiline
                    name={resource.columnType}
                    value={resourceDetails[resource.columnType]}
                    onChange={inputChangeHandler}
                  />
                </div>
              );
            }
          })}

        {/* {Object.entries(props.resource).map((prop: string[]) => {
          if (!textFieldInputs.includes(prop[0])) {
            return (
              <div>
                <label className={classes.labelStyle} htmlFor={prop[0]}>
                  {prop[0]}
                </label>
                <TextField
                  style={{ width: '100%', marginBottom: '10px' }}
                  variant="outlined"
                  multiline
                  name={prop[0]}
                  value={resourceDetails[prop[0]]}
                  onChange={inputChangeHandler}
                />
              </div>
            );
          }
        })} */}
        {isCancelConfirmationDialogOpen ? (
          <ConfirmationDialog
            confirmationDialogHandler={confirmationDialogHandler}
            open={isCancelConfirmationDialogOpen}
            text="Do you want to discard the changes ?"
          />
        ) : null}
      </div>
    </div>
  );
};

export default EditView;
