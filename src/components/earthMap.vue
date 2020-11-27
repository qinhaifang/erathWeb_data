<template>
  <div class="map">
    <div id="cesium-earth"></div>
    <el-dialog
        :title="mapBoxTitle"
        :visible.sync="mapBox"
        destroy-on-close
        :modal=false
        width="20%"
        class="mapBox"
        >
        <ul>
          <li>
            发放资金：<span>{{mapBoxData.totalMoney}}</span>万元
          </li>
          <li>
            发放人次：<span>{{mapBoxData.totalCount}}</span>人
          </li>
          <li>
            补贴类型数量：<span>{{mapBoxData.rebateType}}</span>个
          </li>
        </ul>
    </el-dialog>
  </div>
</template>
<script>
const layer = "http://220.181.130.171:9090/gisserver/tiles/mbtiles/Global_Image/{z}/{x}/{reverseY}.jpg";
import {earthClient} from '@/api/public.js';
import {StatisticalReq,DictRegionReq} from '@/api/earth/earth_message_pb.js'
export default {
  props:['params'],
  data() {
    return {
      viewer: null,
      mapBox:false,
      mapBoxTitle:null,
      mapBoxData:{
        totalMoney:0,
        totalCount:0,
        rebateType:0
      },
      zoneObject: [
        {
          zoneName: "sx",
          lon: 112.549248,
          lat: 37.857014,
          height: 1314150,
          name: "山西省"
        },
        {
          zoneName: "xiaoyi",
          lon: 111.781568,
          lat: 37.144474,
          height: 311615,
          name: "孝义市"
        },
        
      ],
      year:new Date().getFullYear()
     
    };
  },
  watch: {
    params:function(newVal,oldVal){
      this.year = newVal.year
    },
    deep:true
  },
  mounted() {
    this.init();
    window.viewer = this.viewer;
    this.addLister(); //监听地球点击事件
    Bus.$on('flayToMap',()=>{
      this.addZoneBoundary(this.zoneObject[0])
      // this.addFGPoint();
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
        contextOptions: {
          webgl: {
            preserveDrawingBuffer: true,
          },
        },
        // imageryProvider: new Cesium.createTileMapServiceImageryProvider({
        //   url: "../../static/tiles",
        //   maximumLevel: 2,
        // }),
      });
      this.viewer.cesiumWidget.creditContainer.style.display = "none";
      this.addImageLayer();
      this.viewer.camera.setView({
        destination:Cesium.Cartesian3.fromDegrees(108.8,35.5,22000000)
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
      let neighborhoodsPromise = Cesium.GeoJsonDataSource.load(`static/data/${obj.zoneName}.json`,{
        stroke:Cesium.Color.YELLOW,
        fill:Cesium.Color.fromCssColorString("#3d88c6").withAlpha(0.5),
        strokeWidth:10
      })
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
            if (
              name === "孝义市" ||
              name === "河曲县" ||
              name === "朔城区" ||
              name === "潞州区" ||
              name === "古交市" ||
              name === '矿区'
            ) {
              entity.polygon.material = Cesium.Color.fromCssColorString(
                "#FF3C3C" //#FF3C3C ,#ff3300
              ).withAlpha(0.7);
            }
            var polyPositions = entity.polygon.hierarchy.getValue(
              Cesium.JulianDate.now()
            ).positions;
            var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions)
              .center;
            polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(
              polyCenter
            );
            entity.position = polyCenter;

            entity.label = {
              //创建一个标签，在中心点位置
              text: name,
              color: Cesium.Color.fromCssColorString("#000"),
              font: "normal 26px MicroSoft YaHei",
              showBackground: true,
              scale: 0.5,
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
      });
      if (isFly) this.flyTo(obj.lon, obj.lat, obj.height);
    },
    flyTo(log,lat,height){
      this.viewer.camera.flyTo({
        destination:Cesium.Cartesian3.fromDegrees(log,lat,height),
        duration:5.0
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
          console.log(111,this.year)
          earthClient.getRegionCodeByName(dictReq).then(response =>{
            var data = response.toObject();
            Bus.$emit("child-to-parent", data.regionCode);
            if(data.regionCode !== ''){
              let earthReq = new StatisticalReq();
              earthReq.setStatisticalCode(data.regionCode)
              // earthReq.setStatisticalType('area')
              earthReq.setStatisticalYear(this.year+'')
              // 点击县弹出详情
              earthClient.getBonusSituationDataList(earthReq).then(response =>{
                let data = response.toObject();
                
                
                console.log(earthReq.toObject(),data)
                if(data.bonusResList.length > 0){
                  this.mapBoxData = data.bonusResList[0];
                }else{
                  this.mapBoxData = {
                    totalMoney:0,
                    totalCount:0,
                    rebateType:0
                  }
                }
              })
            }
          })
          Bus.$emit("zone-click-event", model.name);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_DOWN); 

    },
    //清除行政区划
    clearZoneBoundary() {
      this.viewer.dataSources.removeAll();
    },
    addFGPoint() {
      Cesium.GeoJsonDataSource.load("static/data/fg.json").then(dataSource => {
        viewer.dataSources.add(dataSource);
        var entities = dataSource.entities.values;
        for (var i = 0; i < entities.length; i++) {
          var entity = entities[i];
          entity.billboard = undefined;
          entity.point = new Cesium.PointGraphics({
            color: Cesium.Color.RED,
            pixelSize: 10
          });
        }
        //添加面
        // for (let i = 0; i < pkxDataUrl.length; i++) {
        //   this.addPKXBoundary(pkxDataUrl[i]);
        // }
      });
    },
    zoneLocation(zoneName) {
      
      for (let i = 0; i < this.zoneObject.length; i++) {
        if (this.zoneObject[i].name === zoneName) {
          this.currentZoneObject = this.zoneObject[i];
          break;
        }
      }
      console.log('看看名字是否可以进去',zoneName,this.currentZoneObject)
      if (this.currentZoneObject) {
        this.clearZoneBoundary();
        this.addZoneBoundary(this.currentZoneObject);
      }
    },
  },
};
</script>
<style scoped>
.cesium-earth {
  width: 100%;
  height: 100%;
}
.mapBox{
  z-index: 0!important;
}
.mapBox ul li {
  padding: 10px;
}
</style>
<style>
.el-dialog__body{
  padding-left: 0;
}
</style>
