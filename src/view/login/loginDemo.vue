<template>
    <div>
        <div v-bind:class="{class1: isShow}" class="left-div">
            <p v-if="!isShow">{{ demo }}</p>
            <button @click="addclass1">右移</button>
        </div>
        <div ref="div2" class="right-div">
            <button>右移</button>
        </div>
    </div>
</template>

<script setup>
const demo = ref(0);
const isShow = ref(false);
const addclass1 =()=>{
    demo.value = demo.value+1;
    isShow.value = !isShow.value;
}
</script>

<style lang="scss" scoped>
.left-div{
    width: 300px;
    height: 300px;
    background-color: aqua;
}
.class1{
    background-color: beige;
    transform: translateX(100px);
}
</style>