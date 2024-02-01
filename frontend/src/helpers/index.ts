import dayjs from 'dayjs'
import { Dayjs } from 'dayjs'

export function initTimer(timer?: any) {
  return dayjs(timer).set('hours', 0).set('minutes', 0).set('seconds', 0)
}

export function addTime(a: Dayjs, b: Dayjs) {
  return a.add(b.get('hours'), 'hours').add(b.get('minutes'), 'minutes').add(b.get('seconds'), 'seconds')
}
