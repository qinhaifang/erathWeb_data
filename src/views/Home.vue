<template>
  <div id="main">
    <header>
      <div class="datePicker">
        <el-date-picker
          v-model="year"
          format="yyyy 年"
          value-format="yyyy"
          type="year"
          @blur="datePicker"
          placeholder="选择年"
        >
        </el-date-picker>
      </div>
      <h3 class="tc titleFont" @click="flayEarth()">{{ title }}</h3>
    </header>
    <div class="container">
      <div class="left">
        <title-box :title="titleBox1"></title-box>
        <p class="p20">
          全省县区：<b class="f30">{{ total }}</b
          >个
        </p>
        <pie-chart v-if="fugai" :pieData="pie1" :params="paramsData"></pie-chart>
        <title-box :title="titleBox2"></title-box>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="发放金额" name="1" :key="activeName">
            <div class="box">
              <bar-chart v-if="flag" :barData="bar"></bar-chart>
            </div>
          </el-tab-pane>
          <el-tab-pane label="发放人次" name="2" :key="activeName + '1'">
            <div class="box">
              <bar-chart v-if="flag" :barData="bar1"></bar-chart>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="center">
        <div class="top">
          <ul>
            <li
              v-for="(item, index) in totalData"
              :key="index"
              @click="alertBox(index)"
            >
              <img
                class="helpIcon"
                v-show="index == 0 || index == 1 || index == 2|| index == 3"
                src="../assets/icon.png"
                alt=""
              />
              <span>{{ item.name }}</span>
              <p class="p10">
                <span>{{ item.num }}</span
                >&nbsp;&nbsp;{{ item.unit }}
              </p>
            </li>
          </ul>
        </div>
        <div class="text" v-show="clickIn" @click="clickEarth()">点击进入</div>
        <div class="backBtn" v-show="!clickIn" @click="flayEarth()">返回</div>
        <earth-map :params="paramsData"></earth-map>
      </div>
      <div class="right">
        <title-box :title="titleBox3"></title-box>
        <el-select
          v-model="typeValue"
          class="selectInput"
          placeholder="请选择补贴项目"
          @change="selectType"
        >
          <el-option value="">全部</el-option>
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.rebateType"
            :value="item.rebateId"
          >
          </el-option>
        </el-select>
        <div class="rank">
          <ul style="position: relative">
            <template v-for="(item, index) in rankData">
              <span v-show="index == currentIndexs" class="popName">{{
                item.areaName
              }}</span>
              <li :key="index" @click="linkHref(item.areaCode,'area')">
                <span></span>
                <span @mouseover="mouseOvers(index, item.areaName)">{{
                  item.areaName
                }}</span>
                <span>{{ item.totalCount }} 笔</span>
                <span>{{ item.totalMoney }}万元</span>
              </li>
            </template>
          </ul>
          <div class="nodata" v-show="!rankNodata">
            <img src="../assets/noData.png" alt="">
          </div>
        </div>
        <title-box :title="titleBox4"></title-box>
        <div class="dep">
          <ul style="position: relative">
            <template v-for="(item, index) in depList">
              <span v-show="index == currentIndex" class="popName">{{
                item.organName
              }}</span>
              <li :key="index" @click="linkHref(item.organId,'organ')">
                <!-- <span
                  :class="{
                    color1: index == 0,
                    color2: index == 1,
                    color3: index == 2,
                  }"
                  >{{ index + 1 }}</span
                > -->
                <span></span>
                <span @mouseover="mouseOver(index, item.organName)">{{
                  item.organName
                }}</span>
                <span>{{ item.totalCount }}笔</span>
                <span>{{ item.totalMoney }}万元</span>
              </li>
            </template>
          </ul>
          <div class="nodata" v-show="!rankNodata">
            <img src="../assets/noData.png" alt="">
          </div>
        </div>
      </div>
      <el-dialog
        :title="boxTitle"
        :visible.sync="buTieDesc"
        destroy-on-close
        width="42%"
        style="margin-top: 4%"
      >
        <ul class="boxUl">
          <li v-for="(item, index) in getAreaBonusDetail" :key="index">
            <img :src="require('../assets/icon' + index + '.svg')" alt="" />
            <span>{{ item.title }}</span>
            <span>{{ item.value }}</span>
          </li>
          <div class="clear"></div>
        </ul>
        <p class="boxTitle">
          区域发放情况 <img src="../assets/icon5.png" alt="" />
        </p>
        <bar-charts v-if="descFlag" :barData="bar4"></bar-charts>
      </el-dialog>
      <el-dialog
        title="主管部门"
        :visible.sync="depBox"
        destroy-on-close
        width="35%"
        style="margin-top: 4%"
      >
        <el-table :data="depData" height="500px" style="font-size:16px"> 
          <el-table-column property='organName' label="主管部门"></el-table-column>
          <el-table-column
            property="rebateIdCount"
            label="补贴项目数"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            property="payAmount"
            label="发放金额（万元）"
            width="150"
            align="right"
          ></el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog
        title="覆盖县区"
        :visible.sync="coverBox"
        destroy-on-close
        width="40%"
        style="margin-top: 4%"
      >
        <el-table :data="coverData" height="500px" style="font-size:16px">
          <el-table-column property="areaName" label="县区"></el-table-column>
          <el-table-column
            property="rebateIdCount"
            label="补贴项目数"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            property="bankTypeCount"
            label="银行种类"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            property="personCount"
            label="受益人口数"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            property="payAmount"
            label="已发放金额（万元）"
            width="180"
            align="right"
          ></el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog
        title="补贴项目数"
        :visible.sync="butieBox"
        destroy-on-close
        width="40%"
        style="margin-top: 4%"
      >
        <el-table :data="butieData" height="500px" style="font-size:16px">
          <el-table-column property="rebateName" label="补贴项"></el-table-column>
          <!-- <el-table-column
            property="value"
            label="受益对象"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            property="value"
            label="发放周期"
            width="120"
            align="center"
          ></el-table-column> -->
          <el-table-column
            property="personCount"
            label="受益人口数"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            property="payAmount"
            label="已发放金额（万元）"
            width="180"
            align="right"
          ></el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog
        title="银行发放金额占比"
        :visible.sync="bankBox"
        destroy-on-close
        width="22%"
        style="padding-top:8%"
      >
        <div class="nodata" v-show="bankNodata">
          <p style="font-size:16px;padding-bottom:40px;color:#fff">暂无数据</p>
        </div>
        <pie-charts v-if="bankFlag" v-show="!bankNodata" :pieData="pie2"></pie-charts>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import TitleBox from "./title";
import PieChart from "../components/pieChart";
import PieCharts from "../components/pieCharts";
import EarthMap from "../components/earthMap";
import BarChart from "../components/barChart";
import BarCharts from "../components/barCharts";
import { earthClient ,hostIp} from "@/api/public.js";
import { StatisticalReq } from "@/api/earth/earth_message_pb.js";

export default {
  components: {
    TitleBox,
    EarthMap,
    PieChart,
    PieCharts,
    BarChart,
    BarCharts,
  },
  data() {
    return {
      year: new Date().getFullYear() + " 年",
      paramsData: {
        year: new Date().getFullYear(),
        adcode: "14",
      },
      adcode: "14",
      type: "all", //all bank organ(主管部门) area(覆盖区县) rebate(补贴项目)
      rebateId: "",
      flag: false, //初始化为false,拿到数据为true
      quyuFlag: false,
      fugai: false,
      descFlag: false,
      bankFlag: false,
      flayTo: true,
      clickIn: true,
      title: "惠民惠农财政补贴资金“一卡通”",
      titleBox1: "覆盖区域",
      titleBox2: "补贴项目（万元）",
      titleBox3: "发放金额统计",
      titleBox4: "部门统计",
      titleBox5: "区域发放情况",
      total: 0,  //覆盖区县
      activeName: "1",
      activeNameArea: "1",
      pie1: {
        id: "pieChart1",
        height: "200px",
        data1: 0,
        data2: 0,
        text1: 0,
        text2: 0,
      },
      pie2: {
        id: "pieChart2",
        height: "200px",
        data: [],
      },
      bar: {
        id: "barChart",
        height: "800px",
        dataX: [],
        dataY: [],
        rebateIds: [],
        unit: "万元",
      },
      bar1: {
        id: "barChart1",
        height: "800px",
        dataX: [],
        dataY: [],
        unit: "个",
      },
      bar2: {
        id: "barChart2",
        height: "800px",
        dataX: [],
        dataY: [],
        unit: "万元",
      },
      bar3: {
        id: "barChart3",
        height: "800px",
        dataX: [],
        dataY: [],
        unit: "个",
      },
      bar4: {
        id: "barChart4",
        height: "400px",
        dataX: [],
        dataY: [],
        dataZ: [],
        unit: "万元",
      },
      options: [],
      typeValue: "",
      rankData: [],
      totalData: [
        { name: "覆盖县区", num: 0, unit: "个" },
        { name: "主管部门", num: 0, unit: "个" },
        { name: "补贴项目", num: 0, unit: "个" },
        { name: "代发银行", num: 0, unit: "个" },
        { name: "受益人口", num: 0, unit: "人" },
        { name: "发放金额", num: 0, unit: "万元" },
      ],
      buTieDesc: false,
      boxTitle: null,
      getAreaBonusDetail: [
        //补贴发放详情头部
        { title: "覆盖县区", value: 0 },
        { title: "发放人次", value: 0 },
        { title: "发放笔数", value: 0 },
        { title: "发放金额", value: 0 },
      ],
      depBox: false,
      coverBox: false,
      butieBox: false,
      depData: [],
      coverData:[],
      butieData:[],
      bankBox: false,
      depList: [],
      subsidyListId: [],
      currentIndex: null,
      currentIndexs: null,
      rankNodata:false,
      bankNodata:true
    };
  },
  computed:{
    organNames:function(){
      var str;
      this.depData.forEach(item =>{
        str = item.organName.substring(4)
      })
      return str
    }
  },
  watch: {
    year: function (value) {
      let earthReq = new StatisticalReq();
      this.paramsData.year = value
      sessionStorage.setItem('year',value)
      earthReq.setStatisticalCode(this.adcode);
      earthReq.setStatisticalYear(this.year.substr(0, 4));
      earthReq.setStatisticalType(this.type);
      earthReq.setStatisticalId(this.rebateId);
      this.flag = false;
      this.quyuFlag = false;
      this.fugai = false;
      this.descFlag = false;
      let earthReqs = new StatisticalReq();
      earthReqs.setStatisticalCode('14');
      earthReqs.setStatisticalYear(this.year.substr(0, 4));
      earthReqs.setStatisticalType(this.type);
      earthReqs.setStatisticalId(this.rebateId);
      this.coverArea(earthReqs);
      this.getTotal(earthReq);
      this.getRank(earthReq);
      this.getType(earthReq);
      this.subsidyList(earthReq);
      this.areaList(earthReq);
      this.getDepList(earthReq);
    },
    adcode: function (newVal, oldVal) {
      sessionStorage.setItem('adcode',newVal)
      let earthReq = new StatisticalReq();
      earthReq.setStatisticalCode(this.adcode);
      earthReq.setStatisticalYear(this.year.substr(0, 4));
      earthReq.setStatisticalType(this.type);
      this.flag = false;
      this.quyuFlag = false;
      this.descFlag = false;
      this.getTotal(earthReq);
      this.getRank(earthReq);
      this.getType(earthReq);
      this.subsidyList(earthReq);
      this.areaList(earthReq);
      this.getDepList(earthReq);
      if(this.adcode == '14'){
        this.totalData[0].name = '覆盖县区'
      }else{
        this.totalData[0].name = '覆盖乡镇'
      }
      
    },
    flayTo: function (value) {
      let earthReq = new StatisticalReq();
      this.adcode = "14";
      this.bar1.height = "800px";
      this.bar.height = "800px";
      earthReq.setStatisticalCode(this.adcode);
      earthReq.setStatisticalYear(this.year.substr(0, 4));
      earthReq.setStatisticalType(this.type);
      this.flag = false;
      this.quyuFlag = false;
      this.descFlag = false;
      this.coverArea(earthReq);
      this.getTotal(earthReq);
      this.getRank(earthReq);
      this.getType(earthReq);
      this.subsidyList(earthReq);
      this.areaList(earthReq);
      this.getDepList(earthReq);
    },
  },
  beforecreate(){
    console.log('刷新页面')
  },
  mounted() {
    sessionStorage.setItem('year',new Date().getFullYear())
    let earthReq = new StatisticalReq();
    earthReq.setStatisticalCode(this.adcode);
    earthReq.setStatisticalYear(this.year.substr(0, 4));
    earthReq.setStatisticalType(this.type);
    earthReq.setStatisticalId(this.rebateId);

    this.coverArea(earthReq);
    this.getTotal(earthReq);
    this.getRank(earthReq);
    this.getType(earthReq);
    this.subsidyList(earthReq);
    this.areaList(earthReq);
    this.getDepList(earthReq);
    Bus.$on("buTeiDesc", (name, index, state) => {
      this.buTieDesc = state;
      this.boxTitle = name;
      this.rebateId = this.subsidyListId[index].rebateId;
      earthReq.setStatisticalId(this.rebateId);
      this.getAreaBonusDetailData(earthReq);
      this.getAreaSubsidyData(earthReq);
    }),
    Bus.$on("child-to-parent", (code) => {
      this.adcode = code;
      earthReq.setStatisticalCode(code);
    });
  },
  methods: {
    // 统计数据
    getTotal(params) {
      earthClient.getStatisticsData(params).then((response) => {
        let data = response.toObject();
        this.totalData.forEach((item, index) => {
          if (index == 0) {
            item.num = data.coverArea;
          } else if (index == 1) {
            item.num = data.totalOrgan;
          } else if (index == 2) {
            item.num = data.totalRebate; //totalRebate
          } else if (index == 3) {
            item.num = data.totalBank;
          } else if (index == 4) {
            item.num = data.totalPerson;
          } else if (index == 5) {
            item.num = data.totalMoney == "" ? 0 : data.totalMoney;
          }
        });
      });
    },
    // 发放金额统计
    getRank(params) {
      this.rankData = [];
      earthClient.getBonusRankData(params).then((response) => {
        this.rankData = response.toObject().bonusResList;
        if(this.rankData.length > 0){
          this.rankNodata = true
        }
      });
    },
    // 补贴类型
    getType(params) {
      earthClient.getRebatesListByRegionCode(params).then((response) => {
        this.options = response.toObject().bonusResList;
      });
    },
    // 补贴类型选择
    selectType(value) {
      this.rebateId = value;
      let earthReq = new StatisticalReq();
      earthReq.setStatisticalCode(this.adcode);
      earthReq.setStatisticalYear(this.year.substr(0, 4));
      earthReq.setStatisticalId(value);
      this.getRank(earthReq);
    },
    // 补贴项目
    subsidyList(params) {
      earthClient.getBonusSubsidyAllData(params).then((response) => {
        var data = response.toObject();
        if (1 <= data.moneyResList.length && data.moneyResList.length <= 3) {
          this.bar.height = "100px";
          this.bar1.height = "100px";
        } else if (
          3 <= data.moneyResList.length &&
          data.moneyResList.length <= 7
        ) {
          this.bar.height = "200px";
          this.bar1.height = "200px";
        }

        this.bar.dataY = [];
        this.bar.dataX = [];
        this.bar1.dataY = [];
        this.bar1.dataX = [];
        data.moneyResList.forEach((item, index) => {
          this.bar.dataY.push(item.rebateType +'_' + item.rebateId);
          this.bar.dataX.push(Number(item.totalMoney).toFixed(2));
          this.bar.rebateIds.push(item.rebateId);
        });
        data.countResList.forEach((item, index) => {
          this.bar1.dataY.push(item.rebateType +'_' + item.rebateId);
          this.bar1.dataX.push(Number(item.totalCount));
        });
        this.subsidyListId = data.moneyResList;
        this.$forceUpdate();
        this.flag = true;
      });
    },
    // 区域发放
    areaList(params) {
      earthClient.getAreaSubsidyAllData(params).then((response) => {
        this.quyuFlag = true;
        var data = response.toObject();
        this.bar2.dataY = [];
        this.bar2.dataX = [];
        this.bar3.dataY = [];
        this.bar3.dataX = [];
        data.moneyResList.length <= 5
          ? (this.bar2.height = "200px")
          : (this.bar2.height = "400px");
        data.countResList.length <= 5
          ? (this.bar3.height = "200px")
          : (this.bar3.height = "400px");
        data.moneyResList.length < 2
          ? (this.bar2.height = "100px")
          : (this.bar2.height = "400px");
        data.countResList.length < 2
          ? (this.bar3.height = "100px")
          : (this.bar3.height = "400px");
        data.moneyResList.forEach((item, index) => {
          this.bar2.dataY.push(item.areaName);
          this.bar2.dataX.push(Number(item.totalMoney));
        });
        data.countResList.forEach((item, index) => {
          this.bar3.dataY.push(item.areaName);
          this.bar3.dataX.push(Number(item.totalCount));
        });
      });
    },
    // 覆盖区域
    coverArea(params) {
      earthClient.getGraphicStatistics(params).then((response) => {
        var data = response.toObject();
        this.total =
          Number(data.graphicStatisticsList[0].coverCount) +
          Number(data.graphicStatisticsList[1].coverCount);
        data.graphicStatisticsList.forEach((item, index) => {
          if (index == 0) {
            this.pie1.data1 = ((Number(item.coverCount) / this.total) * 100).toFixed(
              2
            );
            this.pie1.text1 = "覆盖县区：" + item.coverCount + "个";
          } else {
            this.pie1.data2 = parseInt(100 - this.pie1.data1);
            this.pie1.text2 = "未覆盖县区：" + item.coverCount + "个";
          }
        });
        this.fugai = true;
      });
    },
    // 补贴发放详情头部
    getAreaBonusDetailData(params) {
      earthClient.getAreaBonusDetailData(params).then((response) => {
        let data = response.toObject();
        this.getAreaBonusDetail = [
          //补贴发放详情头部
          { title: "覆盖县区(个)", value: data.coverArea },
          { title: "发放人次(个)", value: data.totalPerson },
          { title: "发放笔数(笔)", value: data.totalRebate },
          { title: "发放金额(万元)", value: data.totalMoney },
        ];
      });
    },
    // 补贴发放详情
    getAreaSubsidyData(params) {
      this.descFlag = false;
      earthClient.getAreaSubsidyData(params).then((response) => {
        this.descFlag = true;
        let data = response.toObject();
        this.bar4.dataY = [];
        this.bar4.dataX = [];
        this.bar4.dataZ = [];
        data.bonusResList.forEach((item, index) => {
          this.bar4.dataY.push(item.areaName);
          this.bar4.dataX.push(item.totalMoney);
          this.bar4.dataZ.push(item.totalCount);
        });
      });
    },
    alertBox(index) {
      let earthReq = new StatisticalReq();
      earthReq.setStatisticalCode(this.adcode);
      earthReq.setStatisticalYear(this.year.substr(0, 4));

      if (index == 3) {
        this.bankBox = true;
        earthReq.setStatisticalType("bank");
        earthClient.getGraphicStatistics(earthReq).then((response) => {
          var datas = response.toObject();
          this.pie2.data = []
          if(datas.graphicStatisticsList.length > 0){
            this.bankNodata = false
            datas.graphicStatisticsList.forEach((item,index) =>{
              var dataJson = {name:'',value:''}
              dataJson.name = item.bankName;
              dataJson.value = item.payAmount
              this.pie2.data.push(dataJson)
            })
          }else{
            this.bankNodata = true
          }
          this.bankFlag = true;
          
        });
      } else if (index == 1) {
        this.depBox = true;
        earthReq.setStatisticalType("organ");
        earthClient.getGraphicStatistics(earthReq).then((response) => {
          var data = response.toObject().graphicStatisticsList;
          this.depData = data;
        });
      }else if (index == 0) {
        this.coverBox = true;
        earthReq.setStatisticalType("area");
        earthClient.getGraphicStatistics(earthReq).then((response) => {
          var data = response.toObject().graphicStatisticsList;
          this.coverData = data;
        });
      }else if (index == 2) {
        this.butieBox = true;
        earthReq.setStatisticalType("rebate");
        earthClient.getGraphicStatistics(earthReq).then((response) => {
          var data = response.toObject().graphicStatisticsList;
          this.butieData = data;
        });
      }
    },
    // 部门排行榜
    getDepList(params) {
      earthClient.getOrganBonusRankData(params).then((response) => {
        this.depList = response.toObject().bonusResList;
      });
    },
    // 补贴发放列表
    handleClick(tab, event) {
      tab.name == "1"
        ? (this.titleBox2 = "补贴项目（万元）")
        : (this.titleBox2 = "补贴项目（人次）");
    },
    flayEarth() {
      Bus.$emit("flayToMap");
      this.flayTo = !this.flayTo;
    },
    datePicker(value) {
      this.year = value.picker.year + "年";
      this.paramsData = {
        year: value.picker.year,
      };
    },
    numFormat(num) {
      var c =
        num.toString().indexOf(".") !== -1
          ? num.toLocaleString()
          : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
      this.totalData[1].num = c;
    },
    // 移入移出
    mouseOver(index, name) {
      if (name.length > 6) {
        this.currentIndex = index;
      } else {
        this.currentIndex = null;
      }
    },
    mouseOvers(index, name) {
      if (name.length >= 5) {
        this.currentIndexs = index;
      } else {
        this.currentIndexs = null;
      }
    },
    handleClickArea(tab, event) {
      // console.log('区域发放列表',tab.name);
    },
    clickEarth() {
      Bus.$emit("flayToMap");
      this.clickIn = false
    },
    linkHref(id,type){
      if(type == 'area'){
        window.open(hostIp + '/private/sidy/sidy_statistical/condition/list.jhtml?areaCode='+ id +'&bonusYear=' + this.year.substr(0,4) + '&type=area&status=finished')
      }else{
        window.open(hostIp + '/private/sidy/sidy_statistical/condition/list.jhtml?areaCode='+ this.adcode +'&bonusYear=' + this.year.substr(0,4) +'&organId=' + id + '&type=organ&status=finished')
      }
    }
  },
};
</script>

<style scoped>
.p10 {
  padding: 10px;
}
.clear {
  clear: both;
}
.nodata{
  text-align: center;
  margin-top: 10%;
}
#main {
  position: relative;
  width: 100%;
  height: 100%;
}
header {
  width: 100%;
  height: 87px;
  /* background: url("../assets/headerBackground.svg") no-repeat top center; */
  background: url("../assets/header.png") no-repeat top center;
  background-size: inherit;
  left: 0;
  top: 0;
  z-index: 2;
}
h3 {
  font-family: "Microsoft YaHei";
  font-size: 32px;
  padding-left: 9%;
  font-weight: 700;
  color:rgba(234, 85, 50, 1);
  /* color: antiquewhite; */
  /* background: linear-gradient(to bottom, #FFBC00 ,  #FF3100); */
  -webkit-background-clip: text; 
  /* color: transparent; */
  cursor: pointer;
  position: relative;
  top: -20px;
  left: 17%;
  width: 50%;
}
.text {
  position: fixed; top: 55%; left: 50%; transform: translate(-50%, 0%); width: 300px; height: 60px; color: #FFFFFF; border: 1px solid rgba(255,255,255,0.5); line-height: 60px; text-align: center; font-size: 28px; cursor: pointer; background: rgba(0, 0, 0, 0.2); transition: border .3s;z-index: 1;
}
.backBtn{
  position: fixed; top: 22%; left: 23%; transform: translate(-50%, 0%); width: 60px; height: 35px; color: #FFFFFF; border: 1px solid rgba(255,255,255,0.5); line-height: 35px; text-align: center; font-size: 16px; cursor: pointer; background: rgba(0, 0, 0, 0.2); transition: border .3s;z-index: 1;border-radius: 4px;
}
.text:hover,.backBtn:hover {
  border-color: #00b1ff;
}
.container {
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
}
.el-tabs__content {
  height: 500px;
  overflow: auto;
}
.center  {
  display: grid; grid-template-rows: 100px 1fr;
  flex: 3;
}
.left {
  height: calc(100vh - 100px);
  flex: 1;
  margin-right: 15px;
}
.right {
  height: calc(100vh - 100px);
  flex: 1;
  margin-left: 15px;
}
.rank ul li,
.dep ul li {
  width: 100%;
  padding: 5px 10px;
  margin: 8px;
  background: linear-gradient(
    90deg,
    rgba(0, 43, 144, 0) 0%,
    rgba(0, 125, 203, 0.51) 100%
  );
  cursor: pointer;
}
.color1 {
  background: #ff3c3c;
}
.color2 {
  background: #ff8122;
}
.color3 {
  background: #f0de40;
}
.rank {
  height: 230px;
  overflow: auto;
}
.dep {
  height: 460px;
  overflow: auto;
}
/* .rank ul li span:first-child,
.dep ul li span:first-child {
  display: inline-block;
  width: 22px;
  height: 22px;
  text-align: center;
  line-height: 22px;
  border-radius: 50%;
} */
.rank ul li span:nth-child(2),
.dep ul li span:nth-child(2) {
  display: block;
  /* width: 7rem; */
  width: 30%;
  padding-left: 4px;
  text-align: left;
}
.rank ul li span:nth-child(2),
.dep ul li span:nth-child(2) {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.rank ul li span:nth-child(3),
.dep ul li span:nth-child(3) {
  width: 20%;
  text-align: center;
}
.rank ul li span:not(:first-child),
.dep ul li span:not(:first-child) {
  display: inline-block;
}
.rank ul li span:last-child,
.dep ul li span:last-child {
  width: 30%;
  text-align: right;
}
.top {
  width: 100%;
  z-index: 100;
}
.top ul {
  width: 100%;
  text-align: center;
}
.top ul li {
  width: 11%;
  float: left;
  /* cursor: pointer; */
  padding: 1.25rem 0.625rem;
}
.top ul li:nth-child(5),
.top ul li:nth-child(6) {
  width: 21%;
}
.top ul li:nth-child(1),
.top ul li:nth-child(2),
.top ul li:nth-child(3),
.top ul li:nth-child(4){
  cursor: pointer;
}
.top ul li span {
  font-size: 1.125rem;
}
.top ul li p {
  color: rgba(255, 214, 108, 1);
}

.top ul li p span {
  display: inline-block;
  font-size: 2.5rem !important;
  font-family: "number";
}
.box {
  height: 435px;
  overflow: auto;
}
.datePicker {
  position: relative;
  top: 7%;
  padding-left: 10px;
}
.boxUl li {
  width: 20.5%;
  padding: 10px;
  margin: 0 5px;
  float: left;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}
.boxUl li img {
  float: left;
}
.boxUl li span {
  padding-left: 50px;
  display: block;
  color: #fff;
}
.boxUl li span:last-child {
  padding-top: 10px;
}
.helpIcon {
  width: 1.5625rem;
  position: absolute;
  margin-left: 5%;
  margin-top: -0.6875rem;
}
.boxTitle {
  padding: 30px 0;
  color: #ffab2b;
  font-weight: 700;
}
.boxTitle img {
  padding-left: 20px;
}
.light {
  position: relative;
  left: 45%;
  top: -6px;
  /* transform: translateX(-50%);
    animation: topLight 4s infinite linear;
    animation-direction: alternate; */
}
.popName {
  font-size: 14px;
  padding: 2px 10px;
  background: #083b59;
  color: #fff;
  position: absolute;
  display: inline-block;
  left: 27%;
  margin-top: -11px;
}
</style>
<style>
.el-table__empty-text{
  color: #fff!important;
}
.el-select {
  z-index: 10;
}
.el-input__inner {
  background: rgba(0, 66, 142, 0.5) !important;
  border: 1px solid #00b1ff;
  border-radius: 4px;
  color: #fff !important;
}
.selectInput .el-input__inner {
  width: 300px;
  margin-left: 10px;
}
.el-dialog {
  /* background: linear-gradient(top, #00316D 0%, #004F8F 100%)!important; */
  background: rgba(0, 66, 142, 0.6) !important;
  border: 1px solid #00b1ff;
  border-radius: 4px;
  color: #fff;
  padding: 0 25px;
}
.el-dialog__title,
.el-dialog__body {
  color: #fff;
}
.el-table,
.el-table--fit,
.el-table th,
.el-table tr {
  color: #fff;
  background: rgba(0, 0, 0, 0) !important;
  border-bottom: 1px dashed #ccc;
}
.el-table tbody tr:hover > td,
.el-table tbody tr > td {
  background-color: rgba(0, 0, 0, 0) !important;
  border-bottom: 1px dashed #ccc;
}
.el-table th:hover,
.el-table tr:hover td,
.el-table th,
.el-table tr {
  background: none !important;
}
.el-table th {
  color: #ffab2b;
  font-weight: 700;
}
.mapBox .el-dialog {
  /* background: linear-gradient(90deg, rgba(41, 104, 232, 0.8) 0%, rgba(0, 79, 143, .6) 100%); */
  position: absolute !important;
  right: 21%;
  bottom: 0;
}
.el-dialog__header {
  height: 33px;
  background: url("../assets/titleBackground.svg") no-repeat;
  background-size: contain;
  position: relative;
  left: -25px;
}
.el-dialog__title {
  position: relative;
  top: -11px;
  font-size: 16px;
  color: #fff !important;
}
.el-dialog__headerbtn {
  right: -34px !important;
}
.el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}

</style>

