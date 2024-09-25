<template>
  <div class="container">
    <div class="top-container">
      <div class="back">
        <el-button @click="topath" type="primary"> 返回 </el-button>
      </div>
      <div class="title">住房新增</div>
    </div>
    <div class="form-container">
      <el-form :model="formList" ref="formList">
        <div class="solt">基本信息:</div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              label="市/州:"
              prop="cityValue"
              :rules="[
                {
                  required: true,
                  message: '请选择城市',
                },
              ]"
            >
              <el-select v-model="formList.cityValue" @change="changeCity">
                <el-option
                  v-for="item in formList.areaList"
                  :key="item.cityName"
                  :label="item.cityName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="区/县："
              prop="countyValue"
              :rules="[
                {
                  required: true,
                  message: '请选择区县',
                },
              ]"
            >
              <el-select v-model="formList.countyValue" @change="changeCounty">
                <el-option
                  v-for="item in formList.countyParams"
                  :key="item.countyName"
                  :label="item.countyName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              label=" 社区/街道："
              prop="twonValue"
              :rules="[
                {
                  required: true,
                  message: '请选择街道',
                },
              ]"
            >
              <el-input v-model="formList.address">
                <!-- <el-option
                  v-for="item in formList.townParams"
                  :key="item.townName"
                  :label="item.townName"
                  :value="item.id"
                ></el-option> -->
              </el-input>
            </el-form-item>
            <el-form-item
              label="小区名称："
              prop="streeName"
              :rules="[
                {
                  required: true,
                  message: '请输入小区名称',
                },
              ]"
            >
              <el-input
                placeholder="请输入"
                v-model="formList.streeName"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              label="楼栋/单元："
              prop="state"
              :rules="[
                {
                  required: true,
                  message: '请输入楼栋单元',
                },
              ]"
            >
              <el-input placeholder="请输入" v-model="formList.state">
              </el-input>
            </el-form-item>
            <el-form-item
              label="房号："
              prop="huoseName"
              :rules="[
                {
                  required: true,
                  message: '房号',
                },
              ]"
            >
              <el-input placeholder="请输入" v-model="formList.huoseName">
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              label="房屋面积："
              prop="houseState"
              :rules="[
                {
                  required: true,
                  message: '请输入房屋面积',
                },
              ]"
            >
              <el-input
                v-model="formList.houseState"
                type="number"
                placeholder="请输入数字"
              >
                <i slot="suffix" style="font-size: 24px">㎡</i>
              </el-input>
            </el-form-item>
            <el-form-item
              label="实际使用面积："
              prop="factState"
              :rules="[
                {
                  required: true,
                  message: '实际使用面积',
                },
              ]"
            >
              <el-input
                v-model="formList.factState"
                type="number"
                placeholder="请输入数字"
              >
                <i slot="suffix" style="font-size: 24px">㎡</i></el-input
              >
            </el-form-item>
          </div>
        </div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              label="公摊使用面积:"
              prop="pulicState"
              :rules="[
                {
                  required: true,
                  message: '请输入公摊面积',
                },
              ]"
            >
              <el-input
                v-model="formList.pulicState"
                placeholder="请输入"
                type="number"
              >
                <i slot="suffix" style="font-size: 24px">㎡</i></el-input
              >
            </el-form-item>
            <el-form-item
              label="房屋性质："
              prop="houseValue"
              :rules="[
                {
                  required: true,
                  message: '请输入房屋性质',
                },
              ]"
            >
              <el-select v-model="formList.houseValue">
                <el-option
                  v-for="item in formList.houseStyle"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option> </el-select
            ></el-form-item>
          </div>
        </div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              label="户型"
              prop="roomValue"
              :rules="[
                {
                  required: true,
                  message: '请输入户型',
                },
              ]"
            >
              <div class="selectgourp">
                <div class="select-item">
                  <el-select v-model="formList.roomValue" @change="changeRoom">
                    <el-option
                      v-for="item in formList.roomNum"
                      :key="item.num"
                      :label="item.num"
                      :value="item.num"
                    ></el-option
                  ></el-select>
                  <span>室</span>
                </div>
                <div class="select-item">
                  <el-select v-model="formList.livingValue">
                    <el-option
                      v-for="item in formList.livingNum"
                      :key="item.num"
                      :label="item.num"
                      :value="item.num"
                    ></el-option
                  ></el-select>
                  <span>厅</span>
                </div>
                <div class="select-item">
                  <el-select v-model="formList.washValue">
                    <el-option
                      v-for="item in formList.washNum"
                      :key="item.num"
                      :label="item.num"
                      :value="item.num"
                    ></el-option
                  ></el-select>
                  <span>卫</span>
                </div>
              </div>
            </el-form-item>
          </div>
        </div>
        <div class="solt" v-show="show">房间信息:</div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              v-for="item in formList.roomState"
              :key="item.key"
              :label="item.label"
              prop="roomState"
              :rules="[
                {
                  required: true,
                  message: '请输入房间面积',
                },
              ]"
            >
              <el-input
                v-model="item.value"
                type="number"
                placeholder="请输入数字"
              >
                <i slot="suffix" style="font-size: 24px">㎡</i>
              </el-input></el-form-item
            >
          </div>
        </div>
        <div class="solt">产权信息:</div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              label="产权人"
              prop="canquanman"
              :rules="[
                {
                  required: true,
                  message: '请输入产权人',
                },
              ]"
            >
              <el-input
                v-model="formList.canquanman"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="房产证："
              prop="fangchanzhen"
              :rules="[
                {
                  required: false,
                  message: '请输入房产证',
                },
              ]"
            >
              <el-input
                v-model="formList.fangchanzhen"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="solt">租金信息:</div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              label="租金计算周期："
              prop="payValue"
              :rules="[
                {
                  required: true,
                  message: '请选择租金计算周期',
                },
              ]"
            >
              <el-select v-model="formList.payValue" disabled>
                <el-option
                  v-for="item in formList.payNum"
                  :key="item.num"
                  :label="item.num"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="房屋租金"
              prop="houseMoney"
              :rules="[
                {
                  required: true,
                  message: '请输入房屋租金',
                },
              ]"
            >
              <el-input
                v-model="formList.houseMoney"
                type="number"
                placeholder="请输入数字"
              >
                <i slot="suffix" style="font-size: 24px">¥/㎡</i>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div class="solt">水电宽带号:</div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              label="水表号："
              prop="water"
              :rules="[
                {
                  required: false,
                  message: '请输入水表号',
                },
              ]"
            >
              <el-input
                v-model="formList.water"
                type="number"
                placeholder="请输入数字"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="电表号："
              prop="ele"
              :rules="[
                {
                  required: false,
                  message: '请输入电表号',
                },
              ]"
            >
              <el-input
                v-model="formList.ele"
                type="number"
                placeholder="请输入数字"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              label="宽带号："
              prop="intnet"
              :rules="[
                {
                  required: false,
                  message: '请输入宽带号',
                },
              ]"
            >
              <el-input
                v-model="formList.intnet"
                type="number"
                placeholder="请输入数字"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="solt">房屋图片:</div>
        <div class="form">
          <div class="formitem">
            <div class="imgload">
              <el-upload
                action="http"
                list-type="picture-card"
                accept=".jpg ,.png, .pfd, .svg"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :http-request="handleimgup"
                :on-change="handimgChange"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="formList.dialogVisible">
                <img width="100%" :src="formList.dialogImageUrl" alt="" />
              </el-dialog>
              <span>请上传jpg、.png、pfd、svg文件</span>
            </div>
          </div>
        </div>
        <div class="solt">备注:</div>
        <div class="form">
          <el-form-item label="备注：">
            <el-input
              style="width: 1200px"
              v-model="formList.beizhu"
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              maxlength="200"
              show-word-limit
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="button">
      <el-button type="success" @click="open('formList')"> 提交 </el-button>
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
import { getMaplist } from "@/api/map";
import { addHouse } from "@/api/house/post";
import { getdict } from "@/api/dict/getdict";
export default {
  data() {
    return {
      centerDialogVisible: false,
      formList: {
        areaList: [],
        countyParams: [],
        townParams: [],
        houseStyle: [],
        roomNum: [
          { num: "1" },
          { num: "2" },
          { num: "3" },
          { num: "4" },
          { num: "5" },
          { num: "6" },
        ],
        livingNum: [
          { num: "1" },
          { num: "2" },
          { num: "3" },
          { num: "4" },
          { num: "5" },
          { num: "6" },
        ],
        washNum: [
          { num: "1" },
          { num: "2" },
          { num: "3" },
          { num: "4" },
          { num: "5" },
          { num: "6" },
        ],
        payNum: [
          { num: "月", value: "1" },
          { num: "季", value: "2" },
          { num: "年", value: "3" },
        ],
        streeName: "", //房间名
        huoseName: "", //房号
        state: "", //楼道
        canquanman: "", //产权人
        fangchanzhen: "", //房产证
        factState: "", //实际面积
        roomState: [], //各房间面积
        houseState: "", //房间面积
        pulicState: "", //公摊面积
        areaState: "", //
        beizhu: "", //备注
        cityValue: "", //省市
        countyValue: "", //区县
        twonValue: "", //街道
        houseValue: "", //房间类型
        roomValue: "", //卧室数
        livingValue: "", //客厅数
        washValue: "", //卫生间数
        houseMoney: "", //租金
        water: "", //水表号
        ele: "", //电表号
        intnet: "", //宽带号
        publicMoney: "", //租金信息
        payValue: "2", //租金类别
        img: "",
        dialogImageUrl: "http://192.168.2.176:9601/file/upload",
        dialogVisible: false,
      },
      show: false,
      url: [],
    };
  },
  methods: {
    getMap() {
      getMaplist().then((res) => {
        const list = res.data[0].children;
        const length = list.length;
        for (var i = 0; i < length; i++) {
          this.formList.areaList.push(list[i]);
        }
      });
      getdict("property_nature").then((res) => {
        const list = res.data.records;
        const length = list.length;
        for (var i = 0; i < length; i++) {
          this.formList.houseStyle.push(list[i]);
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList, this.formList.img.indexOf(file.name));
      if (this.formList.img.indexOf(file.name) != -1) {
        let list = this.formList.img.split(",");
        let i;
        list.filter((item) => item.indexOf(file.name) != -1);
        list.map((item, index) => {
          console.log(item, index);
          if (item.indexOf(file.name) != -1) {
            i = index;
          }
        });
        list.splice(i, 1);
        this.formList.img = list.join(",");
        console.log(i, list, this.formList.img, "1111");
      }
    },
    handlePictureCardPreview(file) {
      this.formList.dialogImageUrl = file.url;
      this.formList.dialogVisible = true;
    },
    changeCity(value) {
      for (var i = 0; i < this.formList.areaList.length; i++) {
        var countyList = this.formList.areaList[i];
        if (value === countyList.id) {
          this.formList.countyParams = countyList.children;
        }
      }
    },
    changeCounty(value) {
      for (var i = 0; i < this.formList.countyParams.length; i++) {
        var twonList = this.formList.countyParams[i];
        if (value === twonList.id) {
          this.formList.townParams = twonList.children;
        }
      }
    },
    changecheck(value) {
      console.log(value);
    },
    topath() {
      this.$router.push("/public1");
    },
    //更改房屋信息
    changeRoom(value) {
      this.show = true;
      this.formList.roomState = [];
      for (var i = 0; i < value; i++) {
        this.formList.roomState.push({
          key: i,
          value: "",
          label: i + 1 + "室面积",
        });
      }
      console.log(this.formList.roomState);
    },
    //图片上传
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
          this.formList.img = this.url.join(",");
          console.log(this.formList.img, "img");
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
    //
    handimgChange(file, filelist) {
      console.log(file, filelist);
    },

    open(forName) {
      this.$refs[forName].validate((vaild) => {
        if (vaild) {
          this.centerDialogVisible = true;
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    submit() {
      console.log(this.formList);
      const roomstate = [];
      for (var i = 0; i < this.formList.roomState.length; i++) {
        roomstate.push(this.formList.roomState[i].value);
      }
      console.log(roomstate);
      const RoomNumber = this.formList.huoseName; //房间号
      const HouseEstate = this.formList.streeName; //小区
      const PropertyNature = this.formList.houseValue; // 房间属性
      const CityCode = this.formList.cityValue; // 县市
      const RegionCode = this.formList.countyValue; //区县
      const CommunityCode = this.formList.twonValue; //街道
      const Unit = this.formList.state; //楼栋
      const AllArea = this.formList.houseState; // 房屋面积
      const ActualArea = this.formList.factState; // 实际使用面积
      const ShareArea = this.formList.pulicState; //公摊使用面积
      const BedroomNumm = this.formList.roomValue; //卧室数
      const ParlorNum = this.formList.livingValue; //客厅数
      const ToiletNum = this.formList.washValue; //厕所数
      const PropertyOwner = this.formList.canquanman; //产权人
      const CertificateTitle = this.formList.fangchanzhen; //房产证
      const Noties = this.formList.beizhu; //备注
      const RoomNum = this.formList.roomValue; //卧室数
      const WaterMeter = this.formList.water; //水表号
      const ElectricMeter = this.formList.ele; //电表号
      const BroadbandMeter = this.formList.intnet; //宽带号
      const RentCycleCode = this.formList.payValue; //租金周期
      const RentUnitPrice = this.formList.houseMoney; //租金
      const HouseImages = this.formList.img; //房屋图片
      const roomAreas = roomstate; //卧室面积
      addHouse(
        RoomNumber,
        HouseEstate,
        PropertyNature,
        CityCode,
        RegionCode,
        CommunityCode,
        Unit,
        AllArea,
        ActualArea,
        ShareArea,
        BedroomNumm,
        ParlorNum,
        ToiletNum,
        PropertyOwner,
        CertificateTitle,
        Noties,
        RoomNum,
        WaterMeter,
        ElectricMeter,
        BroadbandMeter,
        RentCycleCode,
        RentUnitPrice,
        HouseImages,
        roomAreas
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
    this.getMap();
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
        display: flex;
        flex-wrap: wrap;
        .el-form-item {
          ::v-deep .el-form-item__label {
            font-size: 16px;
            text-align: left;
            color: #000;
          }
          .el-input {
            width: 1200px;
          }
        }
        .formitem {
          display: flex;
          padding: 0 20px 0 20px;
          width: 1200px;
          flex-wrap: wrap;
          margin-top: 10px;
          justify-content: space-between;
          .imgload {
            margin-top: 20px;
            height: 130px;
            width: 100%;
            display: flex;
            align-items: flex-end;
            span {
              color: #97979772;
              font-size: 12px;
            }
          }
          .el-form-item {
            display: flex;
            margin-bottom: 10px;
            width: 570px;
            align-items: center;
            justify-content: space-between;
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
            .title {
              width: 430px;
              text-align: left;
              font-size: 18px;
              color: #747373;
            }

            .selectgourp {
              display: flex;
              width: 430px;
              .select-item {
                span {
                  margin-right: 5px;
                }
                .el-select {
                  width: 120px;
                }
              }
            }
          }
        }
      }
      .solt {
        text-align: left;
        font-size: 20px;
        font-weight: 600;
        margin-top: 20px;
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