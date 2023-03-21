<template>
<div class="home">
  <headTitle></headTitle>
  <el-container>
    <el-container>
      <menuLift></menuLift>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script lang="ts" setup>
import menuLift from "@/components/menu.vue";
import headTitle from "@/components/headTitle.vue";
</script>

<style lang="scss">
.el-main{
  padding: 0px;
  background-image: url("@/assets/index.png");
}
body {
user-select: none;
margin: 0px;
padding: 0px;
}
</style>
