export type User = {
  userName: string;
};

export type ReactionNum = {
  thumbsUp: number;
  hooray: number;
  heart: number;
  rocket: number;
  eyes: number;
};

export type Post = {
  author: string;
  title: string;
  content: string;
  date: string;
  reactions: ReactionNum;
};
