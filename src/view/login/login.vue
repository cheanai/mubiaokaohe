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
      <h2>后台管理系统</h2>
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
        <el-button
          type="primary"
          class="login-btn"
          @click="submitForm()"
          >登录
        </el-button>
        <el-button class="login-btn" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs} from "vue";
import { LoginData } from "@/type/login";
import { useRouter } from "vue-router";


export default defineComponent({
    
  setup() {
    const data = reactive(new LoginData());
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
    const submitForm =()=>{
        // 保留当前页，页面跳转至 /home 页
        router.push("/index");
    };
    //重置
    const resetForm = () => {
      data.ruleForm.username = "";
      data.ruleForm.password = "";
    };

    return {
      ...toRefs(data),
      rules,
      resetForm,
      submitForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100vh;
  background-color: #ecf0f3;
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
    background-color: #ecf0f3;
    box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
    border-radius: 20px;
    overflow: hidden;
  }
}
</style>
