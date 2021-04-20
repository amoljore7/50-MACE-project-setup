import React, { lazy, Suspense } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Container, CssBaseline, makeStyles, Theme } from '@material-ui/core';
import { createBrowserHistory } from 'history';

// @ts-ignore
import { positions, Provider } from 'react-alert';
// @ts-ignore
import AlertTemplate from 'react-alert-template-basic';
import ProtectedRoute from './protected-route';
import CircularProgressOverlay from './components/circular-progress-overlay';

const LayoutPage = lazy(() => import('./module/layout/component/layout'));
const LoginPage = lazy(() => import('./module/login/component/login'));
const ResetPassword = lazy(() => import('./module/resetPassword/component/resetPassword'));
const ForgotPassword = lazy(() => import('./module/forgotPassword/component/forgotPassword'));
const PageNotFound = lazy(() => import('./module/pageNotFound/pageNotFound'));
const CopyLINK = lazy(() => import('./module/copyLink/stackListPage'));

export const history = createBrowserHistory();

const options = {
  timeout: 5000,
  position: positions.TOP_CENTER
};

const useStyles = makeStyles((theme: Theme) => ({
  containerStyle: {
    margin: '0',
    padding: '0',
    background: '#F5F5FA',
    fontFamily: 'FuturaMediumBT'
  }
}));

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <Provider template={AlertTemplate} {...options}>
      <Container component="main" maxWidth={false} className={classes.containerStyle}>
        <CssBaseline />
        <Router history={history}>
          <Suspense fallback={<CircularProgressOverlay />}>
            <Switch>
              <Route exact strict path="/login" component={LoginPage} />
              <Route path="/reset-password" component={ResetPassword} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/stackList/:id?" component={CopyLINK} />
              <ProtectedRoute path="/user" component={LayoutPage} />
              <Route path="/page-not-found" component={PageNotFound} />
              <Redirect path="/" to="/login" />
              <Route component={PageNotFound} />
            </Switch>
          </Suspense>
        </Router>
      </Container>
    </Provider>
  );
};

export default App;
