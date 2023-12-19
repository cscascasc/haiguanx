<template>
  <div class="container">
    <div class="right">
      <div class="top">
        <div class="hader">采购审批</div>
        <el-divider></el-divider>
        <div class="list">
          <div class="title">
            申请总数:
            <div class="data">
              {{ procuredata.total }}
            </div>
          </div>
          <div class="title">
            已完结:
            <div class="data">
              {{ procuredata.completedNum }}
            </div>
          </div>
          <div class="title">
            审批中:
            <div class="data">
              {{ procuredata.uncompletedNum }}
            </div>
          </div>
          <div class="title">
            拒绝率:
            <div class="data">
              {{
                procuredata.refuseNum
                  ? Math.round(
                      (procuredata.refuseNum / procuredata.total) * 100
                    ) + "%"
                  : "暂无数据"
              }}
            </div>
          </div>
        </div>
        <el-divider></el-divider>
      </div>
      <div id="bar1" style="height: 280px"></div>
      <div id="echart2" style="height: 280px"></div>
    </div>
    <div class="mid">
      <Echarts @getpath="getpath" />
    </div>
    <div class="left">
      <div class="l-top">
        <div class="title">申请情况</div>
        <div class="line"></div>
        <div class="mid">
          <div id="echart3" style="width: 200px; height: 260px"></div>
          <div id="echart4" style="width: 80px; height: 260px"></div>
          <div class="list">
            <div class="title">
              委托采购:
              <div class="data">
                {{ procuretypedata[0] }}
              </div>
            </div>
            <div class="title">
              比选/竞价采购：
              <div class="data">{{ procuretypedata[1] }}</div>
            </div>
            <div class="title">
              市场比价：
              <div class="data">{{ procuretypedata[2] }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="l-mid">
        <div class="title">处理情况</div>
        <div class="line"></div>
        <div class="content">
          <div id="echart5" style="width: 150px; height: 250px"></div>
          <div id="echart6" style="width: 150px; height: 250px"></div>
          <div id="echart7" style="width: 150px; height: 250px"></div>
        </div>
      </div>
      <div class="l-btm"></div>
    </div>
  </div>
</template>

<script>
import {
  getprocurecount,
  getprocuretype,
  getprocurecustom,
  getprocuredept,
} from "@/api/echarts/getProcuredata";
import * as echarts from "echarts";
import Echarts from "../../components/Echarts.vue";
export default {
  data() {
    return {
      procuredata: {},
      procuretypedata: [],
      path: "729a4214-05e9-491a-b095-57cb269d95eb",
    };
  },
  components: {
    Echarts,
  },
  methods: {
    darw() {
      var echart = document.getElementById("bar1");
      var mychart = echarts.init(echart);
      var option;
      option && mychart.setOption(option);
      getprocurecustom().then((res) => {
        console.log(res, "ssss");
        const namelist = [];
        const typeonevaluelist = [];
        const data = [];
        for (var i = 0; i < res.data.length; i++) {
          var a = res.data[i];
          for (var b = 0; b < res.data.length; b++) {
            if (a.processType === res.data[b].processType) {
              // console.log(a)
              namelist.push(a.customsName);
            } else {
              break;
            }
          }
        }
        for (var i = 0; i < res.data.length; i++) {
          if (typeonevaluelist.indexOf(res.data[i].processType) === -1) {
            data.push({
              type: res.data[i].processType,
              value: [res.data[i].procureCount],
            });
            typeonevaluelist.push(res.data[i].processType);
          } else {
            for (var j = 0; j < data.length; j++) {
              if (data[j].type == res.data[i].processType) {
                data[j].value.push(res.data[i].procureCount);
                break;
              }
            }
          }
        }
        console.log(data, "data");
        mychart.setOption({
          title: {
            text: "贵州全关-采购申请数",
            textStyle: {
              color: "#fff",
              fontSize: "16px",
            },
            left: "center",
          },
          xAxis: {
            type: "category",
            data: namelist ? namelist : "暂无数据",
            axisLabel: {
              color: "#fff",
              rotate: 90,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#fff",
              },
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
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          series: [
            {
              name: "委托采购",
              type: "bar",
              stack: "total",
              barWidth: "20",
              barMinHeight: "10",
              label: {
                show: true,
              },
              emphasis: {
                focus: "series",
              },
              itemStyle: {
                color: "#F8B448",
              },
              data: data[0] ? data[0].value : 0,
            },
            {
              name: "比价采购",
              type: "bar",
              stack: "total",
              barWidth: "10",
              barMinHeight: "10",
              label: {
                show: true,
              },
              emphasis: {
                focus: "series",
              },
              data: data[1] ? data[1].value[0] : 0,
            },
            {
              name: "市场采购",
              type: "bar",
              stack: "total",
              barWidth: "10",
              barMinHeight: "10",
              label: {
                show: true,
              },
              emphasis: {
                focus: "series",
              },
              data: data[2] ? data[2].value[0] : 0,
            },
          ],
        });
      });
    },
    darwOne() {
      var echart = document.getElementById("echart2");
      var mychart = echarts.init(echart);
      var option;
      option && mychart.setOption(option);
      getprocuredept(this.path).then((res) => {
        var data = [];
        var array = [];
        var series = [];
        var namelist = ["委托采购", "比价采购", "市场采购"];
        for (var i = 0; i < res.data.length; i++) {
          if (array.indexOf(res.data[i].processType) === -1) {
            data.push({
              name: [res.data[i].deptName],
              type: res.data[i].processType,
              value: [res.data[i].procureCount],
            });
            array.push(res.data[i].processType);
          } else {
            for (var j = 0; j < data.length; j++) {
              if (data[j].type == res.data[i].processType) {
                data[j].value.push(res.data[i].procureCount);
                data[j].name.push(res.data[i].deptName);
                break;
              }
            }
          }
        }
        for (var i = 0; i < data.length; i++) {
          series.push({
            name: namelist[i],
            type: "bar",
            stack: "total",
            barWidth: "20",
            barMinHeight: "10",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: data[i] ? data[i].value : 0,
          });
        }
        console.log(data);
        mychart.setOption({
          title: {
            text: "贵州全关-采购申请数",
            textStyle: {
              color: "#fff",
              fontSize: "16px",
            },
            left: "center",
          },
          xAxis: {
            type: "category",
            data: data[0].name,
            axisLabel: {
              color: "#fff",
              rotate: 90,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#fff",
              },
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
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          series: series,
        });
      });
    },
    darwTwo() {
      var dom = document.getElementById("echart3");
      var char = echarts.init(dom);
      var option;
      option && char.setOption(option);
      getprocuretype().then((res) => {
        const list = [];
        for (var i = 0; i < res.data.length; i++) {
          list.push({
            name: res.data[i].processType,
            value: res.data[i].total,
          });
        }
        char.setOption({
          title: {
            text: "申请量",
            left: "left",
            textStyle: {
              color: "#fff",
              fontSize: "14px",
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
            left: "25",
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
                  value: list[0] ? list[0].value : 0 ,
                  name: "委托采购",
                },
                {
                  value:list[1] ? list[1].value : 0 ,
                  name: "比价采购",
                },
                {
                  value:list[2] ? list[2].value : 0 ,
                  name: "市场采购",
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
      getprocuretype().then((res) => {
        const list = [];
        for (var i = 0; i < res.data.length; i++) {
          list.push({
            name: res.data[i].processType,
            value: res.data[i].total,
          });
        }
        char.setOption({
          title: {
            text: "占比",
            left: "left",
            textStyle: {
              color: "#fff",
              fontSize: "14px",
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
          },
          grid: {
            bottom: "10",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          yAxis: {
            type: "value",
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
            nameTextStyle: {
              color: "#fff",
            },
            axisLabel: {
              color: "#fff",
            },
          },
          series: [
            {
              name: "委托采购",
              type: "bar",
              stack: "total",
              barWidth: "20",
              barMinHeight: "10",
              label: {
                show: true,
              },
              emphasis: {
                focus: "series",
              },
              itemStyle: {
                color: "#F8B448",
              },
              data: [ list[0] ? list[0].value : 0],
            },
            {
              name: "比价采购",
              type: "bar",
              stack: "total",
              barWidth: "10",
              barMinHeight: "10",
              label: {
                show: true,
              },
              emphasis: {
                focus: "series",
              },
              data: [list[1] ? list[1].value : 0],
            },
            {
              name: "市场采购",
              type: "bar",
              stack: "total",
              barWidth: "10",
              barMinHeight: "10",
              label: {
                show: true,
              },
              emphasis: {
                focus: "series",
              },
              data: [list[2] ? list[2].value : 0],
            },
          ],
        });
      });
    },
    darwFour() {
      var doc = document.getElementById("echart5");
      var char = echarts.init(doc);
      var option;
      option && char.setOption(option);
      getprocurecount().then((res) => {
        const list = res.data;
        char.setOption({
          title: {
            text:
              "完结率" +
              Math.round((list.completedNum / list.total) * 100) +
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
              name: "完结率",
              type: "pie",
              radius: "90%",
              label: {
                show: false,
              },
              data: [
                {
                  value: list.total,
                  name: "申请总数",
                },
                {
                  value: list.completedNum,
                  name: "已完结",
                },
              ],
            },
          ],
        });
      });
    },
    darwFive() {
      var doc = document.getElementById("echart6");
      var char = echarts.init(doc);
      var option;
      option && char.setOption(option);
      getprocurecount().then((res) => {
        const list = res.data;
        char.setOption({
          title: {
            text:
              "待处理率" +
              Math.round((list.uncompletedNum / list.total) * 100) +
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
              name: "待处理率",
              type: "pie",
              radius: "90%",
              label: {
                show: false,
              },
              data: [
                {
                  value: list.total,
                  name: "申请总数",
                },
                {
                  value: list.uncompletedNum,
                  name: "处理中",
                },
              ],
            },
          ],
        });
      });
    },
    darwSix() {
      var doc = document.getElementById("echart7");
      var char = echarts.init(doc);
      var option;
      option && char.setOption(option);
      getprocurecount().then((res) => {
        const list = res.data;
        char.setOption({
          title: {
            text:
              "拒绝率" + Math.round((list.refuseNum / list.total) * 100) + "%",
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
              name: "拒绝率",
              type: "pie",
              radius: "90%",
              label: {
                show: false,
              },
              data: [
                {
                  value: list.total,
                  name: "申请总数",
                },
                {
                  value: list.refuseNum,
                  name: "拒绝数",
                },
              ],
            },
          ],
        });
      });
    },
    getdata() {
      getprocurecount()
        .then((res) => {
          this.procuredata = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
      getprocuretype()
        .then((res) => {
          for (var i = 0; i < res.data.length; i++) {
            this.procuretypedata.push(res.data[i].total);
          }
          console.log(this.procuretypedata);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getpath(value) {
      this.path = value;
      console.log(this.path, "this.path");
    },
  },
  watch: {
    async path(value) {
      await this.darwOne();
    },
  },
  async mounted() {
    await this.darw();
    await this.darwOne();
    this.darwTwo();
    this.darwThree();
    this.darwFour();
    this.darwFive();
    this.darwSix();
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
    justify-content: space-around;
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
    justify-content: space-around;
    align-items: center;
    text-align: left;
    border-radius: 10px 25px 10px 25px;
    .l-top,
    .l-mid,
    .l-btm {
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