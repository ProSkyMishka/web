type DeepPick<T, Paths extends string> = Paths extends `${infer F}.${infer R}`
  ? F extends keyof T
    ? { [K in F]: DeepPick<T[K], R> }
    : never
  : Paths extends keyof T
  ? { [K in Paths]: T[K] }
  : never;
