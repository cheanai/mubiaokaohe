<template>
  <el-header>
    <el-row :gutter="20">
      <el-col :span="4"><img src="../assets/logo.png" class="logo" /></el-col>
      <el-col :span="16"><h2>后台管理系统</h2></el-col>
      <el-col :span="4"><span class="quit-login">退出登录</span></el-col>
    </el-row>
  </el-header>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.el-header {
  height: 80px;
  background: #666;
  .logo {
    height: 80px;
  }

  h2,
  .quit-login {
    text-align: center;
    height: 80px;
    line-height: 80px;
    color: #fff;
  }
}
</style>
