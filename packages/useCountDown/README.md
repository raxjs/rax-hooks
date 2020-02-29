# rax-use-countdown
<img src="https://img.shields.io/npm/v/rax-use-countdown.svg" alt="npm package" />
<img src="https://img.shields.io/npm/dm/rax-use-countdown.svg" alt="npm downloads" />

A countdown hooks which will return the left days/hours/minutes/seconds state.

## Install

```bash
$ npm install rax-use-countdown --save
```

## API

The API will recevie two params -- `start`/`end`.

|       | Type     | Description |
| ----- | -------- | ----------- |
| start | `number` | Start time  |
| ent   | `number` | End time    |

## Example

```jsx
import { createElement } from 'rax';
import useCountDown from 'rax-use-countdown';

function Example() {
  const now = Date.now();
  const { days, hours, minutes, seconds } = useCountdown(now, now - 10000000);

  return <div>There only left {days}days {hours}hours {minutes}minutes {seconds}seconds</div>;
}
```
