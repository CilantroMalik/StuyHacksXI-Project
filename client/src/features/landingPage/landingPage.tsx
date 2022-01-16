import React from 'react';

import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center content-center" style={{width: "100vw", height: "100vh", backgroundImage: "url(/images/bgs/landing.png)"}}>
      <div className="text-center mb-16">
        <h1 className="text-9xl font-bold text-themeSepia">book it!</h1>
        <h1 className="text-4xl text-themeSepia">don't run from reading</h1>
      </div>

      <div className="m-12 text-3xl flex flex-col justify-center items-center content-center">
        <button className="rounded-3xl py-3 px-24 bg-[#7b4248] text-themeSepia mb-6" onClick={() => navigate("/signup")}>Sign Up</button>
        <button className="rounded-3xl py-3 px-24 text-themeSepia border border-solid w-full" onClick={() => navigate("/signin")}>Log In</button>
      </div>
    </div>
  );
}
