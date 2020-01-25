import { createElement, useState, useEffect } from 'rax';
import renderer from 'rax/lib/testing/renderer';
import useUnmount from '../index';

describe('useUnmount', () => {
  beforeEach(function() {
    jest.useFakeTimers();
  });

  it('callback should be called when component will mount.', () => {
    let mounted = false;
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
      useEffect(() => {
        mounted = true;
      }, []);
      useUnmount(() => {
        mounted = false;
      });
      return <span>test</span>;
    }

    renderer.create(<App />);

    setTimeout(() => {
      expect(mounted).toEqual(true);
    }, 200);

    jest.runAllTimers();

    expect(mounted).toEqual(false);
  });
});
