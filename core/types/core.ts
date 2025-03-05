export type Nullable<T> = T | null;

export type Index = string | number | symbol;

export type TObject<T = any, Idx extends Index = string> = Record<Idx, T>;