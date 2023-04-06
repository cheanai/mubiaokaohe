<template>
    <el-form :model="form" label-width="80px" status-icon :rules="rules" ref="ruleform">
        <div class="selectdiv">
            <el-form-item label="二级学院" prop="college">
                <el-select v-model="form.college" class="m-2" placeholder="二级学院">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="三级指标" prop="tertiaryIndicators">
                <el-select v-model="form.tertiaryIndicators" class="m-2" placeholder="三级指标">
                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
        </div>
        <div>
            <el-form-item label="二级指标" prop="secondaryIndicators">
                <el-select v-model="form.secondaryIndicators" class="m-2" placeholder="二级指标"
                    @change="selectTertiaryIndicators">
                    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="时间(年)" prop="date">
                <el-date-picker v-model="form.date" type="year" placeholder="时间" style="width:235px" />
            </el-form-item>
        </div>
        <div class="tablediv">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="二级学院" width="160">
                    <template #default="{ row }">
                        {{ college1 }}
                    </template>
                </el-table-column>
                <el-table-column label="二级指标" width="160">
                    <template #default="{ row }">
                        {{ college2 }}
                    </template>
                </el-table-column>
                <el-table-column label="三级指标" width="160">
                    <template #default="{ row }">
                        {{ college3 }}
                    </template>
                </el-table-column>
                <el-table-column prop="taskVolume" label="任务要求量" width="100">
                    <template #default="{ row }">
                        <el-input v-model="taskVolume"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="Address" width="180" />
            </el-table>
        </div>
        <el-form-item class="buttondiv">
            <el-button sex="primary" @click="submitForm((ruleform))">提交</el-button>
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
const options1 = [
    {
        value: '教师培养与引进',
        label: '教师培养与引进',
    },
    {
        value: '高层次人才队伍建设',
        label: '高层次人才队伍建设',
    },
    {
        value: '师资国际化',
        label: '师资国际化',
    },]
let options2: any = ref([]);
const selectTertiaryIndicators = () => {
    form.value.tertiaryIndicators=null
    if (form.value.secondaryIndicators[0] == '教') {
        options2.value = [{
            value: '宣传教育培养',
            label: '宣传教育培养',
        },
        {
            value: '引进或培养博士',
            label: '引进或培养博士',
        },
        {
            value: '报考博士数',
            label: '报考博士数',
        },
        {
            value: '教师交流培训',
            label: '教师交流培训',
        },
        {
            value: '访学单科进修',
            label: '访学单科进修',
        },
        {
            value: '公需课培训',
            label: '公需课培训',
        },
        {
            value: '双师型教师',
            label: '双师型教师',
        },
        ]
        
    }else if(form.value.secondaryIndicators[0] == '高'){
        options2.value = [{
            value: '新增教授',
            label: '新增教授',
        },
        {
            value: '新增副教授',
            label: '新增副教授',
        },
        {
            value: '新增厅局级称号',
            label: '新增厅局级称号',
        },
        {
            value: '人才称号申报',
            label: '人才称号申报',
        }
        ]
    }else{
        options2.value = [{
            value: '聘请外教外文授课',
            label: '聘请外教外文授课',
        },
        {
            value: '外教工作量',
            label: '外教工作量',
        }
        ]
    }
triggerRef(options2);
}
const options = [
    {
        value: '文学与传播学院',
        label: '文学与传播学院',
    },
    {
        value: '数学与统计学院',
        label: '数学与统计学院',
    },
    {
        value: '物理与电子工程学院',
        label: '物理与电子工程学院',
    },
    {
        value: '化学与化工学院',
        label: '化学与化工学院',
    },
    {
        value: '资源环境与历史文化学院',
        label: '资源环境与历史文化学院',
    },
    {
        value: '外国语学院',
        label: '外国语学院',
    },
    {
        value: '马克思主义学院',
        label: '马克思主义学院',
    },
    {
        value: '计算机学院',
        label: '计算机学院',
    },
    {
        value: '体育学院',
        label: '体育学院',
    },
    {
        value: '美术学院',
        label: '美术学院',
    },
    {
        value: '于右任书法学院',
        label: '于右任书法学院',
    },
    {
        value: '音乐学院',
        label: '音乐学院',
    },
    {
        value: '教育科学学院',
        label: '教育科学学院',
    },
    {
        value: '经济与管理学院',
        label: '经济与管理学院',
    },
    {
        value: '设计学院',
        label: '设计学院',
    },
    {
        value: '职业技术学院',
        label: '职业技术学院',
    },
]
const rules = {
    college: [
        { required: true, message: "请选择二级学院", trigger: "change" }
    ],
    secondaryIndicators: [
        { required: true, message: "请选择二级指标", trigger: "change" }
    ],
    tertiaryIndicators: [
        { required: true, message: "请选择三级指标", trigger: "change" }
    ],
    date: [
        { required: true, message: "请选择年份", trigger: "change" }
    ],
};
const dataform = reactive({
    form: {
        college: [],
        secondaryIndicators: [],
        tertiaryIndicators: [],
        date: new Date(),
    } as {
        college: Array<string>,
        secondaryIndicators: Array<string>,
        tertiaryIndicators: Array<string>,
        date: Date,
    }
})
const taskVolume = ref(0);
let { form } = toRefs(dataform);

const college1 = ref(form.value.college);
const college2 = ref(form.value.secondaryIndicators);
const college3 = ref(form.value.tertiaryIndicators);
watch(() => form.value.college, (newVal) => {
    college1.value = newVal;
});
watch(() => form.value.secondaryIndicators, (newVal) => {
    college2.value = newVal;
});
watch(() => form.value.tertiaryIndicators, (newVal) => {
    college3.value = newVal;
});

const tableData = [
    {
        address: '按照考核指标设置任务量',
    },]
const submitForm = async (formEl: FormInstance | undefined) => {
    console.log(typeof college1.value)
    console.log(typeof college2.value)
    console.log(typeof college3.value)
    console.log(typeof taskVolume.value)
    console.log(form.value.date.getFullYear())
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            axios.get("/insertTargetAssessment", {
                params:{
                    college:college1.value,
                    secondaryIndicators:college2.value,
                    tertiaryIndicators:college3.value,
                    taskVolume:taskVolume.value as number,
                    date:form.value.date.getFullYear().toString()
                }
            })
                .then(() => { emits("FatherClick") });

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

.selectdiv {
    margin-right: 120px;
}

.tablediv {
    margin-bottom: 20px;
}

.buttondiv {
    margin-left: 250px;
}
</style>  