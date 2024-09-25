<template>
  <div class="container">
    <div class="right">
      <div class="top">
        <div class="hader">数据池</div>
        <div class="eachart">
          <div id="echart1" style="width: 90%; height: 220px"></div>
        </div>
        <div class="list">
          <div class="title">
            问题总数:
            <div class="data">
              {{ data ? data.problemTotal : "0" }}
            </div>
          </div>
          <div class="title">
            已处理问题数:
            <div class="data">
              {{ data ? data.problemCorrect : "0" }}
            </div>
          </div>
          <div class="title">
            未处理:
            <div class="data">
              {{ data ? data.problemRectified : "0" }}
            </div>
          </div>
          <div class="title">
            处理率:
            <div class="data">
              {{
                data
                  ? data.problemCorrect
                    ? Math.round(
                        (data.problemCorrect / data.problemTotal) * 100
                      ) + "%"
                    : "暂无数据"
                  : "暂无数据"
              }}
            </div>
          </div>
        </div>
        <el-divider></el-divider>
      </div>
      <div class="mid">
        <div class="hader">{{ customName }}</div>
        <div class="eachart">
          <div id="echart2" style="width: 90%; height: 220px"></div>
        </div>
        <div class="list">
          <div class="title">
            总人数:
            <div class="data">
              {{
                custom
                  ? custom.institutionalPosition +
                    custom.nonInstitutionalPosition
                  : "暂无数据"
              }}
            </div>
          </div>
          <div class="title">
            在编人员:
            <div class="data">
              {{ custom ? custom.institutionalPosition : "0" }}
            </div>
          </div>
          <div class="title">
            其他人数:
            <div class="data">
              {{ custom ? custom.nonInstitutionalPosition : "0" }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mid">
      <Echarts @getpath="getpath" />
    </div>
    <div class="left">
      <div class="box">
        <div class="title">问题库动态</div>
        <div class="news">
          <div
            class="newsitem"
            v-for="item in problem.tablist"
            :key="item.id"
            @click="goproblem(item)"
          >
            <div class="text">
              {{ item.problemDescription }}
            </div>
            <div>
              {{ item.createTime }}
            </div>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="title">审计署近期关注重点</div>
        <div class="news">
          <div
            class="newsitem"
            v-for="item in newtypeone.tablist"
            :key="item.id"
            @click="newdetile(item)"
          >
            <div class="text">
              {{ item.title }}
            </div>
            <div>
              {{ item.createTime }}
            </div>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="title">总署近期关注重点</div>
        <div class="news">
          <div
            class="newsitem"
            v-for="item in newtypetwo.tablist"
            :key="item.id"
            @click="newdetile(item)"
          >
            <div class="text">
              {{ item.title }}
            </div>
            <div>
              {{ item.createTime }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getunitinfo } from "@/api/dept/getdept";
import { getalldata } from "@/api/echarts/getechartsdata";
import { getproblem } from "@/api/data/wenti/getWenti";
import Echarts from "../../components/Echarts.vue";
import { getnews } from "@/api/data/news/getnews";
import * as echarts from "echarts";
import errCode from "@/utils/errCode";
import CommonSeachVue from "@/components/CommonSeach.vue";
export default {
  data() {
    return {
      data: {},
      custom: {},
      path: "729a4214-05e9-491a-b095-57cb269d95eb",
      newtypeone: {
        total: "",
        form: {
          size: 5,
          current: "1",
          type: "0",
        },
        tablist: [],
      },
      newtypetwo: {
        total: "",
        form: {
          size: 5,
          current: "1",
          type: "1",
        },
        tablist: [],
      },
      problem: {
        total: "",
        form: {
          size: 5,
          current: "1",
        },
        tablist: [],
      },
      customName: "",
    };
  },
  components: {
    Echarts,
  },
  methods: {
    pie() {
      //饼状图
      var form = {
        customsId: this.path,
      };
      var chartDom = document.getElementById("echart1");
      var mychar = echarts.init(chartDom);
      var option;
      option && mychar.setOption(option);
      getalldata(form).then((res) => {
        var data = res.data;
        mychar.setOption({
          tooltip: {
            show: true,
            trigger: "item",
            triggerOn: "mousemove",
          },
          series: [
            {
              name: "数据池",
              type: "pie",
              radius: "75%",
              left: "0",

              data: [
                { value: data.problemTotal, name: "问题库" },
                { value: data.internalTotal, name: "内控库" },
                { value: data.rulesTotal, name: "规章制度库" },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },

              label: {
                normal: {
                  formatter: "{b|{b}}\n{hr|}\n{c|{c}}",
                  rich: {
                    b: {
                      fontSize: 14,
                      color: "#FFF",
                      align: "left",
                      padding: 4,
                    },
                    hr: {
                      borderColor: "#CCCCCC",
                      width: "100%",
                      borderWidth: 2,
                      height: 0,
                    },
                    c: {
                      fontSize: 14,
                      align: "center",
                      padding: 4,
                      color: "#00EDED",
                    },
                  },
                },
              },
            },
          ],
        });
      });
    },
    pietwo() {
      //饼状图
      var chartDom = document.getElementById("echart2");
      var mychar = echarts.init(chartDom);
      var option;
      option && mychar.setOption(option);
      getunitinfo(this.path).then((res) => {
        var data = res.data;
        this.customName = data ? data.dept.name : "海关情况";
        mychar.setOption({
          tooltip: {
            show: true,
            trigger: "item",
            triggerOn: "mousemove",
          },
          series: [
            {
              name: data ? data.dept.name : "海关情况",
              type: "pie",
              radius: "75%",
              left: "0",
              data: [
                {
                  value: data ? data.institutionalPosition : "0",
                  name: "在编人数",
                },
                {
                  value: data ? data.nonInstitutionalPosition : "0",
                  name: "其他",
                },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },

              label: {
                normal: {
                  formatter: "{b|{b}}\n{hr|}\n{c|{c}}",
                  rich: {
                    b: {
                      fontSize: 14,
                      color: "#FFF",
                      align: "left",
                      padding: 4,
                    },
                    hr: {
                      borderColor: "#CCCCCC",
                      width: "100%",
                      borderWidth: 2,
                      height: 0,
                    },
                    c: {
                      fontSize: 14,
                      align: "center",
                      padding: 4,
                      color: "#00EDED",
                    },
                  },
                },
              },
            },
          ],
        });
      });
    },
    getdata() {
      const form = {
        customsId: this.path,
      };
      getalldata(form)
        .then((res) => {
          console.log("1");
          this.data = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
      getunitinfo(this.path)
        .then((res) => {
          this.custom = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getpath(value) {
      console.log(value);
      this.path = value;
    },
    getnew() {
      getnews(this.newtypeone.form)
        .then((res) => {
          this.newtypeone.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.newtypeone.tablist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getnews(this.newtypetwo.form)
        .then((res) => {
          this.newtypetwo.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.newtypetwo.tablist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getproblem(this.problem.form)
        .then((res) => {
          this.problem.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.problem.tablist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    newdetile(item) {
      this.$router.push({
        path: "/audidetile",
        query: {
          id: item.id,
          type: "detile",
        },
      });
    },
    goproblem(item) {
      this.$router.push({
        path: "/datadetil",
        query: {
          id: item.id,
          type: "detile",
        },
      });
    },
  },
  watch: {
    path(value) {
      const form = {
        customsId: this.path,
      };
      getalldata(form)
        .then((res) => {
          console.log("1");
          this.data = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
      console.log(value, "value");
      getunitinfo(this.path)
        .then((res) => {
          this.custom = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
      this.pietwo();
      this.pie();
    },
  },
  mounted() {
    this.getdata();
    this.pie();
    this.pietwo();
    this.getnew();
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  .right {
    text-align: left;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: rgba(222, 222, 222, 0.278);
    border-radius: 25px 10px 25px 10px;
    backdrop-filter: blur(50px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
    .top,
    .mid {
      width: 90%;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
      padding: 10px;
      border-radius: 15px;
      margin: 5px 10px 0 10px;
      .hader {
        font-size: 20px;
      }
      .el-divider {
        margin: 5px 0 10px 0;
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
    .top {
      display: flex;
      flex-direction: column;
      align-items: center;
      .hader {
        width: 90%;
        text-align: left;
        font-size: 20px;
        font-weight: bold;
      }
      .eachart {
        margin-top: 10px;
        width: 90%;
        display: flex;
        justify-content: center;
      }
    }
  }
  .left:hover,
  .right:hover {
    box-shadow: 3px 3px 10px rgba(127, 197, 255, 0.532);
  }
  .left {
    text-align: right;
    width: 400px;
    background-color: rgba(222, 222, 222, 0.278);
    border-radius: 10px 25px 10px 25px;
    backdrop-filter: blur(50px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3 inherit;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .box {
      width: 90%;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
      padding: 10px;
      border-radius: 15px;
      .title {
        display: flex;
        font-size: 18px;
        font-weight: bold;
      }
      .news {
        .newsitem {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          padding: 5px;
          .text {
            width: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 25px;
            text-align: left;
          }
        }
        .newsitem:hover {
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          border-radius: 15px;
          padding: 5px;
        }
      }
    }
  }
}
</style>