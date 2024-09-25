<template>
  <div class="container">
    <div class="top">
      <div class="seachContainer">
        <div class="seach">
          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="form.keywords"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            clearable
          >
            <template slot-scope="{ item }">
              <div class="name">{{ item.value }}</div>
              <span class="addr" style="font-size: 8px; color: #959595">{{
                item.address
              }}</span>
            </template>
          </el-autocomplete>
          <el-select
            v-model="form.auditCustomsIds"
            placeholder="被审计海关"
            clearable
            filterable
          >
            <el-option
              v-for="item in customsType"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="form.projectLevelCode"
            placeholder="项目级别"
            clearable
            filterable
          >
            <el-option
              v-for="item in projectlevel"
              :key="item.dictLabel"
              :value="item.dictValue"
              :label="item.dictLabel"
            ></el-option
          ></el-select>
          <el-select
            v-model="form.projectTypeCode"
            placeholder="项目类别"
            clearable
            filterable
          >
            <el-option
              v-for="item in projecttype"
              :key="item.dictLabel"
              :value="item.dictValue"
              :label="item.dictLabel"
            ></el-option
          ></el-select>
          <el-cascader
            v-model="form.responsibleDept"
            :options="dept"
            :props="props"
            placeholder="责任部门"
            clearable
            filterable
            @change="(e) => deptIdchange(e, 'responsibleDept')"
          ></el-cascader>
        </div>
        <div class="upadd">
          <el-button
            @click="topath()"
            :disabled="Disable('data:data:add')"
            icon="el-icon-circle-plus-outline"
          >
            新增
          </el-button>
          <el-button icon="el-icon-download" @click="download">
            下载
          </el-button>
          <el-button
            icon="el-icon-upload2"
            @click="upload = true"
            :disabled="Disable('data:data:add')"
          >
            导入
          </el-button>
        </div>
      </div>
      <div class="selectBox">
        <el-select
          v-model="form.businessAreaCode"
          placeholder="业务领域"
          clearable
          filterable
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
        <el-select
          v-model="form.businessSubcategoriesCode"
          placeholder="业务小类"
          clearable
          filterable
        >
          <el-option
            v-for="item in businessSubcategories"
            :key="item.dictLabel"
            :value="item.dictValue"
            :label="item.dictLabel"
          >
            {{ item.dictLabel }}
          </el-option>
        </el-select>
        <el-select
          filterable
          v-model="form.isExamine"
          placeholder="整改状态"
          clearable
        >
          <el-option value="1" label="已整改"></el-option>
          <el-option value="0" label="未整改"></el-option>
        </el-select>
        <el-select
          v-model="form.isAtt"
          clearable
          placeholder="请选择是否为贵阳海关及隶属海关"
        >
          <el-option label="不限" :value="null"> </el-option>
          <el-option label="是" :value="0"> </el-option>
          <el-option label="否" :value="1"> </el-option>
        </el-select>
        <el-cascader
          v-model="form.businessSupervisoryDeptId"
          :options="dept"
          :props="props"
          @change="(e) => deptIdchange(e, 'businessSupervisoryDeptId')"
          placeholder="业务主管部门"
          clearable
          filterable
        >
        </el-cascader>
        <el-button icon="el-icon-search" @click="saerch">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="refesh">重置</el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        max-height="550"
        :data="problemlist"
        border
        @selection-change="selectlist"
      >
        <el-table-column type="selection" fixed></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column
          align="center"
          prop="problemDescription"
          label="问题简述"
        >
          <div
            slot-scope="scope"
            :style="{
              maxHeight: '80px',
              overflowY: 'scroll',
            }"
          >
            <div>
              {{ scope.row.problemDescription }}
            </div>
          </div>
        </el-table-column>
        <el-table-column
          align="center"
          prop="businessArea"
          label="业务领域"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="businessSubcategories"
          label="业务小类"
        ></el-table-column>
        <el-table-column prop="auditCustoms" align="center" label="被审计海关">
          <div
            slot-scope="scope"
            :style="{
              maxHeight: '80px',
              overflowY: 'scroll',
            }"
          >
            <div v-for="(item, index) in scope.row.auditCustoms" :key="index">
              {{ item }}
            </div>
          </div>
        </el-table-column>
        <el-table-column
          prop="auditTimeFrame"
          label="审计时间范围"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="responsibleDeptList"
          label="整改责任部门"
          align="center"
        >
          <div
            slot-scope="scope"
            :style="{
              maxHeight: '80px',
              overflowY: 'scroll',
            }"
          >
            <div
              v-for="(item, index) in scope.row.responsibleDeptList"
              :key="index"
            >
              {{ item }}
            </div>
          </div></el-table-column
        >
        <el-table-column label="整改状态" align="centder">
          <div slot-scope="scope">
            <el-button size="small" :type="status[scope.row.status].type">
              {{ status[scope.row.status].label }}
            </el-button>
          </div>
        </el-table-column>

        <el-table-column
          prop="rectificationDeadline"
          label="整改期限"
          align="center"
        ></el-table-column>
        <el-table-column label="整改内容" align="center" width="160">
          <div
            slot-scope="scope"
            v-if="scope.row.situationList.length !== 0"
            :style="{
              maxHeight: '80px',
              overflowY: 'scroll',
            }"
          >
            <div v-for="item in scope.row.situationList" :key="item.id">
              {{ item.deptName + "-" + item.rectificationSituation }}
            </div>
            <div v-if="scope.row.situationList.length === 0">--</div>
          </div>
        </el-table-column>
        <el-table-column label="整改审核状态" align="center">
          <div slot-scope="scope">
            {{ scope.row.isExamine === 1 ? "已审核" : "待审核" }}
          </div>
        </el-table-column>
        <el-table-column label="内控关联状态" align="center">
          <div slot-scope="scope">
            {{ scope.row.internalStatus !== 0 ? "已关联" : "待关联" }}
          </div>
        </el-table-column>
        <el-table-column label="制度关联状态" align="center">
          <div slot-scope="scope">
            {{ scope.row.rulesStatus !== 0 ? "已关联" : "待关联" }}
          </div>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="录入人"
          align="center"
        ></el-table-column>
        <el-table-column label="状态" align="center">
          <div slot-scope="scope">
            {{ scope.row.isCancel === 1 ? "生效" : "待生效" }}
          </div>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="录入时间"
          align="centder"
        ></el-table-column>
        <el-table-column prop="isAtt" label="是否属于贵阳海关" align="center">
          <div slot-scope="scope">
            {{ scope.row.isAtt === 0 ? "是" : " 否" }}
          </div>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope" v-if="scope.row.remark">
            {{ scope.row.remark }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="520" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="openJudge(scope.row)"
              :disabled="Disable('data:data:judge') || scope.row.status !== 1"
              >审核</el-button
            >
            <el-button
              @click="isCancel(scope.row)"
              size="small"
              :disabled="Disable('data:data:status')"
              :type="scope.row.isCancel !== 0 ? 'success' : 'warning'"
              >{{ scope.row.isCancel !== 0 ? "待生效" : "生效" }}</el-button
            >
            <el-button
              size="small"
              type="warning"
              @click="edit(scope.row)"
              :disabled="Disable('data:data:edit')"
              >编辑</el-button
            >
            <el-button size="small" type="success" @click="detile(scope.row)"
              >详情</el-button
            >
            <el-button
              size="small"
              type="primary"
              @click="rect(scope.row)"
              :disabled="Disable('data:data:rect') || scope.row.isExamine === 1"
              >整改</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="opendelate(scope.row)"
              :disabled="Disable('data:data:delate')"
              >删除</el-button
            >
            <el-button
              v-if="deletelist"
              size="small"
              type="danger"
              @click="muntiedetile"
              :disabled="Disable('data:data:delate')"
              >批量删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total,sizes,prev, pager, next"
          :total="total"
          :page-size="form.size"
          @prev-click="changepage"
          @next-click="changepage"
          @current-change="changepage"
          @size-change="sizeChange"
          :page-sizes="[10, 20, 50, 100]"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog title="审核" width="30%" :visible.sync="judgelog">
      <el-form>
        <el-form-item label="审核确认：">
          <el-radio-group v-model="judge">
            <el-radio :label="1">审核通过</el-radio>
            <el-radio :label="0">审核未通过</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="judgelog = false">取 消</el-button>
        <el-button type="primary" @click="confirmJudge">确 定</el-button>
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
        <el-button type="success" @click="downloadmodel">模板导出</el-button>
      </span>
    </el-dialog>
    <el-dialog title="确认删除" width="30%" :visible.sync="delatelog" center>
      <span slot="footer" class="el-dialog-footer">
        <el-button @click="delatelog = false">取消</el-button>
        <el-button type="danger" @click="delate">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAlldept, getdept } from "@/api/dept/getdept";
import { getbusinessAear, getbusinessType, getdict } from "@/api/dict/getdict";
import {
  getproblem,
  problemModify,
  problemJudge,
  problemdelate,
} from "@/api/data/wenti/getWenti";
import {
  importProblem,
  exportProblem,
  getModle,
} from "@/api/download/download";
import { Disablebutton } from "@/utils/button";
export default {
  name: "orderlist",
  data() {
    return {
      status: [
        {
          label: "待整改",
          type: "warning",
          value: 0,
        },
        {
          label: "已整改",
          type: "success",
          value: 1,
        },
        {
          label: "整改到期",
          type: "danger",
          value: 2,
        },
      ],
      props: {
        label: "name",
        children: "children",
        value: "id",
      },
      judge: 1,
      judgeid: "",
      judgelog: false,
      problemlist: [],
      ishow: "true",
      form: {
        size: 10,
        current: "1",
        keywords: null,
        responsibleDept: null,
        auditCustomsIds: null,
        isExamine: null,
        businessAreaCode: null,
        businessSubcategoriesCode: null,
        internalStatus: null,
        rulesStatus: null,
        projectLevelCode: null,
        projectTypeCode: null,
      },
      beasForm: {},
      delateid: "",
      total: "",
      dept: [],
      customsType: [
        {
          name: "非贵阳海关及隶属海关",
        },
      ],
      businessArea: [],
      businessSubcategories: [],
      upload: false,
      uploademo: "",
      delatelog: false,
      deletelist: null,
      projectlevel: [],
      projecttype: [],
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
      this.$router.push("/datadd");
    },
    show() {
      this.ishow = !this.ishow;
    },
    handleimgup(data) {
      const imgData = data.file;
      const form = new FormData();
      form.append("file", imgData);
      http({
        method: "post",
        url: "/file/upload",
        data: form,
        header: { "content-type": "multipart/form-data;" },
      })
        .then((res) => {
          this.url.push(res.data);
          this.data.annex = this.url.join(",");
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
    //分页
    changepage(value) {
      this.form.current = value;
      this.problemlist = [];
      this.getproblemlist();
    },
    //审核框
    openJudge(row) {
      this.judgeid = row.id;
      this.judgelog = true;
    },
    //审核
    confirmJudge() {
      problemJudge(this.judgeid, this.judge)
        .then((res) => {
          const message = res.msg;
          this.$notify({
            title: "成功",
            message: message,
            type: "success",
          });
          this.problemlist = [];
          this.getproblemlist();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //详情
    detile(row) {
      this.$router.push({
        path: "/datadetil",
        query: {
          id: row.id,
          type: "detile",
        },
      });
    },
    //编辑
    edit(row) {
      this.$router.push({
        path: "/datadetil",
        query: {
          id: row.id,
          type: "edit",
        },
      });
    },
    //整改
    rect(row) {
      this.$router.push({
        path: "/datadetil",
        query: {
          id: row.id,
          type: "rect",
        },
      });
    },
    //获取问题数据
    getproblemlist() {
      getproblem(this.form)
        .then((res) => {
          this.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.problemlist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //生效作废问题
    isCancel(row) {
      problemModify(row.id)
        .then((res) => {
          const message = res.msg;
          this.$notify({
            title: "成功",
            message: message,
            type: "success",
          });
          this.problemlist = [];
          this.getproblemlist();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getoption() {
      getAlldept()
        .then((res) => {
          this.dept.push(res.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
      getdept().then((res) => {
        const list = res.data;
        const length = list.length;
        for (var i = 0; i < length; i++) {
          this.customsType.push(list[i]);
        }
      });
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
      getdict("project_level")
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.projectlevel.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getdict("project_type")
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.projecttype.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    saerch() {
      this.problemlist = [];
      getproblem(this.form)
        .then((res) => {
          this.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.problemlist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //批量上传
    uplode(data) {
      const imgData = data.file;
      const form = new FormData();
      form.append("file", imgData);
      importProblem(form)
        .then((res) => {
          this.$notify({
            title: "成功",
            message: res.msg,
            type: "success",
          });
          this.problemlist = [];
          this.getproblemlist();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    download() {
      const data = {
        keyword: this.form.keyword,
        responsibleDeptList: this.form.responsibleDeptList,
        auditCustoms: this.form.auditCustoms,
        isExamine: this.form.isExamine,
        businessAreaCode: this.form.businessAreaCode,
        businessSubcategoriesCode: this.form.businessSubcategoriesCode,
        internalStatus: this.form.internalStatus,
        rulesStatus: this.form.rulesStatus,
      };
      exportProblem(data);
      // .then((res) => {
      //   console.log(res)
      //   const blob = new Blob([res.data] ,
      //   {
      //     type:'xlsx'
      //   });
      //   const url = URL.createObjectURL(blob);
      //   // console.log(url)
      //   const link = document.createElement("a");
      //   // link.href = url;
      //   // link.download = "filename.xlsx";
      //   // link.click();
      // })
      // .catch((error) => {
      //   console.error(error);
      // });
      // .then((res) => {
      //   this.$notify({
      //     title: "成功",
      //     message: res.msg,
      //     type: "success",
      //   });
      // })
      // .catch((error) => {
      //   console.error(error);
      // });
    },
    downloadmodel() {
      getModle(
        "http://10.84.1.223:9000/gy-file/2023/10/16/问题库导入模板/1324/问题库导入模板.xlsx"
      );
    },
    Disable(data) {
      return Disablebutton(data);
    },
    refesh() {
      this.form = {
        size: 10,
        current: "1",
        keywords: null,
        responsibleDeptList: null,
        auditCustomsIds: null,
        isExamine: null,
        businessAreaCode: null,
        businessSubcategoriesCode: null,
        internalStatus: null,
        rulesStatus: null,
        projectLevelCode: null,
        projectTypeCode: null,
      };
      this.problemlist = [];
      this.getproblemlist();
    },
    opendelate(row) {
      (this.delateid = row.id), (this.delatelog = true);
    },
    delate() {
      problemdelate(this.delateid).then((res) => {
        const message = res.msg;
        this.$notify({
          title: "成功",
          message: message,
          type: "success",
        });
      });
      this.$router.go(0);
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
        problemdelate(this.deletelist).then((res) => {
          const message = res.msg;
          this.$notify({
            title: "成功",
            message: message,
            type: "success",
          });
        });
        this.$router.go(0);
      });
    },
    sizeChange(value) {
      this.form.size = value;
      this.problemlist = [];
      this.getproblemlist();
    },
    deptIdchange(value, name) {
      const list = value;
      console.log(value);
      const length = list.length;
      console.log(length);
      this.form[name] = list[length - 1];
      // this.data.businessSupervisoryDeptId = list[length - 1];
      // console.log(this.data.businessSupervisoryDeptId);
    },
  },
  created() {
    this.beasForm = this.form;
  },
  mounted() {
    this.getproblemlist();
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
    width: 100%;
    display: flex;
    justify-content: space-between;

    .el-autocomplete {
      width: 15%;
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
      width: 20%;
      margin-left: 10px;
      margin-right: 10px;
    }
    .el-cascader {
      width: 15%;
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