import { getAllPosts } from './post';
import type { CountObject, CountArray } from '@/types/global';

const incrementCount = (collection: CountObject, key: string) => {
  if (!collection[key]) {
    collection[key] = 1;
  } else {
    collection[key] += 1;
  }
};

export const getAllTags = async (): Promise<CountArray> => {
  const Posts = await getAllPosts();
  const TagInfo: CountObject = {};
  Posts.forEach(({ meta: { tag } }) => {
    tag?.forEach((tagName) => incrementCount(TagInfo, tagName));
  });

  return Object.entries(TagInfo).toSorted((prev, cur) => cur[1] - prev[1]);
};

export const getAllSeries = async (): Promise<CountArray> => {
  const Posts = await getAllPosts();
  const SeriesInfo: CountObject = {};
  Posts.forEach(({ meta: { series } }) => {
    incrementCount(SeriesInfo, series);
  });

  return Object.entries(SeriesInfo).toSorted((prev, cur) => cur[1] - prev[1]);
};
