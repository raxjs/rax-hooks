import { useEffect, EffectCallback } from 'rax';

export default function useOnceEffect(effect: EffectCallback): void{
  useEffect(effect, []);
}
