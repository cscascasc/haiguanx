<template>
  <div class="container">
    <div class="top">
      <div class="seachContainer">
        <div class="seach">
          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="form.keyword"
            :fetch-suggestions="querySearch"
            placeholder="请输入关键字"
            clearable
          >
            <template slot-scope="{ item }">
              <div class="name">{{ item.value }}</div>
              <span class="addr" style="font-size: 8px; color: #959595">{{
                item.address
              }}</span>
            </template>
          </el-autocomplete>
        </div>
        <el-select
          v-model="form.nodeLevelCode"
          clearable
          filterable
          placeholder="节点级别"
        >
          <el-option
            v-for="item in nodelevel"
            :key="item.dictValue"
            :value="item.dictValue"
            :label="item.dictLabel"
          >
            {{ item.dictLabel }}
          </el-option>
        </el-select>
        <el-select
          v-model="form.businessAreaCode"
          clearable
          filterable
          placeholder="业务领域"
        >
          <el-option
            v-for="item in businessArea"
            :key="item.dictLabel"
            :value="item.dictValue"
            :label="item.dictLabel"
          >
            {{ item.dictLabel }}
          </el-option></el-select
        >
        <el-select
          v-model="form.businessSubcategoriesCode"
          clearable
          filterable
          placeholder="业务小类"
        >
          <el-option
            v-for="item in businessSubcategories"
            :key="item.dictLabel"
            :value="item.dictValue"
            :label="item.dictLabel"
          >
            {{ item.dictLabel }}
          </el-option></el-select
        >
        <div class="upadd">
          <el-button
            @click="topath()"
            icon="el-icon-circle-plus-outline"
            :disabled="disable('inarea:inarea:add')"
          >
            新增
          </el-button>
          <el-button icon="el-icon-download" @click="download">
            下载
          </el-button>
          <el-button
            icon="el-icon-upload2"
            @click="upload = true"
            :disabled="disable('inarea:inarea:add')"
          >
            导入
          </el-button>
        </div>
      </div>
      <div class="selectBox">
        <div>
          <el-select
            clearable
            v-model="form.monitorTypeCode"
            placeholder="日常风险点排查"
          >
            <el-option
              v-for="item in monitortype"
              :key="item.dictLabel"
              :value="item.dictValue"
              :label="item.dictLabel"
            >
              {{ item.dictLabel }}
            </el-option></el-select
          >
          <el-select clearable v-model="form.status" placeholder="状态">
            <el-option
              v-for="item in status"
              :key="item.label"
              :value="item.value"
              :label="item.label"
            >
            </el-option
          ></el-select>
        </div>
        <div>
          <el-button icon="el-icon-search" @click="serch">搜索</el-button>
          <el-button icon="el-icon-refresh" @click="over">重置</el-button>
        </div>
      </div>
    </div>
    <div class="table">
      <el-table
        border
        stripe
        :data="tabledata"
        @selection-change="selectlist"
        max-height="600"
      >
        <el-table-column type="selection" fixed></el-table-column>
        <el-table-column
          label="节点序号"
          fixed="left"
          width="160"
          prop="nodeNum"
        ></el-table-column>
        <el-table-column
          prop="nodeName"
          label="节点名称"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="nodeLevel"
          label="节点级别"
          width="120"
        ></el-table-column>
        <el-table-column prop="nodeExplain" label="制度要求" width="160">
          <div
            slot-scope="scope"
            :style="{
              maxHeight: '70px',
              overflowY: 'scroll',
            }"
          >
            {{ scope.row.nodeExplain }}
          </div></el-table-column
        >
        <el-table-column prop="nodeOrigin" label="制度依据" width="160">
          <div
            slot-scope="scope"
            :style="{
              maxHeight: '70px',
              overflowY: 'scroll',
            }"
          >
            {{ scope.row.nodeOrigin }}
          </div></el-table-column
        >
        <el-table-column prop="riskWarn" label="风险点来源" width="160">
          <div
            slot-scope="scope"
            :style="{
              maxHeight: '70px',
              overflowY: 'scroll',
            }"
          >
            {{ scope.row.riskWarn }}
          </div></el-table-column
        >
        <el-table-column
          prop="businessArea"
          label="业务领域"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="businessSubcategories"
          label="业务类型"
          width="120"
        ></el-table-column>
        <el-table-column prop="businessLink" label="控制要求及控制方法">
          <div
            slot-scope="scope"
            :style="{
              maxHeight: '70px',
              overflowY: 'scroll',
            }"
          >
            {{ scope.row.businessLink }}
          </div>
        </el-table-column>
        <el-table-column
          prop="monitorType"
          label="日常排查风险点提示"
          width="120"
        >
          <div
            slot-scope="scope"
            :style="{
              maxHeight: '70px',
              overflowY: 'scroll',
            }"
          >
            {{ scope.row.monitorTypeCode }}
          </div></el-table-column
        >
        <el-table-column label="岗位名称" width="140">
          <div
            slot-scope="scope"
            :style="{
              maxHeight: '70px',
              overflowY: 'scroll',
            }"
          >
            {{ scope.row.businessExecutionPositions[0] }}
          </div>
        </el-table-column>
        <!-- <el-table-column
          prop="monitorImplementCycle"
          label="监控实施周期"
          width="120"
        ></el-table-column> -->
        <el-table-column
          prop="implementInformatization"
          label="实现方法"
          width="120"
        >
          <div
            slot-scope="scope"
            :style="{
              maxHeight: '70px',
              overflowY: 'scroll',
            }"
          >
            {{ scope.row.implementInformatization }}
          </div></el-table-column
        >
        <el-table-column label="关联问题" width="120">
          <div
            slot-scope="scope"
            :style="{
              maxHeight: '70px',
              overflowY: 'scroll',
            }"
          >
            <div v-if="scope.row.problemBase">
              <span v-for="item in scope.row.problemBase" :key="item.id">
                {{ item.problemDescription }}
              </span>
            </div>
            <span v-else> - </span>
          </div>
        </el-table-column>
        <el-table-column label="上线状态" width="120">
          <div slot-scope="scope">
            <el-button size="small" :type="status[scope.row.status].type">
              {{ status[scope.row.status].label }}
            </el-button>
          </div>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="录入时间"
          width="120"
        ></el-table-column>
        <el-table-column label="操作" fixed="right" width="380">
          <template slot-scope="scope">
            <el-button
              size="small"
              :disabled="disable('inarea:inarea:status')"
              :type="scope.row.status === 1 ? 'success' : 'warning'"
              @click="Status(scope.row)"
              >{{ scope.row.status === 1 ? "作废" : "生效" }}</el-button
            >
            <el-button
              size="small"
              @click="edit(scope.row)"
              :disabled="disable('inarea:inarea:edit')"
              >编辑</el-button
            >
            <el-button size="small" @click="detile(scope.row)" type="success"
              >详情</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="opendelate(scope.row)"
              :disabled="disable('inarea:inarea:delate')"
              >删除</el-button
            >
            <el-button
              v-if="deletelist"
              size="small"
              type="danger"
              @click="muntiedetile"
              :disabled="disable('inarea:inarea:delate')"
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
    <el-dialog title="批量导入" width="40%" :visible.sync="upload">
      <el-upload class="uploademo" drag :http-request="uplode" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传xlsx文件</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="upload = false">取消</el-button>
        <el-button type="success" @click="downloadmodel">模板导出</el-button>
      </span>
    </el-dialog>
    <el-dialog title="是否删除" width="30%" :visible.sync="delectlog" center>
      <span slot="footer" class="el-dialog-footer">
        <el-button @click="delectlog = false">取消</el-button>
        <el-button @click="delate" type="danger">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getmonitortype,
  getbusinessType,
  getbusinessAear,
  getnodelevel,
} from "@/api/dict/getdict";
import {
  getinareaType,
  changestatus,
  delateinarea,
} from "@/api/data/neikong/getneikong";
import {
  importInareaIN,
  getModle,
  exportInareaIN,
} from "@/api/download/download";
import { Disablebutton } from "@/utils/button";
export default {
  name: "orderlist",
  data() {
    return {
      form: {
        deletelist: null,
        size: 10,
        current: "1",
        type: "1",
        nodeLevelCode: null,
        businessAreaCode: null,
        businessSubcategoriesCode: null,
        businessLink: null,
        monitorTypeCode: null,
        status: null,
        keyword: null,
      },
      tabledata: [],
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
      total: 0,
      businessArea: [],
      businessSubcategories: [],
      monitortype: [],
      nodelevel: [],
      upload: false,
      delctid: "",
      delectlog: false,
      style: {
        background: "red",
      },
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [];
    },
    topath() {
      this.$router.push({
        path: "/controladd",
        query: {
          step: "1",
        },
      });
    },
    //分页
    changepage(value) {
      this.form.current = value;
      this.tabledata = [];
      this.gettabledata();
    },
    //获取内控数据
    gettabledata() {
      getinareaType(this.form)
        .then((res) => {
          this.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.tabledata.push(list[i]);
          }
          console.log(this.tabledata);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //编辑
    edit(row) {
      this.$router.push({
        path: "/controldetile",
        query: {
          id: row.id,
          step: "1",
          type: "edit",
        },
      });
    },
    //详情
    detile(row) {
      this.$router.push({
        path: "/controldetile",
        query: {
          id: row.id,
          step: "1",
          type: "detile",
        },
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
          this.tabledata = [];
          this.gettabledata();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    opendelate(row) {
      this.delctid = row.id;
      this.delectlog = true;
    },
    //删除
    delate() {
      delateinarea(this.delctid)
        .then((res) => {
          const message = res.msg;
          this.$notify({
            title: "成功",
            message: message,
            type: "success",
          });
          this.tabledata = [];
          this.gettabledata();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //获取选项
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
      getbusinessType()
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.businessSubcategories.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getmonitortype()
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.monitortype.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });

      getnodelevel()
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.nodelevel.push(list[i]);
          }
          console.log(this.nodelevel);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    serch() {
      this.tabledata = [];
      getinareaType(this.form)
        .then((res) => {
          this.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.tabledata.push(list[i]);
          }
          console.log(this.tabledata);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    over() {
      this.$router.go();
    },
    uplode(data) {
      const imgData = data.file;
      const form = new FormData();
      form.append("file", imgData);
      importInareaIN(form)
        .then((res) => {
          this.$notify({
            title: "成功",
            message: res.msg,
            type: "success",
          });
          this.tabledata = [];
          this.gettabledata();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    download() {
      const data = {
        nodeLevelCode: this.form.nodeLevelCode,
        businessAreaCode: this.form.businessAreaCode,
        businessSubcategoriesCode: this.form.businessSubcategoriesCode,
        businessLink: this.form.businessLink,
        monitorTypeCode: this.form.monitorTypeCode,
        status: this.form.status,
        keyword: this.form.keyword,
        type: "1",
      };
      exportInareaIN(data)
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
        "http://10.84.1.223:9000/gy-file/2023/10/16/执法领域内控库导入模板/6797/执法领域内控库导入模板.xlsx"
      );
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
        delateinarea(this.deletelist)
          .then((res) => {
            const message = res.msg;
            this.$notify({
              title: "成功",
              message: message,
              type: "success",
            });
            this.tabledata = [];
            this.gettabledata();
          })
          .catch((error) => {
            console.error(error);
          });
        this.tabledata = [];
        this.gettabledata();
      });
    },
  },
  mounted() {
    this.restaurants = this.loadAll();
    this.gettabledata();
    this.getoption();
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  flex-direction: column;
  overflow: hidden;
  .top {
    padding: 15px;
    width: 90%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin-top: 15px;
    border-radius: 15px;
  }
  .seachContainer {
    display: flex;
    justify-content: space-around;

    .el-autocomplete {
      width: 400px;
      :deep el-autocomplete-suggestion {
        li {
          padding: 0 20px;
          margin: 0;
          line-height: 34px;
          cursor: pointer;
          color: #606266;
          font-size: 14px;
          list-style: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .el-button:hover {
        box-shadow: 0 0 3px #0a7ca9;
      }
    }
    .el-select {
      margin-right: 10px;
    }
    .upadd {
      margin-left: 20px;
      .el-button {
        margin: 0 10px 0 10px;
      }
    }
  }
  .selectBox {
    display: flex;
    margin-top: 20px;
    width: 90%;
    .el-select {
      margin-right: 15px;
    }
    .el-button {
      margin-left: 20px;
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