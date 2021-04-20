import React, { Props } from 'react';
import { connect, ConnectedComponent } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RoutesPath } from './constants/routes-path';
import { getCurrentUser, getAccessToken } from './utils/local-storage';
import rootReducer from './root-reducer';

/* eslint-disable  @typescript-eslint/no-explicit-any */

interface propsType {
  path: string;
  component: any;
  // component: React.LazyExoticComponent<ConnectedComponent<React.FC<Props>, Pick<Props, "location" | "history" | "match" | "staticContext">>>
}

const ProtectedRoute = (props: propsType) => {
  const { component: Component, ...rest } = props;
  return getAccessToken() && getCurrentUser() ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Route render={() => <Redirect to={RoutesPath.LOGIN} />} />
  );
};

const mapStateToProps = (state: ReturnType<typeof rootReducer>) => ({
  loginReducer: state.loginReducer
});

export default connect(mapStateToProps)(ProtectedRoute);
