<template>
  <div class="map">
    <div id="cesium-earth"></div>
    <el-dialog
        :title="mapBoxTitle"
        :visible.sync="mapBox"
        destroy-on-close
        :modal=false
        width="17%"
        class="mapBox"
        >
        <ul>
          <li>
            发放人次：<span>{{mapBoxData.personCount}}</span>人
          </li>
          <li>
            发放金额：<span>{{mapBoxData.totalMoney}}</span>万元
          </li>
          <li>
            发放笔数：<span>{{mapBoxData.bonusIdCount}}</span>个
          </li>
          <li>
            发放银行：<span>{{mapBoxData.bankTypeCount}}</span>个
          </li>
        </ul>
    </el-dialog>
  </div>
</template>
<script>
const layer = "http://220.181.130.171:9090/gisserver/tiles/mbtiles/Global_Image/{z}/{x}/{reverseY}.jpg";
import {earthClient} from '@/api/public.js';
import {StatisticalReq,DictRegionReq} from '@/api/earth/earth_message_pb.js'
const { Empty } = require('@/api/google/protobuf/empty_pb');
let empty = new Empty();
let timer;
export default {
  props:['params'],
  data() {
    return {
      viewer: null,
      mapBox:false,
      mapBoxTitle:'山西省',
      mapBoxData:{
        personCount:0,
        totalMoney:0,
        bonusIdCount:0,
        bankTypeCount:0
      },
      fgList:[],
      zoneObject: [
        {
          zoneName: "sx",
          lon: 112.549248,
          lat: 37.857014,
          height: 1600000,
          name: "山西省"
        }
      ],
      year:new Date().getFullYear(),
      nameList:[]
    };
  },
  watch: {
    params:function(newVal,oldVal){
      this.year = newVal.year
    },
    deep:true
  },
  mounted() {
    this.getList();
    this.init();
    window.viewer = this.viewer;
    this.addLister(); //监听地球点击事件
    Bus.$on('flayToMap',()=>{ 
      clearInterval(timer);      
      this.timer = null;
      this.mapBox = true;
      setTimeout(this.addZoneBoundary(this.zoneObject[0]),1000)
    })
    Bus.$on("zone-click-event",zoneName =>{
      if (!zoneName) {
        return;
      }
      // Bus.$emit("clear-all-mark");
      this.mapBox = true;
      this.mapBoxTitle = zoneName
      this.zoneLocation(zoneName);
    }),
    Bus.$on("clear-all-mark", () => {
      this.clearZoneBoundary();
    });
    this.getZoneObject()
    let earthReqs = new StatisticalReq();
    earthReqs.setStatisticalCode('14')
    earthReqs.setStatisticalYear(this.year+'')
    this.getPopbox(earthReqs)
  },
  methods: {
    init() {
      this.viewer = new Cesium.Viewer("cesium-earth", {
        baseLayerPicker: false, //地图切换控件
        fullscreenButton: false, //全屏按钮
        vrButton: false, //双屏按钮
        geocoder: false, //地名查找
        homeButton: false, //首页按钮
        infoBox: false,
        sceneModePicker: false, //是否显示投影方式控件
        selectionIndicator: false, //选中元素显示
        navigationHelpButton: false, //是否显示帮助信息控件
        navigationInstructionsInitiallyVisible: false,
        animation: false, //动画控制,左下角方向盘
        shouldAnimate: true,
        timeline: false,
        orderIndependentTranslucency: false,//去掉地球表面的大气效果的黑圈问题
        contextOptions: {
          webgl: {
            alpha:true,
            // preserveDrawingBuffer: true,
          },
        },
        // imageryProvider: new Cesium.createTileMapServiceImageryProvider({
        //   url: "../../static/tiles",
        //   maximumLevel: 2,
        // }),
      });
      this.viewer.scene.sun.destroy(); //去掉太阳
      this.viewer.scene.sun = undefined; //去掉太阳
      this.viewer.scene.moon.destroy(); //去掉月亮
      this.viewer.scene.moon = undefined; //去掉月亮
      this.viewer.scene.backgroundColor = Cesium.Color.TRANSPARENT;
      this.viewer.cesiumWidget.creditContainer.style.display = "none";
      this.viewer.scene.skyBox.show = false;
      this.viewer.scene.backgroundColor = new Cesium.Color( 0, 0, 0, 0);
      this.addImageLayer();

      this.viewer.clock.multiplier = 200;//速度
      this.viewer.clock.shouldAnimate = true;
      var previousTime = this.viewer.clock.currentTime.secondsOfDay;

      var x = 113;
      timer = setInterval(()=>{
        x = x + 0.3;
          if (x >= 178.5) {
            x = -180
          }
          this.viewer.camera.setView({
            destination:Cesium.Cartesian3.fromDegrees(x,35.5,16000000)
          })
      },16)
      
    },
     // 获取覆盖区域
    getList(){
      earthClient.getAllCoverCounty(empty).then(response =>{
        this.fgList =response.toObject().dictRegionList;
        this.fgList.forEach(item=>{
          this.nameList.push(item.regionName)
        })
        
      })
    },
    getZoneObject(){
      let num = 0;
      this.$axios({
        method:'get',
        url:'../../static/data/sx.json',
      }).then(res =>{
        let data = res.data.features;
        data.forEach((item,j) =>{
          this.fgList.forEach((items,k) =>{
            if(items.regionName === item.properties.name){
              this.zoneObject.push({
                zoneName: items.regionName,
                lon: item.properties.center[0],
                lat: item.properties.center[1],
                height: 311615,
                name: items.regionName
              })
            }
          })
          
        })
      })
    },
    addImageLayer(){
      const imageLayer = new Cesium.ImageryLayer(
        new Cesium.UrlTemplateImageryProvider({
          url:layer
        })
      )
      this.viewer.imageryLayers.removeAll();
      this.viewer.imageryLayers.add(imageLayer,0)
    },
    // 加载行政边界
    addZoneBoundary(obj,isFly = true){
      // neighborhoodsPromise;
      let neighborhoodsPromise = Cesium.GeoJsonDataSource.load(`static/data/${obj.zoneName}.json`,{
        stroke:Cesium.Color.YELLOW,
        fill:Cesium.Color.fromCssColorString("#3d88c6").withAlpha(0), //地块颜色
        strokeWidth:50
      })
      if(obj.zoneName === 'sx'){
        this.mapBox = true
      }
      
      neighborhoodsPromise.then(dataSource => {
        this.viewer.dataSources.add(dataSource);
        let neighborhoods = dataSource.entities;
        let neighborhoodsEntities = dataSource.entities.values;
        let labels = {};
        for (var i = 0; i < neighborhoodsEntities.length; i++) {
          var entity = neighborhoodsEntities[i];
          if (Cesium.defined(entity.polygon)) {
            //entity.name = entity.properties.name.getValue();
            let name = entity.properties.name.getValue();
            if (labels[name]) {
              continue;
            } else {
              labels[name] = name;
            }
            this.fgList.forEach(item => {
              if (name === item.regionName) {
                entity.polygon.material = Cesium.Color.fromCssColorString(
                  "#FF3C3C" //#FF3C3C ,#ff3300
                ).withAlpha(0.8);
                entity.polygon.width = 100;
                // (entity.polyline.material = new Cesium.PolylineGlowMaterialProperty({
                //     glowPower: .1, //一个数字属性，指定发光强度，占总线宽的百分比。
                //     color: Cesium.Color.ORANGERED.withAlpha(.9)
                // }), 10)
              }

            });
            var polyPositions = entity.polygon.hierarchy.getValue(
              Cesium.JulianDate.now()
            ).positions;
            var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions)
              .center;
            polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(
              polyCenter
            );
            entity.position = polyCenter;
            if(this.nameList.length > 0 && this.nameList.indexOf(name) > -1){
              entity.label = {
                //创建一个标签，在中心点位置
                text: name,
                color: Cesium.Color.fromCssColorString("#000"),
                font: "normal 26px MicroSoft YaHei",
                showBackground: true,
                scale: 0.5,
                // scaleByDistance : new Cesium.NearFarScalar(1000, 2, 5000, .8),
                horizontalOrigin: Cesium.HorizontalOrigin.LEFT_CLICK,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                  10.0,
                  10000000.0
                ),
                disableDepthTestDistance: 10000000.0
              };
            }else{
              entity.label = {
                //创建一个标签，在中心点位置
                text: '',
                color: Cesium.Color.fromCssColorString("#000"),
                font: "normal 20px MicroSoft YaHei",
                showBackground: true,
                scale: 0.5,
                // scaleByDistance : new Cesium.NearFarScalar(1000, 2, 5000, .8),
                horizontalOrigin: Cesium.HorizontalOrigin.LEFT_CLICK,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                  10.0,
                  10000000.0
                ),
                disableDepthTestDistance: 10000000.0
              };
            }
              
          }
        }
      });
      if (isFly) this.flyTo(obj.lon, obj.lat, obj.height);
    },
    flyTo(log,lat,height){
      
      this.viewer.camera.flyTo({
        destination:Cesium.Cartesian3.fromDegrees(log,lat,height),
        duration:3.0
      })
    },
    // 监听地球点击
    addLister(){
      const handler = new Cesium.ScreenSpaceEventHandler(
        this.viewer.scene.canvas
      );
      handler.setInputAction(movement => {
        const obj = this.viewer.scene.pick(movement.position);
        if (Cesium.defined(obj) && obj.id instanceof Cesium.Entity) {
          const model = obj.id;
          let dictReq = new DictRegionReq();
          dictReq.setRegionName(model.name)
          earthClient.getRegionCodeByName(dictReq).then(response =>{
            var data = response.toObject();
            Bus.$emit("child-to-parent", data.regionCode);
            if(data.regionCode !== ''){
              let earthReq = new StatisticalReq();
              earthReq.setStatisticalCode(data.regionCode)
              earthReq.setStatisticalYear(this.year+'')
              let dictReq = new DictRegionReq();
              dictReq.setRegionCode(data.regionCode)
              // 获取地区json
              // earthClient.getCountyPayInfo(dictReq).then(response =>{
              //   let data = response.toObject();
              // })
              // 点击县弹出详情
              this.getPopbox(earthReq)
            }
          })
          Bus.$emit("zone-click-event", model.name);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_DOWN); 
    },
    getPopbox(earthReq){
      earthClient.getBonusSituationDataList(earthReq).then(response =>{
        let data = response.toObject();
        if(data.bonusResList.length > 0){
          this.mapBoxData = data.bonusResList[0];
        }else{
          this.mapBoxData = {
            personCount:0,
            totalMoney:0,
            bonusIdCount:0,
            bankTypeCount:0
          }
        }
      })
    },
    //清除行政区划
    clearZoneBoundary() {
      this.viewer.dataSources.removeAll();
    },
    zoneLocation(zoneName) {
      this.currentZoneObject = null;
      for (let i = 0; i < this.zoneObject.length; i++) {
        if (this.zoneObject[i].name === zoneName) {
          this.currentZoneObject = this.zoneObject[i];
          break;
        }
      }
      if (this.currentZoneObject) {
        this.clearZoneBoundary();
        this.addZoneBoundary(this.currentZoneObject);
      }
    },
   
  },
};
</script>
<style scoped>
#cesium-earth {
  width: 100%;
  height: 100%;
  border-radius: 5px; overflow: hidden;
  background-image: none; background-color: transparent;
}
.mapBox{
  z-index: 0!important;
}
.mapBox ul li {
  padding: 10px; font-size: 16px;
}
</style>
<style>
.map .el-dialog__body{
  padding-left: 0;
  padding-top: 0;
  color: #fff!important;
}
</style>
