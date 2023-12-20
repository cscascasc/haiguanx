<template>
  <div class="container">
    <div class="top-container">
      <div class="back">
        <el-button @click="topath" type="primary"> 返回 </el-button>
      </div>
      <div class="title">{{ title }}</div>
    </div>
    <div class="form">
      <el-form :model="houseform" inline disabled>
        <div class="solt">房屋信息</div>
        <div class="formitem">
          <el-form-item label="所属地区：">
            <el-input v-model="houselist.house.cityName"></el-input>
          </el-form-item>
          <el-form-item label="小区名称：">
            <el-input v-model="houselist.house.houseEstate"></el-input>
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="楼栋/单元：">
            <el-input v-model="houselist.house.unit"></el-input>
          </el-form-item>
          <el-form-item label="房号：">
            <el-input v-model="houselist.house.roomNumber"></el-input>
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="房屋面积：">
            <el-input v-model="houselist.house.allArea"></el-input>
          </el-form-item>
          <el-form-item label="实际使用面积：">
            <el-input v-model="houselist.house.actualArea"></el-input>
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="公摊使用面积：">
            <el-input v-model="houselist.house.shareArea"></el-input>
          </el-form-item>
          <el-form-item label="户型：">
            <el-input
              :value="
                houselist.house.bedroomNum +
                '室' +
                houselist.house.parlorNum +
                '厅' +
                houselist.house.toiletNum +
                '卫'
              "
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="房屋性质：">
            <el-input v-model="houselist.house.propertyNature"></el-input>
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="产权人：">
            <el-input v-model="houselist.house.propertyOwner"></el-input>
          </el-form-item>
          <el-form-item label="房产证：">
            <el-input v-model="houselist.house.certificateTitle"></el-input>
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="租金计算周期：">
            <el-input
              :value="rentType[houselist.house.houseDetails.rentCycleCode]"
            ></el-input>
          </el-form-item>
          <el-form-item label="房屋租金：">
            <el-input
              :value="houselist.house.houseDetails.rentUnitPrice"
            ></el-input>
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="水表号：">
            <el-input
              :value="houselist.house.houseDetails.waterMeter"
            ></el-input>
          </el-form-item>
          <el-form-item label="电表号：">
            <el-input
              :value="houselist.house.houseDetails.electricMeter"
            ></el-input>
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="宽带号：">
            <el-input
              :value="houselist.house.houseDetails.broadbandMeter"
            ></el-input>
          </el-form-item>
        </div>
        <div class="solt">房屋资产</div>
        <el-table border :data="assislist">
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
        </el-table>
        <div class="solt">申请信息</div>
        <div class="formitem">
          <el-form-item label="姓名：">
            <el-input :value="houselist.name"></el-input>
          </el-form-item>
          <el-form-item label="职位：">
            <el-input
              :value="rankType[houselist.rankCode - 1].dictLabel"
            ></el-input>
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="身份证号：">
            <el-input :value="houselist.idCard"></el-input>
          </el-form-item>
          <el-form-item label="工作年限：">
            <el-input :value="houselist.organizationLife + '年'"></el-input>
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="性别：">
            <el-input :value="sexlist[houselist.sex]"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-input :value="houselist.phone"></el-input>
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="紧急联系人：">
            <el-input :value="houselist.contactsName"></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人电话：">
            <el-input :value="houselist.contactsPhone"></el-input>
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="入住房间：">
            <el-input :value="houselist.roomId + '室'"></el-input>
          </el-form-item>
          <el-form-item label="入住周期：">
            <el-input :value="houselist.stayCycle"></el-input>
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="办理形式：">
            <el-input :value="houselist.handleType"></el-input>
          </el-form-item>
          <el-form-item label="婚姻情况：">
            <el-input :value="isMerry[houselist.marriageCode]"></el-input>
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="本人及家庭成员工作地是否购买或承租保障性住房：">
            <el-input :value="isTrue[houselist.existPurchase]"></el-input>
          </el-form-item> 
        </div>
        <div class="formitem">
          <el-form-item label="申请说明">
            <el-input type="textarea" :value="houselist.explains"></el-input>
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="备注">
            <el-input type="textarea" :value="houselist.notes"></el-input>
          </el-form-item>
        </div>
        <div
          :style="{
            width: '100%',
          }"
        >
          <el-table
            border
            v-if="this.houselist.marriageCode !== 0"
            :data="this.houselist.marriageProveList"
            style="width: 200px"
          >
            <el-table-column label="附件">
              <div slot-scope="scope">
                {{ slice(scope.row) }}
              </div>
            </el-table-column>
            <el-table-column label="操作">
              <div slot-scope="scope">
                <el-button
                  type="text"
                  @click="down(scope.row)"
                  :disabled="false"
                  >下载附件</el-button
                >
              </div>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
    </div>
    <div class="confirmform" v-if="tastStatus !== 3">
      <div class="solt">审批</div>
      <el-form :model="data" ref="data">
        <el-form-item
          label="审批："
          prop="judge"
          :rules="[
            {
              required: true,
              message: '请审批',
            },
          ]"
          v-if="confirmstatus !== 2"
        >
          <el-radio-group v-model="data.judge">
            <el-radio :label="0">通过</el-radio>
            <el-radio :label="1">拒绝</el-radio>
            <el-radio :label="2" v-if="isMutile">处理</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="
            data.judge === 0 &&
            nodeName !== 'countersigning_by_the_leadership_group'
          "
          :label="item.name + ' 审批人：'"
          v-for="(item, index) in dictUser"
          :key="index"
          prop="nextExamineUser"
          :rules="[
            {
              required: data.judge === 0,
              message: '请选择审批人',
            },
          ]"
        >
          <el-select
            v-model="value[index]"
            clearable
            filterable
            @change="nextExamine(value, index)"
          >
            <el-option
              v-for="subitem in item.user"
              :key="subitem.id"
              :label="subitem.name"
              :value="subitem.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <div v-if="data.judge === 0 && deptId === proformDeptId">
          <el-form-item
            :label="item.name + ' 审批人：'"
            v-for="(item, index) in dictUser"
            :key="index"
            prop="nextExamineUser"
            :rules="[
              {
                required: data.judge === 0,
                message: '请选择审批人',
              },
            ]"
          >
            <el-select
              v-model="value[index]"
              clearable
              filterable
              @change="nextExamine(value, index)"
            >
              <el-option
                v-for="subitem in item.user"
                :key="subitem.id"
                :label="subitem.name"
                :value="subitem.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="协作人：" v-if="data.judge === 2">
          <el-select v-model="data.handleIds" multiple filterable>
            <el-option
              v-for="item in handleUser"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            >
              {{ item.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="抄送人：" v-if="data.judge === 0">
          <el-cascader
            v-model="deptvalue"
            filterable
            clearable
            placeholder="请选择抄送人部门"
            :options="deptlist"
            :props="prop"
            @change="changeDeptUser"
          >
          </el-cascader>
          <el-select
            v-model="data.ccUserList"
            multiple
            filterable
            placeholder="请选择抄送人"
          >
            <el-option
              v-for="item in deptUser"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            >
              {{ item.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="说明："
          prop="opinion"
          :rules="[
            {
              required: data.judge === 1,
              message: '请填写说明',
            },
          ]"
        >
          <el-input
            v-model="data.opinion"
            type="textarea"
            show-word-limit
            maxlength="600"
            :autosize="{ minRows: 5 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="上传附件：">
          <el-upload
            class="uploademo"
            drag
            :http-request="handleimgup"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
          <em>请上传PDF、WORD、JPG文件</em>
        </el-form-item>
        <el-form-item label="附件列表：">
          <el-table :data="urllist" style="width: 700px" border>
            <el-table-column prop="name" label="附件名称">
              <div slot-scope="scope">
                {{ slice(scope.row.name) }}
              </div>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope" v-if="scope">
                <el-button type="text" @click="down(scope.row)"
                  >点击查看附件</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="办理流程:">
          <el-button @click="historylog = true">点击查看办理流程</el-button>
        </el-form-item>
      </el-form>
      <el-button size="lager" type="primary" @click="submit('data')"
        >提交审核</el-button
      >
      <el-button
        v-if="data.judge === 1"
        size="lager"
        type="danger"
        @click="nodeBack('data')"
        >驳回</el-button
      >
    </div>
    <div class="confirmform" v-if="tastStatus === 3">
      <div class="solt">审批</div>
      <el-form :model="data" ref="data">
        <el-form-item
          label="审批："
          prop="judge"
          :rules="[
            {
              required: true,
              message: '请审批',
            },
          ]"
          v-if="confirmstatus !== 2"
        >
          <el-radio-group v-model="data.judge">
            <el-radio :label="5">通过</el-radio>
            <el-radio :label="6">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="说明："
          prop="opinion"
          :rules="[
            {
              required: data.judge === 6,
              message: '请填写说明',
            },
          ]"
        >
          <el-input
            v-model="data.opinion"
            type="textarea"
            show-word-limit
            maxlength="600"
            :autosize="{ minRows: 5 }"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button size="lager" type="primary" @click="resubmit('data')"
        >提交审核</el-button
      >
    </div>
    <el-dialog title="审批流程" width="30%" :visible.sync="historylog" center>
      <div class="nodebox">
        <div class="flowNode" v-for="item in historylist" :key="item.id">
          <el-button
            :type="colortype[item.status]"
            style="font-size: 18px"
            @click="nodelog = !nodelog"
          >
            <div>{{ item.title }}</div>
            <div>{{ type[item.status] }}</div>
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
              <el-button
                :type="
                  subitem.examineApprove === 0
                    ? 'success'
                    : 'danger' && subitem.examineApprove === 1
                    ? 'danger'
                    : 'warning'
                "
              >
                <div
                  class="title"
                  :style="{
                    fontSize: '16px',
                  }"
                >
                  审核人
                </div>
                <div
                  class="option"
                  :style="{
                    fontSize: '16px',
                  }"
                >
                  {{
                    subitem.examineApprove === 0
                      ? "通过"
                      : "不通过" && subitem.examineApprove === 1
                      ? "不通过"
                      : "处理"
                  }}
                </div>
                <div
                  class="time"
                  v-if="subitem.opinion"
                  :style="{
                    fontSize: '16px',
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
                  }"
                >
                  {{ subitem.createTime }}
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
    <!-- <el-dialog :title="nodechilren.title" width="30%" :visible.sync="nodelog">
    </el-dialog> -->
  </div>
</template>

<script>
import {
  gethouseApproList,
  getUserauditList,
  getApprodetile,
} from "@/api/house/gethouselist";
import { getdict } from "@/api/dict/getdict";
import { getHistory, getHistoryNode } from "@/api/activite/modle";
import { exprocure, reject, reAppor } from "@/api/procure/getprocure";
import { gethouseAsset } from "@/api/house/getAsset";
import {
  getdeptUser,
  getdept,
  getAlldept,
  findDeptUser,
} from "@/api/dept/getdept";
import http from "@/utils/request";
import { getModle } from "@/api/download/download";
export default {
  data() {
    return {
      title: "住房审批",
      data: {
        judge: null,
        relatedId: null,
        userId: this.$store.state.userinfo.userID,
        handleIds: [],
        projectNum: null,
        contractNum: null,
        opinion: null,
        annex: null,
        ccUserList: [],
        nextExamineUser: [],
      },
      id: "",
      processCode: "",
      houselist: [],
      rentType: {
        1: "月",
        2: "季",
        3: "年",
      },
      rankType: [],
      isMerry: {
        0: "未婚",
        1: "已婚",
        2: "离异",
      },
      isTrue: {
        false: "否",
        true: "是",
      },
      assislist: [],
      dictUser: [],
      urllist: [],
      color: ["#67C23A", "  #F56C6C", "#E6A23C"],
      type: {
        0: "待审核",
        1: "审核通过",
        2: "经办人处理中",
        3: "审核不通过",
        4: "审核不通过",
        5: "部门领导复审通过",
      },
      colortype: {
        0: "primary",
        1: "success",
        2: "warning",
        3: "danger",
        4: "danger",
        5: "success",
      },
      prop: {
        label: "name",
        children: "children",
        value: "id",
      },
      houseform: {},
      nodechilren: [],
      deptlist: [],
      nodelog: true,
      deptUser: [],
      historylog: false,
      value: {},
      handleUser: [],
      url: [],
      nextTitle: "",
      nodeName: "",
      deptId: "",
      tastStatus: "",
      proformDeptId: "",
      isMutile: true,
      sexlist: ["男", "女"],
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.processCode = this.$route.query.processCode;
  },
  methods: {
    //获取房间信息
    gethousedetile() {
      getApprodetile(this.id)
        .then((res) => {
          this.houselist = res.data;
          this.data.relatedId = this.houselist.id;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //获取字典值
    getDict() {
      getdict("rank_type")
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.rankType.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getAlldept()
        .then((res) => {
          console.log("ssss");
          this.deptlist.push(res.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //获取房屋资产
    getAsset() {
      gethouseAsset(this.id).then((res) => {
        const list = res.data.records;
        const length = list.length;
        for (var i = 0; i < length; i++) {
          this.assislist.push(list[i]);
        }
        console.log(this.assislist);
      });
    },
    //上传附件
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
          this.data.annex = this.url.join(",");
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
    //获取审批节点信息
    async getProcure() {
      await getHistoryNode(this.id).then((res) => {
        console.log(res);
        this.title = res.data.title;
        this.confirmstatus = res.data.status;
        this.gethandleUser(this.$store.state.userinfo.userdepartment);
        this.getdictlist(res.data.nodeSort);
        this.nodeName = res.data.nodeId;
        this.data.contractNum = res.data.contractNum;
        this.tastStatus = res.data.status;
        if (res.data.performDeptId) {
          this.proformDeptId = res.data.performDeptId;
          this.isMutile = false;
        }
        if (this.tastStatus === 3) {
          this.title = "重新提交";
        }
      });
      this.deptId = this.$store.state.userinfo.userdepartment;
      this.data.userId = this.$store.state.userinfo.userID;
    },
    //获取该员工部门
    getdictlist(path) {
      getHistory(this.id, this.processCode)
        .then((res) => {
          this.historylist = res.data;
          this.getfile(this.historylist);
          for (var i = 0; i < res.data.length; i++) {
            if (path + 1 === res.data[i].nodeSort) {
              console.log(res.data[i].title, res.data[i].deptList);
              this.getdictuserlist(res.data[i].deptList);
              this.nextTitle = res.data[i].title;
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
      // const path = this.$store.state.userinfo.userdepartment;
      //   getdeptUser()
      //     .then((res) => {
      //       console.log("111", res);
      //       const list = res.data;
      //       const length = list.length;
      //       for (var i = 0; i < length; i++) {
      //         this.dictUser.push(list[i]);
      //       }
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
    },
    //获取该部门下员工
    async getdictuserlist(array) {
      console.log(array);
      for (var i = 0; i < array.length; i++) {
        await getdeptUser(array[i].id)
          .then((res) => {
            console.log(array[i], "1111");
            this.dictUser.push({
              name: array[i].splitDept,
              user: res.data,
            });
            console.log(this.dictUser, "w");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    //提取文件
    getfile(array) {
      this.urllist = [];
      for (var i = 0; i < array.length; i++) {
        if (array[i].annexList) {
          for (var j = 0; j < array[i].annexList.length; j++) {
            this.urllist.push({
              name: array[i].annexList[j],
            });
          }
        }
      }
      console.log(this.urllist);
    },
    //打开节点详情
    openNode(item) {
      this.nodechilren = item;
      this.nodelog = true;
    },
    async changeDeptUser(value) {
      const array = [];
      const list = value;
      const length = list.length;
      for (var i = 0; i < length; i++) {
        array.push(list.slice(-1));
      }
      for (var i = 0; i < array.length; i++) {
        await getdeptUser(array[i][0])
          .then((res) => {
            this.deptUser = [];
            const userlist = res.data;
            const length = userlist.length;
            for (var i = 0; i < length; i++) {
              this.deptUser.push(userlist[i]);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    submit(forName) {
      this.$refs[forName].validate((valid) => {
        if (valid) {
          this.$confirm("确认是否提交审核", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
          })
            .then(() => {
              this.removeEmptyArrays(this.data);
              console.log(this.data);
              exprocure(this.data)
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
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    removeEmptyArrays(object) {
      var aarry = Array;
      for (let key in object) {
        if (aarry.isArray(object[key]) && object[key].length === 0) {
          delete object[key];
        }
        if (object[key] === null || object[key] === "") {
          delete object[key];
        }
      }
    },
    nextExamine(value, index) {
      console.log(value, index);
      if (value[index]) {
        if (!this.data.nextExamineUser[index]) {
          this.data.nextExamineUser.push(value[index]);
          console.log(this.data.nextExamineUser, "1");
        } else {
          this.data.nextExamineUser[index] = value[index];
          console.log(this.data.nextExamineUser, "2");
        }
      } else {
        this.data.nextExamineUser.splice(index);
        console.log(this.data.nextExamineUser, "3");
      }
      //   this.data.nextExamineUser.push(value);
    },
    //返回
    topath() {
      this.$router.back();
    },
    //获取协作人
    gethandleUser(path) {
      getdeptUser(path)
        .then((res) => {
          const list = res.data;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.handleUser.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    slice(row) {
      console.log(row, "row");
      const index = row.lastIndexOf("/");
      const text = row.substr(index + 1);
      console.log(text, "row");
      return text;
    },
    down(row) {
      getModle(row.name || row);
    },
    //驳回
    nodeBack(data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          this.$confirm("确认是否驳回到申请人", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
          })
            .then(() => {
              this.removeEmptyArrays(this.data);
              delete this.data.judge;
              console.log(this.data);
              reject(this.data)
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
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    //重新审核
    resubmit(data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          this.$confirm("确认是否提交复审", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
          })
            .then(() => {
              this.removeEmptyArrays(this.data);
              reAppor(this.data)
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
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
  },
  mounted() {
    this.gethousedetile();
    this.getDict();
    this.getAsset();
    this.getProcure();
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
    width: 70%;
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
  .form {
    width: 70%;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;

    ::v-deep .el-form--inline .el-form-item {
      display: flex;
    }
    .el-form {
      width: 95%;
      height: 100%;
      overflow-y: scroll;
      .solt {
        display: flex;
        font-size: 20px;
        color: #000;
        font-weight: 600;
        margin-bottom: 10px;
      }
      ::v-deep .el-form-item__label {
        color: #000;
        font-size: 16px;
      }
      ::v-deep .el-input.is-disabled .el-input__inner {
        color: #000;
      }
      ::v-deep .el-input__inner::placeholder {
        color: #000;
      }
      ::v-deep .el-textarea.is-disabled .el-textarea__inner {
        color: #000;
      }
      .el-textarea {
        width: 1000px;
      }

      .formitem {
        display: flex;
        width: 85%;
        justify-content: space-between;
        ::v-deep .el-form-item__label {
          color: #000;
          font-size: 16px;
          width: 130px;
          margin: 0px;
          text-align: left;
        }

        .el-form-item {
          display: flex;
          margin-right: 5px;
          align-items: flex-end;
          .el-input,
          .el-select {
            width: 350px;
          }
        }
      }
    }
    .openbutton {
      opacity: 0;
      transition: all 0.3s;
    }
    .openbutton:hover {
      opacity: 100;
    }
  }
  .confirmform {
    width: 70%;
    padding: 10px;
    max-height: 200vh;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    .solt {
      display: flex;
      font-size: 20px;
      color: #000;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .el-form {
      display: flex;
      flex-direction: column;
      .el-form-item {
        width: 100%;
        display: flex;
        justify-content: left;

        .el-select,
        .el-cascader,
        .el-input {
          width: calc(100vw / 2);
          display: block;
        }
        ::v-deep .el-textarea__inner {
          width: calc(100vw / 2);
        }
      }
      ::v-deep .el-form-item__label {
        width: 10%;
        font-size: 18px;
        text-align: left;
      }
      ::v-deep .el-radio__label {
        font-size: 18px;
      }
      //   .el-input {
      //     width: calc(100vw / 3.7);
      //   }
      //   ::v-deep .el-textarea__inner {
      //     width: calc(100vw / 3.7);
      //   }
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
          ::v-deep .el-textarea__inner {
            background-color: transparent;
            border: none;
            color: #fff;
            font-size: 16px;
            font-weight: 400;
          }
        }
      }
    }
    .el-button {
      width: 70%;
    }
  }
}
</style>