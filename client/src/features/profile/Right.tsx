import React, { CSSProperties } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setUser, selectUser } from '../user/userSlice';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export function Right() {
  let navigate = useNavigate();
  let user = useAppSelector(selectUser);
  
  return (
    <div style={{padding: 60, flex: 0.6}}>
      <h1 className="text-2xl font-bold" style={{color: "#201e50"}}>
        Current Books
      </h1>

      { [0, 1, 2].map(i => <div key={i} style={{display: 'flex', flexDirection: 'row', alignItems: 'start', marginTop: 30}}>
        <div style={{width: 100, height: 120, backgroundColor: "#37337a"}}></div>
        <div className="ml-4" style={{display: 'flex', flexDirection: 'column', justifyContent: "space-evenly", width: "100%", height: "100%"}}>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'start'}}>
            <h1 className="text-2xl font-bold" style={{color: "#201e50"}}>
              Title
            </h1>
            <h1 className="text-2xl ml-2" style={{color: "#201e50"}}>
              by Author
            </h1>
          </div>

          <div className="h-5" style={{width: "100%", backgroundColor: '#dae3d3', padding: 0}}>
            <div style={{margin: 0, height: "100%", width: "75%", backgroundColor: '#eb5160'}}></div>
          </div>
        </div>
      </div>) }

      <button className="mt-6 rounded-lg" onClick={() => navigate("/addbook")} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', border: "1px solid #201e50", paddingLeft: 5, paddingRight: 15, paddingTop: 10, paddingBottom: 10}}>
        <h1 className="text-2xl ml-4" style={{color: "#201e50", display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <p className="text-xl mr-4"><FontAwesomeIcon icon={faPlus} /></p>
          Add Book
        </h1>
      </button>
    </div>
  );
}
