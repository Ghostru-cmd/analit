import { Dayjs } from 'dayjs'

export interface RequestedProject {
  id: number
  name: string
  tasks: RequestedTask[]
}

export interface RequestedTask {
  id: number
  name: string
  time: Date
}

export interface RequestedUser {
  id: number
  name: string
  login: string
}

export interface ProjectTable {
  name: string
  time: Dayjs
  children?: ProjectTable[]
}
