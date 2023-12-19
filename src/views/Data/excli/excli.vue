<template>
  <div class="container">
    <div class="top-container">
      <div class="top-select">
        <div class="select-title">单位：</div>
        <el-select v-model="data.parentId" clearable>
          <el-option
            v-for="item in option.unitFrom"
            :key="item.id"
            :label="item.customsName"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <!-- <div class="select-title">部门：</div>
        <el-select v-model="value" @change="change">
          <el-option
            v-for="item in option.detpcustoms"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          >
            {{ item.name }}</el-option
          >
        </el-select> -->
        <div class="select-title">年度：</div>
        <el-date-picker
          v-model="data.year"
          type="year"
          value-format="yyyy"
        ></el-date-picker>
        <el-button icon="el-icon-search" @click="serch">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="refech">重置</el-button>
      </div>
    </div>
    <div class="mid-container">
      <div class="table" v-if="!list">
        <el-table style="width: 100%" border>
          <el-table-column label="单位"> </el-table-column>
          <el-table-column label="部门"> </el-table-column>
          <el-table-column label="年度">
            {{ data.year }}
          </el-table-column>
          <el-table-column label="问题数"> </el-table-column>
          <el-table-column label="内控数"> </el-table-column>
          <el-table-column label="规章制度数"> </el-table-column>
        </el-table>
      </div>
      <div class="table" v-if="!!list">
        <el-table
          :data="list"
          style="width: 100%"
          row-key="id"
          border
          max-height="690"
          show-summary
          stripe
          :tree-props="{ children: 'children', hasChildren: 'hasChilren' }"
        >
          <el-table-column prop="customsName" label="单位"> </el-table-column>
          <el-table-column prop="name" label="部门"> </el-table-column>
          <el-table-column label="年度">
            {{ data.year }}
          </el-table-column>
          <el-table-column prop="problemNum" label="问题数"></el-table-column>
          <el-table-column prop="internalNum" label="内控数"></el-table-column>
          <el-table-column prop="rulesNum" label="规章制度数">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { deptAudit } from "@/api/data/news/getnews";
import { decryptlong } from "@/utils/jsencrypt";
import { getdept, getdeptcustoms } from "@/api/dept/getdept";
export default {
  data() {
    return {
      data: {
        parentId: null,
        year: "2023",
      },
      option: {
        unitFrom: [
          {
            customsName: "不限",
            id: null,
          },
        ],
        detpcustoms: [
          {
            name: "不限",
            id: null,
          },
        ],
      },
      value: "",
      list: [],
    };
  },
  methods: {
    //获取海关
    deptlist() {
      getdept()
        .then((res) => {
          console.log(res);
          const list = res.data;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.option.unitFrom.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //关联部门
    custom(value) {
      this.option.detpcustoms = [];
      getdeptcustoms(value)
        .then((res) => {
          const list = res.data;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.option.detpcustoms.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //获取报表数据
    getlist() {
      deptAudit(this.data)
        .then((res) => {
          this.list = res.data;
          console.log(this.list, "1111");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    change(value) {
      this.data.parentId = value;
    },
    serch() {
      this.list = [];
      deptAudit(this.data)
        .then((res) => {
          this.list = res.data;
          console.log(this.list, "1111");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    refech() {
      this.$router.go();
    },
  },
  async mounted() {
    this.deptlist();
    await this.getlist();
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
  .mid-container {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin-top: 15px;
    border-radius: 15px;
    width: 90%;
    border-radius: 15px;
    .table {
      border-radius: 20px;
      padding: 15px;

      .pagination {
        display: flex;
        justify-content: flex-end;
      }
      ::v-deep .el-table__expanded-cell el-table__row {
        background-color: transparent;
      }

      ::v-deep .el-table-column,
      ::v-deep .el-table__row tr,
      ::v-deep .el-table__row td {
        background-color: transparent;
      }
      ::v-deep .el-table__row:hover {
        background-color: #84d6f637;
      }
    }
  }
}
</style>