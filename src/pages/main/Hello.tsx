import * as React from 'react';
const { useState } = React;
interface listObj {
  name: number;
}
export interface HelloProps {
  name: string;
  gender?: string;
  age: number;
  list?: listObj[];
  cb(...args1: string[]): void;
}
interface genderConfig {
  [key: string]: string;
}

interface first {
  name: string | number | [];
}
interface scend {
  age: number;
}
type Name = 'a' | 'b' | 'c';
type nameFun = () => string;
type nameOrNameFun = Name | nameFun;
function test(n: nameOrNameFun) {
  if (typeof n === 'string') {
    switch (n) {
      case 'a':
        console.log(n);
        break;
      case 'b':
        console.log(n + '1');
        break;
      case 'c':
        console.log(n + '2');
        break;

      default:
        break;
    }
    return n;
  } else {
    n();
  }
}
// () => {
//   console.log(111);
//   return '11111';
// }
export default (props: HelloProps) => {
  const { name, gender, age, list, cb } = props;
  const Config1: genderConfig = {
    a: '男',
    b: '女',
  };
  const [Config] = useState(Config1);
  console.log(Config[gender]);
  return (
    <h1 onClick={() => cb('1', '2', '3')}>
      my name is {name} {gender && `, gender:${Config[gender]}`}, age is {age}
      {list &&
        list.map((item, index) => {
          return <div key={index}>{item.name}</div>;
        })}
    </h1>
  );
};
