<template>
  <div class="container">
    <div class="top">
      <el-form inline :model="form">
        <el-form-item label="时间范围：">
          <el-date-picker
            clearable
            placeholder="开始时间"
            v-model="form.startTime"
            :value-format="'yyyy-MM-dd HH:mm:ss'"
          ></el-date-picker>
          -
          <el-date-picker
            placeholder="结束时间"
            v-model="form.endTime"
            :value-format="'yyyy-MM-dd HH:mm:ss'"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="操作类型：">
          <el-select v-model="form.opType" clearable filterable>
            <el-option
              v-for="item in opTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门">
          <el-cascader
            v-model="dept"
            :options="deptList"
            :props="prop"
            clearable
            filterable
            @change="changeDept"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="操作人">
          <el-select v-model="form.userId">
            <el-option
              v-for="item in deptUserList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="seach">
        <el-button type="primary" @click="serch">搜索</el-button>
        <el-button type="warning" @click="refesh">重置</el-button>
      </div>
    </div>
    <div class="table">
      <el-table max-height="630" border :data="userList" empty-text="-">
        <el-table-column label="操作" prop="title"></el-table-column>
        <el-table-column label="opType" prop="opType"></el-table-column>
        <el-table-column label="操作人" prop="user">
          <template slot-scope="scope">
            {{ scope.row.user || "-" }}
          </template>
        </el-table-column>
        <el-table-column label="部门" prop="dept">
          <template slot-scope="scope">
            {{ scope.row.dept ? scope.row.dept.allPath : "-" }}
          </template>
        </el-table-column>
        <el-table-column label="时间" prop="time"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total,sizes,prev, pager, next"
          :total="total"
          :page-size="size.size"
          @prev-click="change"
          @next-click="change"
          @current-change="change"
          @size-change="sizeChange"
          :page-sizes="[10, 20, 50, 100]"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script >
import { getAlldept, findDeptUser } from "@/api/dept/getdept";
import { getlog } from "@/api/log";
import { getalldata } from "@/api/echarts/getechartsdata";
export default {
  name: "orderlist",
  data() {
    return {
      form: {
        startTime: "",
        endTime: "",
        opType: "",
        deptId: "",
        userId: "",
      },
      size: {
        size: 10,
        current: 1,
      },
      dept: "",
      opTypeList: [
        {
          value: "LOGIN",
          label: "登录",
        },
        {
          value: "DOWNLOAD",
          label: "下载",
        },
        {
          value: "IMPORT",
          label: "导入",
        },
        {
          value: "DERIVE",
          label: "导出",
        },
        {
          value: "EDIT",
          label: "修改",
        },
        {
          value: "EXAMINE",
          label: "审核",
        },
        {
          value: "DELETED",
          label: "删除",
        },
        {
          value: "VIEW",
          label: "查看",
        },
        {
          value: "SUBMIT",
          label: "提交",
        },
        {
          value: "CLEAR",
          label: "清空",
        },
      ],
      deptList: [],
      deptUserList: [],
      total: "",
      userList: [],
      prop: {
        label: "name",
        children: "children",
        value: "id",
      },
      dept: "",
    };
  },
  created() {
    this.setdata();
  },
  mounted() {
    this.getUserList();
    this.getDeptList();
  },
  methods: {
    //数据初始化
    setdata() {
      this.form = {
        startTime: "",
        endTime: "",
        opType: "",
        deptId: "",
        user: "",
      };
      this.size = {
        size: 10,
        current: 1,
      };
    },
    //获取数据
    getUserList() {
      this.userList = [];
      this.empty(this.form);
      getlog(this.size, this.form)
        .then((res) => {
          console.log(res);
          this.total = Number(res.data.total);
          this.userList = res.data.records;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //清除空值
    empty(form) {
      for (var item in form) {
        if (form[item] === null || form[item] === "") {
          form[item] = "";
        }
      }
    },
    //页面切换
    change(value) {
      this.size.current = value;
      this.getUserList();
    },
    //页面条数切换
    sizeChange(value) {
      this.size.size = value;
      this.getUserList();
    },
    //获取部门
    getDeptList() {
      getAlldept()
        .then((res) => {
          //   console.log(res);
          this.deptList = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    changeDept(value) {
      console.log(value);
      if (value.length !== 0) {
        // const data = value.pop();
        this.form.deptId = value[value.length - 1];
        this.getDeptUser(this.form.deptId);
      }
    },
    //获取用户
    getDeptUser(value) {
      // this.userList = [];
      this.deptUserList = [];
      findDeptUser(value)
        .then((res) => {
          const userlist = res.data;
          const length = userlist.length;
          for (var i = 0; i < length; i++) {
            this.deptUserList.push(userlist[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    serch() {
      this.getUserList();
    },
    refesh() {
      this.setdata();
      this.getUserList();
    },
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
  color: #000;
  .el-form {
    display: flex;
    flex-wrap: wrap;
  }
  .top {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
    width: 80%;
    margin-top: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-radius: 12px;
    margin-bottom: 15px;
    .seach {
      display: flex;
      //   width: calc(100% - 900px);

      .el-input {
        margin-right: 20px;
      }
      .el-button {
        margin-left: 12px;
        height: 40px;
        width: 100px;
      }
    }
  }
  .table {
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-radius: 12px;
    width: 80%;
    .el-table {
      width: 100%;
    }
    .pagination {
      display: flex;
      margin-bottom: 10px;
      justify-content: flex-end;
    }
  }
}
</style>