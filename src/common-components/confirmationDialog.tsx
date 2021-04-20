import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

interface Props {
  text: string;
  open: boolean;
  confirmationDialogHandler: (value: boolean) => void;
}

const ConfiramationDialog: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = React.useState(props.open);
  const theme = useTheme();
  //   const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const onAccepting = () => {
    props.confirmationDialogHandler(true);
    setOpen(false);
  };

  const handleClose = () => {
    props.confirmationDialogHandler(false);
    setOpen(false);
  };

  return (
    <Dialog
      // fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title">
      {/* <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
      <DialogContent>
        <DialogContentText>{props.text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={onAccepting} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfiramationDialog;
