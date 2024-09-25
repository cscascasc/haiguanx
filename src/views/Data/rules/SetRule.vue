<template>
  <div class="container">
    <div class="mainContainer">
      <div class="itemBox">
        <div class="item" v-for="item in tableData" :key="item.id">
          <div class="title">{{ item[0].alertName }}</div>
          <el-table :data="item" border>
            <el-table-column prop="id" label="序号"></el-table-column>
            <el-table-column label="维度">
              <div>天</div>
            </el-table-column>
            <el-table-column prop="value" label="系数"></el-table-column>
            <el-table-column label="状态">
              <div slot-scope="scope">
                <el-button
                  size="small"
                  :type="scope.row.status === 0 ? 'success' : 'danger'"
                  >{{ scope.row.status === 0 ? "启用" : "禁用" }}
                </el-button>
              </div>
            </el-table-column>
            <el-table-column label="操作">
              <div slot-scope="scope">
                <el-button
                  :type="scope.row.status !== 0 ? 'success' : 'danger'"
                  @click="open(scope.row)"
                  :disabled="disabled('setrule:setrule:status')"
                  >{{ scope.row.status !== 0 ? "启用" : "禁用" }}</el-button
                >
                <el-button
                  type="warning"
                  @click="edit(scope.row)"
                  :disabled="disabled('setrule:setrule:edit')"
                  >编辑</el-button
                >
              </div>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog
      :title="dialogRow.alertName"
      :visible.sync="dialogVisible"
      width="30%"
      center=""
    >
      <div class="solt">
        <el-form inline>
          <el-form-item label="请输入:">
            <el-input
              placeholder="请输入内容"
              v-model="dialogRow.value"
              type="number"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRuleList, activitRule, editRule, addRule } from "@/api/getRules";
import { Disablebutton } from "@/utils/button";
import { getAlldept, getdeptUser } from "@/api/dept/getdept";
export default {
  name: "orderlist",
  data() {
    return {
      tableData: [],
      ruLeList: [],
      dialogVisible: false,
      dialogRow: {},
      addlog: false,
      form: {
        title: "",
        sendDept: null,
        sendUser: null,
        risk: "",
      },
      deptList: [],
      deptUser: [],
      sendDept: "",
      prop: {
        label: "name",
        children: "children",
        value: "id",
      },
      disabledDept: false,
      disabledUser: false,
    };
  },
  methods: {
    getRule() {
      getRuleList()
        .then((res) => {
          for (var i = 0; i < res.data.records.length; i++) {
            const list = [res.data.records[i]];
            this.tableData.push(list);
          }
          console.log(this.tableData);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    open(row) {
      activitRule(row.id)
        .then((res) => {
          const message = res.message;
          this.$notify({
            title: "成功",
            message: message,
            type: "success",
          });
          this.tableData = [];
          this.getRuleList();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    edit(row) {
      this.dialogRow = row;
      console.log(this.dialogRow, "a");
      this.dialogVisible = true;
    },
    submit() {
      console.log(this.dialogRow);
      editRule(this.dialogRow)
        .then((res) => {
          const message = res.message;
          this.$notify({
            title: "成功",
            message: message,
            type: "success",
          });
          this.dialogVisible = false;
        })
        .catch((error) => {
          console.log(error);
        });
      //
    },
    getdept() {
      getAlldept()
        .then((res) => {
          this.deptList.push(res.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async chooseUser(value) {
      console.log(this.value);
      const array = [];
      const list = value;
      const length = list.length;
      for (var i = 0; i < length; i++) {
        array.push(list.slice(-1));
      }
      for (var i = 0; i < array.length; i++) {
        await getdeptUser(array[i][0])
          .then((res) => {
            this.deptUser = [];
            const userlist = res.data;
            const length = userlist.length;
            for (var i = 0; i < length; i++) {
              this.deptUser.push(userlist[i]);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    chooseDept(value) {
      const array = [];
      const list = value;
      const length = list.length;
      for (var i = 0; i < length; i++) {
        array.push(list.slice(-1));
      }
      console.log(array[0][0]);
      this.form.sendDept = array[0][0];
      console.log(value.length);
      if (value.length !== 0) {
        this.disabledUser = true;
      } else {
        this.disabledUser = false;
      }
    },
    //激活规则
    disabled(data) {
      return Disablebutton(data);
    },
    disable(value) {
      if (value) {
        this.disabledDept = true;
      } else {
        this.disabledDept = false;
      }
    },
    addrule() {
      addRule(this.form)
        .then((res) => {
          this.$notify({
            title: "成功",
            type: "success",
          });
          this.tableData = [];
          this.getRuleList();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.getRule();
    this.getdept();
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(100vh - 60px);
  background-color: #fff;
  color: #000;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  .mainContainer {
    width: 1400px;
    height: 100%;
    display: flex;
    justify-content: center;
    .itemBox {
      display: flex;
      flex-direction: column;

      align-items: center;
      .item {
        text-align: left;
        margin-top: 20px;
        padding: 10px;
        width: 1200px;
        border-radius: 15px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
          rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
          rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
        .title {
          font-size: 18px;
          font-weight: 600;
        }
        .el-table {
          margin-top: 10px;
        }
      }
    }
    .add {
      margin-top: 20px;
      margin-left: 20px;
    }
  }
  .el-dialog {
    width: 1200px;
    .solt {
      display: flex;
      align-items: center;
      justify-content: space-around;
      .el-input {
        width: 300px;
      }
    }
    .el-form {
      .el-form-item {
        .el-input,
        .el-select,
        .el-cascader {
          width: 100%;
        }
      }
    }
  }
}
</style>
