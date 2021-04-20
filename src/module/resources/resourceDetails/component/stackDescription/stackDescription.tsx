import { Button, Card, Divider, TextField, Typography, Theme, Grid } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextArea from 'antd/lib/input/TextArea';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import rootReducer from '../../../../../root-reducer';
import { stackGenerateLink, updateStackData } from './action';
import CircularProgressOverlay from '../../../../../components/circular-progress-overlay';

const useStyles = makeStyles((theme: Theme) => ({
  stackDescriptionWrapper: {
    background: '#FFF',
    height: '100%',
    padding: '2rem',
    width: '100%'
  },
  textfieldInputStyle: {
    padding: '10px',
    borderRadius: '1rem'
  },
  dividerTop: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: '#4491E0'
  },
  labelStyle: {
    fontSize: '1rem'
  }
}));

interface DispatchProps {
  stackGenerateLink: (value: any) => void;
  updateStackData: (value: any) => void;
}

interface StoreProps {
  stackList: any[];
  resourceDetailsReducer: any;
}
type Props = StoreProps & DispatchProps & RouteComponentProps;

const stackDescription: React.FC<any> = (props: Props) => {
  const classes = useStyles();

  const token: any = localStorage.getItem('accessToken');
  const { userId }: any = jwtDecode(token);

  const [isUpdate, setIsUpdate] = React.useState(false);

  React.useEffect(() => {
    if (props.resourceDetailsReducer.stackID) {
      setIsUpdate(true);
    }
  }, [props.stackList]);

  const saveStackGenerateLink = () => {
    const stackResourceData = props.stackList.map((op: any) => {
      return { resourceType: op.resourceType, resourceId: op.resourceId, comments: op.comments };
    });
    setIsUpdate(false);
    props.stackGenerateLink({
      userId: userId,
      stackResourceData
    });
  };

  const updateStack = () => {
    const stackResourceData = props.stackList.map((op: any) => {
      return { resourceType: op.resourceType, resourceId: op.resourceId, comments: op.comments };
    });
    props.updateStackData({
      id: props.resourceDetailsReducer.stackID,
      stackResourceData
    });
    setIsUpdate(false);
  };

  if (
    props.resourceDetailsReducer.stackLoading ||
    props.resourceDetailsReducer.updateStackLoading
  ) {
    return (
      <div>
        <CircularProgressOverlay />
      </div>
    );
  } else {
    return (
      <>
        <Card className={classes.stackDescriptionWrapper}>
          <Typography variant="h5">Sharing this stack</Typography>
          <Divider className={classes.dividerTop} />

          {props.resourceDetailsReducer.stackID ? (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <label htmlFor="Categories" className={classes.labelStyle}>
                  To share this stack, send the link below to the patient.
                </label>
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="Categories" className={classes.labelStyle}>
                  If you see an &apos; Update Stack &apos; button, you may have unsaved chnages, in
                  this case, just click on &apos; Update Stack &apos; and then send the link
                </label>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-search"
                  type="search"
                  style={{ width: '50%', marginRight: '5%' }}
                  value={`https://dev.carenav.vituity.com/stackList?id=${props.resourceDetailsReducer.stackID}`}
                  variant="outlined"
                />
                <Button
                  style={{ marginTop: '0.5rem', marginRight: '5%', textTransform: 'none' }}
                  variant="contained"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `https://dev.carenav.vituity.com/stackList?id=${props.resourceDetailsReducer.stackID}`
                    )
                  }>
                  Copy Link
                </Button>
                <Button
                  style={{ marginTop: '0.5rem', marginRight: '5%', textTransform: 'none' }}
                  variant="contained"
                  color="primary"
                  disabled={isUpdate ? false : true}
                  onClick={() => updateStack()}>
                  Update Stack
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <label htmlFor="Categories" className={classes.labelStyle}>
                  To use this stack, first click on &apos; Save Stack and generate link&apos; below.
                </label>
              </Grid>
              <Grid item xs={12}>
                <Button
                  style={{ textTransform: 'none' }}
                  variant="contained"
                  color="primary"
                  onClick={() => saveStackGenerateLink()}>
                  Save Stack And Generate Link
                </Button>
              </Grid>
            </Grid>
          )}
        </Card>
      </>
    );
  }
};

// export default stackDescription;
const mapStateToProps = (state: ReturnType<typeof rootReducer>) => ({
  resourceDetailsReducer: state.resourceDetailsReducer
});

export default connect(mapStateToProps, { stackGenerateLink, updateStackData })(
  withRouter(stackDescription)
);
