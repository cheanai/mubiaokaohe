<template>
  <el-form :model="form" label-width="80px" status-icon :rules="rules" ref="ruleform">
    <el-form-item label="姓名" prop="name">
      <el-input v-model.string="form.name"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="form.sex">
        <el-radio label="1" size="large">男</el-radio>
        <el-radio label="2" size="large">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="国籍" prop="nationality">
      <el-input v-model.string="form.nationality"></el-input>
    </el-form-item>
    <el-form-item label="毕业院校" prop="gradschool">
      <el-input v-model.string="form.gradschool"></el-input>
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
  nationality: [
    { required: true, message: "请输入国籍", trigger: "blur" }
  ],
  gradschool: [
    { required: true, message: "请输入毕业院校", trigger: "blur" }
  ],
};
const dataform = reactive({
  form: {
    id: -1,
    name: "",
    sex: "",
    nationality: "",
    gradschool: "",
    department: store.department
  } as {
    id: number,
    name: string,
    sex: string,
    nationality: string,
    gradschool: string,
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
  form.value.nationality = props.info?.nationality;
  form.value.gradschool = props.info?.gradschool;
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
        axios.post("/updateDoctorInfo", form.value)
          .then(() => { emits("FatherClick") });
      } else {
        axios.post("/insertDoctorInfo", form.value)
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