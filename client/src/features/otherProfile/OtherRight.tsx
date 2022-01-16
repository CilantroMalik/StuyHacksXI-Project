import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setUser, selectUser, selectUserBooks, setUserBooks, setUserHistory } from '../user/userSlice';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { httpGetAsync } from '../../utils';

export function Right({user} : {user: string}) {
    let navigate = useNavigate();
    let dispatch = useAppDispatch();
    let [userBooks, setUserBooks]: any = useState({});
    const colorMap = ["url(/images/covers/red.png)", "url(/images/covers/yellow.png)", "url(/images/covers/green.png)", "url(/images/covers/gray.png)"]

    function getBooks() {
        let url = `http://127.0.0.1:8888/api/v1/getCollection?name=${user}`
        httpGetAsync(url, (res: string) => {
            let json = JSON.parse(res);
            if (json.err) {
                console.error(json.err);
                return;
            } else {
                setUserBooks(json)
            }
        });
    }

    function getHistory() {
        let url = `http://127.0.0.1:8888/api/v1/getHistory?name=${user}`;
        httpGetAsync(url, (res: string) => {
            let json = JSON.parse(res);
            if (json.err) {
                console.error("HISTORY", json.err);
                dispatch(setUserHistory([]));
                return;
            }
            dispatch(setUserHistory(json));
        });
    }

    function countBooks(): number {
        if (userBooks["history"]) {
            return Object.keys(userBooks).length - 1;
        }
        return Object.keys(userBooks).length;
    }

    function editBook(id: string) {
        navigate("/otherView", {
            state: {user, id}
        });
    }

    useEffect(getBooks, []);

    return (
        <div style={{padding: 60, flex: 0.6}}>
            <h1 className="text-2xl font-bold" style={{color: "#201e50"}}>
                Current Books
            </h1>

            { Object.keys(userBooks).filter(k => k !== "history").map(i => <div key={i} style={{display: 'flex', flexDirection: 'row', alignItems: 'start', marginTop: 30}}>
                <div style={{minWidth: "7rem", maxWidth: "7rem", height: "10rem", backgroundImage: colorMap[userBooks[i].cover_id-1]}} className="bg-no-repeat bg-cover"></div>
                <div className="ml-4" style={{display: 'flex', flexDirection: 'column', justifyContent: "space-evenly", width: "100%", height: "100%"}}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'start'}}>
                        <h1 className="text-2xl font-bold" style={{color: "#201e50"}}>
                            {userBooks[i].title}
                        </h1>
                        <h1 className="text-2xl ml-2" style={{color: "#201e50"}}>
                            by {userBooks[i].author}
                        </h1>
                    </div>

                    <div className="h-5 rounded-md w-full p-0" style={{backgroundColor: '#dae3d3'}}>
                        <div className="rounded-md m-0 h-full" style={{width: `${100*userBooks[i].currentPages/userBooks[i].pages}%`, backgroundColor: '#eb5160'}}></div>
                    </div>
                </div>
            </div>) }
        </div>
    );
}