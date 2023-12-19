<template>
  <div class="container">
    <div class="left">
      <div class="form">
        <div class="formitem">
          <el-select
            v-model="list.customsId"
            placeholder="请输入海关"
            clearable
            @change="changeDev"
          >
            <el-option
              v-for="item in customsType"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="list.deptId"
            clearable
            placeholder="请输入部门"
            @change="changedept"
          >
            <el-option
              v-for="item in devmentType"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
              {{ item.name }}
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="top">
        <div class="header">问题库</div>
        <el-divider></el-divider>
        <div class="list">
          <div class="title">
            问题总数:
            <div class="data">
              {{ problemlist.problemTotal ? problemlist.problemTotal : "0" }}
            </div>
          </div>
          <div class="title">
            已处理问题数:
            <div class="data">
              {{ problemlist.problemCorrect ? problemlist.problemCorrect : 0 }}
            </div>
          </div>
          <div class="title">
            未处理:
            <div class="data">
              {{
                problemlist.problemRectified
                  ? problemlist.problemRectified
                  : "0"
              }}
            </div>
          </div>
          <div class="title">
            处理率:
            <div class="data">
              {{
                problemlist.problemTotal
                  ? Math.round(
                      (problemlist.problemCorrect / problemlist.problemTotal) *
                        100
                    ) + "%"
                  : "0"
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="l-top">
        <div class="title">内控库</div>
        <div class="content">
          <div class="l-list">
            <div class="title">
              内控总数:
              <div class="data">
                {{
                  problemlist.internalTotal
                    ? problemlist.internalTotal
                    : "暂无数据"
                }}
              </div>
            </div>
            <div class="title">
              已关联内控数:
              <div class="data">
                {{
                  problemlist.internalAssociated
                    ? problemlist.internalAssociated
                    : "0"
                }}
              </div>
            </div>
            <div class="title">
              待关联内控数:
              <div class="data">
                {{
                  problemlist.internalUnassociated
                    ? problemlist.internalUnassociated
                    : "0"
                }}
              </div>
            </div>
          </div>
          <div id="echarts1" style="width: 150px; height: 150px"></div>
          <div id="echarts2" style="width: 150px; height: 150px"></div>
        </div>
      </div>
      <div class="l-mid">
        <div class="title">规章制度库</div>
        <div class="content">
          <div class="l-list">
            <div class="title">
              规章制度总数:
              <div class="data">
                {{ problemlist.rulesTotal ? problemlist.rulesTotal : "0" }}
              </div>
            </div>
            <div class="title">
              已关联规章制度数:
              <div class="data">
                {{
                  problemlist.rulesAssociated
                    ? problemlist.rulesAssociated
                    : "0"
                }}
              </div>
            </div>
            <div class="title">
              待关联规章制度数:
              <div class="data">
                {{
                  problemlist.rulesUnassociated
                    ? problemlist.rulesUnassociated
                    : "0"
                }}
              </div>
            </div>
          </div>
          <div id="echarts3" style="width: 150px; height: 150px"></div>
          <div id="echarts4" style="width: 150px; height: 150px"></div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <div class="title">
          <div class="tig">统计指标：</div>
          <el-select v-model="form.selectvalue" @change="change">
            <el-option
              v-for="item in form.selectoption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              {{ item.label }}
            </el-option>
          </el-select>
        </div>
        <div class="time">
          <div class="timecenter">
            <div class="timetitle">审计年度：</div>
            <div class="timebox">
              <el-date-picker
                v-model="form.start"
                type="year"
                format="yyyy"
                value-format="yyyy"
                placeholder="开始时间"
                @change="changstarttiem"
              ></el-date-picker>
              <div>-</div>
              <el-date-picker
                v-model="form.end"
                type="year"
                format="yyyy"
                value-format="yyyy"
                placeholder="结束时间"
                @change="changendtiem"
              ></el-date-picker>
            </div>
          </div>
          <div class="box">
            <div class="box-right"></div>
            <span>已整改</span>
            <div class="box-left"></div>
            <span>整改中</span>
          </div>
        </div>
      </div>
      <div class="echart">
        <div id="chart1" style="width: 100%; height: 100%"></div>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <div class="title">
          <div class="tig">分析指标：</div>
          <el-select v-model="formonne.selectvalue" @change="changeone">
            <el-option
              v-for="item in formonne.selectoption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              {{ item.label }}
            </el-option>
          </el-select>
        </div>
        <div class="time">
          <div class="timecenter">
            <div class="timetitle">审计年度：</div>
            <div class="timebox">
              <el-date-picker
                v-model="formonne.start"
                type="year"
                format="yyyy"
                value-format="yyyy"
                placeholder="开始时间"
                @change="changestarttiem"
              ></el-date-picker>
              <div>-</div>
              <el-date-picker
                v-model="formonne.end"
                type="year"
                format="yyyy"
                value-format="yyyy"
                placeholder="结束时间"
                @change="changeendtiem"
              ></el-date-picker>
            </div>
          </div>
        </div>
      </div>
      <div class="echart">
        <div id="chart2" style="width: 100%; height: 100%"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getdeptdata,
  getanalysisIndex,
  getissueTrends,
  getCustomsdata,
} from "@/api/echarts/getechartsdata";
import { getrulecount } from "@/api/data/rule/getrule";
import { getinareacount } from "@/api/data/neikong/getneikong";
import { problemBase } from "@/api/data/wenti/getWenti";
import { decrypt } from "@/utils/jsencrypt";
import Echarts from "../../components/Echarts.vue";
import * as echarts from "echarts";
import { getdept, getdeptcustoms } from "@/api/dept/getdept";
import { getMaplist } from "../../api/map";
export default {
  data() {
    return {
      devmentValue: "",
      devmentType: [], //借调部门
      customsType: [],
      customsValue: "",
      region: [],
      problemlist: {},
      inaeralist: {},
      rulelist: {},
      form: {
        selectvalue: 1,
        start: "",
        end: "",
        selectoption: [
          {
            label: "职能部门迎审自查问题整改率",
            value: 1,
          },
          {
            label: "职能部门审计查出问题整改率",
            value: 2,
          },
          {
            label: "隶属海关审计查出问题整改率",
            value: 3,
          },
          {
            label: "事业单位审计查出问题整改率",
            value: 4,
          },
        ],
      },
      formlist: {
        1: {
          type: "1",
          startYear: null,
          endYear: null,
        },
        2: {
          type: "2",
          startYear: null,
          endYear: null,
        },
        3: {
          type: "3",
          startYear: null,
          endYear: null,
        },
        4: {
          type: "4",
          startYear: null,
          endYear: null,
        },
      },
      formonne: {
        start: null,
        end: null,
        selectvalue: "1",
        selectoption: [
          {
            label: "关区查出问题占比",
            value: "1",
          },
          {
            label: "职能部门查出问题占比",
            value: "2",
          },
          {
            label: "关区业务领域查出问题趋势",
            value: "3",
          },
        ],
      },
      formList: {
        startYear: null,
        endYear: null,
      },
      list: {
        customsId: null,
        deptId: null,
      },
    };
  },
  components: {
    Echarts,
  },

  methods: {
    darwTwo(list) {
      var doc = document.getElementById("echarts1");
      var char = echarts.init(doc);
      var option1;
      option1 && char.setOption(option1);
      char.setOption({
        title: {
          text:
            list.internalTotal === 0
              ? "关联率:" + "0" + "%"
              : "关联率:" +
                Math.round(
                  (list.internalAssociated / list.internalTotal) * 100
                ) +
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
        color: [
          "#fc8452",
          "#9a60b4",
          "#ea7ccc",
          "#5470c6",
          "#91cc75",
          "#fac858",
          "#ee6666",
          "#73c0de",
          "#3ba272",
        ],
        series: [
          {
            name: "内控库",
            type: "pie",
            radius: "75%",
            label: {
              show: false,
            },
            data: [
              { value: list.internalAssociated, name: "已关联" },
              { value: list.internalUnassociated, name: "未关联" },
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
    },
    darwThree(list) {
      var doc = document.getElementById("echarts2");
      var char = echarts.init(doc);
      var option;

      option && char.setOption(option);
      char.setOption({
        title: {
          text: "内控与问题比:" + list.internalTotal + "/" + list.problemTotal,
          textStyle: {
            color: "#fff",
            fontSize: "14px",
          },
          top: "bottom",
          left: "center",
        },
        color: [
          "#fc8452",
          "#9a60b4",
          "#ea7ccc",
          "#5470c6",
          "#91cc75",
          "#fac858",
          "#ee6666",
          "#73c0de",
          "#3ba272",
        ],
        tooltip: {
          show: true,
          trigger: "item",
          triggerOn: "mousemove",
        },
        series: [
          {
            name: "内控库",
            type: "pie",
            radius: "75%",
            label: {
              show: false,
            },
            data: [
              { value: list.problemTotal, name: "问题数" },
              { value: list.internalTotal, name: "内控数" },
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
      // problemBase().then((res) => {
      //   var list;
      //   if (res.data) {
      //     list = res.data;
      //   } else {
      //     list = {
      //       total: 0,
      //     };
      //   }
      //   getinareacount(this.list).then((res) => {
      //     const inaearlist = res.data;
      //   });
      // });
    },
    darwFour(list) {
      var doc = document.getElementById("echarts3");
      var char = echarts.init(doc);
      var option;
      option && char.setOption(option);
      char.setOption({
        title: {
          text:
            list.rulesTotal === 0
              ? "关联率:" + "0" + "%"
              : "关联率:" +
                Math.round((list.rulesAssociated / list.rulesTotal) * 100) +
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
        color: [
          "#fc8452",
          "#9a60b4",
          "#ea7ccc",
          "#5470c6",
          "#91cc75",
          "#fac858",
          "#ee6666",
          "#73c0de",
          "#3ba272",
        ],
        series: [
          {
            name: "规章制度库",
            type: "pie",
            radius: "75%",
            label: {
              show: false,
            },
            data: [
              { value: list.rulesAssociated, name: "已关联" },
              { value: list.rulesUnassociated, name: "未关联" },
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
    },
    darwFive(list) {
      var doc = document.getElementById("echarts4");
      var char = echarts.init(doc);
      var option;
      option && char.setOption(option);
      char.setOption({
        title: {
          text: "规章与问题比:" + list.rulesTotal + "/" + list.problemTotal,
          textStyle: {
            color: "#fff",
            fontSize: "14px",
          },
          top: "bottom",
          left: "center",
        },
        color: [
          "#fc8452",
          "#9a60b4",
          "#ea7ccc",
          "#5470c6",
          "#91cc75",
          "#fac858",
          "#ee6666",
          "#73c0de",
          "#3ba272",
        ],
        tooltip: {
          show: true,
          trigger: "item",
          triggerOn: "mousemove",
        },
        series: [
          {
            name: "规章制度库",
            type: "pie",
            radius: "75%",
            label: {
              show: false,
            },
            data: [
              { value: list.problemTotal, name: "问题数" },
              { value: list.rulesTotal, name: "规章制度数" },
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
    },
    darw(data) {
      var art = document.getElementById("chart1");
      var chart = echarts.init(art);
      var option;

      option && chart.setOption(option);
      getdeptdata(data)
        .then((res) => {
          const list = res.data;
          var salvProName = [];
          var salvProValue = [];
          var salvProMax = [];
          var com = [];
          for (var i = 0; i < list.length; i++) {
            salvProName.push(list[i].name || "无业务领域");
            salvProValue.push(list[i].problemRectified || 0);
            salvProMax.push(list[i].problemTotal || 0);
            if (list[i].problemTotal !== 0) {
              com.push(
                Math.round(
                  (list[i].problemRectified / list[i].problemTotal) * 100
                ) + "%"
              );
            } else {
              com.push("0%");
            }
          }
          chart.setOption({
            grid: {
              left: "2%",
              right: "2%",
              bottom: "2%",
              top: "2%",
              containLabel: true,
            },

            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "none",
              },
              formatter: function (params) {
                return params[0].name + params[0].value;
              },
            },
            xAxis: {
              show: false,
              type: "value",
            },
            yAxis: [
              {
                type: "category",
                inverse: true,
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                  },
                  width: 100,
                  overflow: "truncate",
                },
                splitLine: {
                  show: false,
                },
                axisTick: {
                  show: false,
                },
                axisLine: {
                  show: false,
                },
                data: salvProName,
              },
              {
                type: "category",
                inverse: true,
                axisTick: "none",
                axisLine: "none",
                show: true,
                axisLabel: {
                  textStyle: {
                    color: "#ffffff",
                    fontSize: "12",
                  },
                },
                data: com,
              },
            ],
            series: [
              {
                name: "值",
                type: "bar",
                zlevel: 1,
                itemStyle: {
                  normal: {
                    barBorderRadius: 30,
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "rgb(57,89,255,1)",
                      },
                      {
                        offset: 1,
                        color: "rgb(46,200,207,1)",
                      },
                    ]),
                  },
                },
                barWidth: 20,
                data: salvProValue,
              },
              {
                name: "背景",
                type: "bar",
                barWidth: 20,
                barGap: "-100%",
                data: salvProMax,
                itemStyle: {
                  normal: {
                    color: " #E6A23C",
                    barBorderRadius: 30,
                  },
                },
              },
            ],
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getdatabase() {
      getCustomsdata(this.list)
        .then((res) => {
          if (res.data) {
            this.problemlist = res.data;
          }
          this.darwTwo(res.data);
          this.darwThree(res.data);
          this.darwFour(res.data);
          this.darwFive(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
      getinareacount()
        .then((res) => {
          this.inaeralist = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
      getrulecount()
        .then((res) => {
          this.rulelist = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
      this.depet();
    },
    change(value) {
      this.form.start = null;
      this.form.end = null;
      console.log(value);
      if (value === "1") {
        this.darw();
      }
      console.log(this.formlist[value]);
      // this.form.selectvalue = value;
      this.darw(this.formlist[value]);
      // if (value === "2") {
      //   console.log(value);
      //   var art = document.getElementById("chart1");
      //   var chart = echarts.init(art);
      //   var salvProName = [
      //     "安徽省",
      //     "河南省",
      //     "浙江省",
      //     "湖北省",
      //     "贵州省",
      //     "江西省",
      //     "江苏省",
      //     "四川省",
      //     "云南省",
      //     "湖南省",
      //   ];
      //   var salvProValue = [239, 181, 154, 144, 135, 117, 74, 72, 67, 55];
      //   var salvProMax = []; //背景按最大值
      //   for (let i = 0; i < salvProValue.length; i++) {
      //     salvProMax.push(salvProValue[0]);
      //   }
      //   var option;
      //   option = {
      //     grid: {
      //       left: "2%",
      //       right: "2%",
      //       bottom: "2%",
      //       top: "2%",
      //       containLabel: true,
      //     },
      //     tooltip: {
      //       trigger: "axis",
      //       axisPointer: {
      //         type: "none",
      //       },
      //       formatter: function (params) {
      //         return params[0].name + " : " + params[0].value;
      //       },
      //     },
      //     xAxis: {
      //       show: false,
      //       type: "value",
      //     },
      //     yAxis: [
      //       {
      //         type: "category",
      //         inverse: true,
      //         axisLabel: {
      //           show: true,
      //           textStyle: {
      //             color: "#fff",
      //           },
      //         },
      //         splitLine: {
      //           show: false,
      //         },
      //         axisTick: {
      //           show: false,
      //         },
      //         axisLine: {
      //           show: false,
      //         },
      //         data: salvProName,
      //       },
      //       {
      //         type: "category",
      //         inverse: true,
      //         axisTick: "none",
      //         axisLine: "none",
      //         show: true,
      //         axisLabel: {
      //           textStyle: {
      //             color: "#ffffff",
      //             fontSize: "12",
      //           },
      //         },
      //         data: salvProValue,
      //       },
      //     ],
      //     series: [
      //       {
      //         name: "值",
      //         type: "bar",
      //         zlevel: 1,
      //         itemStyle: {
      //           normal: {
      //             barBorderRadius: 30,
      //             color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      //               {
      //                 offset: 0,
      //                 color: "rgb(57,89,255,1)",
      //               },
      //               {
      //                 offset: 1,
      //                 color: "rgb(46,200,207,1)",
      //               },
      //             ]),
      //           },
      //         },
      //         barWidth: 20,
      //         data: salvProValue,
      //       },
      //       {
      //         name: "背景",
      //         type: "bar",
      //         barWidth: 20,
      //         barGap: "-100%",
      //         data: salvProMax,
      //         itemStyle: {
      //           normal: {
      //             color: "rgba(24,31,68,1)",
      //             barBorderRadius: 30,
      //           },
      //         },
      //       },
      //     ],
      //   };
      //   option && chart.setOption(option);
      // }
    },
    changeone(value) {
      if (value === "1") {
        var art = document.getElementById("chart2");
        var chart = echarts.init(art);
        var option;
        chart.clear();
        option && chart.setOption(option);
        getanalysisIndex(this.formList)
          .then((res) => {
            const list = res.data;
            var salvProName = [];
            var salvProValue = [];
            var salvProMax = [];
            var com = [];
            for (var i = 0; i < list.length; i++) {
              salvProName.push(list[i].businessArea || "无业务领域");
              salvProValue.push(list[i].businessAreaCount || 0);
              com.push(list[i].businessAreaCount);
            }
            for (let i = 0; i < salvProValue.length; i++) {
              salvProMax.push(salvProValue[0]);
            }
            chart.setOption({
              grid: {
                left: "2%",
                right: "2%",
                bottom: "2%",
                top: "2%",
                containLabel: true,
              },
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "none",
                },
                formatter: function (params) {
                  return params[0].name + "所占问题数：" + params[0].value;
                },
              },
              xAxis: {
                show: false,
                type: "value",
              },
              yAxis: [
                {
                  type: "category",
                  inverse: true,
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: "#fff",
                    },
                  },
                  splitLine: {
                    show: false,
                  },
                  axisTick: {
                    show: false,
                  },
                  axisLine: {
                    show: false,
                  },
                  data: salvProName,
                },
                {
                  type: "category",
                  inverse: true,
                  axisTick: "none",
                  axisLine: "none",
                  show: true,
                  axisLabel: {
                    textStyle: {
                      color: "#ffffff",
                      fontSize: "12",
                    },
                  },
                  data: com,
                },
              ],
              series: [
                {
                  name: "值",
                  type: "bar",
                  zlevel: 1,
                  itemStyle: {
                    normal: {
                      barBorderRadius: 30,
                      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        {
                          offset: 0,
                          color: "rgb(57,89,255,1)",
                        },
                        {
                          offset: 1,
                          color: "rgb(46,200,207,1)",
                        },
                      ]),
                    },
                  },
                  barWidth: 20,
                  data: salvProValue,
                },
                // {
                //   name: "背景",
                //   type: "bar",
                //   barWidth: 20,
                //   barGap: "-100%",
                //   data: salvProMax,
                //   itemStyle: {
                //     normal: {
                //       color: " #E6A23C",
                //       barBorderRadius: 30,
                //     },
                //   },
                // },
              ],
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (value === "2") {
        var art = document.getElementById("chart2");
        var char = echarts.init(art);
        var option;
        char.clear();
        option && char.setOption(char);
        getdeptdata(this.formList).then((res) => {
          let list = res.data;
          const data = [];
          for (var i = 0; i < 10; i++) {
            data.push({
              name: list[i].name,
              value: list[i].problemTotal,
            });
          }
          char.setOption({
            color: [
              "#37a2da",
              "#32c5e9",
              "#9fe6b8",
              "#ffdb5c",
              "#ff9f7f",
              "#fb7293",
              "#e7bcf3",
              "#8378ea",
            ],
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} :({d}%)",
            },
            toolbox: {
              show: true,
            },
            legend: {
              type: "scroll",
              orient: "vertical",
              left: "0",
              align: "left",
              top: "0",
              textStyle: {
                color: "#fff",
              },
              height: 120,
            },
            series: [
              {
                name: "问题占比",
                type: "pie",
                radius: [0, 200],
                data: data,
              },
            ],
          });
        });
      }
      if (value === "3") {
        var art = document.getElementById("chart2");
        var chart = echarts.init(art);
        var option;
        chart.clear();
        option && chart.setOption(option);
        var xData = (function () {
          var data = [];
          for (var i = 1; i < 31; i++) {
            data.push(i + "日");
          }
          return data;
        })();
        getissueTrends(this.formList)
          .then((res) => {
            let list = res.data;
            let date = [];
            let data = [];
            let avg = [];
            for (var i = 0; i < list.issueList.length; i++) {
              date.push(list.issueList[i].annual);
              data.push(list.issueList[i].annualNum);
              avg.push(list.average);
            }
            console.log(avg);
            chart.setOption({
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "shadow",
                  textStyle: {
                    color: "#fff",
                  },
                },
              },
              grid: {
                borderWidth: 0,
                top: 110,
                bottom: 95,
                textStyle: {
                  color: "#fff",
                },
              },
              legend: {
                x: "46%",
                top: "11%",
                textStyle: {
                  color: "#90979c",
                },
                data: ["访问量", "订单量"],
              },

              calculable: true,
              xAxis: [
                {
                  type: "category",
                  axisLine: {
                    lineStyle: {
                      color: "#FFFFFF",
                    },
                  },
                  splitLine: {
                    show: false,
                  },
                  axisTick: {
                    show: false,
                  },
                  data: date,
                },
              ],

              yAxis: [
                {
                  type: "value",
                  splitLine: {
                    show: false,
                  },
                  axisLine: {
                    lineStyle: {
                      color: "#FFFFFF",
                    },
                  },
                },
              ],
              dataZoom: [
                {
                  show: true,
                  height: 30,
                  xAxisIndex: [0],
                  bottom: 30,

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
              series: [
                {
                  name: "问题数",
                  type: "line",
                  symbolSize: 10,
                  symbol: "circle",
                  itemStyle: {
                    color: "#6f7de3",
                  },
                  markPoint: {
                    label: {
                      normal: {
                        textStyle: {
                          color: "#fff",
                        },
                      },
                    },
                    data: [
                      {
                        type: "max",
                        name: "最大值",
                      },
                      {
                        type: "min",
                        name: "最小值",
                      },
                    ],
                  },
                  data: data,
                },
                {
                  name: "平均值",
                  type: "line",
                  symbolSize: 10,
                  symbol: "circle",
                  itemStyle: {
                    color: "#73DDFF",
                  },
                  markPoint: {
                    label: {
                      normal: {
                        textStyle: {
                          color: "#fff",
                        },
                      },
                    },
                    data: [
                      {
                        type: "max",
                        name: "最大值",
                      },
                      {
                        type: "min",
                        name: "最小值",
                      },
                    ],
                  },
                  data: avg,
                },
              ],
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    darwtwo() {
      var art = document.getElementById("chart2");
      var chart = echarts.init(art);
      var option;
      option && chart.setOption(option);
      getanalysisIndex()
        .then((res) => {
          const list = res.data;
          var salvProName = [];
          var salvProValue = [];
          var salvProMax = [];
          var com = [];
          for (var i = 0; i < list.length; i++) {
            salvProName.push(list[i].businessArea || "无业务领域");
            salvProValue.push(list[i].businessAreaCount || 0);
            com.push(list[i].businessAreaCount);
          }
          for (let i = 0; i < salvProValue.length; i++) {
            salvProMax.push(salvProValue[0]);
          }
          chart.setOption({
            grid: {
              left: "2%",
              right: "2%",
              bottom: "2%",
              top: "2%",
              containLabel: true,
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "none",
              },
              formatter: function (params) {
                return params[0].name + "所占问题数：" + params[0].value;
              },
            },
            xAxis: {
              show: false,
              type: "value",
            },
            yAxis: [
              {
                type: "category",
                inverse: true,
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                  },
                },
                splitLine: {
                  show: false,
                },
                axisTick: {
                  show: false,
                },
                axisLine: {
                  show: false,
                },
                data: salvProName,
              },
              {
                type: "category",
                inverse: true,
                axisTick: "none",
                axisLine: "none",
                show: true,
                axisLabel: {
                  textStyle: {
                    color: "#ffffff",
                    fontSize: "12",
                  },
                },
                data: com,
              },
            ],
            series: [
              {
                name: "值",
                type: "bar",
                zlevel: 1,
                itemStyle: {
                  normal: {
                    barBorderRadius: 30,
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "rgb(57,89,255,1)",
                      },
                      {
                        offset: 1,
                        color: "rgb(46,200,207,1)",
                      },
                    ]),
                  },
                },
                barWidth: 20,
                data: salvProValue,
              },
              // {
              //   name: "背景",
              //   type: "bar",
              //   barWidth: 20,
              //   barGap: "-100%",
              //   data: salvProMax,
              //   itemStyle: {
              //     normal: {
              //       color: " #E6A23C",
              //       barBorderRadius: 30,
              //     },
              //   },
              // },
            ],
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //获取单位
    depet() {
      getdept().then((res) => {
        const list = res.data;
        const length = list.length;
        this.customsType = list;
        // for (var i = 0; i < length; i++) {
        //   this.customsType.push(list[i]);
        // }
      });
    },
    //获取部门
    changeDev(value) {
      this.devmentType = [];
      this.Darw();
      getdeptcustoms(value)
        .then((res) => {
          const list = res.data;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.devmentType.push(list[i]);
          }
          console.log(this.devmentType);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    changstarttiem(value) {
      this.formlist[this.form.selectvalue].startYear = value;
      console.log(this.formlist[this.form.selectvalue]);
      this.darw(this.formlist[this.form.selectvalue]);
    },
    changendtiem(value) {
      this.formlist[this.form.selectvalue].endYear = value;
      console.log(this.formlist[this.form.selectvalue]);
      this.darw(this.formlist[this.form.selectvalue]);
    },
    changestarttiem(value) {
      this.formList.startYear = value;
      this.changeone(this.formonne.selectvalue);
    },
    changeendtiem(value) {
      this.formList.endYear = value;
      this.changeone(this.formonne.selectvalue);
    },
    Darw() {
      this.getdatabase();
    },
    changedept() {
      this.Darw();
    },
  },
  mounted() {
    this.depet();
    this.Darw();
    this.darw();
    this.darwtwo();
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
    width: 500px;
    background-color: rgba(222, 222, 222, 0.278);
    backdrop-filter: blur(50px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.5s;
  }
  .right {
    width: 600px;
    border-radius: 25px 10px 25px 10px;
    text-align: left;
    padding: 10px;

    .top {
      border-radius: 10px;
      display: flex;
      padding: 5px;
      flex-direction: column;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
      .title {
        width: 100%;
        display: flex;
        align-items: center;
        .tig {
          font-size: 20px;
        }
        .el-select {
          width: 80%;
          ::v-deep .el-input__inner {
            background-color: transparent;
            color: #fff;
          }
        }
      }
      .time {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        .timecenter {
          display: flex;
          align-items: center;
          .timetitle {
            font-size: 20px;
          }
          .timebox {
            display: flex;
            align-content: center;
            width: 300px;
            justify-content: space-between;
            align-items: center;
          }

          ::v-deep .el-input__inner {
            background-color: transparent;
          }
          ::v-deep .el-date-editor .el-range-input {
            background-color: transparent;
            width: 120px;
          }
        }
      }
      .box {
        display: flex;
        align-items: center;
        .box-right,
        .box-left {
          width: 30px;
          height: 30px;
          margin-right: 5px;
        }
        .box-right {
          background-color: rgb(57, 89, 255, 1);
        }
        .box-left {
          background-color: #e6a23c;
        }
      }
    }
    .echart {
      height: 600px;
      width: 100%;
      margin-top: 10px;
      padding: 5px;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
      border-radius: 10px;
    }
  }
  .left {
    border-radius: 10px 25px 10px 25px;
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: left;
    padding: 10px;
    .form {
      .formitem {
        display: flex;
        .el-select {
          padding: 5px;
          color: #fff;
          background-color: transparent;

          ::v-deep .el-input__inner {
            background-color: transparent;
            color: #fff;
          }
        }
      }
    }
    .top {
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 10px;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
      .header {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        font-size: 20px;
        font-weight: 500;
      }
      .list {
        width: 100%;
        display: flex;
        justify-content: space-around;
      }
    }
    .l-top {
      padding: 10px;
      border-radius: 10px;
      margin-left: 5px;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
      .title {
        font-size: 20px;
        margin-bottom: 5px;
      }
      .content {
        display: flex;
        justify-content: space-between;
        .l-list {
          font-size: 12px;
          .title {
            font-size: 16px;
          }
        }
      }
    }
    .l-mid {
      padding: 10px;
      border-radius: 10px;
      margin-left: 5px;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
      .title {
        font-size: 20px;
        margin-bottom: 5px;
      }
      .content {
        display: flex;
        justify-content: space-between;
        .l-list {
          font-size: 12px;
          .title {
            font-size: 16px;
          }
        }
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
    box-shadow: 3px 3px 10px rgba(10, 173, 232, 0.532);
  }
}
</style>