import { useRef, useState, useEffect } from 'rax';

const DAY_SECOND = 24 * 3600;
const HOUR_SECOND = 3600;
const MINUTES_SECOND = 60;

/**
 * @param {number} start - The start time
 * @param {number} end - The end time
 */
export default function(start, end) {
  if (!isNumber(start) || !isNumber(end) || start < end) return null;

  // Record initial time
  const ref = useRef({
    remainTime: formatTime(~~((start - end) / 1000)),
  });
  const [timeLeft, setTimeLeft] = useState(ref.current.remainTime);

  useEffect(() => {
    let shouldStop = false;
    timeCountDown(ref, () => {
      const current = ref.current;
      if (current.remainTime.seconds > 1) {
        current.remainTime.seconds--;
      } else {
        if (current.remainTime.minutes > 0) {
          current.remainTime.seconds = 59;
          current.remainTime.minutes--;
        } else {
          if (current.remainTime.hourLeft > 0) {
            current.remainTime = {
              days: current.remainTime.days,
              hours: current.remainTime.hours - 1,
              minutes: 59,
              seconds: 59,
            };
          } else {
            if (current.remainTime.days > 0) {
              current.remainTime = {
                days: current.remainTime.days - 1,
                hours: 23,
                minutes: 59,
                seconds: 59,
              };
            } else {
              current.remainTime = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
              };
              shouldStop = true;
            }
          }
        }
      }
      setTimeLeft({
        ...current.remainTime
      });
      return shouldStop;
    });
    return () => clearTimeout(ref.id);
  }, []);

  return timeLeft;
}

function formatTime(difference) {
  return {
    days: ~~(difference / DAY_SECOND),
    hours: ~~(difference % DAY_SECOND / HOUR_SECOND),
    minutes: ~~(difference % HOUR_SECOND / MINUTES_SECOND),
    seconds: difference % MINUTES_SECOND,
  };
}

function isNumber(val) {
  return typeof val === 'number';
}

function timeCountDown(ref, callback) {
  ref.id = setTimeout(() => {
    const shouldStop = callback();
    if (!shouldStop) {
      timeCountDown(ref, callback);
    }
  }, 1000);
}
