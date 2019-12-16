import { useEffect } from 'rax';

export default function useAsyncEffect(effect, destroy, inputs) {
  const hasDestory = typeof destroy === 'function';
  if (!hasDestory) {
    inputs = destroy;
  }
  useEffect(() => {
    let effectReturnVal;
    const effectReturnPromise = effect();
    Promise.resolve(effectReturnPromise).then(value => {
      effectReturnVal = value;
    });
    return () => {
      if (hasDestory) {
        destroy(effectReturnVal);
      }
    };
  }, inputs);
}
