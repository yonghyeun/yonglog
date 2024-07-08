import { createSlice } from '@reduxjs/toolkit';
import type { Post, ReactionNum } from '@/global';
import { mockPosts } from '@/mocupdata';

export type PostsState = {
  posts: Post[];
};

const initialState = {
  posts: mockPosts,
} satisfies PostsState as PostsState;

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      const { author, title, content, date } = action.payload;
      const newPost = {
        author,
        title,
        content,
        date,
        reactions: {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        },
      };
      state.posts.push(newPost);
    },

    reactingPost: (state, action) => {
      const { reaction, title } = action.payload;
      const searchedPost = state.posts.find((post) => post.title === title);
      if (searchedPost) {
        searchedPost.reactions[
          reaction satisfies keyof ReactionNum as keyof ReactionNum
        ]++;
      }
    },
  },
});

export const { addPost, reactingPost } = postSlice.actions;
export default postSlice.reducer;
