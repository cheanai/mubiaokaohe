<template>
    <el-form :model="form" label-width="80px" status-icon :rules="rules" ref="ruleform">
      <el-form-item label="教师姓名" prop="teacherName">
        <el-input v-model.string="form.teacherName"></el-input>
      </el-form-item>
      <el-form-item label="访学地点" prop="destination">
        <el-input v-model.string="form.destination"></el-input>
      </el-form-item>
      <el-form-item label="进修内容" prop="studyContent">
        <el-input v-model.string="form.studyContent"></el-input>
      </el-form-item>
      <el-form-item label="开始时间" prop="startDate">
        <el-date-picker v-model="form.startDate" type="date" placeholder="Pick a day" />
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
    destination: [
      { required: true, message: "请输入访学地点", trigger: "blur" }
    ],
    studyContent: [
      { required: true, message: "请输入进修内容", trigger: "blur" }
    ],
    startDate: [
      { required: true, message: "请选择时间", trigger: "blur" }
    ],
  };
  const dataform = reactive({
    form: {
      id: -1,
      teacherName: "",
      destination: "",
      studyContent: "",
      startDate: new Date(),
      department: store.department
    } as {
      id: number,
      teacherName: string,
      destination: string,
      studyContent: string,
      startDate: Date,
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
    form.value.destination = props.info?.destination;
    form.value.studyContent = props.info?.studyContent;
    form.value.startDate = props.info?.startDate;
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
          axios.post("/updateStudyAbroad", form.value)
            .then(() => { emits("FatherClick") });
        } else {
          axios.post("/insertStudyAbroad", form.value)
            .then(() => { emits("FatherClick") });
        }
  
      } else {
        console.log('未通过');
      }
    });
  }
  </script>
  
  <style scoped></style>