import React, { CSSProperties, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setUser, selectUser, selectUserBooks, selectUserHistory, setUserHistory, setUserCommunity } from '../user/userSlice';
import { useNavigate } from 'react-router';
import { httpGetAsync } from '../../utils';
import { BookDetailModal } from '../bookDetailModal/BookDetailModal';

export function Left() {
  let navigate = useNavigate();
  let dispatch = useAppDispatch();
  let user = useAppSelector(selectUser);
  let history: any = useAppSelector(selectUserHistory);
  let userBooks: any = useAppSelector(selectUserBooks);
  let [stats, setStats]: any = useState(null);
  let [topHistory, setTopHistory]: any = useState(null);
  let [noHistory, setNoHistory]: any = useState(false);
  let [hasCommunity, setHasCommunity]: any = useState(true);
  let [selectedBook, setSelectedBook]: any = useState(null);

  const colorMap = ["url(/images/covers/red.png)", "url(/images/covers/yellow.png)", "url(/images/covers/green.png)", "url(/images/covers/gray.png)"]
  const historyTemplate = [[{id: 1}, {id: 2}, {id: 3}, {id: 4}], [{id: 5}, {id: 6}, {id: 7}]];

  const leftStyles: CSSProperties = {
    flex: 0.4,
    minWidth: 600,
    maxWidth: 600,
    backgroundColor: "#1A1847",
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  }

  const circleStyles: CSSProperties = {
    borderRadius: 164/2,
    // backgroundColor: '#f1f7ed',
    width: "164px",
    height: "164px",
  }

  const rowStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '20px 20px'
  }

  function getStats() {
    let url = `http://127.0.0.1:8888/api/v1/getStats?name=${user?.username}`;
    httpGetAsync(url, (res: string) => {
      let json = JSON.parse(res);
      setStats(json);
    });
  }

  function getCommunity() {
    console.log("getting community for", user?.username)
    let url = `http://127.0.0.1:8888/api/v1/getCommunity?name=${user?.username}`;
    httpGetAsync(url, (res: string) => {
      let json = JSON.parse(res);
      console.log(json)
      if (json.err) {
          setHasCommunity(false)
      }
    });
  }

  function getCommunityAndNavigate() {
    console.log("getting community for", user?.username)
    let url = `http://127.0.0.1:8888/api/v1/getCommunity?name=${user?.username}`;
    httpGetAsync(url, (res: string) => {
      let json = JSON.parse(res);
      dispatch(setUserCommunity(json));
      navigate("/community");
    });
  }

  function getHistory() {
    let url = `http://127.0.0.1:8888/api/v1/getHistory?name=${user?.username}`;
    httpGetAsync(url, (res: string) => {
      let json = JSON.parse(res);
      if (json.err) {
        console.error("HISTORY", json.err);
        setNoHistory(true);
        dispatch(setUserHistory([]));
        return;
      }
      dispatch(setUserHistory(json));
    });
  }

  useEffect(() => {
    getStats();
    getHistory();
    console.log(user);
    getCommunity();
  }, []);

  useEffect(() => {
    if (!noHistory) {
      let newTopHistory = topHistory !== null ? topHistory : [[{id: 1}, {id: 2}, {id: 3}, {id: 4}], [{id: 5}, {id: 6}, {id: 7}]];
      for (let i = 0; i < 7; i++) {
        if (i >= history.length) break;
        if (i < 4) newTopHistory[0][i] = history[i];
        else newTopHistory[1][i-4] = history[i];
        setTopHistory(newTopHistory);
      }
    }
  }, [history]);

  return (
      <div style={leftStyles}>
        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <div className="bg-no-repeat bg-center bg-cover" style={{...circleStyles, backgroundImage: `url(/images/avatars/avatar${user?.avatar}.png)`}}></div>
          <h1 className="text-4xl font-bold ml-12" style={{color: "#f1f7ed"}}>
            {user?.username}
          </h1>
        </div>

        <div style={{marginTop: 10, padding: "10px 10px 10px 0", width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <h1 className="text-xl font-bold" style={{color: "#f1f7ed", textAlign: 'left'}}>
            Total Books Read 
          </h1>
          <h1 className="text-xl font-bold mr-0" style={{color: "#f1f7ed", textAlign: 'right'}}>
            {stats !== null ? stats.booksRead : "N/A"}
          </h1>
        </div>

        <div style={{marginTop: 10, padding: "10px 10px 10px 0", width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <h1 className="text-xl font-bold" style={{color: "#f1f7ed", textAlign: 'left'}}>
            Books Recommended
          </h1>
          <h1 className="text-xl font-bold mr-0" style={{color: "#f1f7ed", textAlign: 'right'}}>
            {12}
          </h1>
        </div>

        <div style={{marginTop: 10, padding: "10px 10px 10px 0", width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <h1 className="text-xl font-bold" style={{color: "#f1f7ed", textAlign: 'left'}}>
            Pages Read 
          </h1>
          <h1 className="text-xl font-bold mr-0" style={{color: "#f1f7ed", textAlign: 'right'}}>
            {stats !== null ? stats.pagesRead : "N/A"}
          </h1>
        </div>

        <div style={{marginTop: 10, padding: "10px 10px 10px 0", width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <div style={{width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <h1 className="text-2xl font-bold mb-6" style={{color: "#f1f7ed", textAlign: 'left'}}>
              Recent Books
            </h1>
          </div>
          <div className="rounded-lg" style={{backgroundColor: "#37337a"}}>
            { !noHistory && topHistory !== null ? (<>
              <div style={rowStyles}> { topHistory[0].map((obj: any) => {
                  return (
                    <div key={obj.id} className={`bg-no-repeat bg-cover bg-center rounded-lg m-2 ${obj.cover_id ? "" : "opacity-50"}`}
                      style={{backgroundColor: (obj.cover_id ? "" : "#f1f7ed"), minWidth:"6rem", maxWidth:"6rem", height: "8rem", backgroundImage:colorMap[obj.cover_id-1]}}
                      onClick={() => {
                        if (obj.cover_id) setSelectedBook(obj);
                      }}>
                    </div>
                  )
                })}
              </div>

              <div style={rowStyles}> { topHistory[1].map((obj: any) => {
                return (
                  <div key={obj.id} className={`bg-no-repeat bg-cover bg-center rounded-lg m-2 ${obj.cover_id ? "" : "opacity-50"}`}
                    style={{backgroundColor: (obj.cover_id ? "" : "#f1f7ed"), minWidth:"6rem", maxWidth:"6rem", height: "8rem", backgroundImage:colorMap[obj.cover_id-1]}}>
                  </div>
                )
              })}
                <div className="flex flex-col justify-center align-center column-center text-center hovor:curser-pointer rounded-lg m-2 opacity-50" style={{backgroundColor: "#f1f7ed", minWidth:"6rem", maxWidth:"6rem", height: "8rem"}}> See All Completed Books</div>
              </div>
            </>) : (<>
              <div style={rowStyles}> { historyTemplate[0].map((obj: any) => {
                  return (
                    <div key={obj.id} className={`bg-no-repeat bg-cover bg-center rounded-lg m-2 ${obj.cover_id ? "" : "opacity-50"}`}
                      style={{backgroundColor: (obj.cover_id ? "" : "#f1f7ed"), minWidth:"6rem", maxWidth:"6rem", height: "8rem", backgroundImage:colorMap[obj.cover_id-1]}}>
                    </div>
                  )
                })}
              </div>

              <div style={rowStyles}> { historyTemplate[1].map((obj: any) => {
                return (
                  <div key={obj.id} className={`bg-no-repeat bg-cover bg-center rounded-lg m-2 ${obj.cover_id ? "" : "opacity-50"}`}
                    style={{backgroundColor: (obj.cover_id ? "" : "#f1f7ed"), minWidth:"6rem", maxWidth:"6rem", height: "8rem", backgroundImage:colorMap[obj.cover_id-1]}}>
                  </div>
                )
              })}
                <div className="flex flex-col justify-center align-center column-center text-center hover:cursor-pointer rounded-lg m-2 opacity-50" style={{backgroundColor: "#f1f7ed", minWidth:"6rem", maxWidth:"6rem", height: "8rem"}}> See All Completed Books</div>
              </div>
            </>)}

          </div>
        </div>

        <div style={{marginTop: 10, padding: "10px 10px 10px 0", width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <button style={{color: 'white'}} className="border border-solid border-gray-100 mt-3 p-3 pl-5 pr-5 rounded-md font-bold" onClick={() => {
              if (!hasCommunity) {
                navigate("/communityAdd");
              } else {
                getCommunityAndNavigate();
              }
            }}>Your Community</button>
        </div>
        
        { selectedBook && <div className="flex flex-row bg-themeBlue justify-center align-center content-center text-center rounded-2xl p-4" style={{
              zIndex: 9999,
              width: "30vw",
              height: "30vh",
              position: "absolute",
              marginLeft: "35vw",
              marginTop: "20vh",
          }}>
          <div className="bg-no-repeat bg-center bg-cover" style={{backgroundImage:colorMap[selectedBook.cover_id-1], minWidth:"14rem", maxWidth:"14rem", height: "100%"}}></div>
          <div className="w-full h-full flex-col justify-space-between align-center content-center text-center bg-themeBlue rounded-lg">
            <h1 className="w-full text-3xl font-bold text-center text-themeSepia my-3">
              {selectedBook.title}
            </h1>
            <h1 className="w-full text-xl font-bold text-center text-themeSepia">
              {selectedBook.author}
            </h1>
            <button className="border border-solid border-themeSepia rounded-lg px-4 py-2 mx-4 my-6 text-themeSepia" onClick={() => setSelectedBook(null)}>Close</button>
          </div>
        </div> }

      </div>
  );
}
