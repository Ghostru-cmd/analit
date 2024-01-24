import { RequestedProject } from '../interfaces'
import Task from './task.ts'
import {addTime, initTimer} from "../helpers";

export default class Project {
  private id: number
  private name: string
  private tasks: Task[] = []
  public isOn = false
  public timeFormat = 'HH:mm:ss'

  constructor(project: RequestedProject) {
    this.id = project.id
    this.name = project.name
    this.tasks = project.tasks.map(task => new Task(task))
  }

  set toggleOn(isOn: boolean) {
    this.isOn = isOn
  }

  get getTime() {
    return this.tasks.reduce((acc, task) => addTime(acc, task.getTime), initTimer())
  }

  get getFormatedTime() {
    return this.getTime.format(this.timeFormat)
  }

  get getId() {
    return this.id
  }

  get getName() {
    return this.name
  }

  get getTasks() {
    return this.tasks
  }

  set addTask(task: Task) {
    this.tasks.push(task)
  }

  set removeTaskById(id: number) {
    this.tasks = this.tasks.filter(task => task.getId !== id)
  }

  get children() {
    return this.tasks
  }
}