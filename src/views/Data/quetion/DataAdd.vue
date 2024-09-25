<template>
  <div class="container">
    <div class="top-container">
      <div class="back">
        <el-button @click="topath" type="primary"> 返回 </el-button>
      </div>
      <div class="title">问题新增</div>
    </div>
    <div class="form-container">
      <el-form :model="data" ref="data">
        <div class="form">
          <div class="formitem">
            <el-form-item
              label="项目类型："
              prop="projectTypeCode"
              :rules="{
                required: true,
                message: '请选择项目类型',
              }"
            >
              <el-select v-model="data.projectTypeCode" clearable filterable>
                <el-option
                  v-for="item in object_type"
                  :key="item.dictLabel"
                  :value="item.dictValue"
                  :label="item.dictLabel"
                >
                  {{ item.dictLabel }}
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="项目级别："
              :rules="{
                required: true,
                message: '请选择项目级别',
              }"
              prop="projectLevelCode"
            >
              <el-select v-model="data.projectLevelCode" clearable filterable>
                <el-option
                  v-for="item in object_level"
                  :key="item.dictLabel"
                  :value="item.dictValue"
                  :label="item.dictLabel"
                >
                  {{ item.dictLabel }}
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item
              label="被审计海关："
              :rules="{
                required: true,
                message: '请选择被审计海关',
              }"
              prop="auditCustoms"
            >
              <el-select
                v-model="data.auditCustoms"
                @change="chocedept"
                clearable
                filterable
                multiple
              >
                <el-option
                  v-for="item in customs"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                >
                  {{ item.name }}
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="业务主管部门：">
              <el-cascader
                v-model="businessSupervisoryDeptId"
                :options="deptList"
                show-checkbox
                :props="prop"
                @change="deptIdchange"
                placeholder="部门"
              >
              </el-cascader>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item
              label="整改责任部门："
              :rules="{
                required: true,
                message: '请选择整改责任部门',
              }"
              prop="responsibleDeptList"
            >
              <el-cascader
                v-model="responsibleDeptList"
                :options="deptList"
                :props="props"
                @change="deptchange"
                placeholder="部门"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item label="被审计领导：">
              <el-input v-model="data.auditLeader"></el-input>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item
              label="年度："
              :rules="{
                required: true,
                message: '请选择年度',
              }"
              prop="auditAnnual"
            >
              <el-date-picker
                v-model="data.auditAnnual"
                value-format="yyyy"
                type="year"
                format="yyyy"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="审计时间范围："
              :rules="{
                required: true,
                message: '请选择审计时间范围',
              }"
              prop="TimeFrame"
            >
              <el-date-picker
                v-model="data.TimeFrame"
                range-separator="-"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item label="审计类型：">
              <el-input v-model="data.auditType"></el-input>
            </el-form-item>
            <el-form-item label="违反的制度规定：">
              <el-input v-model="data.areasInvolve"></el-input>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item
              label="业务领域："
              prop="businessAreaCode"
              :rules="{
                required: true,
                message: '请选择业务领域',
              }"
            >
              <el-select v-model="data.businessAreaCode" clearable filterable>
                <el-option
                  v-for="item in businessArea"
                  :key="item.dictLabel"
                  :value="item.dictValue"
                  :label="item.dictLabel"
                >
                  {{ item.dictLabel }}
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="业务小类："
              prop="businessSubcategoriesCode"
              :rules="{
                required: true,
                message: '请选择业务小类',
              }"
            >
              <el-select
                v-model="data.businessSubcategoriesCode"
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
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item
              label="问题简述:"
              prop="problemDescription"
              :rules="{
                required: true,
                message: '请输入问题简述',
              }"
            >
              <el-input v-model="data.problemDescription"></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
              <el-input v-model="data.name"></el-input>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item label="问题依据">
              <el-input v-model="data.gist"></el-input>
            </el-form-item>
          </div>
          <div class="formarea">
            <el-form-item
              label="问题描述："
              prop="detailedDescription"
              :rules="{
                required: true,
                message: '请输入问题描述',
              }"
            >
              <el-input
                v-model="data.detailedDescription"
                type="textarea"
                :autosize="{ minRows: 5 }"
              ></el-input>
            </el-form-item>
          </div>
          <div class="formarea">
            <el-form-item label="整改建议：">
              <el-input
                v-model="data.rectificationSuggestions"
                type="textarea"
                :autosize="{ minRows: 5 }"
              ></el-input>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item label="涉及金额：">
              <el-input type="number" v-model="data.involveAmount">
                <i slot="suffix" style="font-size: 12px">万元</i></el-input
              >
            </el-form-item>
            <el-form-item label="涉及税额：">
              <el-input type="number" v-model="data.involveTaxAmount"
                ><i slot="suffix" style="font-size: 12px">万元</i></el-input
              >
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item
              label="整改时限:"
              prop="rectificationDeadline"
              :rules="{
                required: true,
                message: '请选择整改时限',
              }"
            >
              <el-date-picker
                v-model="data.rectificationDeadline"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div class="formarea">
            <el-form-item label="整改情况：">
              <el-input
                v-model="data.situationList[0].rectificationSituation"
                type="textarea"
                :autosize="{ minRows: 5 }"
              ></el-input>
            </el-form-item>
          </div>
          <div class="formarea">
            <el-form-item label="备注：">
              <el-input
                v-model="data.remark"
                type="textarea"
                :autosize="{ minRows: 5 }"
              ></el-input>
            </el-form-item>
          </div>
          <div class="fromitem">
            <el-form-item label="附件：">
              <el-upload
                :http-request="handleimgup"
                multiple
                list-type="picture-card"
              >
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <em>请上传PDF、WORD、JPG文件</em>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <div class="button">
      <el-button type="success" @click="open('data')"> 提交 </el-button>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>确认要提交吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import http from "@/utils/request";
import {
  getobjecttype,
  getobjectlevel,
  getbusinessAear,
  getbusinessType,
} from "@/api/dict/getdict";
import { getdept, getAlldept, getdeptcustoms } from "@/api/dept/getdept";
import { addproblem } from "@/api/data/wenti/getWenti";
export default {
  data() {
    return {
      data: {
        TimeFrame: [],
        projectTypeCode: "",
        projectLevelCode: "",
        auditCustoms: [],
        businessSupervisoryDeptId: "",
        responsibleDeptList: [],
        auditLeader: "",
        auditAnnual: "",
        auditTimeFrame: "",
        auditType: "",
        areasInvolve: "",
        businessAreaCode: "",
        businessSubcategoriesCode: "",
        problemDescription: "",
        detailedDescription: "",
        rectificationSuggestions: "",
        rectificationDeadline: "",
        involveAmount: "",
        involveTaxAmount: "",
        userName: this.$store.state.userinfo.userName,
        userId: this.$store.state.userinfo.userID,
        deptName: this.$store.state.userinfo.userdepartmentPath,
        deptId: this.$store.state.userinfo.userdepartment,
        situationList: [
          {
            deptName: this.$store.state.userinfo.userCustoms,
            deptId: "92eac8e1-3047-45f3-8355-94595f3e1bd6",
            rectificationSituation: null,
          },
        ],
        annex: "",
        name: "",
        gist: "",
      },
      url: [],
      props: {
        label: "name",
        children: "children",
        value: "id",
        multiple: true,
        checkStrictly: true,
      },
      prop: {
        label: "name",
        children: "children",
        value: "id",
        checkStrictly: true,
      },
      auditTimeFrame: "",
      businessSupervisoryDeptId: "",
      responsibleDeptList: [],
      centerDialogVisible: false,
      object_type: [],
      object_level: [],
      customs: [],
      deptList: [],
      businessArea: [],
      businessSubcategories: [],
    };
  },
  methods: {
    //获取选项
    getoption() {
      getobjecttype()
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.object_type.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getobjectlevel()
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.object_level.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
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
      getdept()
        .then((res) => {
          const list = res.data;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.customs.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getAlldept()
        .then((res) => {
          // for (let item of res.data[0].children) {
          //   delete item.children;
          // }
          this.deptList.push(res.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //chocedept
    chocedept(value) {
      console.log(value, "value");
      this.deptList = [];
      for (var i = 0; i < value.length; i++) {
        getdeptcustoms(value[i]).then((res) => {
          this.deptList.push({
            name: res.data[0].customsName,
            children: res.data,
          });
          console.log(this.deptList);
        });
      }
    },
    //上传附件
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
    //获取部门ID
    deptchange(value) {
      const list = value;
      const length = list.length;
      this.data.responsibleDeptList = [];
      for (var i = 0; i < length; i++) {
        this.data.responsibleDeptList.push(list[i].slice(-1)[0]);
      }
    },
    deptIdchange(value) {
      const list = value;
      console.log(value);
      const length = list.length;
      console.log(length);
      this.data.businessSupervisoryDeptId = list[length - 1];
      console.log(this.data.businessSupervisoryDeptId);
    },
    //返回
    topath() {
      this.$router.back();
    },
    //上传问题
    open(forName) {
      this.$refs[forName].validate((valid) => {
        if (valid) {
          this.centerDialogVisible = true;
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    submit() {
      if (this.data.situationList[0].rectificationSituation === null) {
        this.data.situationList = null;
      }
      this.data.auditTimeFrame =
        this.data.TimeFrame[0] + "-" + this.data.TimeFrame[1];
      addproblem(this.data)
        .then((res) => {
          const message = res.msg;
          this.$notify({
            title: "成功",
            message: message,
            type: "success",
          });
          this.$router.back();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.getoption();
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(100vh - 60px);
  background-color: #fff;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  .top-container {
    padding-top: 10px;
    width: 1400px;
    margin: 20px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    display: flex;
    align-items: center;
    padding: 10px;
    text-align: center;
    font-size: 22px;
    font-weight: 600;
    border-radius: 15px;
    .back {
      .el-button {
        width: 80px;
        height: 40px;
        margin-left: 20px;
      }
    }
    .title {
      text-align: center;
      width: calc(100% - 150px);
      font-size: 21px;
      font-weight: 600;
    }
  }
  .form-container {
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    border-radius: 15px;
    padding: 10px;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 1400px;
    .el-form {
      margin-top: 20px;
      height: calc(100vh - 140px);
      .steps {
        display: flex;
        justify-content: center;
        .el-steps {
          width: 600px;
        }
      }
      .form {
        margin-top: 10px;
        padding: 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        .formitem,
        .formarea {
          display: flex;
          padding: 0 20px 0 20px;
          width: 1200px;
          margin-top: 10px;
          justify-content: space-between;
          .el-form-item {
            display: flex;
            margin-bottom: 10px;
            width: 570px;
            align-items: center;
            justify-content: space-between;
            .el-table {
              width: 570px;
            }
            ::v-deep .el-cascader .el-input .el-input__inner {
              width: 430px;
            }
            ::v-deep .el-form-item__label {
              font-size: 16px;
              width: 200px;
              text-align: left;
              color: #000;
            }
            ::v-deep .el-range-editor.el-input__inner {
              width: 430px;
            }
            .el-input,
            .el-select,
            .el-date-picker {
              width: 430px;
            }
          }
        }
        .formarea {
          .el-form-item {
            display: flex;
            margin-bottom: 10px;
            width: 1200px;
            justify-content: flex-start;
            align-items: flex-start;
            ::v-deep .el-form-item__label {
              font-size: 16px;
              width: 140px;
              text-align: left;
              color: #000;
            }
            ::v-deep .el-form-item__content {
              display: flex;
              flex-direction: column;
            }
            ::v-deep .el-textarea__inner {
              width: 1010px;
            }
          }
        }
      }
      .el-form-item {
        display: flex;
        margin-bottom: 20px;
        padding-left: 40px;
        ::v-deep .el-form-item__label {
          font-size: 16px;
          width: 200px;
          text-align: left;
          color: #000;
        }
        ::v-deep .el-input.is-disabled .el-input__inner {
          color: #000;
          cursor: default;
        }
      }
    }
  }
  .button {
    .el-button {
      border-radius: 15px;
      width: 200px;
      height: 50px;
      margin-bottom: 10px;
      margin-top: 10px;
    }
  }
}
</style>