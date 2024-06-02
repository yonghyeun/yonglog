type Key = string;
type Count = number;

export type CountableObject = Record<Key, Count>;
export type CountableArray = Array<[Key, Count]>;
