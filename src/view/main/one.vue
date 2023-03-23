<template>
    <div class="body_div">
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
                <two></two>
            </el-dialog>
            <el-select v-model="value" class="m-2" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-input v-model="input2" class="w-50 m-2" placeholder="Type something" :prefix-icon="Search" />
            <el-button plain>搜索</el-button>
        </div>
        <div class="table_div">
            <el-table border :data="getTableData" stripe header-cell-class-name="my-header-cell-class"
                row-class-name="table-row">
                <el-table-column prop="Title" label="主题"></el-table-column>
                <el-table-column prop="Type" label="类型"></el-table-column>
                <el-table-column prop="Location" label="地点"></el-table-column>
                <el-table-column prop="Time" label="开始时间"></el-table-column>
                <el-table-column prop="Participants" label="参与学院"></el-table-column>
                <el-table-column prop="state" label="状态"></el-table-column>
                <el-table-column prop="opeation" label="操作"><template v-slot="scope">
                        <el-button plain v-if="scope.row.Participants">搜索</el-button>
                        <el-button plain v-if="scope.row.Participants">搜索</el-button>
                    </template></el-table-column>
            </el-table>

        </div>
        <div class="pagination">
            <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="currentPage"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import two from "@/view/dialog/dialog.vue";
import { useMain } from '@/store/home'
import axios from "@/api/axiosInstance";
import { AxiosResponse,AxiosError} from 'axios';
const store = useMain();
const dialogTableVisible = ref(false);
const input2 = ref("");
interface education_training_info {
    "Title": string,
    "Time": string,
    "Location": string,
    "Participants": string,
    "Type": string,
    "state": string

}
let tableData: education_training_info[] = [
    {
        "Title": "如何写好简历",
        "Time": "2022-04-15",
        "Location": "A101",
        "Participants": "全体教职工",
        "Type": "内训",
        "state": ""
    },
    {
        "Title": "如何写好简历",
        "Time": "2022-04-15",
        "Location": "A101",
        "Participants": "全体教职工",
        "Type": "内训",
        "state": ""
    },
    {
        "Title": "如何写好简历",
        "Time": "2022-04-15",
        "Location": "A101",
        "Participants": "全体教职工",
        "Type": "内训",
        "state": ""
    }
];
axios.get('/selectEducationTraining')
    .then((response: AxiosResponse<any>) => {
        if (response.data != '') {
            console.log(tableData);
            console.log(response.data);
            tableData=response.data;
            console.log(tableData)
        };
    })
    .catch((error: AxiosError) => {
        console.log(error);
    });
const value = "选择状态";
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
const pageSize = 10; // 每页显示的行数
const currentPage = ref(1); // 当前页码
const total = computed(() => tableData.length); // 总行数
const handleCurrentChange = (newPage: number) => {
    currentPage.value = newPage;
};
const getTableData = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    let data = tableData.slice(start, end);
    // 如果当前页显示的数据行数小于每页显示的行数，就添加空行
    while (data.length < pageSize) {
        data.push({ id: -1, name: "", age: "", gender: "" });
    }
    return data;
});
</script>

<style scoped>
.body_div {
    margin: 20px;
}

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
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}

/* .my-header-cell-class {
        background-color: red !important;
        color: white !important;
    } */
.table_div ::v-deep(.my-header-cell-class) {
    background-color: #f0efef;
    color: #333;
    font-weight: bold;
}

.pagination {
    position: fixed;
    bottom: 50px;
    left: 125px;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.table_div ::v-deep(.table-row td) {
    height: 50px;
}
</style>
