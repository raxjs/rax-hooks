# rax-use-once-async-effect

<img src="https://img.shields.io/npm/v/rax-use-once-async-effect.svg" alt="npm package" />
<img src="https://img.shields.io/npm/dm/rax-use-once-async-effect.svg" alt="npm downloads" />

Run an async effect only once.

## Install

```bash
$ npm install rax-use-once-async-effect --save
```

## API

The API is the same as Rax's `useEffect()`, except for some notable differences:

- The destroy function is passed as an optional second argument:

```js
useOnceAsyncEffect(callback);
useOnceAsyncEffect(callback, onDestroy);
```

- The async effect return value will be onDestroy's param, and we couldn't ensure this value exists.

## Notice

In async effect, we have to know current component's mount state. If current component has been destoried, we couldn't do any action about the component instance.
So you can get the component mount state by `rax-use-mounted-state`.

## Example

### Example 1

The child component's async effect is resolved earlier than it is destoryed.

**Parent:**

```jsx
import { createElement, useEffect, useState } from 'rax';
import View from 'rax-view';
import Child from '../../components/Child';

export default function App() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow();
    }, 3000);
  }, []);

  return (
    <View>
      <View>Parent</View>
      {show ? <Child /> : null}
    </View>
  );
}
```

**Child:**

```jsx
import { createElement, useEffect, useState } from 'rax';
import View from 'rax-view';
import useOnceAsyncEffect from 'rax-use-once-async-effect';

function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('success');
    }, 2000);
  });
}

function onDestroy(effectReturnVal) {
  if (effectReturnVal) {
    console.log('async effect return: ', effectReturnVal);
  }
  console.log('Call onDestroy function.');
}

export default function Child() {
  useOnceAsyncEffect(
    async () => {
      const result = await fetchData();
      console.log('result', result);
      return result;
    },
    onDestroy
  );

  return <View>Child</View>;
}
```

### Example 2

The child component's async effect is resolved later than it is destoryed.

**Parent:**

```jsx
import { createElement, useEffect, useState } from 'rax';
import View from 'rax-view';
import Child from '../../components/Child';

export default function App() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow();
    }, 1000);
  }, []);

  return (
    <View>
      <View>Parent</View>
      {show ? <Child /> : null}
    </View>
  );
}
```

**Child:**

```jsx
import { createElement, useEffect, useState } from 'rax';
import View from 'rax-view';
import useOnceAsyncEffect from 'rax-use-once-async-effect';
import useMountedState from 'rax-use-mounted-state';

function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('success');
    }, 2000);
  });
}

function onDestroy(effectReturnVal) {
  if (effectReturnVal) {
    console.log('async effect return: ', effectReturnVal);
  }
  console.log('Call onDestroy function.');
}

export default function Child() {
  const isMounted = useMountedState();
  useOnceAsyncEffect(
    async () => {
      const result = await fetchData();
      console.log('result', result);
      if (isMounted()) {
        console.log('do some action about the component instance.');
      }
      return result;
    },
    onDestroy
  );

  return <View>Child</View>;
}
```
