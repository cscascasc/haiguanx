<template>
  <div class="container">
    <div class="mainContainer">
      <div class="itemBox" v-if="tableData.length !== 0">
        <div class="item" v-for="item in tableData" :key="item.id">
          <div class="title">{{ item[0].title }}</div>
          <el-table :data="item" border>
            <el-table-column prop="risk" width="400" label="风险">
            </el-table-column>
            <el-table-column
              prop="sendDeptName"
              label="接收部门"
            ></el-table-column>
            <el-table-column
              prop="sendUserName"
              label="接收人"
            ></el-table-column>
            <el-table-column label="状态">
              <div slot-scope="scope">
                <el-button
                  size="small"
                  :type="scope.row.status === 0 ? 'success' : 'danger'"
                  >{{ scope.row.status === 0 ? "启用" : "禁用" }}
                </el-button>
              </div>
            </el-table-column>
            <el-table-column width="300" label="操作">
              <div slot-scope="scope">
                <el-button
                  :type="scope.row.status !== 0 ? 'success' : 'warning'"
                  @click="open(scope.row)"
                  :disabled="disabled('risk:risk:status')"
                  size="small"
                  >{{ scope.row.status !== 0 ? "启用" : "禁用" }}</el-button
                >
                <el-button
                  type=""
                  @click="openedit(scope.row)"
                  size="small"
                  :disabled="disabled('risk:risk:edit')"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  size="small"
                  @click="opendelete(scope.row)"
                  :disabled="disabled('risk:risk:edit')"
                  >删除</el-button
                >
              </div>
            </el-table-column>
          </el-table>
        </div>
        ...
      </div>
      <div class="itemBox" v-if="tableData.length === 0">
        <div class="item">
          <div class="title">暂无数据</div>
          <el-table :data="item" border>
            <el-table-column width="400" label="风险"> </el-table-column>
            <el-table-column label="接收部门"></el-table-column>
            <el-table-column label="接收人"></el-table-column>
            <el-table-column label="状态"> </el-table-column>
            <el-table-column width="300" label="操作"> </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="add">
        <el-button
          icon="el-icon-push"
          @click="addlog = true"
          type="success"
          :disabled="disabled('risk:risk:add')"
          >新增</el-button
        >
      </div>
    </div>
    <el-dialog
      title="风险编辑"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <div class="solt">
        <el-form v-model="editform">
          <el-form-item label="预警规则标题：">
            <el-input v-model="editform.title"></el-input>
          </el-form-item>
          <el-form-item label="接收部门：">
            <el-cascader
              :options="deptList"
              :props="prop"
              clearable
              filterable
              v-model="sendDept"
              :placeholder="editform.sendDeptName"
              :disabled="editdisabledDept"
              @change="editDept"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="接收人：">
            <el-cascader
              placeholder="请选择部门"
              :options="deptList"
              :props="prop"
              clearable
              filterable
              @change="chooseUser"
            ></el-cascader>
            <el-select
              v-model="users"
              :placeholder="editform.sendUserName"
              clearable
              filterable
              multiple
              value-key="id"
              :disabled="editdisabledUser"
              @change="editdisable"
            >
              <el-option
                v-for="item in deptUser"
                :key="item.id"
                :value="item"
                :label="item.name"
              >
              </el-option
            ></el-select>
          </el-form-item>
          <el-form-item label="预警规则">
            <el-input
              v-model="editform.risk"
              type="textarea"
              :autosize="{ minRows: 4 }"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog width="40%" title="新增预警规则" :visible.sync="addlog">
      <el-form v-model="form">
        <el-form-item label="预警规则标题：">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="接收部门：">
          <el-cascader
            :options="deptList"
            :props="prop"
            clearable
            filterable
            v-model="sendDept"
            placeholder="请选择部门"
            :disabled="disabledDept"
            @change="chooseDept"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="接收人：">
          <el-cascader
            placeholder="请选择部门"
            :options="deptList"
            :props="prop"
            filterable
            clearable
            @change="chooseUser"
          ></el-cascader>
          <el-select
            v-model="form.users"
            placeholder="请选择接收人"
            clearable
            filterable
            value-key="id"
            :disabled="disabledUser"
            @change="disable"
          >
            <el-option
              v-for="item in deptUser"
              :key="item.id"
              :value="item"
              :label="item.name"
            >
              {{ item.name }}</el-option
            ></el-select
          >
        </el-form-item>
        <el-form-item label="预警规则">
          <el-input
            v-model="form.risk"
            type="textarea"
            :autosize="{ minRows: 4 }"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addlog = false">取消</el-button>
        <el-button type="success" @click="addrule">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog width="30%" title="确认删除" :visible.sync="delatelog">
      <span slot="footer">
        <el-button @click="delatelog = false">取消</el-button>
        <el-button @click="delate">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
  <script>
import {
  riskStatus,
  riskedit,
  addRule,
  getrisk,
  riskdelate,
} from "@/api/getRules";
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
        users: [],
        risk: "",
      },
      users: [],
      deptList: [],
      deptUser: [],
      sendDept: "",
      prop: {
        label: "name",
        children: "children",
        value: "id",
      },
      editform: {},
      disabledDept: false,
      disabledUser: false,
      editdisabledDept: false,
      editdisabledUser: false,
      id: "",
      delatelog: false,
    };
  },
  methods: {
    getRule() {
      getrisk()
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
      riskStatus(row.id)
        .then((res) => {
          const message = res.message;
          this.$notify({
            title: "成功",
            message: message,
            type: "success",
          });
          this.$router.go();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    openedit(row) {
      this.editform = row;
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
      console.log(value.length);
      if (value.length !== 0) {
        this.form.sendDept = array[0][0];
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
          this.$router.go();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    opendelete(row) {
      this.id = row.id;
      this.delatelog = true;
    },
    delate() {
      riskdelate(this.id)
        .then((res) => {
          const message = res.message;
          this.$notify({
            title: "成功",
            message: message,
            type: "success",
          });
          this.$router.go();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    edit() {
      riskedit(this.editform)
        .then((res) => {
          const message = res.message;
          this.$notify({
            title: "成功",
            message: message,
            type: "success",
          });
          this.$router.go();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    editDept(value) {
      const array = [];
      const list = value;
      const length = list.length;
      for (var i = 0; i < length; i++) {
        array.push(list.slice(-1));
      }
      console.log(value.length);
      if (value.length !== 0) {
        this.editform.sendDept = array[0][0];
        this.editdisabledUser = true;
      } else {
        this.editdisabledUser = false;
      }
    },
    editdisable(value) {
      if (value) {
        this.editform.users = this.users;
        this.editform.sendDept = null;
        this.editdisabledDept = true;
      } else {
        this.editdisabledDept = false;
      }
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
        margin-top: 60px;
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
  