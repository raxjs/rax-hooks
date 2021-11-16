# rax-use-countdown
<img src="https://img.shields.io/npm/v/rax-use-countdown.svg" alt="npm package" />
<img src="https://img.shields.io/npm/dm/rax-use-countdown.svg" alt="npm downloads" />

A countdown hooks which will return the left time(in millisecond).

## Install

```bash
$ npm install rax-use-countdown --save
```

## API

The API will recevie two params -- `timeToCount`/`interval`.

|       | Type     | Description |
| ----- | -------- | ----------- |
| timeToCount | `number` | total time to count, in millisecond |
| interval | `number` | interval time on every tick, in millisecond |

## Example

```jsx
import { createElement, useEffect } from 'rax';
import useCountDown from 'rax-use-countdown';

function Example() {
  // countdown 10s with 100ms interval
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(10 * 1000, 100);

  useEffect(() => {
    start();
  }, []);

  // you can format timeLeft by yourself
  return <div>There only left { timeLeft } milliseconds</div>;
}
```
