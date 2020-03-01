import { createElement } from 'rax';
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
  it('5 seconds count down', async() => {
    function App() {
      const now = Date.now();
      const { days, hours, minutes, seconds } = useCountDown(now + 3000, now);

      return <div>{days}:{hours}:{minutes}:{seconds}</div>;
    }

    const tree = renderer.create(<App />);

    // For render
    await asyncFn(200);

    expect(tree.toJSON().children.join('')).toEqual('0:0:0:3');

    await asyncFn(3000);

    expect(tree.toJSON().children.join('')).toEqual('0:0:0:0');
  });
});
