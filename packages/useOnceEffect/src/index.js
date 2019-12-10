import { useEffect } from 'rax';

export default function useOnceEffect(effect) {
  useEffect(effect, []);
}
