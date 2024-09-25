<template>
  <div class="container">
    <div class="tabs">
      <el-tabs type="border-card">
        <el-tab-pane label="问题">
          <div class="top">
            <div class="selectBox">
              <span>单位：</span>
              <el-select
                v-model="problemform.auditCustomsIds"
                clearable
                @change="changeDev"
              >
                <el-option
                  v-for="item in customsType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                  {{ item.name }}
                </el-option>
              </el-select>
              <span>责任部门：</span>
              <el-select v-model="problemform.responsibleDept" clearable>
                <el-option
                  v-for="item in devmentType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                  {{ item.name }}
                </el-option>
              </el-select>
              <span>状态：</span>
              <el-select v-model="problemform.status" placeholder="整改状态">
                <el-option
                  v-for="item in sation"
                  :key="item.lable"
                  :value="item.value"
                  :label="item.lable"
                >
                </el-option>
              </el-select>
            </div>
            <el-button type="primary" @click="sreachproblem">查询</el-button>
            <el-button type="success" @click="refesh">重置</el-button>
          </div>
          <div class="mid">
            <div class="item" v-if="problembsea[0]">
              <div class="slog">
                问题总数：
                <span>{{ problembsea[0].total }}</span>
              </div>
              <div class="slog">
                待整改：
                <span>{{ problembsea[0].rectifiedSum }}</span>
              </div>
              <div class="slog">
                已整改：
                <span>{{ problembsea[0].correctSum }}</span>
              </div>
              <div class="slog">
                已超期:
                <span>{{ problembsea[0].overdueSum }}</span>
              </div>
            </div>
          </div>
          <div class="main">
            <div class="table-box" v-if="problemList.length !== 0">
              <div
                class="table"
                v-for="item in problemList"
                :key="item.id"
                @click="problemDetile(item.id)"
              >
                <div class="tableitem">
                  <div class="header">
                    <div class="title">{{ item.problemDescription }}</div>
                    <div class="centent">
                      <el-button
                        round
                        :type="type[item.status].type"
                        size="small"
                        >{{ type[item.status].label }}</el-button
                      >
                    </div>
                  </div>
                  <div class="footer">
                    <div class="stion">
                      <span>业务领域</span>
                      <span>{{ item.businessArea }}</span>
                    </div>
                    <div class="time">
                      <span>录入时间</span>
                      <span>{{ item.createTime }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="problemList.length === 0">暂无数据</div>
          </div>
          <div class="pagination" v-if="problemtotal">
            <el-pagination
              background
              layout="total,prev, pager, next"
              :total="problemtotal"
              @prev-click="changepage"
              @next-click="changepage"
              @current-change="changepage"
              :page-size="problemform.size"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="内控">
          <div class="top">
            <div class="selectBox">
              <span>录入单位：</span>
              <el-select v-model="inareaform.deptId" clearable>
                <el-option
                  v-for="item in customsType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                  {{ item.name }}
                </el-option>
              </el-select>
              <span>问题关联状态：</span>
              <el-select
                v-model="inareaform.status"
                placeholder="整改状态"
                clearable
              >
                <el-option
                  v-for="item in concat"
                  :key="item.label"
                  :value="item.value"
                  :label="item.label"
                >
                </el-option>
              </el-select>
            </div>
            <el-button type="primary" @click="sreachineare">查询</el-button>
            <el-button type="success" @click="refesh">重置</el-button>
          </div>
          <div class="mid">
            <div class="item" v-if="inareaall[0]">
              <div class="slog">
                内控节点总数：
                <span>{{ inareaall[0].total }}</span>
              </div>
              <div class="slog">
                已关联问题：
                <span>{{ inareaall[0].associatedCount }}</span>
              </div>
              <div class="slog">
                待关联问题：
                <span>{{ inareaall[0].unassociatedCount }}</span>
              </div>
            </div>
          </div>
          <div class="main">
            <div class="table-box" v-if="inarealist.length !== 0">
              <div
                class="table"
                v-for="item in inarealist"
                :key="item.id"
                @click="inareadeile(item)"
              >
                <div class="tableitem">
                  <div class="header">
                    <div
                      class="title"
                      :style="{
                        textAlign: 'left',
                        maxHeight: '60px',
                        overflowY: 'hidden',
                        textOverflow: 'ellipsis',
                      }"
                    >
                      {{ item.nodeExplain }}
                    </div>
                    <div class="centent">
                      <el-button
                        round
                        :type="item.status !== 0 ? 'success' : 'warning'"
                        size="small"
                        >{{
                          item.status !== 0 ? "已关联" : "未关联"
                        }}</el-button
                      >
                    </div>
                  </div>
                  <div class="footer">
                    <div class="stion">
                      <span>业务领域</span>
                      <span>{{ item.businessArea }}</span>
                    </div>
                    <div class="time">
                      <span>录入时间</span>
                      <span>{{ item.createTime }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="inarealist.length === 0"></div>
          </div>
          <div class="pagination" v-if="inareatotal">
            <el-pagination
              background
              layout="total,prev, pager, next"
              :total="inareatotal"
              @prev-click="changeinareapage"
              @next-click="changeinareapage"
              @current-change="changeinareapage"
              :page-size="inareaform.size"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="规章制度库">
          <div class="top">
            <div class="selectBox">
              <span>录入单位：</span>
              <el-select v-model="ruleform.deptId" clearable>
                <el-option
                  v-for="item in customsType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                  {{ item.name }}
                </el-option>
              </el-select>
              <span>问题关联状态：</span>
              <el-select
                v-model="ruleform.status"
                placeholder="整改状态"
                clearable
              >
                <el-option
                  v-for="item in concat"
                  :key="item.label"
                  :value="item.value"
                  :label="item.label"
                >
                </el-option>
              </el-select>
            </div>
            <el-button type="primary" @click="sreachrule">查询</el-button>
            <el-button type="success" @click="refesh">重置</el-button>
          </div>
          <div class="mid">
            <div class="item" v-if="ruleall[0]">
              <div class="slog">
                规章制度总数：
                <span>{{ ruleall[0].total }}</span>
              </div>
              <div class="slog">
                已关联问题：
                <span>{{ ruleall[0].associatedCount }}</span>
              </div>
              <div class="slog">
                待关联问题：
                <span>{{ ruleall[0].unassociatedCount }}</span>
              </div>
            </div>
          </div>
          <div class="main">
            <div class="table-box" v-if="rulelist.length !== 0">
              <div
                class="table"
                v-for="item in rulelist"
                :key="item.id"
                @click="ruledeile(item)"
              >
                <div class="tableitem">
                  <div class="header">
                    <div class="title">{{ item.title }}</div>
                    <div class="centent">
                      <el-button
                        round
                        :type="
                          item.problemBases.length !== 0 ? 'success' : 'warning'
                        "
                        size="small"
                        >{{
                          item.problemBases.length !== 0 ? "已关联" : "未关联"
                        }}</el-button
                      >
                    </div>
                  </div>
                  <div class="footer">
                    <div class="stion">
                      <span>业务领域</span>
                      <span>{{ item.businessSubcategories }}</span>
                    </div>
                    <div class="time">
                      <span>录入时间</span>
                      <span>{{ item.createTime }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="rulelist.length === 0">暂无数据</div>
          </div>
          <div class="pagination" v-if="ruletotal">
            <el-pagination
              background
              layout="total,prev, pager, next"
              :total="ruletotal"
              :page-size="ruleform.size"
              @prev-click="changerulepage"
              @next-click="changerulepage"
              @current-change="changerulepage"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getproblem, problemBase } from "@/api/data/wenti/getWenti";
import { getinarea, getinareacount } from "@/api/data/neikong/getneikong";
import { getdept, getdeptcustoms } from "@/api/dept/getdept";
import { getrule, getrulecount } from "@/api/data/rule/getrule";
export default {
  name: "orderlist",
  data() {
    return {
      devmentValue: "",
      devmentType: [], //借调部门
      customsType: [],
      customsValue: "",
      inareacustomsValue: "",
      rulecustomsValue: "",
      genmentValue: "",
      sationValue: "",
      danweiValue: "",
      sation: [
        {
          lable: "不限",
          id: "1",
          value: null,
        },
        {
          lable: "待整改",
          id: "1",
          value: "0",
        },
        {
          lable: "已整改",
          id: "2",
          value: "1",
        },
      ],
      concat: [
        {
          label: "已关联",
          value: "1",
        },
        {
          label: "未关联",
          value: "0",
        },
      ],
      type: [
        {
          label: "待整改",
          type: "warning",
        },
        {
          label: "已整改",
          type: "success",
        },
        {
          label: "已超期",
          type: "danger",
        },
      ],
      problemform: {
        size: 10,
        current: 1,
        auditCustomsIds: null,
        responsibleDept: null,
        status: null,
      },
      inareaform: {
        size: 10,
        current: 1,

        status: null,
        deptId: null,
      },
      ruleform: {
        size: 10,
        current: 1,
        status: null,
        deptId: null,
      },
      selectList: [
        {
          label: "问题",
        },
        {
          label: "内控",
        },
        {
          label: "关联",
        },
      ],
      activeName: "first",
      problemList: [],
      problembsea: [],
      problemtotal: 0,
      inarealist: [],
      inareatotal: 0,
      inareaall: [],
      rulelist: [],
      ruletotal: 0,
      ruleall: [],
      cutomsid: null,
      cutomsname: null,
    };
  },
  components: {
    problemstatus() {
      return this.problemList.filter((item) => item.status === 1);
    },
  },
  methods: {
    problemDetile(id) {
      this.$router.push({
        path: "/datadetil",
        query: {
          id: id,
          type: "detile",
        },
      });
    },
    //获取问题
    getproblemlist() {
      getproblem(this.problemform)
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          this.problemtotal = Number(res.data.total);
          for (var i = 0; i < length; i++) {
            this.problemList.push(list[i]);
          }
          console.log(this.problemList);
        })
        .catch((error) => {
          console.error(error);
        });
      problemBase()
        .then((res) => {
          this.problembsea.push(res.data);
          console.log(this.problembsea);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //分页
    changepage(value) {
      this.problemform.current = value;
      this.problemList = [];
      this.getproblemlist();
    },
    changeinareapage(value) {
      this.inareaform.current = value;
      this.inarealist = [];
      this.getinarealist();
    },
    changerulepage(value) {
      this.ruleform.current = value;
      this.rulelist = [];
      this.getrulelist();
    },
    //获取内控
    getinarealist() {
      getinarea(this.inareaform)
        .then((res) => {
          this.inareatotal = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.inarealist.push(list[i]);
          }
          console.log(this.inarealist, "1");
        })
        .catch((error) => {
          console.error(error);
        });
      getinareacount()
        .then((res) => {
          this.inareaall.push(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //获取规则
    getrulelist() {
      getrule(this.ruleform)
        .then((res) => {
          this.ruletotal = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.rulelist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getrulecount()
        .then((res) => {
          this.ruleall.push(res.data);
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
        for (var i = 0; i < length; i++) {
          this.customsType.push(list[i]);
        }
      });
    },
    sreachproblem() {
      this.problemList = [];
      this.problemtotal = 0;
      getproblem(this.problemform)
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          this.problemtotal = Number(res.data.total);
          for (var i = 0; i < length; i++) {
            this.problemList.push(list[i]);
          }
          console.log(this.problemList);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //获取部门
    changeDev(value) {
      this.devmentType = [];
      getdeptcustoms(value)
        .then((res) => {
          const list = res.data;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.devmentType.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //内控详情
    inareadeile(item) {
      console.log(item);
      this.$router.push({
        path: "/controldetile",
        query: {
          id: item.id,
          step: item.type,
          type: "detile",
        },
      });
    },
    ruledeile(item) {
      console.log(item);
      this.$router.push({
        path: "/ruledetil",
        query: {
          id: item.id,
          type: "detile",
        },
      });
    },
    refesh() {
      this.$router.go();
    },
    sreachineare() {
      this.inarealist = [];
      getinarea(this.inareaform)
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.inarealist.push(list[i]);
          }
          console.log(this.inarealist, "1");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    sreachrule() {
      console.log(this.ruleform);
      this.rulelist = [];
      getrule(this.ruleform)
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.rulelist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getcustom() {
      console.log(this.$route.query, "sss");
      if (this.$route.query) {
        this.cutomsid = this.$route.query.type;
        this.cutomsname = this.$route.query.customs;
        this.problemform.auditCustomsIds = this.cutomsid;
        this.inareaform.deptId = this.cutomsid;
        this.ruleform.deptId = this.cutomsid;
      }
      // if(this.$route.params)
    },
  },
  created() {
    this.getcustom();
  },
  mounted() {
    this.getproblemlist();
    this.getinarealist();
    this.getrulelist();
    this.depet();
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(100vh - 60px);
  background-color: #fff;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;

  .tabs {
    width: 80%;
    margin-top: 20px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 15px;
    ::v-deep .el-tabs--border-card {
      border-radius: 15px;
    }
    ::v-deep .el-tabs__item {
      height: 50px;
      width: 150px;
      line-height: 50px;
      border-radius: 5px;
      border-bottom: 1px solid #ccc;
    }
    ::v-deep .el-tabs__item.is-active {
      background-color: #006699;
    }
  }

  .top {
    padding: 10px;
    width: 100%;
    display: flex;

    .el-select {
      margin-right: 15px;
    }
  }
  .mid {
    width: calc(100% - 40px);
    display: flex;
    padding: 0 20px 20px 20px;
    justify-content: space-between;
    .item {
      width: 100%;
      display: flex;
    }
    .slog {
      color: #949393;
      margin-right: 100px;
    }
  }
  .main {
    display: flex;
    width: 100%;
    height: 600px;
    overflow-y: scroll;
    overflow-x: hidden;
    .table {
      width: 70vw;
      padding-left: 20px;
      margin-bottom: 15px;
      .tableitem {
        width: calc(100% - 40px);
        height: 140px;
        box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
          rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
        border-radius: 20px;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        .header {
          display: flex;
          align-items: center;
          width: 90%;
          justify-content: space-between;
          margin-top: 10px;
          margin-left: 20px;
          .title {
            font-size: 22px;
            font-weight: 600;
            text-align: left;
            width: 70%;
          }
        }
        .footer {
          display: flex;
          margin-left: 20px;
          .stion,
          .time {
            margin-right: 20px;
            font-size: 14px;
            color: #949393;
            span {
              margin-right: 10px;
            }
          }
        }
      }
      .tableitem:hover {
        box-shadow: rgba(14, 127, 225, 0.48) 6px 2px 16px 0px,
          rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
      }
    }
    .dangjian {
      width: 100%;
      background-color: rgb(236 245 255);
      border-radius: 15px;
      .text {
        font-size: 20px;
        font-weight: 500;
        height: 60px;
        line-height: 60px;
        color: #304da4;
      }
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
  }
}
</style>