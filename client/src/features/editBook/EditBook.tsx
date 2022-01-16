import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setUserBooks, selectUser, selectUserBooks } from '../user/userSlice';
import { useNavigate, useLocation } from 'react-router';
import { httpGetAsync } from "../../utils";

export function EditBook() {
    let user = useAppSelector(selectUser)
    let userBooks: any = useAppSelector(selectUserBooks)
    let navigate = useNavigate();
    const location = useLocation()
    // let dispatch = useAppDispatch();
    let [pagesToAdd, setPagesToAdd] = useState(0);

    const colorMap = ["themeRed", "themeYellow", "themeGreen", "themeGray"]
    // @ts-ignore
    const id = location.state.id

    let [cover, setCover] = useState(colorMap[3]);

    useEffect(() => {
      // setCurrentBook({...userBooks[id]});
      // @ts-ignore
      console.log("EDIT", userBooks[id]);
      setCover(colorMap[userBooks[id].cover_id-1]);
    }, []);

    function submit(e: any): void {
        e.preventDefault();

        let url = `http://127.0.0.1:8888/api/v1/addPages?name=${user?.username}&id=${id}&pages=${pagesToAdd}`

        httpGetAsync(url, (res: string) => {
            let json = JSON.parse(res);

            if (json.err) {
                console.error(json.err);
            } else {
                // dispatch(setUserBooks(json));
                navigate("/home");
            }
        });
    }

    return (
        <div style={{width: "100vw", height: "100vh"}} className="bg-blue-300">
            <div className="flex flex-col justify-center content-center items-center">
                {/*@ts-ignore*/}
                <div style={{width: "10vw", height: "30vh"}} className={`m-10 bg-${cover}`}></div>
                <div className="w-1/2 flex flex-col justify-center content-center items-center">
                    {/*@ts-ignore*/}
                    <h1 className="mt-5 text-6xl font-black">{userBooks[id].title}</h1>
                    {/*@ts-ignore*/}
                    <h3 className="mt-2 text-3xl font-semibold">{userBooks[id].author}</h3>
                    <h2 className="mt-8 text-4xl font-semibold">Add Pages</h2>
                    <div className="mt-5 flex flex-row justify-center content-center items-center">
                        <button type="button" className="rounded-xl border border-solid p-2 w-1/3 m-3 border-themeSepia text-themeSepia" onClick={() => setPagesToAdd(pagesToAdd+1)}>+1</button>
                        <button type="button" className="rounded-xl border border-solid p-2 w-1/3 m-3 border-themeSepia text-themeSepia" onClick={() => setPagesToAdd(pagesToAdd+5)}>+5</button>
                        <button type="button" className="rounded-xl border border-solid p-2 w-1/3 m-3 border-themeSepia text-themeSepia" onClick={() => setPagesToAdd(pagesToAdd+10)}>+10</button>
                        <button type="button" className="rounded-xl border border-solid p-2 w-1/3 m-3 border-themeSepia text-themeSepia" onClick={() => setPagesToAdd(pagesToAdd+50)}>+50</button>
                    </div>
                    <div className="mt-5 w-full h-5 bg-themeSepia rounded-md">
                        {/*@ts-ignore*/}
                        <div className="h-full bg-themeProgress rounded-md" style={{width: `${100*(userBooks[id].currentPages+pagesToAdd)/userBooks[id].pages}%`}}>
                            {/*@ts-ignore*/}
                            <div className="h-full bg-[#443f8e] rounded-md" style={{width: `${100*userBooks[id].currentPages/(userBooks[id].currentPages + pagesToAdd)}%`}}></div>
                        </div>
                    </div>
                    <div className="mt-7">
                        {/*@ts-ignore*/}
                        <h1 className="text-5xl font-bold">{userBooks[id].currentPages+pagesToAdd} / {userBooks[id].pages}</h1>
                        <p className="mt-1 text-2xl font-medium">pages</p>
                    </div>
                    <button className="border border-solid border-gray-600 mt-3 p-1.5 pl-5 pr-5 rounded-md hover:bg-gray-100 font-bold" onClick={submit}>Save Changes</button>
                </div>
            </div>
        </div>
    )
}
