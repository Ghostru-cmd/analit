import { Dayjs } from 'dayjs'
import { RequestedTask } from '../interfaces'
import {initTimer} from "../helpers";

export default class Task {
  private id: number
  private name: string
  private time: Dayjs
  private interval: NodeJS.Timeout = setTimeout(() => {}, 0)
  public isOn = false
  public timeFormat = 'HH:mm:ss'

  constructor(task: RequestedTask) {
    this.id = task.id
    this.name = task.name
    this.time = initTimer(task.time)
  }

  set toggleOn(isOn: boolean) {
    this.isOn = isOn
    if (this.isOn) this.interval = setInterval(() => this.time = this.time.add(1, 'second'), 1000)
    else clearInterval(this.interval)
    ipcRenderer.send('screenshot', 'filename')
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