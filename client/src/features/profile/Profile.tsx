import React from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setUser, selectUser } from '../user/userSlice';
import { useNavigate } from 'react-router';

export function Profile() {
  let user = useAppSelector(selectUser);
  console.log(user);

  return (
    <div style={{width: "100vw", height: "100vh"}} className="bg-blue-300">

    </div>
  );
}
