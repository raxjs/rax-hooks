import { useCallback, useEffect, useRef } from 'rax';

export default function useMountedState() {
  const mountedRef = useRef(false);
  const get = useCallback(() => mountedRef.current, []);

  useEffect(() => {
    // Set ref current to true, when component is rendered
    mountedRef.current = true;

    return () => {
      // Set ref current to false, when component will unmount
      mountedRef.current = false;
    };
  });

  return get;
}
