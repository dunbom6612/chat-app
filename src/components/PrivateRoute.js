import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  console.log('currentUser at private', currentUser);
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
export default PrivateRoute;
