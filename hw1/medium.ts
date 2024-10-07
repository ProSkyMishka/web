type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type MyCapitalize<T extends string> = T extends `${infer F}${infer R}`
  ? `${Uppercase<F>}${R}`
  : T;

type DeepMutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P];
};

type ParseURLParams<StringElem extends string> =
  StringElem extends `${infer _F}:${infer P}/${infer R}`
    ? P | ParseURLParams<`/${R}`>
    : StringElem extends `${infer _F}:${infer P}`
    ? P
    : never;
