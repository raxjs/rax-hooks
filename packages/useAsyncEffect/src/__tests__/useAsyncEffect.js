import { createElement, useState, useEffect } from 'rax';
import renderer from 'rax-test-renderer';
import useAsyncEffect from '..';

function asyncFn(delay, val) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(val);
    }, delay);
  });
}

function fetchData() {
  return asyncFn(2000, 'success');
}

describe('useAsyncEffect', () => {
  it('There is not onDestory function.', async() => {
    function App() {
      const [text, setText] = useState('');
      useAsyncEffect(async() => {
        const result = await fetchData();
        setText(result);
      }, []);
      return <span>{text}</span>;
    }

    const tree = renderer.create(<App />);

    expect(tree.toJSON().children[0]).toEqual('');

    await asyncFn(3000);

    expect(tree.toJSON().children[0]).toEqual('success');
  });

  it('There is onDestory function.', async() => {
    let unMount = false;
    function App() {
      const [show, setShow] = useState(true);

      useEffect(() => {
        setTimeout(() => {
          setShow();
        }, 1000);
      }, []);

      return <div>{show ? <Child /> : null}</div>;
    }

    function Child() {
      useAsyncEffect(
        async() => {
          await fetchData();
        },
        () => {
          unMount = true;
        },
        [],
      );

      return <div>Child</div>;
    }

    renderer.create(<App />);

    expect(unMount).toEqual(false);

    await asyncFn(2000);

    expect(unMount).toEqual(true);
  });

  it("The child component's async effect is resolved earlier than it is destoryed.", async() => {
    let effectReturnFnBeCalled = false;
    function App() {
      const [show, setShow] = useState(true);

      useEffect(() => {
        setTimeout(() => {
          setShow();
        }, 3000);
      }, []);

      return <div>{show ? <Child /> : null}</div>;
    }

    function Child() {
      useAsyncEffect(async() => {
        await fetchData();
        return () => {
          effectReturnFnBeCalled = true;
        };
      }, (returnFn) => {
        returnFn && returnFn();
      }, []);

      return <div>Child</div>;
    }

    renderer.create(<App />);

    expect(effectReturnFnBeCalled).toEqual(false);

    await asyncFn(3200);

    expect(effectReturnFnBeCalled).toEqual(true);
  });

  it("The child component's async effect is resolved later than it is destoryed.", async() => {
    let effectReturnFnBeCalled = false;
    function App() {
      const [show, setShow] = useState(true);

      useEffect(() => {
        setTimeout(() => {
          setShow();
        }, 1000);
      }, []);

      return <div>{show ? <Child /> : null}</div>;
    }

    function Child() {
      useAsyncEffect(async() => {
        await fetchData();
        return () => {
          effectReturnFnBeCalled = true;
        };
      }, (returnFn) => {
        returnFn && returnFn();
      }, []);

      return <div>Child</div>;
    }

    renderer.create(<App />);

    expect(effectReturnFnBeCalled).toEqual(false);

    await asyncFn(2200);

    expect(effectReturnFnBeCalled).toEqual(false);
  });
});
