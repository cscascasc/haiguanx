<template>
  <div class="container">
    <div class="top-container">
      <div class="back">
        <el-button @click="topath" type="primary"> 返回 </el-button>
      </div>
      <div class="title">资产新增</div>
    </div>
    <div class="form-container">
      <el-form :model="formList" ref="formList" inline>
        <div class="solt">资产信息:</div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              label="单位："
              prop="danweiValue"
              :rules="{
                required: false,
                message: '请选择单位',
              }"
            >
              <el-select v-model="formList.danweiValue" @change="custom">
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
              prop="objectName"
              :rules="{
                required: true,
                message: '请输入资产名称',
              }"
            >
              <el-input v-model="formList.objectName"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              label="规格型号："
              prop="objectXinhao"
              :rules="{
                required: false,
                message: '请输入规格型号',
              }"
            >
              <el-input v-model="formList.objectXinhao"></el-input>
            </el-form-item>
            <el-form-item
              label="单价："
              prop="objectMoney"
              :rules="{
                required: false,
                message: '请输入单价',
              }"
            >
              <el-input v-model="formList.objectMoney"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              label="资产来源："
              prop="objectFromValue"
              :rules="{
                required: false,
                message: '请选择资产来源',
              }"
            >
              <el-select v-model="formList.objectFromValue">
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
              prop="objectData"
              :rules="{
                required: false,
                message: '请选择取得日期',
              }"
            >
              <el-date-picker
                v-model="formList.objectData"
                type="date"
                datetime
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy/MM/dd"
              ></el-date-picker>
            </el-form-item>
          </div>
        </div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              label="使用年限："
              prop="objectYears"
              :rules="{
                required: false,
                message: '请输入使用年限',
              }"
              ><el-input v-model="formList.objectYears"></el-input
            ></el-form-item>
            <el-form-item
              label="卡片号："
              prop="objectCard"
              :rules="{
                required: false,
                message: '请输入卡片号',
              }"
            >
              <el-input v-model="formList.objectCard"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              label="管理部门："
              prop="userNameValue"
              :rules="{
                required: false,
                message: '请输入使用部门',
              }"
            >
              <el-select v-model="formList.userNameValue">
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
              prop="objectNumber"
              :rules="{
                required: false,
                message: '请输入发票号与援单号',
              }"
            >
              <el-input v-model="formList.objectNumber"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              label="品牌"
              prop="objectBorder"
              :rules="{
                required: false,
                message: '清输入入品牌',
              }"
              ><el-input v-model="formList.objectBorder"></el-input
            ></el-form-item>
            <el-form-item
              label="标注存放地点："
              prop="roomadressValue"
              :rules="{
                required: true,
                message: '请输入存放地点',
              }"
            >
              <div>
                <el-select v-model="formList.adressValue" @change="selectRoom">
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
                <el-select v-model="formList.roomadressValue">
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
            prop="beizhu"
            :rules="{
              required: true,
              message: '请输入备注',
            }"
          >
            <el-input
              v-model="formList.beizhu"
              type="textarea"
              show-word-limit
              maxlength="300"
              :autosize="{
                minRows: 2,
              }"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="button">
      <el-button type="primary" @click="handlerup('formList')">提交</el-button>
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
import { addAsset } from "@/api/house/getAsset";
export default {
  data() {
    return {
      dialogVisible: false,
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
            value: "0",
          },
          {
            label: "采购",
            value: "1",
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
      form:{
        size: 100,
        current: 1,
        status: 1,
      }
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
          console.log(res)
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
      const house = this.option.roomNumForm.filter((item) => item.id === value);
      console.log(house);
      this.option.roomForm = house[0].houseDetails.roomAreaList;
      console.log(this.option.roomForm);
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
    //提交
    handlerload() {
      const nitID = this.formList.danweiValue;
      const assetName = this.formList.objectName;
      const specificationType = this.formList.objectXinhao;
      const unitPrice = this.formList.objectMoney;
      const sourceCode = this.formList.objectFromValue;
      const acquisitionDate = this.formList.objectData;
      const usefulLife = this.formList.objectYears;
      const cardNum = this.formList.objectCard;
      const userDeptID = this.formList.userNameValue;
      const invoiceNum = this.formList.objectNumber;
      const brand = this.formList.objectBorder;
      const storePositionId = this.formList.adressValue;
      const roomNum = this.formList.roomadressValue;
      const notes = this.formList.beizhu;

      addAsset(
        nitID,
        assetName,
        specificationType,
        unitPrice,
        sourceCode,
        acquisitionDate,
        usefulLife,
        cardNum,
        userDeptID,
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
  },
  mounted() {
    this.deptlist();
    this.houselist();
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