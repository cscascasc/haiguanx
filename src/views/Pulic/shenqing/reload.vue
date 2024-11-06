<template>
  <div class="container">
    <div class="top-container">
      <div class="back">
        <el-button @click="back" type="primary"> 返回 </el-button>
      </div>
      <div class="title">入住申请</div>
    </div>
    <div class="form-container">
      <el-form :model="form" ref="houseForm">
        <div class="form">
          <div class="form-item">
            <el-form-item label="房屋：">
              <div class="title">
                {{
                  HouseList[0].cityName +
                  HouseList[0].regionName +
                  HouseList[0].communityName +
                  HouseList[0].houseEstate +
                  HouseList[0].unit
                }}
              </div>
            </el-form-item>
            <el-form-item label="住房性质：">
              <div class="title">
                {{ houseType[HouseList[0].propertyNatureCode] }}
              </div>
            </el-form-item>
          </div>
        </div>
        <div class="form">
          <div class="form-item">
            <el-form-item label="实际使用面积：">
              <div class="title">
                {{ HouseList[0].actualArea + "㎡" }}
              </div>
            </el-form-item>
            <el-form-item
              v-if="HouseList[0].propertyNature === 1"
              label="公摊使用面积："
            >
              <div class="title">
                {{ HouseList[0].shareArea + "㎡" }}
              </div>
            </el-form-item>
            <el-form-item v-else label="户型">
              <div class="title">
                {{
                  HouseList[0].bedroomNum +
                  "室" +
                  HouseList[0].parlorNum +
                  "厅" +
                  HouseList[0].toiletNum +
                  "卫"
                }}
              </div>
            </el-form-item>
          </div>
        </div>
        <div class="form" v-if="HouseList[0].propertyNatureCode === 1">
          <div class="form-item">
            <el-form-item label="户型">
              <div class="title">
                {{
                  HouseList[0].bedroomNum +
                  "室" +
                  HouseList[0].parlorNum +
                  "厅" +
                  HouseList[0].toiletNum +
                  "卫"
                }}
              </div>
            </el-form-item>
            <el-form-item label="租金：">
              <div class="title">
                {{ HouseList[0].houseDetails.rentUnitPrice + "/㎡" }}
              </div>
            </el-form-item>
          </div>
        </div>
        <div class="form">
          <div class="form-item">
            <el-form-item
              label="房屋所在海关"
              prop="customsType"
              :rules="[
                {
                  required: !form.dept.customsName,
                  message: '请选择住房所属海关',
                },
              ]"
            >
              <el-select
                v-model="form.customsType"
                value-key="id"
                clearable
                filterable
                :placeholder="form.dept.customsName"
              >
                <el-option
                  v-for="item in houseForm.customsType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option></el-select
            ></el-form-item>
          </div>
        </div>
        <div class="form" v-if="HouseList[0].propertyNatureCode === 1">
          <div class="form-item">
            <el-form-item
              label="入住房间："
              prop="roomId"
              :rules="[
                {
                  required: true,
                  message: '请选择入住房间',
                },
              ]"
            >
              <el-select v-model="form.roomId">
                <el-option
                  v-for="item in roomList"
                  :key="item.roomId"
                  :value="item.roomId"
                  :label="item.roomId + '室-' + item.roomArea + '㎡'"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="入住周期:"
              prop="timeSelect"
              :rules="[
                {
                  required: !form.stayCycle,
                  message: '请选择入住周期',
                },
              ]"
            >
              <el-date-picker
                v-model="houseForm.timeSelect"
                type="daterange"
                range-separator="至"
                :placeholder="form.stayCycle"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy/MM/dd"
                style="width: 430px"
              >
              </el-date-picker>
            </el-form-item>
          </div>
        </div>
        <div class="form" v-else>
          <div class="form-item">
            <el-form-item
              label="入住周期:"
              prop="timeSelect"
              :rules="[
                {
                  required: true,
                  message: '请选择入住周期',
                },
              ]"
            >
              <el-date-picker
                v-model="houseForm.timeSelect"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy/MM/dd"
                style="width: 430px"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item></el-form-item>
          </div>
        </div>
        <div class="form">
          <div class="form-item">
            <el-form-item
              label="办理形式："
              prop="handleTypeCode"
              :rules="[
                {
                  required: true,
                  message: '请选择办理形式',
                },
              ]"
            >
              <el-select v-model="form.handleTypeCode">
                <el-option
                  v-for="item in houseForm.submitType"
                  :key="item.label"
                  :value="item.type"
                  :label="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="姓名："
              prop="name"
              :rules="[
                {
                  required: true,
                  message: '姓名不能为空',
                },
              ]"
            >
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form">
          <div class="form-item">
            <el-form-item
              label="身份证："
              prop="idCard"
              :rules="[
                { required: true, message: '请输入身份证号' },
                {
                  pattern:
                    /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                  message: '证件号码格式有误！',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                v-model="form.idCard"
                type="number"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="工作属性："
              prop="attributesCode"
              :rules="[
                {
                  required: true,
                  message: '请选择工作属性',
                },
              ]"
            >
              <el-select v-model="form.attributesCode">
                <el-option
                  v-for="item in houseForm.jobType"
                  :key="item.label"
                  :value="item.type"
                  :label="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="form">
          <div class="form-item">
            <el-form-item
              label="借调部门"
              prop="devmentValue"
              :rules="[
                {
                  required: true,
                  message: '请选择借调部门',
                },
              ]"
              v-if="form.attributesCode === 4"
            >
              <el-cascader
                v-model="houseForm.devmentValue"
                :options="houseForm.devmentType"
                clearable
                :props="props"
                @change="change"
              >
              </el-cascader>
            </el-form-item>
          </div>
        </div>
        <div class="form">
          <div class="form-item">
            <el-form-item
              label="职级："
              prop="rankCode"
              :rules="[
                {
                  required: true,
                  message: '请选择级别',
                },
              ]"
            >
              <el-select v-model="form.rankCode">
                <el-option
                  v-for="item in houseForm.levelType"
                  :key="item.dictLabel"
                  :label="item.dictLabel"
                  :value="item.dictSort"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="工作年限"
              prop="organizationLife"
              :rules="[
                {
                  required: true,
                  message: '请输入年限',
                },
                {
                  type: 'number',
                  message: '请输入数字',
                },
              ]"
            >
              <el-input
                v-model.number="form.organizationLife"
                type="number"
                @change="Time"
              ></el-input
            ></el-form-item>
          </div>
        </div>
        <div class="form">
          <div class="form-item">
            <el-form-item
              label="本人及家庭成员工作地是否购买或承租保障性住房："
              prop="existPurchase"
              :rules="[
                {
                  required: true,
                  message: '请选择',
                },
              ]"
            >
              <el-select v-model="form.existPurchase">
                <el-option
                  v-for="item in houseForm.hasBaseHouseType"
                  :key="item.label"
                  :value="item.type"
                  :label="item.label"
                ></el-option></el-select
            ></el-form-item>
            <!-- <el-form-item
                label="工作地是否获得产权住房："
                prop="hasHouseValue"
                :rules="[
                  {
                    required: true,
                    message: '请选择',
                  },
                ]"
              >
                <el-select v-model="houseForm.hasHouseValue">
                  <el-option
                    v-for="item in houseForm.hasHouseType"
                    :key="item.label"
                    :value="item.type"
                    :label="item.label"
                    >{{ item.label }}</el-option
                  ></el-select
                ></el-form-item
              > -->
          </div>
        </div>
        <div class="form">
          <div class="form-item">
            <el-form-item
              label="婚姻情况"
              prop="marriageCode"
              :rules="[
                {
                  required: true,
                  message: '请选择婚姻情况',
                },
              ]"
            >
              <el-select v-model="form.marriageCode">
                <el-option
                  v-for="item in houseForm.isMerryType"
                  :key="item.label"
                  :label="item.label"
                  :value="item.type"
                >
                </el-option></el-select
            ></el-form-item>
            <el-form-item
              label="部门审批人"
              prop="nextExamineUser"
              :rules="[
                {
                  required: true,
                  message: '请选择部门审批人',
                },
              ]"
            >
              <el-select
                v-model="form.nextExamineUser"
                multiple
                filterable
                clearable
              >
                <el-option
                  v-for="item in deptUser"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="form" v-if="form.marriageCode !== 0">
          <div class="slot">婚姻证明:</div>
          <div class="uploadimg" style="height: 130px">
            <el-upload
              action="http"
              list-type="picture-card"
              accept=".jpg ,.png, .pfd, .svg"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :http-request="handleimgup"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <em>只能上传jpg、png、pdf、svg类型的图片</em>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </div>
        </div>
        <div class="form">
          <el-form-item label="申请说明：" prop="sumbitIssus" :rules="note">
            <el-input
              v-model="form.explains"
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              maxlength="200"
              show-word-limit
            ></el-input>
          </el-form-item>
        </div>
        <div class="form">
          <el-form-item label="备注：" prop="issus" :rules="note">
            <el-input
              v-model="form.notes"
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
      <el-button type="success" @click="open('houseForm')"> 提交 </el-button>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <div
        style="font-size: 16px; text-align: center"
        v-if="houseForm.jobYears > 10"
      >
        您的工作年限已大于规定年限
      </div>
      <div style="font-size: 16px; text-align: center">确认要提交吗</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog center title="提示" width="30%" :visible.sync="time">
      <div style="font-size: 16px; text-align: center">
        您的住房时间已大于规定年限
      </div>
      <div style="font-size: 16px; text-align: center">是否继续申请</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="time = false">取 消</el-button>
        <el-button type="primary" @click="opensub">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
<script>
import http from "@/utils/request";
import ChineseDistricts from "@/assets/area.js/area";
import { gethousedetile, getApprodetile } from "@/api/house/gethouselist";
import { getdictdata } from "@/api/dict/getdict";
import { checktime, reSubmit } from "@/api/house/post";
import {
  getdept,
  getdeptUser,
  getdeptcustoms,
  getRank,
  getAlldept,
} from "@/api/dept/getdept";
export default {
  data() {
    return {
      id: "",
      province: [],
      shi1: [],
      city: [],
      dialogImageUrl: "http://192.168.2.176:9601/file/upload",
      dialogVisible: false,
      block: [],
      house: [],
      ChineseDistricts: ChineseDistricts, //省份户籍
      centerDialogVisible: false,
      houseForm: {
        roomSelect: "",
        room: ["2", "3,"],
        timeSelect: "",
        submitTypeValue: "",
        submitType: [
          {
            label: "自己办",
            type: 1,
          },
          {
            label: "代办",
            type: 2,
          },
        ],
        submitName: "",
        submitIdCard: "",
        pName: "",
        cName: "",
        jobTypeValue: "",
        jobType: [
          {
            label: "交流干部",
            type: 1,
          },
          {
            label: "本地干部职工",
            type: 2,
          },
          {
            label: "外地干部职工",
            type: 3,
          },
          {
            label: "关区借调",
            type: 4,
          },
          {
            label: "集中工作",
            type: 5,
          },
        ],
        devmentValue: "",
        devmentType: [], //借调部门
        levelValue: "",
        levelType: [],
        jobYears: "",
        hasBaseHouseValue: "",
        hasBaseHouseType: [
          {
            label: "是",
            type: true,
          },
          {
            label: "否",
            type: false,
          },
        ],
        hasHouseValue: "",
        hasHouseType: [
          {
            label: "是",
            type: true,
          },
          {
            label: "否",
            type: false,
          },
        ],
        isMerry: "0",
        isMerryType: [
          {
            label: "未婚",
            type: 0,
          },
          {
            label: "已婚",
            type: 1,
          },
          {
            label: "离异",
            type: 2,
          },
        ],
        hasMerry: "",
        sumbitIssus: "",
        issus: "",
        customsType: [],
        customsValue: "",
        nextExamineUser: [],
        userid: this.$store.state.userinfo.userID,
      },
      houseType: {
        1: "集体宿舍",
        2: "干部交流用房",
        3: "临时周转用房",
        4: "集体工作人员用房",
      },
      time: false,
      form: {},
      note: [
        {
          required: false,
          message: "请填写",
        },
      ],
      HouseList: [],
      roomList: [],
      props: {
        label: "name",
        children: "children",
        value: "id",
      },
      deptUser: [],
      applicantid: "",
      url: [],
    };
  },
  methods: {
    get() {
      this.getCityData();
      this.gethouse();
      this.getdict();
      this.deptlist();
      this.getApplicentList();
    },
    getCityData() {
      let that = this;
      that.ChineseDistricts.forEach(function (item, index) {
        //省级数据
        that.province.push({
          id: item.code,
          value: item.name,
          children: item.cityList,
        });
      });
    },
    async gethouse() {
      await gethousedetile(this.id).then((res) => {
        this.HouseList.push(res.data);
        if (res.data.users.length !== 0) {
          for (var i = 0; i < res.data.houseDetails.roomAreaList.length; i++) {
            for (var c = 0; c < res.data.users.length; c++) {
              var a = i + 1;
              if (a !== res.data.users[c].roomId) {
                this.roomList.push({
                  roomId: a,
                  roomArea: res.data.houseDetails.roomAreaList[i],
                });
              }
            }
          }
        } else {
          for (var i = 0; i < res.data.houseDetails.roomAreaList.length; i++) {
            let a = i + 1;
            this.roomList.push({
              roomId: a,
              roomArea: res.data.houseDetails.roomAreaList[i],
            });
          }
        }
      });
    },
    //返回
    back() {
      this.$router.back();
    },
    //选择户籍
    choseCity(e) {
      let that = this;
      that.city = [];
      that.block = [];
      that.cname = "";
      that.bname = "";
      for (var index2 in that.province) {
        if (e === that.province[index2].id) {
          that.shi1 = that.province[index2].children;
          that.pname = that.province[index2].value;

          that.shi1.forEach(function (citem, cindex) {
            that.city.push({
              id: citem.code,
              value: citem.name,
              children: citem.areaList,
            });
          });
        }
      }
      console.log(that.pname);
    },
    //删除上交图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //预览上交图片
    handlePictureCardPreview(file) {
      this.formList.dialogImageUrl = file.url;
      this.formList.dialogVisible = true;
    },
    //图片提交
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
          this.url.push(res.data);
          this.form.marriageProve = this.url.join(",");
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
    opensub() {
      this.centerDialogVisible = true;
    },
    //提交按钮
    open(forName) {
      this.$refs[forName].validate((vaild) => {
        if (vaild) {
          if (this.houseForm.jobTypeValue === "1") {
            checktime(this.houseForm.submitIdCard)
              .then((res) => {
                if (res.data > 24) {
                  this.note[0].required = true;
                  this.$refs[forName].validate((vaild) => {
                    if (vaild) {
                      this.time = true;
                    } else {
                      console.log("error submit");
                      return false;
                    }
                  });
                } else {
                  this.centerDialogVisible = true;
                }
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            this.centerDialogVisible = true;
          }
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    Time(value) {
      if (value > 10) {
        console.log(value);
        this.note[0].required = true;
      } else {
        this.note[0].required = false;
      }
    },
    //确认提交
    submit() {
      if (this.houseForm.timeSelect) {
        this.form.stayCycle =
          this.houseForm.timeSelect[0] + "-" + this.houseForm.timeSelect[1];
      }
      console.log(this.form);
      reSubmit(this.form)
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
    //获取单位
    getdict() {
      getdept().then((res) => {
        const list = res.data;
        const length = list.length;
        for (var i = 0; i < length; i++) {
          this.houseForm.customsType.push(list[i]);
        }
      });
      getdeptUser(this.$store.state.userinfo.userdepartment)
        .then((res) => {
          const list = res.data;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.deptUser.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //获取职别
    deptlist() {
      getRank()
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.houseForm.levelType.push(list[i]);
          }
          console.log(this.houseForm.levelType);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //获取部门
    custom(value) {
      console.log(value);
      const id = this.$store.state.userinfo.userDept;
      this.houseForm.devmentType = [];
      getAlldept()
        .then((res) => {
          console.log(res);
          this.houseForm.devmentType = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    change(value) {
      const array = [];
      const list = value;
      const length = list.length;
      for (var i = 0; i < length; i++) {
        array.push(list.slice(-1));
      }
      this.houseForm.devmentValue = array[0][0];
    },
    //获取申请详情
    getApplicentList() {
      getApprodetile(this.applicantid)
        .then((res) => {
          console.log(res);
          this.form = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.applicantid = this.$route.query.applicantid;
    this.id = this.$route.query.id;
    this.get();
    this.custom();
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
        }
        .slot {
          text-align: left;
          font-size: 16px;
          color: #000;
          padding: 20px;
        }
        .uploadimg {
          height: 130px;
          width: 100%;
          display: flex;
          margin-top: 10px;
          margin-left: 20px;
          align-items: flex-end;
        }
        .form-item {
          display: flex;
          padding: 0 20px 0 20px;
          width: 1200px;
          justify-content: space-between;
          .el-form-item {
            display: flex;
            width: 570px;
            align-items: center;
            justify-content: space-between;
            .el-input,
            .el-select,
            .el-cascader,
            .el-date-picker {
              width: 430px;
            }
            .huji {
              display: flex;
              justify-content: space-between;
              width: 430px;
              .el-select {
                width: calc(410px / 2);
              }
            }
            .title {
              width: 430px;
              text-align: left;
              font-size: 18px;
              color: #747373;
            }
            ::v-deep .el-form-item__label {
              width: 200px;
              text-align: left;
              font-size: 16px;
              color: #000;
            }
            .el-uplaod {
              ::v-deep el-upload--picture-card {
                width: 30px;
                height: 30px;
              }
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