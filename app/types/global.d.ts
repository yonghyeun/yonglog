type Key = string;
type Count = number;

export type CountObject = Record<Key, Count>;
export type CountArray = Array<[Key, Count]>;

export type SearchParams = {
  tag?: string;
  page?: string;
  series?: string;
};
