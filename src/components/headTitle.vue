<template>
  <el-header>
    <div class="header">
      <div class="logo_div left"><img src="@/assets/logo.png" class="logo" />
        <h2>目标考核系统</h2>
      </div>
      <div class="logOff_div right"><span>欢迎{{store.name}}</span><span class="quit-login"><RouterLink to="/" @Click="logoff">退出登录</RouterLink></span></div>
    </div>
  </el-header>
</template>

<script  setup>
import { useMain } from '@/store/home'
const store =useMain();
const logoff=()=>{
  store.$reset();
}
</script>

<style lang="scss" scoped>
* {
  padding: 0px;
}
a{
color: #fff;
text-decoration: none

}

.left {
  background-color: #545c64;
  float: left;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.right {
  float: right;
  padding-right: 50px;
  display: flex;
  align-items: center;
}

.header {
  height: 80px;
}

.logo_div {
  width: 249px;
  height: 80px;
}

.el-header {
  height: 80px;
  background-image:url("@/assets/head.jpg");

  .logo {
    height: 50px;
  }

  h2,
  .quit-login {
    text-align: center;
    height: 80px;
    line-height: 80px;
    color: #fff;
    margin-left: 20px;
  }
}</style>
