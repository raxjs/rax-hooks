# rax-use-mounted-state
<img src="https://img.shields.io/npm/v/rax-use-mounted-state.svg" alt="npm package" />
<img src="https://img.shields.io/npm/dm/rax-use-mounted-state.svg" alt="npm downloads" />

Get component mount state. In async cases, we need to determine whether the component has been destroyed through this hook.

## Install

```bash
$ npm install rax-use-mounted-state --save
```

## Example

```jsx
import { createElement } from 'rax';
import useMountedState from 'rax-use-mounted-state';

export default function App() {
  const isMounted = useMountedState();
  useEffect(() => {
    setTimeout(() => {
      console.log('Mounted state is ', isMounted());
    }, 2000);
  }, []);
}
```
