import React from 'react';
import { Typography, TextField, Link, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { notification } from 'antd';

import BackIcon from '../../../../../assets/svg/Icon material-keyboard-backspace.svg';
import LocationIcon from '../../../../../assets/svg/Icon metro-location.svg';
import CallIcon from '../../../../../assets/svg/Icon zocial-call.svg';
import GlobeIcon from '../../../../../assets/svg/Icon feather-globe.svg';
import TimeIcon from '../../../../../assets/svg/Icon ionic-md-time.svg';

const useStyles = makeStyles(() => ({
  resourceCardIconStyle: {
    height: '1rem',
    width: '1rem',
    marginRight: '0.4rem',
    cursor: 'pointer'
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
  fieldIconStyle: {
    marginRight: '0.5rem',
    height: '1rem',
    width: '1rem'
  }
}));

interface Props {
  getResourceDetails: (id: string | undefined) => void;
  screenOpenHandler: (value: string) => void;
  resource: Record<string, string>;
  addResourceToStack: (stackDetails: stackDetailsType) => void;
  location: any;
  spId: number;
  emailSmsSectionViewHandler: (value: boolean) => void;
  stackCardViewHandler: (value: boolean) => void;
  stackList: stackDetailsType[];
}

export interface stackDetailsType {
  name: string;
  resourceType: any;
  resourceId: any;
  address: string;
  workingHours: string;
  phoneNumber: string;
  distance: string;
  info: string;
  comments: string;
}

const StackView: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  React.useEffect(() => {
    props.stackCardViewHandler(true);
  }, []);
  const [comments, setComments] = React.useState('');
  const commentsChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setComments(event.target.value);
  };

  // let filteredWorkingHours = props.resource.workingHrs.replace('"Office hours: | ', '');
  // filteredWorkingHours = filteredWorkingHours.replaceAll('â€“', '-');
  // const workingHours = filteredWorkingHours.split('|  |');
  // const workingHoursArray = workingHours[0].split('|');
  const stackHandler = () => {
    const stackDetails: stackDetailsType = {
      name: props.resource.name,
      resourceType: props.resource.resourceType,
      resourceId: props.resource.resourceId,
      address: props.resource.address,
      // workingHours: filteredWorkingHours,
      workingHours: props.resource.workingHrs,
      distance: props.resource.distance,
      info: props.resource.infoFound,
      comments: comments,
      phoneNumber: props.resource.phoneNo
    };
    let isResourceAlreadyInStack = false;
    const stackNamesList = props.stackList && props.stackList.map((item: any) => item.name);

    if (stackNamesList.includes(props.resource.name)) {
      isResourceAlreadyInStack = true;
    }
    if (!isResourceAlreadyInStack) {
      props.emailSmsSectionViewHandler(true);
      props.addResourceToStack(stackDetails);
      props.screenOpenHandler('stackListView');
    } else {
      notification.info({ message: 'This Resource already exists in Stack', duration: 3 });
    }
  };

  const backHandler = () => {
    props.screenOpenHandler('detailsView');
    props.emailSmsSectionViewHandler(false);
  };

  return (
    <div className={classes.detailsCardWrapper}>
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
        <div style={{ float: 'right', display: 'flex', marginRight: '10px' }}>
          <Button onClick={stackHandler} style={{ color: '#007EFF', padding: '0px' }}>
            Add to Stack
          </Button>
        </div>
      </div>
      <hr color="#3366ff" style={{ width: '100%', margin: '0' }} />
      <div
        style={{
          width: '100%',
          overflow: 'auto',
          padding: '0.5rem',
          height: '80vh'
        }}
        className={classes.fieldsWrapper}>
        <div className={classes.fieldStyle}>
          <Typography style={{ fontWeight: 800 }}>{props.resource.name}</Typography>
        </div>
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
        <div className={classes.fieldStyle}>
          <img className={classes.fieldIconStyle} src={CallIcon} alt="phone number" />
          <span>{props.resource.phoneNo}</span>
        </div>
        <div className={classes.fieldStyle}>
          <img className={classes.fieldIconStyle} src={GlobeIcon} alt="infoFound" />
          <span>{props.resource.infoFound}</span>
        </div>
        <div className={classes.fieldStyle}>
          <img className={classes.fieldIconStyle} src={TimeIcon} alt="Working hours" />
          <span style={{ color: '#999999' }}>Working Hours</span>
          {/* {workingHoursArray.map((hours: string) => (
            <span key={hours} style={{ display: 'block' }}>
              {hours}
            </span>
          ))} */}
          <div>{props.resource.workingHrs}</div>
        </div>
        <div className={classes.fieldStyle}>
          <label htmlFor={'comments'}>{'Comments'}</label>
          <TextField
            style={{ width: '100%', marginBottom: '10px' }}
            variant="outlined"
            multiline
            name="comments"
            value={comments}
            onChange={commentsChangeHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default StackView;
