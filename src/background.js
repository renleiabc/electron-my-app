/*
 * @Author: abc
 * @Date: 2020-10-23 18:50:47
 * @LastEditors: abc
 * @LastEditTime: 2020-10-28 17:49:53
 * @Description:
 */
"use strict";
import {
  Menu,
  app,
  protocol,
  BrowserWindow,
  globalShortcut,
  dialog,
  ipcMain
} from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer"; /// import { updateHandle } from "./renderer/utils/Update";
import { autoUpdater } from "electron-updater";
const isDevelopment = process.env.NODE_ENV !== "production";
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
// let feedUrl = "https://github.com/renleiabc/electron-my-app/releases/download"; // 下载地址，不加后面的**.exe

let win;
// let versionInfo = null;
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

async function createWindow() {
  // 设置导航栏函数调用
  createMenu();
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 620,
    useContentSize: true,
    titleBarStyle: "hidden",
    webPreferences: {
      // webSecurity: false, //取消跨域限制
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      // eslint-disable-next-line no-undef
      preload: `${__static}/preload.js`
    },
    // 开发时，修改窗口图标的路径"../public/img/icons/favicon.ico"
    // 打包时path.join(__dirname, "../public/img/icons/favicon.ico")
    //这里的${__static}对应的是public目录
    // eslint-disable-next-line no-undef
    icon: `${__static}/img/icons/favicon.ico`
  });
  if (process.platform === "darwin") {
    // eslint-disable-next-line no-undef
    app.dock.setIcon(`${__static}/img/icons/512.png`);
  }
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    /* if (!process.env.IS_TEST) win.webContents.openDevTools(); */
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
    //检测版本更新
    autoUpdater.checkForUpdates();
  }

  win.on("closed", () => {
    win = null;
  });
  globalShortcut.register("CommandOrControl+Shift+i", function () {
    win.webContents.openDevTools();
  });
  //检测版本更新
  // updateHandle(win);
  //updateHandle(win);
}
// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// 设置菜单栏
function createMenu() {
  // darwin表示macOS，针对macOS的设置
  if (process.platform === "darwin") {
    const template = [
      {
        label: "electorn-my-app",
        submenu: [
          {
            role: "about"
          },
          {
            role: "quit"
          }
        ]
      }
    ];
    let menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    // windows及linux系统
    Menu.setApplicationMenu(null);
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});
//监听开始检测更新事件
autoUpdater.on("checking-for-update", () => {
  win.webContents.send("message", "正在检查更新……");
});
/* ipcMain.on("checkForUpdate", () => {
  // 收到renderer进程的检查通知后，执行自动更新检查
  // autoUpdater.checkForUpdates()
  let checkInfo = autoUpdater.checkForUpdates();
  checkInfo.then(function (data) {
    versionInfo = data; // 获取更新包版本等信息
  });
}); */
//监听升级失败事件
autoUpdater.on("error", function () {
  win.webContents.send("message", "检查更新出错");
});
autoUpdater.on("update-available", () => {
  win.webContents.send("message", "检测到新版本，正在下载……");
  dialog.showMessageBox({
    title: "新版本发布",
    message: "有新内容更新，稍后将重新为您安装",
    buttons: ["确定"],
    type: "info",
    noLink: true
  });
});
autoUpdater.on("update-not-available", () => {
  win.webContents.send("message", "现在使用的就是最新版本，不用更新");
});
// 更新下载进度事件
autoUpdater.on("download-progress", function (progressObj) {
  win.webContents.send("downloadProgress", progressObj);
});
//监听下载完成事件
autoUpdater.on("update-downloaded", function (
  event,
  releaseNotes,
  releaseName,
  releaseDate,
  updateUrl,
  quitAndUpdate
) {
  console.log(event);
  console.log(releaseNotes);
  console.log(releaseName);
  console.log(releaseDate);
  console.log(updateUrl);
  console.log(quitAndUpdate);
  // 收到renderer进程确认更新
  ipcMain.on("updateNow", (e, arg) => {
    console.log(e);
    console.log(arg);
    console.log("开始更新");
    autoUpdater.quitAndInstall(); // 包下载完成后，重启当前的应用并且安装更新
  });
  // 主进程向renderer进程发送是否确认更新
  //win.webContents.send("isUpdateNow", versionInfo.versionInfo);
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
//给渲染进程发送消息
/* function sendUpdateMessage(text) {
  win.webContents.send("message", text);
}
 */
