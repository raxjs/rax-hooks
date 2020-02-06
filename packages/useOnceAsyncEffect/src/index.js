import { useEffect } from 'rax';

export default function useOnceAsyncEffect(effect, destroy) {
  const hasDestory = typeof destroy === 'function';
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
  }, []);
}
