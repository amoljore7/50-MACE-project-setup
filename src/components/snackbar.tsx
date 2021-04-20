import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

import Snackbar from '@material-ui/core/Snackbar';
/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */

const useStyles = makeStyles(() => ({
  snackbarStyle: {
    width: '15rem',
    backgroundColor: '#FFF',
    position: 'absolute',
    top: '2rem',
    right: '2rem'
  }
}));
interface Props {
  open: boolean;
  message: string;
  closeSnackbar?: (val: boolean) => void;
}

const Snackbars = (props: Props) => {
  const { message, open: openVal } = props;
  const [open, setOpen] = React.useState(openVal);

  React.useEffect(() => {
    setOpen(openVal);
  }, [openVal]);

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={open}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

export default Snackbars;
