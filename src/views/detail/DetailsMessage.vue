<template>
  <div class="dashboard-editor-container">
    <MessageTable style="margin-bottom:50px;" :title-list="titleList" :table-data="chartData" />
    <el-row>
      <mix-chart :chart-data="chartData" :title-list="titleList" />
    </el-row>
  </div>
</template>

<script>
import MixChart from './MixChart.vue'
import MessageTable from './components/MessageTable'

const dataMap = {
  cattle: {
    titleList: ['时间', '黑龙江', '国家'],
    chartData: [
      {
        date: '2014',
        one: 1180520,
        two: 6765780
      },
      {
        date: '2013',
        two: 5911670,
        one: 122980
      },
      {
        date: '2012',
        two: 6015980,
        one: 1238890
      },
      {
        date: '2011',
        two: 6609910,
        one: 1129000
      },
      {
        date: '2010',
        two: 5567750,
        one: 923400
      }
    ]
  },
  sheep: {
    titleList: ['时间', '黑龙江', '国家'],
    chartData: [
      {
        date: '2014',
        one: 2834710,
        two: 52907500
      },
      {
        date: '2013',
        two: 43982600,
        one: 2753200
      },
      {
        date: '2012',
        two: 42391300,
        one: 266796
      },
      {
        date: '2011',
        two: 43950200,
        one: 2600610
      },
      {
        date: '2010',
        two: 39962600,
        one: 1409840
      }
    ]
  },
  situation: {
    titleList: ['时间', '定居牧户数', '人均纯收入'],
    chartData: [
      {
        date: '2014',
        one: 3031320.0,
        two: 7772.60
      },
      {
        date: '2013',
        two: 6993.30,
        one: 2761820
      },
      {
        date: '2012',
        two: 6221.30,
        one: 2572050
      },
      {
        date: '2011',
        two: 5361.40,
        one: 2635250
      },
      {
        date: '2010',
        two: 4691.50,
        one: 2550380
      }
    ]
  },
  tea: {
    titleList: ['时间', '乌龙毛茶', '总产量'],
    chartData: [
      {
        date: '2014',
        one: 129663,
        two: 2095700
      },
      {
        date: '2013',
        two: 1924460,
        one: 116214
      },
      {
        date: '2012',
        two: 1789750,
        one: 103820
      },
      {
        date: '2011',
        two: 1623210,
        one: 90168
      },
      {
        date: '2010',
        two: 1475070,
        one: 81271
      }
    ]
  },
  grape: {
    titleList: ['', '', ''],
    chartData: []
  },
  orange: {
    titleList: ['', '', ''],
    chartData: []
  },
  rMaterial: {
    titleList: ['', '', ''],
    chartData: []
  },
  cPrice: {
    titleList: ['', '', ''],
    chartData: []
  },
  chicken: {
    titleList: ['', '', ''],
    chartData: []
  },
  oats: {
    titleList: ['', '', ''],
    chartData: []
  },
  cray: {
    titleList: ['', '', ''],
    chartData: []
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    MixChart,
    MessageTable
  },
  data() {
    return {
      titleList: [],
      chartData: []
    }
  },
  mounted() {
    const { name } = this.$route
    const { titleList, chartData } = dataMap[name]
    this.titleList = titleList
    this.chartData = chartData
  },
  methods: {
    // handleSetLineChartData(type) {
    //   this.chartData = this.allLineChartData[type]
    // }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

</style>
