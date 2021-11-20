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

  it('100ms interval', async() => {
    function App() {
      const [timeLeft, { start }] = useCountDown(1000, 100);

      useEffect(() => {
        start();
      }, []);

      return <div>{timeLeft}</div>;
    }

    const tree = renderer.create(<App />);

    // For render
    await asyncFn(50);
    expect(tree.toJSON().children.join('')).toEqual('1000');

    await asyncFn(100);
    expect(tree.toJSON().children.join('')).toEqual('900');

    await asyncFn(100);
    expect(tree.toJSON().children.join('')).toEqual('800');

    await asyncFn(700);
    expect(tree.toJSON().children.join('')).toEqual('100');

    await asyncFn(100);
    expect(tree.toJSON().children.join('')).toEqual('0');
  });

  it('pause', async() => {
    const mockPause = jest.fn();
    function App() {
      const [timeLeft, { start, pause }] = useCountDown(1000, 100, {
        onPause: mockPause,
      });

      useEffect(() => {
        start();

        setTimeout(() => pause(), 550);
      }, []);

      return <div>{timeLeft}</div>;
    }

    const tree = renderer.create(<App />);

    // For render
    await asyncFn(150);
    expect(tree.toJSON().children.join('')).toEqual('900');

    await asyncFn(500);
    expect(tree.toJSON().children.join('')).toEqual('500');
    await asyncFn(500);
    expect(tree.toJSON().children.join('')).toEqual('500');
    expect(mockPause).toHaveBeenCalledTimes(1);
  });

  it('resume', async() => {
    const mockPause = jest.fn();
    const mockResume = jest.fn();
    function App() {
      const [timeLeft, { start, pause, resume }] = useCountDown(1000, 100, {
        onPause: mockPause,
        onResume: mockResume,
      });

      useEffect(() => {
        start();

        setTimeout(() => pause(), 550);
        setTimeout(() => resume(), 1100);
      }, []);

      return <div>{timeLeft}</div>;
    }

    const tree = renderer.create(<App />);

    // For render
    await asyncFn(150);
    expect(tree.toJSON().children.join('')).toEqual('900');

    await asyncFn(500);
    expect(tree.toJSON().children.join('')).toEqual('500');

    // still paused
    await asyncFn(100);
    expect(tree.toJSON().children.join('')).toEqual('500');

    await asyncFn(500);
    expect(tree.toJSON().children.join('')).toEqual('400');
    await asyncFn(450);
    expect(tree.toJSON().children.join('')).toEqual('0');

    expect(mockPause).toHaveBeenCalledTimes(1);
    expect(mockResume).toHaveBeenCalledTimes(1);
  });

  it('reset', async() => {
    const mockReset = jest.fn();

    function App() {
      const [timeLeft, { start, reset }] = useCountDown(1000, 100, {
        onReset: mockReset,
      });

      useEffect(() => {
        start();
        setTimeout(() => reset(), 550);
      }, []);

      return <div>{timeLeft}</div>;
    }

    const tree = renderer.create(<App />);

    // For render
    await asyncFn(150);

    expect(tree.toJSON().children.join('')).toEqual('900');

    await asyncFn(500);
    expect(tree.toJSON().children.join('')).toEqual('1000');

    await asyncFn(100);
    expect(tree.toJSON().children.join('')).toEqual('1000');

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('events', async() => {
    const mockStart = jest.fn();
    const mockTick = jest.fn();
    const mockCompleted = jest.fn();
    function App() {
      const [timeLeft, { start }] = useCountDown(1000, 100, {
        onStart: mockStart,
        onTick: mockTick,
        onCompleted: mockCompleted,
      });

      useEffect(() => {
        start();
      }, []);

      return <div>{timeLeft}</div>;
    }

    const tree = renderer.create(<App />);

    // For render
    await asyncFn(1100);

    expect(mockStart).toHaveBeenCalledTimes(1);
    expect(mockCompleted).toHaveBeenCalledTimes(1);

    expect(mockTick).toHaveBeenCalledTimes(10);
    expect(mockTick).toHaveBeenNthCalledWith(1, 1000);
    expect(mockTick).toHaveBeenNthCalledWith(2, 900);
    expect(mockTick).toHaveBeenNthCalledWith(3, 800);
    expect(mockTick).toHaveBeenNthCalledWith(4, 700);
    expect(mockTick).toHaveBeenNthCalledWith(5, 600);
    expect(mockTick).toHaveBeenNthCalledWith(6, 500);
    expect(mockTick).toHaveBeenNthCalledWith(7, 400);
    expect(mockTick).toHaveBeenNthCalledWith(8, 300);
    expect(mockTick).toHaveBeenNthCalledWith(9, 200);
    expect(mockTick).toHaveBeenNthCalledWith(10, 100);
  });
});
