import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SignIn } from './features/signin/SignIn';
import { SignUp } from './features/signup/SignUp';
import { Profile } from './features/profile/Profile';
import { AddBook } from './features/addBook/AddBook';
import { useCookies } from "react-cookie";
import { EditBook } from './features/editBook/EditBook';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { setUser, selectUser } from './features/user/userSlice';
import { useNavigate } from 'react-router';
import { LandingPage } from './features/landingPage/landingPage';

function ResetState() {
  let dispatch = useAppDispatch();
  let user = useAppSelector(selectUser);
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["user"])

  function resetState() {
    dispatch(setUser(null))
    console.log("reset state", user);
  }

  useEffect(() => {
    console.log("RESETTING STATE")
    resetState()
    console.log("COOKIE VALUE", cookies["user"])
    if (cookies["user"] != undefined) {
        dispatch(setUser({username: cookies["user"], signedIn: true}))
        console.log("ROUTING TO HOME")
        navigate("/home");
    } else {
        console.log("ROUTING TO SIGNIN")
        navigate("/welcome");
    }
  }, []);

  return (
    <div>
      <p>Loading...</p>
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
      <Route path="/" element={<ResetState />}/>
      <Route path="/welcome" element={<LandingPage />}/>
      <Route path="/signin" element={<SignIn />}/>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/home" element={<Profile />}/>
      <Route path="/addBook" element={<AddBook />}/>
      <Route path="/editBook" element={<EditBook />}/>
    </Routes>
  );
}

export default Router;
