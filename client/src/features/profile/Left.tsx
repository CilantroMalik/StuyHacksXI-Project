import React, { CSSProperties } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setUser, selectUser } from '../user/userSlice';
import { useNavigate } from 'react-router';

export function Left() {
  let navigate = useNavigate();
  let user = useAppSelector(selectUser);

  const leftStyles: CSSProperties = {
    flex: 0.4,
    backgroundColor: "#1A1847",
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  }

  const circleStyles: CSSProperties = {
    borderRadius: 164/2,
    backgroundColor: '#f1f7ed',
    width: "164px",
    height: "164px",
  }

  const rowStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '20px 20px'
  }

  return (
      <div style={leftStyles}>
        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <div style={circleStyles}></div>
          <h1 className="text-4xl font-bold ml-12" style={{color: "#f1f7ed"}}>
            {user?.username}
          </h1>
        </div>

        <div style={{marginTop: 10, padding: "10px 10px 10px 0", width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <h1 className="text-xl font-bold" style={{color: "#f1f7ed", textAlign: 'left'}}>
            Total Books Read 
          </h1>
          <h1 className="text-xl font-bold mr-0" style={{color: "#f1f7ed", textAlign: 'right'}}>
            {12}
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
            {12}
          </h1>
        </div>

        <div style={{marginTop: 10, padding: "10px 10px 10px 0", width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <div style={{width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <h1 className="text-2xl font-bold mb-6" style={{color: "#f1f7ed", textAlign: 'left'}}>
              Recent Books
            </h1>
          </div>
          <div className="rounded-lg" style={{backgroundColor: "#37337a"}}>
            <div style={rowStyles}> {[0, 1, 2, 3].map(i => <div key={i} style={{backgroundColor: "#f1f7ed", width: 100, height: 120}}></div>)} </div>
            <div style={rowStyles}> {[0, 1, 2, 3].map(i => <div key={i} style={{backgroundColor: "#f1f7ed", width: 100, height: 120}}></div>)} </div>
          </div>
        </div>

        <div style={{marginTop: 10, padding: "10px 10px 10px 0", width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <button style={{color: 'white'}} className="border border-solid border-gray-100 mt-3 p-3 pl-5 pr-5 rounded-md font-bold">Your Community</button>
        </div>

      </div>
  );
}
