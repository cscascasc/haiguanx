<template>
  <div class="container">
    <div class="top">
      <el-form inline>
        <el-form-item label="采购项目名称：">
          <el-input v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="采购类型：">
          <el-select v-model="form.prosuretype" clearable>
            <el-option
              v-for="item in procureType"
              :key="item.id"
              :value="item.dictValue"
              :label="item.dictLabel"
            >
              {{ item.dictLabel }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item label="采购类别：">
          <el-select v-model="form.procureCategory" clearable>
            <el-option
              v-for="item in procureCategory"
              :key="item.id"
              :value="item.dictValue"
              :label="item.dictLabel"
            >
              {{ item.dictLabel }}</el-option
            >
          </el-select>
        </el-form-item>
      </el-form>
      <div class="seach">
        <el-button type="primary" @click="serch">搜索</el-button>
        <el-button type="warning" @click="refesch">重置</el-button>
      </div>
    </div>
    <div class="table">
      <el-table :data="data" border max-height="700">
        <el-table-column
          prop="name"
          label="采购项目名称"
          fixed="left"
        ></el-table-column>
        <el-table-column prop="procureTypeName" label="采购类型">
        </el-table-column>
        <el-table-column prop="procureCategoryName" label="采购类别">
        </el-table-column>
        <el-table-column prop="procureWayName" label="采购方式">
        </el-table-column>
        <el-table-column prop="budgetAmount" label="采购金额"></el-table-column>
        <el-table-column prop="paymentType" label="付款方式"> </el-table-column>
        <el-table-column prop="contractNum" label="合同编号"></el-table-column>
        <el-table-column width="200" prop="dept.allPath" label="需求部门">
        </el-table-column>
        <el-table-column prop="contacts" label="联系人"></el-table-column>
        <el-table-column prop="phone" label="联系人电话"></el-table-column>
        <el-table-column prop="sendDate" label="发送时间"></el-table-column>
        <el-table-column label="操作" fixed="right" width="150px">
          <div slot-scope="scope">
            <el-button type="text" @click="procureditile(scope.row)">
              去查看
            </el-button>
          </div>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total,prev, pager, next"
          :total="total"
          :page-size="form.size"
          @prev-click="changepage"
          @next-click="changepage"
          @current-change="changepage"
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
              <el-select v-model="detilelist.procureTypeName"> </el-select>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item label="采购类别：">
              <el-select v-model="detilelist.procureCategoryName"> </el-select>
            </el-form-item>
            <el-form-item label="采购方式：" prop="procureWay">
              <el-select v-model="detilelist.procureWayName"> </el-select>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item label="采购金额：">
              <el-input v-model="detilelist.amount" type="number"></el-input>
            </el-form-item>
            <el-form-item label="履约保证金：">
              <el-input
                v-model="detilelist.earnestMoney"
                type="number"
              ></el-input>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item label="售后服务：">
              <el-input v-model="detilelist.afterService"></el-input>
            </el-form-item>
            <el-form-item label="付款方式：">
              <el-select v-model="detilelist.paymentTypeName"> </el-select>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item label="合同编号">
              <el-input v-model="detilelist.contractNum"></el-input>
            </el-form-item>
            <el-form-item label="需求部门">
              <el-select
                v-model="detilelist.demandDepartment"
                disabled
              ></el-select>
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
  </div>
</template>
  
  <script>
import { getpurchaseExamine } from "@/api/notice/getobjectnotice";
import { getprocureDetil } from "@/api/procure/getprocure";
import { getdict } from "@/api/dict/getdict";
export default {
  name: "orderlist",
  data() {
    return {
      detileialog: false,
      form: {
        name: null,
        prosuretype: null,
        procureCategory: null,
        size: 9,
        current: 1,
        noticeUser: this.$store.state.userinfo.userID,
      },
      total: 0,
      detilelist: {},
      data: [],
      procureType: [],
      procureCategory: [],
    };
  },
  methods: {
    //获取列表
    getdata() {
      getpurchaseExamine(this.form)
        .then((res) => {
          this.total = Number(res.data.total);
          this.data = [];
          for (var i = 0; i < res.data.records.length; i++) {
            this.data.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
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
    changepage(value) {
      this.form.current = value;
      getpurchaseExamine(this.form)
        .then((res) => {
          this.total = Number(res.data.total);
          this.data = [];
          for (var i = 0; i < res.data.records.length; i++) {
            this.data.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //获取字典值
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
    },
    serch() {
      getpurchaseExamine(this.form)
        .then((res) => {
          this.total = Number(res.data.total);
          this.data = [];
          for (var i = 0; i < res.data.records.length; i++) {
            this.data.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    refesch() {
      this.$router.go();
    },
  },
  mounted() {
    this.getdata();
    this.getdictlist();
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
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    width: 90%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-radius: 12px;
    margin-bottom: 15px;
    .seach {
      display: flex;
      justify-content: space-around;

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
    width: 90%;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-radius: 12px;
    .pagination {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 10px;
    }
  }
  .el-dialog {
    .form {
      width: 98%;
      height: 700px;
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
            .el-input,
            .el-select {
              width: 350px;
            }
          }
        }
      }
    }
  }
}
</style>