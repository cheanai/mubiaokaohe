<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/index' }">产品列表</el-breadcrumb-item>
            <el-breadcrumb-item>iPhone 13 Pro Max</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="butten_div">
        <el-button type="primary" plain @click="dialogTableVisible = true">新增</el-button>
        <el-dialog v-model="dialogTableVisible" title="Shipping address">
            <!-- <el-table :data="gridData">
                <el-table-column property="date" label="Date" width="150" />
                <el-table-column property="name" label="Name" width="200" />
                <el-table-column property="address" label="Address" />
            </el-table> -->
            <two></tw
            o>
        </el-dialog>
        <el-select v-model="value" class="m-2" placeholder="Select">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-input v-model="input2" class="w-50 m-2" placeholder="Type something" :prefix-icon="Search" />
        <el-button plain>搜索</el-button>
    </div>
    <div class="table_div">
        <el-table border :data="tableData">
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="gender" label="性别"></el-table-column>
            <el-table-column prop="college" label="学院"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="opeation" label="操作"></el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import two from "@/view/dialog/two.vue";
const dialogTableVisible = ref(false);
const gridData = [
  {
    date: '2016-05-02',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-04',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-01',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-03',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
]
const input2 = ref("");
const tableData = [
    { id: 1, name: "张三", age: 18, gender: "男" },
    { id: 2, name: "李四", age: 20, gender: "女" },
    { id: 3, name: "王五", age: 22, gender: "男" },
    { id: 4, name: "赵六", age: 24, gender: "女" },
];
const value = "选择学院";
const options = [
    {
        value: "Option1",
        label: "Option1",
    },
    {
        value: "Option2",
        label: "Option2",
    },
    {
        value: "Option3",
        label: "Option3",
    },
    {
        value: "Option4",
        label: "Option4",
    },
    {
        value: "Option5",
        label: "Option5",
    },
];
</script>

<style scoped>
.butten_div {
    padding-top: 20px;
    display: inline-flex;
}

.w-50 {
    padding-left: 10px;
    padding-right: 10px;
}

.el-button {
    margin-right: 10px;
}

.table_div {
    margin-top: 20px;
}
</style>
