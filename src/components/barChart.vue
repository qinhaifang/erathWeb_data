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
    setOptions({ dataX, dataY, unit } = {}) {
      var salvProMax = []; //背景按最大值
      let a = dataX;
      let b = Math.max(...a);
      for (let i = 0; i < dataX.length; i++) {
        salvProMax.push(b);
      }
      this.barChart.setOption({
        // backgroundColor: "#003366",
        grid: {
          left: "6%",
          right: "4%",
          bottom: "2%",
          top: "0%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
          formatter: function (params) {
            return params[0].name + " : " + params[0].value + unit;
          },
        },
        xAxis: {
          show: false,
          type: "value",
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: "16",
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            // max:9,
            data: dataY,
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            // max:9,
            show: true,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "16",
              },
            },
            data: dataX,
          },
        ],
        series: [
          {
            name: "值",
            type: "bar",
            zlevel: 1,
            barGap: "10%",
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "rgb(57,89,255,1)",
                  },
                  {
                    offset: 1,
                    color: "rgb(46,200,207,1)",
                  },
                ]),
              },
            },
            fontSize: "14",
            barWidth: 10,
            data: dataX,
          },
          {
            name: "背景",
            type: "bar",
            barWidth: 10,
            barGap: "-100%",
            data: salvProMax,
            itemStyle: {
              normal: {
                color: "rgba(24,31,68,.4)",
                barBorderRadius: 30,
              },
            },
          },
        ],
      });
    },
    initChart() {
      this.barChart = echarts.init(this.$refs.myChart, true);
      this.setOptions(this.barData);
      this.barChart.off("click");
      // triggerEvent为true时，触发点击事件
      if(this.barData.id == 'barChart' || this.barData.id == 'barChart1' ){
        this.barChart.on("click", function (params) {
          Bus.$emit("buTeiDesc", params.name,true);
        });
      }
      
    },
  },
};
</script>
<style scoped>
</style>