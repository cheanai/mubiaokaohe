<template>
    <div class="body_div">
        <div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>师资管理</el-breadcrumb-item>
                <el-breadcrumb-item>师资国际化</el-breadcrumb-item>
                <el-breadcrumb-item>外教工作量</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="butten_div">
            <el-button type="primary" plain @click="dialogTableVisible = true">新增</el-button>
            <el-dialog v-model="dialogTableVisible" :close-on-click-modal="false" title="新增数据" @closed="oncolsed" width="800px">
                <DialogForm @FatherClick="Click" v-model:info="info" v-if="dialogTableVisible">
                </DialogForm>
            </el-dialog>
            <el-select v-model="value" class="m-2" placeholder="选择状态" filterable :filter-method="dataFilter">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-input v-model="input" class="w-50 m-2" placeholder="搜索二级学院" :prefix-icon="Search" />
            <el-button plain @Click="searchdata">搜索</el-button>
        </div>
        <div class="table_div">
            <el-table border :data="getTableData" stripe header-cell-class-name="my-header-cell-class"
                row-class-name="table-row" v-loading="loading">
                <el-table-column prop="college" label="二级学院" width="200px"></el-table-column>
                <el-table-column prop="educationTraining" label="宣传教育培养"></el-table-column>
                <el-table-column prop="introductionTrainingDoctors" label="引进或培养博士"></el-table-column>
                <el-table-column prop="doctoralApplicants" label="报考博士数"></el-table-column>
                <el-table-column prop="teacherExchangeTraining" label="教师交流培训"></el-table-column>
                <el-table-column prop="visitingStudy" label="访学单科进修"></el-table-column>
                <el-table-column prop="publicClassTraining" label="公需课培训"></el-table-column>
                <el-table-column prop="dualTeachers" label="双师型教师"></el-table-column>
                <el-table-column prop="newProfessors" label="新增教授"></el-table-column>
                <el-table-column prop="newAssociateProfessor" label="新增副教授"></el-table-column>
                <el-table-column prop="newTitles" label="新增厅局级称号"></el-table-column>
                <el-table-column prop="talentTitleDeclaration" label="人才称号申报"></el-table-column>
                <el-table-column prop="hireForeignTeachers" label="聘请外教外文授课"></el-table-column>
                <el-table-column prop="foreignTeacherWorkload" label="外教工作量"></el-table-column>
                <el-table-column prop="date" label="时间" width="120px"></el-table-column>
                <el-table-column prop="state" label="状态" width="120px"><template #default="scope">
                        <div v-if=scope.row.state>
                            <span style="color:skyblue;" v-if="scope.row.state === '未审核'"><b>{{ scope.row.state
                            }}</b></span>
                            <span style="color:crimson;" v-if="scope.row.state === '未通过'"><b>{{ scope.row.state
                            }}</b></span>
                            <span style="color:green;" v-if="scope.row.state === '已通过'"><b>{{ scope.row.state }}</b></span>
                        </div>
                    </template></el-table-column>
                <el-table-column prop="opeation" label="操作" width="100px"><template v-slot="scope">
                        <el-button type="primary" plain v-if="scope.row.college" @Click="edit(scope.row.id)">修改</el-button>
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
import DialogForm from "@/view/dialog/dialogthirteen.vue";
import { useMain } from "@/store/home";
import axios from "@/api/axiosInstance";
import { AxiosResponse, AxiosError } from "axios";
const store = useMain();
store.routerPath = '/index1/fourteen'
const dialogTableVisible = ref(false);
const input = ref("");
const searchdata = () => {
    console.log(input.value)
    console.log(value.value)
    if (value.value == "") {
        console.log("--------")
        axios.get("/selectForeignTeacherWorkloadByTeacherName", {
            params: {
                teacherName: input.value,
                department: store.department
            }
        }).then((response: AxiosResponse<any>) => {
            tableData.value = response.data;
            triggerRef(tableData);
            console.log(tableData.value);
        })
    } else {
        axios.get("/selectForeignTeacherWorkloadByNameAndState", {
            params: {
                state: value.value,
                teacherName: input.value,
                department: store.department
            }
        }).then((response: AxiosResponse<any>) => {
            tableData.value = response.data;
            triggerRef(tableData);
            console.log(tableData.value);
        })
    }
}
let tableData = ref([]);
const loading = ref(false);
let info = ref();
const oncolsed = () => {
    info.value = null;
    console.log(info.value)
}
const edit = (id: number) => {
    console.log(id);
    axios.get("/selectForeignTeacherWorkloadById", {
        params: {
            id: id
        }
    }).then((response) => {
        console.log(response.data)
        info.value = response.data;
        dialogTableVisible.value = true;
    })
}
const select = () => {
    loading.value = !loading.value;
    axios
        .get("/selectTargetAssessment")
        .then((response: AxiosResponse<any>) => {
            tableData.value = response.data;
            triggerRef(tableData);
            loading.value = !loading.value;
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
        } loading.value = !loading.value;
        axios.get("/selectForeignTeacherWorkloadByState", {
            params: {
                state: value.value,
                department: store.department
            }
        }).then((response: AxiosResponse<any>) => {
            tableData.value = response.data;
            triggerRef(tableData);
            loading.value = !loading.value;
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
