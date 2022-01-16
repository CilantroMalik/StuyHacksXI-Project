import React, { CSSProperties, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setUser, setUserBooks, selectUser, selectUserBooks } from '../user/userSlice';
import { useNavigate, useLocation } from 'react-router';
import { Left } from './OtherLeft';
import { Right } from './OtherRight';

export function OtherProfile() {
    const location = useLocation()
    let navigate = useNavigate()
    // @ts-ignore
    const theUser = location.state.user
    // @ts-ignore
    const theAvatar = location.state.avatar

    return (
        <div style={{width: "100vw", height: "100vh", display: "flex", backgroundColor: "#f1f7ed"}}>
            <Left user={theUser} avatar={theAvatar}/>
            <Right user={theUser}/>
            <button className="bg-[#37337a] font-semibold text-xl text-themeSepia rounded-lg pt-2 pb-2 pr-10 pl-10" style={{position: "absolute", top: "1vh", right: "1vh"}} onClick={() => navigate("/home")}>Back</button>
        </div>
    );
}
