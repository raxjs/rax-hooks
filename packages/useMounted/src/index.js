import { useEffect } from 'rax';

export default function useMounted(mountedFn) {
  useEffect(mountedFn, []);
}
