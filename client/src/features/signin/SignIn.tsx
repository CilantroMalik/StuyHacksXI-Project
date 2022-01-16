import React, { CSSProperties, useState, useEffect } from 'react';
import { httpGetAsync } from '../../utils';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setUser, selectUser } from '../user/userSlice';
import { useNavigate } from 'react-router';
import { useCookies } from "react-cookie";

export function SignIn() {
  let navigate = useNavigate();
  let dispatch = useAppDispatch();
  let [errorMessage, setErrorMessage] = useState(null);
  const [cookies, setCookie] = useCookies(["user"])

  const cardStyle: CSSProperties = {
      backgroundColor: '#f1f7ed',
      width: "30%",
      height: "50%",
      maxWidth: "50rem",
      marginLeft: "182px",
      marginTop: "12%",
      borderRadius: "20px",
      textAlign: "left",
      display: "flex",
      position: "absolute",
    };

  const pageStyles: CSSProperties = {
    backgroundColor: '#f1f7ed',
    width: "100vw",
    height: "100vh",
    position: "absolute", top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
  };

  useEffect(() => {
    //TODO: we cannot let this stay as is; probably just don't allowed logged
    // in users to access this route at all
    dispatch(setUser({username: null, signedIn: false}));
  }, []);

  function submit(e: any): void {
    e.preventDefault();
    setErrorMessage(null);

    console.log("logging in");

    let username = encodeURI(e.target.username.value);
    let pwd = encodeURI(e.target.password.value);
    let url = `http://127.0.0.1:8888/api/v1/login?name=${username}&pwd=${pwd}`;

    httpGetAsync(url, (res: string) => {
      let json = JSON.parse(res);
      let name = json.name;
      
      console.log(res);

      if (json.err) {
        console.error(json.err);
        setErrorMessage(json.err);
      } else {
        console.log("no error");
        dispatch(setUser({
          username: name,
          signedIn: true,
        }));
        setCookie("user", name, {path: '/'})
        navigate("/home");
      }
    });

    e.target.username.value = "";
    e.target.username.password = "";
  }

  return (
    <div style={pageStyles}>
      <div style={cardStyle}>
        <div className="flex flex-row items-center w-full">  {/* style={{flex: 1, display: "flex", alignItems: "center", width: "100%"}} */}
          <form className="flex flex-col m-3 items-start" onSubmit={submit}>  {/* style={{margin: "10px", display: "flex", flexDirection: "column", alignItems: "start", flex: 1}} */}
            <h1 className="text-3xl font-bold">
              Sign In
            </h1>
            { errorMessage !== null && <div className="mt-6 bg-red-200 w-full p-5">
              <p>{errorMessage}</p>
            </div> }
            <input id="username" className="mt-6 ml-0 placeholder:italic placeholder:text-slate-400 block w-full border border-slate-300 rounded-md py-2 pl-1.5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm bg-themeField" placeholder="Enter username" type="text" name="search"/>
            <input id="password" className="mt-6 ml-0 placeholder:italic placeholder:text-slate-400 block w-full border border-slate-300 rounded-md py-2 pl-1.5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm bg-themeField" placeholder="Enter password" type="password" name="search"/>
            <small className="mt-6"> Don't have an account? <button onClick={() => navigate("/signup")} className="text-slate-600 hover:cursor-pointer font-bold">Sign Up.</button></small>
            <button className="border border-solid border-gray-600 mt-3 p-1.5 pl-5 pr-5 rounded-md hover:bg-gray-100 font-bold" type="submit" onClick={(() => console.log("click"))}>Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
}
