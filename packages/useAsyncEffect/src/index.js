import { useEffect } from 'rax';

export default function useAsyncEffect(effect, destroy, inputs) {
  const hasDestory = typeof destroy === "function";
  if (!hasDestory) {
    inputs = destroy;
  }
  useEffect(() => {
    let effectReturnFn;
    const effectReturnPromise = effect();
    Promise.resolve(effectReturnPromise).then(fn => {
      effectReturnFn = fn;
    });
    return () => {
      effectReturnFn && effectReturnFn();
      if (hasDestory) {
        destroy();
      }
    };
  }, inputs);
}
