<template>
  <div class="container">
    <div class="left">贵阳海关黔哨监督应用系统</div>
    <div class="mid">
      <div class="button">
        <el-menu mode="horizontal" default-active="1" text-color="#fff">
          <el-menu-item index="1">督审监督</el-menu-item>
          <el-menu-item index="2">人事监督</el-menu-item>
          <el-menu-item index="3">政工监督</el-menu-item>
          <el-menu-item index="4">党建监督</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="right">
      <div class="icon">
        <el-badge :is-dot="!!mesnum && mesnum !== '0'" class="item">
          <el-dropdown>
            <el-button
              :type="danger ? 'danger' : 'primary'"
              icon="el-icon-message-solid"
            ></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="clearfix">
                <el-button
                  @click="centerDialogVisible = true"
                  style="margin: 0; border: none"
                  width="10px"
                  >未读消息</el-button
                >
                <el-badge class="mark" :value="mesnum" />
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-badge>
      </div>
      <div class="user-icon">
        <div class="username">{{ userinfo.userName }}</div>
      </div>
    </div>
    <el-dialog
      title="消息列表"
      :visible.sync="centerDialogVisible"
      width="60%"
      center
      v-if="centerDialogVisible === true"
    >
      <div class="miss" v-show="!length">暂无数据</div>
      <div class="mskbox">
        <el-button
          class="Msg"
          v-for="item in Meg"
          :key="item.id"
          v-show="length"
        >
          <div class="title">
            {{ item.title }}
          </div>
          <div class="derwline"></div>
          <div class="content" @click="showcentent(item)">
            {{ item.content }}
          </div>
          <div class="title">
            {{ item.title }}
          </div>
          <div class="derwline"></div>
          <div
            class="footer"
            style="display: flex; justify-content: space-between"
          >
            {{ item.createTime }}
            <div>
              <el-button size="small" :type="msg[item.status].type">
                {{ msg[item.status].label }}
              </el-button>
              <el-button
                @click="delele(item)"
                size="small"
                icon="el-icon-delete"
                type="danger"
              >
                删除
              </el-button>
            </div>
          </div>
        </el-button>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="form.size"
        @prev-click="changepage"
        @next-click="changepage"
        @current-change="changepage"
      >
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="success" @click="readAll">一键已读</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :title="titel"
      :visible.sync="appordialog"
      width="60%"
      center
      v-if="appordialog === true"
    >
      <div class="Form" style="height: 600px; overflow-y: scroll">
        <div class="formitem">
          <div
            class="title"
            style="
              text-align: left;
              font-size: 20px;
              color: #000;
              font-weight: bold;
            "
          >
            房屋信息
          </div>
          <div class="list">
            <div class="list-item" style="text-align: left; margin-top: 10px">
              <span style="text-align: left; font-size: 18px; color: #000"
                >基础信息</span
              >
              <div
                class="itemlist"
                style="
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
                  margin-top: 10px;
                "
              >
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">所属区域:</div>
                  <span>
                    {{ this.submitList.provinceName }}
                  </span>
                </div>
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">小区名称:</div>
                  <span>
                    {{ submitList.house.houseEstate }}
                  </span>
                </div>
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">楼栋/单元:</div>
                  <span>
                    {{ submitList.house.unit }}
                  </span>
                </div>
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">房号:</div>
                  <span>
                    {{ submitList.house.roomNumber }}
                  </span>
                </div>
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">房屋面积:</div>
                  <span>
                    {{ submitList.house.allArea + "㎡" }}
                  </span>
                </div>
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">实际使用面积:</div>
                  <span>
                    {{ submitList.house.actualArea + "㎡" }}
                  </span>
                </div>
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">公摊使用面积:</div>
                  <span>
                    {{ submitList.house.shareArea + "㎡" }}
                  </span>
                </div>
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">户型:</div>
                  <span>
                    {{
                      submitList.house.bedroomNum +
                      "室" +
                      submitList.house.parlorNum +
                      "厅" +
                      submitList.house.toiletNum +
                      "卫"
                    }}
                  </span>
                </div>
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">房屋性质:</div>
                  <span>
                    {{ submitList.house.propertyNature }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="formitem" v-if="showDetile">
          <div class="list">
            <div class="list-item" style="text-align: left; margin-top: 10px">
              <span style="text-align: left; font-size: 18px; color: #000"
                >房间信息</span
              >
              <div
                class="itemlist"
                style="
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
                  margin-top: 10px;
                  margin-bottom: 15px;
                "
              >
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">房间面积:</div>
                  <span> {{ submitList.house.allArea }} </span>
                </div>
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">房屋性质:</div>
                  <span>
                    {{ submitList.house.propertyNature }}
                  </span>
                </div>
              </div>
              <span style="text-align: left; font-size: 18px; color: #000"
                >产权信息</span
              >
              <div
                class="itemlist"
                style="
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
                  margin-top: 10px;
                  margin-bottom: 15px;
                "
              >
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">产权人:</div>
                  <span>
                    {{ submitList.house.propertyOwner }}
                  </span>
                </div>
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">房产证:</div>
                  <span>
                    {{ submitList.house.certificateTitle }}
                  </span>
                </div>
              </div>
              <span style="text-align: left; font-size: 18px; color: #000"
                >租金信息</span
              >
              <div
                class="itemlist"
                style="
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
                  margin-top: 10px;
                  margin-bottom: 15px;
                "
              >
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">租金计算周期:</div>
                  <span>
                    {{
                      rentType[submitList.house.houseDetails.rentCycleCode - 1]
                    }}
                  </span>
                </div>
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">房屋租金:</div>
                  <span>
                    {{ submitList.house.houseDetails.rentUnitPrice }}
                  </span>
                </div>
              </div>
              <span style="text-align: left; font-size: 18px; color: #000"
                >水电宽带号</span
              >
              <div
                class="itemlist"
                style="
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
                  margin-top: 10px;
                  margin-bottom: 15px;
                "
              >
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">水表号:</div>
                  <span>
                    {{ submitList.house.houseDetails.waterMeter }}
                  </span>
                </div>
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 100px">电表号:</div>
                  <span>
                    {{ submitList.house.houseDetails.electricMeter }}
                  </span>
                </div>
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">宽带号:</div>
                  <span>
                    {{ submitList.house.houseDetails.broadbandMeter }}
                  </span>
                </div>
              </div>
              <span style="text-align: left; font-size: 18px; color: #000"
                >房屋图片</span
              >
              <div class="img" style="display: flex">
                <el-image
                  v-for="item in submitList.house.imageList"
                  :key="item"
                  style="width: 200px; height: 200px; margin-right: 5px"
                  fit="cover"
                  :src="item"
                  :preview-src-list="submitList.house.imageList"
                >
                </el-image>
              </div>
              <span style="text-align: left; font-size: 18px; color: #000"
                >备注</span
              >
              <div style="margin-top: 10px; margin-bottom: 15px">
                {{ submitList.notes }}
              </div>
              <span style="text-align: left; font-size: 18px; color: #000"
                >房屋资产</span
              >

              <el-table :data="houseobject" border>
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column
                  prop="assetName"
                  label="资产名称"
                ></el-table-column>
                <el-table-column prop="brand" label="品牌"></el-table-column>
                <el-table-column
                  prop="specificationType"
                  label="规格型号"
                ></el-table-column>
                <el-table-column
                  prop="unitPrice"
                  label="单价"
                ></el-table-column>
                <el-table-column
                  prop="acquisitionDate"
                  label="取得日期"
                ></el-table-column>
                <el-table-column
                  prop="usefulLife"
                  label="使用年限"
                ></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <el-button
          type="text"
          size="medium"
          style="font-size: 18px; margin-top: 10px"
          @click="
            showDetile === true ? (showDetile = false) : (showDetile = true)
          "
          >{{ showDetile === true ? "收起" : "展开" }}</el-button
        >
        <div class="formitem">
          <div
            class="title"
            style="
              text-align: left;
              font-size: 20px;
              color: #000;
              font-weight: bold;
            "
          >
            申请信息
          </div>
          <div class="list">
            <div class="list-item" style="text-align: left; margin-top: 10px">
              <div
                class="itemlist"
                style="
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
                  margin-top: 10px;
                "
              >
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">入住房间:</div>
                  <span> </span>
                </div>
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">入住周期:</div>
                  <span>
                    {{ this.submitList.stayCycle }}
                  </span>
                </div>
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">办理形式:</div>
                  <span>
                    {{ this.submitList.handleType }}
                  </span>
                </div>
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">姓名:</div>
                  <span>
                    {{ this.submitList.name }}
                  </span>
                </div>
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">身份证号:</div>
                  <span>
                    {{ this.submitList.idCard }}
                  </span>
                </div>
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">户籍:</div>
                  <span>
                    {{ this.submitList.provinceName }}
                  </span>
                </div>
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">工作属性:</div>
                  <span>
                    {{ this.submitList.rankCode }}
                  </span>
                </div>
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">工作年限:</div>
                  <span>
                    {{ this.submitList.organizationLife }}
                  </span>
                </div>
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                    align-items: flex-end;
                  "
                >
                  <div style="width: 130px">
                    本人及家庭成员工作地是否购买或承租保障性住房：:
                  </div>
                  <span>
                    {{ this.isture[submitList.isDeleted] }}
                  </span>
                </div>
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                    align-items: flex-end;
                  "
                >
                  <div style="width: 130px">
                    本人及家庭成员工作地是否购买或承租保障性住房:
                  </div>
                  <span>
                    {{ this.isture[this.submitList.isDeleted] }}
                  </span>
                </div>
                <div
                  class="item"
                  style="
                    width: 50%;
                    font-size: 16px;
                    display: flex;
                    margin-top: 10px;
                  "
                >
                  <div style="width: 130px">婚姻情况:</div>
                  <span>
                    {{ this.isture[this.submitList.marriageCode] }}
                  </span>
                </div>
              </div>
              <div
                style="
                  text-align: left;
                  font-size: 16px;
                  margin-top: 10px;
                  margin-bottom: 10px;
                "
              >
                申请说明:
              </div>
              <span>
                {{ this.submitList.explains }}
              </span>
              <div
                style="
                  text-align: left;
                  font-size: 16px;
                  margin-top: 10px;
                  margin-bottom: 10px;
                "
              >
                备注:
              </div>
              <span>
                {{ this.submitList.notes }}
              </span>
            </div>
          </div>
        </div>
        <div class="formitem" v-if="type === 'appor'">
          <div
            class="title"
            style="
              text-align: left;
              font-size: 20px;
              color: #000;
              font-weight: bold;
              margin-top: 20px;
              margin-bottom: 10px;
            "
          >
            审批
          </div>
          <el-form :model="apporForm" ref="apporForm">
            <el-form-item
              label="审批结果："
              prop="selectRadio"
              :rules="{
                required: true,
                message: '请选择审批结果',
              }"
            >
              <el-radio-group v-model="apporForm.selectRadio">
                <el-radio :label="0">同意</el-radio>
                <el-radio :label="1">不同意</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="上传附件">
              <el-upload
                action="http://192.168.2.176:9601/file/upload"
                headers="{'content-type': 'multipart/form-data; boundary=---011000010111000001101001'}"
                :http-request="upload"
              >
                <el-button size="small" type="primary"> 点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="备注:">
              <el-input
                v-model="apporForm.input"
                maxlength="300"
                show-word-limit
                type="textarea"
                autosize
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="共性问题列表"
      width="90%"
      :visible.sync="comdialog"
      v-if="comdialog === true"
    >
      <el-table :data="tablelist" border>
        <el-table-column type="index" label="序号" fixed></el-table-column>
        <el-table-column
          align="center"
          prop="problemDescription"
          label="问题简述"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="businessArea"
          label="业务领域"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="businessSubcategories"
          label="业务小类"
        ></el-table-column>
        <el-table-column
          prop="auditCustoms"
          align="center"
          label="审计海关"
        ></el-table-column>
        <el-table-column
          prop="responsibleDeptList"
          label="整改责任部门"
          align="center"
        ></el-table-column>
        <el-table-column label="整改状态" align="centder">
          <div slot-scope="scope">
            <el-button size="small" :type="status[scope.row.status].type">
              {{ status[scope.row.status].label }}
            </el-button>
          </div>
        </el-table-column>
        <el-table-column
          prop="auditTimeFrame"
          label="整改期限"
          align="center"
        ></el-table-column>
        <el-table-column label="整改内容" align="center" width="160">
          <div slot-scope="scope" v-if="scope.row.situationList.length !== 0">
            <div v-for="item in scope.row.situationList" :key="item.id">
              {{ item.deptName + "-" + item.rectificationSituation }}
            </div>
            <div v-if="scope.row.situationList.length === 0">--</div>
          </div>
        </el-table-column>
        <el-table-column label="整改审核状态" align="center">
          <div slot-scope="scope">
            {{ scope.row.isExamine === 1 ? "已审核" : "待审核" }}
          </div>
        </el-table-column>
        <el-table-column label="内控关联状态" align="center">
          <div slot-scope="scope">
            {{ scope.row.internalStatus !== 0 ? "已关联" : "待关联" }}
          </div>
        </el-table-column>
        <el-table-column label="制度关联状态" align="center">
          <div slot-scope="scope">
            {{ scope.row.rulesStatus !== 0 ? "已关联" : "待关联" }}
          </div>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="录入人"
          align="center"
        ></el-table-column>
        <el-table-column label="状态" align="center">
          <div slot-scope="scope">
            {{ scope.row.isCancel === 0 ? "生效" : "过期" }}
          </div>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="录入时间"
          align="centder"
        ></el-table-column>
        <el-table-column label="操作">
          <div slot-scope="scope">
            <el-button type="text" @click="goproblem(scope.row)">
              去查看
            </el-button>
          </div>
        </el-table-column>
      </el-table>
      <div class="pagination" style="display: flex; justify-content: flex-end">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="comtotal"
          :page-size="comform.size"
          @prev-click="changepage"
          @next-click="changepage"
          @current-change="changepage"
        >
        </el-pagination>
      </div>
    </el-dialog>
    <el-dialog
      title="采购详情"
      :visible.sync="detileialog"
      width="60%"
      center
      v-if="detileialog === true"
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
              <el-input
                v-model="detilelist.budgetAmount"
                type="number"
              ></el-input>
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
            <el-form-item label="合同编号" v-if="detilelist.contractNum">
              <el-input v-model="detilelist.contractNum"></el-input>
            </el-form-item>
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
    <el-dialog
      title="风险采购详情"
      :visible.sync="risklog"
      width="60%"
      center
      v-if="risklog === true"
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
              <el-select
                v-model="formlist.paymentType"
                :placeholder="paymentType[0].dictLabel"
              >
              </el-select>
            </el-form-item>
          </div>
          <div class="formitem">
            <el-form-item label="合同编号">
              <el-input v-model="formlist.contractNum"></el-input>
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
        <el-button @click="risklog = false" type="danger">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getdict } from "@/api/dict/getdict";
import { getCommonalist } from "@/api/notice/getdatanotice";
import { getApprodetile } from "@/api/house/gethouselist";
import { getprocureDetil } from "@/api/procure/getprocure";
import {
  getMessage,
  getMsgText,
  readMsg,
  delelemessage,
  readAllMsg,
} from "../api/getmessge";
import { gethouseAsset } from "@/api/house/getAsset";
import { decryptlong } from "@/utils/jsencrypt";
export default {
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      sizeList: ["large", "medium", "small"],
      mesnum: "",
      centerDialogVisible: false,
      showDetile: false,
      query: {},
      length: "",
      Meg: [],
      form: {
        size: 10,
        current: 1,
        user: this.$store.state.userinfo.userID,
        deptId: this.$store.state.userinfo.userdepartment,
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
      userinfo: {},
      type: "",
      appordialog: false,
      submitList: {},
      isture: ["是", "否"],
      rentType: ["月", "季", "年"],
      titel: "",
      comform: {
        size: 10,
        current: 1,
        businessSubcategoriesCode: "",
      },
      comtotal: 0,
      tablelist: [],
      comdialog: false,
      status: [
        {
          label: "待整改",
          type: "warning",
        },
        {
          label: "已整改",
          type: "success",
        },
        {
          label: "整改到期",
          type: "danger",
        },
      ],
      msg: [
        {
          label: "未读",
          type: "warning",
        },
        {
          label: "不正常",
          type: "danger",
        },
        {
          label: "已读",
          type: "success",
        },
      ],
      detileialog: false,
      detilelist: {},
      procureType: [],
      procureCategory: [],
      procureWay: [],
      paymentType: [],
      risklog: false,
      houseobject: [],
      danger: false,
    };
  },
  methods: {
    getMes() {
      getMessage()
        .then((res) => {
          const numlist = res.data;
          this.mesnum = numlist;
          console.log(this.mesnum, "ss");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMsg() {
      this.Meg = [];
      getMsgText(this.form)
        .then((res) => {
          // const msg = res.data;
          const msg = res.data;
          this.total = Number(msg.total);
          for (var i = 0; i < msg.records.length; i++) {
            this.length = msg.records.length;
            this.Meg.push(msg.records[i]);
          }
          const allform = {
            size: Number(msg.total),
            current: 1,
            status: 0,
            user: this.$store.state.userinfo.userID,
            deptId: this.$store.state.userinfo.userdepartment,
          };
          getMsgText(allform).then((res) => {
            console.log(res, "all");
            for (var i = 0; i < res.data.records.length; i++) {
              if (res.data.records[i].type === "procure_risk") {
                this.danger = true;
                break;
              } else {
                this.danger = false;
              }
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changepage(value) {
      this.form.current = value;
      this.Meg = [];
      getMsgText(this.form)
        .then((res) => {
          const msg = res.data;
          this.total = Number(res.data.total);
          for (var i = 0; i < msg.records.length; i++) {
            this.length = msg.records.length;
            this.Meg.push(msg.records[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showcentent(item) {
      if (item.type === "house_rent_refund") {
        this.titel = "退租审批房屋详情";
        getApprodetile(item.relatedId)
          .then((res) => {
            this.submitList = res.data;
            console.log(this.submitList);
          })
          .catch((error) => {
            console.error(error);
          });
        this.getasset(item.relatedId);
        this.appordialog = true;
        this.type = "detile";
        this.$router.push('/public3"');
      }
      if (item.type === "housing_business") {
        this.$router
          .push({
            path: "/houseprocure",
            query: {
              id: item.relatedId,
              processCode: item.type,
            },
          })
          .then(() => {
            this.$router.go();
          });
      }
      if (item.type === "house_approaching_expiration_date") {
        this.titel = "临近到期房屋详情";
        getApprodetile(item.relatedId)
          .then((res) => {
            this.submitList = res.data;
            console.log(this.submitList);
          })
          .catch((error) => {
            console.error(error);
          });
        this.getasset(item.relatedId);
        this.appordialog = true;
        this.type = "detile";
      }
      if (item.type === "house_expire") {
        this.titel = "过期房屋详情";
        getApprodetile(item.relatedId)
          .then((res) => {
            this.submitList = res.data;
            console.log(this.submitList);
          })
          .catch((error) => {
            console.error(error);
          });
        this.getasset(item.relatedId);
        this.appordialog = true;
        this.type = "detile";
      }
      if (item.type === "house_warning") {
        this.titel = "到期预警房屋详情";
        getApprodetile(item.relatedId)
          .then((res) => {
            this.submitList = res.data;
            console.log(this.submitList);
          })
          .catch((error) => {
            console.error(error);
          });
        this.getasset(item.relatedId);
        this.appordialog = true;
        this.type = "detile";
      }
      if (item.type === "number_problem_repetitions") {
        this.tablelist = [];
        this.comform.businessSubcategoriesCode = item.relatedId;
        getCommonalist(this.comform)
          .then((res) => {
            this.comtotal = Number(res.data.total);
            for (var i = 0; i < res.data.records.length; i++) {
              this.tablelist.push(res.data.records[i]);
            }
            this.comdialog = true;
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (item.type === "problem_expire") {
        this.$router
          .push({
            path: "/datadetil",
            query: {
              id: item.relatedId,
              type: "detile",
            },
          })
          .then((res) => {
            this.$router.go();
          });
      }
      if (item.type === "problemBase") {
        this.$router
          .push({
            path: "/datadetil",
            query: {
              id: item.relatedId,
              type: "detile",
            },
          })
          .then((res) => {
            this.$router.go();
          });
      }
      if (item.type === "problem_warning") {
        this.$router.push({
          path: "/datadetil",
          query: {
            id: item.relatedIdid,
            type: "detile",
          },
        });
        this.$router.go();
      }
      if (item.type === "problem_expire") {
        this.$router.push({
          path: "/datadetil",
          query: {
            id: item.relatedIdid,
            type: "detile",
          },
        });
        this.$router.go();
      }
      if (item.type === "self_procurement_and_comparison_open_outcry") {
        getprocureDetil(item.relatedId)
          .then((res) => {
            this.detilelist = res.data;
            this.detileialog = true;
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (item.type === "self_procurement_market_comparison") {
        getprocureDetil(item.relatedId)
          .then((res) => {
            this.detilelist = res.data;
            this.detileialog = true;
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (item.type === "entrusted_procurement") {
        getprocureDetil(item.relatedId)
          .then((res) => {
            this.detilelist = res.data;
            this.detileialog = true;
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (item.type === "examine_notification") {
        getprocureDetil(item.relatedId)
          .then((res) => {
            this.detilelist = res.data;
            this.detileialog = true;
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (item.type === "procure_risk") {
        getprocureDetil(item.relatedId)
          .then((res) => {
            this.detilelist = res.data;
            this.risklog = true;
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (item.type === "government_procurement") {
        this.$router
          .push({
            path: "/procure",
            query: {
              id: item.relatedId,
              processCode: item.type,
            },
          })
          .then(() => {
            this.$router.go();
          });
      }
      readMsg(item.id)
        .then((res) => {
          this.getMsg();
          this.getMes();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    goproblem(row) {
      this.$router
        .push({
          path: "/datadetil",
          query: {
            id: row.id,
            type: "detile",
          },
        })
        .then((res) => {
          this.$router.go();
        });
    },
    //获取业务字典
    getdictlist() {
      getdict("procurement_type").then((res) => {
        const list = res.data.records;
        // const list = decryptlong(res.data);
        // const a = JSON.parse(list);
        // console.log(a, "lista ");
        const length = list.length;
        for (var i = 0; i < length; i++) {
          this.procureType.push(list[i]);
        }
      });
      getdict("purchase_categories").then((res) => {
        const list = res.data.records;
        // const list = decryptlong(res.data);
        // const a = JSON.parse(list);
        // console.log(a , 'sssssss')
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
    },
    //删除消息
    delele(item) {
      this.$confirm("是否删除该消息", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(() => {
          delelemessage(item.id)
            .then((res) => {
              this.$notify({
                title: "成功",
                type: "success",
              });
              this.getMsg();
              this.getMes();
            })
            .catch((error) => {
              consloe.error(error);
            });
        })
        .catch(() => {
          console.log("false");
        });
    },
    //获取资产
    getasset(id) {
      gethouseAsset(id)
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.houseobject.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //一键已读
    readAll() {
      this.$confirm("您确定要一键已读所有信息吗", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          readAllMsg(this.$store.state.userinfo.userlist)
            .then((res) => {
              this.$message({
                titel: "成功",
                message: res.msg,
                type: "success",
              });
              this.getMsg();
              this.getMes();
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    Close() {
      console.log("sss");
      this.detileialog = false;
    },
  },
  mounted() {
    this.userinfo = this.$store.state.userinfo;
    this.getMes();
    this.getMsg();
    this.getdictlist();
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC",
    sans-serif;
  background-image: linear-gradient(45deg, #003366, #006699, #0099cc);
  background-size: 200% 200%;
  animation: sci-fi-animation 12s linear infinite;
  transition: all 0.6s;

  @keyframes sci-fi-animation {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
  font-size: 18px;
  border-bottom: 1px solid #ccc;
  .left {
    padding-left: 23px;
    font-weight: bold;
  }
  .mid {
    .button {
      display: flex;
      ::v-deep .el-menu--horizontal {
        background-color: transparent;
      }
      ::v-deep .el-menu-item.is-active {
        background-color: rgba(2, 167, 240, 1);
        color: #fff;
      }
      ::v-deep .el-menu-item {
        width: 150px;
      }
      ::v-deep .el-menu-item:hover {
        background-color: rgba(2, 167, 240, 1);
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    padding-right: 23px;
    .item {
      width: 70px;
      margin-right: 60px;
      .el-button {
        font-size: 20px;
      }
    }
    .user-icon {
      display: flex;
      align-items: center;
      .avg {
        margin-right: 20px;
      }
      .username {
        line-height: normal;
      }
    }
  }
  .el-dialog {
    overflow-y: scroll;
    overflow-x: hidden;
    .mskbox {
      height: 600px;
      overflow-y: scroll;
      .Msg {
        border-radius: 15px;
        width: 99%;
        backdrop-filter: blur(50px);
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
        text-align: left;
        overflow-y: scroll;
        overflow-x: hidden;
        .title,
        .content,
        .footer {
          margin: 10px;
          color: #000;
        }
        .el-divider {
          margin: 1px, 0, 0, 0;
        }
        .content {
          font-size: 20px;
        }
        .derwline {
          width: 100%;
          height: 1px;
          margin: 1px, 0, 0, 0;
          background-color: #ccc;
        }
        .title {
          font-size: 16px;
          font-weight: 500;
          color: #908f8f;
        }
        .content {
          font-size: 20px;
        }
        .footer {
          margin-bottom: 10px;
        }
      }
      .Msg:hover {
        background-color: #6bb6f43f;
      }
    }
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