<template>
    <el-form :model="form" label-width="80px">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model.number="form.age"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-radio-group v-model="form.gender">
        <el-radio label="male">男</el-radio>
        <el-radio label="female">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="城市" prop="city">
      <el-select v-model="form.city">
        <el-option label="北京" value="Beijing"></el-option>
        <el-option label="上海" value="Shanghai"></el-option>
        <el-option label="广州" value="Guangzhou"></el-option>
        <el-option label="深圳" value="Shenzhen"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
const dataform = reactive({
    form: {
        name: '',
        age: '',
        gender: '',
        email: '',
        city: ''
      }
})

let {form} = toRefs(dataform);

const submitForm =()=>{
    
}
</script>

<style scoped>

</style>