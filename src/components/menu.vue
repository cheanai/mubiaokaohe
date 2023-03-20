<template>
  <el-aside width="250px">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      :default-active="$router.path"
      text-color="#fff"
      :router="true"
    >
      <el-sub-menu>
        <template #title>
          <el-icon><Avatar /></el-icon>
          <span>师资管理</span>
        </template>
        <el-sub-menu :index="1">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>教师培养与引进</span>
          </template>
          <el-menu-item index="/index/two">
            <el-icon>
              <location />
            </el-icon>
            <span>宣传教育培养</span>
          </el-menu-item>
          <el-menu-item :index="1_2">
            <el-icon>
              <location />
            </el-icon>
            <span>引进或培养博士</span>
          </el-menu-item>
          <el-menu-item :index="1_3">
            <el-icon>
              <location />
            </el-icon>
            <span>报考博士数</span>
          </el-menu-item>
          <el-menu-item :index="1_4">
            <el-icon>
              <location />
            </el-icon>
            <span>教师交流培训</span>
          </el-menu-item>
          <el-menu-item :index="1_5">
            <el-icon>
              <location />
            </el-icon>
            <span>访学单科进修</span>
          </el-menu-item>
          <el-menu-item :index="1_6">
            <el-icon>
              <location />
            </el-icon>
            <span>公需课培训</span>
          </el-menu-item>
          <el-menu-item :index="1_7">
            <el-icon>
              <location />
            </el-icon>
            <span>双师型教师</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu :index="2">
          <template #title>
            <el-icon><TrendCharts /></el-icon>
            <span>高层次人才队伍建设</span>
          </template>
          <el-menu-item :index="2_1">
            <el-icon>
              <location />
            </el-icon>
            <span>新增教授</span>
          </el-menu-item>
          <el-menu-item :index="2_1">
            <el-icon>
              <location />
            </el-icon>
            <span>新增副教授</span>
          </el-menu-item>
          <el-menu-item :index="2_1">
            <el-icon>
              <location />
            </el-icon>
            <span>新增厅局级称号</span>
          </el-menu-item>
          <el-menu-item :index="2_1">
            <el-icon>
              <location />
            </el-icon>
            <span>人才称号申报</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu :index="3">
          <template #title>
            <el-icon>
              <location />
            </el-icon>
            <span>师资国际化</span>
          </template>
          <el-menu-item :index="3_1">
            <el-icon>
              <location />
            </el-icon>
            <span>聘请外教外文授课</span>
          </el-menu-item>
          <el-menu-item :index="3_2">
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
<script setup></script>
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
