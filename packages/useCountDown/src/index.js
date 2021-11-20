import { useState, useRef, useEffect, useMemo, useCallback } from 'rax';

// use setTimeout/clearTimeout as fallback
const rAF = typeof requestAnimationFrame !== 'undefined' ?
  requestAnimationFrame :
  setTimeout;
const cAF = typeof cancelAnimationFrame !== 'undefined' ?
  cancelAnimationFrame :
  clearTimeout;

const useCountDown = (timeToCount = 60 * 1000, interval = 1000, events = {}) => {
  const {onStart, onTick, onPause, onResume, onCompleted, onReset} = events;
  const [timeLeft, setTimeLeft] = useState(timeToCount);
  const timer = useRef({});

  useEffect(() => {
    if (timeLeft > 0) {
      if (typeof onTick === 'function') {
        onTick(timeLeft);
      }
    } else if (timeLeft === 0) {
      if (typeof onCompleted === 'function') {
        onCompleted();
      }
    }
  }, [timeLeft]);

  const run = (ts) => {
    const timestamp = ts || new Date().getTime();

    if (!timer.current.started) {
      timer.current.started = timestamp;
    }

    const elapsed = Math.max(timestamp - timer.current.started, 0);
    const totalInterval = Math.round(elapsed / interval) * interval;
    const time = timer.current.timeToCount - totalInterval;

    if (time !== timer.current.timeLeft) {
      timer.current.timeLeft = time;
      setTimeLeft(time);
    }

    if (elapsed < timer.current.timeToCount) {
      // not finished
      timer.current.requestId = rAF(run, interval);
    } else {
      // finished
      timer.current = {};
      setTimeLeft(0);
    }
  };

  const start = useCallback(
    (ttc) => {
      cAF(timer.current.requestId);

      const newTimeToCount = ttc !== undefined ? ttc : timeToCount;
      timer.current.started = null;
      timer.current.timeToCount = newTimeToCount;
      timer.current.requestId = rAF(run, interval);

      setTimeLeft(newTimeToCount);

      if (typeof onStart === 'function') {
        onStart();
      }
    },
    [interval]
  );

  const pause = useCallback(
    () => {
      cAF(timer.current.requestId);
      timer.current.started = null;
      timer.current.timeToCount = timer.current.timeLeft;
      if (typeof onPause === 'function') {
        onPause();
      }
    },
    []
  );

  const resume = useCallback(
    () => {
      if (!timer.current.started && timer.current.timeLeft > 0) {
        cAF(timer.current.requestId);
        timer.current.requestId = rAF(run, interval);
        if (typeof onResume === 'function') {
          onResume();
        }
      }
    },
    [interval]
  );

  const reset = useCallback(
    () => {
      if (timer.current.timeLeft) {
        cAF(timer.current.requestId);
        timer.current = {};
        setTimeLeft(timeToCount);
        if (typeof onReset === 'function') {
          onReset();
        }
      }
    },
    [timeToCount]
  );

  const actions = useMemo(
    () => ({ start, pause, resume, reset }),
    []
  );

  useEffect(() => {
    return () => cAF(timer.current.requestId);
  }, []);

  return [timeLeft, actions];
};

export default useCountDown;