import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  MuiThemeProvider,
  createMuiTheme,
  Grid,
  Button,
  CssBaseline,
  Card,
  CardContent,
  Typography,
  makeStyles
} from '@material-ui/core';
import logo from '../../assets/img/404.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#4491E0'
    }
  },
  pageNotFoundContainer: {
    margin: '0',
    padding: '0',
    background: '#F5F5FA',
    fontFamily: 'FuturaMediumBT',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  pageNotFoundCard: {
    maxWidth: 500,
    minWidth: 275,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    marginBottom: '20px',
    color: '#4491E0',
    textAlign: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  sorryTypo: {
    color: '#323648',
    font: '600 30px "FuturaMediumBT"',
    marginTop: '1rem',
    lineHeight: '2.5rem',
    letterSpacing: '-0.75px',
    textAlign: 'center'
  },
  headings: {
    width: '24rem',
    marginTop: '2rem',
    color: '#A7A7A7',
    font: '400 24px "FuturaMediumBT"',
    lineHeight: '2rem',
    letterSpacing: '-0.6px',
    textAlign: 'center'
  },
  submitBtn: {
    margin: theme.spacing(3, 0, 2),
    font: '400 24px "FuturaMediumBT"',
    backgroundColor: '#4491E0',
    color: '#FFFFFF',
    borderRadius: '10px',
    textTransform: 'none'
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

const PageNotFound: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const clickHandler = () => {
    props.history.push('/login');
  };

  return (
    <MuiThemeProvider theme={themeDark}>
      <Grid item xs={12} className={classes.pageNotFoundContainer}>
        <Card className={classes.pageNotFoundCard} variant="outlined">
          <CardContent>
            <div className={classes.title}>
              <img src={logo} alt="React Logo" />
            </div>
            <Typography component="h2" variant="h5" className={classes.sorryTypo}>
              Sorry!
            </Typography>
            <Typography className={classes.headings}>We could not find this page</Typography>
            <form className={classes.form} noValidate>
              <Button
                className={classes.submitBtn}
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: '#4491E0', color: '#FFFFFF' }}
                onClick={clickHandler}>
                Go to Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </MuiThemeProvider>
  );
};

export default PageNotFound;
