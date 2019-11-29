import { createElement, useState, useEffect } from 'rax';
import renderer from 'rax-test-renderer';
import useMountedState from '../index';

const noop = () => {};

describe('useMountedState', () => {
  beforeEach(function() {
    jest.useFakeTimers();
  });

  it('should get component mounted state', () => {
    let isMounted = noop;
    function App() {
      isMounted = useMountedState();
      return <span>app</span>;
    }

    renderer.create(<App />);

    jest.runAllTimers();
    expect(isMounted()).toEqual(true);
  });

  it('should get component unmounted state', () => {
    let isMounted = noop;
    function App() {
      const [showTest, setShowTest] = useState(true);
      useEffect(() => {
        setTimeout(() => {
          setShowTest(false);
        }, 1000);
      }, []);
      return showTest ? <Test /> : null;
    }

    function Test() {
      isMounted = useMountedState();
      return <span>test</span>;
    }

    renderer.create(<App />);

    jest.runAllTimers();
    expect(isMounted()).toEqual(false);
  });
});
