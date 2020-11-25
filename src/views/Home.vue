<template>
  <div id="main">
    <earth-map></earth-map>
    <header>
      <div class="datePicker">
        <el-date-picker v-model="year"  format="yyyy 年"
      value-format="yyyy" type="year" @blur="datePicker" placeholder="选择年">
      </el-date-picker>
      </div>
      <div class="fr p10" style="position: relative;bottom: 20px;">
        欢迎您登录 &nbsp;&nbsp;
        <span><i class="el-icon-switch-button blue"></i></span>
      </div>
      <h3 class="tc" @click="flayEarth()">{{ title }}</h3>
    </header>
    <div class="container">
      <div class="left">
        <title-box :title="titleBox1"></title-box>
        <p class="p20">全省县区：<b class="f30">{{total}}</b>个</p>
        <pie-chart v-if="fugai" :pieData="pie1"></pie-chart>
        <title-box :title="titleBox2"></title-box>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="发放资金" name="1" :key='activeName'>
            <div class="box">
              <bar-chart v-if="flag" :barData="bar"></bar-chart>
            </div>
          </el-tab-pane>
          <el-tab-pane label="发放人次" name="2" :key='activeName + "1"'>
            <div class="box"> 
              <bar-chart v-if="flag" :barData="bar1"></bar-chart>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="right">
        <title-box :title="titleBox3"></title-box>
        <el-select v-model="typeValue" class="selectInput" placeholder="请选择补贴类型" @change="selectType">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item.rebateType"
            :value="item.rebateType">
          </el-option>
        </el-select>
        <div class="rank">
          <ul>
            <li v-for="(item,index) in rankData" :key="index">
              <span :class="{color1:index==0,color2:index==1,color3:index==2}">{{index+1}}</span>
              <span>{{item.areaName}}</span>
              <span>{{item.totalMoney}}万元</span>
              <span>{{item.totalCount}} 笔</span>
            </li>
          </ul>
        </div>
        <title-box :title="titleBox4"></title-box>
        <el-tabs v-model="activeNameArea" type="card" @tab-click="handleClickArea">
          <el-tab-pane label="发放资金" name="1" :key='activeNameArea'>
            <bar-chart v-if="quyuFlag"  :barData="bar2"></bar-chart>
          </el-tab-pane>
          <el-tab-pane label="发放人次" name="2" :key='activeNameArea+"1"'>
            <bar-chart :barData="bar3" ></bar-chart>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="top">
        <ul>
          <li v-for="(item,index) in totalData" :key="index" @click="alertBox(index)">
            <span>{{item.name}}</span>
            <p class="p10" >
              <span>{{item.num}}</span>&nbsp;&nbsp;{{item.unit}}
            </p>
          </li>
        </ul>
      </div>
      <el-dialog
        :title="boxTitle"
        :visible.sync="buTieDesc"
        destroy-on-close
        width="40%">
        <ul class="boxUl">
          <li v-for="(item,index) in getAreaBonusDetail" :key="index">
            <img src="../assets/loginOut.svg" alt="">
            <span>{{item.title}}</span>
            <span>{{item.value}}</span>
          </li>
          <div class="clear"></div>
        </ul>
        <title-box style="background-size:inherit;margin-top:20px" :title="titleBox5"></title-box>
        <bar-charts v-if="descFlag" :barData="bar4"></bar-charts>
      </el-dialog>
      <el-dialog
        title="主管部门"
        :visible.sync="depBox"
        destroy-on-close
        width="30%">
        <el-table :data="depData" height="500px">
          <el-table-column property="name" label="主管部门" ></el-table-column>
          <el-table-column property="value" label="补贴类型数" width="120" align="center"></el-table-column>
          <el-table-column property="totalCount" label="发放金额（万元）" width="150" align="center"></el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog
        title="银行发放资金占比"
        :visible.sync="bankBox"
        destroy-on-close
        width="20%">
        <pie-charts v-if="bankFlag" :pieData="pie2"></pie-charts>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import TitleBox from "./title";
import PieChart from "../components/pieChart"
import PieCharts from "../components/pieCharts"
import EarthMap from "../components/earthMap"
import BarChart from "../components/barChart"
import BarCharts from "../components/barCharts"
import {earthClient} from '@/api/public.js';
import {StatisticalReq} from '@/api/earth/earth_message_pb.js'
export default {
  components: {
    TitleBox,
    EarthMap,
    PieChart,
    PieCharts,
    BarChart,
    BarCharts
  },
  data() {
    return {
      year: '2020 年',
      adcode:'14',
      type:'area', //bank  organ
      flag:false, //初始化为false,拿到数据为true
      quyuFlag:false,
      fugai:false,
      descFlag:false,
      bankFlag:false,
      title: "惠民惠农财政补贴资金“一卡通”",
      titleBox1: "覆盖区域",
      titleBox2: "补贴发放",
      titleBox3: "发放资金排行榜",
      titleBox4: "区域发放",
      titleBox5: "区域发放情况",
      total:0,  //覆盖区县
      activeName:"1",
      activeNameArea:"1",
      pie1:{
        id:"pieChart1",
        height:'200px',
        data1:0,
        data2:0,
        text1:0,
        text2:0
      },
      pie2:{
        id:"pieChart2",
        height:'200px',
        data:[],
      },
      bar:{
        id:"barChart",
        height:'800px',
        dataX:[],
        dataY:[],
        unit:'万元'
      },
      bar1:{
        id:"barChart1",
        height:'800px',
        dataX:[],
        dataY:[],
        unit:'个'
      },
      bar2:{
        id:"barChart2",
        height:'800px',
        dataX:[],
        dataY:[],
        unit:'万元'
      },
      bar3:{
        id:"barChart3",
        height:'800px',
        dataX:[],
        dataY:[],
        unit:'个'
      },
      bar4:{
        id:"barChart4",
        height:'400px',
        dataX:[],
        dataY:[],
        dataZ:[],
        unit:'万元'
      },
      options: [],
      typeValue: '',
      rankData:[],
      totalData:[
        {name:'覆盖区县',num:0,unit:'个'},
        {name:'发放金额',num:0,unit:'万元'},
        {name:'补贴类型',num:0,unit:'个'},
        {name:'受益人口',num:0,unit:'人'},
        {name:'代发银行',num:0,unit:'个'},
        {name:'主管部门',num:0,unit:'个'},
      ],
      buTieDesc:false,
      boxTitle:null,
      getAreaBonusDetail:[  //补贴发放详情头部
        {title:'发放资金',value:0},
        {title:'发放人次',value:0},
        {title:'覆盖区县',value:0},
        {title:'发放笔数',value:0}
      ],
      depBox:false,
      depData: [],
      bankBox:false,

    };
  },
  watch:{
    year:function(value){
      let earthReq = new StatisticalReq();
      earthReq.setStatisticalCode(this.adcode)
      earthReq.setStatisticalYear(this.year.substr(0,4))
      earthReq.setStatisticalType(this.type)
      this.flag = false;
      this.quyuFlag = false;
      this.fugai = false;
      this.descFlag = false;
      this.coverArea(earthReq)
      this.getTotal(earthReq);
      this.getRank(earthReq);
      this.getType(earthReq);
      this.subsidyList(earthReq);
      this.areaList(earthReq);
    },
  },
  mounted() {
    let earthReq = new StatisticalReq();
    earthReq.setStatisticalCode(this.adcode)
    earthReq.setStatisticalYear(this.year.substr(0,4))
    earthReq.setStatisticalType(this.type)
    // earthReq.setStatisticalName(name)

    this.coverArea(earthReq)
    this.getTotal(earthReq);
    this.getRank(earthReq);
    this.getType(earthReq);
    this.subsidyList(earthReq);
    this.areaList(earthReq);
    Bus.$on('buTeiDesc',(name,state)=>{
      this.buTieDesc = state;
      this.boxTitle = name;
      earthReq.setStatisticalType(name)
      this.getAreaBonusDetailData(earthReq)
      this.getAreaSubsidyData(earthReq)
    })
  },
  methods: {
    flayEarth(state){
      Bus.$emit('aa')
    },
    datePicker(value){
      this.year = value.picker.year + '年'
    },
    numFormat(num) {
      var c = (num.toString().indexOf ('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      this.totalData[1].num = c
    },
    // 统计数据
    getTotal(params){
      earthClient.getStatisticsData(params).then(response =>{
        let data = response.toObject();
        this.totalData.forEach((item,index) =>{
          if(index == 0){
            item.num = data.coverArea
          }else if(index == 1){
            item.num = data.totalMoney == '' ? 0 :data.totalMoney
          }else if(index == 2){
            item.num = data.totalRebate    //totalRebate
          }else if(index == 3){
            item.num = data.totalPerson
          }else if(index == 4){
            item.num = data.totalBank
          }else if(index == 5){
            item.num = data.totalOrgan
          }
        })
      })
    },
    // 发放资金排行榜
    getRank(params){
      this.rankData = [];
      earthClient.getBonusRankData(params).then(response =>{
        this.rankData = response.toObject().bonusResList.slice(0,5);
      })
    },
    // 补贴类型
    getType(params){
      earthClient.getRebatesListByRegionCode(params).then(response =>{
        this.options = response.toObject().bonusResList;
      })
    },
    // 补贴类型选择
    selectType(value){
      let earthReq = new StatisticalReq();
      earthReq.setStatisticalCode(this.adcode)
      earthReq.setStatisticalYear(this.year)
      earthReq.setStatisticalType(value)
      this.getRank(earthReq)
    },
    // 补贴发放
    subsidyList(params){
      this.bar.dataY = [];
      this.bar.dataX = [];
      this.bar1.dataY = [];
      this.bar1.dataX = [];
      earthClient.getBonusSubsidyAllData(params).then(response =>{
        var data = response.toObject();
        data.moneyResList.forEach((item,index) =>{
          this.bar.dataY.push(item.rebateType)
          this.bar.dataX.push(Number(item.totalMoney))
        })
        data.countResList.forEach((item,index) =>{
          this.bar1.dataY.push(item.rebateType)
          this.bar1.dataX.push(Number(item.totalCount))
        })
        this.flag = true;
      })
    },
    // 区域发放
    areaList(params){
      earthClient.getAreaSubsidyAllData(params).then(response =>{
        var data = response.toObject();
        this.bar2.dataY = [];
        this.bar2.dataX = [];
        this.bar3.dataY = [];
        this.bar3.dataX = [];
        data.moneyResList.length < 5 ? this.bar2.height = '200px' : this.bar2.height = '600px'
        data.countResList.length < 5 ? this.bar3.height = '200px' : this.bar3.height = '600px'
        data.moneyResList.forEach((item,index) =>{
          this.bar2.dataY.push(item.areaName)
          this.bar2.dataX.push(Number(item.totalMoney))
        })
        data.countResList.forEach((item,index) =>{
          this.bar3.dataY.push(item.areaName)
          this.bar3.dataX.push(Number(item.totalCount))
        })
        this.quyuFlag = true;
      })
    },
    // 覆盖区域
    coverArea(params){
      earthClient.getGraphicStatistics(params).then(response =>{
        var data = response.toObject();
        this.total = Number(data.graphicStatisticsList[0].value) + Number(data.graphicStatisticsList[1].value)
        data.graphicStatisticsList.forEach((item,index)=>{
          if(index == 0){
            this.pie1.data1 = (Number(item.value)/this.total*100).toFixed(2);
            this.pie1.text1 = "覆盖区县："+ item.value + '个';
          }else{
            this.pie1.data2 = parseInt(100-this.pie1.data1);
            this.pie1.text2 = "未覆盖区县："+ item.value + '个';
          }
        })
        this.fugai = true;
      })
    },
    // 补贴发放详情头部
    getAreaBonusDetailData(params){
      console.log(params.toObject())
      earthClient.getAreaBonusDetailData(params).then(response =>{
        let data = response.toObject();
        this.getAreaBonusDetail = [  //补贴发放详情头部
          {title:'发放资金',value:data.totalMoney},
          {title:'发放人次',value:data.totalPerson},
          {title:'覆盖区县',value:data.coverArea},
          {title:'发放笔数',value:data.totalRebate}
        ]
      })
    },
    // 补贴发放详情
    getAreaSubsidyData(params){
      this.descFlag = false
      earthClient.getAreaSubsidyData(params).then(response =>{
        this.descFlag = true
        let data = response.toObject();
        this.bar4.dataY = [];
        this.bar4.dataX = [];
        this.bar4.dataZ = [];
        data.bonusResList.forEach((item,index) =>{
          this.bar4.dataY.push(item.areaName)
          this.bar4.dataX.push(item.totalMoney)
          this.bar4.dataZ.push(item.totalCount)
        })
        console.log(111,this.bar4)
        
      })
    }, 
    alertBox(index){
      let earthReq = new StatisticalReq();
      earthReq.setStatisticalCode(this.adcode)
      earthReq.setStatisticalYear(this.year.substr(0,4))
      
      if(index == 4){
        this.bankBox = true
        earthReq.setStatisticalType('bank')
        earthClient.getGraphicStatistics(earthReq).then(response =>{
          var data = response.toObject();
          this.pie2.data = data.graphicStatisticsList
          this.bankFlag = true;
        })
      }else if(index == 5){
        this.depBox = true
        earthReq.setStatisticalType('organ')
        earthClient.getGraphicStatistics(earthReq).then(response =>{
          var data = response.toObject().graphicStatisticsList;
          this.depData = data
        })
      }
     
    } ,
    // 补贴发放列表
    handleClick(tab, event) {
      // console.log(111,tab.name);
    },
    handleClickArea(tab, event) {
      // console.log('区域发放列表',tab.name);
    },
  },
};
</script>
<style scoped>
  .p10{
    padding: 10px;
  }
  .clear{
    clear: both;
  }
  #main {
    position: relative;
    width: 100%;
    height: 100%;
  }
  header{
    width: 100%;
    height: 100px;
    /* background: url("../assets/headerBackground.svg") no-repeat top center; */
    background: url("../assets/header.png") no-repeat top center;
    background-size: contain;
    position: fixed;
    left: 0;
    top: 0;
  }
  h3 {
    font-family: 'alhyznh';
    font-size: 28px;
    letter-spacing: 4px;
    padding-left: 9%;
    /* color: antiquewhite; */
    background: linear-gradient(to right, #2968E8, #72E6FF);
    -webkit-background-clip: text;
    color: transparent;
    cursor: pointer;
    position: relative;
    top: -20px;
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
    /* background-color: rgba(55, 100, 171,.3); */
    background-color: rgba(0, 0, 0,.3);
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
    background-color: rgba(0, 0, 0,.3);
    /* background-color: rgba(55, 100, 171,.3); */
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
  .rank{
    height: 230px;
    overflow: auto;
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
    padding: 0 8px;
  }
  .top{
    width: 100%;
    position:absolute;
    top: 14%;
    left: 400px;
  }
  .top ul{
    width: 100%;
    text-align: center;
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
  .box{
    height: 450px;
    overflow: auto;
  }
  .datePicker{
    position: relative;
    top: 18%;
  }
  .boxUl li{
    width: 20%;
    padding: 10px;
    margin:0 5px;
    float: left;
    border:1px solid #ffd66c;
    border-radius: 4px;
  }
  .boxUl li img{
    float: left;
  }
  .boxUl li span{
    padding-left: 50px;
    display: block;
  }
  .boxUl li span:last-child{
    padding-top: 10px;
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
  .el-dialog{
    background: linear-gradient(90deg, rgba(41, 104, 232, 0.7) 0%, rgba(0, 210, 255, 0) 100%);
    border: 1px solid #00B1FF;
    border-radius: 4px;
    color: #fff;
  }
  .el-dialog__title,.el-dialog__body{
    color: #fff;
  }
  .el-table ,.el-table--fit ,.el-table th, .el-table tr{
    color: #fff;
    background: rgba(0, 0, 0, 0.1);
  }
  .el-table tbody tr:hover>td { 
    background-color:rgba(0, 0, 0, 0.1)!important
  }
  .el-table th:hover, .el-table tr:hover td{
    background:none;
  }
</style>