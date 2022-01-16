import React, { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setUserBooks, selectUser, selectUserBooks } from '../user/userSlice';
import { useNavigate } from 'react-router';
import { httpGetAsync } from "../../utils";

export function AddBook() {
    let user = useAppSelector(selectUser)
    let userBooks = useAppSelector(selectUserBooks)
    let navigate = useNavigate();
    let dispatch = useAppDispatch();
    let [cover, setCover] = useState(1)

    const colorMap = ["url(/images/covers/red.png)", "url(/images/covers/yellow.png)", "url(/images/covers/green.png)", "url(/images/covers/gray.png)"]

    function submit(e: any): void {
        e.preventDefault();

        let title = encodeURI(e.target.title.value)
        let author = encodeURI(e.target.author.value)
        let pages = encodeURI(e.target.pages.value)

        let url = `http://127.0.0.1:8888/api/v1/newBook?name=${user?.username}&title=${title}&author=${author}&pages=${pages}&cover_id=${cover}`

        httpGetAsync(url, (res: string) => {
            let json = JSON.parse(res);
            let name = json.name;

            if (json.err) {
                console.error(json.err);
            } else {
                dispatch(setUserBooks(json));
                navigate("/home");
            }
        });
    }

    return (
        <div className="bg-no-repeat bg-auto bg-center" style={{width: "100vw", height: "100vh", backgroundImage: `url(/images/bgs/addBook.png)`}}>
            <div className="flex flex-col justify-center content-center items-center">
                <div style={{width:"10rem", height: "14rem", backgroundImage: colorMap[cover-1]}} className="m-10 bg-no-repeat bg-cover"></div>
                <div className="flex flex-row justify-center content-center items-center mb-12">
                    <button className="m-5 w-20 h-20 bg-themeRed rounded-lg" onClick={() => setCover(1)}></button>
                    <button className="m-5 w-20 h-20 bg-themeYellow rounded-lg" onClick={() => setCover(2)}></button>
                    <button className="m-5 w-20 h-20 bg-themeGreen rounded-lg" onClick={() => setCover(3)}></button>
                    <button className="m-5 w-20 h-20 bg-themeGray rounded-lg" onClick={() => setCover(4)}></button>
                </div>
                <form className="w-1/3 flex flex-col justify-center content-center items-center" onSubmit={submit}>
                    <div className="flex flex-row justify-center items-center place-content-center content-center w-full">
                      <h1 className="m-5 text-2xl font-bold text-themeBlue text-center">Title</h1>
                      <input id="title" className="mt-6 mb-6 placeholder:italic placeholder:text-slate-400 block w-full border border-slate-300 rounded-lg py-2 pl-1.5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" style={{backgroundColor: "#e6f0e3"}} placeholder="Enter title of book" type="text"/>
                    </div>
                    <div className="flex flex-row justify-center items-center place-content-center content-center w-full">
                      <h3 className=" m-5 text-2xl font-semibold text-themeBlue">Author</h3>
                      <input id="author" className="mt-6 mb-6 placeholder:italic placeholder:text-slate-400 block w-full border border-slate-300 rounded-lg py-2 pl-1.5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" style={{backgroundColor: "#e6f0e3"}} placeholder="Enter author of book" type="text"/>
                    </div>
                    <div className="flex flex-row justify-center items-center place-content-center content-center w-full">
                      <h2 className="m-5 text-2xl font-semibold text-themeBlue">Pages</h2>
                      <input id="pages" className="mt-6 mb-6 placeholder:italic placeholder:text-slate-400 block w-full border border-slate-300 rounded-lg py-2 pl-1.5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" style={{backgroundColor: "#e6f0e3"}} placeholder="Enter total # of pages" type="number"/>
                    </div>
                    <button className="border border-solid border-gray-600 mt-3 p-1.5 pl-5 pr-5 rounded-md font-bold text-themeBlue" type="submit">Add book</button>
                </form>
            </div>
            <button className="bg-[#37337a] font-semibold text-xl text-themeSepia rounded-lg pt-2 pb-2 pr-10 pl-10" style={{position: "absolute", top: "1vh", right: "1vh"}} onClick={() => navigate("/home")}>Back</button>
        </div>
    );
}
