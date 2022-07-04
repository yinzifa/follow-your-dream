<template>
  <div class="flexCenter login-container">
    <div class="content">
      <el-form
        ref="loginForm"
        :model="form"
        :rules="formRules"
        class="user-form">
        <span class="logoTitle">APP权限合规检测工具</span>
        <el-form-item label="" prop="username">
          <el-input
            type="text"
            v-model="form.username"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-button type="primary" class="submit-btn" @click="asyncLogin">登 录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  onMounted,
  inject,
  onBeforeMount,
  onUnmounted,
} from "vue";
import { ElMessage } from "element-plus";
export default {
  name: "SystemLogin",
  setup() {
    const router = inject("$router");
    const axios = inject("$axios");
    const loginForm = ref(null);
    let form = reactive({
      username: "",
      password: "",
    });
    // 表单验证
    const validatePass = (rule, value, callback) => {
      let reg = /.*[ ,'\"\\\\].*/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (
        value.length > 18 ||
        value.length < 6 ||
        value.match(reg) !== null
      ) {
        callback(
          new Error("由除空格、逗号、单双引号、反斜杠外的6-18位字符组成")
        );
      } else {
        callback();
      }
    };

    const formRules = reactive({
      username: [{ required: true, message: "请输入账号", trigger: "blur" }],
      password: [{ validator: validatePass, trigger: "blur" }],
    });
    const asyncLogin = () => {
      loginForm.value.validate((valid) => {
        if (valid) {
          axios.post(`/login`,{
            username: form.username,
            password: form.password
          }).then((res) => {
            const { code,msg,data } = res;
            if (code === 1) {
              console.log(data)
              sessionStorage.setItem("username",form.username)
              router.push("/detection");
            } else {
              ElMessage({
                message: msg,
                type: "error",
              });
            }
          })
        }
      });
    };
    return {
      form,
      asyncLogin,
      loginForm,
      formRules,
    };
  },
};
</script>

<style scoped lang="scss">
.login-container {
  height: 100vh;
  .content {
    display: flex;
    justify-content: space-between;
    width: 500px;
    height: 550px;
    span {
      display: inline-block;
    }
    img {
      display: inline-block;
      width: 33.3%;
      height: 550px;
    }
    .user-form {
      flex: 1;
      background-color: #fff;
      border-radius: 4px;
      padding: 35px;
      text-align: center;
      .logoTitle {
        font-size: 26px;
        font-weight: 600;
        color: #262626;
        margin-top: 65px;
        margin-bottom: 39px;
      }
      .submit-btn {
        margin-top: 25px;
        width: 100%;
        height: 44px;
        font-size: 18px;
      }
    }
  }
}
.flexCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.el-input) {
  .el-input__wrapper {
    background: #f7f8fa;
    .el-input__inner {
      height: 44px;
    }
  }
}
:deep(.el-form-item) {
  margin-bottom: 25px;
}
</style>

