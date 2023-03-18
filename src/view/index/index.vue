<template>
    <div class="home">
      <el-container>
        <el-header>
          <el-row :gutter="20">
            <el-col :span="4"><img src="../assets/logo.png" class="logo"/></el-col>
            <el-col :span="16"><h2>后台管理系统</h2></el-col>
            <el-col :span="4"><span class="quit-login">退出登录</span></el-col>
          </el-row>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <el-menu
                active-text-color="#ffd04b"
                background-color="#545c64"
                class="el-menu-vertical-demo"
                default-active="2"
                text-color="#fff"
            >
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><location /></el-icon>
                  <span>师资管理</span>
                </template>
                <el-menu-item>
                  <el-icon><location /></el-icon>
                  <span>师资管理</span>
                </el-menu-item>
                <el-menu-item>
                  <el-icon><location /></el-icon>
                  <span>师资管理</span>
                </el-menu-item>
              </el-sub-menu>
            </el-menu>
          </el-aside>
          <el-main>Main</el-main>
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script lang="ts">
  import {defineComponent} from 'vue';
  
  export default defineComponent({
    name: 'HomeView',
    components: {},
  });
  </script>
  
  <style lang="scss" scoped>
  
  .el-header {
    height: 80px;
    background: #666;
    .logo {
      height: 80px;
    }
  
    h2, .quit-login {
      text-align: center;
      height: 80px;
      line-height: 80px;
      color: #fff;
    }
  }
  
  .el-aside{
    .el-menu{
      height: calc(100vh - 80px);
    }
  }
  </style>
  
  