import { app, BrowserWindow, ipcRenderer, desktopCapturer, screen } from "electron"
import path from "path"
import { isDev } from "./config"
import * as fs from 'fs'

let mainWindow: BrowserWindow

async function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        minWidth: 900,
        height: 750,
        minHeight: 600,

        webPreferences: {
            nodeIntegration: true,
            devTools: isDev,
        },
        show: false,
        alwaysOnTop: true,
        frame: true,
    })

    if (isDev) mainWindow.webContents.openDevTools()

    await mainWindow.loadURL(isDev ? "http://localhost:9090" : `file://${path.join(__dirname, "./index.html")}`)
}

app.whenReady().then(async () => {
    await createWindow()

    mainWindow.show()

    ipcRenderer.on('screenshot', async (event, folderPath) => {
        const thumbnailSize = screen.getAllDisplays().reduce((acc, display) => {
            acc.width = acc.width > display.size.width ? acc.width : display.size.width
            acc.height = acc.height > display.size.height ? acc.height : display.size.height
            return acc
        }, { width: 0, height: 0 })
        const sources = await desktopCapturer.getSources({types: ['screen'], thumbnailSize })
        sources.forEach(source => fs.writeFileSync(`./screenshots/${new Date().toISOString()}.png`, source.thumbnail.toPNG()))
    });
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit()
})

app.on('activate', async () => {
    if (mainWindow === null) await createWindow()
})