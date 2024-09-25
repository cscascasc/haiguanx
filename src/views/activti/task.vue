<template>
  <div class="container">
    <div class="topcontainer">
      <div class="top">
        <el-form inline label-width="88px">
          <el-form-item label="流程标识:">
            <el-input
              v-model="form.key"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="流程名称:">
            <el-input
              v-model="form.name"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="版本:">
            <el-input
              v-model="form.version"
              type="number"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          size="mini "
          type="success"
          icon="el-icon-search"
          @click="serch"
        >
          搜索
        </el-button>
        <el-button size="mini" icon="el-icon-refresh" @click="refersh">
          <span>重置</span>
        </el-button>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="table">
      <div style="width: 98%">
        <el-table :data="modleList" border>
          <el-table-column prop="id" align="center" label="流程定义ID">
          </el-table-column>
          <el-table-column
            prop="deploymentId"
            align="center"
            label="流程部署ID"
          >
          </el-table-column>
          <el-table-column prop="key" align="center" label="流程定义Key">
          </el-table-column>
          <el-table-column prop="name" align="center" label="流程名称">
          </el-table-column>
          <el-table-column
            prop="resourceName"
            align="center"
            label="流程资源定义"
          >
          </el-table-column>
          <el-table-column prop="version" align="center" label="版本号">
          </el-table-column>
          <el-table-column align="center" label="详情">
            <div class="buttonBox" slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-guide"
                @click="shouwMOdleFlow(scope.row)"
                >流程图</el-button
              >
            </div>
          </el-table-column>
          <el-table-column align="center" label="操作" width="300px">
            <div class="buttonBox" slot-scope="scope">
              <el-button
                :type="scope.row.suspended === true ? 'warning' : 'primary'"
                size="small"
                icon="el-icon-open"
                @click="ModelActive(scope.row)"
                :disabled="disabled('model:model:status')"
              >
                {{ scope.row.suspended === true ? "激活" : "挂起" }}
              </el-button>
              <el-button
                type="success"
                size="small"
                @click="openEdit(scope.row)"
                :disabled="disabled('model:model:edit')"
              >
                编辑流程
              </el-button>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-circle-close"
                :disabled="disabled('model:model:delate')"
                @click="opendelete(scope.row)"
                >删除</el-button
              >
            </div>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            layout="total,prev, pager, next"
            :total="total"
            :page-size="form.size"
            @prev-click="changepage"
            @next-click="changepage"
            @current-change="changepage"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      title="流程图"
      :visible.sync="dialogVisible"
      width="1200px"
      show-close
    >
      <el-image :src="modleUrl"></el-image>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogEdit"
      title="流程节点编辑"
      class="taskDialog"
      width="40%"
      center
    >
      <div class="seach">
        <el-form size="small" inline>
          <el-form-item label="海关">
            <el-select v-model="flowForm.custom">
              <el-option
                v-for="item in costomList"
                :key="item.id"
                :value="item.name"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="flowReset">重置</el-button>
            <el-button type="primary" @click="flowSerch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="taskContainer">
        <el-form v-model="TaskNote">
          <div
            class="taskform"
            v-for="(item, index) in TaskNote"
            :key="item.title"
          >
            <div class="left">
              <div class="scroll">
                <div class="node">{{ index }}</div>
              </div>
            </div>
            <div class="right">
              <div class="title">
                {{ item.title }}
              </div>
              <div class="form" v-if="item.type === 1 ? true : false">
                <div class="formitem">
                  <el-form-item label="审批人部门:">
                    <el-cascader
                      v-model="item.deptIds"
                      :options="dept"
                      :props="props"
                      filterable
                      :disabled="item.isDefDept === true"
                      @change="deptchange(item)"
                      :placeholder="placeholder(item)"
                      clearable
                      @visible-change="isMulti(item)"
                    ></el-cascader>

                    <!-- <el-select
                      v-model="item.users"
                      clearable
                      multiple
                      :multiple-limit="item.isMulti ? 0 : 1"
                      placeholder="请选择审批人"
                      @change="model(item)"
                    >
                      <el-option
                        v-for="item in deptUser"
                        :key="item.name"
                        :label="item.name"
                        :value="item.id"
                      >
                        {{ item.name + item.deptName }}
                      </el-option>
                    </el-select> -->
                  </el-form-item>
                  <el-form-item label="责任部门:" v-if="item.isMulti">
                    <el-cascader
                      v-model="item.performDeptId"
                      :options="dept"
                      :props="props"
                      filterable
                      :disabled="item.isDefDept === true"
                      @change="deptchange(item)"
                      :placeholder="placeHolder(item)"
                      clearable
                      @visible-change="props.multiple = false"
                    ></el-cascader>
                  </el-form-item>
                  <el-form-item label="是否为申请人部门:">
                    <el-radio-group
                      v-model="item.isDefDept"
                      @change="isDefDept(item)"
                      :disabled="item.deptIds"
                    >
                      <el-radio :label="true">是</el-radio>
                      <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否为会签节点:">
                    <el-radio-group
                      v-model="item.isMulti"
                      @change="isDefDept(item)"
                    >
                      <el-radio :label="true">是</el-radio>
                      <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否串行:">
                    <el-radio-group
                      v-model="item.isSequential"
                      @change="isDefDept(item)"
                    >
                      <el-radio :label="true">是</el-radio>
                      <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
                <!-- <div class="formitem">
                  <el-form-item label="抄送人">
                    <el-cascader
                      v-model="deptleaderValue[index]"
                      :options="dept"
                      :props="props"
                      @change="deptleaderchange"
                      placeholder="部门"
                      clearable
                    ></el-cascader>
                    <el-select
                      v-model="item.ccUserIds"
                      clearable
                      multiple
                      placeholder="请选择审批人"
                      @change="ccModel(item)"
                    >
                      <el-option
                        v-for="item in deptLeader"
                        :key="item.name"
                        :label="item.name"
                        :value="item.id"
                      >
                        {{ item.name + item.deptName }}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div> -->
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="submitTask">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="30%"
      :visible.sync="deletelog"
      title="是否确认删除"
      center=""
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="deletelog = false">取 消</el-button>
        <el-button type="primary" @click="deleteflow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getFlow,
  getFlowShowResource,
  FlowActivit,
  FlowHangding,
  getTaskNote,
  editTaskNote,
  delateFlow,
} from "@/api/activite/modle";
import { getAlldept, getdeptUser, getdept } from "@/api/dept/getdept";
import { Disablebutton } from "@/utils/button";
import { decryptlong } from "@/utils/jsencrypt";
export default {
  data() {
    return {
      id: "",
      deptValue: [],
      deptUserValue: "",
      deptleaderValue: [],
      leaderValue: [],
      props: {
        label: "name",
        children: "children",
        value: "id",
        emitPath: false,
        multiple: false,
      },
      UserProps: {
        children: "data",
        label: "id",
      },
      form: {
        size: 10,
        current: 1,
        key: null,
        name: null,
        version: null,
      },
      deletelog: false,
      number: "",
      value: [true, false],
      modleList: [],
      modleUrl: "",
      dialogVisible: false,
      dialogEdit: false,
      TaskNote: [],
      dept: [], //部门
      deptUser: [], //部门员工
      deptLeader: [], //部门领导
      total: 0,
      costomList: [],
      flowForm: {
        custom: this.$store.state.userinfo.userCustoms,
      },
    };
  },
  methods: {
    api() {
      this.getlist();
      this.getdept();
    },
    //部门下员工
    deptchange(item) {
      if (!(item.deptIds instanceof Array)) {
        item.deptIds = [item.deptIds];
      }
      if (item.deptIds[0] === null || item.deptIds[0] === undefined) {
        delete item.deptIds;
        console.log(item);
      }
      // this.props.multiple = false;
    },
    //获取部门下领导
    async deptleaderchange(value) {
      const array = [];
      const list = value;
      const length = list.length;
      for (var i = 0; i < length; i++) {
        array.push(list.slice(-1));
      }
      for (var i = 0; i < array.length; i++) {
        await getdeptUser(array[i][0])
          .then((res) => {
            this.deptLeader = [];
            const userlist = res.data;
            const length = userlist.length;
            for (var i = 0; i < length; i++) {
              this.deptLeader.push(userlist[i]);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    model(item) {
      if (!(item.users instanceof Array)) {
        item.users = [item.users];
      }
    },
    ccModel(item) {
      if (!(item.ccUserIds instanceof Array)) {
        item.ccUserIds = [item.ccUserIds];
      }
    },
    //打开流程节点编辑
    openEdit(row) {
      console.log(row);
      //获取预设节点
      this.TaskNote = [];
      const value = {};
      const custom = this.$store.state.userinfo.userCustoms;
      this.flowForm.id = row.id;
      let form = {
        // id: row.id,
        ...this.flowForm,
      };
      getTaskNote(form)
        .then((res) => {
          console.log(res.data, "data");
          const list = res.data;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            if (list[i].isDefDept) {
              delete list[i].deptIds;
            }
            this.TaskNote.push(list[i]);
            this.deptValue.push(value);
            this.deptleaderValue.push(value);
          }
          this.dialogEdit = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //获取部门
    getdept() {
      getAlldept()
        .then((res) => {
          this.dept.push(res.data[0]);
          console.log(this.dept);
        })
        .catch((error) => {
          console.error(error);
        });
      getdept().then((res) => {
        this.costomList = res.data;
      });
    },
    //提交流程审批节点
    submitTask() {
      console.log(this.TaskNote);
      const i = this.$store.state.userinfo.userCustoms;
      editTaskNote(this.TaskNote, i)
        .then((res) => {
          console.log(res);
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
          });
          this.dialogEdit = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    shouwMOdleFlow(row) {
      console.log(row);
      this.getFlowShow(row.id);
      if (this.dialogVisible === false) {
        this.dialogVisible = true;
      } else {
        this.dialogVisible = false;
      }
    },
    getlist() {
      getFlow(this.form)
        .then((res) => {
          this.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.modleList.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //打开流程图
    getFlowShow(id) {
      console.log(id);
      getFlowShowResource(id)
        .then((res) => {
          console.log(res);
          this.modleUrl = window.URL.createObjectURL(res);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //激活流程
    ModelActive(row) {
      if (row.suspended === false) {
        FlowHangding(row.id)
          .then((res) => {
            const message = res.message;
            this.$notify({
              title: "成功",
              message: message,
              type: "success",
            });
            location.reload();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        FlowActivit(row.id)
          .then((res) => {
            const message = res.message;
            this.$notify({
              title: "成功",
              message: message,
              type: "success",
            });
            location.reload();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    opendelete(row) {
      this.id = row.id;
      this.deletelog = true;
    },
    deleteflow() {
      delateFlow(this.id)
        .then((res) => {
          const message = res.msg;
          this.$notify({
            title: "成功",
            message: message,
            type: "success",
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    serch() {
      this.modleList = [];
      this.getlist();
    },
    // text() {
    //   http({
    //     method: "GET",
    //     url: "/dict/typePage",
    //     params: { size: "10" },
    //   }).then(res => {
    //     console.log(res.data)
    //     const B = Base64.decode(res.data)
    //     const A = decryptlong(res.data)
    //     const C = JSON.parse(A)
    //     console.log(C)
    //   }).catch( error => {
    //     console.error(error)
    //   });
    // },
    changepage(value) {
      this.form.current = value;
      this.modleList = [];
      this.getlist();
    },
    refersh() {
      this.$router.go();
    },
    disabled(string) {
      return Disablebutton(string);
    },
    isMulti(item) {
      if (item.isMulti) {
        this.props.multiple = item.isMulti;
      } else {
        this.props.multiple = item.isMulti;
      }
    },
    // multiple() {
    //   this.props.multiple = false;
    // },
    placeholder(item) {
      if (item.deptList) {
        var a = "";
        for (var i = 0; i < item.deptList.length; i++) {
          if (item.deptList[i] !== null) {
            a += item.deptList[i].name;
          }
        }
        return a;
      }
    },
    isDefDept(item) {
      if (item.isDefDept) {
        delete item.deptIds;
      }
    },
    placeHolder(item) {
      if (item.performDept) {
        return item.performDept.name;
      }
    },
    flowReset() {
      this.TaskNote = [];
      const value = {};
      this.flowForm.custom = this.$store.state.userinfo.userCustoms;
      let form = {
        ...this.flowForm,
      };
      getTaskNote(form)
        .then((res) => {
          console.log(res.data, "data");
          const list = res.data;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            if (list[i].isDefDept) {
              delete list[i].deptIds;
            }
            this.TaskNote.push(list[i]);
            this.deptValue.push(value);
            this.deptleaderValue.push(value);
          }
          this.dialogEdit = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    flowSerch() {
      this.TaskNote = [];
      const value = {};
      getTaskNote(this.flowForm)
        .then((res) => {
          console.log(res.data, "data");
          const list = res.data;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            if (list[i].isDefDept) {
              delete list[i].deptIds;
            }
            this.TaskNote.push(list[i]);
            this.deptValue.push(value);
            this.deptleaderValue.push(value);
          }
          this.dialogEdit = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.api();
  },
};
</script>

<style lang="scss" scoped>
.container {
  color: #000;
  width: 100%;
  height: calc(100vh - 60px);
  background-color: #fff;
  font-size: 16px;
  .topcontainer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .top {
      width: 98%;
      padding-top: 10px;
      display: flex;
      padding-top: 20px;
      .el-button {
        margin-left: 20px;
        height: 40px;
      }
    }
  }
  .el-divider {
    margin-top: 5px;
  }
  .table {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    // .buttonBox{
    //  .el-button{
    //     width: 60px;
    //     font-size: 10px;
    //     align-items: center;
    //  }
    // }
    .pagination {
      display: flex;
      justify-content: flex-end;
    }
  }
}
.taskDialog {
  ::v-deep .el-dialog {
    .taskContainer {
      display: flex;
      width: 100%;
      height: 700px;
      overflow-y: scroll;
      margin: 0;
      .el-form {
        .taskform {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          margin-bottom: 15px;
          .left {
            margin-right: 15px;
            .scroll {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              background-color: rgba(0, 170, 255, 0.404);
              display: flex;
              justify-content: center;
              align-items: center;
              .node {
                font-size: 16px;
              }
            }
          }
          .right {
            .title {
              font-size: 18px;
              font-weight: 500;
              text-align: left;
              margin-bottom: 15px;
              height: 50px;
              line-height: 50px;
            }
            .form {
              .formitem {
                width: 600px;
                .el-form-item__label {
                  font-size: 18px;
                }

                .el-cascader {
                  width: 80%;
                  ::v-deep .el-input__inner::placeholder {
                    color: #000;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>