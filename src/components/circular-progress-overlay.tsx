import React, { ReactElement } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'fixed',
      zIndex: 1000001,
      left: 0,
      top: 0,
      background: 'none repeat scroll 0 0 black',
      opacity: 0.7,
      height: '100%',
      width: '100%'
    }
  })
);

const CircularProgressOverlay: React.FC = (): ReactElement => {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="center" alignItems="center" className={classes.root}>
      <CircularProgress />
    </Box>
  );
};

export default CircularProgressOverlay;
