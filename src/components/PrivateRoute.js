import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log('currentUser', currentUser);
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser && currentUser.email ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
export default PrivateRoute;
