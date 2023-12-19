<template>
  <div class="container">
    <div class="top-container">
      <div class="back">
        <el-button @click="topath" type="primary"> 返回 </el-button>
      </div>
      <div class="title">
        {{ type === "detile" ? "内控详情" : "内控编辑" }}
      </div>
    </div>
    <div class="form-container">
      <el-form :disabled="type === 'detile'">
        <div class="form">
          <div class="formitem">
            <el-form-item label="节点序号：">
              <el-input v-model="data.nodeNum"> </el-input>
            </el-form-item>
            <el-form-item label="节点名称：">
              <el-input v-model="data.nodeName"></el-input>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item label="节点级别：">
              <!-- <el-input v-model="data.nodeLevel"></el-input> -->
              <el-select
                v-model="nodecode"
                :placeholder="data.nodeLevel"
                @change="changenode"
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
            <el-form-item label="业务领域：">
              <el-select
                v-model="businessAreaCode"
                :placeholder="data.businessArea"
                clearable
                filterable
              >
                <el-option
                  v-for="item in BusinessArea"
                  :key="item.dictLabel"
                  :value="item.dictValue"
                  :label="item.dictLabel"
                >
                  {{ item.dictLabel }}
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="业务类别：">
              <el-select
                v-model="data.businessSubcategories"
                clearable
                filterable
              >
                <el-option
                  v-for="item in BusinessSubcategories"
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
            <el-form-item label="控制要求及控制方法：">
              <el-input v-model="data.businessLink"> </el-input>
            </el-form-item>
            <el-form-item label="日常排查风险点提示：">
              <el-input v-model="data.monitorTypeCode"> </el-input>
            </el-form-item>
          </div>
          <div v-if="step == '1'">
            <div class="formitem">
              <el-form-item label="岗位名称">
                <el-input
                  v-model="valueone"
                  :placeholder="data.businessExecutionPositions"
                ></el-input>
              </el-form-item>
            </div>
            <div class="formitem">
              <!-- <el-form-item label="监控实施周期">
                <el-date-picker
                  v-model="data.monitorImplementCycle"
                  value-format="yyyy/MM/dd"
                  format="yyyy/MM/dd"
                ></el-date-picker>
              </el-form-item> -->
              <el-form-item label="实现方式：">
                <el-input v-model="data.implementInformatization"></el-input>
              </el-form-item>
            </div>
          </div>
          <div v-if="step == '2'">
            <div class="formitem">
              <el-form-item label="岗位名称">
                <el-input
                  v-model="valueone"
                  :placeholder="data.businessExecutionPositions"
                ></el-input>
              </el-form-item>
              <!-- <el-form-item label="监控实施周期">
                <el-date-picker
                  v-model="data.monitorImplementCycle"
                  value-format="yyyy/MM/dd"
                  format="yyyy/MM/dd"
                ></el-date-picker>
              </el-form-item> -->
            </div>
            <div class="formitem">
              <el-form-item label="实现方式：">
                <el-input v-model="data.implementInformatization"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="formitem">
            <el-form-item label="关联问题：">
              <div class="box">
                <div class="selectbox">
                  <el-select
                    v-model="form.businessAreaCode"
                    @change="problem"
                    :placeholder="data.businessArea"
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in BusinessArea"
                      :key="item.dictLabel"
                      :value="item.dictValue"
                      :label="item.dictLabel"
                    >
                      {{ item.dictLabel }}
                    </el-option>
                  </el-select>
                  <el-select
                    clearable
                    filterable
                    v-model="form.businessSubcategoriesCode"
                    @change="problem"
                    :placeholder="data.businessSubcategories"
                  >
                    <el-option
                      v-for="item in BusinessSubcategories"
                      :key="item.dictLabel"
                      :value="item.dictValue"
                      :label="item.dictLabel"
                    >
                      {{ item.dictLabel }}
                    </el-option>
                  </el-select>
                </div>
                <el-select
                  v-model="form.problemBaseId"
                  :placeholder="
                    data.problemBase.length !== 0
                      ? data.problemBase[0].problemDescription
                      : '暂无数据'
                  "
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
                  ></el-select
                >
              </div></el-form-item
            >
          </div>
          <div
            class="table"
            :style="{
              width: '100%',
            }"
            v-if="data.problemBase.length !== 0"
          >
            <div
              class="title"
              :style="{
                textAlign: 'left',
                width: '100%',
                marginLeft: '20px',
              }"
            >
              关联问题列表
            </div>
            <el-table
              :data="data.problemBase"
              border
              :style="{
                width: '80%',
                marginLeft: '20px',
              }"
              max-height="400"
            >
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="name" label="项目名称"></el-table-column>
              <el-table-column
                prop="problemDescription"
                label="问题简述"
              ></el-table-column>
              <el-table-column prop="" label="问题详情">
                <div
                  slot-scope="scope"
                  :style="{
                    height: '80px',
                    overflowY: 'scroll',
                  }"
                >
                  {{ scope.row.detailedDescription }}
                </div>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-form>
    </div>
    <div class="button">
      <el-button
        type="success"
        v-if="type !== 'detile' && type !== 'rect'"
        @click="open('formList')"
      >
        提交
      </el-button>
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
        <el-button type="primary" @click="submit" v-if="type !== 'rect'"
          >确 定</el-button
        >
        <el-button type="primary" @click="Rect" v-if="type === 'rect'"
          >确 定</el-button
        >
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
import { getinareadetile, editinarea } from "@/api/data/neikong/getneikong";
export default {
  data() {
    return {
      step: "",
      type: "",
      centerDialogVisible: false,
      id: "",
      data: {},
      BusinessArea: [],
      BusinessSubcategories: [],
      monitortype: [],
      problemlist: [],
      form: {
        businessAreaCode: null,
        businessSubcategoriesCode: null,
        problemBaseId: null,
      },
      valueone: null,
      valuetwo: null,
      businessAreaCode: null,
      levelone: "",
      leveltwo: "",
      nodelevel: [],
      nodecode: "",
    };
  },
  created() {
    this.type = this.$route.query.type;
    this.id = this.$route.query.id;
    this.step = this.$route.query.step;
  },
  methods: {
    //返回
    topath() {
      this.$router.back();
    },
    //获取选项
    getoption() {
      getbusinessAear()
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.BusinessArea.push(list[i]);
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
            this.BusinessSubcategories.push(list[i]);
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
      const form = [];
      form.push({
        businessAreaCode: this.data.businessAreaCode,
        businessSubcategoriesCode: this.data.businessSubcategoriesCode,
      });
      inareaproblem(form)
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
    //获取数据
    getdata() {
      getinareadetile(this.id)
        .then((res) => {
          this.data = res.data;
          if (!!this.data.problemBase) {
            this.businessArea = res.data.problemBase.businessAreaCode;
            this.businessSubcategories =
              res.data.problemBase.businessSubcategoriesCode;
          }
          console.log(!!this.data.problemBase);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //选择关联
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
    open() {
      this.centerDialogVisible = true;
    },
    monichange(value) {
      this.data.monitorTypeCode = value;
    },
    //编辑
    submit() {
      if (this.valueone !== null) {
        this.data.businessExecutionPositions[0] = this.valueone;
      }
      if (this.valuetwo !== null) {
        this.data.businessExecutionPositions[1] = this.valuetwo;
      }
      if (this.businessAreaCode !== null) {
        this.data.businessAreaCode = this.businessAreaCode;
      }
      if (this.form.problemBaseId !== null) {
        this.data.problemBaseId = this.form.problemBaseId;
      }
      editinarea(this.data)
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
    changenode(value) {
      this.data.nodeLevelCode = value;
    },
  },
  mounted() {
    this.getdata();
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
        ::v-deep .el-input.is-disabled .el-input__inner {
          color: #000;
        }
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
            ::v-deep .el-input__inner::placeholder {
              color: #606266;
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