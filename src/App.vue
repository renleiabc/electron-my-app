<!--
 * @Author: abc
 * @Date: 2020-10-23 18:46:29
 * @LastEditors: abc
 * @LastEditTime: 2020-10-28 17:50:35
 * @Description: 
-->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <el-dialog
      title="正在更新版本,请稍后 ···"
      :visible.sync="dialogVisible"
      width="60%"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnPressEscape"
      :show-close="showClose"
      center
    >
      <div
        style="width: 100%; height: 5vh; line-height: 5vh; text-align: center"
      >
        <el-progress
          status="success"
          :text-inside="true"
          :stroke-width="20"
          :percentage="percentage"
          :width="strokeWidth"
          :show-text="true"
        ></el-progress>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import isElectron from "is-electron";

export default {
  name: "globalquickseek",
  data() {
    return {
      dialogVisible: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      showClose: false,
      percentage: 0,
      strokeWidth: 200
    };
  },
  mounted() {
    let vm = this;
    console.log("开始渲染");
    if (isElectron()) {
      console.log("electron环境");
      vm.ipcRenderer = window.ipcRenderer;
      console.log(vm.ipcRenderer);
      vm.ipcRenderer.on("message", (event, data) => {
        console.log("message", data);
      });
      vm.ipcRenderer.on("downloadProgress", (event, progressObj) => {
        console.log("downloadProgress", progressObj);
        // 可自定义下载渲染效果
      });
      vm.ipcRenderer.on("isUpdateNow", (event, versionInfo) => {
        // 自定义选择效果，效果自行编写
        vm.$confirm(
          "检测到新版本" + versionInfo.version + ",是否立即升级？",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            center: true
          }
        )
          .then(() => {
            vm.ipcRenderer.send("updateNow");
          })
          .catch(() => {
            vm.$message({
              type: "info",
              message: "已取消更新！"
            });
          });
      });
      vm.autoUpdate(); // electron应用启动后主动触发检查更新函数
    }
  },
  destroyed() {
    // 移除ipcRenderer所有事件
    if (isElectron()) {
      this.ipcRenderer.removeAllListeners();
    }
  },
  methods: {
    autoUpdate() {
      // 用来触发更新函数
      this.ipcRenderer.send("checkForUpdate");
    }
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: red;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
