<template>
  <div class="container">
    <div class="top-container">
      <!-- <div class="top-select">
        <el-input placeholder="请输入角色"></el-input>
        <div class="select-title">请选择状态：</div>
        <el-select></el-select>
        <div class="select-title">所属版块：</div>
        <el-select></el-select>
        <el-button type="success">搜索</el-button>
        <el-button>重置</el-button>
      </div> -->
      <div class="top-seach">
        <el-button
          type="success"
          @click="openaddrole"
          :disabled="disabled('role:role:add')"
          >新增角色</el-button
        >
      </div>
    </div>
    <div class="table">
      <el-table border v-if="!rolelist">
        <el-table-column label="角色名称"></el-table-column>
        <el-table-column label="描述"></el-table-column>

        <el-table-column label="状态"></el-table-column>
        <el-table-column label="权限"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <el-table
        :data="rolelist"
        border
        v-if="!!rolelist"
        :row-style="style"
        :cell-style="style"
        max-height="600"
      >
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleKey" label="描述"></el-table-column>
        <el-table-column label="状态">
          <div slot-scope="scope">
            {{ scope.row.status === 0 ? "启用" : "冻结" }}
          </div>
        </el-table-column>
        <el-table-column label="权限">
          <div slot-scope="scope" style="height: 60px; overflow-y: scroll">
            <span v-for="item in scope.row.menus" :key="item.name">
              {{ item.menuName }}
            </span>
          </div>
        </el-table-column>
        <el-table-column label="操作" width="400px">
          <div slot-scope="scope">
            <el-button
              type="small"
              :disabled="disabled('role:role:edit')"
              @click="edit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="small"
              @click="openeditrouter(scope.row)"
              :disabled="disabled('role:role:editrouter')"
              >权限分配</el-button
            >
            <el-button
              type="small"
              @click="openuserlog(scope.row)"
              :disabled="disabled('role:role:edituser')"
              >用户分配</el-button
            >
            <el-button
              size="small"
              :disabled="disabled('role:role:delate')"
              @click="opendelate(scope.row)"
              type="danger"
              >删除</el-button
            >
          </div>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next"> </el-pagination>
      </div>
    </div>
    <el-dialog title="新增角色" width="600px" center :visible.sync="addlog">
      <el-form :model="form">
        <el-form-item label="角色名称：">
          <el-input v-model="form.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色key： ">
          <el-input v-model="form.roleKey"></el-input>
        </el-form-item>
        <el-form-item label="角色顺序：">
          <el-input type="number" v-model="form.roleSort"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addlog = false">取 消</el-button>
        <el-button type="primary" @click="addrole">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑角色" width="600px" center :visible.sync="deitlog">
      <el-form :model="deit">
        <el-form-item label="角色名称：">
          <el-input v-model="deit.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色key： ">
          <el-input v-model="deit.roleKey"></el-input>
        </el-form-item>
        <el-form-item label="角色顺序：">
          <el-input type="number" v-model="deit.roleSort"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deitlog = false">取 消</el-button>
        <el-button type="primary" @click="deitrole">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="权限分配" width="600px" center :visible.sync="addrouter">
      <el-form :model="router">
        <el-form-item label="权限配置">
          <el-cascader
            :options="routerlist"
            :props="prop"
            v-model="menuIds"
            collapse-tags
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addrouter = false">取 消</el-button>
        <el-button type="primary" @click="routersave">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="用户分配" width="600px" center :visible.sync="adduser">
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
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adduser = false">取 消</el-button>
        <el-button type="primary" @click="usersave">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="确认删除吗" width="30%" center :visible.sync="delatelog">
      <span slot="footer" class="dialog-footer">
        <el-button @click="delatelog = false">取 消</el-button>
        <el-button type="primary" @click="delate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAlldept, findDeptUser } from "@/api/dept/getdept";
import { getrouter } from "@/api/dept/router";
import {
  getrole,
  Addrole,
  rotueredit,
  useredit,
  delaterole,
  editRole,
} from "@/api/role/role";
import { Disablebutton } from "@/utils/button";
export default {
  data() {
    return {
      addrouter: false,
      addlog: false,
      adduser: false,
      deptValue: [],
      deptUser: [],
      dept: [],
      data: {
        siaz: 10,
        current: 1,
        total: null,
      },
      form: {
        roleName: "",
        roleKey: "",
        roleSort: null,
      },
      prop: {
        multiple: true,
        value: "id",
        label: "menuName",
        children: "children",
      },
      menuIds: [],
      router: {
        menuIds: [],
        id: "",
      },
      user: {
        id: "",
        users: [],
      },
      props: {
        label: "name",
        children: "children",
        value: "id",
      },
      rolelist: [],
      routerlist: [],
      delatelog: false,
      delateid: "",
      deit: "",
      deitlog: false,
      style: {
        height: "60px",
        overflow: "hidden",
      },
    };
  },
  methods: {
    getlist() {
      getrole(this.data)
        .then((res) => {
          for (var i = 0; i < res.data.records.length; i++) {
            this.rolelist.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getrouter()
        .then((res) => {
          res.data.forEach((node) => this.removechild(node));
          this.routerlist = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
      getAlldept()
        .then((res) => {
          this.dept.push(res.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    openaddrole() {
      this.addlog = true;
    },
    openeditrouter(row) {
      this.router.id = row.id;
      this.addrouter = true;
    },
    addrole() {
      Addrole(this.form).then((res) => {
        const message = res.msg;
        this.$notify({
          title: "成功",
          message: message,
          type: "success",
        });
        this.$router.go();
      });
    },
    routersave() {
      var a = [];
      for (var i = 0; i < this.menuIds.length; i++) {
        const b = this.menuIds[i];
        a.push(...b);
      }
      console.log(a);
      this.router.menuIds = a;
      rotueredit(this.router)
        .then((res) => {
          const message = res.msg;
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
    removechild(node) {
      if (node.children.length === 0) {
        delete node.children;
      } else {
        node.children.forEach((child) => this.removechild(child));
      }
    },
    savelast(node) {
      const list = [];
      this.router.menuIds = [];
      node.forEach((node) => list.push(node.pop()));
      console.log(list);
      this.router.menuIds = list;
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
    openuserlog(row) {
      this.user.id = row.id;
      this.adduser = true;
    },
    usersave() {
      console.log(this.user);
      useredit(this.user)
        .then((res) => {
          const message = res.msg;
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
    disabled(data) {
      return Disablebutton(data);
    },
    opendelate(row) {
      this.delateid = row.id;
      this.delatelog = true;
    },
    delate() {
      delaterole(this.delateid).then((res) => {
        this.$notify({
          title: "成功",
          type: "success",
        });
        this.$router.go();
      });
    },
    edit(row) {
      this.deit = row;
      this.deitlog = true;
    },
    deitrole() {
      editRole(this.deit).then((res) => {
        this.$notify({
          title: "成功",
          type: "success",
        });
        this.$router.go();
      });
    },
  },
  mounted() {
    this.getlist();
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(100vh - 60px);
  background-color: #ffffff;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  .top-container {
    width: calc(100% - 80px);
    margin: 20px;
    padding: 20px;
    display: flex;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    border-radius: 20px;
    justify-content: space-between;
    .top-select {
      display: flex;
      align-items: center;
      .el-select {
        margin-left: 5px;
        width: 200px;
        margin-right: 15px;
      }
      .el-input {
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
    margin-top: 20px;
    width: calc(100% - 80px);
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    border-radius: 20px;
    margin-top: 10px;
    padding: 15px;
    .el-table {
      :v-deep .el-table__cell {
        height: 60px;
        overflow: hidden;
      }
    }
    .pagination {
      display: flex;
      justify-content: flex-end;
    }
  }

  .el-dialog {
    .el-form {
      .el-form-item {
        display: flex;

        .el-input {
          width: 300px;
        }
        .el-cascader {
          width: 300px;
        }
        .el-select {
          width: 300px;
          margin-top: 20px;
        }
        ::v-deep .el-form-item__label {
          font-size: 16px;
          width: 140px;
        }
      }
    }
  }
}
</style>