<template>
  <div class="container">
    <div class="top-container">
      <div class="back">
        <el-button @click="topath" type="primary"> 返回 </el-button>
      </div>
      <div class="title">{{ title }}</div>
    </div>
    <div class="form" v-if="detilelist">
      <el-form
        :model="detilelist"
        ref="formlist"
        inline
        disabled
        :style="{
          height: height,
        }"
      >
        <div class="solt">采购申请</div>
        <div class="formitem">
          <el-form-item label="采购项目名称:">
            <el-input v-model="detilelist.name"></el-input>
          </el-form-item>
          <el-form-item label="采购类型:">
            <el-select
              v-model="formlist.procureType"
              :placeholder="procureType[detilelist.procureType].dictLabel"
            >
              <el-option
                v-for="item in procureType"
                :key="item.dictLabel"
                :label="item.dictLabel"
                :value="item.dictValue"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="采购类别：">
            <el-select
              v-model="formlist.procureCategory"
              :placeholder="
                procureCategory[detilelist.procureCategory].dictLabel
              "
            >
              <el-option
                v-for="item in procureCategory"
                :key="item.dictLabel"
                :label="item.dictLabel"
                :value="item.dictValue"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="采购方式：" prop="procureWay">
            <el-select
              v-model="formlist.procureWay"
              :placeholder="procureWay[detilelist.procureWay].dictLabel"
            >
              <el-option
                v-for="item in procureWay"
                :key="item.dictLabel"
                :label="item.dictLabel"
                :value="item.dictValue"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="预算金额：">
            <el-input v-model="detilelist.budgetAmount" type="number">
              <i slot="suffix" style="font-size: 12px">万元</i></el-input
            >
          </el-form-item>
          <el-form-item label="履约保证金：">
            <el-input v-model="detilelist.earnestMoney" type="number">
              <i slot="suffix" style="font-size: 12px">%</i></el-input
            >
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="付款方式：">
            <el-input v-model="detilelist.paymentType"> </el-input>
          </el-form-item>
          <el-form-item label="需求部门">
            <el-select v-model="detilelist.dept.name" disabled></el-select>
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="联系人">
            <el-input v-model="detilelist.contacts"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input
              v-model="detilelist.phone"
              type="number"
              maxlength="11"
            ></el-input>
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="委托机构" v-if="detilelist.procureWay == 0">
            <el-input v-model="detilelist.purchaseUnit"></el-input>
          </el-form-item>
          <el-form-item label="合同编号" v-if="detilelist.contractNum">
            <el-input v-model="detilelist.contractNum"></el-input>
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="项目编号" v-if="detilelist.projectNum">
            <el-input v-model="detilelist.projectNum"></el-input>
          </el-form-item>
        </div>
        <div class="solt">服务要求</div>
        <el-form-item label="售后服务：">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4 }"
            show-word-limit
            maxlength="500"
            v-model="detilelist.afterService"
          ></el-input>
        </el-form-item>
        <el-form-item label="技术要求:">
          <el-input
            type="textarea"
            v-model="detilelist.procureDetails.technicalRequirement"
            :autosize="{ minRows: 4 }"
            show-word-limit
            maxlength="500"
          ></el-input>
        </el-form-item>
        <el-form-item label="商务要求:">
          <el-input
            type="textarea"
            v-model="detilelist.procureDetails.businessRequirement"
            :autosize="{ minRows: 4 }"
            show-word-limit
            maxlength="500"
          ></el-input>
        </el-form-item>
        <el-form-item label="其他要求：">
          <el-input
            type="textarea"
            v-model="detilelist.procureDetails.otherRequirement"
            :autosize="{ minRows: 4 }"
            show-word-limit
            maxlength="500"
          ></el-input>
        </el-form-item>
        <div class="solt">附件</div>
        <el-form-item>
          <el-table
            :data="detilelist.annexList"
            border
            max-height="200px"
            style="width: 300px"
          >
            <el-table-column label="附件名">
              <template slot-scope="scope">
                {{ slice(scope.row) }}
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="down(scope.row)"
                  :disabled="false"
                  >查看附件</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <div
        class="openbutton"
        :style="{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }"
      >
        <el-button
          :style="{
            width: '100%',
          }"
          @click="open"
          :icon="height === '120vh' ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
        ></el-button>
      </div>
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
          v-if="confirmstatus !== 2 && confirmstatus !== 8"
        >
          <el-radio-group v-model="data.judge">
            <el-radio :label="0">通过</el-radio>
            <el-radio :label="1">拒绝</el-radio>
            <el-radio :label="2">处理</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="关联合同:"
          v-if="
            nodeName === 'completion_contract_signing' && confirmstatus === 2
          "
        >
          <el-input
            v-model="data.contractNum"
            placeholder="请输入合同"
          ></el-input>
        </el-form-item>
        <div
          v-if="
            data.judge === 0 ||
            (nodeName === 'announcement_of_bidding' && data.judge === 2) ||
            (nodeName === 'announcement_of_award' && data.judge === 2)
          "
          class="examine"
        >
          <div v-for="btem in nextTitle" :key="btem.name">
            <el-form-item
              :label="btem.name + '部门审批人：'"
              v-for="(item, index) in ExamineUser"
              :key="index"
              prop="nextExamineUser"
              :rules="{
                required: data.judge === 0,
                message: '请选择审批人',
              }"
            >
              <el-select v-model="data.nextExamineUser" clearable filterable>
                <el-option
                  v-for="subitem in item"
                  :key="subitem.id"
                  :label="subitem.name"
                  :value="subitem.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <el-form-item label="协作人：" v-if="data.judge === 2">
          <el-select v-model="data.handleIds" filterable>
            <el-option
              v-for="item in helpUser"
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
            clearable
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
        <el-form-item
          label="上传附件："
          v-if="
            nodeName !== 'procurement_approval' &&
            nodeName !== 'confirmation_bidding_documents' &&
            nodeName !== 'approval_by_department_head' &&
            nodeName !== 'announcement_of_bidding' &&
            nodeName !== 'confirmation_bid_evaluation_results' &&
            nodeName !== 'announcement_of_award' &&
            confirmstatus === 2
          "
        >
          <el-upload
            class="uploademo"
            drag
            :http-request="handleimgup"
            multiple
            limit="10"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
          <!-- <el-upload
            accept=".pdf,.word,.jpg,.docx"
            :http-request="handleimgup"
            multiple
            action=""
            list-type="picture-card"
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
          <em>请上传PDF、WORD、JPG文件</em>
        </el-form-item>
        <el-form-item label="附件列表：">
          <el-table
            :data="urllist"
            max-height="200px"
            style="width: 700px"
            border
          >
            <el-table-column prop="name" label="附件名称">
              <template slot-scope="scope">
                {{ slice(scope.row.name) }}
              </template>
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
        >提交</el-button
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
            class="nodeboxchildren"
            v-if="item.history && nodelog"
            v-for="subitem in item.history"
            :key="subitem"
          >
            <el-button :type="nodeColor[subitem.examineApprove]">
              <div
                class="title"
                :style="{
                  fontSize: '16px',
                  marginTop: '2px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
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
                  marginTop: '2px',
                }"
              >
                {{
                  "审核意见" + status[subitem.examineApprove]
                    ? status[subitem.examineApprove]
                    : ""
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
                  type="textarea"
                  v-model="subitem.opinion"
                  :autosize="{ minRows: 1, maxRows: 5 }"
                  disabled
                ></el-input>
                <!-- {{ "说明:" + subitem.opinion }} -->
              </div>
              <div
                class="time"
                v-if="subitem.opinion"
                :style="{
                  fontSize: '16px',
                }"
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
    <!-- <el-dialog :title="nodechilren.title" width="30%" :visible.sync="nodelog">
      <div class="nodebox" v-for="item in nodechilren.history" :key="item.id">
        <el-button :type="nodeColor[item.examineApprove]">
          <div
            class="title"
            :style="{
              fontSize: '16px',
            }"
          >
            {{ item.userName ? item.userName : "审核人" }}
          </div>
          <div
            class="option"
            :style="{
              fontSize: '16px',
            }"
          >
            {{ status[item.examineApprove] }}
          </div>
          <div
            class="time"
            v-if="item.opinion"
            :style="{
              fontSize: '16px',
            }"
          >
            {{ "说明:" + item.opinion }}
          </div>
          <div
            class="time"
            v-if="item.opinion"
            :style="{
              fontSize: '16px',
            }"
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
    </el-dialog> -->
  </div>
</template>
<script>
import { getHistory, getHistoryNode } from "@/api/activite/modle";
import {
  getprocureDetil,
  exprocure,
  reject,
  reAppor,
} from "@/api/procure/getprocure";
import { getdict } from "@/api/dict/getdict";
import {
  getdeptUser,
  getdept,
  getAlldept,
  findDeptUser,
} from "@/api/dept/getdept";
import { getModle } from "@/api/download/download";
import http from "@/utils/request";
export default {
  data() {
    return {
      processCode: "",
      id: "",
      title: "",
      data: {
        judge: null,
        relatedId: null,
        userId: null,
        handleIds: "",
        projectNum: null,
        contractNum: null,
        opinion: null,
        annex: null,
        ccUserList: [],
        nextExamineUser: "",
      },
      formlist: {
        protype: "",
        name: "",
        procureType: "",
        procureCategory: "",
        procureWay: "",
        amount: "",
        earnestMoney: "",
        afterService: "",
        paymentType: "",
        demandDepartment: this.$store.state.userinfo.userdepartment,
        contractNum: "",
        contacts: "",
        phone: "",
        customsType: this.$store.state.userinfo.userCustoms,
        procureDetails: {
          technicalRequirement: "",
          businessRequirement: "",
          otherRequirement: "",
          annex: "",
        },
        url: [],
      },
      procureType: [],
      procureCategory: [],
      procureWay: [],
      paymentType: [],
      customsType: [],
      detilelist: {},
      historylog: false,
      historylist: "",
      urllist: [],
      deptUser: [],
      color: ["#67C23A", "  #F56C6C", "#E6A23C"],
      type: {
        0: "待审核",
        1: "审核通过",
        2: "经办人处理中",
        3: "审核不通过",
        4: "回退",
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
      dictUser: [],
      deptlist: [],
      nodechilren: [],
      nodelog: true,
      prop: {
        label: "name",
        children: "children",
        value: "id",
      },
      url: [],
      nextTitle: [],
      helpUser: [],
      height: "",
      node: "",
      nodeName: "",
      status: {
        0: "通过",
        1: "不通过",
        2: "协作人处理",
        3: "驳回",
        4: "申请人重新提交",
        5: "部门负责人审核通过",
        5: "部门负责人审核不通过",
      },
      nodeColor: {
        0: "success",
        1: "danger",
        2: "warning",
        3: "danger",
        4: "warning",
        5: "success",
        5: "danger",
      },
      tastStatus: "",
      deptPath: [],
      ExamineUser: [],
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.processCode = this.$route.query.processCode;
  },
  methods: {
    //返回
    topath() {
      this.$router.back();
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
    getProcure() {
      getprocureDetil(this.id)
        .then((res) => {
          this.detilelist = res.data;
          this.data.relatedId = res.data.id;
          this.data.contractNum = res.data.contractNum;

          // this.detileialog = true;
          //   console.log('1')
        })
        .catch((error) => {
          console.error(error);
        });
      getHistoryNode(this.id).then((res) => {
        this.title = res.data.title;
        this.confirmstatus = res.data.status;
        this.getdictlist(res.data.nodeSort);
        this.node = res.data.nodeSort;
        this.nodeName = res.data.nodeId;
        this.tastStatus = res.data.status;
        if (res.data.nodeSort > 2 && this.tastStatus !== 3) {
          this.height = "20vh";
        } else {
          this.height = "120vh";
        }
        if (this.tastStatus === 3) {
          this.title = "重新提交";
        }
        console.log(this.nodeName);
        // this.getdictuserlist(res.data.deptIds);
      });

      this.data.userId = this.$store.state.userinfo.userID;
    },
    //获取业务字典
    getDict() {
      getdict("procurement_type").then((res) => {
        const list = res.data.records;
        const length = list.length;
        for (var i = 0; i < length; i++) {
          this.procureType.push(list[i]);
        }
      });
      getdict("purchase_categories").then((res) => {
        const list = res.data.records;
        const length = list.length;
        for (var i = 0; i < length; i++) {
          this.procureCategory.push(list[i]);
        }
      });
      getdict("procure_way").then((res) => {
        const list = res.data.records;
        const length = list.length;
        for (var i = 0; i < length; i++) {
          this.procureWay.push(list[i]);
        }
      });
      getdict("payment_method").then((res) => {
        const list = res.data.records;
        const length = list.length;
        for (var i = 0; i < length; i++) {
          this.paymentType.push(list[i]);
        }
      });
      getAlldept()
        .then((res) => {
          this.deptlist.push(res.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
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
    down(row) {
      getModle(row.name || row);
    },
    //获取该员工部门下员工
    getdictuserlist(array) {
      // const path = this.$store.state.userinfo.userdepartment;
      for (var i = 0; i < array.length; i++) {
        getdeptUser(array[i].id)
          .then((res) => {
            console.log("111", res);
            this.dictUser.push(res.data);
            console.log(this.dictUser, "w");
          })
          .catch((error) => {
            console.error(error);
          });
        getdeptUser(array[i].id)
          .then((res) => {
            console.log("111", res);
            this.ExamineUser.push(res.data);
            console.log(this.dictUser, "w");
          })
          .catch((error) => {
            console.error(error);
          });
      }
      // getdeptUser(path)
      //   .then((res) => {
      //     console.log("111", res);
      //     const list = res.data;
      //     const length = list.length;
      //     for (var i = 0; i < length; i++) {
      //       this.dictUser.push(list[i]);
      //     }
      //     console.log(this.dictUser);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
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
    submit(data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          this.$confirm("确认是否提交审核", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
          })
            .then(() => {
              this.removeEmptyArrays(this.data);
              if (this.data.nextExamineUser) {
                if (!(this.data.nextExamineUser instanceof Array)) {
                  this.data.nextExamineUser = [this.data.nextExamineUser];
                }
              }
              if (this.data.handleIds) {
                if (!(this.data.handleIds instanceof Array)) {
                  this.data.handleIds = [this.data.handleIds];
                }
              }
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
      console.log(object);
    },
    //获取审批部门
    getdictlist(path) {
      getHistory(this.id, this.processCode)
        .then((res) => {
          this.historylist = res.data;
          this.getfile(this.historylist);
          for (var i = 0; i < res.data.length; i++) {
            if (
              path + 1 === res.data[i].nodeSort ||
              path + 2 === res.data[i].nodeSort
            ) {
              console.log(path + 2);
              this.getdictuserlist(res.data[i].deptList);
              this.deptPath = res.data[i].deptList;
              var array = res.data[i].deptList;
              for (var b = 0; b < array.length; b++) {
                this.nextTitle.push({
                  name: array[b].splitDept,
                });
              }
              console.log(this.nextTitle, "a");
              break;
            }
          }
          // console.log(this.historylist);
        })
        .catch((error) => {
          console.error(error);
        });
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
                  this.data.nextExamineUser = "";
                  this.data.handleIds = "";
                  this.$router.back();
                })
                .catch((error) => {
                  this.data.nextExamineUser = "";
                  this.data.handleIds = "";
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
    slice(row) {
      if (row) {
        const index = row.lastIndexOf("/");
        const text = row.substr(index + 1);
        return text;
      } else {
        return "无附件";
      }
    },
    //获取协作人
    getHelpUser() {
      getdeptUser(this.$store.state.userinfo.userdepartment)
        .then((res) => {
          console.log("111", res);
          this.helpUser = res.data;
          console.log(this.helpUser, "s");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    open() {
      if (this.height === "120vh") {
        this.height = "20vh";
        console.log(this.height);
      } else {
        this.height = "120vh";
      }
      console.log(this.height);
    },
    //重新审核
    resubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$confirm("确认是否提交审核", {
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
    this.getProcure();
    this.getDict();
    this.getHelpUser();
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(100vh - 60px);
  overflow-y: scroll;
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
      .examine {
        .el-form-item {
          width: 100%;
          display: flex;
          justify-content: left;
          align-items: end;
          ::v-deep .el-form-item__label {
            font-size: 16px;
          }
        }
      }
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
    .nodebox,
    .nodeboxchildren {
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
          width: 90%;
        }
      }
      .nodeboxchildren {
        .el-button {
          width: 80%;
          opacity: 0.8;
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
    }
    .el-button {
      width: 60%;
    }
  }
}
</style>