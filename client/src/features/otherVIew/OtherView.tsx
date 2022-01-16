import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { httpGetAsync } from "../../utils";

export function OtherView() {
    let navigate = useNavigate();
    const location = useLocation()
    // let dispatch = useAppDispatch();
    let [userBooks, setUserBooks] = useState(null)

    const colorMap = ["themeRed", "themeYellow", "themeGreen", "themeGray"]
    // @ts-ignore
    const user = location.state.user
    // @ts-ignore
    const id = location.state.id

    useEffect(() => {
        let url = `http://127.0.0.1:8888/api/v1/getCollection?name=${user}`;
        httpGetAsync(url, (res: string) => {
            let json = JSON.parse(res);
            setUserBooks(json);
        });
    }, []);

    return (
        <div style={{width: "100vw", height: "100vh", backgroundImage: `url(/images/bgs/viewBook.png`}}>
            <div className="flex flex-col justify-center content-center items-center">
                {/*@ts-ignore*/}
                <div style={{width: "10vw", height: "30vh"}} className={`m-10 bg-${colorMap[userBooks[id].cover_id-1]}`}></div>
                <div className="w-1/2 flex flex-col justify-center content-center items-center">
                    {/*@ts-ignore*/}
                    <h1 className="mt-5 text-6xl font-black">{userBooks[id].title}</h1>
                    {/*@ts-ignore*/}
                    <h3 className="mt-2 text-3xl font-semibold">{userBooks[id].author}</h3>
                    <div className="mt-5 w-full h-5 bg-themeSepia rounded-md">
                        {/*@ts-ignore*/}
                        <div className="h-full bg-themeProgress rounded-md" style={{width: `${100*(userBooks[id].currentPages)/userBooks[id].pages}%`}}></div>
                    </div>
                    <div className="mt-7">
                        {/*@ts-ignore*/}
                        <h1 className="text-5xl font-bold">{userBooks[id].currentPages} / {userBooks[id].pages}</h1>
                        <p className="mt-1 text-2xl font-medium">pages</p>
                    </div>
                    <div className="m-5 text-themeRed text-2xl">{user.toUpperCase()}'S PROGRESS</div>
                </div>
            </div>
        </div>
    )
}
