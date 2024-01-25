import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('events', {
  screenshot: () => ipcRenderer.invoke('screenshot')
})