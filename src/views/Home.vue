<template>
  <div id="main">
    <earth-map :params="paramsData" style="margin-top:94px"></earth-map>
    <header>
      <div class="datePicker">
        <el-date-picker v-model="year"  format="yyyy 年"
      value-format="yyyy" type="year" @blur="datePicker" placeholder="选择年">
      </el-date-picker>
      </div>
      <!-- <div class="fr p10" style="position: relative;bottom: 32px;">
        <span style="padding-top:10px ">欢迎您登录 &nbsp;&nbsp;</span>
        <img src="../assets/loginOut.svg" style="position: relative;top: 5px;" alt="">
      </div> -->
      <h3 class="tc titleFont" @click="flayEarth()">{{ title }}</h3>
      <img class="light" src="../assets/light.png" alt="">
    </header>
    <div class="container">
      <div class="left">
        <title-box :title="titleBox1"></title-box>
        <p class="p20">全省县区：<b class="f30">{{total}}</b>个</p>
        <pie-chart v-if="fugai" :pieData="pie1"></pie-chart>
        <title-box :title="titleBox2"></title-box>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="发放金额" name="1" :key='activeName'>
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
        <el-select v-model="typeValue" class="selectInput" placeholder="请选择补贴项目" @change="selectType">
          <el-option value="">全部</el-option>
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item.rebateType"
            :value="item.rebateId">
          </el-option>
        </el-select>
        <div class="rank">
          <ul>
            <li v-for="(item,index) in rankData" :key="index">
              <span :class="{color1:index==0,color2:index==1,color3:index==2}">{{index+1}}</span>
              <span>{{item.areaName}}</span>
              <span>{{item.totalCount}} 笔</span>
              <span>{{item.totalMoney}}万元</span>
            </li>
          </ul>
        </div>
        <title-box :title="titleBox4"></title-box>
        <!-- <el-tabs v-model="activeNameArea" type="card" @tab-click="handleClickArea">
          <el-tab-pane label="发放资金" name="1" :key='activeNameArea'>
            <bar-chart v-if="quyuFlag"  :barData="bar2"></bar-chart>
          </el-tab-pane>
          <el-tab-pane label="发放人次" name="2" :key='activeNameArea+"1"'>
            <bar-chart :barData="bar3" ></bar-chart>
          </el-tab-pane>
        </el-tabs> -->
        <div class="dep">
          <ul>
            <template v-for="(item,index) in depList" >
              <span v-show="index == currentIndex" class="popName" >{{item.organName}}</span>
              <li :key="index">
                <span :class="{color1:index==0,color2:index==1,color3:index==2}">{{index+1}}</span>
                <span @mouseover="mouseOver(index,item.organName)">{{item.organName.substr(0,5)}}</span>
                <span>{{item.totalCount}} 笔</span>
                <span>{{item.totalMoney}}万元</span>
              </li>
            </template>
          </ul>
        </div>
      </div>
      <div class="top">
        <ul>
          <li v-for="(item,index) in totalData" :key="index" @click="alertBox(index)">
            <img class="helpIcon" v-show="index == 1 || index ==3" src="../assets/icon.png" alt="">
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
        width="42%" style="margin-top:4%">
        <ul class="boxUl">
          <li v-for="(item,index) in getAreaBonusDetail" :key="index">
            <img :src="require('../assets/icon'+index+'.svg')" alt="">
            <span>{{item.title}}</span>
            <span>{{item.value}}</span>
          </li>
          <div class="clear"></div>
        </ul>
        <!-- <title-box style="background-size:inherit;margin-top:20px" :title="titleBox5"></title-box> -->
        <p class="boxTitle">区域发放情况 <img src="../assets/icon5.png" alt=""></p>
        <bar-charts v-if="descFlag" :barData="bar4"></bar-charts>
      </el-dialog>
      <el-dialog
        title="主管部门"
        :visible.sync="depBox"
        destroy-on-close
        width="35%"  style="margin-top:4%">
        <el-table :data="depData" height="500px">
          <el-table-column property="name" label="主管部门" ></el-table-column>
          <el-table-column property="value" label="补贴项目数" width="120" align="center"></el-table-column>
          <el-table-column property="totalCount" label="发放金额（万元）" width="150" align="right"></el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog
        title="银行发放金额占比"
        :visible.sync="bankBox"
        destroy-on-close
        width="22%" style="margin-top:8%">
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
      year: new Date().getFullYear()+' 年',
      paramsData:{
        year:new Date().getFullYear(),
        adcode:'14'
      },
      adcode:'14',
      type:'area', //bank  organ
      rebateId:'',
      flag:false, //初始化为false,拿到数据为true
      quyuFlag:false,
      fugai:false,
      descFlag:false,
      bankFlag:false,
      flayTo:true,
      title: "惠民惠农财政补贴资金“一卡通”",
      titleBox1: "覆盖区域",
      titleBox2: "补贴项目（万元）",
      titleBox3: "发放金额统计",
      titleBox4: "部门统计",
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
        height:'600px',
        dataX:[],
        dataY:[],
        rebateIds:[],
        unit:'万元'
      },
      bar1:{
        id:"barChart1",
        height:'600px',
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
        {name:'主管部门',num:0,unit:'个'},
        {name:'补贴项目',num:0,unit:'个'},
        {name:'代发银行',num:0,unit:'个'},
        {name:'受益人口',num:0,unit:'人'},
        {name:'发放金额',num:0,unit:'万元'},
      ],
      buTieDesc:false,
      boxTitle:null,
      getAreaBonusDetail:[  //补贴发放详情头部
        {title:'覆盖区县',value:0},
        {title:'发放人次',value:0},
        {title:'发放笔数',value:0},
        {title:'发放金额',value:0}
      ],
      depBox:false,
      depData: [],
      bankBox:false,
      depList:[],
      subsidyListId:[],
      currentIndex:null
    };
  },
  watch:{
    year:function(value){
      let earthReq = new StatisticalReq();
      earthReq.setStatisticalCode(this.adcode)
      earthReq.setStatisticalYear(this.year.substr(0,4))
      earthReq.setStatisticalType(this.type)
      earthReq.setStatisticalId(this.rebateId)
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
      this.getDepList(earthReq)
    },
    adcode:function(newVal,oldVal){
      let earthReq = new StatisticalReq();
      earthReq.setStatisticalCode(this.adcode)
      earthReq.setStatisticalYear(this.year.substr(0,4))
      earthReq.setStatisticalType(this.type)
      this.flag = false;
      this.quyuFlag = false;
      // this.fugai = false;
      this.descFlag = false;
      // this.coverArea(earthReq)
      this.getTotal(earthReq);
      // this.getRank(earthReq);
      this.getType(earthReq);
      this.subsidyList(earthReq);
      this.areaList(earthReq);
      this.getDepList(earthReq);
      this.totalData[0].name = '覆盖乡镇'
    },
    flayTo:function(value){
      let earthReq = new StatisticalReq();
      this.adcode = '14'
      earthReq.setStatisticalCode(this.adcode)
      earthReq.setStatisticalYear(this.year.substr(0,4))
      earthReq.setStatisticalType(this.type)
      this.flag = false;
      this.quyuFlag = false;
      // this.fugai = false;
      this.descFlag = false;
      this.coverArea(earthReq)
      this.getTotal(earthReq);
      // this.getRank(earthReq);
      this.getType(earthReq);
      this.subsidyList(earthReq);
      this.areaList(earthReq);
      this.getDepList(earthReq);
    }
  },
  mounted() {
    let earthReq = new StatisticalReq();
    earthReq.setStatisticalCode(this.adcode)
    earthReq.setStatisticalYear(this.year.substr(0,4))
    earthReq.setStatisticalType(this.type)
    earthReq.setStatisticalId(this.rebateId)

    this.coverArea(earthReq)
    this.getTotal(earthReq);
    this.getRank(earthReq);
    this.getType(earthReq);
    this.subsidyList(earthReq);
    this.areaList(earthReq);
    this.getDepList(earthReq);

    Bus.$on('buTeiDesc',(name,index,state)=>{
      this.buTieDesc = state;
      this.boxTitle = name;
      this.rebateId = this.subsidyListId[index].rebateId
      earthReq.setStatisticalId(this.rebateId)
      this.getAreaBonusDetailData(earthReq)
      this.getAreaSubsidyData(earthReq)
    }),
    Bus.$on("child-to-parent",(code)=>{
      this.adcode = code
      earthReq.setStatisticalCode(code);
    })
  },
  methods: {
    flayEarth(){
      Bus.$emit('flayToMap');
      this.flayTo = !this.flayTo
    },
    datePicker(value){
      this.year = value.picker.year + '年'
      this.paramsData = {
        year: value.picker.year
      }
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
            item.num = data.totalOrgan
          }else if(index == 2){
            item.num = data.totalRebate    //totalRebate
          }else if(index == 3){
            item.num = data.totalBank
          }else if(index == 4){
            item.num = data.totalPerson
          }else if(index == 5){
            item.num = data.totalMoney == '' ? 0 :data.totalMoney
          }
        })
      })
    },
    // 发放资金排行榜
    getRank(params){
      this.rankData = [];
      earthClient.getBonusRankData(params).then(response =>{
        this.rankData = response.toObject().bonusResList;
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
      this.rebateId = value
      let earthReq = new StatisticalReq();
      earthReq.setStatisticalCode(this.adcode)
      earthReq.setStatisticalYear(this.year.substr(0,4))
      earthReq.setStatisticalId(value)
      this.getRank(earthReq)
    },
    // 补贴发放
    subsidyList(params){
      earthClient.getBonusSubsidyAllData(params).then(response =>{
        var data = response.toObject();
        data.moneyResList.length > 4 ? this.bar.height = '600px' : this.bar.height = '200px'
        data.countResList.length > 4 ? this.bar1.height = '600px' : this.bar1.height = '200px'
        data.moneyResList.length > 2 ? this.bar.height = '600px' : this.bar.height = '100px'
        data.countResList.length > 2 ? this.bar1.height = '600px' : this.bar1.height = '100px'
        this.bar.dataY=[];
        this.bar.dataX = [];
        this.bar1.dataY = [];
        this.bar1.dataX = [];
        data.moneyResList.forEach((item,index) =>{
          this.bar.dataY.push(item.rebateType)
          this.bar.dataX.push(Number(item.totalMoney))
          this.bar.rebateIds.push(item.rebateId)
        })
        data.countResList.forEach((item,index) =>{
          this.bar1.dataY.push(item.rebateType)
          this.bar1.dataX.push(Number(item.totalCount))
        })
        this.subsidyListId = data.moneyResList
        this.$forceUpdate();
        this.flag = true;
      })
    },
    // 区域发放
    areaList(params){
      earthClient.getAreaSubsidyAllData(params).then(response =>{
        this.quyuFlag = true;
        var data = response.toObject();
        this.bar2.dataY = [];
        this.bar2.dataX = [];
        this.bar3.dataY = [];
        this.bar3.dataX = [];
        data.moneyResList.length <= 5 ? this.bar2.height = '200px' : this.bar2.height = '400px'
        data.countResList.length <= 5 ? this.bar3.height = '200px' : this.bar3.height = '400px'
        data.moneyResList.length < 2 ? this.bar2.height = '100px' : this.bar2.height = '400px'
        data.countResList.length < 2 ? this.bar3.height = '100px' : this.bar3.height = '400px'
        data.moneyResList.forEach((item,index) =>{
          this.bar2.dataY.push(item.areaName)
          this.bar2.dataX.push(Number(item.totalMoney))
        })
        data.countResList.forEach((item,index) =>{
          this.bar3.dataY.push(item.areaName)
          this.bar3.dataX.push(Number(item.totalCount))
        })
        
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
      earthClient.getAreaBonusDetailData(params).then(response =>{
        let data = response.toObject();
        this.getAreaBonusDetail = [  //补贴发放详情头部
          {title:'覆盖区县(个)',value:data.coverArea},
          {title:'发放人次(个)',value:data.totalPerson},
          {title:'发放笔数(笔)',value:data.totalRebate},
          {title:'发放金额(万元)',value:data.totalMoney},
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
      })
    }, 
    alertBox(index){
      let earthReq = new StatisticalReq();
      earthReq.setStatisticalCode(this.adcode)
      earthReq.setStatisticalYear(this.year.substr(0,4))
      
      if(index == 3){
        this.bankBox = true
        earthReq.setStatisticalType('bank')
        earthClient.getGraphicStatistics(earthReq).then(response =>{
          var data = response.toObject();
          this.pie2.data = data.graphicStatisticsList
          this.bankFlag = true;
        })
      }else if(index == 1){
        this.depBox = true
        earthReq.setStatisticalType('organ')
        earthClient.getGraphicStatistics(earthReq).then(response =>{
          var data = response.toObject().graphicStatisticsList;
          this.depData = data
        })
      }
     
    } ,
    // 部门排行榜
    getDepList(params){
      earthClient.getOrganBonusRankData(params).then(response =>{
        this.depList = response.toObject().bonusResList;
      })
    },
    // 补贴发放列表
    handleClick(tab, event) {
      tab.name == '1' ? this.titleBox2 = '补贴项目（万元）' : this.titleBox2 = '补贴项目（个）'
    },
    // 移入移出
    mouseOver(index,name){
      if(name.length > 6){
        this.currentIndex = index
      }else{
        this.currentIndex = null
      }
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
    z-index: 2;
  }
  h3 {
    font-family: 'Microsoft YaHei';
    font-size: 32px;
    /* letter-spacing: 4px; */
    padding-left: 9%;
    font-weight: 700;
    color:#E60012;
    /* color: antiquewhite; */
    /* background: linear-gradient(to bottom, #72E6FF ,  #2968E8);
    -webkit-background-clip: text;
    color: transparent; */
    cursor: pointer;
    position: relative;
    top: -20px;
    left: 17%;
    width: 50%;
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
    /* width: 340px; */
    width: 18%;
    height: 100%;
    background: rgb(10, 30, 60);
    /* background-color: rgba(0, 0, 0,.3); */
    /* box-shadow: 2px 0px 28px 0px rgba(55, 100, 171,.8); */
    position: absolute;
    top: -2%;
    left: 0;
  }
  .right{
    /* width: 320px; */
    width: 16.5%;
    height: 100%;
    position: absolute;
    top: -2%;
    right: 0;
    background: rgb(10, 30, 60);
    /* background-color: rgba(0, 0, 0,.3); */
    /* background-color: rgba(55, 100, 171,.3); */
  }
  .rank ul li,.dep ul li{
    padding: 0 10px;
    height: 35px;
    line-height: 35px;
    margin: 8px;
    background: linear-gradient(90deg, rgba(0, 43, 144, 0) 0%, rgba(0, 125, 203, 0.51) 100%);
  }
  .color1{
    background: #FF3C3C;
    /* border: 1px solid #BC0000; */
  }
  .color2{
    background: #FF8122;
    /* border: 1px solid #E3861C; */
  }
  .color3{
    background: #F0DE40;
    /* border: 1px solid #FFBB52; */
  }
  .rank{
    height: 230px;
    overflow: auto;
  }
   .dep{
    height: 480px;
    overflow: auto;
  }
  .rank ul li span:first-child,.dep ul li span:first-child{
    display: inline-block;
    width: 22px;
    height: 22px;
    text-align: center;
    line-height: 22px;
    border-radius: 50%;
  }
  .rank ul li span:nth-child(2),.dep ul li span:nth-child(2){
    display: block;
    width: 5rem;
    padding-left: 4px;
    text-align: left;
  }
  .rank ul li span:nth-child(3),.dep ul li span:nth-child(3){
    width: 3.125rem;
    text-align: right;
  }
  .rank ul li span:not(:first-child),.dep ul li span:not(:first-child){
    display: inline-block;
  }
  .rank ul li span:last-child,.dep ul li span:last-child{
    width: 6.25rem;
    text-align: right;
  }
  .top{
    width: 65.6%;
    position:absolute;
    top: -2%;
    left: 18%;
    background: rgb(10, 30, 60);
    padding-top: 1.5625rem;
  }
  .top ul{
    width: 100%;
    text-align: center;
  }
  .top ul li{
    width: 15%;
    float: left;
    cursor: pointer;
    padding: 1.25rem .625rem ;
  }
    /* .top ul li:nth-child(2){
      width: 10%;
    } */
  .top ul li span{
    font-size: 1.125rem;
  }
  .top ul li p{
    color: rgba(255, 214, 108, 1);
  }

  .top ul li p span{
    display: inline-block;
    font-size: 2.5rem!important;
    font-family: 'number';
  }
  .box{
    height: 450px;
    overflow: auto;
  }
  .datePicker{
    position: relative;
    top: 18%;
    padding-left: 10px;
  }
  .boxUl li{
    width: 20.5%;
    padding: 10px;
    margin:0 5px;
    float: left;
    background: rgba(255,255,255,0.1);
    /* border:1px solid #ffd66c; */
    border-radius: 4px;
  }
  .boxUl li img{
    float: left;
  }
  .boxUl li span{
    padding-left: 50px;
    display: block;
    color: #fff;
  }
  .boxUl li span:last-child{
    padding-top: 10px;
  }
  .helpIcon{
    width: 1.5625rem;
    position: absolute;
    margin-left: 7%;
    margin-top: -.6875rem;
  }
  .boxTitle{
    padding: 30px 0;
    color: #ffab2b;
    font-weight: 700;
  }
  .boxTitle img{
    padding-left: 20px;
  }
  .light{
    position: relative;
    left: 45%;
    top: -6px;
    transform: translateX(-50%);
    animation: topLight 4s infinite linear;
    animation-direction: alternate;
  }
  .popName{
    font-size: 14px;
    padding: 2px 10px;
    background: #083b59;
    color: #fff;
    position: absolute;
    display: inline-block;
    left: 27%;
    margin-top: -11px;
  }
  @keyframes topLight {
    0%{
      opacity: 1;
    }
    50%{
      margin-left: 105px;
      opacity: 1;
    }
    100%{
      margin-left: 205px;
      opacity: 1;
    }
  }
  
</style>
<style>
  .el-select{
    z-index: 10;
  }
  .el-input__inner{
    background: rgba(0, 66, 142, 0.5)!important;
    border: 1px solid #00B1FF;
    border-radius: 4px;
    color: #fff!important;
  }
  .selectInput .el-input__inner{
    width: 300px;
    margin-left: 10px;
  }
  .el-dialog{
    background: linear-gradient(top, #00316D 0%, #004F8F 100%)!important;;
    /* border: 1px solid #00B1FF; */
    border-radius: 4px;
    color: #fff;
    padding: 0 25px;
  }
  .el-dialog__title,.el-dialog__body{
    color: #fff;
  }
  .el-table ,.el-table--fit ,.el-table th, .el-table tr{
    color: #fff;
    background: rgba(0, 0, 0, 0)!important;
    border-bottom:1px dashed #ccc;
  }
  .el-table tbody tr:hover>td ,.el-table tbody tr>td{ 
    background-color:rgba(0, 0, 0, 0)!important;
    border-bottom:1px dashed #ccc;
  }
  .el-table th:hover, .el-table tr:hover td,.el-table th,.el-table tr{
    background:none!important;
  }
  .el-table th{
    color: #ffab2b;
    font-weight: 700;
  }
  .mapBox .el-dialog{
    /* background: linear-gradient(90deg, rgba(41, 104, 232, 0.8) 0%, rgba(0, 79, 143, .6) 100%); */
    position: absolute!important;
    right: 18%;
    bottom: 0;
  }
  .el-dialog__header{
    height: 33px;
    background: url('../assets/titleBackground.svg') no-repeat;
    background-size: contain;
    position: relative;
    left: -25px;
  }
  .el-dialog__title{
    position: relative;
    top: -11px;
    font-size: 16px;
    color: #FFF!important;
  }
  .el-dialog__headerbtn{
    right: -34px!important;
  }
  .el-dialog__headerbtn .el-dialog__close{
    color: #fff;
  }
</style>

