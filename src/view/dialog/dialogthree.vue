<template>
    <el-form :model="form" label-width="80px" status-icon :rules="rules" ref="ruleform">
      <el-form-item label="教师姓名" prop="teacherName">
        <el-input v-model.string="form.teacherName"></el-input>
      </el-form-item>
      <el-form-item label="培训类型" prop="trainingType">
        <el-input v-model.string="form.trainingType"></el-input>
      </el-form-item>
      <el-form-item label="培训主题" prop="trainingTopic">
        <el-input v-model.string="form.trainingTopic"></el-input>
      </el-form-item>
      <el-form-item label="开始时间" prop="trainingStartTime">
        <el-date-picker v-model="form.trainingStartTime" type="date" placeholder="Pick a day" />
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
      { required: true, message: "请输入教师姓名", trigger: "blur" }
    ],
    trainingType: [
      { required: true, message: "请输入培训类型", trigger: "blur" }
    ],
    trainingTopic: [
      { required: true, message: "请输入培训主题", trigger: "blur" }
    ],
    trainingStartTime: [
      { required: true, message: "请选择开始时间", trigger: "blur" }
    ],
  };
  const dataform = reactive({
    form: {
      id: -1,
      teacherName: "",
      trainingType: "",
      trainingTopic: "",
      trainingStartTime: new Date(),
      department: store.department
    } as {
      id: number,
      teacherName: string,
      trainingType: string,
      trainingTopic: string,
      trainingStartTime: Date,
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
    form.value.trainingType = props.info?.trainingType;
    form.value.trainingTopic = props.info?.trainingTopic;
    form.value.trainingStartTime = props.info?.trainingStartTime;
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
          axios.post("/updateTeacherTraining", form.value)
            .then(() => { emits("FatherClick") });
        } else {
          axios.post("/insertTeacherTraining", form.value)
            .then(() => { emits("FatherClick") });
        }
  
      } else {
        console.log('未通过');
      }
    });
  }
  </script>
  
  <style scoped></style>