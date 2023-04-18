<template>
    <div class="body_div">
        <div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>师资管理</el-breadcrumb-item>
                <el-breadcrumb-item>教师培养与引进</el-breadcrumb-item>
                <el-breadcrumb-item>宣传教育培养</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div id="pie" class="pie"></div>
        <div class="dataTable yy">
            <el-table :data="tableData" height="30vh" style="width: 500vh">
                <el-table-column prop="col" label="二级学院" width="180vh" />
                <el-table-column prop="trainIntMax" label="教师培养与引进满分" width="150vh" />
                <el-table-column prop="trainIntScore" label="教师培养与引进得分" width="150vh" />
                <el-table-column prop="talentMax" label="高层次人才队伍建设满分" width="178vh" />
                <el-table-column prop="talentScore" label="高层次人才队伍建设得分" width="178vh" />
                <el-table-column prop="facultyIntlMax" label="师资国际化满分" width="130vh" />
                <el-table-column prop="facultyIntlScore" label="师资国际化得分" width="130vh" />
                <el-table-column prop="totalScore" label="学院总得分" width="100vh" />
            </el-table>
        </div>
        <div id="treeMap" class="yy"></div>
    </div>
</template>

<script setup lang="ts">
import { useMain } from "@/store/home";
import axios from "@/api/axiosInstance";
import { AxiosResponse, AxiosError } from "axios";
import * as echarts from 'echarts';
const store = useMain();
store.routerPath = '/index/main1'
onMounted(() => {
    //初始化挂载
    const echarts1 = echarts.init(document.getElementById('pie')!)
    const echarts2 = echarts.init(document.getElementById('treeMap')!)
    let zdata : number[];
    axios.get("/selectTotalScore").then((Response) => {
        zdata = Response.data
        console.log(Response.data)
        console.log(zdata)
        const option2 = {
        title: {
            text: '各学院得分', // 标题文本
            left: 'center', // 标题居中对齐
            textStyle: {
                fontSize: 18 // 标题字体大小
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['文学与传播学院', '数学与统计学院', '物理与电子工程学院', '化学与化工学院', '资源环境与历史文化学院', '外国语学院', '马克思主义学院', '计算机学院', '体育学院', '美术学院', '于右任书法学院', '音乐学院', '教育科学学院', '经济与管理学院', '设计学院', '职业技术学院'],
                axisLabel: {
                    interval: 0,
                    rotate: 45, // 设置 x 轴标签旋转角度
                    textStyle: {
                        fontSize: 12 // 设置 x 轴标签字体大小
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [

            {
                name: '得分',
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                    focus: 'series'
                },
                data: zdata
            }
        ]
    };
    echarts2.setOption(option2)
    })
    
    //添加配置
    echarts1.setOption(option1)
    
    window.onresize = function () {
        echarts1.resize()
        echarts2.resize()
    }

});

const option1 = {
    title: {
        text: '审核情况一览',
        left: 'center'
    },
    legend: {
        bottom: 10,
        left: 'center'
    },
    series: [
        {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            data: [
                { value: 1548, name: '未审核' },
                { value: 735, name: '已通过' },
                { value: 510, name: '未通过' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};


let tableData = ref([]);
axios.get("/selectScore").then((Response) => {
    tableData.value = Response.data
    triggerRef(tableData)
    console.log(tableData)
})

</script>

<style scoped>
.body_div {
    margin: 20px;
}

.yy {
    margin: 10px;

}

.pie {
    width: 36vh;
    height: 32vh;
    margin-top: 10px;
    padding-top: 10px;
    border-radius: 5px;
    float: left;
    background-color: white;
}

.dataTable {
    width: 128.6vh;
    height: 33vh;
    background-color: white;
    float: left;
    margin-left: 20px;
    margin-right: 20px;
    padding-left: 15px;
    padding-right: 14.5px;
    border-radius: 5px;
}

#treeMap {
    width: 170vh;
    height: 51vh;
    background-color: white;
    margin-bottom: 0px;
    margin-top: 36vh;
    border-radius: 5px;
    margin-left: 0px;
    padding-top: 5px;
}
</style>
