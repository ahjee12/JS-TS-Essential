//왜 15ms 늦춘 건가
export const nextTick = (fn: Function) => setTimeout(fn, 16);
