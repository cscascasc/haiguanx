<template>
  <div class="container">
    <div class="top-container">
      <div class="top-select"></div>
      <div class="top-seach">
        <el-button
          type="success"
          @click="cearte"
          :disabled="disabled('meun:meun:add')"
          >新增菜单</el-button
        >
      </div>
    </div>
    <div class="table">
      <el-table max-height="680" :data="routerlist" row-key="id" border>
        <el-table-column prop="menuName" label="菜单名称"></el-table-column>
        <el-table-column prop="component" label="组件"></el-table-column>
        <el-table-column prop="component" label="类型">
          <div slot-scope="scope">{{ type }} . {{ scope.row.menuType }}</div>
        </el-table-column>
        <el-table-column prop="path" label="路由"></el-table-column>
        <el-table-column label="操作">
          <div slot-scope="scope">
            <el-button
              size="small"
              type="success"
              @click="addchilren(scope.row)"
              :disabled="disabled('meun:meun:addchildren')"
              >增加子节点</el-button
            >
            <el-button
              size="small"
              @click="edit(scope.row)"
              :disabled="disabled('meun:meun:edit')"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="delate(scope.row)"
              :disabled="disabled('meun:meun:delate')"
              >删除</el-button
            >
          </div>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="增加菜单" :visible.sync="addlog" center>
      <el-form :model="data">
        <el-form-item label="菜单名称：">
          <el-input v-model="data.menuName"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径：">
          <el-input v-model="data.path"></el-input>
        </el-form-item>
        <el-form-item label="菜单组件：">
          <el-input v-model="data.component"></el-input>
        </el-form-item>
        <el-form-item label="是否显示：">
          <el-select v-model="data.visible">
            <el-option value="0" label="显示"></el-option>
            <el-option value="1" label="隐藏"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="重定向：">
          <el-input v-model="data.redirect"></el-input>
        </el-form-item>
        <el-form-item label="菜单类型：">
          <el-select v-model="data.menuType">
            <el-option value="C" label="菜单"></el-option>
            <el-option value="M" label="目录"></el-option>
            <el-option value="F" label="按钮"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单层级：">
          <el-input type="number" v-model="data.menuSort"></el-input>
        </el-form-item>
        <el-form-item label="按钮标识：">
          <el-input v-model="data.perm"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addlog = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑菜单" :visible.sync="editlog" center>
      <el-form :model="Edit">
        <el-form-item label="菜单名称：">
          <el-input v-model="Edit.menuName"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径：">
          <el-input v-model="Edit.path"></el-input>
        </el-form-item>
        <el-form-item label="菜单组件：">
          <el-input v-model="Edit.component"></el-input>
        </el-form-item>
        <el-form-item label="重定向：">
          <el-input v-model="Edit.redirect"></el-input>
        </el-form-item>
        <el-form-item label="是否显示：">
          <el-select v-model="Edit.visible">
            <el-option value="0" label="显示"></el-option>
            <el-option value="1" label="隐藏"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型：">
          <el-select v-model="Edit.menuType">
            <el-option value="C" label="菜单"></el-option>
            <el-option value="M" label="目录"></el-option>
            <el-option value="F" label="按钮"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单层级：">
          <el-input type="number" v-model="Edit.menuSort"></el-input>
        </el-form-item>
        <el-form-item label="按钮标识：">
          <el-input v-model="Edit.perm"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editlog = false">取 消</el-button>
        <el-button type="primary" @click="editRouter">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除菜单" :visible.sync="detalelog" width="300px" center>
      <span style="font-size: 16px">请确认该菜单下无用户</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detalelog = false">取 消</el-button>
        <el-button type="primary" @click="detlateRouter">确 定</el-button>
      </span></el-dialog
    >
  </div>
</template>
  
 <script>
import {
  getrouter,
  addrouter,
  editrouter,
  delaterouter,
} from "@/api/dept/router";
import { Disablebutton } from "@/utils/button";
export default {
  name: "orderlist",
  data() {
    return {
      detalelog: false,
      addlog: false,
      editlog: false,
      routerlist: [],
      data: {
        menuName: null,
        parentId: 0,
        menuSort: null,
        path: null,
        menuType: null,
        visible: null,
        component: null,
        perm: null,
        redirect: null,
      },
      Edit: {},
      type: {
        M: "目录",
        C: "菜单",
        F: "按钮",
      },
      id: "",
    };
  },
  methods: {
    getlist() {
      getrouter()
        .then((res) => {
          this.routerlist = res.data;
          console.log(this.routerlist);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    cearte() {
      this.addlog = true;
    },
    submit() {
      console.log(this.data);
      addrouter(this.data)
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
    addchilren(row) {
      console.log(row);
      this.data.parentId = row.id;
      this.addlog = true;
    },
    edit(row) {
      this.Edit = row;
      console.log(this.Edit);
      this.editlog = true;
    },
    editRouter() {
      this.Edit.children = undefined;
      editrouter(this.Edit)
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
    delate(row) {
      this.id = row.id;
      this.detalelog = true;
    },
    detlateRouter() {
      delaterouter(this.id).then((res) => {
        const message = res.msg;
        this.$notify({
          title: "成功",
          message: message,
          type: "success",
        });
        this.$router.go();
      });
    },
    disabled(data) {
      return Disablebutton(data);
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

    .pagination {
      display: flex;
      justify-content: flex-end;
    }
  }
  .el-dialog {
    .el-form {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .el-form-item {
        display: flex;
        justify-content: space-between;
        width: 50%;
        .el-input,
        .el-select {
          width: 300px;
        }
        ::v-deep .el-form-item__label {
          width: 100px;
          font-size: 16px;
          color: #000;
        }
      }
    }
  }
}
</style>