import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SignIn } from './features/signin/SignIn';
import { SignUp } from './features/signup/SignUp';

function Router() {
  return (
    <Routes>
      <Route path="/">
        {/*
        TODO:
        * create landing page
        * if no user signed in, render the landing page
        * otherwise take the user to their dashboard
        */}
      </Route>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp />}/>
    </Routes>
  );
}

export default Router;
