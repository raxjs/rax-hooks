# rax-use-unmount
<img src="https://img.shields.io/npm/v/rax-use-unmount.svg" alt="npm package" />
<img src="https://img.shields.io/npm/dm/rax-use-unmount.svg" alt="npm downloads" />

Calls a function when the component will unmount.

## Install

```bash
$ npm install rax-use-unmount --save
```

## Example

```jsx
import { createElement } from 'rax';
import useUnmount from 'rax-use-unmount';

export default function App() {
  useUnmount(() => {
    console.log('App will unmount.');
  });
}
```
