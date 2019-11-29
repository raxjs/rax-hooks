# rax-use-mounted-state

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
