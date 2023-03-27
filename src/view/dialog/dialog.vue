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
    id: -1,
    title: "",
    type: "",
    location: "",
    time: new Date(),
    department: store.department
  } as {
    id: number,
    title: string,
    type: string,
    location: string,
    time: Date,
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
  form.value.title = props.info?.title;
  form.value.type = props.info?.type;
  form.value.location = props.info?.location;
  form.value.time = props.info?.time;
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
        axios.post("/updateEducationTraining", form.value)
          .then(() => { emits("FatherClick") });
      } else {
        axios.post("/insertEducationTraining", form.value)
          .then(() => { emits("FatherClick") });
      }

    } else {
      console.log('未通过');
    }
  });
}
</script>

<style scoped></style>