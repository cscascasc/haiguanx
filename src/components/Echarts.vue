<template>
  <div class="container">
    <div ref="map" id="main" class="map"></div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  transform: scale();
  .map {
    width: 700px;
    height: 700px;
  }
}
</style>
<script>
import * as echarts from "echarts";
import guizhouMap from "../assets/guizhou.json";
import { getdeptinfo } from "@/api/data/news/getnews";
import { getdept, getunitinfo } from "@/api/dept/getdept";
export default {
  data() {
    return {
      Option: [{}],
      pathlist: null,
      data: [],
      form: {},
    };
  },
  methods: {
    getnews() {
      getdeptinfo(this.form)
        .then((res) => {
          var list = [];
          for (var i = 0; i < res.data.records.length; i++) {
            list.push(res.data.records[i]);
          }
          let that = this;
          var myChart = echarts.init(this.$refs["map"]);
          echarts.registerMap("guizhou", guizhouMap); //引入地图组件
          var geoCoordMap = {
            贵阳海关: [106.711127, 26.84011],
            六盘水海关: [104.89694, 26.128029],
            毕节海关: [105.550244, 27.113787],
            遵义海关: [107.089441, 28.168743],
            铜仁海关: [108.546322, 27.969966],
            安顺海关: [105.952866, 25.993386],
            凯里海关: [108.560041, 26.50434],
            兴义海关: [105.466954, 25.263792],
            黔南海关: [107.254401, 26.014436],
            贵安新区海关: [105.952866, 26.193386],
            筑城海关: [106.729812, 26.698],
            贵阳龙洞堡机场海关: [106.801328, 26.348409],
          };
          var maplist = [];
          let map = function (data) {
            console.log(data);
            maplist = [];
            for (var i = 0; i < list.length; i++) {
              if (data.name === list[i].dept.name) {
                console.log(list[i], "1111");
                maplist.push({
                  name: data.name,
                  unitIntroduce: list[i].unitIntroduce,
                  value:
                    list[i].institutionalPosition +
                    list[i].nonInstitutionalPosition,
                });
              }
              // let geo = geoCoordMap[list[i].dept.name];
              // if (geo) {
              //   maplist.push({
              //     unitIntroduce: list[i].unitIntroduce,
              //     value: geo,
              //     name: list[i].dept.name,
              //   });
              // }
            }
          };
          let converData = function (data) {
            let res = [];
            for (var i = 0; i < data.length; i++) {
              let geoCoord = geoCoordMap[data[i].name];
              if (geoCoord) {
                res.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value),
                  path: data[i].path,
                });
              }
            }
            return res;
          };
          var option;
          option = {};
          myChart.setOption(option);
          getdept().then((res) => {
            var data = [];
            for (var i = 0; i < res.data.length; i++) {
              data.push({
                name: res.data[i].name,
                value: "110",
                path: res.data[i].id,
              });
            }
            myChart.setOption({
              backgroundColor: "",
              geo: {
                map: "guizhou",
                zoom: "1.2",
                label: {
                  show: false,
                },
                itemStyle: {
                  normal: {
                    borderColor: "rgba(147, 235, 248, 1)",
                    borderWidth: 1,
                    areaColor: {
                      type: "radial",
                      x: 0.5,
                      y: 0.5,
                      r: 0.8,
                      colorStops: [
                        {
                          offset: 0,
                          color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
                        },
                      ],
                      globalCoord: false, // 缺省为 false
                    }, //地图区域颜色
                    shadowColor: "rgba(128, 217, 248, 1)",
                    // shadowColor: 'rgba(255, 255, 255, 1)',
                    shadowOffsetX: -2,
                    shadowOffsetY: 2,
                    shadowBlur: 10,
                    lineColor: "rgba(147, 235, 248, 0.8)",
                  },
                  emphasis: {
                    areaColor: "transparent",
                    borderWidth: 1,
                    label: {
                      show: false,
                      color: "#fff",
                    },
                  },
                },
                emphasis: {
                  areaColor: "#2AB8FF",
                  borderWidth: 0,
                  label: {
                    show: false,
                    color: "#fff",
                  },
                },
              },
              tooltip: {
                trigger: "item",
                triggerOn: "click",
                backgroundColor: "rgb(2, 167, 240)",
                alwaysShowContent: false,
                confine: true,
                enterable: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 16,
                },
                hideDelay: 500,
                formatter: function (params) {
                  map(params);
                  if (maplist.length !== 0) {
                    const content =
                      maplist[0].name +
                      `<div>人员总数: 
                      ${maplist[0].value}
                      </div>` +
                      `<div>单位简介:</div>` +
                      `<div class='textcontent'  style="
                      width: 20vw;
                      height: 20vh;
                      color: #fff;
                      overflow-y: scroll;
                      word-break: break-word;
                      white-space: pre-line;
                      margin-bottom: 10px;
                      text-align:left;
                      padding:3px
                       ">
                      ${maplist[0].unitIntroduce}</div>` +
                      `<div>
              <button onclick="topath('${params.data.name}')"  id="topath" style="width:100px ; cursor: pointer; height:30px ; color: #fff; background-color: rgba(147, 235, 248, 0.8) ;border: none; border-radius: 5px;" >审计全景</button></div>`;
                    return content;
                  } else {
                    const content = `<div>  <button onclick="topath('${params.data.name}')"  id="topath" style="width:100px ; cursor: pointer; height:30px ; color: #fff; background-color: rgba(147, 235, 248, 0.8) ;border: none; border-radius: 5px;" >审计全景</button> </div>`;
                    return content;
                  }
                },
              },
              legend: {
                show: false,
              },
              series: [
                {
                  name: "Tooltip Test",
                  type: "effectScatter",
                  coordinateSystem: "geo",
                  data: converData(
                    data
                      .sort(function (a, b) {
                        return b.value - a.value;
                      })
                      .slice(0, 50)
                  ),
                  symbolSize: function (val) {
                    return val[2] / 5;
                  },
                  showEffectOn: "render",
                  rippleEffect: {
                    brushType: "stroke",
                  },
                  hoverAnimation: true,
                  label: {
                    normal: {
                      formatter: "{b}",
                      position: "right",
                      show: true,
                      color: "#fff",
                    },
                  },
                  itemStyle: {
                    normal: {
                      color: "rgb(2, 167, 240)",
                      shadowBlur: 10,
                      shadowColor: "#333",
                    },
                  },
                  tooltig: {},
                  zlevel: 1,
                },
              ],
            });
          });
          myChart.on("click", function (params) {
            if (params.componentType === "series") {
              that.pathlist = params.data.path;
              that.$emit("getpath", that.pathlist);
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // darw() {
    //   let that = this;
    //   var myChart = echarts.init(this.$refs["map"]);
    //   echarts.registerMap("guizhou", guizhouMap); //引入地图组件
    //   var geoCoordMap = {
    //     贵阳海关: [106.711127, 26.84011],
    //     六盘水海关: [104.89694, 26.128029],
    //     毕节海关: [105.550244, 27.113787],
    //     遵义海关: [107.089441, 28.168743],
    //     铜仁海关: [108.546322, 27.969966],
    //     安顺海关: [105.952866, 25.993386],
    //     凯里海关: [108.560041, 26.50434],
    //     兴义海关: [105.466954, 25.263792],
    //     黔南海关: [107.254401, 26.014436],
    //     贵安新区海关: [105.952866, 26.193386],
    //     筑城海关: [106.729812, 26.698],
    //     贵阳龙洞堡机场海关: [106.801328, 26.348409],
    //   };
    //   let converData = function (data) {
    //     let res = [];
    //     for (var i = 0; i < data.length; i++) {
    //       let geoCoord = geoCoordMap[data[i].name];
    //       if (geoCoord) {
    //         res.push({
    //           name: data[i].name,
    //           value: geoCoord.concat(data[i].value),
    //           path: data[i].path,
    //         });
    //       }
    //     }
    //     return res;
    //   };
    //   var option;
    //   option = {};
    //   myChart.setOption(option);
    //   getdept().then((res) => {
    //     var data = [];
    //     for (var i = 0; i < res.data.length; i++) {
    //       data.push({
    //         name: res.data[i].name,
    //         value: "110",
    //         path: res.data[i].id,
    //       });
    //     }
    //     myChart.setOption({
    //       backgroundColor: "",
    //       geo: {
    //         map: "guizhou",
    //         zoom: "1.2",
    //         label: {
    //           show: false,
    //         },
    //         itemStyle: {
    //           normal: {
    //             borderColor: "rgba(147, 235, 248, 1)",
    //             borderWidth: 1,
    //             areaColor: {
    //               type: "radial",
    //               x: 0.5,
    //               y: 0.5,
    //               r: 0.8,
    //               colorStops: [
    //                 {
    //                   offset: 0,
    //                   color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
    //                 },
    //                 {
    //                   offset: 1,
    //                   color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
    //                 },
    //               ],
    //               globalCoord: false, // 缺省为 false
    //             }, //地图区域颜色
    //             shadowColor: "rgba(128, 217, 248, 1)",
    //             // shadowColor: 'rgba(255, 255, 255, 1)',
    //             shadowOffsetX: -2,
    //             shadowOffsetY: 2,
    //             shadowBlur: 10,
    //             lineColor: "rgba(147, 235, 248, 0.8)",
    //           },
    //           emphasis: {
    //             areaColor: "transparent",
    //             borderWidth: 1,
    //             label: {
    //               show: false,
    //               color: "#fff",
    //             },
    //           },
    //         },
    //         emphasis: {
    //           areaColor: "#2AB8FF",
    //           borderWidth: 0,
    //           label: {
    //             show: false,
    //             color: "#fff",
    //           },
    //         },
    //       },
    //       tooltip: {
    //         trigger: "item",
    //         triggerOn: "click",
    //         backgroundColor: "rgb(2, 167, 240)",
    //         alwaysShowContent: false,
    //         confine: true,
    //         enterable: true,
    //         textStyle: {
    //           color: "#fff",
    //           fontSize: 16,
    //         },
    //         hideDelay: 500,
    //         formatter: function (params) {
    //           console.log(params);
    //           const content =
    //             params.data.name +
    //             `<div>人员总数:</div>` +
    //             params.data.value[2] +
    //             `<div>
    //           <button onclick="topath('${params.data.name}')"  id="topath" style="width:100px ; cursor: pointer; height:30px ; color: #fff; background-color: rgba(147, 235, 248, 0.8) ;border: none; border-radius: 5px;" >审计全景</button></div>`;
    //           return content;
    //         },
    //       },
    //       legend: {
    //         show: false,
    //       },
    //       series: [
    //         {
    //           name: "Tooltip Test",
    //           type: "effectScatter",
    //           coordinateSystem: "geo",
    //           data: converData(
    //             data
    //               .sort(function (a, b) {
    //                 return b.value - a.value;
    //               })
    //               .slice(0, 50)
    //           ),
    //           symbolSize: function (val) {
    //             return val[2] / 5;
    //           },
    //           showEffectOn: "render",
    //           rippleEffect: {
    //             brushType: "stroke",
    //           },
    //           hoverAnimation: true,
    //           label: {
    //             normal: {
    //               formatter: "{b}",
    //               position: "right",
    //               show: true,
    //               color: "#fff",
    //             },
    //           },
    //           itemStyle: {
    //             normal: {
    //               color: "rgb(2, 167, 240)",
    //               shadowBlur: 10,
    //               shadowColor: "#333",
    //             },
    //           },
    //           tooltig: {},
    //           zlevel: 1,
    //         },
    //       ],
    //     });
    //   });
    //   myChart.on("click", function (params) {
    //     if (params.componentType === "series") {
    //       console.log(params);
    //       that.pathlist = params.data.path;
    //       that.$emit("getpath", that.pathlist);
    //     }
    //   });
    // },
    topath(params) {
      this.$router.push({
        path: "/dataselect",
        query: { type: this.pathlist, customs: params },
      });
    },
  },
  watch: {
    path: {
      chang(value, item) {
        console.log(value, item);
      },
    },
  },
  mounted() {
    this.getnews();
    // this.darw();
    window.topath = this.topath;
  },
};
</script>
<style>

</style>