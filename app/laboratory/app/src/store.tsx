import { configureStore } from '@reduxjs/toolkit';
import postReducer from '@/feature/posts/postSlice';
import userReducer from '@/feature/user/userSlice';

const store = configureStore({
  reducer: {
    posts: postReducer,
    user: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
