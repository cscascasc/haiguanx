<template>
  <div class="contianer">
    <div class="table">
      <el-table :data="MysubmitList" border max-height="600">
        <el-table-column
          prop="name"
          label="入住人"
          width="100px"
          fixed="left"
          align="center"
        ></el-table-column>
        <el-table-column label="门牌号" width="100px" align="center">
          <div slot-scope="scope">
            {{ scope.row.house.roomNumber }}
          </div>
        </el-table-column>
        <el-table-column label="小区/楼栋/单元" width="130px" align="center">
          <div slot-scope="scope">
            {{ scope.row.house.houseEstate + scope.row.house.unit }}
          </div>
        </el-table-column>
        <el-table-column prop="provinceName" label="归属地" align="center">
        </el-table-column>
        <el-table-column label="房屋性质" align="center">
          <div slot-scope="scope">
            {{ scope.row.house.propertyNature }}
          </div>
        </el-table-column>
        <el-table-column label="房屋面积" align="center">
          <div slot-scope="scope">
            {{ scope.row.house.allArea }}
          </div>
        </el-table-column>
        <el-table-column label="实际使用面积" width="120px" align="center">
          <div slot-scope="scope">
            {{ scope.row.house.actualArea }}
          </div>
        </el-table-column>
        <el-table-column label="公摊使用面积" width="120px" align="center">
          <div slot-scope="scope">
            {{ scope.row.house.shareArea }}
          </div>
        </el-table-column>
        <el-table-column label="户型" align="center">
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
        <el-table-column
          prop="roomId"
          label="房间号"
          align="center"
        ></el-table-column>
        <el-table-column label="状态" align="center">
          <div slot-scope="scope">
            {{ houseSataus[scope.row.status].label }}
          </div>
        </el-table-column>
        <el-table-column prop="stayCycle" label="申请时间" align="center">
        </el-table-column>

        <el-table-column label="操作" width="100%" fixed="right" align="center">
          <div
            slot-scope="scope"
            :style="{
              display: 'flex',
              flexDirection: 'column',
            }"
          >
            <el-button type="text" size="small" @click="Mydetile(scope.row)"
              >房间详情</el-button
            >

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
        layout="total,prev, pager, next"
        :total="apportotal"
        :page-size="size"
        @prev-click="changepage"
        @next-click="changepage"
        @current-change="changepage"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="退房"
      :visible.sync="dialogVisibel.removeSubmit"
      append-to-body
      width="60%"
    >
      <span style="font-size: 18px; font-weight: 600">房屋情况</span>
      <div class="housedetile" style="margin-top: 20px; margin-bottom: 10px">
        <div class="item" style="display: flex; align-items: center">
          <span style="font-size: 16px; margin-right: 10px">房屋是否清洁:</span>
          <div class="radio">
            <el-radio-group v-model="exitform.clear" @change="open">
              <el-radio label="1" border>已清洁</el-radio>
              <el-radio label="2" border>未清洁</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item" style="display: flex; align-items: center">
          <span style="font-size: 16px; margin-right: 10px">电费是否缴清:</span>
          <div class="radio">
            <el-radio-group v-model="exitform.ele" @change="open">
              <el-radio label="1" border>已缴清</el-radio>
              <el-radio label="2" border>未缴清</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item" style="display: flex; align-items: center">
          <span style="font-size: 16px; margin-right: 10px">水费是否缴清:</span>
          <div class="radio">
            <el-radio-group v-model="exitform.water" @change="open">
              <el-radio label="1" border>已缴清</el-radio>
              <el-radio label="2" border>未缴清</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item" style="display: flex; align-items: center">
          <span style="font-size: 16px; margin-right: 10px">房租是否缴清:</span>
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
        <el-button @click="dialogVisibel.removeSubmit = false">取 消</el-button>
        <el-button type="primary" :disabled="Display" @click="openexit('exit')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog center title="确认退房？" width="20%" :visible.sync="exitlog">
      <span slot="footer" class="dialog-footer">
        <el-button @click="exitlog = false" width="20%">取 消</el-button>
        <el-button type="primary" @click="exithouse" width="20%"
          >确 定</el-button
        >
      </span></el-dialog
    >
    <el-dialog title="审批流程" width="30%" :visible.sync="historylog" center>
      <div class="nodebox">
        <div class="flowNode" v-for="item in historylist" :key="item.id">
          <el-button
            :type="colortype[item.status]"
            style="font-size: 18px"
            @click="nodelog = !nodelog"
          >
            <div>{{ item.title }}</div>
            <div>{{ Type[item.status] }}</div>
          </el-button>
          <div
            v-if="item.history && nodelog"
            :style="{
              width: '100%',
            }"
          >
            <div
              class="nodeboxchildren"
              v-for="subitem in item.history"
              :key="subitem.id"
            >
              <el-button :type="colortype[subitem.examineApprove]">
                <div
                  class="title"
                  :style="{
                    fontSize: '16px',
                    padding: '2px',
                  }"
                >
                  <span :title="`${subitem.userName}(${subitem.userDept})`">
                    {{
                      subitem.userName
                        ? subitem.userName + "(" + subitem.userDept + ")"
                        : "审核人"
                    }}
                  </span>
                </div>
                <div
                  class="option"
                  :style="{
                    fontSize: '16px',
                    padding: '2px',
                  }"
                >
                  {{
                    "审核意见" + Type[subitem.examineApprove]
                      ? Type[subitem.examineApprove]
                      : ""
                  }}
                </div>
                <div
                  class="time"
                  v-if="subitem.opinion"
                  :style="{
                    fontSize: '16px',
                    padding: '2px',
                  }"
                >
                  <el-input
                    v-model="subitem.opinion"
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 5 }"
                    disabled
                  ></el-input>
                </div>
                <div
                  class="time"
                  :style="{
                    fontSize: '16px',
                    padding: '2px',
                  }"
                  v-for="bitem in subitem.annexList"
                  :key="bitem"
                  @click="down(bitem)"
                >
                  {{ "附件" + bitem }}
                </div>
                <div
                  class="time"
                  v-if="subitem.annex"
                  :style="{
                    fontSize: '16px',
                    padding: '2px',
                  }"
                  @click="down(subitem.a)"
                >
                  {{ "附件:" + slice(subitem.annex) }}
                </div>
                <div
                  class="time"
                  :style="{
                    fontSize: '16px',
                  }"
                >
                  {{ subitem.createTime }}
                </div>
              </el-button>
            </div>
          </div>
          <div
            :style="{
              width: '90%',
            }"
            v-if="item.currentNodeUserMap && nodelog"
          >
            <div
              class="nodeboxchildren"
              v-for="subitem in item.currentNodeUserMap"
              :key="subitem.id"
            >
              <el-button type="primary">
                <div
                  class="title"
                  :style="{
                    fontSize: '16px',
                    padding: '2px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }"
                >
                  <span :title="`${subitem.user}(${subitem.dept})`">
                    {{
                      subitem.user
                        ? subitem.user + "(" + subitem.dept + ")"
                        : "审核人"
                    }}
                  </span>
                </div>
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="danger" @click="historylog = false">
          关闭</el-button
        >
      </span>
    </el-dialog>
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
  </div>
</template>

<script>
import { getHistory, getHistoryNode } from "@/api/activite/modle";
import {
  gethouseAsset,
  comfirmAsset,
  comfirmAssetexit,
} from "@/api/house/getAsset";
import {
  getHouseList,
  getHouseTree,
  getUserAppro,
  exit,
} from "@/api/house/gethouselist";
import { getHouseExainme } from "@/api/getUser";
export default {
  data() {
    return {
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
      user: {
        userID: this.$store.state.userinfo.userID,
        userName: this.$store.state.userinfo.userName,
      },
      MysubmitList: [],
      apportotal: 0,
      size: 10,
      current: 1,
      applicantId: this.$store.state.userinfo.userID,
      historylog: false,
      colortype: {
        0: "primary",
        1: "success",
        2: "warning",
        3: "danger",
        4: "warning",
        5: "success",
        6: "danger",
      },
      Type: {
        0: "待审核",
        1: "审核通过",
        2: "经办人处理中",
        3: "审核不通过",
        4: "申请人重新提交",
        5: "部门领导复审通过",
        6: "部门领导复审不通过",
      },
      nodelog: true,
      dialogVisibel: {
        removeSubmit: false,
        dialogMysubmit: false,
        insidedialog: false,
      },
      exitform: {
        water: "1",
        ele: "1",
        clear: "1",
        rent: "1",
      },
      exitlog: false,
      nextExamineList: [],
      exit: {
        id: "",
        nextExamineUser: "",
      },
    };
  },
  mounted() {
    this.getuserapprolist();
  },
  methods: {
    //获取当前用户的申请信息
    getuserapprolist() {
      let form = {
        size: this.size,
        current: this.current,
        applicantId: this.applicantId,
      };
      getUserAppro(form)
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
    changepage(value) {
      this.apporform.current = value;
      this.MysubmitList = [];
      this.getuserapprolist();
    },

    Mydetile(data) {
      this.$router.push({
        path: "/pulicdtile/",
        query: {
          id: data.house.id,
          type: "detile",
        },
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
    // 重新提交
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
    openexit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.exitlog = true;
        } else {
          return false;
        }
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
  },
};
</script>

<style lang="scss" scoped>
.contianer {
  color: #000;
  height: calc(100vh - 60px);
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  .table {
    .el-table {
      margin-bottom: 10px;
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
      .flowNode,
      .nodeboxchildren {
        width: 80%;
        padding: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .el-button {
          width: 90%;
        }
      }
      .nodeboxchildren {
        width: 100%;
        opacity: 0.8;
        .el-button {
          width: 80%;
        }
        .time {
          width: 100%;
          margin-top: 4px;
          ::v-deep .el-textarea__inner {
            background-color: transparent;
            border: none;
            color: #fff;
            font-size: 16px;
            font-weight: 400;
          }
        }
      }
      .el-button {
        width: 70%;
      }
    }
  }
}
</style>