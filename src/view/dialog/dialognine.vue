<template>
    <el-form :model="form" label-width="80px" status-icon :rules="rules" ref="ruleform">
      <el-form-item label="姓名" prop="name">
        <el-input v-model.string="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio label="男" size="large">男</el-radio>
          <el-radio label="女" size="large">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="职称" prop="title">
        <el-input v-model.string="form.title"></el-input>
      </el-form-item>
      <el-form-item label="申请称号" prop="talentTitle">
        <el-input v-model.string="form.talentTitle"></el-input>
      </el-form-item>
      <el-form-item>
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
    talentTitle: [
      { required: true, message: "请输入申请称号", trigger: "blur" }
    ],
  };
  const dataform = reactive({
    form: {
      id: -1,
      name: "",
      sex: "",
      title: "",
      talentTitle: "",
      department: store.department
    } as {
      id: number,
      name: string,
      sex: string,
      title: string,
      talentTitle: string,
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
    form.value.talentTitle = props.info?.talentTitle;
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
          axios.post("/updateTalentTeacher", form.value)
            .then(() => { emits("FatherClick") });
        } else {
          axios.post("/insertTalentTeacher", form.value)
            .then(() => { emits("FatherClick") });
        }
  
      } else {
        console.log('未通过');
      }
    });
  }
  </script>
    
  <style scoped>
  .el-radio{
    height: 32px;
  
  }
  </style>  