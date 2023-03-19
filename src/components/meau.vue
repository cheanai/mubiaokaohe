<template>
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
</template>
<script setup>
</script>
<style lang="scss" scoped>
.el-aside{
    .el-menu{
      height: calc(100vh - 80px);
    }
  }
</style>