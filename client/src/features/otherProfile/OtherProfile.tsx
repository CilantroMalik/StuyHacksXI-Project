import React, { CSSProperties, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setUser, setUserBooks, selectUser, selectUserBooks } from '../user/userSlice';
import { useNavigate, useLocation } from 'react-router';
import { Left } from './OtherLeft';
import { Right } from './OtherRight';

export function OtherProfile() {
    const location = useLocation()
    // @ts-ignore
    const theUser = location.state.user

    return (
        <div style={{width: "100vw", height: "100vh", display: "flex", backgroundColor: "#f1f7ed"}}>
            <Left user={theUser}/>
            <Right user={theUser}/>
        </div>
    );
}
