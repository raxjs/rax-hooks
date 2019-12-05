import { useEffect, useRef } from 'rax';

export default function useUnmount(unmountFn) {
  const unmountFnRef = useRef(unmountFn);
  // Update unmountFn when component rerender
  unmountFnRef.current = unmountFn;
  useEffect(() => {
    return () => {
      typeof unmountFnRef.current === 'function' && unmountFnRef.current();
    };
  }, []);
}
