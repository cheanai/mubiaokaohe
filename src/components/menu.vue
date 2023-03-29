<template>
  <el-aside width="250px">
    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
      :default-active="store.routerPath" text-color="#fff" :router="true">
      <el-sub-menu :index="String(111)">
        <template #title>
          <el-icon>
            <Avatar />
          </el-icon>
          <span>师资管理</span>
        </template>
        <el-menu-item index="/index/main1">
          <el-icon>
            <Histogram />
          </el-icon>
          <span>师资考核一览</span>
        </el-menu-item>
        <el-sub-menu :index="String(1)">
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>教师培养与引进</span>
          </template>
          <el-menu-item index="/index/one">
            <el-icon>
              <location />
            </el-icon>
            <span>宣传教育培养</span>
          </el-menu-item>
          <el-menu-item index="/index/two">
            <el-icon>
              <location />
            </el-icon>
            <span>引进或培养博士</span>
          </el-menu-item>
          <el-menu-item index="/index/three">
            <el-icon>
              <location />
            </el-icon>
            <span>报考博士数</span>
          </el-menu-item>
          <el-menu-item index="/index/four">
            <el-icon>
              <location />
            </el-icon>
            <span>教师交流培训</span>
          </el-menu-item>
          <el-menu-item index="/index/five">
            <el-icon>
              <location />
            </el-icon>
            <span>访学单科进修</span>
          </el-menu-item>
          <el-menu-item index="/index/six">
            <el-icon>
              <location />
            </el-icon>
            <span>公需课培训</span>
          </el-menu-item>
          <el-menu-item index="/index/seven">
            <el-icon>
              <location />
            </el-icon>
            <span>双师型教师</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu :index="String(2)">
          <template #title>
            <el-icon>
              <TrendCharts />
            </el-icon>
            <span>高层次人才队伍建设</span>
          </template>
          <el-menu-item index="/index/eight">
            <el-icon>
              <location />
            </el-icon>
            <span>新增教授</span>
          </el-menu-item>
          <el-menu-item index="/index/nine">
            <el-icon>
              <location />
            </el-icon>
            <span>新增副教授</span>
          </el-menu-item>
          <el-menu-item index="/index/ten">
            <el-icon>
              <location />
            </el-icon>
            <span>新增厅局级称号</span>
          </el-menu-item>
          <el-menu-item index="/index/eleven">
            <el-icon>
              <location />
            </el-icon>
            <span>人才称号申报</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu :index="String(3)">
          <template #title>
            <el-icon>
              <HelpFilled />
            </el-icon>
            <span>师资国际化</span>
          </template>
          <el-menu-item index="/index/twelve">
            <el-icon>
              <location />
            </el-icon>
            <span>聘请外教外文授课</span>
          </el-menu-item>
          <el-menu-item index="/index/thirteen">
            <el-icon>
              <location />
            </el-icon>
            <span>外教工作量</span>
          </el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
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
    height: calc(100vh - 80px);
  }
}

::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>
