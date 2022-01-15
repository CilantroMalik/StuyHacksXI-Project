import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SignIn } from './features/signin/SignIn';
import { Profile } from './features/profile/Profile';
import { AddBook } from './features/addBook/AddBook';

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
      <Route path="/signin" element={<SignIn signUp={false}/>}/>
      <Route path="/signup" element={<SignIn signUp={true} />}/>
      <Route path="/home" element={<Profile />}/>
      <Route path="/addBook" element={<AddBook />}/>
    </Routes>
  );
}

export default Router;
