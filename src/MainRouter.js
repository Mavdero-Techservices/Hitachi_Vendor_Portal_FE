import React, { useState, useEffect } from 'react';
import { Route, useLocation } from "react-router";
import { Routes } from "react-router-dom"
import { useSelector } from 'react-redux';
import SignUp from "./component/signUp"
import Login from "./component/login"
import Test from "./component/test"
import { AdminRoute, UserRoute } from './auth/PrivateRoute';
import { BrowserRouter } from 'react-router-dom';
const MainRouter = () => {
  const { isLoggedIn } = useSelector((state) => state.onlineStatus)
  const [state, setState] = useState({
    userInfo: JSON.parse(window.sessionStorage.getItem("jwt")),
    userName: '',
    userRole: '',
  })
  console.log(isLoggedIn)
  const pathname = useLocation().pathname
  useEffect(() => {
    state.userInfo = JSON.parse(window.sessionStorage.getItem("jwt"));
    state.userRole = state?.userInfo?.user?.role;
  }, [pathname, isLoggedIn])
  return (
    <div>
      <Routes>
        <Route path="/Test" element={
          <AdminRoute >
            <Test />
          </AdminRoute>
        }
        />
        <Route path="/" element={<SignUp />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="Test" element={<Test />} /> */}
      </Routes>
    </div>
  )
}
export default MainRouter;
