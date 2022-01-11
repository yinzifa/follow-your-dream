<template>
  <div class="login-container">
    <el-form label-width="80px" :model="form" class="user-form">
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item label="验证码" class="code-box">
        <el-input v-model="form.code"></el-input>
        <span class="code-img" v-html="codeSvg" @click="asyncGetImgCode"></span>
      </el-form-item>
      <el-button type="primary" class="submit-btn" @click="asyncLogin">登 录</el-button>
    </el-form>
  </div>
</template>

<script>
import {ref, reactive, onMounted, inject, onBeforeMount, onUnmounted} from "vue"
export default {
  name: "Login",
  setup() {
    const $axios = inject('$axios')
    const $router = inject('$router')
    const codeSvg = ref("");
    let form = reactive({
      name: "",
      pwd: "",
      code: ""
    })
    const asyncGetImgCode = ()=> {
      $axios.get("/api/authCode").then((res)=> {
        codeSvg.value = res;
      })
    }
    let timer = null;
    onBeforeMount(()=> {
      asyncGetImgCode();
    })
    onMounted(()=> {
      console.log(this)
      console.log("========onmounted========")
      timer = setInterval(()=> {
        asyncGetImgCode();
      },60000)
    })
    onUnmounted(()=> {
      if(timer) clearInterval(timer)
    })
    const asyncLogin = ()=> {
      let data = Object.assign({},form);
      $axios.post("/api/login",data).then((res)=> {
        if(res.status === 1) {
          $router.push("/index")
        }
      })
    }
    return {
      codeSvg,
      form,
      asyncGetImgCode,
      asyncLogin
    }
  }
}
</script>

<style scoped>
.login-container {
  height: inherit;
  position: relative;
}
.user-form {
  width: 300px;
  height: 310px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border: 1px dashed #ccc;
  padding: 50px 50px 0 20px;
}
.submit-btn {
  position: absolute;
  bottom: 50px;
  width: 260px;
  left: 60px;
}
.code-box {
  position: relative;
}
.code-img {
  position: absolute;
  right: 0;
  top: 0;
}
</style>

