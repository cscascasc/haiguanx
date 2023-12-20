<template>
  <div class="container">
    <div class="tab">
      <el-tabs>
        <el-tab-pane label="内控规范提示">
          <div class="content">
            <div class="table" >
              <el-table :data="inaeranotice" border>
                <el-table-column
                  prop="nodeExplain"
                  label="节点名称"
                ></el-table-column>
                <el-table-column prop="" label="关联问题">
                  <div slot-scope="scope">
                    {{ scope.row.problemBase ? scope.row.problemBase : '待关联'}}
                  </div>
                </el-table-column>
                <el-table-column
                  prop="riskWarn"
                  label="风险点"
                ></el-table-column>
                <el-table-column
                  prop="sendTime"
                  label="发送时间"
                ></el-table-column>
                <el-table-column label="操作">
                  <div slot-scope="scope">
                    <el-button type="text" @click="goinera(scope.row)">
                      去查看
                    </el-button>
                  </div>
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="form.total"
                  :page-size="form.size"
                  @prev-click="changepageone"
                  @next-click="changepageone"
                  @current-change="changepageone"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="共性问题提示">
          <div class="content">
            <div class="table">
              <el-table :data="comnotice" border>
                <el-table-column
                  prop="businessSubcategories"
                  label="业务领域"
                ></el-table-column>
                <el-table-column
                  prop="businessAreaList"
                  label="业务小类别"
                ></el-table-column>
                <el-table-column
                  prop="businessSubcategoriesCount"
                  label="共性次数"
                ></el-table-column>
                <el-table-column
                  prop="sendTime"
                  label="发送时间"
                ></el-table-column>
                <el-table-column label="操作">
                  <div slot-scope="scope">
                    <el-button type="text" @click="gocommon(scope.row)">
                      去查看
                    </el-button>
                  </div>
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="comform.total"
                  :page-size="comform.size"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="整改到期提示">
          <div class="content">
            <div class="table">
              <el-table :data="warning" border>
                <el-table-column
                  prop="problemDescription"
                  label="节点名称"
                ></el-table-column>
                <el-table-column
                  prop="rectificationDeadline"
                  label="整改期限"
                ></el-table-column>
                <el-table-column
                  prop="sendTime"
                  label="发送时间"
                ></el-table-column>
                <el-table-column label="操作">
                  <div slot-scope="scope">
                    <el-button type="text" @click="goproblem(scope.row)">
                      去查看
                    </el-button>
                  </div>
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="warningform.total"
                  :page-size="warningform.size"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="整改超期提示">
          <div class="content">
            <div class="table">
              <el-table :data="over" border>
                <el-table-column
                  prop="problemDescription"
                  label="节点名称"
                ></el-table-column>
                <el-table-column
                  prop="rectificationDeadline"
                  label="整改期限"
                ></el-table-column>
                <el-table-column
                  prop="sendTime"
                  label="发送时间"
                ></el-table-column>
                <el-table-column label="操作">
                  <div slot-scope="scope">
                    <el-button type="text" @click="goproblem(scope.row)">
                      去查看
                    </el-button>
                  </div>
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="overform.total"
                  :page-size="overform.size"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="关联问题列表" width="90%" :visible.sync="comdialog">
      <el-table :data="tablelist" border>
        <el-table-column type="index" label="序号" fixed></el-table-column>
        <el-table-column
          align="center"
          prop="problemDescription"
          label="问题简述"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="businessArea"
          label="业务领域"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="businessSubcategories"
          label="业务小类"
        ></el-table-column>
        <el-table-column
          prop="auditCustoms"
          align="center"
          label="被审计海关"
        ></el-table-column>
        <el-table-column
          prop="responsibleDeptList"
          label="整改责任部门"
          align="center"
        ></el-table-column>
        <el-table-column label="整改状态" align="centder">
          <div slot-scope="scope">
            <el-button size="small" :type="status[scope.row.status].type">
              {{ status[scope.row.status].label }}
            </el-button>
          </div>
        </el-table-column>
        <el-table-column
          prop="auditTimeFrame"
          label="整改期限"
          align="center"
        ></el-table-column>
        <el-table-column label="整改内容" align="center" width="160">
          <div slot-scope="scope" v-if="scope.row.situationList.length !== 0">
            <div v-for="item in scope.row.situationList" :key="item.id">
              {{ item.deptName + "-" + item.rectificationSituation }}
            </div>
            <div v-if="scope.row.situationList.length === 0">--</div>
          </div>
        </el-table-column>
        <el-table-column label="整改审核状态" align="center">
          <div slot-scope="scope">
            {{ scope.row.isExamine === 1 ? "已审核" : "待审核" }}
          </div>
        </el-table-column>
        <el-table-column label="内控关联状态" align="center">
          <div slot-scope="scope">
            {{ scope.row.internalStatus !== 0 ? "已关联" : "待关联" }}
          </div>
        </el-table-column>
        <el-table-column label="制度关联状态" align="center">
          <div slot-scope="scope">
            {{ scope.row.rulesStatus !== 0 ? "已关联" : "待关联" }}
          </div>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="录入人"
          align="center"
        ></el-table-column>
        <el-table-column label="状态" align="center">
          <div slot-scope="scope">
            {{ scope.row.isCancel === 0 ? "生效" : "过期" }}
          </div>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="录入时间"
          align="centder"
        ></el-table-column>
        <el-table-column label="操作">
          <div slot-scope="scope">
            <el-button type="text" @click="goproblem(scope.row)">
              去查看
            </el-button>
          </div>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="tablelistform.total"
          :page-size="tablelistform.size"
          @prev-click="changepage"
          @next-click="changepage"
          @current-change="changepage"
        >
        </el-pagination>
      </div>
    </el-dialog>
    <el-dialog title="共性问题列表" width="90%" :visible.sync="comdialog">
      <el-table :data="tablelist" border>
        <el-table-column type="index" label="序号" fixed></el-table-column>
        <el-table-column
          align="center"
          prop="problemDescription"
          label="问题简述"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="businessArea"
          label="业务领域"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="businessSubcategories"
          label="业务小类"
        ></el-table-column>
        <el-table-column
          prop="auditCustoms"
          align="center"
          label="被审计海关"
        ></el-table-column>
        <el-table-column
          prop="responsibleDeptList"
          label="整改责任部门"
          align="center"
        ></el-table-column>
        <el-table-column label="整改状态" align="centder">
          <div slot-scope="scope">
            <el-button size="small" :type="status[scope.row.status].type">
              {{ status[scope.row.status].label }}
            </el-button>
          </div>
        </el-table-column>
        <el-table-column
          prop="auditTimeFrame"
          label="整改期限"
          align="center"
        ></el-table-column>
        <el-table-column label="整改内容" align="center" width="160">
          <div slot-scope="scope" v-if="scope.row.situationList.length !== 0">
            <div v-for="item in scope.row.situationList" :key="item.id">
              {{ item.deptName + "-" + item.rectificationSituation }}
            </div>
            <div v-if="scope.row.situationList.length === 0">--</div>
          </div>
        </el-table-column>
        <el-table-column label="整改审核状态" align="center">
          <div slot-scope="scope">
            {{ scope.row.isExamine === 1 ? "已审核" : "待审核" }}
          </div>
        </el-table-column>
        <el-table-column label="内控关联状态" align="center">
          <div slot-scope="scope">
            {{ scope.row.internalStatus !== 0 ? "已关联" : "待关联" }}
          </div>
        </el-table-column>
        <el-table-column label="制度关联状态" align="center">
          <div slot-scope="scope">
            {{ scope.row.rulesStatus !== 0 ? "已关联" : "待关联" }}
          </div>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="录入人"
          align="center"
        ></el-table-column>
        <el-table-column label="状态" align="center">
          <div slot-scope="scope">
            {{ scope.row.isCancel === 0 ? "生效" : "过期" }}
          </div>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="录入时间"
          align="centder"
        ></el-table-column>
        <el-table-column label="操作">
          <div slot-scope="scope">
            <el-button type="text" @click="goproblem(scope.row)">
              去查看
            </el-button>
          </div>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="tablelistform.total"
          :page-size="tablelistform.size"
          @prev-click="changepage"
          @next-click="changepage"
          @current-change="changepage"
        >
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getinaeranotice,
  getCommonality,
  getproblemWarning,
  getproblemover,
  getCommonalist,
} from "@/api/notice/getdatanotice";
export default {
  data() {
    return {
      comdialog: false,
      status: [
        {
          label: "待整改",
          type: "warning",
        },
        {
          label: "已整改",
          type: "success",
        },
        {
          label: "整改到期",
          type: "danger",
        },
      ],
      form: {
        deptid: this.$store.state.userinfo.userdepartment,
        size: 10,
        current: 1,
        total: 0,
      },
      comform: {
        size: 10,
        current: 1,
        noticeDept: this.$store.state.userinfo.userdepartment,
        total: 0,
      },
      warningform: {
        size: 10,
        current: 1,
        total: 0,
        noticeDept: this.$store.state.userinfo.userdepartment,
      },
      overform: {
        size: 10,
        current: 1,
        total: 0,
        noticeDept: this.$store.state.userinfo.userdepartment,
      },
      tablelistform: {
        size: 7,
        total: 0,
        current: 1,
        businessSubcategoriesCode: "",
      },
      tablelist: [],
      warning: [],
      inaeranotice: [],
      comnotice: [],
      over: [],
    };
  },
  methods: {
    getdata() {
      getinaeranotice(this.form)
        .then((res) => {
          this.form.total = Number(res.data.total);
          for (var i = 0; i < res.data.records.length; i++) {
            this.inaeranotice.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getCommonality(this.comform)
        .then((res) => {
          this.comform.total = Number(res.data.total);
          for (var i = 0; i < res.data.records.length; i++) {
            this.comnotice.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getproblemWarning(this.warningform)
        .then((res) => {
          this.warningform.total = Number(res.data.total);
          for (var i = 0; i < res.data.records.length; i++) {
            this.warning.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getproblemover(this.warningform)
        .then((res) => {
          this.overform.total = Number(res.data.total);
          for (var i = 0; i < res.data.records.length; i++) {
            this.over.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    goinera(row) {
      this.$router.push({
        path: "/controldetile",
        query: {
          id: row.id,
          step: row.type,
          type: "detile",
        },
      });
    },
    goproblem(row) {
      console.log(row.id);
      this.$router.push({
        path: "/datadetil",
        query: {
          id: row.id,
          type: "detile",
        },
      });
    },
    gocommon(row) {
      this.tablelistform.businessSubcategoriesCode =
        row.businessSubcategoriesCode;
      this.comdialog = true;
      getCommonalist(this.tablelistform)
        .then((res) => {
          console.log(res);
          this.tablelistform.total = Number(res.data.total);
          for (var i = 0; i < res.data.records.length; i++) {
            this.tablelist.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    changepage(value) {
      this.tablelistform.current = value;
      this.tablelist = [];
      getCommonalist(this.tablelistform)
        .then((res) => {
          console.log(res);
          this.tablelistform.total = Number(res.data.total);
          for (var i = 0; i < res.data.records.length; i++) {
            this.tablelist.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    changepageone(value) {
      this.form.current = value;
      getinaeranotice(this.form)
        .then((res) => {
          console.log(res);
          this.inaeranotice = [];
          for (var i = 0; i < res.data.records.length; i++) {
            this.form.total = Number(res.data.total);
            this.inaeranotice.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.getdata();
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
  .tab {
    padding: 10px;
    width: 96%;
    margin: 10px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
    .el-tabs {
      padding: 10px;
      box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
        hsla(0, 0%, 0%, 0.23) 0px 6px 6px;
      border-radius: 13px;
      .content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .top-container {
          width: 95%;
          padding: 10px;
          display: flex;
          justify-content: space-between;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          margin-bottom: 15px;
          border-radius: 13px;
          .top-select {
            display: flex;
            align-items: center;
            .el-select {
              margin-left: 5px;
              width: 200px;
              margin-right: 15px;
            }
          }
          .top-seach {
            padding-right: 20px;
            display: flex;
          }
          .ref {
            margin-left: 20px;
            margin-right: 20px;
          }
          .addbutton {
            margin-right: 20px;
          }
        }
        .table {
          width: 96%;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          padding: 10px;
          margin-bottom: 5px;
          border-radius: 13px;
          .pagination {
            display: flex;
            justify-content: flex-end;
          }
        }
      }
    }
  }
  .el-dialog {
    .pagination {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>