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
        <div class="butten_div">
            <el-button type="primary" plain @click="dialogTableVisible = true">新增</el-button>
            <el-dialog v-model="dialogTableVisible" :close-on-click-modal="false" title="新增数据" @closed="oncolsed">
                <DialogForm @FatherClick="Click" v-model:info="info" v-if="dialogTableVisible"></DialogForm>
            </el-dialog>
            <el-select v-model="value" class="m-2" placeholder="选择状态" filterable :filter-method="dataFilter">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-input v-model="input" class="w-50 m-2" placeholder="搜索主题" :prefix-icon="Search" />
            <el-button plain @Click="searchdata">搜索</el-button>
        </div>
        <div class="table_div">
            <el-table border :data="getTableData" stripe header-cell-class-name="my-header-cell-class"
                row-class-name="table-row" v-loading="loading">
                <el-table-column prop="college" label="二级学院"></el-table-column>
                <el-table-column prop="secondaryIndicators" label="二级指标"></el-table-column>
                <el-table-column prop="tertiaryIndicators" label="三级指标"></el-table-column>
                <el-table-column prop="taskVolume" label="任务量"></el-table-column>
                <el-table-column prop="date" label="时间"><template #default="scope">
                        <div style="display: flex; align-items: center" v-if=scope.row.date>
                            <el-icon>
                                <timer />
                            </el-icon>
                            <span style="margin-left: 10px">{{ scope.row.date }}</span>
                        </div>
                    </template></el-table-column>
                <el-table-column prop="state" label="状态"><template #default="scope">
                        <div v-if=scope.row.state>
                            <span style="color:skyblue;" v-if="scope.row.state === '未审核'"><b>{{ scope.row.state
                            }}</b></span>
                            <span style="color:crimson;" v-if="scope.row.state === '未通过'"><b>{{ scope.row.state
                            }}</b></span>
                            <span style="color:green;" v-if="scope.row.state === '已通过'"><b>{{ scope.row.state }}</b></span>
                        </div>
                    </template></el-table-column>
                <el-table-column prop="opeation" label="操作"><template v-slot="scope">
                        <el-button type="primary" plain
                            v-if="scope.row.college && scope.row.state == '未审核'"
                            @Click="tongguo(scope.row.id)">通过</el-button>
                        <el-button type="primary" plain
                            v-if="scope.row.college && scope.row.state == '未审核'"
                            @Click="dahui(scope.row.id)">打回</el-button>
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
import DialogForm from "@/view/dialog/dialog.vue";
import { useMain } from "@/store/home";
import { ElMessage } from 'element-plus'
import axios from "@/api/axiosInstance";
import { AxiosResponse, AxiosError } from "axios";
const store = useMain();
if (store.department == '人事处管理员') {
    store.routerPath = '/index1/one1'
} else {
    store.routerPath = '/index/one'
}
const dialogTableVisible = ref(false);
const input = ref("");
const searchdata = () => {
    console.log(input.value)
    console.log(value.value)
    if (value.value == "") {
        console.log("--------")
        axios.get("/selectTaskTableByCollege", {
            params: {
                college: input.value,
            }
        }).then((response: AxiosResponse<any>) => {
            tableData.value = response.data;
            triggerRef(tableData);
            console.log(tableData.value);
        })
    } else {
        axios.get("/selectTaskTableByCollegeAndState", {
            params: {
                state: value.value,
                college: input.value
            }
        }).then((response: AxiosResponse<any>) => {
            tableData.value = response.data;
            triggerRef(tableData);
            console.log(tableData.value);
        })
    }
}
let tableData = ref([]);
const loading = ref(false)
let info = ref();
const oncolsed = () => {
    info.value = null;
    console.log(info.value)
}
const open1 = () => {
  ElMessage({
    message: '审核成功',
    type: 'success',
  })
}
const tongguo = (id: number) => {
    console.log(id);
    axios.get("/updateTaskTableById", {
        params: {
            id: id,
            state: '已通过'
        }
    }).then((response) => {
        console.log(response.data);
        select();
        open1();
    })
}
const dahui = (id: number) => {
    console.log(id);
    axios.get("/updateTaskTableById", {
        params: {
            id: id,
            state: '未通过'
        }
    }).then((response) => {
        console.log(response.data);
        select();
        open1();
    })
}
const select = () => {
    loading.value = !loading.value;
    console.log(loading.value)
        axios
            .get("/selectAllTaskTable")
            .then((response: AxiosResponse<any>) => {
                tableData.value = response.data;
                triggerRef(tableData);
                loading.value = !loading.value;
                console.log(loading.value)
                console.log(tableData.value);
            })
            .catch((error: AxiosError) => {
                console.log(error);
            });
}
select();
const value = ref("");
const options = [
    {
        value: "未审核",
        label: "未审核",
    },
    {
        value: "已通过",
        label: "已通过",
    },
    {
        value: "未通过",
        label: "未通过",
    },
    {
        value: "",
        label: "所有状态",
    }
];
const dataFilter = () => {
    if (input.value == "") {
        if (value.value == "") {
            select();
            return
        }
        axios.get("/selectTaskTableByState", {
            params: {
                state: value.value
            }
        }).then((response: AxiosResponse<any>) => {
            tableData.value = response.data;
            triggerRef(tableData);
            console.log(tableData.value);
        })
    } else {
        searchdata();
    }

}
const Click = () => {
    dialogTableVisible.value = false;
    console.log(dialogTableVisible);
    select();
};
const pageSize = 10; // 每页显示的行数
const currentPage = ref(1); // 当前页码
const total = computed(() => tableData.value.length); // 总行数
const handleCurrentChange = (newPage: number) => {
    currentPage.value = newPage;
};
const getTableData = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    let data = tableData.value.slice(start, end);
    // 如果当前页显示的数据行数小于每页显示的行数，就添加空行
    while (data.length < pageSize) {
        data.push({});
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
