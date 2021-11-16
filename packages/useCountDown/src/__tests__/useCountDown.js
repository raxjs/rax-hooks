import { createElement, useEffect } from 'rax';
import renderer from 'rax-test-renderer';
import useCountDown from '..';

function asyncFn(delay, val) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(val);
    }, delay);
  });
}

describe('useCountDown', () => {
  it('3 seconds count down', async() => {
    function App() {
      const [timeLeft, { start }] = useCountDown(3 * 1000, 1000);

      useEffect(() => {
        start();
      }, []);

      return <div>{timeLeft}</div>;
    }

    const tree = renderer.create(<App />);

    // For render
    await asyncFn(200);

    expect(tree.toJSON().children.join('')).toEqual('3000');

    await asyncFn(1000);

    expect(tree.toJSON().children.join('')).toEqual('2000');

    await asyncFn(2000);

    expect(tree.toJSON().children.join('')).toEqual('0');
  });
});
