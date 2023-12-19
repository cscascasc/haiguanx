<template>
  <div class="container">
    <div class="top-container">
      <div class="back">
        <el-button @click="topath" type="primary"> 返回 </el-button>
      </div>
      <div class="title">新增内控</div>
    </div>
    <div class="form-container">
      <el-form :model="data" ref="data">
        <div class="form">
          <div class="formitem">
            <el-form-item label="节点序号：">
              <el-input v-model="data.nodeNum"></el-input>
            </el-form-item>
            <el-form-item
              label="节点名称："
              prop="nodeName"
              :rules="{
                required: true,
                message: '请输入节点名称',
              }"
            >
              <el-input v-model="data.nodeName"></el-input>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item
              label="节点级别："
              prop="nodeLevelCode"
              :rules="{
                required: true,
                message: '请选择节点级别',
              }"
            >
              <el-select v-model="data.nodeLevelCode">
                <el-option
                  v-for="item in nodelevel"
                  :key="item.dictValue"
                  :value="item.dictValue"
                  :label="item.dictLabel"
                >
                  {{ item.dictLabel }}
                </el-option></el-select
              >
            </el-form-item>
            <el-form-item label="制度要求：">
              <el-input v-model="data.nodeExplain"></el-input>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item label="制度依据：">
              <el-input v-model="data.nodeOrigin"></el-input>
            </el-form-item>
            <el-form-item label="风险点来源：">
              <el-input v-model="data.riskWarn"></el-input>
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
                </el-option></el-select
              >
            </el-form-item>
            <el-form-item
              label="业务类别："
              prop="businessSubcategoriesCode"
              :rules="{
                required: true,
                message: '请选择业务类别',
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
                </el-option></el-select
              >
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item label="控制要求及控制方法：">
              <el-input v-model="data.businessLink"></el-input>
            </el-form-item>
            <el-form-item
              label="日常排查风险点提示："
              prop="monitorTypeCode"
              :rules="{
                required: true,
                message: '日常排查风险点提示',
              }"
            >
              <el-input v-model="data.monitorTypeCode"> </el-input>
            </el-form-item>
          </div>
          <div v-if="step == '1'">
            <div class="formitem">
              <el-form-item label="岗位名称">
                <el-input v-model="data.businessExecutionPositions"></el-input>
              </el-form-item>
              <el-form-item label="实现方法">
                <el-input v-model="data.implementInformatization"></el-input>
              </el-form-item>
            </div>
          </div>
          <div v-if="step == '2'">
            <div class="formitem">
              <el-form-item label="岗位名称">
                <el-input v-model="data.businessExecutionPositions"></el-input>
              </el-form-item>
              <!-- <el-form-item label="监控执行周期">
                <el-date-picker
                  v-model="data.monitorImplementCycle"
                  value-format="yyyy/MM/dd"
                  format="yyyy/MM/dd"
                ></el-date-picker>
              </el-form-item> -->
            </div>
            <div class="formitem">
              <el-form-item label="实现方法">
                <el-input v-model="data.implementInformatization"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="formitem">
            <el-form-item label="关联问题：">
              <div class="box">
                <div class="selectbox">
                  <el-select
                    v-model="form.businessArea"
                    @change="problem"
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
                    v-model="form.businessSubcategories"
                    @change="problem"
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
                </div>
                <el-select
                  v-model="data.problemBaseIdList"
                  multiple
                  clearable
                  filterable
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
import {
  getmonitortype,
  getbusinessType,
  getbusinessAear,
  getnodelevel,
} from "@/api/dict/getdict";
import { inareaproblem } from "@/api/data/wenti/getWenti";
import { addinarea } from "@/api/data/neikong/getneikong";
export default {
  data() {
    return {
      step: "",
      centerDialogVisible: false,
      data: {
        type: this.$route.query.step,
        nodeNum: "",
        nodeName: "",
        nodeLevelCode: "",
        nodeExplain: "",
        nodeOrigin: "",
        riskWarn: "",
        businessAreaCode: "",
        businessSubcategoriesCode: "",
        businessLink: "",
        monitorTypeCode: "",
        businessExecutionPositions: [],
        monitorImplementCycle: "",
        implementInformatization: "",
        problemBaseIdList: [],
      },
      form: {
        businessArea: "",
        businessSubcategories: "",
      },
      levelone: null,
      leveltwo: null,
      businessArea: [],
      nodelevel: [],
      businessSubcategories: [],
      monitortype: [],
      problemlist: [],
    };
  },
  created() {
    this.step = this.$route.query.step;
  },
  methods: {
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
    //返回
    topath() {
      this.$router.back();
    },
    //关联问题
    problem(value) {
      if (value) {
        this.problemlist = [];
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
    //新增
    submit() {
      if (!(this.data.businessExecutionPositions instanceof Array)) {
        this.data.businessExecutionPositions = [
          this.data.businessExecutionPositions,
        ];
      }
      addinarea(this.data)
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