<template>
    <el-form :model="form" label-width="80px" status-icon :rules="rules" ref="ruleform">
        <div class="selectdiv">
            <el-form-item label="二级学院" prop="name">
                <el-select v-model="value" class="m-2" placeholder="Select">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="二级指标" prop="sex">
                <el-select v-model="value" class="m-2" placeholder="Select">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
        </div>
        <div>
            <el-form-item label="三级指标" prop="title">
                <el-select v-model="value" class="m-2" placeholder="Select">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="申报称号" prop="category">
                <el-date-picker v-model="value3" type="year" placeholder="Pick a year" />
            </el-form-item>
        </div>
        <div class="tablediv">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="二级学院" width="130" />
                <el-table-column prop="date" label="二级指标" width="130" />
                <el-table-column prop="date" label="三级指标" width="130" />
                <el-table-column prop="name" label="任务要求量" width="180">
                    <template  #default="{ row }">
                        <el-input v-model="row.name"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="Address" width="180"/>
            </el-table>
        </div>
        <el-form-item class="buttondiv">
            <el-button sex="primary" @click="submitForm((ruleform))" >提交</el-button>
        </el-form-item>
    </el-form>
</template>
    
<script setup lang="ts">
import axios from '@/api/axiosInstance';
import { useMain } from '@/store/home'
import type { FormInstance } from 'element-plus'
const emits = defineEmits(["FatherClick"]);
const store = useMain();
const ruleform = ref<FormInstance>()
const value = ref('')
const value3 = ref('')
const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]
const tableData = [
    {
        date: '2016-05-03',
        name: '',
        address: 'No. 189, Grove St, Los Angeles',
    },]
const rules = {
    name: [
        { required: true, message: "请输入姓名", trigger: "blur" }
    ],
    sex: [
        { required: true, message: "请选择性别", trigger: "blur" }
    ],
    title: [
        { required: true, message: "请输入职称", trigger: "blur" }
    ],
    category: [
        { required: true, message: "请输入申报称号", trigger: "blur" }
    ],
};
const dataform = reactive({
    form: {
        id: -1,
        name: "",
        sex: "",
        title: "",
        category: new Date(),
        department: store.department
    } as {
        id: number,
        name: string,
        sex: string,
        title: string,
        category: Date,
        department: string
    }
})
let { form } = toRefs(dataform);
const props = defineProps({
    info: {
        type: Object
    }
});
const edit = () => {
    console.log(props.info);
    form.value.name = props.info?.name;
    form.value.sex = props.info?.sex;
    form.value.title = props.info?.title;
    form.value.category = props.info?.category;
    form.value.id = props.info?.id;
}
if (props.info) {
    console.log(props.info);
    edit();
}
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            if (form.value.id != -1) {
                axios.post("/updateTalentTitleApplication", form.value)
                    .then(() => { emits("FatherClick") });
            } else {
                axios.post("/insertTalentTitleApplication", form.value)
                    .then(() => { emits("FatherClick") });
            }

        } else {
            console.log('未通过');
        }
    });
}
</script>
    
<style scoped>
.el-radio {
    height: 32px;

}
.el-form {
    display: flex;
    flex-wrap: wrap;
}
.selectdiv{
    margin-right: 150px;
}
.tablediv{
    margin-bottom: 20px;
}
.buttondiv{
    margin-left: 250px;
}
</style>  