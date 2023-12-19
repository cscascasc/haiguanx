<template>
  <div class="container">
    <div class="top-container">
      <div class="back">
        <el-button @click="topath" type="primary"> 返回 </el-button>
      </div>
      <div class="title">新增规章制度</div>
    </div>
    <div class="form-container">
      <el-form :model="data" inline>
        <div class="form">
          <div class="formitem">
            <el-form-item label="规章制度标题：">
              <el-input v-model="data.title" placeholder="请输入"> </el-input>
            </el-form-item>
            <el-form-item label="业务领域">
              <el-select v-model="data.businessAreaCode" filterable clearable>
                <el-option
                  v-for="item in businessArea"
                  :key="item.dictLabel"
                  :value="item.dictValue"
                  :label="item.dictLabel"
                >
                  {{ item.dictLabel }}
                </el-option></el-select
              >
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item label="生效时间：">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="data.timeTakeEffect"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="业务小类">
              <el-select
                v-model="data.businessSubcategoriesCode"
                filterable
                clearable
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
            <el-form-item label="关联问题：">
              <div class="box">
                <div class="selectbox">
                  <el-select
                    v-model="form.businessArea"
                    @change="problem"
                    filterable
                    clearable
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
                    v-model="form.businessSubcategories"
                    @change="problem"
                    filterable
                    clearable
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
                </div>
                <el-select
                  v-model="data.problemBaseId"
                  multiple
                  filterable
                  clearable
                >
                  <el-option
                    v-for="item in problemlist"
                    :key="item.id"
                    :value="item.id"
                    :label="item.problemDescription"
                  >
                    {{ item.problemDescription }}</el-option
                  >
                </el-select>
              </div></el-form-item
            >
          </div>
          <div class="formupload">
            <el-form-item label="附件：">
              <div class="box">
                <div>
                  <el-upload
                    :http-request="handleimgup"
                    multiple
                    list-type="picture-card"
                  >
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <em>请上传PDF、WORD、JPG文件</em>
                </div>
              </div>
            </el-form-item>
          </div>
          <div class="word">
            <div class="wang">
              <wang-edior :propdata="data.notes" @custom-event="getdata" />
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <div class="button">
      <el-button type="primary" @click="open">提交</el-button>
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
import { addRule } from "@/api/data/rule/getrule";
import { getbusinessAear, getbusinessType } from "@/api/dict/getdict";
import { inareaproblem } from "@/api/data/wenti/getWenti";
import WangEdior from "../../../components/WangEdior.vue";

import http from "@/utils/request";
export default {
  components: { WangEdior },
  data() {
    return {
      centerDialogVisible: false,
      data: {
        title: "",
        businessAreaCode: "",
        businessSubcategoriesCode: "",
        annex: "",
        notes: "",
        userName: this.$store.state.userinfo.userName,
        problemBaseId: [],
        timeTakeEffect: "",
      },
      form: {
        businessArea: "",
        businessSubcategories: "",
      },
      businessArea: [],
      problemlist: [],
      businessSubcategories: [],
      url: [],
    };
  },
  comments: {
    WangEdior,
  },
  methods: {
    topath() {
      this.$router.back();
    },
    getdata(value) {
      this.data.notes = value;
    },
    open() {
      this.centerDialogVisible = true;
    },
    //上传
    submit() {
      addRule(this.data)
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
          console.log(error);
        });
    },
    //关联问题
    problem(value) {
      console.log("1");
      this.problemlist = [];
      if(value){
        inareaproblem(this.form)
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.problemlist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      }
      
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
          console.log(this.data.annex);
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
      .form {
        margin-top: 10px;
        padding: 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        .formitem,
        .formarea,
        .formupload {
          display: flex;
          padding: 0 20px 0 20px;
          width: 1200px;
          margin-top: 10px;
          justify-content: space-between;
          .el-form-item {
            display: flex;
            margin-bottom: 10px;
            width: 570px;
            align-items: flex-start;
            justify-content: space-between;
            .el-table {
              width: 570px;
            }
            ::v-deep .el-form-item__label {
              font-size: 16px;
              width: 200px;
              text-align: left;
              color: #000;
            }
            .el-input,
            .el-select,
            .el-date-picker {
              width: 430px;
            }
          }
          .box {
            .selectbox {
              display: flex;
              justify-content: space-between;
              width: 430px;
              margin-bottom: 10px;
              .el-select {
                width: 200px;
              }
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
            ::v-deep .el-form--inline .el-form-item__label {
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
        .formupload {
          .box {
            width: 430px;
            display: flex;
            justify-content: flex-start;
          }
        }
        .word {
          margin-bottom: 10px;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
  .button {
    .el-button {
      width: 200px;
      height: 50px;
      margin-bottom: 10px;
      margin-top: 10px;
    }
  }
}
</style>