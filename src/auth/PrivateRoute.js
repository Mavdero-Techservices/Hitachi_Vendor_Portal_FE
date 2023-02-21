import React from 'react';
import auth from './auth-helper';
import { useNavigate } from 'react-router-dom';
import {
  Outlet,
} from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();
  return (
    auth?.isAuthenticated()?.result?.role === "Admin" ? <Outlet /> : auth.clearJWT(() => navigate('/login'))
  )
}
const UserRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();
  return (
    auth?.isAuthenticated()?.result?.role === "user" ? <Outlet /> : auth?.clearJWT(() => navigate('/login'))
  )
}

export { AdminRoute, UserRoute }
