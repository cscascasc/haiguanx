<template>
  <div class="container">
    <div class="top">
      <el-form v-model="data" inline>
        <!-- <el-form-item label="单位">
          <el-select v-model="data.unitid">
            <el-option
              v-for="item in customsType"
              :key="item.id"
              :label="item.customsName"
              :value="item.id"
            >
              {{ item.customsName }}
            </el-option></el-select
          >
        </el-form-item> -->
        <el-form-item label="采购类型">
          <el-select v-model="data.procureType" clearable>
            <el-option
              v-for="item in procureType"
              :key="item.dictLabel"
              :label="item.dictLabel"
              :value="item.dictValue"
            >
              {{ item.dictLabel }}
            </el-option></el-select
          >
        </el-form-item>
        <el-form-item label="采购类别">
          <el-select v-model="data.procureCategory" clearable>
            <el-option
              v-for="item in procureCategory"
              :key="item.dictLabel"
              :label="item.dictLabel"
              :value="item.dictValue"
            >
              {{ item.dictLabel }}
            </el-option></el-select
          >
        </el-form-item>
      </el-form>
      <div class="seach">
        <el-input v-model="data.name" placeholder="请输入项目名称"></el-input>
        <el-button type="primary" @click="serch">搜索</el-button>
        <el-button type="warning" @click="refesh">重置</el-button>
      </div>
    </div>
    <div class="table" v-if="tablelist.length === 0">
      <el-table border>
        <el-table-column label="采购项目名称" fixed="left"></el-table-column>
        <el-table-column label="采购类型"></el-table-column>
        <el-table-column label="采购类别"></el-table-column>
        <el-table-column label="采购方式"></el-table-column>
        <el-table-column label="采购金额"></el-table-column>
        <el-table-column label="付款方式"></el-table-column>
        <el-table-column label="合同编号"></el-table-column>
        <el-table-column label="需求部门"></el-table-column>
        <el-table-column label="联系人"></el-table-column>
        <el-table-column label="联系人电话"></el-table-column>
        <el-table-column label="状态"></el-table-column>
        <el-table-column label="提交时间"></el-table-column>
        <el-table-column label="操作" fixed="right" width="150px">
          <el-button type="text">详情</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="table">
      <el-table
        :data="tablelist"
        v-if="tablelist.length !== 0"
        border
        max-height="600"
      >
        <el-table-column
          prop="name"
          label="采购项目名称"
          fixed="left"
        ></el-table-column>
        <el-table-column
          prop="procureTypeName"
          label="采购类型"
        ></el-table-column>
        <el-table-column
          prop="procureCategoryName"
          label="采购类别"
        ></el-table-column>
        <el-table-column
          prop="procureWayName"
          label="采购方式"
        ></el-table-column>
        <el-table-column prop="budgetAmount" label="采购金额"></el-table-column>
        <el-table-column prop="paymentType" label="付款方式"> </el-table-column>
        <el-table-column prop="contractNum" label="合同编号"></el-table-column>
        <el-table-column prop="dept.name" label="需求部门"></el-table-column>
        <el-table-column prop="contacts" label="联系人"></el-table-column>
        <el-table-column prop="phone" label="联系人电话"></el-table-column>
        <el-table-column prop="createTime" label="提交时间"></el-table-column>
        <el-table-column label="操作" fixed="right" width="150px">
          <div slot-scope="scope">
            <el-button type="text" @click="procureditile(scope.row)"
              >详情</el-button
            >
            <el-button type="text" @click="openadd(scope.row)">补充</el-button>
          </div>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total,prev, pager, next"
          :total="total"
          :page-size="data.size"
          @prev-click="change"
          @next-click="change"
          @current-change="change"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="采购详情"
      :visible.sync="detileialog"
      width="60%"
      center
      v-if="detileialog"
    >
      <div class="form">
        <el-form :model="detilelist" ref="formlist" inline disabled>
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
              </el-select>
            </el-form-item>
            <el-form-item label="采购方式：" prop="procureWay">
              <el-select
                v-model="formlist.procureWay"
                :placeholder="procureWay[detilelist.procureWay].dictLabel"
              >
              </el-select>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item label="采购金额：">
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
            <el-form-item label="售后服务：">
              <el-input v-model="detilelist.afterService"></el-input>
            </el-form-item>
            <el-form-item label="付款方式：">
              <el-input v-model="detilelist.paymentType"> </el-input>
            </el-form-item>
          </div>
          <div class="formitem">
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
            <el-form-item label="委托采购单位">
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
            <el-image
              cover
              style="width: 200px; height: 200px"
              :src="detilelist.procureDetails.annex"
            >
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detileialog = false" type="danger">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="材料补充" width="60%" :visible.sync="adddialog" center>
      <div class="form">
        <el-form :model="addform" ref="form">
          <div class="formitem">
            <el-form-item
              label="项目类别"
              prop="projectCategoryCode"
              :rules="[
                {
                  required: true,
                  message: '请选择项目类别',
                },
              ]"
            >
              <el-select v-model="addform.projectCategoryCode">
                <el-option
                  v-for="item in projectCategory"
                  :key="item.id"
                  :value="item.dictValue"
                  :label="item.dictLabel"
                ></el-option
              ></el-select>
            </el-form-item>
            <el-form-item
              label="项目组织形式"
              prop="procurementOrganizationFormCode"
              :rules="[
                {
                  required: true,
                  message: '请选择项目组织形式',
                },
              ]"
            >
              <el-select v-model="addform.procurementOrganizationFormCode">
                <el-option
                  v-for="item in procurementOrganization"
                  :key="item.id"
                  :value="item.dictValue"
                  :label="item.dictLabel"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item
              prop="biddingTypeCode"
              :rules="[
                {
                  required: true,
                  message: '请选择招标类型',
                },
              ]"
              label="招标类型:"
            >
              <el-select v-model="addform.biddingTypeCode">
                <el-option
                  v-for="item in bidtype"
                  :key="item.id"
                  :value="item.dictValue"
                  :label="item.dictLabel"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              prop="tenderAmount"
              :rules="[
                {
                  required: true,
                  message: '请输入招标金额',
                },
              ]"
              label="招标金额"
            >
              <el-input type="number" v-model="addform.tenderAmount">
                <i slot="suffix" style="font-size: 12px">万元</i></el-input
              >
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item
              prop="bidAmount"
              :rules="[
                {
                  required: true,
                  message: '请输入投标金额',
                },
              ]"
              label="投标金额"
            >
              <el-input v-model="addform.bidAmount">
                <i slot="suffix" style="font-size: 12px">万元</i></el-input
              >
            </el-form-item>
            <el-form-item
              prop="bidWinningAmount"
              :rules="[
                {
                  required: true,
                  message: '请输入中标金额',
                },
              ]"
              label="中标金额"
            >
              <el-input v-model="addform.bidWinningAmount">
                <i slot="suffix" style="font-size: 12px">万元</i></el-input
              >
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item
              prop="actualPaymentAmount"
              :rules="[
                {
                  required: true,
                  message: '请输入实际支付金额',
                },
              ]"
              label="实际支付金额"
            >
              <el-input v-model="addform.actualPaymentAmount">
                <i slot="suffix" style="font-size: 12px">万元</i></el-input
              >
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialog = false" type="danger">取消</el-button>
        <el-button @click="addup('form')" type="success">提交</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" width="30%" :visible.sync="submitlog" center>
      <div style="display: flex; justify-content: center; font-size: 16px">
        确认要提交吗
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitlog = false" type="danger">取消</el-button>
        <el-button @click="sub" type="success">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getprocureDetil,
  getallprocure,
  addappor,
} from "@/api/procure/getprocure";
import { getdeptUser, getdept, getdeptcustoms } from "@/api/dept/getdept";
import { getdict } from "@/api/dict/getdict";
import { exportObject } from "@/api/download/download";
export default {
  name: "orderlist",
  data() {
    return {
      tablelist: [],
      procureType: [],
      procureCategory: [],
      procureWay: [],
      paymentType: [],
      customsType: [],
      data: {
        size: 10,
        current: 1,
        status: 1,
        applicantId: this.$store.state.userinfo.userID,
        procureType: null,
        procureCategory: null,
        name: null,
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
      total: 0,
      detilelist: [],
      detileialog: false,
      adddialog: false,
      addform: {
        id: "",
        procurementOrganizationFormCode: "",
        projectCategoryCode: "",
        tenderAmount: "", //招标金额
        bidAmount: "", //投标金额
        bidWinningAmount: "", //中标金额
        actualPaymentAmount: "", //实际支付金额
        biddingTypeCode: "", //招标类型
      },
      bidtype: [],
      submitlog: false,
      projectCategory: [],
      procurementOrganization: [],
    };
  },
  methods: {
    //获取单位
    getdetlist() {
      getdept().then((res) => {
        const list = res.data;
        const length = list.length;
        for (var i = 0; i < length; i++) {
          this.customsType.push(list[i]);
        }
      });
    },
    //获取业务字典
    getdictlist() {
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
      getdict("bidding_type").then((res) => {
        const list = res.data.records;
        const length = list.length;
        for (var i = 0; i < length; i++) {
          this.bidtype.push(list[i]);
        }
      });
      getdict("project_category").then((res) => {
        const list = res.data.records;
        const length = list.length;
        for (var i = 0; i < length; i++) {
          this.projectCategory.push(list[i]);
        }
      });
      getdict("procurement_organization_form").then((res) => {
        const list = res.data.records;
        const length = list.length;
        for (var i = 0; i < length; i++) {
          this.procurementOrganization.push(list[i]);
        }
      });
    },
    //获取列表数据
    getlist() {
      getallprocure(this.data)
        .then((res) => {
          this.total = Number(res.data.total);
          for (var i = 0; i < res.data.records.length; i++) {
            this.tablelist.push(res.data.records[i]);
          }
          console.log(this.tablelist);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //分页
    change(value) {
      this.data.current = value;
      this.tablelist = [];
      this.getlist();
    },
    //查看详情
    procureditile(row) {
      getprocureDetil(row.id)
        .then((res) => {
          this.detilelist = res.data;
          this.detileialog = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //
    openadd(row) {
      this.addform.id = row.id;
      this.adddialog = true;
    },
    //提交
    addup(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitlog = true;
        } else {
          return false;
        }
      });
    },
    //提交
    sub() {
      addappor(this.addform)
        .then((res) => {
          const message = res.msg;
          this.$notify({
            title: "成功",
            message: message,
            type: "success",
          });
          this.tablelist = [];
          this.getlist();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    serch() {
      this.tablelist = [];
      getallprocure(this.data)
        .then((res) => {
          this.total = Number(res.data.total);
          for (var i = 0; i < res.data.records.length; i++) {
            this.tablelist.push(res.data.records[i]);
          }
          console.log(this.tablelist);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    refesh() {
      this.$router.go();
    },
  },
  mounted() {
    this.getdetlist();
    this.getdictlist();
    this.getlist();
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
  .top {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
    width: 70%;
    margin-top: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-radius: 12px;
    margin-bottom: 15px;
    .seach {
      display: flex;
      justify-content: space-around;
      width: calc(100% - 900px);

      .el-input {
        margin-right: 20px;
      }
      .el-button {
        height: 40px;
        width: 100px;
      }
    }
  }
  .table {
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-radius: 12px;
    width: 70%;
    .el-table {
      width: 100%;
    }
    .pagination {
      display: flex;
      margin-bottom: 10px;
      justify-content: flex-end;
    }
  }
  .el-dialog {
    .form {
      width: 98%;
      max-height: 700px;
      padding: 10px;
      overflow-y: scroll;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 10px;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .el-form {
        .solt {
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
          width: 1000px;
          justify-content: space-between;
          ::v-deep .el-form-item__label {
            color: #000;
            font-size: 16px;
            width: 130px;
            margin: 0px;
            text-align: left;
          }
          .el-form-item {
            margin-right: 5px;
            display: flex;
            .el-input,
            .el-select {
              width: 350px;
            }
          }
        }
      }
    }
    .confirmform {
      width: 100%;
      padding: 10px;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 10px;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
      .el-form {
        width: 100%;
        ::v-deep .el-form-item__label {
          font-size: 18px;
          width: 130px;
          text-align: left;
        }
        ::v-deep .el-radio__label {
          font-size: 18px;
        }
        .el-input {
          width: calc(100vw / 3.7);
        }
        ::v-deep .el-textarea__inner {
          width: calc(100vw / 3.7);
        }
        .el-select {
          width: calc(100vw / 3.7);
        }
      }
    }
  }
}
</style>