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
import axios from 'axios'
import MessageTable from './components/MessageTable'

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
    axios.get(`http://127.0.0.1:7001/data/${name}`).then(res => {
      if (res.data.length) {
        // this.titleList = [ '时间', ...res.data[0].header.split('/') ]
        this.titleList = ['时间', ...res.data[0].header.split('/')]
        this.chartData = res.data
      }
    })
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
