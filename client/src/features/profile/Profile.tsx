import React, { CSSProperties, useCallback, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setUser, setUserBooks, selectUser, selectUserBooks } from '../user/userSlice';
import { useNavigate } from 'react-router';
import { Left } from './Left';
import { Right } from './Right';

export function Profile() {
  let navigate = useNavigate();
  let user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user || !(user.signedIn)) {
      navigate("/signin");
    }
  }, []);

  return (
    <div style={{width: "100vw", height: "100vh", display: "flex", backgroundColor: "#f1f7ed"}}>
      <Left />
      <Right />
    </div>
  );
}
