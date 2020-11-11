<template>
  <div id="main">
    <earth-map></earth-map>
    <header>
      <el-date-picker v-model="year" type="year" placeholder="选择年">
      </el-date-picker>
      <div class="fr p10">
        欢迎您登录 &nbsp;&nbsp;
        <span><i class="el-icon-switch-button blue"></i></span>
      </div>
      <h3 class="tc">{{ title }}</h3>
    </header>
    <div class="container">
      <div class="left">
        <title-box :title="titleBox1"></title-box>
        <p class="p20">全省县区：<b class="f30">{{total}}</b>个</p>
        <pie-chart :pieData="pie1"></pie-chart>
        <title-box :title="titleBox2"></title-box>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="发放资金" name="1" :key='activeName'>
              <bar-chart :barData="bar"></bar-chart>
          </el-tab-pane>
          <el-tab-pane label="发放人次" name="2" :key='activeName'>
            <bar-chart :barData="bar1"></bar-chart>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="right">
        <title-box :title="titleBox3"></title-box>
        <el-select v-model="value" class="selectInput" placeholder="请选择补贴类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="rank">
          <ul>
            <li v-for="(item,index) in rankData" :key="index">
              <span :class="{color1:index==0,color2:index==1,color3:index==2}">{{index+1}}</span>
              <span>{{item.name}}</span>
              <span>{{item.pay}} 万元</span>
              <span>{{item.num}} 笔</span>
            </li>
          </ul>
        </div>
        <title-box :title="titleBox4"></title-box>
        <el-tabs v-model="activeNameArea" type="card" @tab-click="handleClickArea">
          <el-tab-pane label="发放资金" name="1" :key='activeNameArea'>
              <bar-chart :barData="bar2"></bar-chart>
          </el-tab-pane>
          <el-tab-pane label="发放人次" name="2" :key='activeNameArea'>
            <bar-chart :barData="bar3" ></bar-chart>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="top">
        <ul>
          <li v-for="(item,index) in totalData" :key="index">
            <span>{{item.name}}</span>
            <p class="p10"><span>{{item.num}}</span>&nbsp;&nbsp;{{item.unit}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import TitleBox from "./title";
import PieChart from "../components/pieChart"
import EarthMap from "../components/earthMap"
import BarChart from "../components/barChart"
export default {
  components: {
    TitleBox,
    EarthMap,
    PieChart,
    BarChart
  },
  data() {
    return {
      year: "",
      title: "惠民惠农财政补贴资金“一卡通”",
      titleBox1: "覆盖区域",
      titleBox2: "补贴发放",
      titleBox3: "发放资金排行榜",
      titleBox4: "区域发放",
      total:117,
      activeName:"1",
      activeNameArea:"1",
      pie1:{
        id:"pieChart1",
        height:'200px',
        data1:80,
        data2:10
      },
      bar:{
        id:"barChart",
        height:'400px',
        dataX:[239,181,154,144,135,117,29,181,154,144],
        dataY:["农机购置","党员补贴","儿童补贴","低保补贴","伤残补贴","优抚补贴","低保补贴","伤残补贴","优抚补贴","农机购置"]
      },
      bar1:{
        id:"barChart1",
        height:'400px',
        dataX:[29,181,154,144,135,117,29,181,154,144],
        dataY:["党员补贴","农机购置","儿童补贴","低保补贴","伤残补贴","优抚补贴","低保补贴","伤残补贴","优抚补贴","农机购置"]
      },
      bar2:{
        id:"barChart2",
        height:'400px',
        dataX:[29,181,154,144,135,117,29,181,154,144],
        dataY:["吕梁市","太原市","运城市","忻州市","阳泉市","临汾市","低保补贴","伤残补贴","优抚补贴","农机购置"]
      },
      bar3:{
        id:"barChart3",
        height:'400px',
        dataX:[99,181,154,144,135,117,29,181,154,144],
        dataY:["党员补贴","农机购置","儿童补贴","低保补贴","伤残补贴","优抚补贴","低保补贴","伤残补贴","优抚补贴","农机购置"]
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      rankData:[
        {
          name:'吕梁市',
          pay:90,
          num:10
        },
        {
          name:'太原市',
          pay:40,
          num:100
        },
        {
          name:'忻州市',
          pay:10,
          num:6
        },
        {
          name:'晋城市',
          pay:10,
          num:5
        },
        {
          name:'介休市',
          pay:50,
          num:1
        },
      ],
      totalData:[
        {name:'覆盖区县',num:35,unit:'个'},
        {name:'发放金额',num:9123,unit:'万元'},
        {name:'补贴类型',num:14,unit:'个'},
        {name:'受益人口',num:520,unit:'人'},
        {name:'代发银行',num:5,unit:'个'},
        {name:'主管部门',num:8,unit:'个'},
      ]
    };
  },
  mounted() {
    // const vm = this;
    // vm.$nextTick(()=>{})
    console.log(this.numFormat(this.totalData[1].num))
  },
  methods: {
    numFormat(num) {
        var c = (num.toString().indexOf ('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        this.totalData[1].num = c
        return c;
    },
    handleClick(tab, event) {
      console.log(111,tab.name);
    },
    handleClickArea(tab, event) {
      console.log(111,tab.name);
    },
  },
};
</script>
<style scoped>
  #main {
    position: relative;
    width: 100%;
    height: 100%;
  }
  header{
    width: 100%;
    height: 110px;
    background: url("../assets/headerBackground.svg") no-repeat top center;
    background-size: cover;
    position: fixed;
    left: 0;
    top: 0;
  }
  h3 {
    font-family: 'alhyznh';
    font-size: 28px;
    letter-spacing: 4px;
    /* color: antiquewhite; */
    background: linear-gradient(to right, #2968E8, #72E6FF);
    -webkit-background-clip: text;
    color: transparent;
  }
  .container{
    width: 100%;
    height: 100%;
  }
  .el-tabs__content{
    height: 500px;
    overflow: auto;
  }
  .left{
    width: 320px;
    height: 100%;
    background-color: rgba(55, 100, 171,.3);
    /* box-shadow: 2px 0px 28px 0px rgba(55, 100, 171,.8); */
    position: absolute;
    top: 8%;
    left: 0;
  }
  .right{
    width: 320px;
    height: 100%;
    position: absolute;
    top: 8%;
    right: 0;
    background-color: rgba(55, 100, 171,.3);
  }
  .rank ul li{
    padding: 0 10px;
    height: 35px;
    line-height: 35px;
    margin: 8px;
    background: linear-gradient(90deg, rgba(0, 43, 144, 0) 0%, rgba(0, 125, 203, 0.51) 100%);
  }
  .color1{
    background: #FF3C3C;
    border: 1px solid #BC0000;
  }
  .color2{
    background: #FF8122;
    border: 1px solid #E3861C;
  }
  .color3{
    background: #F0DE40;
    border: 1px solid #FFBB52;
  }
  .rank ul li span:first-child{
    display: inline-block;
    width: 22px;
    height: 22px;
    text-align: center;
    line-height: 22px;
    border-radius: 50%;
  }
  .rank ul li span:not(:first-child){
    display: inline-block;
    text-align: center;
    width: 25%;
    /* padding: 0 15px; */
  }
  .top{
    width: 100%;
    position:absolute;
    top: 14%;
    left: 400px;
  }
  .top ul{
    width: 100%;
  }
  .top ul li{
    width: 9%;
    float: left;
  }
  .top ul li span{
    font-size: 18px;
    
  }
  .top ul li p{
    color: rgba(255, 214, 108, 1);
  }
  .top ul li p span{
    display: inline-block;
    font-size: 40px!important;
    font-family: 'number';
  }

  
</style>
<style>
  .el-input__inner{
    background: rgba(0, 66, 142, 0.5);
    border: 1px solid #00B1FF;
    border-radius: 4px;
    color: #fff;
  }
  .selectInput .el-input__inner{
    width: 300px;
    margin-left: 10px;
  }
  .el-date-editor.el-input{
    
  }
</style>