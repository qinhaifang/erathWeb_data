<template>
  <div style="poition:relative">
   <div
    :id="pieData.id"
    ref="myChart"
    :style="{ width: '100%', height: pieData.height }"
  ></div>
    <span class="pie">{{pieData.text1}}</span>
    <span class="pie">{{pieData.text2}}</span>
  </div>
  
</template>
<script>
import echarts from "echarts";
export default {
  props: ["pieData"],
  data() {
    return {
      chartPie: null,
    };
  },
  watch: {
    
  },
  mounted() {
    this.drawLine();

  },
  methods: {
    drawLine() {
      let _this = this;
      _this.chartPie = echarts.init(this.$refs.myChart);
      var placeHolderStyle = {
        normal: {
          label: {
              show: false
          },
          labelLine: {
              show: false
          },
          color: "rgba(0,0,0,0)",
          borderWidth: 0
        },
        emphasis: {
          color: "rgba(0,0,0,0)",
          borderWidth: 0
        }
      };
      var dataStyle = {
        normal: {
          formatter: '{c}%',
          position: 'center',

          show: true,
          textStyle: {
            fontSize: '24',
            fontWeight: 'normal',
            color: '#4897f6',
          }
        }
      };

      const option = {
        // backgroundColor: '#fff',
        tooltip: {
            formatter: function (params) {
                return '<span style="color: #fff;"></span>';
            }
        },
        title: [{
          text: '覆盖区县',
          left: '24%',
          top: '55%',
          textAlign: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: '14',
            color: '#fff',
            textAlign: 'center',
          },
        }, {
          text: '未覆盖区县',
          left: '74%',
          top: '55%',
          textAlign: 'center',
          textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontSize: '14',
            textAlign: 'center',
          },
        }],
        //第一个图表
        series: [{
          type: 'pie',
          hoverAnimation: true, //鼠标经过的特效
          radius: ['45%', '60%'],
          center: ['25%', '40%'],
          startAngle: 225,
          labelLine: {
            normal: {
              show: true
            }
          },
          label: {
            normal: {
              position: 'center'
            }
          },
          data: [{
            value: 100,
            itemStyle: {
              normal: {
                color: 'rgba(0, 23, 70, .3)'
              }
            },
          }, {
            value: 35,
            itemStyle: placeHolderStyle,
          }]
        },
        //上层环形配置
        {
          type: 'pie',
          hoverAnimation: true, //鼠标经过的特效
          radius: ['45%', '60%'],
          center: ['25%', '40%'],
          startAngle: 225,
          labelLine: {
            normal: {
              show: false
            }
          },
          label: {
            normal: {
              position: 'center'
            }
          },
          data: [{
            value: this.pieData.data1,
            itemStyle: {
              normal: {
                color: '#4897f6'
              }
            },
            label: dataStyle,
          }, {
            value: 35,
            itemStyle: placeHolderStyle,
          }]
        },
        //第二个图表
        {
          type: 'pie',
          hoverAnimation: false,
          radius: ['45%', '60%'],
          center: ['75%', '40%'],
          startAngle: 225,
          labelLine: {
              normal: {
                  show: false
              }
          },
          label: {
              normal: {
                  position: 'center'
              }
          },
          data: [{
            value: 100,
            itemStyle: {
              normal: {
                color: 'rgba(0, 23, 70, .3)'
              }
            },
          }, {
              value: 35,
              itemStyle: placeHolderStyle,
          }]
        },
        //上层环形配置
        {
          type: 'pie',
          hoverAnimation: false,
          radius: ['45%', '60%'],
          center: ['75%', '40%'],
          startAngle: 225,
          labelLine: {
            normal: {
              show: false
            }
          },
          label: {
            normal: {
              position: 'center'
            }
          },
          data: [{
            value: 100-this.pieData.data1,
            itemStyle: {
              normal: {
                color: '#4897f6'
              }
            },
            label: dataStyle,
          }, {
            value: 55,
            itemStyle: placeHolderStyle,
          }]
        }]
      };
       _this.chartPie.setOption(option)
    },
  },
};
</script>
<style scoped>
  .pie{
    display: inline;
    position: relative;
    left: -5%;
    bottom: 46px;
    padding-left: 29px
  }
</style>