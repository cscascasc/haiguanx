<template>
  <div class="container">
    <div class="top-container">
      <div class="back">
        <el-button @click="topath" type="primary"> 返回 </el-button>
      </div>
      <div class="title">新增资讯</div>
    </div>
    <div class="form-container">
      <el-form :model="data" ref="data">
        <div class="form">
          <div class="formitem">
            <el-form-item
              label="标题"
              prop="title"
              :rules="[
                {
                  required: true,
                  message: '请输入标题',
                },
              ]"
            >
              <el-input v-model="data.title" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="业务领域" prop="businessAreaCode">
              <el-select v-model="data.businessAreaCode" filterable>
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
          </div>
          <!-- <div class="formitem">
            <el-form-item
              label="涉及部门"
              prop="responsibleDeptList"
              :rules="[
                {
                  required: true,
                  message: '请选择涉及部门',
                },
              ]"
            >
              <el-cascader
                v-model="data.responsibleDeptList"
                :options="deptList"
                :props="props"
                placeholder="部门"
                filterable
                @change="deptchange"
              >
              </el-cascader>
            </el-form-item>
          </div> -->
          <div class="word">
            <div class="wang">
              <el-form-item label="内容："> </el-form-item>
              <wang-edior :propdata="data.content" @custom-event="getdata" />
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <div class="button">
      <el-button type="primary" @click="open('data')">提交</el-button>
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
import { addNew } from "@/api/data/news/getnews";
import { getAlldept } from "@/api/dept/getdept";
import { getbusinessAear } from "@/api/dict/getdict";
import WangEdior from "@/components/WangEdior.vue";
export default {
  components: { WangEdior },
  data() {
    return {
      data: {
        title: "",
        content: "",
        userName: this.$store.state.userinfo.userName,
        involveDeptIdList: [],
        businessAreaCode: "",
        type: this.$route.query.type,
      },
      centerDialogVisible: false,
      props: {
        label: "name",
        children: "children",
        value: "id",
        multiple: true,
        checkStrictly: true,
      },
      businessArea: [],
      deptList: [],
    };
  },
  comments: {
    WangEdior,
  },
  methods: {
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
    submit() {
      console.log(this.data);
      addNew(this.data)
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
      getAlldept()
        .then((res) => {
          this.deptList.push(res.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getdata(value) {
      this.data.content = value;
    },
    //获取部门ID
    deptchange(value) {
      const list = value;
      console.log(value);
      const length = list.length;
      this.data.involveDeptIdList = [];
      for (var i = 0; i < length; i++) {
        this.data.involveDeptIdList.push(list[i].slice(-1)[0]);
      }
      console.log(this.data.involveDeptIdList);
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
      width: 200px;
      height: 50px;
      margin-bottom: 10px;
      margin-top: 10px;
    }
  }
}
</style>