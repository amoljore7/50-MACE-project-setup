import React, { ReactElement } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      zIndex: 1000001,
      left: 0,
      top: 0,
      background: 'white',
      opacity: 0.7
    }
  })
);

const Loader: React.FC = (): ReactElement => {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="center" alignItems="center" className={classes.root}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
