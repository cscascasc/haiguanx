<template>
  <div class="container">
    <div class="top-container">
      <div class="back">
        <el-button @click="topath" type="primary"> 返回 </el-button>
      </div>
      <div class="title">
        {{
          type === "detile"
            ? "问题详情"
            : "问题编辑" && type === "rect"
            ? "问题整改"
            : "问题编辑"
        }}
      </div>
    </div>
    <div class="form-container">
      <el-form
        :model="probelemdetilelist"
        :disabled="type === 'detile' ? true : false"
      >
        <div class="steps" v-if="type !== 'rect'">
          <el-steps :active="active" align-center>
            <el-step title="问题录入"></el-step>
            <el-step title="问题整改"></el-step>
            <el-step title="问题审核"></el-step>
            <el-step title="完结"></el-step>
          </el-steps>
        </div>
        <div class="form">
          <div class="formitem" v-if="type !== 'rect'">
            <el-form-item label="录入时间:">
              <el-date-picker v-model="probelemdetilelist.createTime" disabled>
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="formitem" v-if="type !== 'rect'">
            <el-form-item label="问题简述:">
              <el-input
                v-model="probelemdetilelist.problemDescription"
              ></el-input>
            </el-form-item>
            <el-form-item label="项目名称:">
              <el-input v-model="probelemdetilelist.name"></el-input>
            </el-form-item>
          </div>
          <div class="formarea" v-if="type !== 'rect'">
            <el-form-item label="问题描述：">
              <el-input
                type="textarea"
                v-model="probelemdetilelist.detailedDescription"
                :autosize="{ minRows: 5 }"
              ></el-input>
            </el-form-item>
          </div>
          <div class="formarea" v-if="type !== 'rect'">
            <el-form-item label="整改建议：">
              <el-input
                type="textarea"
                v-model="probelemdetilelist.rectificationSuggestions"
                :autosize="{ minRows: 5 }"
              ></el-input>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item label="项目类型：">
              <el-select
                v-model="code.projectTypeCode"
                :disabled="type === 'rect'"
                :placeholder="probelemdetilelist.projectType"
              >
                <el-option
                  v-for="item in object_type"
                  :key="item.dictLabel"
                  :value="item.dictValue"
                  :label="item.dictLabel"
                >
                  {{ item.dictLabel }}
                </el-option></el-select
              >
            </el-form-item>
            <el-form-item label="项目级别：">
              <el-select
                v-model="code.projectLevelCode"
                :disabled="type === 'rect'"
                :placeholder="probelemdetilelist.projectLevel"
              >
                <el-option
                  v-for="item in object_level"
                  :key="item.dictLabel"
                  :value="item.dictValue"
                  :label="item.dictLabel"
                >
                  {{ item.dictLabel }}
                </el-option></el-select
              >
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item label="被审计海关：">
              <el-select
                v-model="probelemdetilelist.auditCustomsIds"
                :disabled="type === 'rect'"
                @change="changedept"
              >
                <el-option
                  v-for="item in customs"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                >
                  {{ item.name }}
                </el-option></el-select
              >
            </el-form-item>
            <el-form-item label="业务主管部门：">
              <el-cascader
                v-model="code.businessSupervisoryDeptId"
                :options="deptList"
                :props="prop"
                :placeholder="
                  probelemdetilelist.businessSupervisoryDept
                    ? probelemdetilelist.businessSupervisoryDept.name
                    : '暂无数据'
                "
                :disabled="type === 'rect'"
                @change="
                  (e) => {
                    probelemdetilelist.businessSupervisoryDeptId = e;
                  }
                "
              >
              </el-cascader>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item label="整改责任部门：">
              <el-cascader
                v-model="code.responsibleDeptList"
                :options="deptList"
                :props="props"
                :placeholder="responsibleDeptListname"
                @change="savelast"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item label="被审计领导">
              <el-input
                v-model="probelemdetilelist.auditLeader"
                :disabled="type === 'rect'"
                show-password
              ></el-input>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item label="审计年度">
              <el-input
                v-model="probelemdetilelist.auditAnnual"
                :disabled="type === 'rect'"
              ></el-input>
            </el-form-item>
            <el-form-item label="审计时间范围">
              <el-date-picker
                v-model="probelemdetilelist.auditTimeFrame"
                range-separator="-"
                type="daterange"
                format="yyyy"
                value-format="yyyy"
                :placeholder="probelemdetilelist.auditTimeFrame"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :disabled="type === 'rect'"
                @change="
                  (e) => {
                    probelemdetilelist.auditTimeFrame = e[0] + '-' + e[1];
                  }
                "
              ></el-date-picker>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item label="审计类型">
              <el-input
                v-model="probelemdetilelist.auditType"
                :disabled="type === 'rect'"
              ></el-input>
            </el-form-item>
            <el-form-item label="制度规定">
              <el-input
                v-model="probelemdetilelist.areasInvolve"
                :disabled="type === 'rect'"
              ></el-input>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item label="业务领域：">
              <el-select
                v-model="code.businessAreaCode"
                :disabled="type === 'rect'"
                :placeholder="probelemdetilelist.businessArea"
                @change="changebusinessarea"
              >
                <el-option
                  v-for="item in businessArea"
                  :key="item.dictLabel"
                  :value="item.dictValue"
                  :label="item.dictLabel"
                >
                  {{ item.dictLabel }}
                </el-option></el-select
              >
            </el-form-item>
            <el-form-item label="业务小类：">
              <el-select
                v-model="code.businessSubcategoriesCode"
                :disabled="type === 'rect'"
                :placeholder="probelemdetilelist.businessSubcategories"
                @change="changebusinessSubcategories"
              >
                <el-option
                  v-for="item in businessSubcategories"
                  :key="item.dictLabel"
                  :value="item.dictValue"
                  :label="item.dictLabel"
                >
                  {{ item.dictLabel }}
                </el-option></el-select
              >
            </el-form-item>
          </div>
          <div class="formitem" v-if="type === 'rect'">
            <el-form-item label="问题简述:">
              <el-input
                v-model="probelemdetilelist.problemDescription"
                :disabled="type === 'rect'"
              ></el-input>
            </el-form-item>
            <el-form-item label="项目名称：">
              <el-input v-model="probelemdetilelist.name"></el-input>
            </el-form-item>
          </div>
          <div class="formarea" v-if="type === 'rect'">
            <el-form-item label="问题描述：">
              <el-input
                type="textarea"
                v-model="probelemdetilelist.detailedDescription"
                :disabled="type === 'rect'"
                :autosize="{ minRows: 5 }"
              ></el-input>
            </el-form-item>
          </div>
          <div class="formarea" v-if="type === 'rect'">
            <el-form-item label="整改建议：">
              <el-input
                type="textarea"
                v-model="probelemdetilelist.rectificationSuggestions"
                :disabled="type === 'rect'"
                :autosize="{ minRows: 5 }"
              ></el-input>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item label="涉及金额">
              <el-input
                v-model="probelemdetilelist.involveAmount"
                :disabled="type === 'rect'"
              >
                <i slot="suffix" style="font-size: 12px">万元</i></el-input
              >
            </el-form-item>
            <el-form-item label="涉及税额">
              <el-input
                v-model="probelemdetilelist.involveTaxAmount"
                :disabled="type === 'rect'"
              >
                <i slot="suffix" style="font-size: 12px">万元</i></el-input
              >
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item label="整改时限:">
              <el-date-picker
                type="datetime"
                v-model="probelemdetilelist.rectificationDeadline"
                :disabled="type === 'rect'"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="整改状态：">
              <el-select
                v-model="code.code"
                disabled
                :placeholder="
                  probelemdetilelist.status === 0 ? '未整改' : '已整改'
                "
                @change="Code"
              >
                <el-option value="1" label="已整改"></el-option>
                <el-option value="0" label="未整改"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item label="问题依据:">
              <el-input v-model="probelemdetilelist.gist"></el-input>
            </el-form-item>
          </div>
          <div class="formarea" v-if="type === 'rect'">
            <el-form-item label="整改情况：">
              <el-input
                type="textarea"
                v-model="ractlist.situation.rectificationSituation"
                :autosize="{ minRows: 5 }"
              ></el-input>
            </el-form-item>
          </div>
          <div class="formarea" v-if="type !== 'rect'">
            <el-form-item label="整改内容:">
              <el-input
                type="textarea"
                v-for="item in probelemdetilelist.situationList"
                :autosize="{ minRows: 5 }"
                :key="item.id"
                v-model="item.rectificationSituation"
              >
              </el-input>
            </el-form-item>
          </div>
          <div class="formitem" v-if="type !== 'rect'">
            <el-form-item label="内控库关联状态">
              <el-select
                v-model="code.code"
                disabled
                :placeholder="
                  probelemdetilelist.internalStatus === 0 ? '未关联' : '已关联'
                "
              ></el-select>
            </el-form-item>
          </div>
          <div class="formarea" v-if="type !== 'rect'">
            <el-form-item label="内控关联：">
              <el-table :data="probelemdetilelist.internalControlList" border>
                <el-table-column
                  prop="nodeName"
                  label="关联内控名称"
                ></el-table-column>
                <el-table-column
                  prop="businessArea"
                  label="业务领域"
                ></el-table-column>
                <el-table-column
                  prop="createTime"
                  label="录入日期"
                ></el-table-column>
                <el-table-column label="操作">
                  <div slot-scope="scope">
                    <el-button type="text" @click="goinear(scope.row)"
                      >详情</el-button
                    >
                    <el-button type="text" @click="openreinaera(scope.row)"
                      >解绑</el-button
                    >
                  </div>
                </el-table-column>
              </el-table>
              <el-button type="success" :disabled="false" @click="getinarealist"
                >弱关联内控节点</el-button
              >
            </el-form-item>
          </div>
          <div class="formitem" v-if="type !== 'rect'">
            <el-form-item label="制度关联状态">
              <el-select
                v-model="code.code"
                disabled
                :placeholder="
                  probelemdetilelist.rulesStatus === 0 ? '未关联' : '已关联'
                "
              ></el-select>
            </el-form-item>
          </div>
          <div class="formarea" v-if="type !== 'rect'">
            <el-form-item label="制度关联：">
              <el-table :data="probelemdetilelist.rulesRegulationsList" border>
                <el-table-column prop="title" label="规章制度标题" fixed="left">
                </el-table-column>
                <el-table-column prop="businessArea" label="业务领域">
                </el-table-column>

                <el-table-column prop="createTime" label="录入日期">
                </el-table-column>
                <el-table-column label="操作">
                  <div slot-scope="scope">
                    <el-button type="text" @click="gorule(scope.row)"
                      >详情</el-button
                    >
                    <el-button type="text" @click="openremoverule(scope.row)"
                      >解绑</el-button
                    >
                  </div>
                </el-table-column>
              </el-table>
              <el-button type="success" :disabled="false" @click="getrulelist"
                >弱关联规章制度节点</el-button
              >
            </el-form-item>
          </div>
          <div class="fromitem">
            <el-form-item label="附件：">
              <el-table :data="probelemdetilelist.annexList" border>
                <el-table-column label="附件名">
                  <div slot-scope="scope">
                    {{ slice(scope.row) }}
                  </div>
                </el-table-column>
                <el-table-column label="查看">
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
              <div class="img" style="display: flex">
                <el-upload
                  :http-request="handleimgup"
                  multiple
                  list-type="picture-card"
                  :disabled="type === 'detile'"
                >
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <em>请上传PDF、WORD、JPG文件</em>
              </div>
            </el-form-item>
          </div>
          <div class="formarea">
            <el-form-item label="备注：">
              <el-input
                type="textarea"
                v-model="probelemdetilelist.remark"
                :disabled="type === 'rect'"
                :autosize="{ minRows: 5 }"
              ></el-input>
            </el-form-item>
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
    <div class="button" v-if="type === 'rect'">
      <el-button
        type="success"
        v-if="type !== 'detile'"
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
    <el-dialog title="弱关联内控节点" width="75%" :visible.sync="inerarlog">
      <div
        :style="{
          display: 'flex',
        }"
      >
        <el-form size="small" inline>
          <el-form-item label="节点名称">
            <el-input v-model="inerarform.keywords" clearable></el-input>
          </el-form-item>
          <el-form-item label="节点级别">
            <el-select v-model="inerarform.codeLevel" clearable>
              <el-option
                v-for="item in codoLevelList"
                :key="item.dictValue"
                :value="item.dictValue"
                :label="item.dictLabel"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-button size="small" type="primary" @click="ineareSerch">
            查询</el-button
          >
          <el-button size="small" @click="ineareReset">重置</el-button>
        </el-form>
      </div>
      <el-table :data="innaerlist" border max-height="400">
        <el-table-column
          label="节点序号"
          fixed="left"
          prop="nodeNum"
        ></el-table-column>
        <el-table-column prop="nodeName" label="节点名称"></el-table-column>
        <el-table-column prop="nodeLevel" label="节点级别"></el-table-column>
        <el-table-column prop="nodeExplain" label="节点解释">
          <template slot-scope="scope">
            <div
              :style="{
                maxHeight: '80px',
                overflowY: 'scroll',
              }"
            >
              {{ scope.row.nodeExplain }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="nodeOrigin" label="节点出处"></el-table-column>
        <el-table-column label="操作">
          <div slot-scope="scope">
            <el-button size="small" @click="goinear(scope.row)">详情</el-button>
            <el-button
              size="small"
              type="success"
              @click="saveinarea(scope.row)"
              >绑定</el-button
            >
          </div>
        </el-table-column>
      </el-table>
      <div
        class="pagination"
        :style="{
          display: 'flex',
          justifyContent: 'flex-end',
        }"
      >
        <el-pagination
          background
          layout="total,prev, pager, next"
          :page-size="inerarform.size"
          :total="inaertotal"
          @prev-click="changeinearapage"
          @next-click="changeinearapage"
          @current-change="changeinearapage"
        >
        </el-pagination>
      </div>
    </el-dialog>
    <el-dialog
      title="弱关联规章制度节点"
      width="75%"
      :visible.sync="ruleslog"
      max-height="400"
    >
      <div
        :style="{
          display: 'flex',
        }"
      >
        <el-form size="small" inline>
          <el-form-item label="节点名称">
            <el-input v-model="inerarform.keywords" clearable></el-input>
          </el-form-item>
          <el-button size="small" type="primary" @click="ruleSerch">
            查询</el-button
          >
          <el-button size="small" @click="ruleReset">重置</el-button>
        </el-form>
      </div>
      <el-table :data="rulelist" border>
        <el-table-column prop="title" label="规章制度标题" fixed="left">
        </el-table-column>
        <el-table-column prop="businessArea" label="业务领域">
        </el-table-column>
        <el-table-column prop="createTime" label="录入日期"> </el-table-column>
        <el-table-column
          prop="timeTakeEffect"
          label="生效时间"
        ></el-table-column>
        <el-table-column label="操作">
          <div slot-scope="scope">
            <el-button size="small" @click="gorule(scope.row)">详情</el-button>
            <el-button size="small" type="success" @click="saverule(scope.row)"
              >绑定</el-button
            >
          </div>
        </el-table-column>
      </el-table>
      <div
        class="pagination"
        :style="{
          display: 'flex',
          justifyContent: 'flex-end',
        }"
      >
        <el-pagination
          background
          layout="total,prev, pager, next"
          :page-size="rulearform.size"
          :total="ruletotal"
          @prev-click="changerulepage"
          @next-click="changerulepage"
          @current-change="changerulepage"
        >
        </el-pagination></div
    ></el-dialog>
    <el-dialog title="确认解绑吗" width="40%" center :visible.sync="rerule">
      <span slot="footer" class="dialog-footer">
        <el-button @click="rerule = false">取 消</el-button>
        <el-button type="primary" @click="removerule">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="确认解绑吗" width="40%" center :visible.sync="reinerar">
      <span slot="footer" class="dialog-footer">
        <el-button @click="reinerar = false">取 消</el-button>
        <el-button type="primary" @click="removeinare">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { problemBaseRule } from "@/api/data/rule/getrule";
import { problemBaseinarea } from "@/api/data/neikong/getneikong";
import {
  problemdetile,
  problemEdit,
  problemRect,
  removeRule,
  removeInare,
  saveRule,
  saveInare,
} from "@/api/data/wenti/getWenti";
import {
  getobjecttype,
  getobjectlevel,
  getbusinessAear,
  getbusinessType,
  getdict,
} from "@/api/dict/getdict";
import { getdept, getAlldept, getdeptcustoms } from "@/api/dept/getdept";
import http from "@/utils/request";
import { getModle } from "@/api/download/download";
export default {
  data() {
    return {
      label: {
        detile: "问题详情",
        edit: "问题编辑",
        rect: "问题整改",
      },
      ractlist: {
        id: this.$route.query.id,
        annex: "",
        situation: {
          problemBaseId: this.$route.query.id,
          deptName: this.$store.state.userinfo.userCustoms,
          deptId: this.$store.state.userinfo.userdepartment,
          rectificationSituation: "",
        },
      },
      props: {
        label: "name",
        children: "children",
        value: "id",
        multiple: true,
        checkStrictly: true,
      },
      prop: {
        label: "name",
        children: "children",
        value: "id",
        checkStrictly: true,
      },
      code: {
        businessAreaCode: null,
        businessSubcategoriesCode: null,
        projectTypeCode: null,
        projectLevelCode: null,
        responsibleDeptList: null,
        code: null,
      },
      responsibleDeptListname: "",
      innaerlist: [],
      rulelist: [],
      object_type: [],
      object_level: [],
      customs: [],
      deptList: [],
      customsdepetlist: [],
      businessArea: [],
      businessSubcategories: [],
      active: 1,
      type: "",
      centerDialogVisible: false,
      inerarlog: false,
      inaertotal: 0,
      inerarform: {
        businessSubcategoriesCode: null,
        size: 10,
        current: 1,
        id: "",
      },
      ruleslog: false,
      ruletotal: 0,
      rulearform: {
        businessAreaCode: null,
        size: 10,
        current: 1,
        id: "",
      },
      id: "",
      probelemdetilelist: {},
      rerule: false,
      ruleid: "",
      reinerar: false,
      inaerid: "",
      url: [],
      codoLevelList: [],
    };
  },
  created() {
    this.type = this.$route.query.type;
    this.id = this.$route.query.id;
  },
  methods: {
    topath() {
      this.$router.back();
    },
    gorule(row) {
      this.$router.push({
        path: "/ruledetil",
        query: { id: row.id, type: "detile" },
      });
    },
    goinear(row) {
      this.$router.push({
        path: "/controldetile",
        query: {
          id: row.id,
          step: row.type,
          type: "detile",
        },
      });
    },
    //步骤条状态度
    step() {
      if (this.probelemdetilelist.status === 1) {
        this.active = 2;
      }
      if (this.probelemdetilelist.isExamine === 1) {
        this.active = 4;
      }
    },
    //获取问题详情
    getprobelemdetilelist() {
      problemdetile(this.id)
        .then((res) => {
          this.probelemdetilelist = res.data;
          if (!!res.data.responsibleDeptDetails) {
            console.log(res.data.responsibleDeptDetails.length);
            for (var i = 0; i < res.data.responsibleDeptDetails.length; i++) {
              var a = res.data.responsibleDeptDetails[i].name;
              this.responsibleDeptListname =
                this.responsibleDeptListname.concat("", a);
            }
          }
          // getdeptcustoms(res.data.auditCustomsIds).then((res) => {
          //   this.customsdepetlist = res.data;
          // });
          this.step();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //打开提交
    open() {
      this.centerDialogVisible = true;
    },
    //确认提交
    submit() {
      if (this.code.businessAreaCode !== null) {
        this.probelemdetilelist.businessAreaCode = this.code.businessAreaCode;
      }
      if (this.code.businessSubcategoriesCode !== null) {
        this.probelemdetilelist.businessSubcategoriesCode =
          this.code.businessSubcategoriesCode;
      }
      if (this.code.projectLevelCode !== null) {
        this.probelemdetilelist.projectLevelCode = this.code.projectLevelCode;
      }
      if (this.code.projectTypeCode !== null) {
        this.probelemdetilelist.projectTypeCode = this.code.projectTypeCode;
      }
      if (this.code.businessSupervisoryDeptId !== null) {
        this.probelemdetilelist.businessSupervisoryDeptId = this.code
          .businessSupervisoryDeptId
          ? this.code.businessSupervisoryDeptId.pop()
          : null;
      }
      console.log(this.probelemdetilelist);
      // return;
      problemEdit(this.probelemdetilelist)
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
    //提交整改
    Rect() {
      problemRect(this.ractlist)
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
    //获取选项
    getoption() {
      getobjecttype()
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.object_type.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getobjectlevel()
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.object_level.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getbusinessAear()
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.businessArea.push(list[i]);
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
            this.businessSubcategories.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getdept()
        .then((res) => {
          const list = res.data;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.customs.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getAlldept()
        .then((res) => {
          this.deptList.push(res.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    savelast(node) {
      console.log(node);
      var list = [];
      node.forEach((node) => {
        console.log(node);
        if (typeof node == "array") {
          list.push(node.pop());
        }
      });
      this.probelemdetilelist.responsibleDeptList = list;
      console.log(this.probelemdetilelist.responsibleDeptList, "1111");
    },
    changebusinessarea(value) {
      this.rulearform.businessAreaCode = value;
    },
    changebusinessSubcategories(value) {
      console.log(value);
      this.inerarform.businessSubcategoriesCode = value;
    },
    getinarealist() {
      this.inerarform.businessSubcategoriesCode =
        this.probelemdetilelist.businessSubcategoriesCode;
      this.inerarform.id = this.id;
      this.innaerlist = [];
      problemBaseinarea(this.inerarform)
        .then((res) => {
          this.inaertotal = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.innaerlist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      this.getdictNode();
      this.inerarlog = true;
    },
    getrulelist() {
      this.rulearform.businessAreaCode =
        this.probelemdetilelist.businessAreaCode;
      this.rulearform.id = this.id;
      this.rulelist = [];
      problemBaseRule(this.rulearform)
        .then((res) => {
          this.ruletotal = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.rulelist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      this.ruleslog = true;
    },
    openremoverule(row) {
      this.ruleid = row.id;
      this.rerule = true;
    },
    removerule() {
      removeRule(this.id, this.ruleid)
        .then((res) => {
          const message = res.msg;
          this.$notify({
            title: "成功",
            message: message,
            type: "success",
          });
          this.getrulelist();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    openreinaera(row) {
      this.inaerid = row.id;
      this.reinerar = true;
    },
    removeinare() {
      removeInare(this.id, this.inaerid)
        .then((res) => {
          const message = res.msg;
          this.$notify({
            title: "成功",
            message: message,
            type: "success",
          });
          this.getinarealist();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    saveinarea(row) {
      saveInare(this.id, row.id)
        .then((res) => {
          const message = res.msg;
          this.$notify({
            title: "成功",
            message: message,
            type: "success",
          });
          this.getinarealist();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    saverule(row) {
      saveRule(this.id, row.id)
        .then((res) => {
          const message = res.msg;
          this.$notify({
            title: "成功",
            message: message,
            type: "success",
          });
          this.getrulelist();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    changedept(value) {
      this.customsdepetlist = [];
      getdeptcustoms(value).then((res) => {
        this.customsdepetlist = res.data;
      });
    },
    Code(value) {
      this.probelemdetilelist.status = value;
    },
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
          console.log(this.probelemdetilelist.annex);
          if (this.probelemdetilelist.annex) {
            this.url.push(this.probelemdetilelist.annex);
          }
          this.url.push(res.data);
          this.probelemdetilelist.annex = this.url.join(",");
          console.log(this.probelemdetilelist.annex);
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
    changerulepage(value) {
      this.rulearform.current = value;
      this.getrulelist();
    },
    changeinearapage(value) {
      (this.inerarform.current = value), this.getinarealist();
    },
    down(row) {
      getModle(row);
    },
    slice(row) {
      const index = row.lastIndexOf("/");
      const text = row.substr(index + 1);
      return text;
    },
    //获取节点级别
    getdictNode() {
      getdict("node_level").then((res) => {
        this.codoLevelList = [];
        const list = res.data.records;
        const length = list.length;
        for (var i = 0; i < length; i++) {
          this.codoLevelList.push(list[i]);
        }
      });
    },
    //内控查詢
    ineareSerch() {
      this.innaerlist = [];
      problemBaseinarea(this.inerarform)
        .then((res) => {
          this.inaertotal = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.innaerlist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //内控重置
    ineareReset() {
      this.inerarform = {
        businessSubcategoriesCode:
          this.probelemdetilelist.businessSubcategoriesCode,
        size: 10,
        current: 1,
        id: this.id,
      };
      this.innaerlist = [];
      problemBaseinarea(this.inerarform)
        .then((res) => {
          this.inaertotal = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.innaerlist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //问题查询
    ruleSerch() {
      this.rulelist = [];
      problemBaseRule(this.rulearform)
        .then((res) => {
          this.ruletotal = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.rulelist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //问题重置
    ruleReset() {
      this.rulearform = {
        businessAreaCode: null,
        size: 10,
        current: 1,
        id: "",
      };
      this.rulearform.businessAreaCode =
        this.probelemdetilelist.businessAreaCode;
      this.rulearform.id = this.id;
      this.rulelist = [];
      problemBaseRule(this.rulearform)
        .then((res) => {
          this.ruletotal = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.rulelist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },

  mounted() {
    this.getprobelemdetilelist();
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
      .steps {
        display: flex;
        justify-content: center;
        .el-steps {
          width: 600px;
        }
      }
      .form {
        margin-top: 10px;
        padding: 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
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
            align-items: center;
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
            ::v-deep .el-range-editor.el-input__inner {
              width: 430px;
            }
            ::v-deep .el-input__inner::placeholder {
              color: #000;
            }
            ::v-deep .el-cascader .el-input .el-input__inner {
              width: 430px;
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
              color: #000;
            }
          }
        }
      }
      .el-form-item {
        display: flex;
        margin-bottom: 20px;
        padding-left: 40px;
        ::v-deep .el-form-item__label {
          font-size: 16px;
          width: 200px;
          text-align: left;
          color: #000;
        }
        ::v-deep .el-input.is-disabled .el-input__inner {
          color: #000;
          cursor: default;
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