# rax-use-fetch
<img src="https://img.shields.io/npm/v/rax-use-fetch.svg" alt="npm package" />
<img src="https://img.shields.io/npm/dm/rax-use-fetch.svg" alt="npm downloads" />

Rax hook for making isomorphic http requests.

## Install

```bash
$ npm install rax-use-fetch --save
```

## Example

```jsx
import { createElement } from 'rax';
import useFetch from 'rax-use-fetch';

function Example() {
  const [data, error] = useFetch('https://httpbin.org/get');
  if (error) {
    return <p>error</p>
  } else if (data) {
    return <p>{data.foo}</p>
  } else {
    return <p>loading</p>
  }
}
```
