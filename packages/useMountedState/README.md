# rax-use-mounted-state

Get component mount state.

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
    console.log('Mounted state is ', isMounted());
  }, []);
}
```
