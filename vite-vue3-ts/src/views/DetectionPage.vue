<template>
  <div class="detection-container">
    <div class="left-box">
      <el-upload
          drag
          ref="uploadRef"
          action="/api/upload"
          :data="{'userName':userName}"
          @change="handleChange"
          :before-upload="handleBeforeUpload"
          :show-file-list="false"
          v-on:success="handleUploadSuccess">
          <div class="prompt-box">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text" style="margin-bottom: 7px">拖拽文件到这里</div>
            <div class="el-upload__text">或<em>选择APK文件</em></div>
            <div class="current-file-name" v-show="currentFileName">{{currentFileName}}</div>
          </div>
      </el-upload>
      <el-button type="primary" class="start-btn" :disabled="!currentFileName" @click="handleStartDetection">开始检测</el-button>
    </div>
    <div class="main-box">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="权限列表" name="first">
          <div class="no-result" v-if="permissionData.list.length===0">未检测到相关信息</div>
          <div v-else>
            <p class="prompt-text">说明：红色字体表示危险权限，黑色字体表示普通权限</p>
            <div class="item-box" v-for="item in permissionData.list" :key="item.key" :class="{'danger':item.type==='danger'}">
              <span class="item-label">{{item.key}}</span>
              <span class="item-desc">{{item.value}}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="第三方SDK" name="second">
          <div class="no-result" v-if="sdkExcelData.list.length===0">未检测到相关信息</div>
          <div v-else>
            <div class="item-box" v-for="(item,index) in sdkExcelData.list" :key="item.key">
              <span class="item-label">{{item.key}}</span>
              <span class="item-desc">
              <el-input v-model="item.value" size="small" placeholder="请输入SDK名称" @blur="handleInputBlur(index)"></el-input>
            </span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="隐私信息" name="third">
          <div class="no-result" v-if="privacyExcelData.list.length===0">未检测到相关信息</div>
          <div v-else>
            <div class="item-box" v-for="item in privacyExcelData.list" :key="item.key">
              <span class="item-label">{{item.key}}</span>
              <span class="item-desc">{{item.value}}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="敏感信息" name="fourth">
          <div class="no-result" v-if="sensitiveExcelData.list.length===0">未检测到相关信息</div>
          <div v-else>
            <div class="item-box-sensitive" v-for="item in sensitiveExcelData.list" :key="item.key">
              <span class="item-label">{{item.key}}</span>
              <span class="item-desc">{{item.value}}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="动态检测信息" name="fifth">
          <div class="no-result" v-if="!dynamicData">请在模拟器上运行游戏后查看</div>
          <div v-else class="dynamic-box">{{dynamicData}}</div>
        </el-tab-pane>
      </el-tabs>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{userName||'--'}}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExportExcel">导出检测结果</el-dropdown-item>
            <el-dropdown-item @click="handleDownloadXposedPlugin">下载检测插件</el-dropdown-item>
            <el-dropdown-item @click="handleLogout"> 退出 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { ref, reactive,inject, onMounted, onUnmounted, toRaw } from "vue";
import * as XLSX from 'xlsx';
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus';
import io from "socket.io-client"
import axios from "utils/axios.js"

export default {
  name: "detection",
  setup() {
    const router = inject("$router");
    let userName = ref('adminYzf');
    userName.value = sessionStorage.getItem('username');
    const initSocket = ()=> {
      const socket = io.connect("http://10.1.9.79:8099",{
        timeout: 5000,
        rememberUpgrade: true,
        // extraHeaders: {
        //   'Authorization': jwtToken
        // },
        transports: ["websocket","polling"],
        query: {
          username: userName.value
        }
      })
      socket.on("connect", () => {
        console.log("====socket链接成功==connect==="+socket.id);

      });
      socket.on("connect_error",() => {
        console.log("====socket链接错误connect_error=====")
        socket.close()
      })
      socket.on("disconnect", () => {
        console.log("=====socket链接断开disconnect==");
        // socket.close()
        // socket.reconnect()
      });
      socket.on("err", (err) => {
        console.log(err);
        // socket.close()
      });
      socket.on('reconnect', function(){
        // 重新连接成功
        console.log("=====socket重新连接成功==");
      });

      socket.on('reconnecting', function( nextRetry ){
        // 尝试重新连接
        console.log("=====socket尝试重新连接==");
      });

      socket.on('reconnect_failed', function(){
        // 重新连接失败
        console.log("=====socket尝试重新连接失败==");
      });

      return socket;
    }
    const currentFileName = ref('');
    currentFileName.value = sessionStorage.getItem("currentFileName") || '';
    const handleChange = (file,files) => {
      currentFileName.value = file.name;
    }
    let UploadLoading;
    const handleBeforeUpload = (file) => {
      if(file.name.endsWith('apk') || file.name.endsWith('ipa')) {
        UploadLoading = ElLoading.service({
          lock: true,
          text: '文件上传中',
          background: 'rgba(230, 230, 230, 0.9)',
        })
      }else {
        currentFileName.value = "";
        ElMessage.error("请上传APK文件");
        return false;
      }
    }
    const handleUploadSuccess = (res) => {
      // currentFileName.value = res.filename;
      sessionStorage.setItem("currentFileName",currentFileName.value)
      ElMessage.success("上传成功");
      UploadLoading.close()
    }

    let ProgressLoading;
    const activeName = ref('first');
    const permissionData = reactive({name: "permissionData", list: []});
    const privacyExcelData = reactive({name: "privacyExcelData", list: []});
    const sdkExcelData = reactive({name: "sdkExcelData", list: []});
    const sensitiveExcelData = reactive({name: "sensitiveExcelData", list: []});
    [permissionData,privacyExcelData,sdkExcelData,sensitiveExcelData].forEach(obj=> {
      sessionStorage.getItem(`${obj.name}`)?obj.list = JSON.parse(sessionStorage.getItem(`${obj.name}`)):[]
    });
    const dynamicData = ref('');
    sessionStorage.getItem("dynamicData")?dynamicData.value = JSON.parse(sessionStorage.getItem("dynamicData")):"";
    const handleStartDetection = () => {
      const socket = initSocket();
      ProgressLoading = ElLoading.service({
        lock: true,
        text: '当前进度0%',
        background: 'rgba(230, 230, 230, 0.9)',
      })
      // axios.get('/start',{}).then(res=> {})
      socket.emit('start', `${userName.value}${currentFileName.value}`, (data)=> {
      // socket.emit('start', `xhxshz.apk`, (data)=> {
        console.log(data)
      })
      socket.on("progress",(data)=> {
       console.log(data)
        ProgressLoading.setText(`当前进度${data}%`)
      })
      socket.on("permissionData",(data)=> {
        permissionData.list = data || [];
        sessionStorage.setItem("permissionData",JSON.stringify(data))
      })
      socket.on("privacyExcelData",(data)=> {
        privacyExcelData.list = data || [];
        sessionStorage.setItem("privacyExcelData",JSON.stringify(data))
      })
      socket.on("sdkExcelData",(data)=> {
        sdkExcelData.list = data || [];
        sessionStorage.setItem("sdkExcelData",JSON.stringify(data))
      })
      socket.on("sensitiveExcelData",(data)=> {
        sensitiveExcelData.list = data || [];
        sessionStorage.setItem("sensitiveExcelData",JSON.stringify(data))
        ProgressLoading.close()
      })
      socket.on("dynamicData",(data)=> {
        dynamicData.value = data;
        sessionStorage.setItem("dynamicData",JSON.stringify(data))
      })
    }
    const handleLogout = ()=> {
      router.push("/login");
      sessionStorage.clear()
    }
    const handleInputBlur = (index)=> {
      console.log(sdkExcelData.list[index])
      const itemObj = sdkExcelData.list[index];
      if(!itemObj.value) return;
      axios.post("/recordSDKname",{
        name: itemObj.key,
        value: itemObj.value
      }).then(res=> {
        console.log(res)
      })
    }

    const handleExportExcel = ()=> {
      let wb = XLSX.utils.book_new()
      let permissionDataBak = JSON.parse(JSON.stringify(permissionData.list));
      permissionDataBak.forEach(item=> {
        delete item['type']
      })
      let sheetPermission = XLSX.utils.json_to_sheet(permissionDataBak);
      XLSX.utils.book_append_sheet(wb, sheetPermission, "权限列表");
      let sheetSdk = XLSX.utils.json_to_sheet(sdkExcelData.list);
      XLSX.utils.book_append_sheet(wb, sheetSdk, "第三方SDK");
      let sheetPrivacy = XLSX.utils.json_to_sheet(privacyExcelData.list);
      XLSX.utils.book_append_sheet(wb, sheetPrivacy, "隐私信息")
      let sheetSensitive = XLSX.utils.json_to_sheet(sensitiveExcelData.list);
      XLSX.utils.book_append_sheet(wb, sheetSensitive, "敏感信息")

      // 创建工作薄blob
      const workbookBlob = workbook2blob(wb)
      // 导出工作薄
      openDownloadDialog(workbookBlob, `${currentFileName.value}检测结果.xls`)
      // 将workbook装化成blob对象
      function workbook2blob(workbook) {
        // 生成excel的配置项
        let wopts = {
          // 要生成的文件类型
          bookType: 'xlsx',
          // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
          bookSST: false,
          // 二进制类型
          type: 'binary'
        }
        let wbout = XLSX.write(workbook, wopts);
        let blob = new Blob([s2ab(wbout)], {
          type: 'application/octet-stream'
        })
        return blob
      }
      // 将字符串转ArrayBuffer
      function s2ab(s) {
        let buf = new ArrayBuffer(s.length)
        let view = new Uint8Array(buf)
        for (let i = 0; i !== s.length; ++i) {
          view[i] = s.charCodeAt(i) & 0xff
        }
        return buf
      }
      // 将blob对象创建bloburl，然后用a标签实现弹出下载框
      function openDownloadDialog(blob, fileName) {
        if (typeof blob == 'object' && blob instanceof Blob) {
          blob = URL.createObjectURL(blob) // 创建blob地址
        }
        let aLink = document.createElement('a');
        aLink.href = blob;
        // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，有时候 file:///模式下不会生效
        aLink.download = fileName || '';
        let event = new MouseEvent('click');
        aLink.dispatchEvent(event)
        URL.revokeObjectURL(blob)
      }
    }

    const handleDownloadXposedPlugin = ()=> {
      window.open(`/api/download/xposed-${userName.value}.apk`,"_self")
      // axios.post(`/download/xposed-${userName.value}.apk`,{}).then(res=> {
      //   console.log(res)
      // })
    }

    return {
      userName,
      currentFileName,
      handleChange,
      handleUploadSuccess,
      handleBeforeUpload,
      handleStartDetection,
      activeName,
      permissionData,
      privacyExcelData,
      sdkExcelData,
      sensitiveExcelData,
      dynamicData,
      handleLogout,
      handleInputBlur,
      handleExportExcel,
      handleDownloadXposedPlugin
    };
  },
};
</script>

<style scoped lang="scss">
.detection-container {
  background-color: #fff;
  display: flex;
  width: 1350px;
  border: 1px solid $common_border_color;
  flex: 1;
  margin: 10px auto;
  flex-direction: row;
  .left-box {
    display: flex;
    align-items: center;
    padding: 5px;
    flex-direction: column;
    border-right: 1px dashed $common_border_color;
    div:first-child {
      flex: 1;
    }
    .start-btn {
      width: 100%;
      flex: 0 1 90px;
      font-size: 18px;
    }
    .current-file-name {
      color: $common_success_color;
      margin-top: 10px;
      font-size: 16px;
      max-width: 98%;
      text-overflow: ellipsis;
      word-break: break-all;
    }
  }
  .main-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    .el-tabs--border-card {
      flex: 1;
      position: relative;
      border-left: none!important;
      border-right: none!important;
      border-bottom: none!important;
      .el-tabs__nav-wrap::after {
        height: 1px;
      }
      :deep(.el-tabs__content) {
        position: absolute;
        top: 40px;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: auto;
        .prompt-text {
          font-size: 14px;
          color: #909399;
          padding-left: 7px;
          height: 25px;
          line-height: 25px;
        }
        .item-box {
          display: flex;
          height: 45px;
          justify-content: start;
          align-items: center;
          font-size: 14px;
          &.danger {
            color: #DC143C;
          }
          .item-label {
            flex: 0 1 290px;
            padding-left: 5px;
          }
          .item-desc {
            flex: 0 1 auto;
          }
        }
        .item-box-sensitive {
          display: flex;
          min-height: 45px;
          justify-content: start;
          align-items: center;
          font-size: 14px;
          margin-bottom: 15px;
          .item-label {
            flex: 0 1 140px;
            padding-left: 5px;
          }
          .item-desc {
            flex: 1;
            line-height: 1.3;
          }
        }
      }
    }
    .el-dropdown {
      position: absolute;
      top: 9px;
      right: 10px;
      font-size: 16px;
      .el-icon.el-icon--right {
        top: 3px;
      }
    }
  }
}
</style>
<style lang="scss">
  .detection-container {
    .el-upload {
      height: 99%;
      .el-upload-dragger {
        width: 210px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .el-tabs__item {
      font-size: 16px;
    }
    .no-result {
      font-size: 16px;
      color: #909399;
      padding-left: 7px;
    }
    .dynamic-box {
      white-space: pre;
    }
  }
</style>