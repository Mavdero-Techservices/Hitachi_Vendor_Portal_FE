import React from 'react';
import { Route } from "react-router";
import { Routes } from "react-router-dom"
import SignUp from "./component/signUp"
import Test from "./component/test"

const MainRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="Test" element={<Test />} />
      </Routes>
    </div>
  )
}

export default MainRouter;
