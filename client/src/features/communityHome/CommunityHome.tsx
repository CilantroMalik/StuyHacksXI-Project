import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {selectUserCommunity, selectUser, setUserCommunity} from "../user/userSlice";
import { httpGetAsync } from "../../utils";
import { nanoid } from "@reduxjs/toolkit";

export function CommunityHome() {
    let user = useAppSelector(selectUser)
    let [page, setPage] = useState(1)
    let comm: any = useAppSelector(selectUserCommunity)
    let dispatch = useAppDispatch()
    let [collections, setCollections]: any = useState({})
    let navigate = useNavigate()

    function getCommunity() {
        let url = `http://127.0.0.1:8888/api/v1/getCommunity?name=${user?.username}`;
        httpGetAsync(url, (res: string) => {
            let json = JSON.parse(res);
            console.log(json)
            dispatch(setUserCommunity(json));
        });
        console.log(comm)
    }

    function populateCollections() {
        let newCollections = collections
        console.log(comm[Object.keys(comm)[0]].owner)
        let url = `http://127.0.0.1:8888/api/v1/getCollection?name=${comm[Object.keys(comm)[0]].owner}`;
        httpGetAsync(url, (res: string) => {
            let json = JSON.parse(res);
            if (json.err) {
                console.log("setting to empty")
                newCollections[comm[Object.keys(comm)[0]].owner] = "empty"
            } else {
                let ownerCollection: any[] = []
                console.log("owner", json)
                Object.keys(json).filter(k => k !== "history").forEach(k => ownerCollection.push({
                    title: json[k].title,
                    progress: 100 * json[k].currentPages / json[k].pages
                }))
                console.log("owner collection", ownerCollection)
                newCollections[comm[Object.keys(comm)[0]].owner] = ownerCollection
            }
            console.log("owner set", newCollections)
            setCollections({...newCollections})
            //setCollections(newCollections)
        });
        console.log("members unfiltered", comm[Object.keys(comm)[0]].members)
        comm[Object.keys(comm)[0]].members.filter((m: any) => m !== comm[Object.keys(comm)[0]].owner).forEach((k: any) => {
            let url = `http://127.0.0.1:8888/api/v1/getCollection?name=${k}`;
            httpGetAsync(url, (res: string) => {
                let json = JSON.parse(res);
                if (json.err) {
                    console.log("setting to empty")
                    newCollections[k] = "empty"
                } else {
                    let memberCollection: any[] = []
                    Object.keys(json).filter(k => k !== "history").forEach(k => memberCollection.push({
                        title: json[k].title,
                        progress: 100 * json[k].currentPages / json[k].pages
                    }))
                    newCollections[k] = memberCollection
                }
                console.log("member set", newCollections)
                setCollections({...{...newCollections}})
            });
        });
        // console.log(newCollections)
        // setCollections(newCollections);
    }

    useEffect(() => {
        console.log("initializing", comm)
        // getCommunity();
        populateCollections();
        console.log("done initializing")
    }, [])

    return (
        <div style={{width: "100vw", height: "100vh", backgroundImage: "url(/images/bgs/community.png)"}} className="flex flex-col bg-cover bg-no-repeat content-center items-center">
            <div className="h-1/6 w-4/5 flex flex-row justify-left content-center items-center">
                <h1 className="text-themeSepia text-5xl font-bold">Your community</h1>
                {/* <button className="text-3xl bg-[#282565] rounded-2xl text-themeSepia pr-6 pl-6 pt-2 pb-2 ml-8">Leave</button> */}
            </div>
            <div className="grid grid-rows-3 grid-cols-2 gap-10 justify-around justify-items-stretch w-4/5 h-2/3">
                {console.log("rendered")}
                {Object.keys(collections).slice(page === 1 ? 0 : 6, page === 1 ? Math.min(Object.keys(collections).length, 6) : Math.min(Object.keys(collections).length, 12)).map((username: any) => {
                    console.log("mapping", username)
                    return (<div key={nanoid()} className="flex flex-row justify-center content-center items-center bg-[#282565] rounded-xl justify-items-stretch">
                        <div className="flex bg-themeSepia rounded-full ml-10 justify-center content-center items-center" style={{width: "15vh", height: "11vh"}}><p>{username}</p></div>
                        <div className="flex flex-col justify-evenly p-10 w-full">
                            { collections[username] === "empty" ? <h1 className="font-bold text-themeSepia text-3xl">No Books</h1> :
                                collections[username].slice(0, Math.min(collections[username].length, 3)).map((obj: any) => <>
                                <h1 key={nanoid()} className="font-bold text-themeSepia text-2xl mb-1">{obj.title}</h1>
                                <div className="h-3 w-full rounded-md bg-themeSepia mb-3"><div className="h-full rounded-md bg-themeProgress" style={{width: `${obj.progress}%` }}> </div></div>
                            </>)}
                        </div>
                    </div>)
                })}
            </div>
            <div className="flex flex-row justify-center content-center items-center mt-20">
                <button className="text-5xl text-themeSepia border border-solid border-themeSepia rounded-full mr-10" onClick={() => setPage(Math.max(1, page-1))}>&lt;</button>
                <h1 className="text-4xl text-themeSepia font-semibold">{page}/2</h1>
                <button className="text-5xl text-themeSepia border border-solid border-themeSepia rounded-full ml-10" disabled={Object.keys(collections).length <= 6} onClick={() => setPage(Math.min(2, page+1))}>&gt;</button>
            </div>
            <button className="bg-[#37337a] font-semibold text-xl text-themeSepia rounded-lg pt-2 pb-2 pr-10 pl-10" style={{position: "absolute", top: "1vh", right: "1vh"}} onClick={() => navigate("/home")}>Back</button>
        </div>
    )
}
