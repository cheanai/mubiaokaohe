<template>
    <div class="body_div">
        <div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>师资管理</el-breadcrumb-item>
                <el-breadcrumb-item>教师培养与引进</el-breadcrumb-item>
                <el-breadcrumb-item>宣传教育培养</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script setup lang="ts">
import { useMain } from "@/store/home";
import axios from "@/api/axiosInstance";
import { AxiosResponse, AxiosError } from "axios";
const store = useMain();
store.routerPath='/index/one'
</script>

<style scoped>
.body_div {
    margin: 20px;
}

</style>
