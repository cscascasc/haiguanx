<template>
  <div class="appContainer">
    <div class="top">
      <el-form inline label-width="88px" :model="slsectParams">
        <el-form-item label="流程key">
          <el-input
            v-model="form.key"
            placeholder="请输入流程key"
            size="medium"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input
            v-model="form.name"
            placeholder="请输入名称"
            size="medium"
            clearable
          >
          </el-input>
        </el-form-item>
      </el-form>
      <el-button
        size="mini "
        type="success"
        icon="el-icon-search"
        @click="handlerSearch"
      >
        搜索
      </el-button>
      <el-button size="mini" icon="el-icon-refresh" @click="handlerReset">
        <span>重置</span>
      </el-button>
    </div>
    <div class="middle">
      <div class="left">
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              type="primary"
              icon="el-icon-plus"
              @click="fileVisible = true"
              :disabled="disabled('active:active:add')"
              >新增模型</el-button
            >
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="list">
      <div class="table">
        <el-table :data="modlelist" border>
          <el-table-column prop="key" align="center" label="模型标识">
          </el-table-column>
          <el-table-column prop="name" align="center" label="模型名称">
          </el-table-column>
          <el-table-column prop="id" align="center" label="模型标识">
          </el-table-column>
          <el-table-column prop="version" align="center" label="版本">
          </el-table-column>
          <el-table-column prop="createTime" align="center" label="部署时间">
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-edit"
                size="small"
                @click="editFlow(scope.row)"
                :disabled="disabled('active:active:edit')"
                >编辑</el-button
              >
              <el-button
                icon="el-icon-edit"
                size="small"
                @click="activitFlow(scope.row)"
                :disabled="disabled('active:active:put')"
                >部署</el-button
              >
              <el-button
                icon="el-icon-edit"
                size="small"
                @click="deletemodel(scope.row)"
                :disabled="disabled('active:active:delate')"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
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
      width="1800px"
      :visible.sync="dialogVisible"
      style="text-align: left"
    >
      <iframe
        id="iframe"
        :src="editURl"
        frameborder="0"
        height="720px"
        width="100%"
        scrolling="auto"
      >
      </iframe>
    </el-dialog>
    <el-dialog
      :visible.sync="fileVisible"
      title="新增模型"
      width="800px"
      append-to-body
    >
      <el-form :model="modleAdd" ref="modleAdd">
        <el-form-item
          label="模型名称:"
          prop="name"
          :rules="{
            required: true,
            message: '请输入名称',
          }"
        >
          <el-input v-model="modleAdd.name" style="width: 500px"></el-input>
        </el-form-item>
        <el-form-item
          label="模型key:"
          prop="key"
          :rules="{
            required: true,
            message: '请输入key',
          }"
        >
          <el-input v-model="modleAdd.key" style="width: 500px"></el-input>
        </el-form-item>
        <el-form-item label="模型类别:" prop="category">
          <el-input v-model="modleAdd.category" style="width: 500px"></el-input>
        </el-form-item>
        <el-form-item label="模型版本:" prop="version">
          <el-input
            v-model.number="modleAdd.version"
            type="number"
            style="width: 500px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="模型描述:"
          prop="description"
          :rules="{
            required: true,
            message: '请输入描述',
          }"
        >
          <el-input
            v-model="modleAdd.description"
            style="width: 500px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="fileVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitModel('modleAdd')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getModle,
  addModle,
  ModelActivit,
  delateMode,
} from "@/api/activite/modle";
import { Disablebutton } from "@/utils/button";
import { decryptlong } from "@/utils/jsencrypt";
export default {
  data() {
    return {
      dialogVisible: false,
      fileVisible: false,
      editURl: "",
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 设置上传的请求头部
        headers: "",
        // 上传的地址
        url: "",
      },
      slsectParams: {
        name: "",
        type: "",
        id: "",
        key: "",
      },
      modlelist: [],
      selectList: [],
      modleAdd: {
        name: "",
        key: "",
        category: "",
        version: "",
        description: "",
      },
      form: {
        size: 10,
        current: 1,
        name: null,
        key: null,
      },
      total: 0,
    };
  },
  methods: {
    getModlelist() {
      getModle(this.form)
        .then((res) => {
          this.total = Number(res.data.total);
          var list = res.data.records;
          const length = res.data.records.length;
          for (var i = 0; i < length; i++) {
            this.modlelist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 搜索
    handlerSearch() {
      this.modlelist = [];
      this.getModlelist();
    },
    //新增模型
    submitModel(forName) {
      this.$refs[forName].validate((vaild) => {
        if (vaild) {
          const name = this.modleAdd.name;
          const version = this.modleAdd.version;
          const description = this.modleAdd.description;
          const key = this.modleAdd.key;
          const category = this.modleAdd.category;
          addModle(name, key, version, category, description)
            .then((res) => {
              console.log(res);
              this.$notify({
                title: "成功",
                message: "操作成功",
                type: "success",
              });
              this.$router.go();
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    handlerReset() {
      this.$router.go(0);
    },
    editFlow(row) {
      this.editURl = "http://10.84.1.222:9601/editor?modelId=" + row.id;
      this.dialogVisible = true;
    },
    //部署模型
    activitFlow(row) {
      ModelActivit(row.id)
        .then((res) => {
          this.$notify({
            title: "成功",
            message: res.message,
            type: "success",
          });
        })
        .catch((error) => {
          this.$notify({
            title: "失败",
            message: error.message,
            type: "success",
          });
        });
    },
    //删除模型
    deletemodel(row) {
      delateMode(row.id)
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
    changepage(value) {
      this.form.current = value;
      this.modlelist = [];
      this.getModlelist();
    },
    disabled(string) {
      return Disablebutton(string);
    },
  },
  mounted() {
    this.getModlelist();
  },
};
</script>

<style lang="scss" scoped>
.appContainer {
  width: 100%;
  min-height: calc(100vh - 60px);
  color: #000;
  background-color: #fff;
  .top {
    display: flex;
    width: 99%;
    padding-top: 20px;
    .el-button {
      margin-left: 20px;
      height: 40px;
    }
  }
  .middle {
    display: flex;
    justify-content: space-between;
    .left {
      margin-left: 30px;
    }
  }
  .list {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    .table {
      width: 99%;
      .pagination {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>