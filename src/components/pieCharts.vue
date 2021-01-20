<template>
  <div>
    <div
      :id="pieData.id"
      ref="myChart"
      :style="{ width: '100%', height: pieData.height }"
    ></div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  props: ["pieData"],
  data() {
    return {
      barChart: null,
    };
  },
  created() {
    
  },
  watch: {
    pieData: function (newValue, oldValue) {
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
    setOptions({ data } = {}) {
      this.barChart.setOption({
        title: {
          text: '',
          left: 'center',
          top: '49%',
          textStyle: {
            fontSize: 16,
            color: '#3C4353',
            fontStyle: 'normal',
            fontWeight: '400',
            fontFamily: 'PingFangSC-Regular,PingFang SC;',
          }
        },
        color: ['#F0DE40', '#FF8122', '#4897f6', '#ea9b4f', '#7577df', '#be72d8', '#fff'],
        tooltip: {
          trigger: 'item',
          confine:true,
          // formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        grid:{
          left:'10px',
          top:'0px'
        },
        series: [{
          name: '银行发放金额占比',
          type: 'pie',
          radius: [30, 60],
          center: ['50%', '50%'],
          roseType: 'radius',
          avoidLabelOverlap: true,
          label: {
            show: true,
            position: 'outside', //inside
            formatter: '{b}：{d}%',
          },
          emphasis: {
            label: {
                show: true
            }
          },
          data: data
        }]
      });
    },
    initChart() {
      this.barChart = echarts.init(this.$refs.myChart, true);
      this.setOptions(this.pieData);
      // window.addEventListener("resize", function () {
      //   this.barChart.resize();
      // });
    },
  },
};
</script>
<style scoped>
</style>