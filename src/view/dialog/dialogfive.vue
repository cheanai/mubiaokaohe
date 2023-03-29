<template>
  <el-form :model="form" label-width="80px" status-icon :rules="rules" ref="ruleform">
    <el-form-item label="教师姓名" prop="teacherName">
      <el-input v-model.string="form.teacherName"></el-input>
    </el-form-item>
    <el-form-item label="公需课名" prop="trainingName">
      <el-input v-model.string="form.trainingName"></el-input>
    </el-form-item>
    <el-form-item label="培训时间" prop="trainingTime">
      <el-date-picker v-model="form.trainingTime" type="date" placeholder="Pick a day" />
    </el-form-item>
    <el-form-item label="培训时长" prop="trainingHours">
      <el-input v-model.string="form.trainingHours"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm((ruleform))">提交</el-button>
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
const rules = {
  teacherName: [
    { required: true, message: "请输入主题", trigger: "blur" }
  ],
  trainingName: [
    { required: true, message: "请输入类型", trigger: "blur" }
  ],
  trainingHours: [
    { required: true, message: "请输入地点", trigger: "blur" }
  ],
  trainingTime: [
    { required: true, message: "请选择时间", trigger: "blur" }
  ],
};
const dataform = reactive({
  form: {
    id: -1,
    teacherName: "",
    trainingName: "",
    trainingHours: "",
    trainingTime: new Date(),
    department: store.department
  } as {
    id: number,
    teacherName: string,
    trainingName: string,
    trainingHours: string,
    trainingTime: Date,
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
  form.value.teacherName = props.info?.teacherName;
  form.value.trainingName = props.info?.trainingName;
  form.value.trainingHours = props.info?.trainingHours;
  form.value.trainingTime = props.info?.trainingTime;
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
        axios.post("/updatePublicCourseTraining", form.value)
          .then(() => { emits("FatherClick") });
      } else {
        axios.post("/insertPublicCourseTraining", form.value)
          .then(() => { emits("FatherClick") });
      }

    } else {
      console.log('未通过');
    }
  });
}
</script>
  
<style scoped></style>