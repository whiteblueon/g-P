<template>
  <div id="container" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null
    }
  },
  mounted() {
    var dom = document.getElementById('container')
    var myChart = echarts.init(dom)
    var app = {}
    let option = null
    app.title = '水印 - ECharts 下载统计'

    var builderJson = {
      all: 8000000,
      charts: {
        哈萨克斯坦: 2169920,
        俄罗斯: 2177218,
        巴西: 2835460,
        澳大利亚: 3710780,
        美国: 4058625,
        中国: 5277330

      },
      components: {
        澳大利亚: 1470000,
        中国: 1820000,
        美国: 3030000,
        加拿大: 3100000,
        巴西: 4770000,
        俄罗斯: 7760000

      },
      ie: 9743
    }

    var downloadJson = {
      哈萨克斯坦: 2169920,
      俄罗斯: 2177218,
      巴西: 2835460,
      澳大利亚: 3710780,
      美国: 4058625,
      中国: 5277330
    }

    var themeJson = {
      澳大利亚: 1470000,
      中国: 1820000,
      美国: 3030000,
      加拿大: 3100000,
      巴西: 4770000,
      俄罗斯: 7760000
    }

    var waterMarkText = ''

    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    canvas.width = canvas.height = 100
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.globalAlpha = 0.08
    ctx.font = '20px Microsoft Yahei'
    ctx.translate(50, 50)
    ctx.rotate(-Math.PI / 4)
    ctx.fillText(waterMarkText, 0, 0)

    option = {
      backgroundColor: {
        type: 'pattern',
        image: canvas,
        repeat: 'repeat'
      },
      tooltip: {},
      title: [
        {
          // text: "世界农业土地面积前六名",
          subtext: '总计 ' + builderJson.all,
          x: '25%',
          textAlign: 'center'
        },
        {
          text: '世界农业土地面积前六名',
          subtext:
            '总计 ' +
            Object.keys(downloadJson).reduce(function(all, key) {
              return all + downloadJson[key]
            }, 0),
          x: '75%',
          textAlign: 'center'
        },
        {
          text: '世界林业土地面积前六名',
          subtext:
            '总计 ' +
            Object.keys(themeJson).reduce(function(all, key) {
              return all + themeJson[key]
            }, 0),
          x: '75%',
          y: '50%',
          textAlign: 'center'
        }
      ],
      grid: [
        {
          top: 50,
          width: '50%',
          bottom: '45%',
          left: 10,
          containLabel: true
        },
        {
          top: '55%',
          width: '50%',
          bottom: 0,
          left: 10,
          containLabel: true
        }
      ],
      xAxis: [
        {
          type: 'value',
          max: builderJson.all,
          splitLine: {
            show: false
          }
        },
        {
          type: 'value',
          max: builderJson.all,
          gridIndex: 1,
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          type: 'category',
          data: Object.keys(builderJson.charts),
          axisLabel: {
            interval: 0,
            rotate: 30
          },
          splitLine: {
            show: false
          }
        },
        {
          gridIndex: 1,
          type: 'category',
          data: Object.keys(builderJson.components),
          axisLabel: {
            interval: 0,
            rotate: 30
          },
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          type: 'bar',
          stack: 'chart',
          z: 3,
          label: {
            normal: {
              position: 'right',
              show: true
            }
          },
          data: Object.keys(builderJson.charts).map(function(key) {
            return builderJson.charts[key]
          })
        },
        {
          type: 'bar',
          stack: 'chart',
          silent: true,
          itemStyle: {
            normal: {
              color: '#eee'
            }
          },
          data: Object.keys(builderJson.charts).map(function(key) {
            return builderJson.all - builderJson.charts[key]
          })
        },
        {
          type: 'bar',
          stack: 'component',
          xAxisIndex: 1,
          yAxisIndex: 1,
          z: 3,
          label: {
            normal: {
              position: 'right',
              show: true
            }
          },
          data: Object.keys(builderJson.components).map(function(key) {
            return builderJson.components[key]
          })
        },
        {
          type: 'bar',
          stack: 'component',
          silent: true,
          xAxisIndex: 1,
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: '#eee'
            }
          },
          data: Object.keys(builderJson.components).map(function(key) {
            return builderJson.all - builderJson.components[key]
          })
        },
        {
          type: 'pie',
          radius: [0, '30%'],
          center: ['75%', '25%'],
          data: Object.keys(downloadJson).map(function(key) {
            return {
              name: key.replace('.js', ''),
              value: downloadJson[key]
            }
          })
        },
        {
          type: 'pie',
          radius: [0, '30%'],
          center: ['75%', '75%'],
          data: Object.keys(themeJson).map(function(key) {
            return {
              name: key.replace('.js', ''),
              value: themeJson[key]
            }
          })
        }
      ]
    }
    if (option && typeof option === 'object') {
      myChart.setOption(option, true)
    }
  }
}
</script>
