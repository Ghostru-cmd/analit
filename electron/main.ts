import { app, BrowserWindow } from "electron"
import path from "path"
import { isDev } from "./config"

app.whenReady().then(async () => {
  const window = new BrowserWindow({
    width: 1200,
    minWidth: 900,
    height: 750,
    minHeight: 600
  })

  await window.loadURL(isDev ? "http://localhost:9090" : `file://${path.join(__dirname, "./index.html")}`)

  if (isDev) window.webContents.openDevTools()
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})