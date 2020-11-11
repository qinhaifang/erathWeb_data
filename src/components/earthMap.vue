<template>
  <div class="map">
    <div id="cesium-earth"></div>
  </div>
</template>
<script>
const layer = "http://220.181.130.171:9090/gisserver/tiles/mbtiles/Global_Image/{z}/{x}/{reverseY}.jpg";
export default {
  data() {
    return {
      viewer: null,
      zoneObject: [
        {
          zoneName: "sx",
          lon: 112.549248,
          lat: 37.857014,
          height: 1314150,
          name: "山西省"
        },
        {
          zoneName: "taiyuan",
          lon: 112.549248,
          lat: 37.857014,
          height: 169496,
          name: "太原市"
        },
        {
          zoneName: "datong",
          lon: 113.295259,
          lat: 40.09031,
          height: 311615,
          name: "大同市"
        },
        {
          zoneName: "yangquan",
          lon: 113.583285,
          lat: 37.861188,
          height: 311615,
          name: "阳泉市"
        },
        {
          zoneName: "changzhi",
          lon: 113.113556,
          lat: 36.191112,
          height: 311615,
          name: "长治市"
        },
        {
          zoneName: "jincheng",
          lon: 112.851274,
          lat: 35.497553,
          height: 311615,
          name: "晋城市"
        },
        {
          zoneName: "shuozhou",
          lon: 112.43338,
          lat: 39.331261,
          height: 311615,
          name: "朔州市"
        },
        {
          zoneName: "jinzhong",
          lon: 112.736465,
          lat: 37.696495,
          height: 311615,
          name: "晋中市"
        },
        {
          zoneName: "yuncheng",
          lon: 111.003957,
          lat: 35.022778,
          height: 311615,
          name: "运城市"
        },
        {
          zoneName: "xinzhou",
          lon: 112.733538,
          lat: 38.41769,
          height: 311615,
          name: "忻州市"
        },
        {
          zoneName: "linfen",
          lon: 111.517973,
          lat: 36.08415,
          height: 311615,
          name: "临汾市"
        },
        {
          zoneName: "lvliang",
          lon: 111.134335,
          lat: 37.524366,
          height: 311615,
          name: "吕梁市"
        },
        {
          zoneName: "qg",
          lon: 112.003,
          lat: 30,
          height: 10911680,
          name: "全国"
        }
      ],
    };
  },
  mounted() {
    this.init();
    this.addZoneBoundary(this.zoneObject[0])
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
        fill:Cesium.Color.fromCssColorString("#3d88c6").withAlpha(0.8),
        strokeWidth:3
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
              name === "山西省" ||
              name === "右江区" ||
              name === "都安瑶族自治县" ||
              name === "金秀瑶族自治县"
            ) {
              entity.polygon.material = Cesium.Color.fromCssColorString(
                "#ff3300"
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
              color: Cesium.Color.fromCssColorString("#fff"),
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
        duration:3.0
      })
    }
  },
};
</script>
<style scoped>
.cesium-earth {
  width: 100%;
  height: 100%;
}
</style>