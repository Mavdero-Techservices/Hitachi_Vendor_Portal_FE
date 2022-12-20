import React from 'react';
import { Route } from 'react-router-dom';
import auth from './auth-helper';

const AdminRoute = ({ component: Component, ...rest }) => {
  return (<Route
    {...rest}
    render={(props) => {
      return auth?.isAuthenticated()?.user?.role === "Admin" ? (
        <Component {...props} />
      ) : (auth.clearJWT(() => props?.history.push('/')))
    }
    }
  />)
}

const UserRoute = ({ component: Component, ...rest }) => {
  return (<Route
    {...rest}
    render={(props) => {
      return auth?.isAuthenticated()?.user?.role === "User" ? (
        <Component {...props} />
      ) : (auth.clearJWT(() => props?.history.push('/')))
    }
    }
  />)
}

export { AdminRoute,UserRoute }
