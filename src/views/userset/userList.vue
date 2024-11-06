<template>
  <div class="box">
    <div class="title">{{ "角色：" + roleName }}</div>
    <div class="button">
      <el-button size="small" type="primary" @click="adduser = true"
        >新增用户</el-button
      >
      <el-button size="small" @click="close">返回</el-button>
    </div>
    <div>
      <el-table :data="userLisr" border max-height="600">
        <el-table-column
          label="姓名"
          prop="name"
          align="center"
        ></el-table-column>
        <el-table-column
          label="部门"
          prop="deptName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="所有部门"
          prop="allDeptPath"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="removeUserRole(scope.row)">
              移除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total,prev, pager, next"
          :page-size="size"
          :total="total"
          @prev-click="changepage"
          @next-click="changepage"
          @current-change="changepage"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="用户分配"
      width="600px"
      center
      :visible.sync="adduser"
      :modal="false"
    >
      <el-form :model="router">
        <el-form-item label="选择用户:">
          <el-cascader
            v-model="deptValue"
            :options="dept"
            :props="props"
            @change="deptchange"
            placeholder="请选择部门"
          ></el-cascader>
          <el-select
            v-model="user.users"
            clearable
            multiple
            placeholder="请选择用户"
          >
            <el-option
              v-for="item in deptUser"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            >
              {{ item.name + item.deptName }}
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adduser = false">取 消</el-button>
        <el-button type="primary" @click="usersave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAlldept, findDeptUser } from "@/api/dept/getdept";
import { getRoleUserList, useredit, removeUser } from "../../api/role/role";
export default {
  data() {
    return {
      adduser: false,
      total: 0,
      size: 10,
      current: 1,
      id: "",
      userLisr: [],
      deptUser: [],
      deptValue: [],
      dept: [],
      name: "",

      user: {
        id: "",
        users: [],
      },
      props: {
        label: "name",
        children: "children",
        value: "id",
      },
      router: {
        menuIds: [],
        id: "",
      },
    };
  },
  props: {
    roleName: {
      type: String,
    },
    roleId: {
      type: String,
    },
  },
  mounted() {
    this.getUserList();
    this.getList();
  },
  methods: {
    //获取用户数据
    getUserList() {
      let data = {
        size: this.size,
        current: this.current,
        roleId: this.roleId,
      };
      console.log(data, "data");
      getRoleUserList(data).then((res) => {
        console.log(res, "userList");
        this.userLisr = res.data.records;
        this.total = Number(res.data.total);
      });
    },
    getList() {
      getAlldept()
        .then((res) => {
          this.dept.push(res.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async deptchange(value) {
      const array = [];
      const list = value;
      const length = list.length;
      for (var i = 0; i < length; i++) {
        array.push(list.slice(-1));
      }

      for (var i = 0; i < array.length; i++) {
        await findDeptUser(array[i][0])
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
    usersave() {
      this.user.id = this.roleId;
      console.log(this.user);
      useredit(this.user)
        .then((res) => {
          const message = res.msg;
          this.$notify({
            title: "成功",
            message: message,
            type: "success",
          });
          this.adduser = false;
          this.getUserList();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 移出用户
    removeUserRole(row) {
      this.$confirm("是否移除该用户", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(() => {
          console.log(row);
          let data = {
            userId: row.userId,
            roleId: this.roleId,
          };
          removeUser(data)
            .then((res) => {
              const message = res.msg;
              this.$notify({
                title: "成功",
                message: message,
                type: "success",
              });
              this.current = 1;
              this.getUserList();
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch(() => {
          return false;
        });
    },
    changepage(value) {
      this.current = value;
      this.getUserList();
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  .title {
    font-size: 18px;
    margin-bottom: 20px;
    font-weight: 500;
    color: #000;
    display: flex;
  }
  .button {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  ::v-deep .el-dialog {
    .el-dialog__body {
      padding: 20px 30px !important;
    }
  }
}
</style>