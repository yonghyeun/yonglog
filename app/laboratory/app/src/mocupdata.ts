import type { Post, User } from '@/global';

export const mockPosts: Post[] = [
  {
    author: 'John Doe',
    title: 'Understanding TypeScript',
    content: 'TypeScript extends JavaScript by adding types...',
    date: '2024-01-01T10:00:00.000Z',
    reactions: {
      thumbsUp: 10,
      hooray: 2,
      heart: 5,
      rocket: 1,
      eyes: 3,
    },
  },
  {
    author: 'Jane Smith',
    title: 'React Hooks in Depth',
    content:
      'Hooks are functions that let you "hook into" React state and lifecycle features...',
    date: '2024-02-15T15:30:00.000Z',
    reactions: {
      thumbsUp: 15,
      hooray: 4,
      heart: 8,
      rocket: 3,
      eyes: 5,
    },
  },
  {
    author: 'Alice Johnson',
    title: 'Getting Started with Redux Toolkit',
    content:
      'Redux Toolkit is the official, recommended way to write Redux logic...',
    date: '2024-03-10T08:45:00.000Z',
    reactions: {
      thumbsUp: 12,
      hooray: 6,
      heart: 7,
      rocket: 2,
      eyes: 4,
    },
  },
  {
    author: 'John Doe',
    title: 'Advanced JavaScript Concepts',
    content:
      'In this article, we will explore some of the advanced concepts in JavaScript...',
    date: '2024-04-05T12:00:00.000Z',
    reactions: {
      thumbsUp: 20,
      hooray: 10,
      heart: 15,
      rocket: 5,
      eyes: 10,
    },
  },
  {
    author: 'Jane Smith',
    title: 'Building a Full-Stack App with Node.js and React',
    content:
      'In this tutorial, we will build a full-stack application using Node.js and React...',
    date: '2024-05-20T09:15:00.000Z',
    reactions: {
      thumbsUp: 25,
      hooray: 12,
      heart: 20,
      rocket: 7,
      eyes: 12,
    },
  },
];

export const users: User[] = [
  { userName: 'Jane Smith' },
  { userName: 'John Doe' },
  { userName: 'Alice Johnson' },
];
