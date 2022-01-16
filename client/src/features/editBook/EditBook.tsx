import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setUserBooks, selectUser, selectUserBooks } from '../user/userSlice';
import { useNavigate, useLocation } from 'react-router';
import { httpGetAsync } from "../../utils";

export function EditBook() {
    let user = useAppSelector(selectUser)
    let userBooks: any = useAppSelector(selectUserBooks)
    let navigate = useNavigate();
    const location: any = useLocation()
    let [pagesToAdd, _setPagesToAdd] = useState(0);

    const colorMap = ["url(/images/covers/red.png)", "url(/images/covers/yellow.png)", "url(/images/covers/green.png)", "url(/images/covers/gray.png)"]
    const id = location.state.id

    let [cover, setCover] = useState(1);

    useEffect(() => {
      setCover(userBooks[id].cover_id);
    }, []);

    function setPagesToAdd(n: number): void {
      if (userBooks[id].currentPages + n > userBooks[id].pages) {
        _setPagesToAdd(userBooks[id].pages - userBooks[id].currentPages);
      } else {
        _setPagesToAdd(n)
      }
    }

    function submit(e: any): void {
        e.preventDefault();

        let url = `http://127.0.0.1:8888/api/v1/addPages?name=${user?.username}&id=${id}&pages=${pagesToAdd}`

        httpGetAsync(url, (res: string) => {
            let json = JSON.parse(res);

            if (json.err) {
                console.error(json.err);
            } else {
                navigate("/home");
            }
        });
    }

    return (
        <div className="text-themeSepia bg-no-repeat bg-auto bg-center" style={{width: "100vw", height: "100vh", backgroundImage: `url(images/bgs/editBook.png`}}>
            <div className="flex flex-col justify-center content-center items-center">
                <div className="w-1/2 flex flex-col justify-center content-center items-center mt-12">
                    <div style={{width:"10rem", height: "14rem", backgroundImage: colorMap[cover-1]}} className="m-10 bg-no-repeat bg-cover"></div>
                    <h1 className="mt-5 text-6xl font-black">{userBooks[id]?.title}</h1>
                    <h3 className="mt-2 text-3xl font-semibold">{userBooks[id]?.author}</h3>
                    <h2 className="mt-8 text-4xl font-semibold">Add Pages</h2>
                    <div className="mt-5 flex flex-row justify-center content-center items-center">
                        <button type="button" className="rounded-xl border border-solid p-2 w-1/3 m-3 border-themeSepia text-themeSepia" onClick={() => setPagesToAdd(pagesToAdd+1)}>+1</button>
                        <button type="button" className="rounded-xl border border-solid p-2 w-1/3 m-3 border-themeSepia text-themeSepia" onClick={() => setPagesToAdd(pagesToAdd+5)}>+5</button>
                        <button type="button" className="rounded-xl border border-solid p-2 w-1/3 m-3 border-themeSepia text-themeSepia" onClick={() => setPagesToAdd(pagesToAdd+10)}>+10</button>
                        <button type="button" className="rounded-xl border border-solid p-2 w-1/3 m-3 border-themeSepia text-themeSepia" onClick={() => setPagesToAdd(pagesToAdd+50)}>+50</button>
                    </div>
                    <div className="mt-5 w-full h-5 bg-themeSepia rounded-md">
                        <div className="h-full bg-themeProgress rounded-md" style={{width: `${100*(userBooks[id]?.currentPages+pagesToAdd)/userBooks[id]?.pages}%`}}>
                            <div className="h-full bg-[#443f8e] rounded-md" style={{width: `${100*userBooks[id]?.currentPages/(userBooks[id]?.currentPages + pagesToAdd)}%`}}></div>
                        </div>
                    </div>
                    <div className="mt-7">
                        <h1 className="text-5xl font-bold">{userBooks[id]?.currentPages+pagesToAdd} / {userBooks[id]?.pages}</h1>
                        <p className="mt-1 text-2xl font-medium">pages</p>
                    </div>
                    <button className="border border-solid border-gray-600 mt-3 p-1.5 pl-5 pr-5 rounded-md hover:bg-gray-100 font-bold" onClick={submit}>Save Changes</button>
                </div>
            </div>
            <button className="bg-[#37337a] font-semibold text-xl text-themeSepia rounded-lg pt-2 pb-2 pr-10 pl-10" style={{position: "absolute", top: "1vh", right: "1vh"}} onClick={() => navigate("/home")}>Back</button>
        </div>
    )
}
