<template>
  <el-form :model="form" label-width="80px" status-icon :rules="rules" ref="ruleform">
    <el-form-item label="主题" prop="title">
      <el-input v-model.string="form.title"></el-input>
    </el-form-item>
    <el-form-item label="类型" prop="type">
      <el-input v-model.string="form.type"></el-input>
    </el-form-item>
    <el-form-item label="地点" prop="location">
      <el-input v-model.string="form.location"></el-input>
    </el-form-item>
    <el-form-item label="时间" prop="time">
      <el-date-picker v-model="form.time" type="date" placeholder="Pick a day" />
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
  title: [
    { required: true, message: "请输入主题", trigger: "blur" }
  ],
  type: [
    { required: true, message: "请输入类型", trigger: "blur" }
  ],
  location: [
    { required: true, message: "请输入地点", trigger: "blur" }
  ],
};
const dataform = reactive({
  form: {
    title: "",
    type: "",
    location: "",
    time: new Date(),
    department: store.department
  } as {
    title: string,
    type: string,
    location: string,
    time: Date,
    department: string
  }
})
let { form } = toRefs(dataform);
const editForm = ()=>{
  console.log(store.celldata);
  form.value.title=store.celldata.title;
  form.value.type=store.celldata.type;
  form.value.location=store.celldata.location;
  form.value.time=store.celldata.time;
  form.value.department=store.celldata.department;
  triggerRef(form);
}
editForm();
const submitForm =async (formEl: FormInstance | undefined) => {
  if (!formEl)return
  await formEl.validate((valid) =>{
    if (valid) {
      console.log(form.value);
      axios.post("/insertEducationTraining", form.value)
      .then(()=>{emits("FatherClick")});
      
    }else{
      console.log('未通过');
    }
  });
}
</script>

<style scoped></style>