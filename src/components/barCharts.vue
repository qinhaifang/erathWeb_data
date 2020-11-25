<template>
  <div>
    <div
      :id="barData.id"
      ref="myChart"
      :style="{ width: '100%', height: barData.height }"
    ></div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  props: ["barData"],
  data() {
    return {
      barChart: null,
      
    };
  },
  created() {
    // console.log(55555,this.barData)
  },
  watch: {
    barData: function (newValue, oldValue) {
      console.log("new", newValue, oldValue);
      this.initChart();
    },
    deep: true,
  },
  mounted() {
    this.initChart();
    // vm.$nextTick(()=>{
    //   this.drawline();
    // })
  },
  methods: {
    setOptions({ dataX, dataY,dataZ, unit } = {}) {
      var path = 'path://M214,1079l8-6h16l8,6-8,6H222Z';
      this.barChart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(e){
              if(e.length>1){
                  var S=e[1].data-e[0].data;
                  return "发放资金: "+ e[0].data +"万元<br>发放人次: " + e[1].data + "个";
              }
            }
        },
        grid: {
            left: '2%',
            right: '4%',
            bottom: '4%',
            top:'16%',
            containLabel: true
        },
        legend: {
            show:true,
            data: ['发放资金', '发放人次'],
            right: 0,
            top:1,
            textStyle: {
                color:"#fff",
                fontSize:14
            },
            itemWidth: 12,
            itemHeight: 10,
            // itemGap: 35
            color: '#242424'
        },
        xAxis: {
            type: 'category',
            data: dataY,
            axisLine: {
              lineStyle: {
                show: true,
                type: 'dashed',
                color: 'rgba(135,140,147,1)',
              }
            },
            axisLabel: {
              // interval: 0,
              // rotate: 40,
              textStyle: {
                fontFamily: 'Microsoft YaHei',
                color: '#fff',// x轴颜色
                fontWeight: 'normal',
                fontSize: '14',
                lineHeight: 22
              }
            },
            splitLine:{
              show:true,
              lineStyle: {
                type: 'dashed',
                color: 'rgba(135,140,147,0.8)'
              }
            },
        },
        yAxis: {
          type: 'value',
          name: "         金额( 单位: 万元 )",
          nameTextStyle: {
            color: '#ffffff'
          },
          axisLine: {
            show: false,
            lineStyle: {
              type: 'dashed',
              color: 'rgba(135,140,147,0.8)'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: 'rgba(135,140,147,.8)' //左侧显示线
            }
          },
          axisLabel: {
            formatter: '{value}',
            color: '#fff',
            fontSize: 14
          }
        },
        series: [{
          type: 'pictorialBar',
          symbol: path,
          symbolSize: [30, 8],
          symbolOffset: [-20, -4],
          symbolPosition: 'end',
          z: 12,
          color: "#3440FF",
          data: dataX
        },
        {
          type: 'pictorialBar',
          symbol: path,
          symbolSize: [30, 8],
          symbolOffset: [20, -4],
          symbolPosition: 'end',
          z: 12,
          color: "#FF1155",
          data: dataZ
        },
        {
          type: 'pictorialBar',
          symbol: path,
          symbolSize: [30, 8],
          symbolOffset: [-20, 4],
          z: 12,
          color: "rgba(126,192,238,0.6)",
          data: dataX
        },
        {
          name: '',
          type: 'pictorialBar',
          symbol: path,
          symbolSize: [30, 8],
          symbolOffset: [20, 4],
          color: "#FFC0CB",
          z: 12,
          data: dataZ
        },
        {
          name: '发放资金',
          type: 'bar',
          barWidth: '30',
          itemStyle: {
            normal: {
              opacity: .7,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'blue'
              }, {
                offset: 1,
                color: '#7EC0EE'
              }]),
              barBorderRadius: 0,
            },
          },
          label: {
            show: true,
            position: ['-18','-18'],
            color: '#F0DE40',
            fontSize: 12,
          },
          data: dataX
        },
        {
          name: '发放人次',
          type: 'bar',
          barWidth: '30',
          itemStyle: {
            normal: {
              opacity: .7,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#FF2246'
              }, {
                offset: 1,
                color: '#FFC0CB'
              }]),
              barBorderRadius: 0,
            }
          },
          label: {
            show: true,
            // position: ['18','-20'],
            position: 'top',
            color: '#F0DE40',
            fontSize: 12,
          },
          data: dataZ
        },]
      });
    },
    initChart() {
      this.barChart = echarts.init(this.$refs.myChart, true);
      this.setOptions(this.barData);
      this.barChart.off("click");
    },
  },
};
</script>
<style scoped>
</style>