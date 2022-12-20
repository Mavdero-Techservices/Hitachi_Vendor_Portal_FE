import React, { useState, useEffect } from "react";
import { Route, useLocation } from "react-router";
import { Routes } from "react-router-dom";
// import { useSelector } from 'react-redux';
// import Test from "./component/test.js"
import NewUser from "./component/NewUser";
import LoginPage from "./component/Login";
import Signup from "./component/SignUp";
import Navbar1 from "./common/navbar";
import Basic from "./component/Basic.js";
import Commun from "./component/commu.js";
import Statutory from "./component/StatutoryDetails.js";
import Bank from "./component/BankDetails.js";

const MainRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NewUser />} />
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Navbar" element={<Navbar1 />} />
        <Route path="/basic" element={<Basic />} />
        <Route path="/commu" element={<Commun />} />
        <Route path="/statutory" element={<Statutory />} />
        <Route path="/bank" element={<Bank />} />
      </Routes>
    </div>
  );
};
export default MainRouter;
