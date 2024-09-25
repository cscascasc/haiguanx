<template>
  <div class="container">
    <div class="seach">
      <el-input
        style="width: 700px"
        popper-class="my-autocomplete"
        v-model="form.keywords"
        placeholder="请输入内容"
        clearable
      >
        <template slot-scope="{ item }">
          <div class="name">{{ item.value }}</div>
          <span class="addr" style="font-size: 8px; color: #959595">{{
            item.address
          }}</span>
        </template>
      </el-input>
      <el-button icon="el-icon-search" @click="change4"> 搜索 </el-button>
    </div>
    <div class="select">
      <div class="hearder">
        <div class="title">已选条件</div>
        <el-button @click="change">{{ open ? "收起" : "展开" }}</el-button>
      </div>

      <div class="selectBox" v-if="open">
        <div class="rideoBox">
          <div class="rideo">
            <div class="text">是否归属贵阳海关:</div>
            <el-radio-group
              v-model="form.isAtt"
              size="medium"
              @change="change4"
            >
              <el-radio-button
                v-for="item in isGuiyangCustoms"
                :label="item.value"
                :key="item.name"
              >
                {{ item.name }}</el-radio-button
              >
            </el-radio-group>
          </div>
        </div>
        <div class="rideoBox">
          <div class="rideo">
            <div class="text">项目级别:</div>
            <el-radio-group
              v-model="form.projectLevelCode"
              size="medium"
              @change="change4"
            >
              <el-radio-button
                v-for="item in levelList"
                :label="item.dictValue"
                :key="item.dictLabel"
                >{{ item.dictLabel }}</el-radio-button
              >
            </el-radio-group>
          </div>
        </div>
        <div class="rideoBox">
          <div class="rideo">
            <div class="text">项目类别:</div>
            <el-radio-group
              v-model="form.projectTypeCode"
              size="medium"
              @change="change4"
            >
              <el-radio-button
                v-for="item in projectcategory"
                :label="item.dictValue"
                :key="item.dictLabel"
                >{{ item.dictLabel }}</el-radio-button
              >
            </el-radio-group>
          </div>
        </div>
        <div class="rideoBox">
          <div class="rideo">
            <div class="text">被审计海关:</div>
            <el-select
              v-model="form.auditCustomsIds"
              @change="change4"
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
          </div>
        </div>
        <div class="rideoBox">
          <div class="rideo">
            <div class="text">年度:</div>
            <el-date-picker
              v-model="form.auditAnnual"
              type="year"
              value-format="yyyy"
              placeholder="选择年"
              @change="change4"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="rideoBox">
          <div class="rideo">
            <div class="text">整改状态:</div>
            <el-radio-group
              v-model="form.status"
              size="medium"
              @change="change4"
            >
              <el-radio-button
                v-for="item in satation"
                :label="item.value"
                :key="item.label"
                >{{ item.label }}</el-radio-button
              >
            </el-radio-group>
          </div>
        </div>
        <div class="rideoBox">
          <div class="rideo">
            <div class="text">业务领域:</div>
            <el-radio-group v-model="form.businessAreaCode" @change="change4">
              <el-radio-button
                v-for="item in category"
                :label="item.dictValue"
                :key="item.dictLabel"
                >{{ item.dictLabel }}
              </el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="rideoBox">
          <div class="rideo">
            <div class="text">业务小类:</div>
            <el-radio-group
              v-model="form.businessSubcategoriesCode"
              size="medium"
              @change="change4"
            >
              <el-radio-button
                v-for="item in xiaolei"
                :label="item.dictValue"
                :key="item.dictLabel"
                >{{ item.dictLabel }}</el-radio-button
              >
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
    <div class="table">
      <el-table :data="problemlist" max-height="600" border>
        <el-table-column type="index" label="序号" fixed></el-table-column>
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
        <el-table-column
          prop="auditCustoms"
          align="center"
          label="被审计海关"
        ></el-table-column>
        <el-table-column
          prop="auditTimeFrame"
          label="审计时间范围"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="responsibleDeptList"
          label="整改责任部门"
          align="center"
        ></el-table-column>
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
        <el-table-column label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button size="small" type="success" @click="detile(scope.row)"
              >详情</el-button
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
  </div>
</template>
<script>
import { getbusinessAear, getbusinessType, getdict } from "@/api/dict/getdict";
import {
  getproblem,
  problemModify,
  problemJudge,
} from "@/api/data/wenti/getWenti";
import { getdept } from "@/api/dept/getdept";
export default {
  name: "orderlist",
  data() {
    return {
      state: "",
      restaurants: [],
      open: false,
      levelValue: "不限",
      date: "",
      dateValue: "不限",
      satationValue: "不限",
      categoryValue: [""],
      satation: [
        {
          label: "不限",
          value: null,
        },
        {
          label: "已整改",
          value: "1",
        },
        {
          label: "待整改",
          value: "0",
        },
        {
          label: "整改超期",
          value: "2",
        },
      ],
      levelList: [
        {
          dictLabel: "不限",
          dictValue: null,
        },
        // {
        //   label: "国家审计",
        //   value: "0",
        // },
        // {
        //   label: "署级审计",
        //   value: "1",
        // },
        // {
        //   label: "关级审计",
        //   value: "2",
        // },
        // {
        //   label: "迎审自查",
        //   value: "3",
        // },
      ],
      category: [
        {
          dictLabel: "不限",
          dictValue: null,
        },
      ],
      xiaolei: [
        {
          dictLabel: "不限",
          dictValue: null,
        },
      ],
      status: [
        {
          label: "待整改",
          type: "warning",
        },
        {
          label: "已整改",
          type: "success",
        },
        {
          label: "整改到期",
          type: "danger",
        },
      ],
      form: {
        size: 10,
        current: "1",
        total: null,
        projectLevelCode: null,
        auditAnnual: null,
        status: null,
        businessAreaCode: null,
        businessSubcategoriesCode: null,
        keywords: null,
        isAtt: null,
        projectTypeCode: null,
      },
      problemlist: [],
      projectcategory: [
        {
          dictLabel: "不限",
          dictValue: null,
        },
      ],
      customsType: [],
      isGuiyangCustoms: [
        {
          name: "不限",
          value: null,
        },
        {
          name: "是",
          value: 0,
        },
        {
          name: "否",
          value: 1,
        },
      ],
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
    //历史数据
    loadAll() {
      return [];
    },
    //拿到选择后的返回值
    handleSelect(item) {
      console.log(item);
    },
    handleIconClick(item) {
      console.log(item);
    },
    //展开收起
    change() {
      if (this.open === false) {
        this.open = true;
      } else this.open = false;
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
          console.log(this.problemlist);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    detile(row) {
      this.$router.push({
        path: "/datadetil",
        query: {
          id: row.id,
          type: "detile",
        },
      });
    },
    changepage(value) {
      this.form.current = value;
      getproblem(this.form)
        .then((res) => {
          this.problemlist = [];
          this.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.problemlist.push(list[i]);
          }
          console.log(this.problemlist);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getlist() {
      getbusinessAear()
        .then((res) => {
          for (var i = 0; i < res.data.records.length; i++) {
            this.category.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getbusinessType()
        .then((res) => {
          for (var i = 0; i < res.data.records.length; i++) {
            this.xiaolei.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getdict("project_level")
        .then((res) => {
          for (var i = 0; i < res.data.records.length; i++) {
            this.levelList.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getdict("project_type")
        .then((res) => {
          for (var i = 0; i < res.data.records.length; i++) {
            this.projectcategory.push(res.data.records[i]);
          }
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
    },
    console1(value) {
      this.form.projectLevelCode = value;
      this.problemlist = [];
      this.total = 0;
      getproblem(this.form)
        .then((res) => {
          this.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.problemlist.push(list[i]);
          }
          console.log(this.problemlist);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    change2(value) {
      this.form.auditAnnual = value;
      this.problemlist = [];
      this.total = 0;
      getproblem(this.form)
        .then((res) => {
          this.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.problemlist.push(list[i]);
          }
          console.log(this.problemlist);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    change3(value) {
      this.form.status = value;
      this.problemlist = [];
      this.total = 0;
      getproblem(this.form)
        .then((res) => {
          this.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.problemlist.push(list[i]);
          }
          console.log(this.problemlist);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    console5(value) {
      this.form.projectTypeCode = value;
      this.problemlist = [];
      this.total = 0;
      getproblem(this.form)
        .then((res) => {
          this.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.problemlist.push(list[i]);
          }
          console.log(this.problemlist);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    change4() {
      this.problemlist = [];
      this.total = 0;
      getproblem(this.form)
        .then((res) => {
          this.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.problemlist.push(list[i]);
          }
          console.log(this.problemlist);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.restaurants = this.loadAll();
    this.getproblemlist();
    this.getlist();
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: #fff;
  color: #000;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 100px);
  .seach {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
    border-radius: 15px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    .el-autocomplete {
      width: 600px;
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
    }
  }
  .select {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    width: 90%;

    border-radius: 15px;
    margin-top: 15px;

    .hearder {
      width: 75vw;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
      .title {
        font-size: 20px;
        font-weight: 600;
      }
    }
    .selectBox {
      transition: all 0.3s;
      max-height: 40vh;
      overflow-y: scroll;
    }
    .rideoBox {
      .rideo {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        width: 75vw;
        .text {
          font-size: 18px;
          margin-right: 20px;
          width: 100px;
          text-align: left;
        }
        ::v-deep .el-radio-group {
          max-width: 90%;
          display: flex;
          flex-wrap: wrap;
        }
        .el-radio-button,
        .el-checkbox-button {
          margin-right: 10px;
          height: 40px;
        }

        .el-checkbox-group {
          display: flex;
          flex-wrap: wrap;
          width: 65vw;
          ::v-deep .el-checkbox-button__inner {
            border-left: 1px solid #dcdfe6;
          }
        }
        ::v-deep .el-radio-button__inner {
          border-left: 1px solid #dcdfe6;
        }
      }
    }
  }
  .table {
    width: 90%;
    margin-top: 10px;
    padding: 5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 15px;
    margin-top: 15px;
    margin-bottom: 20px;
    .el-table {
      border-radius: 15px;
    }
    .pagination {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>