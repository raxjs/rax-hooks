# rax-use-promise
<img src="https://img.shields.io/npm/v/rax-use-promise.svg" alt="npm package" />
<img src="https://img.shields.io/npm/dm/rax-use-promise.svg" alt="npm downloads" />

Rax hooks for promise case.

## Install

```bash
$ npm install rax-use-promise --save
```

## Example

```jsx
import { createElement, useMemo } from 'rax';
import usePromise from 'rax-use-promise';

const fetchData = () => fetch('https://httpbin.org/get').then(res => res.json());

function Example() {
  const [data, error] = usePromise(useMemo(fetchData));
  if (error) {
    return <p>error</p>
  } else if (data) {
    return <p>{data.foo}</p>
  }
}
```
