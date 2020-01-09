# rax-use-import
<img src="https://img.shields.io/npm/v/rax-use-import.svg" alt="npm package" />
<img src="https://img.shields.io/npm/dm/rax-use-import.svg" alt="npm downloads" />

Rax hook for making dynamic import component.

## Install

```bash
$ npm install rax-use-import --save
```

## Example

```jsx
import { createElement } from 'rax';
import useImport from 'rax-use-import';

export default function App() {
  const [Bar, error] = useImport(() => import(/* webpackChunkName: "bar" */ './Bar'));
  if (error) {
    return <p>error</p>;
  } else if (Bar) {
    return <Bar />
  } else {
    return <p>loading</p>;
  }
}
```
