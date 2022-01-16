import React, { useEffect, useState } from 'react';
import { selectUser, setUserCommunity } from "../user/userSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { httpGetAsync } from "../../utils";
import { useNavigate } from "react-router";

export function CommunityAdd() {
    let dispatch = useAppDispatch()
    let user = useAppSelector(selectUser)
    let [commState, setCommState]: any = useState("none")
    let [createdCode, setCreatedCode]: any = useState("")
    let [prepJoin, setPrepJoin]: any = useState(false)
    let [joinCode, setJoinCode]: any = useState("")
    let navigate = useNavigate()

    function createCommunity() {
        let url = `http://127.0.0.1:8888/api/v1/createCommunity?name=${user?.username}`;
        httpGetAsync(url, (res: string) => {
            let json = JSON.parse(res);
            setCommState("created")
            setCreatedCode(Object.keys(json)[0])
            dispatch(setUserCommunity(json))
        });
    }

    function joinCommunity() {
        let url = `http://127.0.0.1:8888/api/v1/joinCommunity?name=${user?.username}&code=${joinCode}`;
        httpGetAsync(url, (res: string) => {
            let json = JSON.parse(res);
            dispatch(setUserCommunity(json))
        });
        navigate("/community")
    }

    return (
        <div style={{width: "100vw", height: "100vh", backgroundImage: "url(/images/bgs/addCommunity.png)"}} className="flex flex-col justify-center content-center items-center bg-no-repeat bg-cover">
            <div className="w-3/4 h-5/6 rounded-3xl bg-no-repeat bg-cover bg-themeBlue flex flex-col justify-center content-center items-center drop-shadow-xl" style={{backgroundImage: "url(/images/bgs/addCommIllustration.png)"}}>
                <h1 className="text-6xl font-bold text-themeSepia mb-3">Join a community!</h1>
                <h1 className="text-2xl text-themeSepia mb-20">Reading is better with friends.</h1>
                <div className="flex flex-row justify-center content-center items-center mt-20 w-3/5">
                    <button className="bg-[#37337a] font-semibold text-2xl text-themeSepia rounded-lg pt-4 pb-4 pr-20 pl-20 mr-5" onClick={() => createCommunity()}>Create</button>
                    <button className="bg-[#37337a] font-semibold text-2xl text-themeSepia rounded-lg pt-4 pb-4 pr-20 pl-20 ml-5" onClick={() => setPrepJoin(true)}>Join</button>
                </div>
                {commState === "created" ? (<>
                    <h1 className="mt-10 text-themeSepia text-xl">Community created! Your join code is {createdCode} — share it with your friends so they can join in.</h1>
                    <button className="mt-10 bg-[#37337a] font-semibold text-2xl text-themeSepia rounded-lg pt-4 pb-4 pr-20 pl-20 mr-5" onClick={() => navigate("/home")}>Return Home</button>
                </>) : (prepJoin ? <>
                    <input id="code" className="mt-10 placeholder:italic placeholder:text-slate-400 block w-1/6 border border-slate-300 rounded-md py-2 pl-1.5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm bg-themeField"
                           placeholder="Enter Join Code" type="text" name="search" onChange={(e: any) => setJoinCode(e.target.value)}/>
                    <button className="mt-10 bg-[#37337a] font-semibold text-2xl text-themeSepia rounded-lg pt-4 pb-4 pr-20 pl-20" onClick={() => joinCommunity()}>Join Community</button>
                </> : <>
                    <h1 className="mt-20 text-themeSepia font-bold text-xl">Click "Create" or "Join" to either create your own community or join an existing one.</h1>
                </>)}
            </div>
            <button className="bg-[#37337a] font-semibold text-xl text-themeSepia rounded-lg pt-2 pb-2 pr-10 pl-10" style={{position: "absolute", top: "1vh", right: "1vh"}} onClick={() => navigate("/home")}>Back</button>
        </div>
    )
}