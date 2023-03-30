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
                <el-table :data="tableData" height="30vh" style="width: 60vh" show-summary="true">
                    <el-table-column prop="date" label="师资考核指标" width="150vh" />
                    <el-table-column prop="name" label="满分" width="100vh"/>
                    <el-table-column prop="address" label="得分" />
                </el-table>
        </div>
        <div id="cross" class="yy"></div>
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
    const echarts3 = echarts.init(document.getElementById('cross')!)
    //添加配置
    echarts1.setOption(option1)
    echarts2.setOption(option2)
    echarts3.setOption(option3)
    window.onresize = function () {
        echarts1.resize()
        echarts2.resize()
        echarts3.resize()
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
const option2 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['宣传教育培养', '引进或培养博士', '报考博士数', '教师交流培训', '访学单科进修', '公需课培训', '双师型教师','新增教授', '新增副教授', '新增厅局级称号', '人才称号申报', '聘请外教授课', '外教工作量']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    
    {
      name: '未审核',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '已通过',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290, 330, 310, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '未通过',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      data: [150, 232, 201, 154, 190, 330, 410, 132, 101, 134, 90, 230, 210]
    }
  ]
};
const tableData = [
  {
    date: '宣传教育培养',
    name: '5',
    address: '3',
  },
  {
    date: '引进或培养博士',
    name: '6',
    address: '6',
  },
  {
    date: '报考博士数',
    name: '3',
    address: '2',
  },
  {
    date: '教师交流培训',
    name: '5',
    address: '4',
  },
  {
    date: '访学单科进修',
    name: '7',
    address: '6',
  },
  {
    date: '公需课培训',
    name: '2',
    address: '2',
  },
  {
    date: '双师型教师',
    name: '3',
    address: '3',
  },
  {
    date: '新增教授',
    name: '5',
    address: '3',
  },
  {
    date: '新增副教授',
    name: '6',
    address: '6',
  },
  {
    date: '新增厅局级称号',
    name: '3',
    address: '2',
  },
  {
    date: '人才称号申报',
    name: '5',
    address: '4',
  },
  {
    date: '聘请外教外文授课',
    name: '7',
    address: '6',
  },
  {
    date: '外教工作量',
    name: '2',
    address: '2',
  },
]

const option3 = {
  title: {
    text: '历年师资队伍考核分数'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
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
      boundaryGap: false,
      data: ['2017', '2018', '2019', '2020', '2021', '2022', '2023']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '师资队伍考核分数',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [90, 95, 93, 94, 90, 97, 92]
    }
  ]
};


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
    width: 40vh;
    height: 33vh;
    background-color: white;
    float: left;
    margin-left: 20px;
    margin-right: 20px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 5px;
}
#cross{
  float: left;
  height: 33vh;
  width: 87vh;
  margin-left: 0px;
  border-radius: 5px;
  background-color: white;
}
#treeMap {
    width: 170.5vh;
    height: 51vh;
    background-color: white;
    margin-bottom: 0px;
    margin-top: 36vh;
    border-radius: 5px;
    margin-left: 0px;
}
</style>
