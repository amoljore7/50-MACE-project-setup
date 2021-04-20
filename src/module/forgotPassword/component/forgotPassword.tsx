import React, { useState, useEffect, FormEvent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  makeStyles,
  CircularProgress,
  Box,
  Grid
} from '@material-ui/core';
import Safe from '../../../assets/img/safe.png';
import Healthful from '../../../assets/img/Healthful.png';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { forgotPassword, userData, userPasswordReturnType } from '../action';
import { DefaultState } from '../../forgotPassword/reducer';
import rootReducer from '../../../root-reducer';
import ErrorString from '../../../utils/error-string';

const useStyles = makeStyles((theme) => ({
  loginSection: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  leftBox: {
    display: 'grid',
    justifyContent: 'center'
  },
  title: {
    height: '3rem',
    width: '13rem'
  },
  signInBack: {
    height: '30px',
    borderRadius: '12px',
    color: '#3A98FE',
    fontFamily: 'Euclid Circular B',
    fontSize: '24px',
    fontWeight: 500,
    letterSpacing: '-0.6px',
    lineHeight: '30px',
    textAlign: 'center',
    marginTop: '15px',
    marginBottom: '10px',
    textTransform: 'none'
  },
  logoSection: {
    height: '100vh',
    backgroundColor: '#F7F9FC',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  forgotPasswordLabel: {
    color: '#323648',
    font: '600 30px "FuturaMediumBT"',
    marginTop: '3rem',
    lineHeight: '2.5rem',
    letterSpacing: '-0.75px'
  },
  headings: {
    width: '24rem',
    height: '8rem',
    marginTop: '2rem',
    color: '#A7A7A7',
    font: '400 24px "FuturaMediumBT"',
    lineHeight: '2rem',
    letterSpacing: '-0.6px',
    textAlign: 'left'
  },
  submitBtn: {
    margin: theme.spacing(3, 0, 2),
    font: '400 24px "FuturaMediumBT"',
    backgroundColor: '#4491E0',
    color: '#FFFFFF',
    borderRadius: '10px',
    textTransform: 'none'
  },
  circularProgress: {
    marginLeft: 0,
    color: 'white',
    marginRight: '20px'
  },
  heading_1: {
    height: '102px',
    width: '622px',
    color: '#323648',
    font: '600 40px "FuturaMediumBT"',
    letterSpacing: '-1px',
    lineHeight: '51px',
    textAlign: 'center',
    margin: ' auto',
    marginTop: '5rem'
  },
  heading_2: {
    height: '116.49px',
    width: '355px',
    color: '#A7A7A7',
    font: '400 24px "FuturaMediumBT"',
    letterSpacing: '-0.6px',
    lineHeight: '30px',
    textAlign: 'center',
    margin: ' auto',
    marginTop: '1rem'
  },
  errorMessage: {
    color: 'red'
  },
  box1: {
    display: 'grid',
    marginTop: '30px',
    justifyContent: 'center'
  },
  safeLogo: {
    display: 'inline',
    height: '256px',
    width: '299px',
    margin: 'auto'
  },
  textField: {
    paddingBottom: '3vh'
  }
}));

const themeDark = createMuiTheme({
  palette: {
    background: {
      default: '#F5F5FA'
    }
  },
  overrides: {
    MuiButton: {
      label: {
        textTransform: 'none'
      }
    }
  }
});

interface StoreProps {
  forgotPasswordReducer: DefaultState;
}

interface DispatchProps {
  forgotPassword: (user: userData) => userPasswordReturnType;
}

type Props = StoreProps & DispatchProps & RouteComponentProps;

export const ForgotPassword: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const [submitbtnDisabled, setSubmitBtnDisabled] = useState(false);
  const [formData, setFormData] = useState({
    email: ''
  });

  useEffect(() => {
    setSubmitBtnDisabled(true);
  }, []);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
    if (!name.trim() || !value.trim()) {
      setSubmitBtnDisabled(true);
    } else {
      setSubmitBtnDisabled(false);
    }
  };
  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.forgotPassword(formData);
  };
  const clickHandler = () => {
    props.history.push('/login');
  };

  return (
    <MuiThemeProvider theme={themeDark}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={5} lg={5} className={classes.loginSection}>
          <Box className={classes.leftBox}>
            <img src={Healthful} className={classes.title} alt="Healthful FForgot Logo"></img>
            <Typography className={classes.forgotPasswordLabel}>Forgot Password</Typography>
            <form data-testid="formWrapper" noValidate={true} onSubmit={formSubmitHandler}>
              <Typography className={classes.headings}>
                Type your email below and we will send you instructions on how to reset your
                Healthful credentials.
              </Typography>
              <TextField
                className={classes.textField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="text"
                id="email"
                placeholder="Email"
                name="email"
                onChange={inputChangeHandler}
                inputProps={{
                  'data-testid': 'emailInput'
                }}
              />
              <Box>
                <Typography className={classes.errorMessage}>
                  {ErrorString(props.forgotPasswordReducer.error || '') ||
                    props.forgotPasswordReducer.error}
                </Typography>
              </Box>
              <Button
                data-testid="forgotPasswordButton"
                className={classes.submitBtn}
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: '#4491E0', color: '#FFFFFF' }}
                size="large"
                disabled={submitbtnDisabled}>
                {props.forgotPasswordReducer.loading ? (
                  <CircularProgress
                    data-testid="forgotPasswordButtonLoader"
                    className={classes.circularProgress}
                    size={30}
                  />
                ) : (
                  'Email me a reset link'
                )}
              </Button>
              <Button className={classes.signInBack} fullWidth onClick={clickHandler}>
                Back to Sign in
              </Button>
            </form>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7} className={classes.logoSection}>
          <Box className={classes.box1}>
            <img className={classes.safeLogo} src={Safe} alt="Forgot password Page" />
            <Typography className={classes.heading_1}>
              Oops, If you forgot your password this page helps you!
            </Typography>
            <Typography className={classes.heading_2}>
              In case you can&apos;t change your password here please contact your administrator
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
};

const mapStateToProps = (state: ReturnType<typeof rootReducer>) => ({
  forgotPasswordReducer: state.forgotPasswordReducer
});

export default connect(mapStateToProps, { forgotPassword })(withRouter(ForgotPassword));
