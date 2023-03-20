<template>
<div class="home">
  <headTitle></headTitle>
  <el-container>
    <el-container>
      <menuLift></menuLift>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</div>
</template>

<script lang="ts" setup>
import menuLift from "@/components/menu.vue";
import headTitle from "@/components/headTitle.vue";
</script>

<style lang="scss">
body {
margin: 0px;
}
</style>
