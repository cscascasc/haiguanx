<template>
  <div class="container">
    <div class="topContainer">
      <div class="solt">
        <div class="solt-item">
          <div class="solt-item-title">房屋总数：{{ houseAll.length }}</div>
          <div class="solt-item-date"></div>
        </div>
        <div class="solt-item">
          <div class="solt-item-title">已住满：{{ Notfull }}</div>
          <div class="solt-item-date"></div>
        </div>
        <div class="solt-item">
          <div class="solt-item-title">可入住：{{ fullIN }}</div>
          <div class="solt-item-date"></div>
        </div>
      </div>
      <div class="sub-botton">
        <el-button type="primary" @click="mySubmit">我的入住申请</el-button>
      </div>
    </div>
    <div class="mainContainer">
      <div class="main-rightContainer">
        <div class="areaContainer">
          <div class="area-search">
            <el-input
              placeholder="请输入内容"
              v-model="filterText"
              class="input-with-select"
            >
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div class="area-select">
            <el-tree
              :data="data"
              :props="defaultProps"
              ref="tree"
              node-key="id"
              accordion
              @node-click="node"
              highlight-curren
              :filter-node-method="filterNode"
            >
              <!-- <span slot-scope="{ node, data }">
                {{ data.name }}
                {{ data.sysDefault }}
              </span>

              <div></div> -->
            </el-tree>
          </div>
        </div>
      </div>
      <div class="main-leftContainer">
        <el-tabs v-model="activeName" type="card" @tab-click="text">
          <el-tab-pane
            v-for="item in housetype"
            :key="item.name"
            :label="item.lable"
            :name="item.name"
          >
            <div class="houseContainer">
              <div
                class="houseBox"
                v-for="(item, index) in housetypeList"
                :key="item.name"
                :index="item.id"
              >
                <div
                  :class="
                    item.bedroomNum > item.users.length ? 'active' : 'houseItem'
                  "
                  @click="showDropDown(index)"
                >
                  <div class="title">
                    {{ item.houseEstate }} {{ item.unit }}
                  </div>

                  <div class="Num">{{ item.roomNumber }}</div>
                  <div class="footer">
                    {{
                      item.bedroomNum > item.users.length ? "可申请" : "已住满"
                    }}
                  </div>
                </div>
                <div class="dropDown" v-show="showid === index && showDrop">
                  <div class="button">
                    <el-button
                      v-if="item.bedroomNum > item.users.length"
                      @click="submit(item)"
                      >申请入住</el-button
                    >
                  </div>
                  <div class="button">
                    <el-button @click="detile(item)">房屋详情</el-button>
                  </div>
                  <div class="button">
                    <el-button @click="openuser(item)">查看入住人</el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog
      title="我的入住申请"
      :visible.sync="dialogVisibel.dialogMysubmit"
      style="text-align: left"
      width="70%"
      show-close
    >
      <el-table :data="MysubmitList" border max-height="500">
        <el-table-column
          prop="name"
          label="入住人"
          width="100px"
          fixed="left"
        ></el-table-column>
        <el-table-column label="门牌号" width="100px">
          <div slot-scope="scope">
            {{ scope.row.house.roomNumber }}
          </div>
        </el-table-column>
        <el-table-column label="小区/楼栋/单元" width="130px">
          <div slot-scope="scope">
            {{ scope.row.house.houseEstate + scope.row.house.unit }}
          </div>
        </el-table-column>
        <el-table-column prop="provinceName" label="归属地"> </el-table-column>
        <el-table-column label="房屋性质">
          <div slot-scope="scope">
            {{ scope.row.house.propertyNature }}
          </div>
        </el-table-column>
        <el-table-column label="房屋面积">
          <div slot-scope="scope">
            {{ scope.row.house.allArea }}
          </div>
        </el-table-column>
        <el-table-column label="实际使用面积" width="120px">
          <div slot-scope="scope">
            {{ scope.row.house.actualArea }}
          </div>
        </el-table-column>
        <el-table-column label="公摊使用面积" width="120px">
          <div slot-scope="scope">
            {{ scope.row.house.shareArea }}
          </div>
        </el-table-column>
        <el-table-column label="户型">
          <div slot-scope="scope">
            {{
              scope.row.house.bedroomNum +
              "室" +
              scope.row.house.parlorNum +
              "厅" +
              scope.row.house.toiletNum +
              "卫"
            }}
          </div>
        </el-table-column>
        <el-table-column prop="roomId" label="房间"></el-table-column>
        <el-table-column label="状态">
          <div slot-scope="scope">
            {{ houseSataus[scope.row.status].label }}
          </div>
        </el-table-column>
        <el-table-column prop="stayCycle" label="提交时间"> </el-table-column>
        <el-table-column label="申请人">{{ user.userName }}</el-table-column>
        <el-table-column label="操作" width="100%" fixed="right">
          <div
            slot-scope="scope"
            :style="{
              display: 'flex',
              flexDirection: 'column',
            }"
          >
            <!-- <el-button type="text" size="small" @click="userdetile(scope.row)"
              >详情</el-button
            >
            <el-button type="text" size="small">编辑</el-button> -->
            <el-button
              
              type="text"
              size="small"
              :disabled="houseSataus[scope.row.status].disabled"
              @click="removeOpen(scope.row)"
              >退房
            </el-button>
            <el-button type="text" size="small" @click="insideOpen(scope.row)"
              >资产确认</el-button
            >
            <el-button
              type="text"
              size="small"
              v-if="scope.row.status === 2"
              @click="reload(scope.row)"
              >重新提交</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="getHistoryList(scope.row)"
              >审批流程</el-button
            >
          </div>
        </el-table-column>
      </el-table>
      <el-pagination
        style="float: right"
        background
        layout="prev, pager, next"
        :total="apportotal"
        :page-size="apporform.size"
        @prev-click="changepage"
        @next-click="changepage"
        @current-change="changepage"
      >
      </el-pagination>
      <el-dialog
        title="资产确认"
        width="60%"
        :visible.sync="dialogVisibel.insidedialog"
        style="text-align: left"
        append-to-body
      >
        <el-table :data="houseAsset" border>
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
          <el-table-column label="确认完好">
            <div slot-scope="scope">
              <el-checkbox
                :label="scope.row.id"
                v-model="radio"
                @change="confirm(scope.row)"
                >确认</el-checkbox
              >
            </div>
          </el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog
        title="退房"
        :visible.sync="dialogVisibel.removeSubmit"
        append-to-body
        width="60%"
      >
        <span style="font-size: 18px; font-weight: 600">房屋情况</span>
        <div class="housedetile" style="margin-top: 20px; margin-bottom: 10px">
          <div class="item" style="display: flex; align-items: center">
            <span style="font-size: 16px; margin-right: 10px"
              >房屋是否清洁:</span
            >
            <div class="radio">
              <el-radio-group v-model="exitform.clear" @change="open">
                <el-radio label="1" border>已清洁</el-radio>
                <el-radio label="2" border>未清洁</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="item" style="display: flex; align-items: center">
            <span style="font-size: 16px; margin-right: 10px"
              >电费是否缴清:</span
            >
            <div class="radio">
              <el-radio-group v-model="exitform.ele" @change="open">
                <el-radio label="1" border>已缴清</el-radio>
                <el-radio label="2" border>未缴清</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="item" style="display: flex; align-items: center">
            <span style="font-size: 16px; margin-right: 10px"
              >水费是否缴清:</span
            >
            <div class="radio">
              <el-radio-group v-model="exitform.water" @change="open">
                <el-radio label="1" border>已缴清</el-radio>
                <el-radio label="2" border>未缴清</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="item" style="display: flex; align-items: center">
            <span style="font-size: 16px; margin-right: 10px"
              >房租是否缴清:</span
            >
            <div class="radio">
              <el-radio-group v-model="exitform.rent" @change="open">
                <el-radio label="1" border>已缴清</el-radio>
                <el-radio label="2" border>未缴清</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>

        <el-form :model="exit" ref="exit">
          <el-form-item
            label="请选择审批人"
            prop="nextExamineUser"
            :rules="[
              {
                required: true,
                message: '请选择审批人',
              },
            ]"
          >
            <el-select v-model="exit.nextExamineUser" clearable filterable>
              <el-option
                v-for="item in nextExamineList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <span style="font-size: 18px; font-weight: 600">资产移交</span>
        <el-table :data="houseAsset" max-height="200" border>
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
          <el-table-column label="确认完好">
            <div slot-scope="scope">
              <el-checkbox
                :label="scope.row.id"
                v-model="radio"
                @change="confirmexit"
                >确认</el-checkbox
              >
            </div>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibel.removeSubmit = false"
            >取 消</el-button
          >
          <el-button
            type="primary"
            :disabled="Display"
            @click="openexit('exit')"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-dialog>
    <el-dialog center title="确认退房？" width="20%" :visible.sync="exitlog">
      <span slot="footer" class="dialog-footer">
        <el-button @click="exitlog = false" width="20%">取 消</el-button>
        <el-button type="primary" @click="exithouse" width="20%"
          >确 定</el-button
        >
      </span></el-dialog
    >
    <el-dialog
      title="入住人信息"
      width="60%"
      :visible.sync="userlog"
      v-if="userlog"
    >
      <el-table :data="userlist" border max-height="400">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="idCard" label="身份证"></el-table-column>
        <el-table-column prop="dept.allPath" label="所在部门"></el-table-column>
        <el-table-column prop="rankCode" label="职别"> </el-table-column>
        <el-table-column prop="roomId" label="入住房间">
          <div slot-scope="scope">
            <div v-if="scope.row.roomId">
              {{ scope.row.roomId + "室" }}
            </div>
          </div>
        </el-table-column>
        <el-table-column
          prop="organizationLife"
          label="工作年限"
        ></el-table-column>
        <el-table-column prop="" label="是否结婚">
          <div slot-scope="scope">
            {{ isMerryType[scope.row.marriageCode].label }}
          </div>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="审批流程" width="30%" :visible.sync="historylog" center>
      <div class="nodebox">
        <div class="flowNode" v-for="item in historylist" :key="item.id">
          <el-button
            :type="colortype[item.status]"
            style="font-size: 18px"
            @click="openNode(item)"
          >
            <div>{{ item.title }}</div>
            <div>{{ Type[item.status] }}</div>
          </el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="danger" @click="historylog = false">
          关闭</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :title="nodechilren.title"
      width="30%"
      :visible.sync="nodelog"
      v-if="nodelog === true"
    >
      <div class="nodebox" v-for="item in nodechilren.history" :key="item.id">
        <el-button :type="colortype[item.examineApprove]">
          <div
            class="title"
            :style="{
              fontSize: '16px',
              padding: '2px',
            }"
          >
          {{ item.userName ? item.userName : "审核人" }}
          </div>
          <div
            class="option"
            :style="{
              fontSize: '16px',
              padding: '2px',
            }"
          >
            {{ Type[item.examineApprove] }}
          </div>
          <div
            class="time"
            v-if="item.opinion"
            :style="{
              fontSize: '16px',
              padding: '2px',
            }"
          >
            {{ "审核意见:" + item.opinion }}
          </div>
          <div
            class="time"
            :style="{
              fontSize: '16px',
              padding: '2px',
            }"
            v-for="subitem in item.annexList"
            :key="subitem"
            @click="down(subitem)"
          >
            {{ "附件" + isubitem }}
          </div>
          <div
            class="time"
            v-if="item.annex"
            :style="{
              fontSize: '16px',
              padding: '2px',
            }"
            @click="down(item.a)"
          >
            {{ "附件:" + slice(item.annex) }}
          </div>
          <div
            class="time"
            :style="{
              fontSize: '16px',
            }"
          >
            {{ item.createTime }}
          </div>
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getHouseList,
  getHouseTree,
  getUserAppro,
  exit,
} from "@/api/house/gethouselist";
import {
  gethouseAsset,
  comfirmAsset,
  comfirmAssetexit,
} from "@/api/house/getAsset";
import { Disablebutton } from "@/utils/button";
import { getHistory, getHistoryNode } from "@/api/activite/modle";
import { getHouseExainme } from "@/api/getUser";
export default {
  watch: {
    filterText(val) {
      console.log(val);
      console.log(this.$refs.tree.filter(val));
    },
  },
  data() {
    return {
      check: "",
      user: {
        userID: this.$store.state.userinfo.userID,
        userName: this.$store.state.userinfo.userName,
      },
      dialogVisibel: {
        removeSubmit: false,
        dialogMysubmit: false,
        insidedialog: false,
      },
      total: "",
      filterText: "",
      areasearch: "",
      showDrop: false,
      showid: -1,
      data: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      activeName: "1",
      houseAll: [],
      housetype: [
        {
          lable: "集体宿舍",
          name: "1",
        },
        {
          lable: "干部交流用房",
          name: "2",
        },
        {
          lable: "临时周转用房",
          name: "3",
        },
        {
          lable: "集中工作人员用房",
          name: "4",
        },
      ],
      userlog: false,
      userlist: [],
      houseAsset: [],
      MysubmitList: [],
      type: "1",
      radio: [],
      form: {
        status: 1,
        size: 100,
        current: 1,
        houseCode: "",
      },
      exitform: {
        water: "1",
        ele: "1",
        clear: "1",
        rent: "1",
      },
      asstsid: "",
      Display: true,
      a: 0,
      exitlog: false,
      leveltype: [
        {
          label: "其他干部",
          value: "1",
        },
        {
          label: "副处级",
          value: "2",
        },
        {
          label: "正处级",
          value: "3",
        },
        {
          label: "副司级",
          value: "4",
        },
        {
          label: "正司级",
          value: "5",
        },
      ],
      isMerryType: [
        {
          label: "未婚",
          type: "0",
        },
        {
          label: "已婚",
          type: "1",
        },
        {
          label: "离异",
          type: "2",
        },
      ],
      houseSataus: [
        {
          label: "审核中",
          value: "0",
          disabled: true,
        },
        {
          label: "审核通过",
          disabled: false,
        },
        {
          label: "审核不通过",
          disabled: true,
        },
        {
          label: "资产确认完成",
          disabled: false,
        },
        {
          label: "待复审",
          disabled: false,
        },
        {
          label: "已过期",
          disabled: false,
        },
        {
          label: "已退租",
          disabled: true,
        },
        {
          label: "退租审核中",
          disabled: true,
        },
      ],
      apporform: {
        size: 10,
        current: 1,
        applicantId: this.$store.state.userinfo.userID,
      },
      apportotal: 0,
      historylist: [],
      historylog: false,
      color: ["#67C23A", "  #F56C6C", "#E6A23C"],
      Type: {
        0: "待审核",
        1: "审核通过",
        2: "经办人处理中",
        3: "审核不通过",
        4: "申请人重新提交",
        5: "部门领导复审通过",
        6: "部门领导复审不通过",
      },
      colortype: {
        0: "primary",
        1: "success",
        2: "warning",
        3: "danger",
        4: "warning",
        5: "success",
        6: "danger",
      },
      prop: {
        label: "name",
        children: "children",
        value: "id",
      },
      title: "",
      nodelog: false,
      nextExamineList: [],
      exit: {
        id: "",
        nextExamineUser: "",
      },
    };
  },
  computed: {
    housetypeList() {
      return this.houseAll.filter(
        (item) => item.propertyNatureCode == this.type
      );
    },
    fullIN() {
      return this.houseAll.filter((item) => item.bedroomNum > item.users.length)
        .length;
    },
    Notfull() {
      return this.houseAll.length - this.fullIN;
    },
  },

  methods: {
    //调用获取方法
    getData() {
      this.getaera();
      this.getHouse();
    },
    //获取地区
    getaera() {
      getHouseTree()
        .then((res) => {
          const date = res.data;
          const length = res.data.length;
          for (var i = 0; i < length; i++) {
            this.data.push(date[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //获取房间列表
    getHouse() {
      getHouseList(this.form)
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          this.total = res.data.total;
          for (var i = 0; i < length; i++) {
            this.houseAll.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //打开资产确认
    insideOpen(row) {
      this.dialogVisibel.insidedialog = true;
      this.houseAsset = [];
      this.asstsid = row.id;
      gethouseAsset(row.houseId)
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.houseAsset.push(list[i]);
          }
          console.log(this.houseAsset);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //打开我的申请
    mySubmit() {
      this.dialogVisibel.dialogMysubmit = true;
    },
    //打开退房
    removeOpen(row) {
      console.log(row);
      this.exit.id = row.id;
      if (row.id === this.asstsid) {
      } else {
        if (
          this.exitform.clear === "1" &&
          this.exitform.ele === "1" &&
          this.exitform.rent === "1" &&
          this.exitform.water === "1"
        ) {
          this.Display = false;
        }
        this.asstsid = row.id;
      }
      this.houseAsset = [];
      getHouseExainme(this.$store.state.userinfo.userCustoms)
        .then((res) => {
          console.log(res, "res");
          this.nextExamineList = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
      gethouseAsset(row.houseId)
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          this.check = length;
          for (var i = 0; i < length; i++) {
            this.houseAsset.push(list[i]);
          }
          console.log(this.houseAsset);
        })
        .catch((error) => {
          console.error(error);
        });
      this.dialogVisibel.removeSubmit = true;
    },
    open() {
      if (
        this.exitform.clear === "1" &&
        this.exitform.ele === "1" &&
        this.exitform.rent === "1" &&
        this.exitform.water === "1"
      ) {
        this.Display = false;
      } else {
        this.Display = true;
      }
    },
    //退房资产确认
    confirmexit(value) {
      // console.log(value);
      // if (value === true) {
      //   this.a = this.a + 1;
      //   console.log(this.a);
      //   if (this.a === this.check) {
      //     console.log(this.radio);
      //     this.Display = false;
      //   }
      // } else {
      //   this.a = this.a - 1;
      //   console.log(this.a);
      // }
    },
    //点击标签显示不同房间信息
    text(value) {
      console.log(value);
      this.type = value.name;
      console.log(this.type);
      console.log(this.housetypeList);
    },
    //筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    showDropDown(index) {
      this.showDrop = !this.showDrop;
      this.showid = index;
    },
    submit(data) {
      this.$router.push({
        path: "/submit-add",
        query: {
          id: data.id,
          type: data.propertyNature,
        },
      });
    },
    detile(data) {
      this.$router.push({
        path: "/pulicdtile/",
        query: {
          id: data.id,
          type: "detile",
        },
      });
    },
    //获取当前用户的申请信息
    getuserapprolist() {
      getUserAppro(this.apporform)
        .then((res) => {
          this.apportotal = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.MysubmitList.push(list[i]);
          }
          console.log(this.MysubmitList);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //确认资产
    confirm(row) {
      console.log(row);
      comfirmAsset(row.id, this.asstsid)
        .then((res) => {
          console.log(res);
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    node(value) {
      console.log(value.code);
      this.form.houseCode = value.code;
      this.houseAll = [];
      this.getHouse();
    },
    openexit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.exitlog = true;
        } else {
          return false;
        }
      });
    },
    exithouse() {
      if (
        !typeof (this.exit.nextExamineUser = [this.exit.nextExamineUser]) ===
        " array"
      ) {
        this.exit.nextExamineUser = [this.exit.nextExamineUser];
      }
      exit(this.exit)
        .then((res) => {
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
          });
          comfirmAssetexit(this.asstsid)
            .then((res) => {
              this.$notify({
                title: "成功",
                message: "操作成功",
                type: "success",
              });
              this.$router.go();
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    openuser(item) {
      this.userlist = [];
      this.userlist = item.users;
      console.log(this.userlist);
      this.userlog = true;
    },
    //入住申请详情
    userdetile(row) {
      console.log(row);
    },
    changepage(value) {
      this.apporform.current = value;
      this.MysubmitList = [];
      this.getuserapprolist();
    },
    reload(row) {
      this.$router.push({
        path: "/housereload",
        query: {
          id: row.house.id,
          type: row.house.propertyNature,
          applicantid: row.id,
        },
      });
    },
    //获取审批历史
    getHistoryList(row) {
      getHistory(row.id, row.processCode)
        .then((res) => {
          this.historylist = res.data;
          this.historylog = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //打开节点详情
    openNode(item) {
      this.nodechilren = item;
      this.nodelog = true;
    },
  },
  //初始化user获取当前用户的信息
  created() {},
  mounted() {
    this.getData();
    this.getuserapprolist();
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
  .topContainer {
    display: flex;
    width: calc(100% - 100px);
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    .solt {
      display: flex;
      align-items: center;
      .solt-item {
        display: flex;
        align-items: center;
        .solt-item-title {
          margin-right: 20px;
        }
      }
    }
  }
  .mainContainer {
    display: flex;
    width: calc(100% - 100px);
    margin-top: 20px;
    .areaContainer {
      background: #3168b6;
      width: calc(100vw / 4);
      height: calc(100vh - 160px);
      border-radius: 20px;
      margin-right: 15px;
      .area-search {
        .el-input {
          margin-top: 20px;
          width: calc(100% / 1.1);
        }
        margin-bottom: 20px;
      }
      .area-select {
        overflow-x: hidden;
        overflow-y: scroll;
        height: calc(100vh - 250px);
        .el-tree {
          background-color: rgb(236, 245, 255);
        }
        ::v-deep
          .el-tree--highlight-current
          .el-tree-node.is-current
          > .el-tree-node__content {
          // 设置颜色
          background-color: rgba(
            135,
            206,
            235,
            0.2
          ); // 透明度为0.2的skyblue，作者比较喜欢的颜色
          color: #409eff; // 节点的字体颜色
          font-weight: bold; // 字体加粗
        }
      }
    }
    .main-leftContainer {
      width: 100%;
      .houseContainer {
        width: calc(100%);
        height: calc(100vh - 210px);
        background-color: rgb(236, 245, 255);
        display: flex;
        flex-wrap: wrap;
        overflow-y: scroll;
        align-content: flex-start;
        .houseBox {
          margin: 20px;
          width: 170px;
          .houseItem,
          .active {
            height: 170px;
            width: 170px;
            background: #3168b656;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border-radius: 10px;
            .title {
              text-align: left;
              font-size: 18px;
              color: #000;
            }
            .Num {
              text-align: center;
              font-size: 30px;
              color: #000;
            }
            .footer {
              text-align: right;
              font-size: 18px;
              color: #000;
              .active {
                color: #3168b6;
              }
            }
          }
          .active {
            background: #14e74256;
          }
          .dropDown {
            transition: all inherit 0.3s;
            width: 170px;
            .el-button {
              width: 170px;
            }
          }
        }
      }
    }
  }
  .el-dialog {
    .nodebox {
      width: 100%;
      display: flex;
      margin-top: 5px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .flowNode {
        width: 80%;
        padding: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .el-button {
          width: 70%;
        }
      }
      .el-button {
        width: 70%;
      }
    }
  
  }
}
</style>