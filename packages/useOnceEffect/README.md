# rax-use-once-effect
<img src="https://img.shields.io/npm/v/rax-use-once-effect.svg" alt="npm package" />
<img src="https://img.shields.io/npm/dm/rax-use-once-effect.svg" alt="npm downloads" />

Runs an effect only once.

## Install

```bash
$ npm install rax-use-once-effect --save
```

## Example

```jsx
import { createElement } from 'rax';
import useOnceEffect from 'rax-use-once-effect';

export default function App() {
  useOnceEffect(() => {
    console.log('The effect only run once');
  });
}
```

