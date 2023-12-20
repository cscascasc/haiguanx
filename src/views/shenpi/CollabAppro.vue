<template>
  <div class="container">
    <div class="tables">
      <el-tabs v-model="state" type="border-card">
        <el-tab-pane name="null" class="tabone" label="全部">
          <div class="top">
            <el-form v-model="res" inline>
              <el-form-item label="采购类型">
                <el-select v-model="res.procureType" clearable>
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
                <el-select v-model="res.procureCategory" clearable>
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
              <el-input
                v-model="res.name"
                placeholder="请输入搜索内容"
              ></el-input>
              <el-button type="primary" @click="serch">搜索</el-button>
              <el-button type="warning" @click="refesh">重置</el-button>
            </div>
          </div>
          <div class="table" v-if="tablelist.length === 0">
            <el-table border>
              <el-table-column
                label="采购项目名称"
                fixed="left"
              ></el-table-column>
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
              <el-table-column prop="procureType" label="采购类型">
                <div slot-scope="scope">
                  {{ procureType[scope.row.procureType].dictLabel }}
                </div>
              </el-table-column>
              <el-table-column label="采购类别">
                <div slot-scope="scope">
                  {{ procureCategory[scope.row.procureCategory].dictLabel }}
                </div>
              </el-table-column>
              <el-table-column label="采购方式">
                <div slot-scope="scope">
                  {{ procureWay[scope.row.procureWay].dictLabel }}
                </div>
              </el-table-column>
              <el-table-column
                prop="budgetAmount"
                label="采购金额"
              ></el-table-column>
              <el-table-column label="付款方式">
                <div>
                  {{ paymentType[0].dictLabel }}
                </div>
              </el-table-column>
              <el-table-column
                prop="contractNum"
                label="合同编号"
              ></el-table-column>
              <el-table-column prop="dept.name" label="需求部门">
              </el-table-column>
              <el-table-column prop="contacts" label="联系人"></el-table-column>
              <el-table-column
                prop="phone"
                label="联系人电话"
              ></el-table-column>
              <el-table-column label="状态">
                <div slot-scope="scope">
                  <el-button
                    :type="stats[scope.row.status].type"
                    size="small"
                    disabled
                  >
                    {{ stats[scope.row.status].lable }}
                  </el-button>
                </div>
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="提交时间"
              ></el-table-column>
              <el-table-column label="操作" fixed="right" width="150px">
                <div slot-scope="scope">
                  <el-button type="text" @click="procureditile(scope.row)"
                    >详情</el-button
                  >
                  <el-button type="text" @click="opneNode(scope.row)"
                    >查看流程</el-button
                  >
                </div>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="res.size"
                @prev-click="change"
                @next-click="change"
                @current-change="change"
              >
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="0" class="tabone" label="审核中">
          <div class="top">
            <el-form v-model="statuswaitfrom" inline>
              <el-form-item label="采购类型">
                <el-select v-model="statuswaitfrom.procureType" clearable>
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
                <el-select v-model="statuswaitfrom.procureCategory" clearable>
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
              <el-input
                v-model="statuswaitfrom.name"
                placeholder="请输入搜索内容"
              ></el-input>
              <el-button type="primary" @click="seachwait">搜索</el-button>
              <el-button type="warning" @click="refesh">重置</el-button>
            </div>
          </div>
          <div class="table" v-if="tablistwait.length === 0">
            <el-table border>
              <el-table-column
                label="采购项目名称"
                fixed="left"
              ></el-table-column>
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
          <div class="table" v-if="tablistwait.length !== 0">
            <el-table :data="tablistwait" border max-height="600">
              <el-table-column
                prop="name"
                label="采购项目名称"
                fixed="left"
                width="150px"
              ></el-table-column>
              <el-table-column prop="procureType" label="采购类型">
                <div slot-scope="scope">
                  {{ procureType[scope.row.procureType].dictLabel }}
                </div>
              </el-table-column>
              <el-table-column label="采购类别">
                <div slot-scope="scope">
                  {{ procureCategory[scope.row.procureCategory].dictLabel }}
                </div>
              </el-table-column>
              <el-table-column label="采购方式">
                <div slot-scope="scope">
                  {{ procureWay[scope.row.procureWay].dictLabel }}
                </div>
              </el-table-column>
              <el-table-column
                prop="budgetAmount"
                label="采购金额"
              ></el-table-column>
              <el-table-column label="付款方式">
                <div>
                  {{ paymentType[0].dictLabel }}
                </div>
              </el-table-column>
              <el-table-column
                prop="contractNum"
                label="合同编号"
              ></el-table-column>
              <el-table-column prop="dept.name" label="需求部门">
              </el-table-column>
              <el-table-column prop="contacts" label="联系人"></el-table-column>
              <el-table-column
                prop="phone"
                label="联系人电话"
              ></el-table-column>
              <el-table-column label="状态">
                <div slot-scope="scope">
                  <el-button
                    :type="stats[scope.row.status].type"
                    size="small"
                    disabled
                  >
                    {{ stats[scope.row.status].lable }}
                  </el-button>
                </div>
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="提交时间"
              ></el-table-column>
              <el-table-column label="操作" fixed="right" width="150px">
                <div slot-scope="scope">
                  <el-button type="text" @click="procureditile(scope.row)"
                    >详情</el-button
                  >
                  <el-button type="text" @click="procureconfirm(scope.row)"
                    >审批</el-button
                  >
                </div>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="waittotal"
                :page-size="statuswaitfrom.size"
                @prev-click="waitChange"
                @next-click="waitChange"
                @current-change="waitChange"
              >
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="9" class="tabone" label="复审">
          <div class="top">
            <el-form v-model="statuswaitfrom" inline>
              <el-form-item label="采购类型">
                <el-select v-model="statuswaitfrom.procureType" clearable>
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
                <el-select v-model="statuswaitfrom.procureCategory" clearable>
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
              <el-input
                v-model="statuswaitfrom.name"
                placeholder="请输入搜索内容"
              ></el-input>
              <el-button type="primary" @click="seachwait">搜索</el-button>
              <el-button type="warning" @click="refesh">重置</el-button>
            </div>
          </div>
          <div class="table" v-if="reProcureList.length === 0">
            <el-table border>
              <el-table-column
                label="采购项目名称"
                fixed="left"
              ></el-table-column>
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
          <div class="table" v-if="reProcureList.length !== 0">
            <el-table :data="reProcureList" border max-height="600">
              <el-table-column
                prop="name"
                label="采购项目名称"
                fixed="left"
              ></el-table-column>
              <el-table-column prop="procureType" label="采购类型">
                <div slot-scope="scope">
                  {{ procureType[scope.row.procureType].dictLabel }}
                </div>
              </el-table-column>
              <el-table-column label="采购类别">
                <div slot-scope="scope">
                  {{ procureCategory[scope.row.procureCategory].dictLabel }}
                </div>
              </el-table-column>
              <el-table-column label="采购方式">
                <div slot-scope="scope">
                  {{ procureWay[scope.row.procureWay].dictLabel }}
                </div>
              </el-table-column>
              <el-table-column
                prop="budgetAmount"
                label="采购金额"
              ></el-table-column>
              <el-table-column label="付款方式">
                <div>
                  {{ paymentType[0].dictLabel }}
                </div>
              </el-table-column>
              <el-table-column
                prop="contractNum"
                label="合同编号"
              ></el-table-column>
              <el-table-column prop="dept.name" label="需求部门">
              </el-table-column>
              <el-table-column prop="contacts" label="联系人"></el-table-column>
              <el-table-column
                prop="phone"
                label="联系人电话"
              ></el-table-column>
              <el-table-column label="状态">
                <div slot-scope="scope">
                  <el-button
                    :type="stats[scope.row.status].type"
                    size="small"
                    disabled
                  >
                    {{ stats[scope.row.status].lable }}
                  </el-button>
                </div>
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="提交时间"
              ></el-table-column>
              <el-table-column label="操作" fixed="right" width="150px">
                <div slot-scope="scope">
                  <el-button type="text" @click="procureditile(scope.row)"
                    >详情</el-button
                  >
                  <el-button type="text" @click="procureconfirm(scope.row)"
                    >审批</el-button
                  >
                </div>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane name="1" class="tabone" label="已结束">
          <div class="top"></div>
          <div class="table" v-if="tablistover.length === 0">
            <el-table border>
              <el-table-column
                label="采购项目名称"
                fixed="left"
              ></el-table-column>
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
          <div class="table" v-if="tablistover.length !== 0">
            <div class="pagination">
              <!-- <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="size"
              >
              </el-pagination> -->
            </div>
            <el-table :data="tablistover" border>
              <el-table-column
                prop="name"
                label="采购项目名称"
                fixed="left"
              ></el-table-column>
              <el-table-column prop="procureType" label="采购类型">
                <div slot-scope="scope">
                  {{ procureType[scope.row.procureType].dictLabel }}
                </div>
              </el-table-column>
              <el-table-column label="采购类别">
                <div slot-scope="scope">
                  {{ procureCategory[scope.row.procureCategory].dictLabel }}
                </div>
              </el-table-column>
              <el-table-column label="采购方式">
                <div slot-scope="scope">
                  {{ procureWay[scope.row.procureWay].dictLabel }}
                </div>
              </el-table-column>
              <el-table-column
                prop="budgetAmount"
                label="采购金额"
              ></el-table-column>
              <el-table-column label="付款方式">
                <div>
                  {{ paymentType[0].dictLabel }}
                </div>
              </el-table-column>
              <el-table-column
                prop="contractNum"
                label="合同编号"
              ></el-table-column>
              <el-table-column prop="dept.name" label="需求部门">
              </el-table-column>
              <el-table-column prop="contacts" label="联系人"></el-table-column>
              <el-table-column
                prop="phone"
                label="联系人电话"
              ></el-table-column>
              <el-table-column label="状态">
                <div slot-scope="scope">
                  <el-button
                    :type="stats[scope.row.status].type"
                    size="small"
                    disabled
                  >
                    {{ stats[scope.row.status].lable }}
                  </el-button>
                </div>
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="提交时间"
              ></el-table-column>
              <el-table-column label="操作" fixed="right" width="200px">
                <div slot-scope="scope">
                  <el-button type="text" @click="procureditile(scope.row)"
                    >详情</el-button
                  >
                  <el-button type="text" @click="opneNode(scope.row)"
                    >查看流程</el-button
                  >
                  <el-button
                    type="text"
                    v-if="scope.row.status === 2"
                    @click="report(scope.row)"
                    >重新提交</el-button
                  >
                </div>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane class="tabone" label="我发起的">
          <div class="top">
            <el-form v-model="form" inline>
              <el-form-item label="采购类型">
                <el-select v-model="myres.procureType">
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
                <el-select v-model="myres.procureCategory">
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
              <el-input
                v-model="myres.name"
                placeholder="请输入名称"
              ></el-input>
              <el-button type="primary" @click="myserch">搜索</el-button>
              <el-button type="warning" @click="refesh">重置</el-button>
            </div>
          </div>
          <div class="table">
            <el-table :data="mytablelist" border>
              <el-table-column
                prop="name"
                label="采购项目名称"
                fixed="left"
              ></el-table-column>
              <el-table-column prop="procureType" label="采购类型">
                <div slot-scope="scope">
                  {{ procureType[scope.row.procureType].dictLabel }}
                </div>
              </el-table-column>
              <el-table-column label="采购类别">
                <div slot-scope="scope">
                  {{ procureCategory[scope.row.procureCategory].dictLabel }}
                </div>
              </el-table-column>
              <el-table-column label="采购方式">
                <div slot-scope="scope">
                  {{ procureWay[scope.row.procureWay].dictLabel }}
                </div>
              </el-table-column>
              <el-table-column
                prop="budgetAmount"
                label="采购金额"
              ></el-table-column>
              <el-table-column label="付款方式">
                <div>
                  {{ paymentType[0].dictLabel }}
                </div>
              </el-table-column>
              <el-table-column
                prop="contractNum"
                label="合同编号"
              ></el-table-column>
              <el-table-column prop="dept.name" label="需求部门">
              </el-table-column>
              <el-table-column
                prop="paymentType"
                label="联系人"
              ></el-table-column>
              <el-table-column
                prop="contacts"
                label="联系人电话"
              ></el-table-column>
              <el-table-column label="状态">
                <div slot-scope="scope">
                  <el-button
                    :type="stats[scope.row.status].type"
                    size="small"
                    disabled
                  >
                    {{ stats[scope.row.status].lable }}
                  </el-button>
                </div>
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="提交时间"
              ></el-table-column>
              <el-table-column label="操作" fixed="right" width="150px">
                <div slot-scope="scope">
                  <el-button type="text" @click="procureditile(scope.row)"
                    >详情</el-button
                  >
                  <el-button type="text" @click="opneNode(scope.row)"
                    >查看流程</el-button
                  >
                  <el-button
                    type="text"
                    v-if="scope.row.status === 2"
                    @click="report(scope.row)"
                    >重新提交</el-button
                  >
                </div>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="mytotal"
                :page-size="myres.size"
                @prev-click="changemy"
                @next-click="changemy"
                @current-change="changemy"
              >
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="采购详情"
      :visible.sync="detileialog"
      width="60%"
      center
      v-if="detileialog"
    >
      <div class="form">
        <el-form
          :model="detilelist"
          ref="detilelist"
          inline
          :disabled="disabled"
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
            <el-form-item label="合同编号">
              <el-input v-model="detilelist.contractNum"></el-input>
            </el-form-item>
            <el-form-item label="项目编号">
              <el-input v-model="detilelist.projectNum"></el-input>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item
              v-if="!disabled"
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
                v-model="detilelist.nextExamineUser"
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
          <div class="solt">服务要求</div>
          <el-form-item label="售后服务:">
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
          <div v-if="detilelist.projectCategory">
            <div class="solt">材料补充</div>
            <div class="formitem">
              <el-form-item label="项目类别">
                <el-input v-model="detilelist.projectCategory"></el-input>
              </el-form-item>
              <el-form-item label="项目组织形式">
                <el-input
                  v-model="detilelist.procurementOrganizationForm"
                ></el-input>
              </el-form-item>
            </div>
            <div class="formitem">
              <el-form-item label="招标类型">
                <el-input v-model="detilelist.biddingType"></el-input>
              </el-form-item>
              <el-form-item label="招标金额">
                <el-input v-model="detilelist.tenderAmount"></el-input>
              </el-form-item>
            </div>
            <div class="formitem">
              <el-form-item label="投标金额">
                <el-input v-model="detilelist.bidAmount"></el-input>
              </el-form-item>
              <el-form-item label="中标金额">
                <el-input v-model="detilelist.bidWinningAmount"></el-input>
              </el-form-item>
            </div>
            <div class="formitem">
              <el-form-item label="实际支付金额">
                <el-input v-model="detilelist.actualPaymentAmount"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="solt">附件</div>
          <el-form-item>
            <el-table :data="detilelist.annexList" border>
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
          <div class="solt" v-if="!disabled">上传附件</div>
          <el-upload
            v-if="!disabled"
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
          <em v-if="!disabled">请上传PDF、WORD、JPG文件</em>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="reSubmit('detilelist')"
          type="primary"
          v-if="!disabled"
          >提交</el-button
        >
        <el-button @click="detileialog = false" type="danger">关闭</el-button>
      </span>
    </el-dialog>
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
              width: '90%',
            }"
          >
            <div
              class="nodeboxchildren"
              v-for="subitem in item.history"
              :key="subitem.id"
            >
              <el-button :type="nodeColor[subitem.examineApprove]">
                <div
                  class="title"
                  :style="{
                    fontSize: '16px',
                    padding: '2px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }"
                >
                  {{
                    subitem.userName
                      ? subitem.userName + `(${item.deptList[0].splitDept})`
                      : "审核人"
                  }}
                </div>
                <div
                  class="option"
                  :style="{
                    fontSize: '16px',
                    padding: '2px',
                  }"
                >
                  {{
                    "审核意见：" + Status[subitem.examineApprove]
                      ? Status[subitem.examineApprove]
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
                    :style="{
                      backgroundColor: 'transparent',
                    }"
                    :autosize="{ minRows: 1, maxRows: 4 }"
                    disabled
                  ></el-input>
                  <!-- {{ "说明:" + subitem.opinion }} -->
                </div>
                <div
                  class="time"
                  :style="{
                    fontSize: '16px',
                    padding: '2px',
                  }"
                  v-for="bitem in subitem.annexList"
                  :key="bitem"
                >
                  {{ "附件" + slice(bitem) }}
                </div>
                <div
                  class="time"
                  v-if="subitem.annex"
                  :style="{
                    fontSize: '16px',
                    padding: '2px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
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
import { getModle } from "@/api/download/download";
import http from "@/utils/request";
import {
  getprocureList,
  getprocureDetil,
  getallprocure,
  exprocure,
  removeappor,
} from "@/api/procure/getprocure";
import { getHistory, getHistoryNode } from "@/api/activite/modle";
import { getdeptUser, getdept, getAlldept } from "@/api/dept/getdept";
import { getdict } from "@/api/dict/getdict";

export default {
  data() {
    return {
      total: 0,
      state: "0",
      submitdialog: false,
      confirmdialog: false,
      form: {
        danwi: "", //单位
        leixing: "", //类型
        leibie: "", //类别
        seach: "", //搜索类容
      },
      stats: [
        {
          lable: "待审核",
          type: "warning",
        },
        {
          lable: "代补充信息",
          type: "primary",
        },
        {
          lable: "已驳回",
          type: "danger",
        },
        {
          lable: "已完成",
          type: "success",
        },
        {
          lable: "重新提交",
          type: "danger",
        },
      ],
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
      data: {
        judge: null,
        relatedId: null,
        userId: null,
        handleIds: [],
        projectNum: null,
        contractNum: null,
        opinion: null,
        annex: null,
        ccUserList: [],
        nextExamineUser: [],
      },
      url: [],
      res: {
        current: 1,
        size: 10,
        status: null,
        procureType: null,
        name: null,
        procureCategory: null,
      },
      myres: {
        current: 1,
        size: 10,
        status: null,
        procureType: null,
        procureCategory: null,
        name: null,
        applicantId: this.$store.state.userinfo.userID,
      },
      dictUser: [],
      all: [],
      detilelist: {},
      detileialog: false,
      tablelist: [],
      procureType: [],
      procureCategory: [],
      procureWay: [],
      paymentType: [],
      customsType: [],
      mytablelist: [],
      mytotal: 0,
      statuswaitfrom: {
        current: 1,
        size: 10,
        status: 0,
        userId: this.$store.state.userinfo.userID,
        procureType: null,
        procureCategory: null,
        name: null,
      },
      tablistwait: [],
      waittotal: 0,
      historylist: [],
      confirmstatus: "",
      deptlist: [],
      deptvalue: "",
      prop: {
        label: "name",
        children: "children",
        value: "id",
      },
      deptUser: [],
      historylog: false,
      urllist: [],
      color: ["#67C23A", "  #F56C6C", "#E6A23C"],
      disabled: true,
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
      nodechilren: [],
      nodelog: true,
      reProcureList: [],
      reProcure: {
        current: 1,
        size: 10,
        status: 4,
        procureType: null,
        name: null,
        procureCategory: null,
      },
      Status: {
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
      retotal: 0,
      bidtype: [],
      projectCategory: [],
      procurementOrganization: [],
    };
  },
  methods: {
    //获取申请列表
    async getlist() {
      await getprocureList(this.res)
        .then((res) => {
          this.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.tablelist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getprocureList(this.statuswaitfrom)
        .then((res) => {
          this.waittotal = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.tablistwait.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      // await getprocureList(this.myres)
      //   .then((res) => {
      //     const list = res.data.records;
      //     const length = list.length;
      //     for (var i = 0; i < length; i++) {
      //       this.mytablelist.push(list[i]);
      //     }
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      this.getall();
      this.getMy();
      this.getRe();
    },
    change(value) {
      this.res.current = value;
      this.tablelist = [];
      getprocureList(this.res)
        .then((res) => {
          this.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.tablelist.push(list[i]);
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
    //获取所有申请
    getall() {
      const form = {
        size: this.total,
        current: 1,
      };
      getallprocure(form)
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.all.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //获取复审
    getRe() {
      getallprocure(this.reProcure)
        .then((res) => {
          this.retotal = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.reProcureList.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //获取我我发起的
    getMy() {
      getallprocure(this.myres)
        .then((res) => {
          this.mytotal = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.mytablelist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //获取该员工部门下员工
    getdictuserlist(path) {
      // const path = this.$store.state.userinfo.userdepartment;
      getdeptUser(path)
        .then((res) => {
          console.log("111", res);
          const list = res.data;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.dictUser.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
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
          this.detilelist.annexList.push(res.data);

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
    //文件预览
    handlePictureCardPreview() {
      (this.dialogVisible = true), (this.dialogImageUrl = this.data.url);
    },
    //打开审批模块
    procureconfirm(row) {
      this.$router.push({
        path: "/procure",
        query: {
          id: row.id,
          processCode: row.processCode,
        },
      });
      // this.data.contractNum = row.contractNum;
      // this.data.relatedId = row.id;
      // getprocureDetil(row.id)
      //   .then((res) => {
      //     this.detilelist = res.data;
      //     // this.detileialog = true;
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      // getHistoryNode(row.id).then((res) => {
      //   console.log(res);
      //   this.title = res.data.title;
      //   this.confirmstatus = res.data.status;
      //   this.getdictuserlist(res.data.deptIds);
      // });
      // getHistory(row.id, row.processCode)
      //   .then((res) => {
      //     this.historylist = res.data;
      //     this.getfile(this.historylist);
      //     console.log(this.historylist);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      // this.data.userId = this.$store.state.userinfo.userID;
      // this.confirmdialog = true;
    },
    //确认提交
    consure(forName) {
      this.$refs[forName].validate((valid) => {
        if (valid) {
          this.submitdialog = true;
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    //提交审核
    submit() {
      this.removeEmptyArrays(this.data);
      exprocure(this.data)
        .then((res) => {
          const message = res.msg;
          this.$notify({
            title: "成功",
            message: message,
            type: "success",
          });
          this.$router.go();
        })
        .catch((error) => {
          console.error(error);
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
      getAlldept()
        .then((res) => {
          this.deptlist.push(res.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
      getdeptUser(this.$store.state.userinfo.userdepartment)
        .then((res) => {
          console.log(res);
          this.deptUser = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
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
    //分页
    changemy(value) {
      this.myres.current = value;
      this.mytablelist = [];
      this.getMy();
    },
    serch() {
      this.tablelist = [];
      getprocureList(this.res)
        .then((res) => {
          this.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.tablelist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    seachwait() {
      this.tablistwait = [];
      getprocureList(this.statuswaitfrom)
        .then((res) => {
          this.waittotal = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.tablistwait.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    myserch() {
      this.mytablelist = [];
      this.getMy();
    },
    refesh() {
      this.$router.go();
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
    //退回附件
    handleremover(value) {
      console.log(value);
      console.log(this.data.annex, "a");
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
    report(row) {
      this.disabled = false;
      getprocureDetil(row.id)
        .then((res) => {
          this.detilelist = res.data;
          this.detileialog = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    reSubmit(name) {
      this.$confirm("确认要重新提交吗？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.detilelist.procureType = this.formlist.procureType
            ? this.formlist.procureType
            : this.detilelist.procureType;
          this.detilelist.procureCategory = this.formlist.procureCategory
            ? this.formlist.procureCategory
            : this.detilelist.procureCategory;
          this.detilelist.procureWay = this.formlist.procureWay
            ? this.formlist.procureWay
            : this.detilelist.procureWay;
          console.log(this.detilelist);
          removeappor(this.detilelist)
            .then((res) => {
              this.$notify({
                title: "成功",
                message: res.msg,
                type: "success",
              });
              this.$router.go();
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch(() => {
          console.log("cancel");
        });
    },
    opneNode(row) {
      getHistory(row.id, row.processCode)
        .then((res) => {
          this.historylist = res.data;
          this.historylog = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    openNode(item) {
      this.nodechilren = item;
      this.nodelog = true;
    },
    Down(id) {
      getModle(id);
    },
    slice(row) {
      const index = row.lastIndexOf("/");
      const text = row.substr(index + 1);
      return text;
    },
    waitChange(value) {
      this.statuswaitfrom.current = value;
      this.tablistwait = [];
      getprocureList(this.statuswaitfrom)
        .then((res) => {
          this.waittotal = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.tablistwait.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    this.getdictlist();
  },
  computed: {
    tablistover() {
      return this.all.filter((item) => item.status !== 0);
    },
  },
  mounted() {
    this.getlist();
    // this.getdictuserlist();
    this.getdetlist();
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
  .tables {
    width: 80%;
    margin-top: 10px;
    .el-tabs {
      border-radius: 15px;
      padding: 10px;
      ::v-deep .el-tabs__item.is-active {
        border-top-color: #dcdfe6;
        border-top: 1px solid #dcdfe6;
      }

      .tabone {
        display: flex;
        flex-direction: column;
        .top {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px,
            rgba(0, 0, 0, 0.23) 0px 3px 6px;
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
          box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px,
            rgba(0, 0, 0, 0.23) 0px 3px 6px;
          border-radius: 12px;
          .pagination {
            display: flex;
            margin-bottom: 10px;
            justify-content: flex-end;
          }
        }
      }
    }
  }
}
.el-dialog {
  width: 100%;
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
  .confirmform {
    width: 100%;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    ::v-deep .el-form--inline .el-form-item {
      display: block;
    }
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
      .el-select,
      .el-cascader {
        width: calc(100vw / 3.7);
        display: block;
      }
    }
  }
  .nodebox {
    width: 100%;
    display: flex;
    margin-top: 5px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .flowNode,
    .nodeboxchildren {
      width: 90%;
      padding: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      .el-button {
        font-size: 16px;
        width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .nodeboxchildren {
      width: 100%;
      opacity: 0.8;
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
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>