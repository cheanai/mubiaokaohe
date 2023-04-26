<template>
  <el-header>
    <div class="header">
      <div class="logo_div left"><img src="@/assets/logo.png" class="logo" />
        <h2>目标考核系统</h2>
      </div>
      <div class="logOff_div right"><span id="huan">欢迎{{ store.name }}</span>
        <div class="tou">

          <el-dropdown :hide-on-click="false">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @Click="drawer = true">查看通知</el-dropdown-item>
                <el-dropdown-item @Click="logoff">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-drawer v-model="drawer" title="I am the title" :with-header="false">
            <span>Hi there!</span>
          </el-drawer>
        </div>
      </div>
    </div>
  </el-header>
</template>

<script  setup>
import { useMain } from '@/store/home'
const store = useMain();
const drawer = ref(false)
const logoff = () => {
  store.$reset();
  window.location.reload();
}
</script>

<style lang="scss" scoped>
* {
  padding: 0px;
}

#huan {
  padding-top: 10px;
  font-family: "黑体";
  font-weight: bold;
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
  height: 60px;
}

.logo_div {
  width: 249px;
  height: 60px;
}

.el-header {
  height: 60px;
  background-image: url("@/assets/head.jpg");

  .logo {
    height: 50px;
  }

  h2,
  .quit-login {
    text-align: center;
    height: 60px;
    line-height: 60px;
    color: #fff;
    margin-left: 20px;
  }

  .tou {
    margin-left: 20px;
    margin-top: 10px;
  }
}
</style>
