import { Dayjs } from 'dayjs'
import { RequestedTask } from '../interfaces'
import { initTimer } from '../helpers'
import TableEntity from './table-entity'

export default class Task extends TableEntity {
  private time: Dayjs
  private interval: NodeJS.Timeout = setTimeout(() => {}, 0)
  private screenshot: NodeJS.Timeout = setTimeout(() => {}, 0)

  constructor(task: RequestedTask) {
    super(task)
    this.time = initTimer(task.time)
  }

  set toggleOn(isOn: boolean) {
    super.toggleOn = isOn
    if (this.isOn) {
      this.interval = setInterval(() => (this.time = this.time.add(1, 'second')), 1000)
      this.screenshot = setInterval(
        () => {
          console.log(111)
          window.events.screenshot()
        },
        10000 || 10 * 60 * 1000
      )
    } else {
      clearInterval(this.interval)
      clearInterval(this.screenshot)
    }
  }

  get getTime() {
    return this.time
  }

  get getFormatedTime() {
    return this.time.format(this.timeFormat)
  }
}
