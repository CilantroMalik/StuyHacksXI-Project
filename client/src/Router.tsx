import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SignIn } from './features/signin/SignIn';
import { SignUp } from './features/signup/SignUp';
import { Profile } from './features/profile/Profile';
import { AddBook } from './features/addBook/AddBook';
import { EditBook } from './features/editBook/EditBook';

import { useAppSelector, useAppDispatch } from './app/hooks';
import { setUser, selectUser } from './features/user/userSlice';
import { useNavigate } from 'react-router';

function ResetState() {
  let dispatch = useAppDispatch();
  let user = useAppSelector(selectUser);

  function resetState() {
    dispatch(setUser(null))
    console.log("reset state", user);
  }

  useEffect(() => {
    resetState()
  }, []);

  return (
    <div>
      <p> state reset </p>
    </div>
  )
}

function Router() {
  return (
    <Routes>
      {/* TODO:
      * create landing page
      * if no user signed in, render the landing page
      * otherwise take the user to their dashboard
      */ }
      <Route path="/" element={<ResetState/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/home" element={<Profile />}/>
      <Route path="/addBook" element={<AddBook />}/>
      {/* <Route path="/editBook" element={<EditBook />}/> */}
    </Routes>
  );
}

export default Router;
