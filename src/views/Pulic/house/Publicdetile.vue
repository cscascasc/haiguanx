<template>
  <div class="container">
    <div class="top-container">
      <div class="back">
        <el-button @click="topath" type="primary"> 返回 </el-button>
      </div>
      <div class="title">{{ type === "detile" ? "住房详情" : "住房编辑" }}</div>
    </div>
    <div class="form-container">
      <el-form :model="formList" ref="formList" v-if="houselist.length !== 0">
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
              <el-select
                v-model="formList.cityValue"
                @change="changeCity"
                :placeholder="houselist.cityName"
                :disabled="type === 'detile' ? true : false"
              >
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
                  required: false,
                  message: '请选择区县',
                },
              ]"
            >
              <el-select
                v-model="formList.countyValue"
                @change="changeCounty"
                :placeholder="houselist.regionName"
                :disabled="type === 'detile' ? true : false"
              >
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
                  required: false,
                  message: '请选择街道',
                },
              ]"
            >
              <el-input
                v-model="formList.address"
                :placeholder="houselist.address"
                :disabled="type === 'detile' ? true : false"
              >
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
                  required: false,
                  message: '请输入小区名称',
                },
              ]"
            >
              <el-input
                :placeholder="houselist.houseEstate"
                v-model="formList.streeName"
                :disabled="type === 'detile' ? true : false"
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
                  required: false,
                  message: '请输入楼栋单元',
                },
              ]"
            >
              <el-input
                :placeholder="houselist.unit"
                v-model="formList.state"
                :disabled="type === 'detile' ? true : false"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              label="房号："
              prop="huoseName"
              :rules="[
                {
                  required: false,
                  message: '房号',
                },
              ]"
            >
              <el-input
                :placeholder="houselist.roomNumber"
                v-model="formList.huoseName"
                :disabled="type === 'detile' ? true : false"
              >
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
                  required: false,
                  message: '请输入房屋面积',
                },
              ]"
            >
              <el-input
                v-model="formList.houseState"
                type="number"
                :placeholder="houselist.allArea"
                :disabled="type === 'detile' ? true : false"
              >
                <i slot="suffix" style="font-size: 24px">㎡</i>
              </el-input>
            </el-form-item>
            <el-form-item
              label="实际使用面积："
              prop="factState"
              :rules="[
                {
                  required: false,
                  message: '实际使用面积',
                },
              ]"
            >
              <el-input
                v-model="formList.factState"
                type="number"
                :placeholder="houselist.actualArea"
                :disabled="type === 'detile' ? true : false"
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
                  required: false,
                  message: '请输入公摊面积',
                },
              ]"
            >
              <el-input
                v-model="formList.pulicState"
                :placeholder="houselist.shareArea"
                type="number"
                :disabled="type === 'detile' ? true : false"
              >
                <i slot="suffix" style="font-size: 24px">㎡</i></el-input
              >
            </el-form-item>
            <el-form-item
              label="房屋性质："
              prop="houseValue"
              :rules="[
                {
                  required: false,
                  message: '请输入房屋性质',
                },
              ]"
            >
              <el-select
                v-model="formList.houseValue"
                :placeholder="houselist.propertyNature"
                :disabled="type === 'detile' ? true : false"
              >
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
                  required: false,
                  message: '请输入户型',
                },
              ]"
            >
              <div class="selectgourp">
                <div class="select-item">
                  <el-select
                    v-model="houselist.bedroomNum"
                    @change="changeRoom"
                    :disabled="false"
                  >
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
                  <el-select v-model="houselist.parlorNum" :disabled="false">
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
                  <el-select v-model="houselist.toiletNum" :disabled="false">
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
        <div class="solt">房间信息:</div>
        <div class="form">
          <div class="formitem">
            <el-form-item
              v-for="item in formList.roomState"
              :key="item.key"
              :label="item.label"
              prop="roomState"
              :rules="[
                {
                  required: false,
                  message: '请输入房间面积',
                },
              ]"
            >
              <el-input v-model="item.value" type="number">
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
                  required: false,
                  message: '请输入产权人',
                },
              ]"
            >
              <el-input
                v-model="formList.canquanman"
                :placeholder="houselist.propertyOwner"
                :disabled="type === 'detile' ? true : false"
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
                :placeholder="houselist.certificateTitle"
                :disabled="type === 'detile' ? true : false"
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
                  required: false,
                  message: '请选择租金计算周期',
                },
              ]"
            >
              <el-select
                v-model="formList.payValue"
                :disabled="type === 'detile' ? true : false"
                :placeholder="
                  formList.payNum[houselist.houseDetails.rentCycleCode].num
                "
              >
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
                  required: false,
                  message: '请输入房屋租金',
                },
              ]"
            >
              <el-input
                v-model="formList.houseMoney"
                type="number"
                :placeholder="houselist.houseDetails.rentUnitPrice"
                :disabled="type === 'detile' ? true : false"
              >
                <i slot="suffix" style="font-size: 16px">¥/㎡/月</i>
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
                :placeholder="houselist.houseDetails.waterMeter"
                :disabled="type === 'detile' ? true : false"
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
                :placeholder="houselist.houseDetails.electricMeter"
                :disabled="type === 'detile' ? true : false"
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
                :placeholder="houselist.houseDetails.broadbandMeter"
                :disabled="type === 'detile' ? true : false"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="solt">房屋图片:</div>
        <div class="form">
          <div class="formitem">
            <div style="display: flex">
              <!-- <div class="img">
                <el-image
                  cover
                  style="width: 150px; height: 150x"
                  v-for="item in houselist.imageList"
                  :key="item"
                  :src="item"
                  :preview-src-list="houselist.imageList"
                >
                  <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                  </div>
                </el-image>
              </div> -->
              <div class="imgload">
                <el-upload
                  :disabled="type != 'edit'"
                  action="http"
                  list-type="picture-card"
                  accept=".jpg ,.png, .pfd, .svg"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :http-request="handleimgup"
                  :file-list="filelist"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="formList.dialogVisible">
                  <img
                    width="100%"
                    :src="houselist.houseDetails.houseImages"
                    alt=""
                  />
                </el-dialog>
                <span>请上传jpg、.png、pfd、svg文件</span>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="solt">房屋资产:</div>
        <el-table
          :data="assislist"
          border
          max-height="200"
          style="margin-left: 20px; width: 80%"
        >
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="assetName" label="资产名称"></el-table-column>
          <el-table-column prop="brand" label="品牌"></el-table-column>
          <el-table-column
            prop="specificationType"
            label="规格型号"
          ></el-table-column>
          <el-table-column prop="unitPrice" label="单价"></el-table-column>
          <el-table-column
            prop="acquisitionDate"
            label="取得日期"
          ></el-table-column>
          <el-table-column prop="usefulLife" label="使用年限"></el-table-column>
        </el-table> -->
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
              :disabled="type === 'detile' ? true : false"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="button">
      <el-button
        type="success"
        v-if="type === 'edit'"
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
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import http from "@/utils/request";
import { getMaplist } from "@/api/map";
import { gethouseAsset } from "@/api/house/getAsset";
import { getHouseList, gethousedetile } from "@/api/house/gethouselist";
import { editHouse } from "@/api/house/post";
import { getdict } from "@/api/dict/getdict";
export default {
  data() {
    return {
      id: "",
      type: "",
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
        streeName: null, //房间名
        huoseName: null, //房号
        state: null, //楼道
        canquanman: null, //产权人
        fangchanzhen: null, //房产证
        factState: null, //实际面积
        roomState: [], //各房间面积
        houseState: null, //房间面积
        pulicState: null, //公摊面积
        areaState: null, //
        beizhu: null, //备注
        cityValue: null, //省市
        countyValue: null, //区县
        twonValue: null, //街道
        houseValue: null, //房间类型
        roomValue: null, //卧室数
        livingValue: null, //客厅数
        washValue: null, //卫生间数
        houseMoney: null, //租金
        water: null, //水表号
        ele: null, //电表号
        intnet: null, //宽带号
        publicMoney: null, //租金信息
        payValue: null, //租金类别
        img: null,
        dialogImageUrl: "http://192.168.2.176:9601/file/upload",
        dialogVisible: false,
      },
      houselist: [],
      assislist: [],
      houseAll: [],
      show: false,
      form: {
        size: 100,
        current: 1,
        status: 1,
      },
      url: [],
      filelist: [],
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
      console.log(file, fileList);
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
      this.$router.back();
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
      console.log(imgData);
      const form = new FormData();
      form.append("file", imgData);
      http({
        method: "post",
        url: "/file/upload",
        data: form,
        header: { "content-type": "multipart/form-data;" },
      })
        .then((res) => {
          console.log(res);
          this.url.push(res.data);
          this.houselist.imageList.push(res.data);
          this.formList.img = this.houselist.imageList.join(",");
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
    open(forName) {
      this.centerDialogVisible = true;
    },
    //提交住房编辑
    submit() {
      const roomstate = [];
      for (var i = 0; i < this.formList.roomState.length; i++) {
        roomstate.push(this.formList.roomState[i].value);
      }
      const list = {
        id: this.houselist.id,
        createTime: this.houselist.createTime,
        updateTime: this.houselist.updateTime,
        isDeleted: this.houselist.isDeleted,
        status: this.houselist.status,
        roomNumber: this.formList.huoseName
          ? this.formList.huoseName
          : this.houselist.roomNumber,
        houseEstate: this.formList.streeName
          ? this.formList.streeName
          : this.houselist.houseEstate,
        propertyNature: this.formList.houseValue
          ? this.formList.houseValue
          : this.houselist.propertyNatureCode,
        cityCode: !this.formList.cityValue
          ? this.houselist.cityCode
          : this.formList.cityValue,
        regionCode: !this.formList.countyValue
          ? this.houselist.regionCode
          : this.formList.countyValue,
        unit: !this.formList.state ? this.houselist.unit : this.formList.state,
        communityCode: !this.formList.twonValue
          ? this.houselist.communityCode
          : this.formList.twonValue,
        allArea: !this.formList.houseState
          ? this.houselist.allArea
          : this.formList.houseState,
        actualArea: !this.formList.factState
          ? this.houselist.actualArea
          : this.formList.factState,
        shareArea: !this.formList.pulicState
          ? this.houselist.shareArea
          : this.formList.pulicState,
        bedroomNum: !this.formList.roomValue
          ? this.houselist.bedroomNum
          : this.formList.roomValue,
        parlorNum: !this.formList.livingValue
          ? this.houselist.parlorNum
          : this.formList.livingValue,
        toiletNum: !this.formList.washValue
          ? this.houselist.toiletNum
          : this.formList.washValue,
        propertyOwner: this.formList.canquanman
          ? this.formList.canquanman
          : this.houselist.propertyOwner,
        certificateTitle: this.formList.fangchanzhen
          ? this.formList.fangchanzhen
          : this.houselist.certificateTitle,
        cityName: this.houselist.cityName,
        regionName: this.houselist.regionName,
        communityName: this.houselist.communityName,
        houseId: this.houselist.houseDetails.id,
        // roomAreas: this.houselist.houseDetails.roomAreas,
        waterMeter: this.formList.water
          ? this.formList.water
          : this.houselist.houseDetails.waterMeter,
        electricMeter: this.formList.ele
          ? this.formList.ele
          : this.houselist.houseDetails.electricMeter,
        broadbandMeter: this.formList.intnet
          ? this.formList.intnet
          : this.houselist.houseDetails.broadbandMeter,
        rentCycleCode: this.formList.payValue
          ? this.formList.payValue
          : this.houselist.houseDetails.rentCycleCode,
        rentUnitPrice: this.formList.houseMoney
          ? this.formList.houseMoney
          : this.houselist.houseDetails.rentUnitPrice,
        houseImages: this.formList.img
          ? this.formList.img
          : this.houselist.houseDetails.houseImages,
        roomAreas: roomstate.join(","),
      };
      console.log(list);
      // return;
      editHouse(list)
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
      // addHouse(
      //   id,
      //   createTime,
      //   updateTime,
      //   isDeleted,
      //   status,
      //   roomNumber,
      //   houseEstate,
      //   propertyNature,
      //   cityCode,
      //   regionCode,
      //   unit,
      //   communityCode,
      //   allArea,
      //   actualArea,
      //   shareArea,
      //   bedroomNum,
      //   parlorNum,
      //   toiletNum,
      //   propertyOwner,
      //   certificateTitle,
      //   cityName,
      //   regionName,
      //   communityName,
      //   houseId,
      //   roomAreas,
      //   waterMeter,
      //   electricMeter,
      //   broadbandMeter,
      //   rentCycleCode,
      //   rentUnitPrice,
      //   houseImages
      // )
      //   .then((res) => {
      //     const message = res.msg;
      //     this.$notify({
      //       title: "成功",
      //       message: message,
      //       type: "success",
      //     });
      //     this.$router.back();
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    },
    //获取房屋信息
    gethouse() {
      gethousedetile(this.id)
        .then((res) => {
          this.houselist = res.data;
          console.log(this.houselist, "ssss");
          for (let item of this.houselist.imageList) {
            this.filelist.push({
              name: "",
              url: item,
            });
          }
          this.houselist.houseDetails.roomAreaList.map((item, index) => {
            this.formList.roomState.push({
              key: index,
              value: item,
              label: index + 1 + "室面积",
            });
          });
          console.log(this.formList);
        })
        .catch((error) => {
          console.error(error);
        });
      // gethouseAsset(this.id)
      //   .then((res) => {
      //     const list = res.data.records;
      //     const length = list.length;
      //     for (var i = 0; i < length; i++) {
      //       this.assislist.push(list[i]);
      //     }
      //     console.log(this.assislist);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    },
  },
  created() {
    this.id = this.$route.query.id;
  },
  // computed: {
  //   houselist() {
  //     console.log(this.houseAll.filter((item) => item.id === this.id));
  //     return this.houseAll.filter((item) => item.id === this.id);
  //   },
  // },
  mounted() {
    this.getMap();
    this.gethouse();
    this.type = this.$route.query.type;
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
          ::v-deep .el-textarea__inner::placeholder {
            color: #000;
          }
          ::v-deep .el-input__inner::placeholder {
            color: #000;
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