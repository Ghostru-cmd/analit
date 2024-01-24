import { RequestedProject } from '../interfaces'
import Task from './task.ts'
import { Dayjs } from 'dayjs'

export default class Project {
  private id: number
  private name: string
  private tasks: Task[] = []

  constructor(project: RequestedProject) {
    this.id = project.id
    this.name = project.name
    this.tasks = project.tasks.map(task => new Task(task))
  }

  get dataForTable() {
    let time: Dayjs
    const children = this.tasks.map(task => {
      if (!time) time = task.getTime
      else time = time.add(task.getTime.get('seconds'))
      return task.dataForTable
    })
    return {
      name: this.getName,
      time,
      children
    }
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
    this.tasks = this.tasks.filter(task => task.id !== id)
  }
}