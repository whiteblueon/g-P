<template>
  <div class="dashboard-editor-container">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in image" :key="item">
        <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
    <!-- <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="item in image" :key="item">
        <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel> -->
    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->
    <MessageTable style="margin:50px 0;" :table-data="chartData.expectedData" :name="chartData.expectedTitle" />
    <MessageTable style="margin:50px 0;" :table-data="chartData.mapData" :name="chartData.mapTitle" />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <water-chart :chart-data="chartData" />
    </el-row>

    <!-- <el-row :gutter="32">
      <el-col :xs="36" :sm="36" :lg="12">
        <div class="chart-wrapper">
          <pie-chart :chart-data="chartData" />
        </div>
      </el-col>
      <el-col :xs="36" :sm="36" :lg="12">
        <div class="chart-wrapper">
          <bar-chart :chart-data="chartData"/>
        </div>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
// import PanelGroup from './components/PanelGroup'
// import LineChart from './components/LineChart'
// import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
import MessageTable from './components/MessageTable'
import WaterChart from './components/WaterChart'

export default {
  name: 'DashboardAdmin',
  components: {
    // PanelGroup,
    // LineChart,
    // PieChart,
    // BarChart,
    // MapChart,
    MessageTable,
    WaterChart
  },
  data() {
    return {
      image: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557254101688&di=86f68820cc16c6b14c8db903a90d118e&imgtype=0&src=http%3A%2F%2Fimg007.hc360.cn%2Fy1%2FM05%2FF4%2F96%2FwKhQc1SOA62EEL1BAAAAAIP19y0222.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557254503578&di=f42683f65d82b77ae12d80628af95af7&imgtype=0&src=http%3A%2F%2Fimg001.hc360.cn%2Fy5%2FM03%2FA6%2F6A%2FwKhQUVXPwrGEMtrXAAAAAEwMMzQ080.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557254683240&di=a47934b23fff3f7e5c642c6a987c348b&imgtype=0&src=http%3A%2F%2Fmeiti.fabumao.cn%2F1135863%2F2019021818545205.jpg'
      ],
      allLineChartData: {
        newVisitis: {
          expectedData: [
            {
              rank: '1',
              country: '中国',
              distribution: 5277330
            },
            {
              rank: '2',
              country: '美国',
              distribution: 4058625
            },
            {
              rank: '3',
              country: '澳大利亚',
              distribution: 3170780
            },
            {
              rank: '4',
              country: '巴西',
              distribution: 2835460
            },
            {
              rank: '5',
              country: '俄罗斯',
              distribution: 2177218
            },
            {
              rank: '6',
              country: '哈萨克斯坦',
              distribution: 2169920
            },
            {
              rank: '7',
              country: '印度',
              distribution: 1797210
            }
          ],
          expectedTitle: [
            '世界农业土地面积排名',
            '国家',
            '分布面积(平方公里)'
          ],
          mapData: [
            {
              rank: '1',
              country: '俄罗斯',
              distribution: 7760000
            },
            {
              rank: '2',
              country: '巴西',
              distribution: 4770000
            },
            {
              rank: '3',
              country: '加拿大',
              distribution: 3100000
            },
            {
              rank: '4',
              country: '美国',
              distribution: 3030000
            },
            {
              rank: '5',
              country: '中国',
              distribution: 1820000
            },
            {
              rank: '6',
              country: '澳大利亚',
              distribution: 1470000
            }
          ],
          mapTitle: [
            '世界林业土地面积排名',
            '国家',
            '分布面积(平方公里)'
          ]
        },
        messages: {
          expectedData: [
            {
              rank: '1',
              country: '中国',
              distribution: 5277330
            },
            {
              rank: '2',
              country: '美国',
              distribution: 4058625
            },
            {
              rank: '3',
              country: '澳大利亚',
              distribution: 3170780
            },
            {
              rank: '4',
              country: '巴西',
              distribution: 2835460
            },
            {
              rank: '5',
              country: '俄罗斯',
              distribution: 2177218
            },
            {
              rank: '6',
              country: '哈萨克斯坦',
              distribution: 2169920
            },
            {
              rank: '7',
              country: '印度',
              distribution: 1797210
            }
          ]
        },
        purchases: {
          expectedData: [
            {
              rank: '1',
              country: '俄罗斯',
              distribution: 7760000
            },
            {
              rank: '2',
              country: '巴西',
              distribution: 4770000
            },
            {
              rank: '3',
              country: '加拿大',
              distribution: 3100000
            },
            {
              rank: '4',
              country: '美国',
              distribution: 3030000
            },
            {
              rank: '5',
              country: '中国',
              distribution: 1820000
            },
            {
              rank: '6',
              country: '澳大利亚',
              distribution: 1470000
            },
            {
              rank: '7',
              country: '刚果（金）',
              distribution: 1210000
            }
          ]
        }
      },
      chartData: {
        expectedData: [],
        mapData: []
      }
    }
  },
  mounted() {
    // this.allLineChartData.newVisitis.expectedData = this.listData;
    // this.allLineChartData.messages.expectedData = this.listData;
    // this.allLineChartData.purchases.expectedData = this.listData;
    this.chartData = this.allLineChartData.newVisitis
  },
  methods: {
    handleSetLineChartData(type) {
      this.chartData = this.allLineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

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
