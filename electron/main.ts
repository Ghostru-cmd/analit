require('dotenv').config()

import { app, BrowserWindow, ipcMain, desktopCapturer } from 'electron'
import * as logger from 'electron-log'
import path from 'path'
import { isDev } from './config'
import * as fs from 'fs'
import os from 'os'

let mainWindow: BrowserWindow

const isLinux = os.platform() === 'linux'

const mainPath = isDev ? __dirname : path.join(__dirname, '../../../')
const screenshotPath = path.join(mainPath, 'screenshot')

logger.transports.file.resolvePathFn = () => path.join(mainPath, `./logs/log-${Date.now()}.txt`)

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    minWidth: 900,
    height: 750,
    minHeight: 600,

    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      devTools: true
    },
    show: false,
    frame: true
  })

  mainWindow.webContents.openDevTools()

  await mainWindow.loadURL(isDev ? 'http://localhost:9090' : `file://${path.join(__dirname, './index.html')}`)
}

app.whenReady().then(async () => {
  await createWindow()

  mainWindow.show()

  ipcMain.handle('screenshot', async () => {
    try {
      if (!fs.existsSync(screenshotPath)) fs.mkdirSync(screenshotPath)
      if (isLinux) {

      }
      else {
        const sources = await desktopCapturer.getSources({
          types: ['screen'],
          thumbnailSize: {height: 1080, width: 1920}
        })
        sources.forEach((source) =>
          fs.writeFileSync(path.join(screenshotPath, `${Date.now()}_${source.display_id}.png`), source.thumbnail.toPNG())
        )
      }
    } catch (e) {
      logger.error('electron/main.ts | save screenshot error', e)
    } finally {
      logger.info('all gud')
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', async () => {
  if (mainWindow === null) await createWindow()
})
