type Key = string;
type Count = number;

export type CountObject = Record<Key, Count>;
export type CountArray = Array<[Key, Count]>;

export type SearchParams = {
  tag?: string;
  page?: string;
  series?: string;
  searchText?: string;
};

export type CheckIsActive = (
  SearchParams: URLSearchParams,
  newParams: SearchParams,
) => boolean;

export type GetNewSearchParams = (
  searchParams: URLSearchParams,
  newParams: SearchParams,
  isActive: boolean,
) => string;

export type Cookie = {
  name: string;
  value: string;
};
