# rax-use-interval
<img src="https://img.shields.io/npm/v/rax-use-interval.svg" alt="npm package" />
<img src="https://img.shields.io/npm/dm/rax-use-interval.svg" alt="npm downloads" />

Why `useInterval`? `setInterval` will called even component is unmounted that make error happens, and `useInterval` will auto `clearInterval` before component will mount.

## Install

```bash
$ npm install rax-use-interval --save
```

## Example

```jsx
import { createElement } from 'rax';
import useInterval from 'rax-use-interval';

function Example() {
  const [count, setCount] = useState(0);
  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  return <h1>{count}</h1>;
}
```

How to stop or restart timer?
```jsx
function Example() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  useInterval(() => {
    setCount(count + 1);
  }, delay);

  const stopTimer = () => setDelay(null); // Stop
  const restartTimer = () => setDelay(1000); // Restart

  return <h1 onClick={delay ? stopTimer : restartTimer}>{count}</h1>;
}
```
