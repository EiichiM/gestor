import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { login } from '../actions/authActions';

const privateRoute = ({ component: Component, restricted, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      login() && restricted
        ? <Redirect to="/auth/login" />
        : <Component {...props} />
    )}
  />
);
export default privateRoute;
