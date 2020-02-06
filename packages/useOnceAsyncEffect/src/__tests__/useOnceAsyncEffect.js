import { createElement, useState, useEffect } from 'rax';
import renderer from 'rax-test-renderer';
import useOnceAsyncEffect from '..';

function asyncFn(delay, val) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(val);
    }, delay);
  });
}

function fetchData(count) {
  return asyncFn(2000, count || 'success');
}

describe('useOnceAsyncEffect', () => {
  it('There is not onDestory function.', async() => {
    function App() {
      const [text, setText] = useState('');
      useOnceAsyncEffect(async() => {
        const result = await fetchData();
        setText(result);
      });
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
      useOnceAsyncEffect(
        async() => {
          await fetchData();
        },
        () => {
          unMount = true;
        }
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
      useOnceAsyncEffect(async() => {
        await fetchData();
        return () => {
          effectReturnFnBeCalled = true;
        };
      }, (returnFn) => {
        returnFn && returnFn();
      });

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
      useOnceAsyncEffect(async() => {
        await fetchData();
        return () => {
          effectReturnFnBeCalled = true;
        };
      }, (returnFn) => {
        returnFn && returnFn();
      });

      return <div>Child</div>;
    }

    renderer.create(<App />);

    expect(effectReturnFnBeCalled).toEqual(false);

    await asyncFn(2200);

    expect(effectReturnFnBeCalled).toEqual(false);
  });

  it('Only run once.', async() => {
    let count = 0;
    function App() {
      const [text, setText] = useState('');
      const [title, setTitle] = useState('');
      useOnceAsyncEffect(async() => {
        count++;
        const result = await asyncFn(1000, count);
        setText(result);
      });
      useEffect(() => {
        setTitle('Title');
      }, []);
      return (
        <div>
          <span>{text}</span>
          <span>{title}</span>
        </div>
      );
    }

    const tree = renderer.create(<App />);

    expect(tree.toJSON().children[0].children[0]).toEqual('');

    await asyncFn(2000);

    expect(tree.toJSON().children[0].children[0]).toEqual('1');
  });
});
