import React from 'react';
import auth from './auth-helper';
import { useNavigate } from 'react-router-dom';
import AdminLandingPage from '../component/UserCreation';

import {
  Outlet,
} from "react-router-dom";
const LoginLanding = () => {
  const navigate = useNavigate();
  auth.clearJWT(() => navigate('/login'));
  return null;
};
const CommonRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();
  return (
    auth?.isAuthenticated()?.result?.role === "user"||auth?.isAuthenticated()?.result?.role === "Admin" ? <Outlet /> : auth?.clearJWT(() => navigate('/login'))
  )
}
const AdminRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();
  console.log('AdminRoute',auth)
  
  return (
    auth?.isAuthenticated()?.result?.role === "Admin" ? <Outlet /> : auth.clearJWT(() => navigate('/login'))
  )
  // return (
  //   auth?.isAuthenticated()?.result?.role === "Admin" ?
  //     <>
  //       <AdminLandingPage />
  //       <Outlet />
  //     </> :
  //     <LoginLanding />
  // );
}
const UserRoute = ({ component: Component, ...rest }) => {
  console.log('userRoute')
  const navigate = useNavigate();
  return (
    auth?.isAuthenticated()?.result?.role === "user" ? <Outlet /> : auth?.clearJWT(() => navigate('/login'))
  )
}
const FinanceRoute = ({ component: Component, ...rest }) => {
  console.log('FinanceRoute')
  const navigate = useNavigate();
  return (
    auth?.isAuthenticated()?.result?.role === "financial" ? <Outlet /> : auth?.clearJWT(() => navigate('/login'))
  )
}
const OtherRoute = ({ component: Component, ...rest }) => {
  console.log('otherRoute')
  const navigate = useNavigate();
  return (
    auth?.isAuthenticated()?.result?.role === "other" ? <Outlet /> :(() => navigate('/documents'))
  )
}
const VCTRoute = ({ component: Component, ...rest }) => {
  console.log('VCTRoute')
  const navigate = useNavigate();
  return (
    auth?.isAuthenticated()?.result?.role === "VCT" ? <Outlet /> : auth?.clearJWT(() => navigate('/login'))
  )
}
const JapanRoute = ({ component: Component, ...rest }) => {
  console.log('JapanRoute')
  const navigate = useNavigate();
  return (
    auth?.isAuthenticated()?.result?.role === "Japan" ? <Outlet /> : auth?.clearJWT(() => navigate('/login'))
  )
}
const MRTRoute = ({ component: Component, ...rest }) => {
  console.log('MRTRoute')
  const navigate = useNavigate();
  return (
    auth?.isAuthenticated()?.result?.role === "MRT" ? <Outlet /> : auth?.clearJWT(() => navigate('/login'))
  )
}

export {CommonRoute, AdminRoute, UserRoute,FinanceRoute,OtherRoute,VCTRoute,JapanRoute,MRTRoute }
