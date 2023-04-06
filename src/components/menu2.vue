<template>
    <el-aside width="250px">
      <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
        :default-active="store.routerPath" text-color="#fff" :router="true">
        <el-menu-item index="/index2/fifteen">
          <el-icon>
            <Histogram />
          </el-icon>
          <span>指标审核</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </template>
  <script setup>
  import { useMain } from "@/store/home";
  const store = useMain();
  </script>
  <style lang="scss" scoped>
  .el-aside {
    .el-menu {
      height: calc(100vh - 60px);
    }
  }
  
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  </style>
    