import { RequestedProject } from '../interfaces'
import Task from './task'
import { addTime, initTimer } from '../helpers'
import TableEntity from './table-entity'

export default class Project extends TableEntity {
  private tasks: Task[] = []

  constructor(project: RequestedProject) {
    super(project)
    this.tasks = project.tasks.map((task) => new Task(task))
  }

  get getTime() {
    return this.tasks.reduce((acc, task) => addTime(acc, task.getTime), initTimer())
  }

  get getFormatedTime() {
    return this.getTime.format(this.timeFormat)
  }

  get getTasks() {
    return this.tasks
  }

  set addTask(task: Task) {
    this.tasks.push(task)
  }

  set removeTaskById(id: number) {
    this.tasks = this.tasks.filter((task) => task.getId !== id)
  }

  get children() {
    return this.tasks
  }
}
