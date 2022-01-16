import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../app/hooks";
import { selectUserCommunity } from "../user/userSlice";

export function CommunityHome() {

    let [page, setPage] = useState(1)

    return (
        <div style={{width: "100vw", height: "100vh", backgroundImage: "url(/images/bgs/community.png)"}} className="flex flex-col bg-cover bg-no-repeat content-center items-center">
            <div className="h-1/6 w-4/5 flex flex-row justify-left content-center items-center">
                <h1 className="text-themeSepia text-5xl font-bold">Your community</h1>
                <button className="text-3xl bg-[#282565] rounded-2xl text-themeSepia pr-6 pl-6 pt-2 pb-2 ml-8">Leave</button>
            </div>
            <div className="grid grid-rows-3 grid-cols-2 gap-10 justify-around justify-items-stretch w-4/5 h-2/3">
                {[0, 1, 2, 3, 4, 5].map(i =>
                    <div key={i} className="flex flex-row justify-center content-center items-center bg-[#282565] rounded-xl justify-items-stretch">
                        <div className="bg-themeSepia rounded-full ml-10" style={{width: "15vh", height: "11vh"}}></div>
                        <div className="flex flex-col justify-evenly p-10 w-full">
                            {[0, 1, 2].map(i => <>
                                <h1 key={i} className="font-bold text-themeSepia text-2xl mb-1">Title of book</h1>
                                <div className="h-3 w-full rounded-md bg-themeSepia mb-4"><div className="h-full rounded-md bg-themeProgress" style={{width: "68%"}}></div></div>
                            </>)}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-row justify-center content-center items-center mt-20">
                <button className="text-5xl text-themeSepia border border-solid border-themeSepia rounded-full mr-10" onClick={() => setPage(Math.max(1, page-1))}>&lt;</button>
                <h1 className="text-4xl text-themeSepia font-semibold">{page}/2</h1>
                <button className="text-5xl text-themeSepia border border-solid border-themeSepia rounded-full ml-10" onClick={() => setPage(Math.min(2, page+1))}>&gt;</button>
            </div>
        </div>
    )
}
