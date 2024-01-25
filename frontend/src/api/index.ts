// import axios, { AxiosInstance } from 'axios'
// import qs from 'qs'
import Project from '../classes/project'

export default class Api {
  // private instance: AxiosInstance
  // constructor(token: string) {
    // this.instance = axios.create({
    //   baseURL: process.env.VITE_API_URL,
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     'X-Requested-With': 'XMLHttpRequest'
    //   },
    //   paramsSerializer: params => qs.stringify(params)
    // })
  // }

  constructor() {}

  async getProjects(): Promise<Project[]> {
    const responce = {
      data: [{
        id: 1,
        name: 'project1',
        tasks: [{
          id: 2,
          name: 'task1',
          time: new Date()
        }]
      }]
    }
    return responce.data.map(project => new Project(project))
  }
}