/*
 * @Author: abc
 * @Date: 2020-10-22 16:49:58
 * @LastEditors: abc
 * @LastEditTime: 2020-10-24 11:09:10
 * @Description:
 */
const fs = require("fs");
const path = require("path");
async function afterPack(context) {
  // 删除 README 文件，使其不加入 Setup 包中。
  let readmePath = path.join(
    context.appOutDir,
    "resources/app.asar.unpacked/README.md"
  );
  if (fs.existsSync(readmePath)) {
    fs.unlinkSync(readmePath);
  }
}
module.exports = afterPack;
