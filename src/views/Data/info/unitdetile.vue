<template>
  <div class="container">
    <div class="top-container">
      <div class="back">
        <el-button @click="topath" type="primary"> 返回 </el-button>
      </div>
      <div class="title">
        {{ type === "detile" ? "单位详情" : "单位编辑" }}
      </div>
    </div>
    <div class="form-container">
      <el-form
        :model="data"
        ref="data"
        :disabled="type === 'detile' ? true : false"
      >
        <div class="form">
          <div class="solt">单位基本情况</div>
          <div class="formitem">
            <el-form-item label="单位">
              <el-select v-model="data.dept.name">
                <el-option
                  v-for="item in customs"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                  @change="deptid"
                >
                  {{ item.name }}
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="formarea">
            <el-form-item label="单位简介">
              <el-input
                v-model="data.unitIntroduce"
                type="textarea"
                :autosize="{ minRows: 5 }"
                show-word-limit
                maxlength="500"
              ></el-input>
            </el-form-item>
          </div>
          <div class="solt">事业编情况</div>
          <div class="formitem">
            <el-form-item label="在编关员人数">
              <el-input
                type="number"
                v-model="data.institutionalPosition"
              ></el-input>
            </el-form-item>
            <el-form-item label="协勤人员人数">
              <el-input
                type="number"
                v-model="data.nonInstitutionalPosition"
              ></el-input>
            </el-form-item>
          </div>
          <div class="formarea">
            <el-form-item label="备注">
              <el-input
                v-model="data.notes"
                type="textarea"
                show-word-limit
                :autosize="{ minRows: 5 }"
                maxlength="300"
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <div class="button" v-if="type === 'detile' ? false : true">
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
import { detileunit, editunit } from "@/api/data/news/getnews";
import { getdept } from "@/api/dept/getdept";
export default {
  data() {
    return {
      centerDialogVisible: false,
      data: {},
      dataname: "",
      id: this.$route.query.id,
      type: this.$route.query.type,
      customs: [],
    };
  },
  methods: {
    getoption() {
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
    },
    //获取详细
    getinfo() {
      detileunit(this.id)
        .then((res) => {
          this.data = res.data;
          this.dataname = data.dept.name;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    topath() {
      this.$router.back();
    },
    open(forName) {
      this.$refs[forName].validate((valid) => {
        if (valid) {
          this.centerDialogVisible = true;
        } else {
          return false;
        }
      });
    },
    deptid(value) {
      this.data.dept.id = value;
    },
    submit() {
      editunit(this.data)
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
    this.getinfo();
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
      .solt {
        text-align: left;
        font-size: 20px;
        font-weight: 600;
        margin-top: 20px;
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
            ::v-deep .el-input.is-disabled .el-input__inner {
              font-size: 16px;
              width: 430px;
              text-align: left;
              color: #000;
            }

            ::v-deep .el-cascader .el-input .el-input__inner {
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
            ::v-deep .el-textarea.is-disabled .el-textarea__inner {
              font-size: 16px;
              width: 1010px;
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
          .wang {
            ::v-deep .el-form-item__label {
              text-align: left;
              width: 200px;
              float: left;
              margin-left: 20px;
              font-size: 16px;
              color: #000;
            }
          }
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