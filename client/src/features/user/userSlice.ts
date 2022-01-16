import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface UserState {
  user: {
    username: string,
    signedIn: boolean,
    avatar: number,
  } | null; 
  books: {};
  community: {};
  history: any[];
}

const initialState: UserState = {
  user: null,
  books: {},
  community: {},
  history: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setUserBooks: (state, action: PayloadAction<any>) => {
      state.books = action.payload;
    },
    setUserCommunity: (state, action: PayloadAction<any>) => {
      state.community = action.payload;
    },
    setUserHistory: (state, action: PayloadAction<any>) => {
      state.history = action.payload;
    }
  },
});

export const { setUser, setUserBooks, setUserCommunity, setUserHistory } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.userState.user;
export const selectUserBooks = (state: RootState) => state.userState.books;
export const selectUserCommunity = (state: RootState) => state.userState.community;
export const selectUserHistory = (state: RootState) => state.userState.history;

export default userSlice.reducer;
