import React, { CSSProperties, useState, useEffect } from 'react';
import { httpGetAsync } from '../../utils';
import { useAppDispatch } from '../../app/hooks';
import { setUser } from '../user/userSlice';
import { useNavigate } from 'react-router';

export function SignUp() {
  let navigate = useNavigate();
  let dispatch = useAppDispatch();
  let [errorMessage, setErrorMessage] = useState(null);

  const cardStyle: CSSProperties = {
      backgroundColor: '#f1f7ed',
      width: "30vw",
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
    backgroundImage: `url(/images/bgs/signUp.png)`,
    width: "100vw",
    height: "100vh",
    position: "absolute", top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
  };

  function signOut() {
    const url = `http://127.0.0.1:8888/api/v1/logout?name=${user?.username}`;
    httpGetAsync(url, (res: string) => {
      let json = JSON.parse(res);
      if (json.err) {
        console.error(json.err);
      }
      removeCookie("user");
      dispatch(setUser({ username: null, signedIn: false }));
    });
  }

  function submit(e: any): void {
    e.preventDefault();
    setErrorMessage(null);

    let username = encodeURI(e.target.username.value);
    let pwd = encodeURI(e.target.password.value);

    let url = `http://127.0.0.1:8888/api/v1/register?name=${username}&pwd=${pwd}`

    httpGetAsync(url, (res: string) => {
      let json = JSON.parse(res);
      
      if (json.err) {
        console.error(json.err);
        setErrorMessage(json.err);
      } else {
        navigate("/signin");
      }
    });

    e.target.username.value = "";
    e.target.username.password = "";
  }

  useEffect(() => {
    //TODO: we cannot let this stay as is; probably just don't allowed logged
    // in users to access this route at all
    signOut();
    dispatch(setUser({username: null, signedIn: false}));
  }, []);

  return (
    <div style={pageStyles}>
      <div style={cardStyle}>
        <div className="flex flex-row flex-1 items-center w-full"> {/* style={{flex: 1, display: "flex", alignItems: "center", width: "100%"}} */}
          <form className="flex flex-col flex-1 m-3 items-start w-full" onSubmit={submit}> {/* style={{margin: "10px", display: "flex", flexDirection: "column", alignItems: "start", flex: 1}} */}
            <h1 className="text-3xl font-bold">
              Create an Account
            </h1>
            { errorMessage !== null && <div className="rounded-md mt-6 bg-red-200 w-full p-5">
              <p>{errorMessage}</p>
            </div> }
            <input id="username" className="mt-6 ml-0 placeholder:italic placeholder:text-slate-400 block w-full border border-slate-300 rounded-md py-2 pl-1.5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm bg-themeField" placeholder="Username" type="text" name="search"/>
            <input id="password" className="mt-6 ml-0 placeholder:italic placeholder:text-slate-400 block w-full border border-slate-300 rounded-md py-2 pl-1.5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm bg-themeField" placeholder="Password" type="password" name="search"/>
            <small className="mt-6"> Already have an account? <button onClick={() => navigate("/signin")} className="text-slate-600 hover:cursor-pointer font-bold">Login.</button></small>
            <button className="border border-solid border-gray-600 mt-3 p-1.5 pl-5 pr-5 rounded-md hover:bg-gray-100 font-bold" type="submit">Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
}
