/*
 * @Author: abc
 * @Date: 2020-10-24 16:13:49
 * @LastEditors: abc
 * @LastEditTime: 2020-10-26 18:47:45
 * @Description:vue 配置文件
 */
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  runtimeCompiler: true,
  publicPath: "./",
  devServer: {
    // can be overwritten by process.env.HOST
    host: "0.0.0.0",
    port: 8080
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("src", resolve("src"))
      .set("common", resolve("src/common"))
      .set("components", resolve("src/components"));
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "com.electorn-my-app.app", //包名
        asar: true,
        productName: "electorn-my-app", //项目名 这也是生成的exe文件的前缀名
        afterPack: "./public/afterPack.js",
        copyright: "这是一个electorn-my-app项目", //版权  信息
        directories: {
          buildResources: "public",
          output: "build" // 输出文件夹
        },
        win: {
          icon: "./public/img/icons/favicon.ico"
          /*  target: {
            target: "nsis",
            arch: ["x64", "ia32"]
          } */
        },
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: "link",
              path: "/Applications"
            },
            {
              x: 130,
              y: 150,
              type: "file"
            }
          ]
        },
        mac: {
          icon: "./public/img/icons/512.icns"
        },
        publish: {
          provider: "github",
          repo: "electron-my-app", // git仓库
          owner: "renleiabc", // 拥有者
          token: "b68c40e0d3c50dd0bf7f1277817f3284ebb4de25", // gitToken
          releaseType: "release",
          publishAutoUpdate: true // 发布自动更新（需要配置GH_TOKEN）。 默认true
        },
        /*  publish: [
          {
            provider: "generic", // 服务器提供商 也可以是GitHub等等
            url: "http://127.0.0.1:5501/download/" // 服务器地址
          }
        ], */
        nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          installerIcon: "./public/img/icons/favicon.ico", // 安装图标
          uninstallerIcon: "./public/img/icons/favicon.ico", //卸载图标
          installerHeaderIcon: "./public/img/icons/favicon.ico", // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: "vue" // 图标名称
        }
      }
    }
  }
};
