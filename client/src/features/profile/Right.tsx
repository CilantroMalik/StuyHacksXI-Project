import React, { CSSProperties, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setUser, selectUser, selectUserBooks, setUserBooks, setUserHistory } from '../user/userSlice';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { httpGetAsync } from '../../utils';
import { useCookies } from "react-cookie";

export function Right() {
  let navigate = useNavigate();
  let user = useAppSelector(selectUser);
  let dispatch = useAppDispatch();
  let userBooks: any = useAppSelector(selectUserBooks);
  const colorMap = ["url(/images/covers/red.png)", "url(/images/covers/yellow.png)", "url(/images/covers/green.png)", "url(/images/covers/gray.png)"]
  let [_, __, removeCookie] = useCookies(["user"]);

  function getBooks() {
    let url = `http://127.0.0.1:8888/api/v1/getCollection?name=${user?.username}`
    httpGetAsync(url, (res: string) => {
      let json = JSON.parse(res);
      if (json.err) {
        console.error(json.err);
        return;
      } else {
        dispatch(setUserBooks(json));
      }
    });
  }

  function getHistory() {
    let url = `http://127.0.0.1:8888/api/v1/getHistory?name=${user?.username}`;
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
    navigate("/editBook", {
      state: {id}
    });
  }

  function markCompleted(bookId: string) {
    const url = `http://127.0.0.1:8888/api/v1/removeBook?name=${user?.username}&id=${bookId}`;
    httpGetAsync(url, (res: string) => {
      let json = JSON.parse(res);
      if (json.err) {
        console.error(json.err);
      }
      getBooks();
      getHistory();
      navigate("/");
    });
  }

  function signOut() {
    const url = `http://127.0.0.1:8888/api/v1/logout?name=${user?.username}`;
    httpGetAsync(url, (res: string) => {
      let json = JSON.parse(res);
      if (json.err) {
        console.error(json.err);
      }
      removeCookie("user");
      dispatch(setUser({ username: null, signedIn: false }));
      navigate("/");
    });
  }

  useEffect(getBooks, []);

  return (
    <div style={{padding: 60, flex: 0.6}}>
      <button className="fixed top-5 right-5 text-themeBlue font-bold" onClick={signOut}>Sign Out</button>
      <h1 className="text-2xl font-bold" style={{color: "#201e50"}}>
        Current Books
      </h1>

      { Object.keys(userBooks).filter(k => k !== "history").map(i => <div key={i} style={{display: 'flex', flexDirection: 'row', alignItems: 'start', marginTop: 30}}>
        <div style={{minWidth: "7rem", maxWidth: "7rem", height: "10rem", backgroundImage: colorMap[userBooks[i].cover_id-1]}} onClick={() => editBook(i)} className="hover:cursor-pointer bg-no-repeat bg-cover"></div>
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

          <button className="ml-0 mr-auto" onClick={() => markCompleted(i)}>Mark as Completed</button>
        </div>
      </div>) }

      { countBooks() < 4 && <button className="mt-6 rounded-lg" onClick={() => navigate("/addbook")} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', border: "1px solid #201e50", paddingLeft: 5, paddingRight: 15, paddingTop: 10, paddingBottom: 10}}>
        <h1 className="text-2xl ml-4" style={{color: "#201e50", display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <p className="text-xl mr-4"><FontAwesomeIcon icon={faPlus} /></p>
          Add Book
        </h1>
      </button> }
    </div>
  );
}
