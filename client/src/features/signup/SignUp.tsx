import React, { CSSProperties } from 'react';
import { httpGetAsync } from '../../utils';

export function SignUp() {
  const cardStyle: CSSProperties = {
      backgroundColor: 'white',
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
    width: "100vw",
    height: "100vh",
    position: "absolute", top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
  }

  function createAccount(e: any): void {
    e.preventDefault();
    let username = encodeURI(e.target.username.value);
    let pwd = encodeURI(e.target.password.value);

    let url = `http://127.0.0.1:8888/api/v1/register?name=${username}&pwd=${pwd}`
    httpGetAsync(url, (res: string) => {
      console.log(res);
    });

    e.target.username.value = "";
    e.target.username.password = "";
  }

  return (
    <div style={pageStyles}>
      <div style={cardStyle}>
        <div style={{flex: 1, display: "flex", alignItems: "center", width: "100%"}}>
          <form onSubmit={createAccount} style={{margin: "10px", display: "flex", flexDirection: "column", alignItems: "start", flex: 1}}>
            <h1 className="text-3xl font-bold">
              Create an Account
            </h1>
            <input id="username" className="mt-6 ml-0 placeholder:italic placeholder:text-slate-400 block w-full border border-slate-300 rounded-md py-2 pl-1.5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" style={{backgroundColor: "#ebebeb"}} placeholder="Username" type="text" name="search"/>
            <input id="password" className="mt-6 ml-0 placeholder:italic placeholder:text-slate-400 block w-full border border-slate-300 rounded-md py-2 pl-1.5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" style={{backgroundColor: "#ebebeb"}} placeholder="Password" type="password" name="search"/>
            <small className="mt-6"> Already have an account? <button className="text-blue-600 hover:cursor-pointer font-bold">Login.</button></small>
            <button className="border border-solid border-gray-600 mt-3 p-1.5 pl-5 pr-5 rounded-md hover:bg-gray-100 font-bold" type="submit">Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
}
