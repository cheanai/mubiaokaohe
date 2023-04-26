<template>
  <div class="login-box">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="82px" class="demo-ruleForm">
      <div class="loginForm" v-bind:class="{ class1: isShow, class3: isleft }">
        <Transition name="fadeform1">
          <div v-if="!isShow" class="showdiv">
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
          <div v-if="isShow" class="showdiv">
            <div v-if="forgetShow">
              <h2>忘记密码</h2>
              <el-form-item label="邮箱：" prop="email">
                <el-input v-model="ruleForm.email" autocomplete="off" />
              </el-form-item>
              <div class="Captcha">
                <el-form-item label="验证码:" prop="Captcha">
                  <el-input v-model="ruleForm.Captcha" autocomplete="off" show-password="true" width="100px" />
                  <el-button type="primary" plain @click="sendEmail((ruleFormRef))">{{ buttonText }}</el-button>
                </el-form-item>
              </div>
              <div>
                <el-button type="primary" class="login-btn" @click="submitForm1((ruleFormRef))">登录
                </el-button>
                <el-button class="login-btn" @click="resetForm">重置</el-button>
              </div>
            </div>
            <div v-if="!forgetShow">
              <h2>请输入新的密码</h2>
              <el-form-item label="密码：" prop="newpassword">
                <el-input v-model="ruleForm.newpassword" autocomplete="off" show-password="true" />
              </el-form-item>
              <el-form-item label="确认密码:" prop="repassword">
                <el-input v-model="ruleForm.repassword" autocomplete="off" show-password="true" />
              </el-form-item>
              <div>
                <el-button type="primary" class="login-btn" @click="submitForm2((ruleFormRef))">登录
                </el-button>
                <el-button class="login-btn" @click="resetForm">重置</el-button>
              </div>
            </div>
          </div>

        </Transition>
      </div>
      <div class="textRight" v-bind:class="{ class2: isShow, class4: isleft }">
        <Transition name="fade" v-cloak>
          <div v-if="!isShow" class="showdiv">
            <p>欢迎登录目标考核系统</p>
            <p>请输入账号和密码</p>
            <input @click="fotget" type="button" value="忘记密码" />
          </div>
        </Transition>
        <Transition name="fade1">
          <div v-if="isShow" class="showdiv">
            <p>忘记密码了？</p>
            <p>请输入邮箱</p>
            <input @click="fotget" type="button" value="去登陆" />
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
import { ElMessage } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const state = reactive({
  ruleForm: {
    username: "",
    password: "",
    email: "",
    Captcha: "",
    newpassword: "",
    repassword: "",
  },
});
const router = useRouter();
const checkpwd = (rule: any, value: any, callback: any): void => {
  if (!value) {
    return callback();
  }

  const istrue = ruleForm.value.newpassword == ruleForm.value.repassword;
  if (istrue) {
    return callback();
  }
  callback(new Error('确认密码不一致'));
};
const rules = {
  username: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 3, max: 10, message: "账号的长度在3-10之间", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 10, message: "密码的长度在3-10之间", trigger: "blur" },
  ],
  Captcha: [
    { required: true, message: "请输入验证码", trigger: "blur" },
    { min: 4, max: 4, message: "验证码长度为4位", trigger: "blur" },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
  newpassword: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 10, message: "密码的长度在3-10之间", trigger: "blur" },
  ],
  repassword: [
    { required: true, message: "请输入确认密码", trigger: "blur" },
    { validator: checkpwd, message: "确认密码不一致", trigger: "blur" },
  ],

};
const isShow = ref(false)
const isleft = ref(false)
const forgetShow = ref(true)
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
            if (store.department === '人事处管理员') {
              router.push("/index1");
            } else if (store.department === '发展规划处') {
              router.push("/index2");
            } else {
              // 保留当前页，页面跳转至 /home 页
              router.push("/index");
            }
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
  isleft.value = !isShow.value;

}
const open1 = (msg: any) => {
  ElMessage({
    message: msg,
    type: 'success',
  })
}
const open2 = (msg: any) => {
  ElMessage.error(msg)
}
let timer: any = null;
let countdown = 60;
let buttonText = ref('发送');
const sendEmail = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validateField("email", (errorMessage) => {
    if (errorMessage) {
      if (timer) {
        return;
      }
      axios.get("/sendResetPasswordEmail", {
        params: {
          emailAddress: ruleForm.value.email
        }
      }).then((Response) => {
        if (Response.data == "a") {
          open2("用户不存在");
        } else if (Response.data == "b") {
          open1("邮件已发送，请检查您的邮箱。");
          buttonText.value = countdown.toString() + " s";
          timer = setInterval(() => {
            countdown -= 1;
            buttonText.value = countdown.toString() + " s";
            if (countdown <= 0) {
              clearInterval(timer);
              timer = null;
              buttonText.value = '发送';
              countdown = 60;
            }
          }, 1000);
        } else {
          open2("发送邮件失败，请稍后重试。");
        }

      }).catch((error) => {
        open1(error.data)
      });

    }
  })
}
const submitForm1 = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      axios.get("/verifyResetCode", {
        params: {
          emailAddress: ruleForm.value.email,
          code: ruleForm.value.Captcha
        }
      }).then((Response) => {
        if (Response.data) {
          forgetShow.value = false;
          open1("验证成功");
        } else {
          open2("验证失败");
        }
      })
    }
  })
}
const submitForm2 = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      axios.get("/updatePassword", {
        params: {
          email: ruleForm.value.email,
          newPassword: ruleForm.value.newpassword
        }
      }).then((Response) => {
        if (Response.data) {
          open1("密码更改成功");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          open2("密码更新失败");
        }
      })
    }
  })
}
</script>

<style lang="scss">
body {
  margin: 0px;
  overflow: hidden;

  [v-cloak] {
    display: none !important;
  }
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

  .fadeform-enter-from {
    opacity: 0;
  }

  .fadeform-enter-active {
    transition: opacity 2s ease-out;
  }

  .fadeform-enter-to {
    opacity: 1;
  }

  .fadeform1-enter-from {
    opacity: 0;
  }

  .fadeform1-enter-active {
    transition: opacity 2s ease-out;
  }

  .fadeform1-enter-to {
    opacity: 1;
  }

  .fade1-enter-from {
    opacity: 0;
  }

  .fade1-enter-active {
    transition: opacity 2s ease-out;
    transition-delay: 1s;
  }

  .fade1-enter-to {
    opacity: 1;
  }

  .fade-enter-from {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity 2s ease-out;
    transition-delay: 1s;
  }

  .fade-enter-to {
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

    .el-form-item {
      width: 400px;
      height: 50px;
      align-items: center;

      .el-input {
        height: 45px;
      }


    }
  }

  .Captcha {
    .el-input {
      width: 248px;
    }

    .el-button {
      height: 45px;
      width: 70px;
    }
  }

  .textRight {
    width: 500px;

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

  .showdiv {
    width: 500px;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .class1 {
    transform: translateX(500px);
    transition-duration: 2s;
  }

  .class2 {
    transform: translateX(-500px);
    transition-duration: 2s;
  }

  .class3 {
    transform: translateX(-1px);
    transition-duration: 2s;
  }

  .class4 {
    transform: translateX(1px);
    transition-duration: 2s;
  }
}
</style>
