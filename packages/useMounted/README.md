# rax-use-mounted
<img src="https://img.shields.io/npm/v/rax-use-mounted.svg" alt="npm package" />
<img src="https://img.shields.io/npm/dm/rax-use-mounted.svg" alt="npm downloads" />

Calls a function after the component is mounted.

## Install

```bash
$ npm install rax-use-mounted --save
```

## Example

```jsx
import { createElement } from 'rax';
import useMounted from 'rax-use-mounted';

export default function App() {
  useMounted(() => {
    console.log('App has been mounted.');
  });
}
```

