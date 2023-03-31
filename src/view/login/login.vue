<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm main"
    >
      <h2>目标考核系统</h2>
      <el-form-item label="账号：" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="submitForm((ruleFormRef))"
          >登录
        </el-button>
        <el-button class="login-btn" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import axios from "@/api/axiosInstance";
import type { FormInstance } from 'element-plus'
import { AxiosResponse,AxiosError} from 'axios';
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
let { ruleForm } = toRefs(state);
const store =useMain();
const submitForm =(formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      axios.get('/login',{
      params: {
        pwd: ruleForm.value.password,
        userName: ruleForm.value.username,
      }
    })
  .then((response :AxiosResponse<any>) => {
    if(response.data!=''){
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
  ruleForm.value.username="",
  ruleForm.value.password=""
};
</script>

<style lang="scss">
body {
  margin: 0px;
  overflow: hidden;
}

.login-box {
  width: 100%;
  height: 100vh;
  background-image: url(@/assets/login.png);
  text-align: center;
  padding: 1px;

  .demo-ruleForm {
    width: 500px;
    margin: 200px auto;
    background: #ffffff;
    padding: 40px;
    border-radius: 5px;
  }

  .login-btn {
    width: 48%;
  }

  h2 {
    margin-bottom: 20px;
  }

  .main {
    position: relative;
    padding: 25px;
    padding-left: 10px;
    background-color: rgba(236, 240, 243, 0.8);
    border-radius: 20px;
    overflow: hidden;
  }
}
</style>
