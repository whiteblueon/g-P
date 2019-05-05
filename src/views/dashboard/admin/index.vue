<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="36" :sm="36" :lg="12">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="36" :sm="36" :lg="12">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    PieChart,
    BarChart
  },
  data() {
    return {
      allLineChartData: {
        newVisitis: {
          expectedData: [],
          actualData: []
        },
        messages: {
          expectedData: [],
          actualData: []
        },
        purchases: {
          expectedData: [],
          actualData: []
        }
      },
      lineChartData: {}
    }
  },
  mounted() {
    for (let index = 0; index < 60; index++) {
      this.allLineChartData.newVisitis.expectedData.push(69 + Math.floor(Math.random() * 23))
      this.allLineChartData.newVisitis.actualData.push(3 + Math.floor(Math.random() * 3))
      this.allLineChartData.messages.expectedData.push(69 + Math.floor(Math.random() * 23))
      this.allLineChartData.messages.actualData.push(3 + Math.floor(Math.random() * 3))
      this.allLineChartData.purchases.expectedData.push(69 + Math.floor(Math.random() * 23))
      this.allLineChartData.purchases.actualData.push(3 + Math.floor(Math.random() * 3))
    }
    this.lineChartData = this.allLineChartData.newVisitis
    const now = new Date()
    this.$notify.error({
      title: '生产用水速率超过预计峰值',
      message: `发生时间: 今天${Math.floor(Math.random() * now.getHours() + 1)}小时${Math.floor(Math.random() * now.getMinutes() + 1)}分钟`,
      duration: 0
    })
    setInterval(() => {
      this.allLineChartData.newVisitis.expectedData.shift()
      this.allLineChartData.newVisitis.actualData.shift()
      this.allLineChartData.messages.expectedData.shift()
      this.allLineChartData.messages.actualData.shift()
      this.allLineChartData.purchases.expectedData.shift()
      this.allLineChartData.purchases.actualData.shift()
      this.allLineChartData.newVisitis.expectedData.push(69 + Math.floor(Math.random() * 23))
      this.allLineChartData.newVisitis.actualData.push(3 + Math.floor(Math.random() * 3))
      this.allLineChartData.messages.expectedData.push(69 + Math.floor(Math.random() * 23))
      this.allLineChartData.messages.actualData.push(3 + Math.floor(Math.random() * 3))
      this.allLineChartData.purchases.expectedData.push(69 + Math.floor(Math.random() * 23))
      this.allLineChartData.purchases.actualData.push(3 + Math.floor(Math.random() * 3))
    }, 3000)
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = this.allLineChartData[type]
    }
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
