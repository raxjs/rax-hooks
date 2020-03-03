import { useRef, useState, useEffect } from 'rax';

const DAY_SECOND = 24 * 3600;
const HOUR_SECOND = 3600;
const MINUTES_SECOND = 60;

export default function(start, end) {
  if (!isNumber(start) || !isNumber(end)) {
    throw new Error('Start or end time should be number.');
  };

  if (start < end) {
    throw new Error('Start time should be greater than end time.');
  }

  const ref = useRef(null);

  if (!ref.remainTime) {
    ref.remainTime = formatTime(Math.round((start - end) / 1000));
  }
  const [timeLeft, setTimeLeft] = useState(ref.remainTime);

  useEffect(() => {
    let shouldStop = false;
    timeCountDown(ref, () => {
      let remainTime = ref.remainTime;
      if (remainTime.seconds > 0) {
        remainTime.seconds--;
      } else {
        if (remainTime.minutes > 0) {
          remainTime.seconds = 59;
          remainTime.minutes--;
        } else {
          if (remainTime.hourLeft > 0) {
            remainTime = {
              days: remainTime.days,
              hours: remainTime.hours - 1,
              minutes: 59,
              seconds: 59,
            };
          } else {
            if (remainTime.days > 0) {
              remainTime = {
                days: remainTime.days - 1,
                hours: 23,
                minutes: 59,
                seconds: 59,
              };
            } else {
              remainTime = {
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
        ...remainTime
      });
      return shouldStop;
    });
    return () => clearTimeout(ref.id);
  }, []);

  return timeLeft;
}

function formatTime(difference) {
  return {
    days: Math.round(difference / DAY_SECOND),
    hours: Math.round(difference % DAY_SECOND / HOUR_SECOND),
    minutes: Math.round(difference % HOUR_SECOND / MINUTES_SECOND),
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
