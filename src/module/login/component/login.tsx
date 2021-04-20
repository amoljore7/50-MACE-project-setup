import React, { useState, useEffect, FormEvent } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  Button,
  Grid,
  Typography,
  makeStyles,
  CircularProgress,
  InputAdornment,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  FilledInput
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import ErrorString from '../../../utils/error-string';

import { userLoginReturnType, userData } from '../action';
import { DefaultState } from '../reducer';
import rootReducer from '../../../root-reducer';
import { userLogin } from '../action';
import { getCurrentUser } from '../../../utils/local-storage';

import HealthFulText from '../../../assets/img/Healthful.png';
import Calendar from '../../../assets/img/calendar 2.png';
import Clock from '../../../assets/img/clock 1.png';
import Heart from '../../../assets/img/heart 2.png';
import Radio from '../../../assets/img/radio 1.png';
import Safe from '../../../assets/img/safe 1.png';
import Speaker from '../../../assets/img/speaker.png';
import Star from '../../../assets/img/star 2.png';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#4491E0'
    }
  },
  leftSide: {
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
  signInLabel: {
    color: '#323648',
    font: '600 30px "FuturaMediumBT"',
    marginTop: '3rem',
    lineHeight: '2.5rem',
    letterSpacing: '-0.75px'
  },
  signInHeading: {
    width: '24rem',
    height: '8rem',
    marginTop: '2rem',
    color: '#A7A7A7',
    font: '400 24px "FuturaMediumBT"',
    lineHeight: '2rem',
    letterSpacing: '-0.6px',
    textAlign: 'left'
  },
  rightSide: {
    height: '100vh',
    backgroundColor: '#F5F5FA',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
    marginRight: '1.3rem'
  },
  errorMessage: {
    color: 'red'
  },
  iconsContainer: {
    position: 'relative',
    width: '35rem',
    height: '28rem'
    // marginTop: '6rem',
    // marginBottom: '6.8rem'
  },
  heartIconStyle: {
    top: '11rem',
    left: '13rem',
    height: '8rem',
    position: 'absolute'
  },
  calenderIconStyle: {
    height: '5rem',
    position: 'absolute',
    top: '0',
    left: '6rem'
  },
  clockIconStyle: {
    height: '5rem',
    position: 'absolute',
    top: '2rem',
    right: '6.5rem'
  },
  speakerIconStyle: {
    height: '5rem',
    position: 'absolute',
    top: '11rem',
    right: '0'
  },
  safeIconStyle: {
    height: '5rem',
    position: 'absolute',
    bottom: '0.1rem',
    right: '5.6rem'
  },
  radioIconStyle: {
    height: '5rem',
    position: 'absolute',
    bottom: '0.1rem',
    left: '6rem'
  },
  starIconStyle: {
    height: '4rem',
    position: 'absolute',
    top: '11rem',
    left: '0'
  },
  textFieldStyle: {
    paddingBottom: '3vh',
    borderRadius: '0.7rem',
    '& .MuiFilledInput-root': {
      borderTopLeftRadius: `0.7rem`
    }
  },
  forgotPasswordLinkStyle: {
    color: '#3A98FE',
    font: '500 24px "FuturaMediumBT"',
    textAlign: 'center',
    marginTop: '1rem',
    marginBottom: '0.7rem',
    textTransform: 'none',
    letterSpacing: '-0.6px',
    lineHeight: '2rem'
  },
  heading_1: {
    color: '#323648',
    font: '600 40px "FuturaMediumBT"',
    textAlign: 'center',
    marginTop: ' 3rem',
    letterSpacing: '-1px',
    lineHeight: '3rem'
  },
  heading_2: {
    height: '7rem',
    width: '23rem',
    color: '#A7A7A7',
    font: '400 24px "FuturaMediumBT"',
    textAlign: 'center',
    marginTop: ' 1rem',
    letterSpacing: '-0.6px',
    lineHeight: '1.5rem'
  },
  underline: {
    '&&&:before': {
      borderBottom: 'none'
    },
    '&&:after': {
      borderBottom: 'none'
    }
  },
  textFieldInputStyle: {
    padding: '1rem 0.7rem'
  },
  filledInputStyle: {
    width: '100%',
    borderRadius: '0.7rem',
    marginBottom: '1rem',
    background: '#F7F9FC',
    border: '1px solid #F7F9FC'
  },
  nativeInputStyle: {
    borderRadius: '0.7rem'
  },
  formControlStyle: {
    display: 'block'
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

interface storeProps {
  loginReducer: DefaultState;
}

interface DispatchProps {
  userLogin: (user: userData) => userLoginReturnType;
}

type Props = storeProps & RouteComponentProps & DispatchProps;

export const LoginPage: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const [submitbtnDisabled, setSubmitBtnDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const forgotPasswordLinkClickHandler = () => {
    props.history.push('/forgot-password');
  };

  useEffect(() => {
    if (getCurrentUser()) {
      props.history.push('user');
    }
  }, [props.loginReducer]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  React.useEffect(() => {
    if (!formData.username.trim() || !formData.password.trim()) {
      setSubmitBtnDisabled(true);
    } else {
      setSubmitBtnDisabled(false);
    }
  }, [formData]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };
  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.userLogin(formData);
  };

  return (
    <MuiThemeProvider theme={themeDark}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={5} lg={5} className={classes.leftSide}>
          <Box className={classes.leftBox}>
            <img src={HealthFulText} className={classes.title} alt="Healthful Logo"></img>
            <Typography className={classes.signInLabel}>Sign In</Typography>
            <form data-testid="formWrapper" noValidate={true} onSubmit={formSubmitHandler}>
              <Typography className={classes.signInHeading}>
                Log in with your Vituity account and get access to Healthful resource knowledgebase!
              </Typography>
              <FormControl className={classes.formControlStyle} variant="filled">
                <InputLabel htmlFor="username">Email</InputLabel>
                <FilledInput
                  className={classes.filledInputStyle}
                  classes={{ input: classes.nativeInputStyle }}
                  disableUnderline
                  id="email"
                  name="username"
                  type="email"
                  value={formData.username}
                  onChange={inputChangeHandler}
                />
              </FormControl>
              <FormControl className={classes.formControlStyle} variant="filled">
                <InputLabel htmlFor="password">Password</InputLabel>
                <FilledInput
                  className={classes.filledInputStyle}
                  classes={{ input: classes.nativeInputStyle }}
                  disableUnderline
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={inputChangeHandler}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Box>
                <Typography className={classes.errorMessage}>
                  {ErrorString(props.loginReducer.error || '') || props.loginReducer.error}
                </Typography>
              </Box>
              <Button
                data-testid="loginButton"
                className={classes.submitBtn}
                // inline style has been used purposedly as using className is not working
                style={{ backgroundColor: '#4491E0', color: '#FFFFFF' }}
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={submitbtnDisabled}>
                {props.loginReducer.loading ? (
                  <CircularProgress className={classes.circularProgress} size={30} />
                ) : (
                  'Sign in to Healthful'
                )}
              </Button>
              <Button
                className={classes.forgotPasswordLinkStyle}
                fullWidth
                onClick={forgotPasswordLinkClickHandler}>
                Forgot Password?
              </Button>
            </form>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7} className={classes.rightSide}>
          <Grid container direction="column" alignItems="center" justify="center">
            <div className={classes.iconsContainer}>
              <img src={Heart} alt="heart" className={classes.heartIconStyle}></img>
              <img src={Calendar} alt="Calendar" className={classes.calenderIconStyle}></img>
              <img src={Clock} alt="Clock" className={classes.clockIconStyle}></img>
              <img src={Speaker} alt="Speaker" className={classes.speakerIconStyle}></img>
              <img src={Safe} alt="Safe" className={classes.safeIconStyle}></img>
              <img src={Radio} alt="Radio" className={classes.radioIconStyle}></img>
              <img src={Star} alt="Star" className={classes.starIconStyle}></img>
            </div>
            <Typography className={classes.heading_1}>Welcome to Healthful Resources!</Typography>
            <Typography className={classes.heading_2}>
              So good to see you again. Let’s get you signed in superfast!
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
};

const mapStateToProps = (state: ReturnType<typeof rootReducer>) => ({
  loginReducer: state.loginReducer
});

export default connect(mapStateToProps, { userLogin })(withRouter(LoginPage));
