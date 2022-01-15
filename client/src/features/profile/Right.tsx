import React, { CSSProperties } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setUser, selectUser } from '../user/userSlice';
import { useNavigate } from 'react-router';

export function Right() {
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
            <h1 className="text-xl font-bold" style={{color: "#201e50"}}>
              Title
            </h1>
            <h1 className="text-xl ml-2" style={{color: "#201e50"}}>
              by Author
            </h1>
          </div>

          <div className="h-5" style={{width: "100%", backgroundColor: '#dae3d3', padding: 0}}>
            <div style={{margin: 0, height: "100%", width: "75%", backgroundColor: '#eb5160'}}></div>
          </div>
        </div>
      </div>) }

      <div className="mt-6" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <h1 className="text-8xl ml-2" style={{color: "#201e50"}}>
          +
        </h1>
        <h1 className="text-6xl ml-4" style={{color: "#201e50"}}>
          Add Book
        </h1>
      </div>
    </div>
  );
}
