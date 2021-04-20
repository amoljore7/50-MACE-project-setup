import { Typography, Link, GridList, GridListTile, Card } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

import BackIcon from '../../../../../assets/svg/Icon material-keyboard-backspace.svg';
import { stackDetailsType } from './stackView';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  resourceCardIconStyle: {
    height: '1rem',
    width: '1rem',
    marginRight: '0.4rem',
    cursor: 'pointer'
  },
  fieldsWrapper: {
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
  gridListItem: {
    width: '100%',
    height: '4rem'
  },
  gridList: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    flexWrap: 'nowrap',
    height: '100%',
    width: '100%',
    alignItems: 'center',
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
  tileStyling: {
    display: 'flex',
    justifyContent: 'center'
  },
  resourceCardStyle: {
    position: 'absolute',
    paddingTop: '0.5rem',
    height: '98%',
    width: '98%'
  },
  resourceHeading: {
    display: 'inline',
    fontSize: '0.9rem',
    fontWeight: 800,
    color: '#323648',
    opacity: 1
  },
  fieldStyle: {
    marginTop: '0.4rem',
    marginBottom: '0.2rem'
  }
}));

interface Props {
  screenOpenHandler: (value: string) => void;
  stackList: stackDetailsType[];
  removeResourceFromStack: (name: string) => void;
  emailSmsSectionViewHandler: (value: boolean) => void;
  stackCardViewHandler: (value: boolean) => void;
  // stackViewHandler: (value: boolean) => void;
}

const StackListView: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  React.useEffect(() => {
    props.stackCardViewHandler(false);
  }, []);

  const removeResourceFromStack = (name: string) => {
    props.removeResourceFromStack(name);
  };

  const backHandler = () => {
    // props.screenOpenHandler('stackDetailsView');
    props.screenOpenHandler('detailsView');
    props.emailSmsSectionViewHandler(false);
  };

  return (
    <div className={classes.detailsCardWrapper}>
      <div style={{ width: '100%', padding: '0.5rem', height: '2.5rem' }}>
        <Link style={{ display: 'inline' }} onClick={backHandler}>
          <img src={BackIcon} alt="back" />
          Back
        </Link>
      </div>
      <hr color="#3366ff" style={{ width: '100%', margin: '0' }} />
      <div
        style={{
          width: '100%',
          padding: '0.5rem',
          height: '80vh'
        }}>
        <div id="gridList" className={classes.gridList}>
          {props.stackList.length === 0 || props.stackList === null ? (
            <Typography style={{ fontWeight: 800 }}>No Resources In Stack</Typography>
          ) : (
            props.stackList.map((resource: stackDetailsType) => {
              return (
                <div style={{ width: '100%' }} key={resource.name}>
                  <div
                    style={{
                      borderBottom: '0.1px solid black',
                      marginBottom: '1rem'
                    }}>
                    <div style={{ display: 'block' }} className={classes.fieldStyle}>
                      <Typography className={classes.resourceHeading}>{resource.name}</Typography>
                      <Link
                        style={{ float: 'right', marginRight: '5px' }}
                        onClick={() => removeResourceFromStack(resource.name)}>
                        Remove
                      </Link>
                    </div>
                    <Typography className={classes.fieldStyle}>{resource.address}</Typography>
                    <Typography className={classes.fieldStyle}>{resource.phoneNumber}</Typography>
                    <Typography style={{ color: '#007EFF' }} className={classes.fieldStyle}>
                      {resource.info}
                    </Typography>
                    <Typography className={classes.fieldStyle}>{resource.workingHours}</Typography>
                    {resource.comments && (
                      <Typography> Navigator Comment : {resource.comments}</Typography>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default StackListView;
