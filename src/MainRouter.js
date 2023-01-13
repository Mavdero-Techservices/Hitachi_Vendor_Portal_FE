import React, { useState, useEffect } from 'react';
import { Route, useLocation } from "react-router";
import { Routes } from "react-router-dom"
import { useSelector } from 'react-redux';
import SignUp from "./component/signUp"
import Login from "./component/login"
import Test from "./component/test"
import ImageUpload from "./component/imageUpload"
import GetImage from "./component/displayImage"
import { AdminRoute, UserRoute } from './auth/PrivateRoute';
import Navbar1 from "./common/navbar";
import Basic from "./component/Basic.js";
import Commun from "./component/commu.js";
import Statutory from "./component/StatutoryDetails.js";
import Bank from "./component/BankDetails.js";
import NewUser from "./component/NewUser";
import Password from "./component/password";
import FinancialDetail from "./component/FinancialDetail";
import ComplianceDetail from "./component/Compliance";
import ContactTeam from "./component/ContactTeam";
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
    state.userRole = state?.userInfo?.user?.verifiedUser;
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
        <Route path="/" element={<NewUser />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ImageUpload" element={<ImageUpload />} />
        <Route path="/getImage" element={<GetImage />} />
        {/* <Route path="Test" element={<Test />} /> */}
        <Route path="/Navbar" element={<Navbar1 />} />
        <Route path="/basic" element={<Basic />} />
        <Route path="/commu" element={<Commun />} />
        <Route path="/statutory" element={<Statutory />} />
        <Route path="/bank" element={<Bank />} />
        <Route path="/passwordGeneration" element={<Password />} />
        <Route path="/passwordGeneration/:emailId/:mailConfirmationCode" element={<Password />} />
        <Route path="/FinancialDetail" element={<FinancialDetail />} />
        <Route path="/ComplianceDetail" element={<ComplianceDetail />} />
        <Route path="/ContactTeam" element={<ContactTeam />} />
      </Routes>
    </div>
  )
}
export default MainRouter;
