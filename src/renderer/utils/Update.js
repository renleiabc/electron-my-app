/*
 * @Author: abc
 * @Date: 2020-10-25 18:33:27
 * @LastEditors: abc
 * @LastEditTime: 2020-10-26 19:06:29
 * @Description:
 */
import { autoUpdater } from "electron-updater";
import { ipcMain } from "electron"; // ipcMain 主线程
let mainWindow = null;
let versionInfo = null;
export function updateHandle(win) {
  mainWindow = win;
  let message = {
    error: "检查更新出错",
    checking: "正在检查更新……",
    updateAva: "检测到新版本，正在下载……",
    updateNotAva: "现在使用的就是最新版本，不用更新"
  };
  autoUpdater.checkForUpdatesAndNotify();
  //设置更新包的地址
  // autoUpdater.setFeedURL(feedUrl);
  //监听升级失败事件
  autoUpdater.on("error", function () {
    sendUpdateMessage(message.error);
  });
  //监听开始检测更新事件
  autoUpdater.on("checking-for-update", function () {
    sendUpdateMessage(message.checking);
  });
  //监听发现可用更新事件
  autoUpdater.on("update-available", function (message) {
    sendUpdateMessage(message.updateAva);
  });
  //监听没有可用更新事件
  autoUpdater.on("update-not-available", function (message) {
    sendUpdateMessage(message.updateNotAva);
  });

  // 更新下载进度事件
  autoUpdater.on("download-progress", function (progressObj) {
    mainWindow.webContents.send("downloadProgress", progressObj);
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
    mainWindow.webContents.send("isUpdateNow", versionInfo.versionInfo);
  });
  ipcMain.on("checkForUpdate", () => {
    // 收到renderer进程的检查通知后，执行自动更新检查
    // autoUpdater.checkForUpdates()
    let checkInfo = autoUpdater.checkForUpdates();
    checkInfo.then(function (data) {
      versionInfo = data; // 获取更新包版本等信息
    });
  });
}
//给渲染进程发送消息
function sendUpdateMessage(text) {
  mainWindow.webContents.send("message", text);
}
