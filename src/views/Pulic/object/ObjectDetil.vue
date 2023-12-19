<template>
  <div class="container">
    <div class="top-container">
      <div class="back">
        <el-button @click="topath" type="primary"> 返回 </el-button>
      </div>
      <div class="title">{{ type === "detile" ? "资产详情" : "资产编辑" }}</div>
    </div>
    <div class="form-container">
      <el-form
        :model="AssetAll"
        ref="AssetAll"
        inline
        v-if="!!AssetAll"
        :disabled="type === 'detile' ? true : false"
      >
        <div class="solt">资产信息:</div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              label="单位："
              prop="unit"
              :rules="{
                required: true,
                message: '请选择单位',
              }"
            >
              <el-select
                v-model="AssetAll.unit"
                @change="custom"
                :placeholder="AssetAll.unit"
              >
                <el-option
                  v-for="item in option.unitFrom"
                  :key="item.id"
                  :label="item.customsName"
                  :value="item.id"
                >
                  {{ item.customsName }}
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="资产名称："
              prop="assetName"
              :rules="{
                required: true,
                message: '请输入资产名称',
              }"
            >
              <el-input
                v-model="AssetAll.assetName"
                :placeholder="AssetAll.assetName"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              label="规格型号："
              prop="specificationType"
              :rules="{
                required: true,
                message: '请输入规格型号',
              }"
            >
              <el-input
                v-model="AssetAll.specificationType"
                :placeholder="AssetAll.specificationType"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="单价："
              prop="unitPrice"
              :rules="{
                required: false,
                message: '请输入单价',
              }"
            >
              <el-input
                v-model="AssetAll.unitPrice"
                :placeholder="AssetAll.unitPrice"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              label="资产来源："
              prop="sourceCode"
              :rules="{
                required: false,
                message: '请选择资产来源',
              }"
            >
              <el-select v-model="AssetAll.sourceCode" >
                <el-option
                  v-for="item in option.objectFrom"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="取得日期"
              prop="acquisitionDate"
              :rules="{
                required: false,
                message: '请选择取得日期',
              }"
            >
              <el-date-picker
                v-model="AssetAll.acquisitionDate"
                type="date"
                datetime
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy/MM/dd"
                :placeholder="AssetAll.acquisitionDate"
              ></el-date-picker>
            </el-form-item>
          </div>
        </div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              label="使用年限："
              prop="usefulLife"
              :rules="{
                required: false,
                message: '请输入使用年限',
              }"
              ><el-input
                v-model="AssetAll.usefulLife"
                :placeholder="AssetAll.usefulLife"
              ></el-input
            ></el-form-item>
            <el-form-item
              label="卡片号："
              prop="cardNum"
              :rules="{
                required: false,
                message: '请输入卡片号',
              }"
            >
              <el-input
                v-model="AssetAll.cardNum"
                :placeholder="AssetAll.cardNum"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              label="管理部门："
              prop="userDept"
              :rules="{
                required: false,
                message: '请输入使用部门',
              }"
            >
              <el-select
                v-model="AssetAll.userDept"
                :placeholder="AssetAll.userDept"
              >
                <el-option
                  v-for="item in option.detpcustoms"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                >
                  {{ item.name }}</el-option
                >
              </el-select></el-form-item
            >
            <el-form-item
              label="发票号与调援单号："
              prop="invoiceNum"
              :rules="{
                required: false,
                message: '请输入发票号与援单号',
              }"
            >
              <el-input
                v-model="AssetAll.invoiceNum"
                :placeholder="AssetAll.invoiceNum"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              label="品牌"
              prop="brand"
              :rules="{
                required: false,
                message: '清输入入品牌',
              }"
              ><el-input
                v-model="AssetAll.brand"
                :placeholder="AssetAll.brand"
              ></el-input
            ></el-form-item>
            <el-form-item
              label="标注存放地点："
              prop="roomNum"
              :rules="{
                required: true,
                message: '请输入存放地点',
              }"
            >
              <div>
                <el-select
                  v-model="storePositionId"
                  @change="selectRoom"
                  :placeholder="
                    AssetAll.house.cityName +
                    AssetAll.house.regionName +
                    AssetAll.house.communityName +
                    AssetAll.house.houseEstate +
                    AssetAll.house.unit
                  "
                >
                  <el-option
                    v-for="item in option.roomNumForm"
                    :key="item.id"
                    :label="
                      item.cityName +
                      item.regionName +
                      item.communityName +
                      item.houseEstate +
                      item.unit
                    "
                    :value="item.id"
                  >
                    {{
                      item.cityName +
                      item.regionName +
                      item.communityName +
                      item.houseEstate +
                      item.unit
                    }}</el-option
                  >
                </el-select>
                <el-select
                  v-model="AssetAll.roomNum"
                  :placeholder="AssetAll.roomNum + '室'"
                >
                  <el-option
                    v-for="(item, index) in option.roomForm"
                    :key="index"
                    :label="index + 1 + '室' + item + '㎡'"
                    :value="index + 1"
                  >
                    {{ index + 1 + "室" + item + "㎡" }}
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
          </div>
        </div>
        <div class="solt">备注:</div>
        <div class="form">
          <el-form-item
            prop="notes"
            :rules="{
              required: true,
              message: '请输入备注',
            }"
          >
            <el-input
              v-model="AssetAll.notes"
              type="textarea"
              show-word-limit
              maxlength="300"
              :autosize="{
                minRows: 2,
              }"
              :placeholder="AssetAll.notes"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="button">
      <el-button
        type="primary"
        @click="handlerup('AssetAll')"
        v-if="type === 'detile' ? false : true"
        >提交</el-button
      >
    </div>
    <el-dialog
      title="确认提交"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <span slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handlerload">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getHouseList } from "@/api/house/gethouselist";
import { getdept, getdeptcustoms } from "@/api/dept/getdept";
import { AssetListDetile, editAsset } from "@/api/house/getAsset";
export default {
  data() {
    return {
      dialogVisible: false,
      id: "",
      type: "",
      formList: {
        danweiValue: "",
        danweiList: {},
        userNameList: {},
        objectFromList: {},
        adressList: {},
        roomadressList: {},
        objectName: "",
        objectXinhao: "",
        objectMoney: "",
        objectFromValue: "",
        objectData: "",
        objectYears: "",
        objectCard: "",
        userNameValue: "",
        objectNumber: "",
        objectBorder: "",
        adressValue: "",
        roomadressValue: "",
        beizhu: "",
      },
      option: {
        objectFrom: [
          {
            label: "建购",
            value: 0,
          },
          {
            label: "采购",
            value: 1,
          },
        ], //资产来源
        //单位
        unitFrom: [],
        //部门
        detpcustoms: [],
        //使用地点
        roomNumForm: [],
        //使用房间
        roomForm: [],
      },
      AssetAll: {},
      form: {},
      storePositionId: "",
    };
  },
  methods: {
    topath() {
      this.$router.back();
    },
    handlerup(forName) {
      this.$refs[forName].validate((vaild) => {
        if (vaild) {
          this.dialogVisible = true;
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    //获取住房
    houselist() {
      getHouseList(this.form)
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.option.roomNumForm.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //获取海关
    deptlist() {
      getdept()
        .then((res) => {
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
    //关联房间
    selectRoom(value) {
      this.AssetAll.storePositionId = value;
      const house = this.option.roomNumForm.filter((item) => item.id === value);
      this.option.roomForm = house[0].houseDetails.roomAreaList;
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
          console.log(this.option.detpcustoms, "111");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //提交编辑
    handlerload() {
      const id = this.AssetAll.id;
      const assetName = this.AssetAll.assetName;
      const specificationType = this.AssetAll.specificationType;
      const unitPrice = this.AssetAll.unitPrice;
      const sourceCode = this.AssetAll.sourceCode;
      const acquisitionDate = this.AssetAll.acquisitionDate;
      const usefulLife = this.AssetAll.usefulLife;
      const cardNum = this.AssetAll.cardNum;
      const invoiceNum = this.AssetAll.invoiceNum;
      const brand = this.AssetAll.brand;
      const storePositionId = this.AssetAll.storePositionId;
      const roomNum = this.AssetAll.roomNum;
      const notes = this.AssetAll.notes;
      editAsset(
        id,
        assetName,
        specificationType,
        unitPrice,
        sourceCode,
        acquisitionDate,
        usefulLife,
        cardNum,
        invoiceNum,
        brand,
        storePositionId,
        roomNum,
        notes
      )
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
    //获取资产详情
    getAsset() {
      AssetListDetile(this.id)
        .then((res) => {
          this.AssetAll = res.data;
          console.log(this.AssetAll);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    this.type = this.$route.query.type;
    this.id = this.$route.query.id;
  },
  mounted() {
    this.houselist();
    this.deptlist();
    this.getAsset();
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
    width: 1300px;
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
      width: calc(100% - 200px);
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
    width: 1300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .solt {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .el-form {
      margin-top: 10px;
      ::v-deep .el-form-item__label {
        width: 200px;
        text-align: left;
        font-size: 16px;
        color: #000;
      }
      ::v-deep .el-textarea__inner::placeholder {
        color: #000;
      }
      ::v-deep .el-input__inner::placeholder {
        color: #000;
      }
      ::v-deep .el-input.is-disabled .el-input__inner {
        color: #000;
      }
      ::v-deep .el-textarea.is-disabled .el-textarea__inner {
        color: #000;
      }
      .form {
        width: 100%;
        .el-form-item {
          width: 1200px;

          ::v-deep .el-textarea {
            width: 1200px;
          }
        }
        .formitem {
          display: flex;
          padding: 0 20px 0 20px;
          width: 1200px;
          justify-content: space-between;
          .el-form-item {
            display: flex;
            width: 570px;
            align-items: flex-start;
            justify-content: space-between;
            .el-input,
            .el-select,
            .el-date-picker {
              width: 430px;
            }
          }
          .selectgourp {
            display: flex;
            span {
              margin-right: 5px;
            }
          }
          .el-select {
            width: 300px;
          }
          .el-input {
            width: 300px;
            margin-left: 10px;
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