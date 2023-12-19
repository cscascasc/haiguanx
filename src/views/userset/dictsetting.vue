<template>
  <div class="container">
    <div class="top-container">
      <div class="top-select">
        <el-input v-model="form.dictName" clearable placeholder="请输入字典名:">
        </el-input>
        <el-button @click="search">查询</el-button>
      </div>
      <div class="top-seach">
        <el-button
          type="success"
          @click="cearte"
          :disabled="disabled('dict:dict:add')"
          >新增字典类型</el-button
        >
      </div>
    </div>
    <div class="table">
      <el-table border v-if="list.length === 0">
        <el-table-column label="字典名"> </el-table-column>
        <el-table-column label="字典Key"> </el-table-column>
        <el-table-column label="状态"> </el-table-column>
        <el-table-column label="发布时间"> </el-table-column>
        <el-table-column label="操作">
          <div>
            <el-button type="small"> 查看字典类容 </el-button>
            <el-button type="small"> 增加字典类容 </el-button>
            <el-button type="small"> 编辑 </el-button
            ><el-button type="small"> 删除 </el-button>
          </div>
        </el-table-column>
      </el-table>
      <el-table border :data="list" v-if="list.length !== 0" max-height="600">
        <el-table-column prop="dictName" label="字典名"> </el-table-column>
        <el-table-column prop="dictType" label="字典Key"> </el-table-column>

        <el-table-column prop="createTime" label="发布时间"> </el-table-column>
        <el-table-column label="操作" width="380">
          <div slot-scope="scope">
            <el-button size="small" @click="open(scope.row)">
              查看字典内容
            </el-button>
            <el-button
              size="small"
              @click="opendata(scope.row)"
              :disabled="disabled('dict:dict:addchildren')"
            >
              增加字典内容
            </el-button>
            <el-button
              size="small"
              @click="edittype(scope.row)"
              :disabled="disabled('dict:dict:edit')"
            >
              编辑 </el-button
            ><el-button
              size="small"
              type="danger"
              @click="opentypedelet(scope.row)"
              :disabled="disabled('dict:dict:delate')"
            >
              删除
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
          @prev-click="changepage"
          @next-click="changepage"
          @current-change="changepage"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog title="字典内容" width="80%" :visible.sync="dailog">
      <div>
        <el-table :data="peag" border max-height="600">
          <el-table-column prop="dictLabel" label="字典名"> </el-table-column>
          <el-table-column prop="dictType" label="字典Key"> </el-table-column>
          <el-table-column prop="dictValue" label="字典值"> </el-table-column>
          <el-table-column prop="createTime" label="发布时间">
          </el-table-column>
          <el-table-column prop="" label="操作">
            <div slot-scope="scope">
              <el-button size="small" @click="eddata(scope.row)">
                编辑 </el-button
              ><el-button
                type="danger"
                size="small"
                @click="opnedeletedata(scope.row)"
              >
                删除
              </el-button>
            </div>
          </el-table-column>
        </el-table>
        <div
          class="pagination"
          :style="{
            display: 'flex',
            justifyContent: 'flex-end',
          }"
        >
          <el-pagination
            background
            layout="prev, pager, next"
            :total="peagtotal"
            :page-size="peagform.size"
            @prev-click="changedictpage"
            @next-click="changedictpage"
            @current-change="changedictpage"
          >
          </el-pagination>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="字典类型增加"
      width="40%"
      center
      :visible.sync="addtypelog"
    >
      <el-form :model="addtype">
        <el-form-item label="类型名称：">
          <el-input v-model="addtype.dictName"></el-input>
        </el-form-item>
        <el-form-item label="类型标识：">
          <el-input v-model="addtype.dictType"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addtypelog = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="字典内容增加" center width="40%" :visible.sync="datalog">
      <el-form :model="adddata">
        <el-form-item label="内容名称">
          <el-input v-model="adddata.dictLabel"></el-input>
        </el-form-item>
        <el-form-item label="内容值">
          <el-input v-model="adddata.dictValue"></el-input>
        </el-form-item>
        <el-form-item label="内容排序">
          <el-input type="number" v-model="adddata.dictSort"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="datalog = false">取 消</el-button>
        <el-button type="primary" @click="Adddata">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="字典类型修改"
      width="40%"
      center
      :visible.sync="edittypelog"
    >
      <el-form :model="changetype">
        <el-form-item label="类型名称：">
          <el-input v-model="changetype.dictName"></el-input>
        </el-form-item>
        <el-form-item label="类型标识：">
          <el-input disabled v-model="changetype.dictType"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="edittypelog = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="字典内容修改"
      center
      width="40%"
      :visible.sync="editdatalog"
    >
      <el-form :model="changedata">
        <el-form-item label="内容名称">
          <el-input v-model="changedata.dictLabel"></el-input>
        </el-form-item>
        <el-form-item label="内容值">
          <el-input v-model="changedata.dictValue"></el-input>
        </el-form-item>
        <el-form-item label="内容排序">
          <el-input type="number" v-model="changedata.dictSort"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdatalog = false">取 消</el-button>
        <el-button type="primary" @click="editData">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="确认删除该字典类型"
      center
      :visible.sync="deletetyepelog"
      width="40%"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="deletetyepelog = false">取 消</el-button>
        <el-button type="primary" @click="detype">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="确认删除该内容"
      center
      :visible.sync="deletedataelog"
      width="40%"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="deletetyepelog = false">取 消</el-button>
        <el-button type="primary" @click="dedata">确 定</el-button>
      </span></el-dialog
    >
  </div>
</template>

<script>
import {
  getdictType,
  getdict,
  getdictall,
  adddicttype,
  adddictdata,
  edittype,
  editdata,
  removetype,
  removedata,
} from "@/api/dict/getdict";
import { Disablebutton } from "@/utils/button";
export default {
  data() {
    return {
      list: [],
      form: {
        size: 10,
        current: 1,
        total: null,
        dictName: null,
      },
      addtype: {
        dictType: "",
        dictName: "",
      },
      adddata: {
        dictSort: null,
        dictLabel: "",
        dictValue: "",
        dictType: "",
      },
      changetype: {
        id: "",
        status: null,
        dictType: "",
        dictName: "",
      },
      changedata: {
        id: "",
        dictSort: null,
        dictLabel: "",
        dictValue: "",
        dictType: "",
      },
      peagform: {
        size: 10,
        current: 1,
      },
      peag: [],
      peagtotal: 0,
      typeid: "",
      dataid: "",
      dailog: false,
      addtypelog: false,
      datalog: false,
      edittypelog: false,
      editdatalog: false,
      deletetyepelog: false,
      deletedataelog: false,
    };
  },
  methods: {
    getlist() {
      getdictType(this.form)
        .then((res) => {
          this.form.total = Number(res.data.total);
          for (var i = 0; i < res.data.records.length; i++) {
            this.list.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    changepage(value) {
      this.form.current = value;
      this.list = [];
      getdictType(this.form)
        .then((res) => {
          this.form.total = Number(res.data.total);
          for (var i = 0; i < res.data.records.length; i++) {
            this.list.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    open(row) {
      this.peagform.dictType = row.dictType;
      this.peagform.current = 1;
      getdictall(this.peagform)
        .then((res) => {
          this.peag = [];
          this.peagtotal = Number(res.data.total);
          for (var i = 0; i < res.data.records.length; i++) {
            this.peag.push(res.data.records[i]);
          }
          console.log(this.peag);
        })
        .catch((error) => {
          console.error(error);
        });
      this.dailog = true;
    },
    opendata(row) {
      this.adddata.dictType = row.dictType;
      this.datalog = true;
    },
    cearte() {
      this.addtypelog = true;
    },
    add() {
      adddicttype(this.addtype)
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
    Adddata() {
      adddictdata(this.adddata)
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
    edittype(row) {
      this.changetype.id = row.id;
      this.changetype.dictName = row.dictName;
      this.changetype.dictType = row.dictType;
      this.changetype.status = row.status;
      this.edittypelog = true;
    },
    edit() {
      edittype(this.changetype)
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
    eddata(row) {
      this.changedata.id = row.id;
      this.changedata.dictLabel = row.dictLabel;
      this.changedata.dictSort = row.dictSort;
      this.changedata.dictType = row.dictType;
      this.changedata.dictValue = row.dictValue;
      this.editdatalog = true;
    },
    editData() {
      editdata(this.changedata)
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
    opentypedelet(row) {
      this.typeid = row.id;
      this.deletetyepelog = true;
    },
    detype() {
      removetype(this.typeid)
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
    opnedeletedata(row) {
      this.dataid = row.id;
      this.deletedataelog = true;
    },
    dedata() {
      removedata(this.dataid)
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
    search() {
      this.list = [];
      this.getlist();
    },
    changedictpage(value) {
      this.peagform.current = value;
      getdictall(this.peagform)
        .then((res) => {
          this.peag = [];
          this.peagtotal = Number(res.data.total);
          for (var i = 0; i < res.data.records.length; i++) {
            this.peag.push(res.data.records[i]);
          }
          console.log(this.peag);
        })
        .catch((error) => {
          console.error(error);
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

    .pagination {
      display: flex;
      justify-content: flex-end;
    }
  }
  .el-dialog {
    .el-form {
      .el-form-item {
        ::v-deep .el-form-item__label {
          font-size: 16px;
        }
      }
    }
  }
}
</style>