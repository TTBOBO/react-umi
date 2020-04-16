import * as React from 'react';
const { useState, useEffect } = React;
import util from './util';
import Hello from './Hello';
interface ComponentProps {
  test(): void;
}
interface generFun {
  <T>(arg: T[]): number;
}

const Example: React.SFC<ComponentProps> = (props: ComponentProps) => {
  var timer: NodeJS.Timeout | null = null;
  const [count, setCount] = useState(0);
  const [isSend, setIsSend] = useState(false);
  useEffect(() => {
    console.log(count, props);
    if (isSend && count !== 0) {
      timer = setInterval(() => {
        setCount(c => {
          if (c === 1) {
            setIsSend(false);
            clearInterval(timer);
          }
          return c - 1;
        });
      }, 1000);
    }
    return () => {
      console.log(1111);
      // return 222;
    };
  }, [isSend]);

  const timerDom = () => {
    if (count !== 0) return;
    console.log(util.add(1, 2, 3, '4', [1, 2]));
    console.log(util.reduce([222]));
    setCount(10);
    setIsSend(true);
  };
  const cb = (...atgs: string[]) => {
    console.log(1111, atgs);
  };
  return (
    // gender={'b'}
    <div>
      <button onClick={timerDom}>{count === 0 ? '获取验证码' : `验证码发送中(${count})`}</button>
      <Hello
        name={'TAB'}
        gender={'a'}
        age={20}
        list={[{ name: 1 }, { name: 2 }, { name: 3 }]}
        cb={cb}
      />
    </div>
  );
};

export default Example;
