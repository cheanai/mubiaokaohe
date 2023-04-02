<template>
  <div class="login-box">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
      <div class="loginForm" v-bind:class="{ class1: isShow,class3: isleft }">
        <Transition name="fadeform1">
          <div v-if="!isShow" v-cloak>
            <h2>欢迎登录</h2>
            <el-form-item label="账号：" prop="username">
              <el-input v-model="ruleForm.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码：" prop="password">
              <el-input v-model="ruleForm.password" type="password" autocomplete="off" show-password="true" />
            </el-form-item>
            <div>
              <el-button type="primary" class="login-btn" @click="submitForm((ruleFormRef))">登录
              </el-button>
              <el-button class="login-btn" @click="resetForm">重置</el-button>
            </div>
          </div>
        </Transition>
        <Transition name="fadeform">
          <div v-if="isShow" v-cloak>
            <h2>忘记密码</h2>
            <el-form-item label="账号：" prop="username">
              <el-input v-model="ruleForm.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="邮箱：" prop="password">
              <el-input v-model="ruleForm.password" type="password" autocomplete="off" show-password="true" />
            </el-form-item>
            <div>
              <el-button type="primary" class="login-btn" @click="submitForm((ruleFormRef))">登录
              </el-button>
              <el-button class="login-btn" @click="resetForm">重置</el-button>
            </div>
          </div>
        </Transition>
      </div>
      <div class="textRight" v-bind:class="{ class2: isShow,class4: isleft }">
        <Transition name="fade">
          <div v-if="!isShow"  v-cloak>
            <p>欢迎登录目标考核系统</p>
            <p>请输入账号和密码</p>
            <input @click="fotget" type="button" value="忘记密码" />
          </div>
        </Transition>
        <Transition name="fade1">
          <div v-if="isShow"  v-cloak>
            <p>忘记密码了？</p>
            <p>请输入账号和邮箱</p>
            <input @click="tologin" type="button" value="去登陆" />
          </div>
        </Transition>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import axios from "@/api/axiosInstance";
import type { FormInstance } from 'element-plus'
import { AxiosResponse, AxiosError } from 'axios';
import { useMain } from '@/store/home'
const ruleFormRef = ref<FormInstance>()
const state = reactive({
  ruleForm: {
    username: "",
    password: "",
  },
});
const router = useRouter();
const rules = {
  username: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 3, max: 10, message: "账号的长度在3-10之间", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 10, message: "密码的长度在3-10之间", trigger: "blur" },
  ],
};
const isShow = ref(false)
const isleft = ref(false)
let { ruleForm } = toRefs(state);
const store = useMain();
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      axios.get('/login', {
        params: {
          pwd: ruleForm.value.password,
          userName: ruleForm.value.username,
        }
      })
        .then((response: AxiosResponse<any>) => {
          if (response.data != '') {
            store.setData(response.data);
            console.log(ruleForm.value.username);
            // 保留当前页，页面跳转至 /home 页
            router.push("/index");
          };
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    } else {
      console.log('error submit!')
    }
  })



};
//重置
const resetForm = () => {
  ruleForm.value.username = "",
    ruleForm.value.password = ""
};
const fotget = () => {
  isShow.value = !isShow.value;
  isleft.value=false;
}
const tologin = () => {
  isleft.value = true;
  isShow.value = false;
}
</script>

<style lang="scss">
body {
  margin: 0px;
  overflow: hidden;
}
[v-cloak]{
  display: none;
}
.login-box {
  width: 100%;
  height: 100vh;
  background-image: url(@/assets/login.png);
  text-align: center;
  padding: 1px;
  user-select: none;

  .demo-ruleForm {
    width: 1000px;
    height: 500px;
    margin: 200px auto;
    position: relative;
    background-color: #fde882;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    
  }
  .fadeform-enter-from{
    opacity: 0;
  }

  .fadeform-enter-active{
    transition: opacity 2s ease-out;
  }

  .fadeform-enter-to{
    opacity: 1;
  }
  .fadeform1-enter-from{
    opacity: 0;
  }

  .fadeform1-enter-active{
    transition: opacity 3s ease-out;
  }

  .fadeform1-enter-to{
    opacity: 1;
  }
  .fade1-enter-from{
    opacity: 0;
  }

  .fade1-enter-active{
    transition: opacity 2s ease-out;
    transition-delay: 0.5s;
  }

  .fade1-enter-to{
    opacity: 1;
  }
  .fade-enter-from{
    opacity: 0;
  }

  .fade-enter-active{
    transition: opacity 2s ease-out;
    transition-delay: 0.5s;
  }

  .fade-enter-to{
    opacity: 1;
  }
  .login-btn {
    width: 100px;
  }

  h2 {
    margin-bottom: 20px;
  }

  .textLeft {
    width: 500px;
    height: 500px;
    background-color: aliceblue;
  }

  .loginForm {
    width: 500px;
    height: 500px;
    background-color: aliceblue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .el-form-item {
      width: 400px;
      height: 50px;
      align-items: center;

      .el-input {
        height: 45px;
      }

    }
  }

  .textRight {
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      font-family: "楷体";
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 50px;
    }

    input {
      width: 130px;
      height: 40px;
      border-radius: 50px;
      border: none;
      background-color: #044772;
      color: blanchedalmond;
      font-size: 18px;
      font-weight: 900;
    }


  }

  .class1 {
    transform: translateX(500px);
    transition-duration: 2s;
    transform: translateZ(1);
  }

  .class2 {
    transform: translateX(-500px);
    transition-duration: 2s;
    transform: translateZ(2);
  }
  .class3 {
    transform: translateX(-1px);
    transition-duration: 2s;
    transform: translateZ(2);
  }
  .class4 {
    transform: translateX(1px);
    transition-duration: 2s;
    transform: translateZ(2);
  }
}
</style>
