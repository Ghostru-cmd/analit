import { Dayjs } from 'dayjs'
import { RequestedTask } from '../interfaces'
import * as dayjs from 'dayjs'

export default class Task {
  private id: number
  private name: string
  private time: Dayjs
  private interval: NodeJS.Timeout = setTimeout(() => {}, 0)
  public timeFormat = 'HH:mm:ss'

  constructor(task: RequestedTask) {
    this.id = task.id
    this.name = task.name
    this.time = dayjs(task.time)
  }

  set recordTime(isOn: boolean) {
    if (isOn) this.interval = setInterval(() => this.time.add(1, 'second'), 1000)
    else clearInterval(this.interval)
  }

  get dataForTable() {
    return {
      name: this.getName,
      time: this.getTime
    }
  }

  get getTime() {
    return this.time
  }

  get getFormatedTime() {
    return this.time.format(this.timeFormat)
  }

  get getName() {
    return this.name
  }

  get getId() {
    return this.id
  }
}