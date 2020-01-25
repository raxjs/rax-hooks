import { createElement, useState, useEffect } from 'rax';
import renderer from 'rax/lib/testing/renderer';
import useOnceEffect from '../index';

describe('useOnceEffect', () => {
  beforeEach(function() {
    jest.useFakeTimers();
  });

  it('callback should be called when component mounted.', () => {
    let count = 0;
    function App() {
      const [name, setName] = useState('init');
      useOnceEffect(() => {
        setName('rerender');
        count++;
      });
      return <span>{name}</span>;
    }

    const tree = renderer.create(<App />);

    expect(tree.toJSON().children[0]).toEqual('init');

    jest.runAllTimers();

    setTimeout(() => {
      expect(tree.toJSON().children[0]).toEqual('rerender');
      expect(count).toEqual(1);
    }, 200);
    jest.runAllTimers();
  });
});
