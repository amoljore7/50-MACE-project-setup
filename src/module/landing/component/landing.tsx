import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Button, CssBaseline, makeStyles, Typography } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  headingStyle: {
    font: '400 60px/80px "FuturaMediumBT"',
    letterSpacing: '0px',
    color: '#000000',
    opacity: 1,
    textAlign: 'center'
  },
  headings: {
    font: 'normal normal medium 20px/27px Futura',
    color: '#707070',
    textAlign: 'center'
  },
  headings2: {
    color: '#707070',
    font: 'normal normal bold 30px/40px Futura',
    marginTop: '40px',
    marginBottom: '10px',
    textAlign: 'center'
  },
  wrapperStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(10)
  },
  link: {
    fontSize: '20px'
  },
  signIn: {
    margin: theme.spacing(3, 0, 2)
  }
}));
const themeDark = createMuiTheme({
  palette: {
    background: {
      default: '#F5F5FA'
    }
  }
});

type Props = RouteComponentProps;

const LandingPage: React.FC<Props> = (props: Props) => {
  const clickHandler = () => {
    props.history.push('/login');
  };

  const classes = useStyles();
  return (
    <MuiThemeProvider theme={themeDark}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div data-testid="landingWrapper" className={classes.wrapperStyle}>
          <Typography component="h1" variant="h5" className={classes.headingStyle}>
            Healthful
          </Typography>
          <Typography className={classes.headings2}>You are accessing PHI</Typography>
          <h5 className={classes.headings}>
            By clicking ’Sign in’ you agree that you will only use protected health information
            (PHI) to provide, coordinate or manage healthcare treatment for this patient
          </h5>
          <Button
            className={classes.signIn}
            style={{ backgroundColor: '#4491E0', color: '#FFFFFF' }}
            variant="contained"
            onClick={clickHandler}>
            Sign In
          </Button>
        </div>
      </Container>
    </MuiThemeProvider>
  );
};

export default LandingPage;
