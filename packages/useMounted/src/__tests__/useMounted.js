import { createElement } from 'rax';
import renderer from 'rax/lib/testing/renderer';
import useMounted from '../index';

describe('useMounted', () => {
  beforeEach(function() {
    jest.useFakeTimers();
  });

  it('callback should be called when component mounted.', () => {
    let mounted = false;
    function App() {
      useMounted(() => {
        mounted = true;
      });
      return <span>app</span>;
    }

    renderer.create(<App />);

    jest.runAllTimers();
    expect(mounted).toEqual(true);
  });
});
