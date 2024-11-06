<template>
  <div class="container">
    <div class="tebs">
      <el-tabs v-model="formlist.procureWay" @tab-click="getlist">
        <el-tab-pane name="0">
          <div slot="label" class="tablabel">
            <div class="card">
              <div class="icon">
                <i class="el-icon-s-check"></i>
              </div>
              <div class="title">
                <span>委托采购</span>
              </div>
              <div class="button">
                <el-button @click="prodialog = true">申请</el-button>
              </div>
            </div>
          </div>
          <div v-if="table.length === 0">
            <div class="table">
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
          </div>
          <div v-if="table.length !== 0">
            <div class="table">
              <el-table :data="table" max-height="500" border>
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
                  <!-- <div slot-scope="scope">
                    {{ procureWay[scope.row.procureWay].dictLabel }}
                  </div> -->
                </el-table-column>
                <el-table-column
                  prop="budgetAmount"
                  label="采购金额"
                ></el-table-column>
                <el-table-column prop="paymentType" label="付款方式">
                  <!-- <div>
                    {{ paymentType[0].dictLabel }}
                  </div> -->
                </el-table-column>
                <el-table-column
                  prop="contractNum"
                  label="合同编号"
                ></el-table-column>
                <el-table-column prop="dept.allPath" label="需求部门">
                </el-table-column>
                <el-table-column
                  prop="contacts"
                  label="联系人"
                ></el-table-column>
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
                  </div>
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination
                  background
                  layout="total,prev, pager, next"
                  :total="form.total"
                  :page-size="form.size"
                  @prev-click="changepage"
                  @next-click="changepage"
                  @current-change="changepage"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="1">
          <div slot="label" class="tablabel">
            <div class="card">
              <div class="icon">
                <i class="el-icon-s-check"></i>
              </div>
              <div class="title">
                <span>公开比选/竞价采购</span>
              </div>
              <div class="button">
                <el-button @click="prodialog = true">申请</el-button>
              </div>
            </div>
          </div>
          <div v-if="table.length === 0">
            <div class="table">
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
          </div>
          <div v-if="table.length !== 0">
            <div class="table">
              <el-table :data="table" max-height="500" border>
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
                <el-table-column prop="paymentType" label="付款方式">
                </el-table-column>
                <el-table-column
                  prop="contractNum"
                  label="合同编号"
                ></el-table-column>
                <el-table-column porp="dept" label="需求部门">
                  <div slot-scope="scope">
                    {{ scope.row.dept.allPath }}
                  </div>
                </el-table-column>
                <el-table-column
                  prop="contacts"
                  label="联系人"
                ></el-table-column>
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
                  </div>
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination
                  background
                  layout="total,prev, pager, next"
                  :total="form.total"
                  :page-size="form.size"
                  @prev-click="changepage"
                  @next-click="changepage"
                  @current-change="changepage"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="2">
          <div slot="label" class="tablabel">
            <div class="card">
              <div class="icon">
                <i class="el-icon-s-check"></i>
              </div>
              <div class="title">
                <span>市场竞价采购</span>
              </div>
              <div class="button">
                <el-button @click="prodialog = true">申请</el-button>
              </div>
            </div>
          </div>
          <div v-if="table.length === 0">
            <div class="table">
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
          </div>
          <div v-if="table.length !== 0">
            <div class="table">
              <el-table :data="table" max-height="500" border>
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
                <el-table-column prop="paymentType" label="付款方式">
                </el-table-column>
                <el-table-column
                  prop="contractNum"
                  label="合同编号"
                ></el-table-column>
                <el-table-column prop="dept.allPath" label="需求部门">
                  <div slot-scope="scope">
                    {{ scope.row.dept.allPath }}
                  </div>
                </el-table-column>
                <el-table-column
                  prop="contacts"
                  label="联系人"
                ></el-table-column>
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
                  </div>
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination
                  background
                  layout="total,prev, pager, next"
                  :total="form.total"
                  :page-size="form.size"
                  @prev-click="changepage"
                  @next-click="changepage"
                  @current-change="changepage"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="采购申请" :visible.sync="prodialog" width="60%" center>
      <div class="form">
        <el-form :model="formlist" ref="formlist" inline>
          <div class="solt">采购申请</div>
          <div class="formitem">
            <el-form-item
              label="采购项目名称:"
              prop="name"
              :rules="[{ required: true, message: '请输入项目名称' }]"
            >
              <el-input v-model="formlist.name"></el-input>
            </el-form-item>
            <el-form-item
              label="采购类型:"
              prop="procureType"
              :rules="[
                {
                  required: true,
                  message: '请选择采购类型',
                },
              ]"
            >
              <el-select v-model="formlist.procureType">
                <el-option
                  v-for="item in procureType"
                  :key="item.dictLabel"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                >
                  {{ item.dictLabel }}
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item
              label="采购类别："
              prop="procureCategory"
              :rules="[
                {
                  required: true,
                  message: '请选择采购类别',
                },
              ]"
            >
              <el-select v-model="formlist.procureCategory">
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
            <el-form-item
              label="采购方式："
              prop="procureWay"
              :rules="[
                {
                  required: true,
                  message: '请选择采购方式',
                },
              ]"
            >
              <el-select v-model="formlist.procureWay">
                <el-option
                  v-for="item in procureWay"
                  :key="item.dictLabel"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                >
                  {{ item.dictLabel }}
                </el-option></el-select
              >
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item
              label="采购金额："
              prop="budgetAmount"
              :rules="[
                {
                  required: true,
                  message: '请输入采购金额',
                },
              ]"
            >
              <el-input v-model="formlist.budgetAmount" type="number">
                <i slot="suffix" style="font-size: 12px">万元</i></el-input
              >
            </el-form-item>
            <el-form-item
              label="履约保证金："
              prop="earnestMoney"
              :rules="[
                {
                  reuqired: true,
                  message: '请输入履约保证金',
                },
              ]"
            >
              <el-input
                v-model="formlist.earnestMoney"
                @change="
                  (value) => {
                    if (formlist.earnestMoney) {
                      $message.warning('履约保证金不能超过10%');
                    }
                  }
                "
              >
                <i slot="suffix" style="font-size: 12px">%</i></el-input
              >
            </el-form-item>
          </div>
          <div class="formitem">
            <!-- <el-form-item label="合同编号">
              <el-input v-model="formlist.contractNum"></el-input>
            </el-form-item> -->
            <el-form-item
              label="需求部门"
              prop="demandDepartment"
              :rules="[
                {
                  required: true,
                  message: '',
                },
              ]"
            >
              <el-select v-model="demandDepartment" disabled></el-select>
            </el-form-item>
            <el-form-item
              label="付款方式："
              prop="paymentType"
              :rules="[
                {
                  required: true,
                  message: '请输入款方式',
                },
              ]"
            >
              <el-input v-model="formlist.paymentType"> </el-input>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item
              label="联系人"
              prop="contacts"
              :rules="[
                {
                  required: true,
                  message: '请选择联系人',
                },
              ]"
            >
              <el-input v-model="formlist.contacts"></el-input>
            </el-form-item>
            <el-form-item
              label="联系电话"
              prop="phone"
              :rules="[
                {
                  required: true,
                  message: '请输入联系电话',
                },
                {
                  pattern:
                    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$|^0\d{2,3}-?\d{7,8}$/,
                  message: '输入电话有误',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                v-model="formlist.phone"
                type="number"
                maxlength="11"
              ></el-input>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item
              v-if="formlist.procureWay == 0"
              label="委托采购单位"
              prop="purchaseUnit"
              :rules="[
                {
                  required: true,
                  message: '请输入委托采购单位',
                },
              ]"
            >
              <el-input v-model="formlist.purchaseUnit"></el-input>
            </el-form-item>
            <el-form-item
              label="部门审批人"
              prop="nestExaminUser"
              :rules="[
                {
                  required: true,
                  message: '请选择部门审批人',
                },
              ]"
            >
              <el-select v-model="formlist.nestExaminUser" filterable clearable>
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
          <el-form-item
            label="售后服务："
            prop="afterService"
            :rules="[
              {
                required: true,
                message: '请输入售后服务',
              },
            ]"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 4 }"
              show-word-limit
              maxlength="500"
              v-model="formlist.afterService"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="技术要求:"
            prop="procureDetails.technicalRequirement"
            :rules="[
              {
                required: true,
                message: '请输入技术要求',
              },
            ]"
          >
            <el-input
              type="textarea"
              v-model="formlist.procureDetails.technicalRequirement"
              :autosize="{ minRows: 4 }"
              show-word-limit
              maxlength="500"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商务要求:"
            prop="procureDetails.businessRequirement"
            :rules="[
              {
                required: true,
                message: '请输入商务要求',
              },
            ]"
          >
            <el-input
              type="textarea"
              v-model="formlist.procureDetails.businessRequirement"
              :autosize="{ minRows: 4 }"
              show-word-limit
              maxlength="500"
            ></el-input>
          </el-form-item>
          <el-form-item label="其他要求：">
            <el-input
              type="textarea"
              v-model="formlist.procureDetails.otherRequirement"
              :autosize="{ minRows: 4 }"
              show-word-limit
              maxlength="500"
            ></el-input>
          </el-form-item>
          <div class="solt">上传附件</div>
          <el-form-item>
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
        </el-form>
      </div>
      <el-dialog
        append-to-body
        title="确认提交"
        :visible.sync="submitdialog"
        width="40%"
        center
      >
        <span slot="footer" class="dialog-footer">
          <el-button @click="submitdialog = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button @click="prodialog = false">取 消</el-button>
        <el-button type="primary" @click="consure('formlist')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="采购详情"
      :visible.sync="detileialog"
      width="60%"
      center
      v-if="detileialog"
    >
      <div class="form">
        <el-form :model="detilelist" inline disabled>
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
                v-model="formlist.procureWayName"
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
              <el-input v-model="detilelist.earnestMoney" type="number"
                ><i slot="suffix" style="font-size: 12px">%</i></el-input
              >
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item label="需求部门">
              <el-select v-model="detilelist.dept.name" disabled></el-select>
            </el-form-item>
            <el-form-item label="付款方式：">
              <el-input v-model="detilelist.paymentType"> </el-input>
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
          <el-form-item label="售后服务:">
            <el-input
              type="textarea"
              v-model="detilelist.afterService"
              :autosize="{ minRows: 4 }"
              show-word-limit
              maxlength="500"
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
                    @click="Down(scope.row)"
                    :disabled="false"
                    >查看附件</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detileialog = false" type="danger">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <el-img
        width="100%"
        :src="dialogImageUrl[0]"
        :preview-src-list="dialogImageUrl"
        alt=""
      ></el-img>
    </el-dialog>
  </div>
</template>

<script>
import http from "@/utils/request";
import { getModle } from "@/api/download/download";
import {
  addprocure,
  getprocureList,
  getprocureDetil,
} from "@/api/procure/getprocure";
import { getdict } from "@/api/dict/getdict";
import { getdeptUser } from "@/api/dept/getdept";
export default {
  name: "orderlist",
  data() {
    return {
      tablelist: [],
      form: {
        size: 10,
        total: 0,
        current: 1,
      },
      dialogVisible: false,
      prodialog: false,
      submitdialog: false,
      detileialog: false,
      demandDepartment: this.$store.state.userinfo.userdepartmentPath,
      formlist: {
        name: "",
        procureCategory: "",
        procureWay: "0",
        budgetAmount: "",
        earnestMoney: "",
        afterService: "",
        purchaseUnit: "",
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
        nestExaminUser: "",
      },
      detilelist: {},
      stats: [
        {
          lable: "待审核",
          type: "warning",
        },
        {
          lable: "待补充信息",
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
      table: [],
      procureType: [],
      procureCategory: [],
      procureWay: [],
      paymentType: [],
      dialogImageUrl: "",
      deptUser: [],
    };
  },
  methods: {
    //点击页码
    changepage(value) {
      this.form.current = value;
      getprocureList(this.form)
        .then((res) => {
          this.table = [];
          const list = res.data.records;
          const length = list.length;
          this.total = Number(res.data.total);
          console.log(this.total);
          for (var i = 0; i < length; i++) {
            this.table.push(list[i]);
          }
          console.log(this.table);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //文件预览
    handlePictureCardPreview() {
      (this.dialogVisible = true), (this.dialogImageUrl = this.form.url);
    },
    handleRemove(data) {
      console.log(data);
    },
    //文件提交
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
          this.formlist.url.push(res.data);
          this.formlist.procureDetails.annex = this.formlist.url.join(",");
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
    //确认按钮
    consure(forName) {
      console.log(forName);
      this.$refs.formlist.validate((valid) => {
        if (valid) {
          this.submitdialog = true;
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    //新增上传
    submit() {
      console.log(this.formlist);
      if (!(this.formlist.nestExaminUser instanceof Array)) {
        this.formlist.nestExaminUser = [this.formlist.nestExaminUser];
      }
      addprocure(this.formlist)
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
    //获取采购列表
    getlist(value) {
      this.form.procureWay = value.index;
      getprocureList(this.form)
        .then((res) => {
          this.table = [];
          const list = res.data.records;
          const length = list.length;
          this.form.total = Number(res.data.total);
          for (var i = 0; i < length; i++) {
            this.table.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //获取默认列表
    getprolist() {
      getprocureList(this.form)
        .then((res) => {
          this.table = [];
          const list = res.data.records;
          const length = list.length;
          this.form.total = Number(res.data.total);
          console.log(this.total);
          for (var i = 0; i < length; i++) {
            this.table.push(list[i]);
          }
          console.log(this.table);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //打开详情
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
      getdeptUser(this.$store.state.userinfo.userdepartment)
        .then((res) => {
          console.log(res);
          this.deptUser = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
      // console.log(
      //   this.procureType,
      //   this.procureCategory,
      //   this.procureWay,
      //   this.paymentType
      // );
    },
    slice(row) {
      const index = row.lastIndexOf("/");
      const text = row.substr(index + 1);
      return text;
    },
    Down(id) {
      getModle(id);
    },
  },
  created() {
    this.getdictlist();
  },
  mounted() {
    this.getprolist();
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
  .tebs {
    width: 80%;
    height: 1000px;
    margin-top: 20px;
    padding: 20px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;

    .el-tabs {
      border-radius: 15px;
      padding: 10px;
      width: 100%;

      ::v-deep .el-tabs__nav {
        float: none;
      }
      ::v-deep .el-tabs__nav-wrap {
        height: 200px;
        overflow: visible;
      }
      ::v-deep .el-tabs__nav-scroll {
        height: 200px;
      }
      ::v-deep .el-tabs__active-bar {
        height: 0px;
      }
      ::v-deep .el-tabs__item {
        color: #626262;
      }
      ::v-deep .el-tabs__item.is-active {
        border-radius: 15px;
        height: 200px;
        border-right: 1px solid #e4e7ed;
        border-top: 1px solid #e4e7ed;
        border-left: 1px solid #e4e7ed;
        padding: 0px;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
          rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
        background-color: #55f0f88d;
      }
      .tablabel {
        width: 100%;

        .card {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 400px;
          height: 200px;
          border-radius: 15px;
          background-color: #40cfff27;
          .icon {
            font-size: 50px;
          }
          .title {
            font-size: 16px;
          }
        }
      }
      .table {
        padding: 10px;
        box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
          rgba(17, 17, 26, 0.1) 0px 8px 24px,
          rgba(17, 17, 26, 0.1) 0px 16px 56px;
        border: 1px solid rgba(0, 0, 0, 0.16);
        border-radius: 12px;
        .pagination {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 10px;
        }
      }
    }
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
        width: 45vw;
      }
      .formitem {
        display: flex;
        width: 100%;
        justify-content: space-between;
        ::v-deep .el-form-item__label {
          color: #000;
          font-size: 16px;
          width: 7vw;
          margin: 0px;
          text-align: left;
        }
        .el-form-item {
          margin-right: 5px;
          .el-input,
          .el-select {
            width: 20vw;
          }
        }
      }
    }
  }
}
</style>