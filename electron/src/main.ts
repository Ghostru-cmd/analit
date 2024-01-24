import {app, BrowserWindow, desktopCapturer } from "electron"
import path from "path"
import { isDev } from "./config"
import * as fs from "fs";
// import screenshot from "electron-screenshot-app";
app.whenReady().then(async () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    minWidth: 900,
    height: 750,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  await mainWindow.loadURL(isDev ? "http://localhost:9090" : `file://${path.join(__dirname, "./index.html")}`)

  if (isDev) mainWindow.webContents.openDevTools()

  // setInterval(() => takeScreenshot(screen.getAllDisplays()), 10000)

  // const screens = await screenshot.listDisplays();
  // const image = await screenshot.captureDisplays(screens);
  // console.log(image)

  const sources = await desktopCapturer.getSources({ types: ['screen'] });
  console.log(sources)
  sources.forEach((source, index) => fs.writeFileSync(`${index}.png`, source.thumbnail.toPNG()))

  // navigator.mediaDevices
  //   .getUserMedia({
  //     audio: false,
  //     video: true,
  //   })
  //   .then((stream) => {
  //     // Обработка доступа к экрану
  //     console.log('Access to screen granted:', stream);
  //   })
  //   .catch((error) => {
  //     console.error('Error accessing screen:', error);
  //   });
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})