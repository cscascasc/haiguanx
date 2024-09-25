<template>
  <div class="container">
    <div class="right">
      <div class="top">
        <div class="hader">公有住房</div>
        <el-divider></el-divider>
        <div class="list">
          <div class="title">
            住房总数:
            <div class="data">
              {{ housedata.total }}
            </div>
          </div>
          <div class="title">
            已入住:
            <div class="data">
              {{ housedata.completedNum }}
            </div>
          </div>
          <div class="title">
            未入住:
            <div class="data">
              {{ housedata.uncompletedNum }}
            </div>
          </div>
          <div class="title">
            入住率:
            <div class="data">
              {{
                housedata.completedNum
                  ? Math.round(
                      (housedata.completedNum / housedata.total) * 100
                    ) + "%"
                  : "暂无数据"
              }}
            </div>
          </div>
        </div>
        <el-divider></el-divider>
      </div>
      <div id="bar1" style="height: 270px"></div>
      <div id="echart2" style="height: 270px"></div>
    </div>
    <div class="mid">
      <Echarts @getpath="getpath" />
    </div>
    <div class="left">
      <div class="l-top">
        <div class="title">申请情况</div>
        <div class="mid">
          <div id="echart3" style="width: 200px; height: 100%"></div>
          <div id="echart4" style="width: 100px; height: 100%"></div>
          <div class="list">
            <div
              class="title"
              v-for="item in houseinsaiddata"
              :key="item.propertyNature"
            >
              {{ item.propertyNature + "：" }}
              <div class="data">
                {{ item.total }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="l-mid">
        <div class="title">收费情况</div>
        <div class="content">
          <div id="echarts5" style="width: 150px; height: 240px">a</div>
          <div id="echarts6" style="width: 150px; height: 240px">a</div>
          <div class="l-list">
            <div class="title">
              收费房数:
              <div class="data">
                {{ houspaydata.total }}
              </div>
            </div>
            <div class="title">
              已收费房数 :
              <div class="data">
                {{ houspaydata.paidNum }}
              </div>
            </div>
            <div class="title">
              欠费房数:
              <div class="data">
                {{ houspaydata.unpaidNum }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  gethousedata,
  gethousepaydata,
  gethouseinaera,
  gethousecustoms,
  gethousetype,
} from "@/api/echarts/gethousedata";
import { getMaplist } from "../../api/map";
import * as echarts from "echarts";
import Echarts from "../../components/Echarts.vue";

export default {
  data() {
    return {
      housedata: {},
      houspaydata: {},
      houseinsaiddata: {},
    };
  },
  components: {
    Echarts,
  },
  methods: {
    darw() {
      var echart = document.getElementById("bar1");
      var mychart = echarts.init(echart);
      var colors = ["#73DEBD", "#26C978"];
      var option;
      option && mychart.setOption(option);
      gethousetype().then((res) => {
        console.log(res);
        var data = [];
        var array = [];
        var name = [];
        var series = [];
        for (var i = 0; i < res.data.length; i++) {
          if (array.indexOf(res.data[i].propertyNature) === -1) {
            data.push({
              name: [res.data[i].customsName],
              type: res.data[i].propertyNature,
              value: [res.data[i].propertyCount],
            });
            array.push(res.data[i].propertyNature);
          } else {
            for (var j = 0; j < data.length; j++) {
              if (data[j].type === res.data[i].propertyNature) {
                data[j].name.push(res.data[i].customsName);
                data[j].value.push(res.data[i].propertyCount);
                break;
              }
            }
          }
        }

        for (var i = 0; i < data.length; i++) {
          series.push({
            name: data[i].type,
            type: "bar",
            barWidth: "30",
            stack: "total",
            emphasis: {
              focus: "series",
            },
            data: data[i].value,
          });
          name.push(data[i].name);
        }

        mychart.setOption({
          title: {
            text: "某某市海关-住房入住情况",
            textStyle: {
              color: "#fff",
              fontSize: "16",
            },
            textAlign: "center",
            left: "200",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          xAxis: {
            type: "category",
            data: data[0].name,
            axisLabel: {
              color: "#fff",
              rotate: 90,
            },
          },
          dataZoom: [
            {
              show: true,
              height: 20,
              xAxisIndex: [0],
              bottom: 0,
              start: 10,
              end: 80,
              handleIcon:
                "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
              handleSize: "110%",
              handleStyle: {
                color: "#5B3AAE",
              },
              textStyle: {
                color: "rgba(204,187,225,0.5)",
              },
              fillerColor: "rgba(67,55,160,0.4)",
              borderColor: "rgba(204,187,225,0.5)",
            },
            {
              type: "inside",
              show: true,
              height: 15,
              start: 1,
              end: 35,
            },
          ],
          color: ["#22b8ed", "#ffd54f", "#fb8f8e", "#8fc31f"],
          yAxis: {
            type: "value",
            nameTextStyle: {
              color: "#fff",
            },
            axisLabel: {
              color: "#fff",
            },
          },
          series: series,
        });
      });
    },
    darwOne() {
      var echart = document.getElementById("echart2");
      var mychart = echarts.init(echart);
      var colors = ["#22b8ed", "#ffd54f"];
      var datalist = {
        data: [
          [12, 30, 34, 15, 16, 12, 32, 34, 15, 16],
          [42, 20, 30, 34, 15, 16, 12, 34, 15, 16],
        ],
      };
      var option;
      option && mychart.setOption(option);
      gethousecustoms().then((res) => {
        console.log(res);
        var name = [];
        var completedNum = [];
        var uncompletedNum = [];
        for (var i = 0; i < res.data.length; i++) {
          name.push(res.data[i].customsName);
          completedNum.push(res.data[i].completedNum);
          uncompletedNum.push(res.data[i].uncompletedNum);
        }
        mychart.setOption({
          title: {
            text: "海关-住房入住情况",
            textStyle: {
              color: "#fff",
              fontSize: "16",
            },
            textAlign: "center",
            left: "200",
          },
          color: colors,
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          xAxis: {
            type: "category",
            data: name,
            axisLabel: {
              color: "#fff",
              rotate: 90,
            },
          },
          yAxis: {
            type: "value",
            nameTextStyle: {
              color: "#fff",
            },
            axisLabel: {
              color: "#fff",
            },
          },
          series: [
            {
              name: "已入住",
              type: "bar",
              stack: "total",
              barWidth: "20",
              barMinHeight: "20",
              label: {
                show: false,
              },
              emphasis: {
                focus: "series",
              },
              data: completedNum,
            },
            {
              name: "未入住",
              type: "bar",
              stack: "total",
              barWidth: "10",
              barMinHeight: "10",
              label: {
                show: false,
              },
              emphasis: {
                focus: "series",
              },
              data: uncompletedNum,
            },
          ],
        });
      });
    },
    darwTwo() {
      var dom = document.getElementById("echart3");
      var char = echarts.init(dom);
      var option;
      option && char.setOption(option);
      gethouseinaera().then((res) => {
        var data = res.data;
        console.log(data, "data");
        char.setOption({
          title: {
            text: "入住房数",
            left: "left",
            textStyle: {
              color: "#fff",
              fontSize: "16px",
            },
          },
          xAxis: {
            type: "category",
            show: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#fff",
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
          grid: {
            bottom: "10",
          },

          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
            formatter: "{b} : {c}",
          },

          yAxis: {
            type: "value",
            nameTextStyle: {
              color: "#fff",
            },
            axisLabel: {
              color: "#fff",
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#fff",
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
          series: [
            {
              barWidth: "20",
              itemStyle: {
                color: function (params) {
                  // 通过回调函数设置每个柱形的颜色
                  var colorList = ["#00c0e9", "#0096f3", "#33CCFF", "#33FFCC"];
                  return colorList[params.dataIndex];
                },
              },
              data: [
                {
                  value: data[0] ? data[0].total : 0,
                  name: data[0] ? data[0].propertyNature : "数据暂无",
                },
                {
                  value: data[1] ? data[1].total : 1,
                  name: data[1] ? data[1].propertyNature : "数据暂无",
                },
              ],
              type: "bar",
            },
          ],
        });
      });
    },
    darwThree() {
      var dom = document.getElementById("echart4");
      var char = echarts.init(dom);
      var option;
      option && char.setOption(option);
      gethouseinaera().then((res) => {
        var data = [];
        for (var i = 0; i < res.data.length; i++) {
          data.push({
            name: res.data[i].propertyNature,
            type: "bar",
            stack: "total",
            barWidth: "20",
            label: {
              show: false,
            },
            emphasis: {
              focus: "series",
            },
            data: [res.data[i].total],
          });
        }
        char.setOption({
          title: {
            text: "占比",
            left: "left",
            textStyle: {
              color: "#fff",
              fontSize: "16px",
            },
          },
          xAxis: {
            type: "category",
            show: false,
          },
          grid: {
            bottom: "10",
            left: "30",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          yAxis: {
            type: "value",
            nameTextStyle: {
              color: "#fff",
            },
            axisLabel: {
              color: "#fff",
            },
          },
          series: data,
        });
      });
    },
    darwFour() {
      var doc = document.getElementById("echarts5");
      var char = echarts.init(doc);
      var option;
      option && char.setOption(option);
      gethousepaydata().then((res) => {
        var data = res.data;
        char.setOption({
          title: {
            text:
              "收费房占比:" +
              Math.round((data.paidNum / data.total) * 100) +
              "%",
            textStyle: {
              color: "#fff",
              fontSize: "14px",
            },
            top: "bottom",
            left: "center",
          },
          tooltip: {
            show: true,
            trigger: "item",
            triggerOn: "mousemove",
          },
          series: [
            {
              name: "收费房占比",
              type: "pie",
              radius: "95%",
              label: {
                show: false,
              },
              data: [
                { value: data.paidNum, name: "已收费" },
                { value: data.total, name: "全部住房" },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        });
      });
    },
    darwFive() {
      var doc = document.getElementById("echarts6");
      var char = echarts.init(doc);
      var option;
      option && char.setOption(option);
      gethousepaydata().then((res) => {
        var data = res.data;
        char.setOption({
          title: {
            text:
              "收费率:" + Math.round((data.paidNum / data.total) * 100) + "%",
            textStyle: {
              color: "#fff",
              fontSize: "14px",
            },
            top: "bottom",
            left: "center",
          },
          tooltip: {
            show: true,
            trigger: "item",
            triggerOn: "mousemove",
          },
          series: [
            {
              name: "收费率",
              type: "pie",
              radius: "95%",
              label: {
                show: false,
              },
              data: [
                { value: data.paidNum, name: "已收费" },
                { value: data.unpaidNum, name: "未收费" },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        });
      });
    },
    getdata() {
      gethousedata()
        .then((res) => {
          this.housedata = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
      gethousepaydata()
        .then((res) => {
          this.houspaydata = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
      gethouseinaera()
        .then((res) => {
          this.houseinsaiddata = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.darw();
    this.darwOne();
    this.darwThree();
    this.darwTwo();
    this.darwFour();
    this.darwFive();
    this.getdata();
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  .right,
  .left {
    width: 400px;
    background-color: rgba(222, 222, 222, 0.278);
    backdrop-filter: blur(50px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  }
  .right {
    border-radius: 25px 10px 25px 10px;
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top,
    .btm {
      width: 90%;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
      padding: 10px;
      border-radius: 15px;
      margin: 5px 10px 0 10px;
      .el-divider {
        margin: 5px 0 10px 0;
      }
      .hader {
        font-size: 20px;
      }
      .list {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .title {
          font-size: 16px;
          .data {
            margin-top: 5px;
          }
        }
      }
    }
    #bar1 {
      margin-top: 10px;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
      padding: 10px;
      border-radius: 15px;
      width: 90%;
    }
    #echart2 {
      margin-top: 10px;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
      padding: 10px;
      border-radius: 15px;
      width: 90%;
    }
  }
  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    text-align: left;
    border-radius: 10px 25px 10px 25px;
    .l-top,
    .l-mid,
    .l-btm {
      height: 40%;
      margin-left: 5px;
      margin-top: 5px;
      margin-bottom: 5px;
      .line {
        border: 1px solid #ccc;
      }
    }
    .l-top {
      padding: 10px;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
      width: 90%;
      border-radius: 10px;
      .title {
        font-size: 20px;
        margin-bottom: 5px;
      }
      .mid {
        height: 90%;
        display: flex;
        justify-content: space-around;
        .list {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .title {
            font-size: 14px;
            .data {
              color: #e3e3e3;
            }
          }
        }
      }
    }
    .l-mid {
      padding: 10px;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
      width: 90%;
      border-radius: 10px;
      .title {
        font-size: 20px;
        margin-bottom: 5px;
      }
      .content {
        display: flex;
      }
    }
    .l-top:hover,
    .l-mid:hover {
      background-color: rgba(6, 107, 130, 0.399);
      backdrop-filter: blur(50px);
      border-radius: 25px;
    }
  }
  .right:hover,
  .left:hover {
    box-shadow: 3px 3px 10px rgba(127, 197, 255, 0.532);
  }
}
</style>