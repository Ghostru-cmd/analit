import { RequestedTask } from '../interfaces'

export default abstract class TableEntity {
  private readonly id: number
  private readonly name: string
  private readonly itProject: boolean
  protected on = false
  public timeFormat = 'HH:mm:ss'

  protected constructor(entity: { id: number, name: string, tasks?: RequestedTask[], [key: string]: any }) {
    this.id = entity.id
    this.name = entity.name
    this.itProject = Array.isArray(entity.tasks)
  }

  get getId() {
    return this.id
  }

  get getName() {
    return this.name
  }

  get isProject() {
    return this.itProject
  }

  get isOn() {
    return this.on
  }

  set toggleOn(isOn: boolean) {
    this.on = isOn
  }
}