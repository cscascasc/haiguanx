<template>
  <div class="container">
    <div class="top-container">
      <div class="top-select">
        <div class="select-title">业务领域：</div>
        <el-select
          v-model="form.businessAreaCode"
          clearable
          @change="changeCity"
        >
          <el-option
            v-for="item in businessArea"
            :key="item.dictLabel"
            :value="item.dictValue"
            :label="item.dictLabel"
          >
            {{ item.dictLabel }}
          </el-option>
        </el-select>
        <div class="select-title">上线状态：</div>
        <el-select clearable v-model="form.status">
          <el-option
            v-for="item in status"
            :key="item.label"
            :value="item.value"
            :label="item.label"
          >
            {{ item.label }}</el-option
          >
        </el-select>
        <el-button icon="el-icon-search" @click="serch">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="over">重置</el-button>
      </div>
      <div class="top-seach">
        <el-button
          icon="el-icon-circle-plus-outline"
          @click="topath"
          :disabled="disable('rule:rule:add')"
        >
          新增
        </el-button>
        <el-button icon="el-icon-download" @click="download"> 下载 </el-button>
        <el-button
          icon="el-icon-upload2"
          @click="upload = true"
          :disabled="disable('rule:rule:add')"
        >
          导入
        </el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="ObjectList"
        style="width: 100%"
        @selection-change="selectlist"
        max-height="600"
        border
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column
          prop="title"
          label="规章制度标题"
          fixed="left"
          width="180"
        >
          <div
            slot-scope="scope"
            :style="{
              maxHeight: '80px',
              overflowY: 'scroll',
            }"
          >
            {{ scope.row.title }}
          </div>
        </el-table-column>
        <el-table-column prop="businessArea" label="业务领域">
        </el-table-column>
        <el-table-column
          prop="timeTakeEffect"
          label="生效时间"
        ></el-table-column>
        <el-table-column prop="regionName" label="关联问题状态">
          <div slot-scope="scope">
            <span v-if="scope.row.problemBases !== null">
              {{ scope.row.problemBases ? "已关联" : "未关联" }}
            </span>
            <span v-else> -- </span>
          </div>
        </el-table-column>
        <el-table-column prop="community" label="上线状态">
          <div slot-scope="scope">
            <el-button size="small" :type="status[scope.row.status].type">
              {{ status[scope.row.status].label }}
            </el-button>
          </div>
        </el-table-column>
        <el-table-column prop="createTime" label="录入日期"> </el-table-column>
        <el-table-column
          prop="roomNumber"
          label="操作"
          fixed="right"
          width="400"
        >
          <template slot-scope="scope">
            <el-button
              :type="scope.row.status === 1 ? 'warning' : 'success'"
              size="small"
              :disabled="disable('rule:rule:status')"
              @click="Status(scope.row)"
            >
              {{ scope.row.status === 1 ? "作废" : "生效" }}
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="edit(scope.row)"
              :disabled="disable('rule:rule:edit')"
              >编辑</el-button
            >
            <el-button size="small" @click="detile(scope.row)">详情</el-button>
            <el-button
              type="danger"
              size="small"
              @click="onpenDelate(scope.row)"
              :disabled="disable('rule:rule:delate')"
              >删除</el-button
            >
            <el-button
              type="danger"
              size="small"
              v-if="deletelist"
              @click="muntiedetile"
              :disabled="disable('rule:rule:delate')"
              >批量删除</el-button
            >
          </template>
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
    <el-dialog title="是否删除" width="30%" :visible.sync="delectlog" center>
      <span slot="footer" class="el-dialog-footer">
        <el-button @click="delectlog = false">取消</el-button>
        <el-button @click="Delate" type="danger">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="批量导入" width="40%" :visible.sync="upload">
      <el-upload class="uploademo" drag :http-request="uplode" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传xlsx文件</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="upload = false">取消</el-button>
        <el-button type="success" @click="downloadmodel">模板下载</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getbusinessAear } from "@/api/dict/getdict";
import { getrule, changestatus, delaterule } from "@/api/data/rule/getrule";
import { importRule, exportRule, getModle } from "@/api/download/download";
import { Disablebutton } from "@/utils/button";
export default {
  name: "orderlist",
  data() {
    return {
      value1: "",
      value2: "",
      ObjectList: [],
      form: {
        size: 11,
        current: "1",
        status: null,
        businessAreaCode: null,
      },
      status: [
        {
          label: "待生效",
          type: "warning",
          value: "0",
        },
        {
          label: "生效",
          type: "success",
          value: "1",
        },
        {
          label: "作废",
          type: "danger",
          value: "2",
        },
      ],
      businessArea: [
        {
          dictLabel: "不限",
          dictValue: null,
        },
      ],
      total: "",
      delectlog: false,
      delectid: "",
      upload: false,
      deletelist: null,
    };
  },
  methods: {
    topath() {
      this.$router.push("/rule-add");
    },
    //详情
    detile(row) {
      this.$router.push({
        path: "/ruledetil",
        query: { id: row.id, type: "detile" },
      });
    },
    //编辑
    edit(row) {
      this.$router.push({
        path: "/ruledetil",
        query: { id: row.id, type: "edit" },
      });
    },
    //分页
    changepage(value) {
      this.form.current = value;
      this.ObjectList = [];
      this.gettabledata();
    },
    //获取规则数据
    gettabledata() {
      getrule(this.form)
        .then((res) => {
          this.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.ObjectList.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //状态
    Status(row) {
      changestatus(row.id)
        .then((res) => {
          const message = res.msg;
          this.$notify({
            title: "成功",
            message: message,
            type: "success",
          });
          this.ObjectList = [];
          this.gettabledata();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onpenDelate(row) {
      this.delectid = row.id;
      this.delectlog = true;
    },
    //删除
    Delate() {
      delaterule(this.delectid)
        .then((res) => {
          const message = res.msg;
          this.$notify({
            title: "成功",
            message: message,
            type: "success",
          });
          this.ObjectList = [];
          this.gettabledata();
        })
        .catch((error) => {
          console.error(error);
        });
      this.ObjectList = [];
      this.gettabledata();
    },
    getoption() {
      getbusinessAear()
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.businessArea.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    serch() {
      this.ObjectList = [];
      getrule(this.form)
        .then((res) => {
          this.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.ObjectList.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    over() {
      this.$router.go();
    },
    download() {
      exportRule(this.form)
        .then((res) => {
          this.$notify({
            title: "成功",
            message: res.msg,
            type: "success",
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    downloadmodel() {
      getModle(
        "http://10.84.1.223:9000/gy-file/2023/10/16/规章制度库导入模板/4358/规章制度库导入模板.xlsx"
      );
    }, //批量上传
    uplode(data) {
      const imgData = data.file;
      const form = new FormData();
      form.append("file", imgData);
      console.log(form);
      importRule(form)
        .then((res) => {
          this.$notify({
            title: "成功",
            message: res.msg,
            type: "success",
          });
          this.ObjectList = [];
          this.gettabledata();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    disable(data) {
      return Disablebutton(data);
    },
    selectlist(value) {
      let list = [];
      for (var i = 0; i < value.length; i++) {
        list.push(value[i].id);
      }
      this.deletelist = list.join(",");
      console.log(this.deletelist);
    },
    muntiedetile() {
      this.$confirm("是否批量删除已选数据", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      }).then(() => {
        delaterule(this.deletelist)
          .then((res) => {
            const message = res.msg;
            this.$notify({
              title: "成功",
              message: message,
              type: "success",
            });
            this.ObjectList = [];
            this.gettabledata();
          })
          .catch((error) => {
            console.error(error);
          });
        this.ObjectList = [];
        this.gettabledata();
      });
    },
  },
  mounted() {
    this.gettabledata();
    this.getoption();
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  flex-direction: column;
  overflow: hidden;
  .top-container {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    width: 90%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin-top: 15px;
    border-radius: 15px;
    .top-select {
      display: flex;
      align-items: center;
      color: #000;
      .el-select {
        margin-left: 5px;
        width: 200px;
        margin-right: 10px;
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
    width: 90%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin-top: 15px;
    padding: 15px;
    border-radius: 15px;
    .pagination {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>