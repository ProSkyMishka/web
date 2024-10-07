type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type NOfArray<ArrayObj extends any[], N extends number> = ArrayObj[N];

type Unshift<ArrayType extends any[], Elem> = [Elem, ...ArrayType];

type MyExclude<T, U> = T extends U ? never : T;
