let util = {
  add(x: number, y?: number, ...antParams: [number, string, number[]]): number {
    if (y) {
      console.log(y);
    }
    console.log(antParams);
    return x;
  },
  reduce<T>(arg: T[]): number {
    console.log(arg.length);
    return arg.length;
  },
};

export default util;
