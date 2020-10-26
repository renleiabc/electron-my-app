<template>
  <div id="app">
    <router-view></router-view>
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
let timeOut = null;

let self = this;
import isElectron from "is-electron";
if (isElectron()) {
  //接收主进程版本更新消息
  window.ipcRenderer.on("message", (event, arg) => {
    // console.log(arg);
    if ("update-available" == arg.cmd) {
      //显示升级对话框
      self.dialogVisible = true;
    } else if ("download-progress" == arg.cmd) {
      // console.log(arg.message.percent);
      let percent = Math.round(parseFloat(arg.message.percent));
      self.percentage = percent;
    } else if ("error" == arg.cmd) {
      self.dialogVisible = false;
      self.$message(arg);
    } else if ("update-not-available" == arg.cmd) {
      // self.$message(arg);
    }
  });
  //开始检测新版本
  timeOut = window.setTimeout(() => {
    window.ipcRenderer.send("checkForUpdate");
    // console.log('开始检测更新触发')
  }, 500);
  clearTimeout(timeOut);
}

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
    self = this;
  },
  destroyed() {
    window.clearInterval(timeOut);
  }
};
</script>

<style>
/* CSS */
#app {
  height: 100%;
  overflow: hidden;
}
#app > div {
  overflow: hidden;
}
.tableList {
  widows: 150px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.el-tooltip__popper {
  font-size: 14px;
  max-width: 300px !important;
  text-align: justify;
  text-justify: newspaper;
  word-break: break-all;
  line-height: 20px;
}
</style>
