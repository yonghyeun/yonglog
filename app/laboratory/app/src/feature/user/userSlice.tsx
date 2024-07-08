import { createSlice } from '@reduxjs/toolkit';

type UserState = {
  userName: string;
};

const initialState = {
  userName: 'logout',
} satisfies UserState as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUser: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { changeUser } = userSlice.actions;
export default userSlice.reducer;
