import React, { CSSProperties, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setUser, selectUser, selectUserBooks, setUserBooks } from '../user/userSlice';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { httpGetAsync } from '../../utils';

export function Right() {
  let navigate = useNavigate();
  let user = useAppSelector(selectUser);
  let dispatch = useAppDispatch();
  let userBooks: any = useAppSelector(selectUserBooks);
  // let userBooks: any = {"a": {title: "title"}, "b": {title: "title"}, "c": {title: "title"}, "d": {title: "title"}, "history": {}};

  const colorMap = ["url(/images/covers/red.png)", "url(/images/covers/yellow.png)", "url(/images/covers/green.png)", "url(/images/covers/gray.png)"]

  useEffect(() => {
    let url = `http://127.0.0.1:8888/api/v1/getCollection?name=${user?.username}`
    httpGetAsync(url, (res: string) => {
      let json = JSON.parse(res);
      if (json.err) {
        console.log(json.err);
        return;
      } else {
        dispatch(setUserBooks(json));
      }
    });
  }, []);

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

  return (
    <div style={{padding: 60, flex: 0.6}}>
      <h1 className="text-2xl font-bold" style={{color: "#201e50"}}>
        Current Books
      </h1>

      { Object.keys(userBooks).filter(k => k !== "history").map(i => <div key={i} style={{display: 'flex', flexDirection: 'row', alignItems: 'start', marginTop: 30}}>
        <div style={{width: "10rem", height: "14rem", backgroundImage: colorMap[userBooks[i].cover_id-1]}} onClick={() => editBook(i)} className="hover:cursor-pointer bg-no-repeat bg-cover"></div>
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
            <div className="rounded-md m-0 h-full" style={{width: "75%", backgroundColor: '#eb5160'}}></div>
          </div>
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
