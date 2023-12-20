<template>
  <div class="container">
    <div class="top-container">
      <div class="top-select">
        <div class="select-title">房屋所在地:</div>
        <el-select v-model="cityValue" clearable @change="changeCity">
          <el-option
            v-for="item in cityParams"
            :key="item.cityName"
            :label="item.cityName"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-select v-model="countyValue" clearable @change="changeCounty">
          <el-option
            v-for="item in countyParams"
            :key="item.countyName"
            :label="item.countyName"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-select v-model="townValue" clearable @change="changetown">
          <el-option
            v-for="item in townParams"
            :key="item.townName"
            :label="item.townName"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <div class="select-title">房屋性质:</div>
        <el-select v-model="data.propertyNatureCode">
          <el-option
            v-for="item in form.housetype"
            :key="item.label"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
        <div class="select-title">审批类型:</div>
        <el-select v-model="data.processCode">
          <el-option
            v-for="item in form.stateType"
            :key="item.label"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
        <div class="select-title">办理形式:</div>
        <el-select v-model="data.handleTypeCode">
          <el-option
            v-for="item in form.submitType"
            :key="item.label"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </div>
      <el-button size="small" icon="el-icon-search" @click="search">
        搜索</el-button
      >
      <el-button size="small" icon="el-icon-refresh" @click="refesh">
        重置</el-button
      >
    </div>
    <div class="mid-container">
      <div class="table" v-if="form.submitList.length === 0">
        <el-table style="width: 100%" border>
          <el-table-column label="入住人" fixed="left"> </el-table-column>
          <el-table-column label="门牌号"> </el-table-column>
          <el-table-column label="小区/楼道/单元"> </el-table-column>
          <el-table-column label="归属地"> </el-table-column>
          <el-table-column label="房屋性质"> </el-table-column>
          <el-table-column label="房屋面积"> </el-table-column>
          <el-table-column label="实际使用面积"> </el-table-column>
          <el-table-column label="公摊使用面积"> </el-table-column>
          <el-table-column label="户型"> </el-table-column>
          <el-table-column label="房间"> </el-table-column>
          <el-table-column label="申请人"> </el-table-column>
          <el-table-column label="职别"> </el-table-column>
          <el-table-column label="办理形式"> </el-table-column>
          <el-table-column label="审批类型"> </el-table-column>
          <el-table-column label="审核状态"> </el-table-column>
          <el-table-column label="提交时间"> </el-table-column>
          <el-table-column label="操作" fixed="right" width="180">
          </el-table-column>
        </el-table>
      </div>
      <div class="table" v-if="form.submitList.length !== 0">
        <el-table
          :data="form.submitList"
          style="width: 100%"
          border
          max-height="600"
        >
          <el-table-column prop="name" label="入住人" fixed="left">
          </el-table-column>
          <el-table-column prop="communityName" label="门牌号">
            <div slot-scope="scope">
              {{ scope.row.house.roomNumber }}
            </div>
          </el-table-column>
          <el-table-column prop="cityName" label="小区/楼道/单元">
            <div slot-scope="scope">
              {{ scope.row.house.houseEstate + scope.row.house.unit }}
            </div>
          </el-table-column>
          <el-table-column prop="provinceName" label="归属地">
          </el-table-column>
          <el-table-column prop="community" label="房屋性质">
            <div slot-scope="scope">
              {{ scope.row.house.propertyNature }}
            </div>
          </el-table-column>
          <el-table-column prop="roomNumber" label="房屋面积">
            <div slot-scope="scope">
              {{ scope.row.house.allArea }}
            </div>
          </el-table-column>
          <el-table-column prop="roomNumber" label="实际使用面积">
            <div slot-scope="scope">
              {{ scope.row.house.actualArea }}
            </div>
          </el-table-column>
          <el-table-column prop="propertyOwner" label="公摊使用面积">
            <div slot-scope="scope">
              {{ scope.row.house.shareArea }}
            </div>
          </el-table-column>
          <el-table-column prop="roomNumber" label="户型">
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
          <el-table-column prop="roomId" label="房间">
            <div slot-scope="scope">
              {{ scope.row.roomId ? scope.row.roomId : "暂无" }}
            </div>
          </el-table-column>
          <el-table-column prop="name" label="申请人"> </el-table-column>
          <el-table-column prop="rankName" label="职别">
            <div slot-scope="scope">
              {{ rankName[scope.row.rankCode - 1] }}
            </div>
          </el-table-column>
          <el-table-column prop="handleType" label="办理形式">
          </el-table-column>
          <el-table-column label="审批类型">
            <div slot-scope="scope">
              <span v-if="scope.row.processCode === 'housing_business'"
                >住房审批</span
              >
              <span v-if="scope.row.processCode === 'house_rent_refund'"
                >退房审批审批</span
              >
            </div>
          </el-table-column>
          <el-table-column prop="roomNumber" label="审核状态">
            <div slot-scope="scope">
              <span v-if="scope.row.status === 0">审核中</span>
              <span v-if="scope.row.status === 1">审核通过</span>
              <span v-if="scope.row.status === 4">待复审</span>
            </div>
          </el-table-column>
          <el-table-column prop="stayCycle" label="提交时间"> </el-table-column>
          <el-table-column
            prop="roomNumber"
            label="操作"
            fixed="right"
            width="180"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                icon="el-icon-edit"
                @click="detile(scope.row)"
                >详情</el-button
              >
              <el-button
                type="text"
                icon="el-icon-check"
                @click="apporOpen(scope.row)"
                :disabled="scope.row.status === 1 ? true : false"
                >审批</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="data.size"
          @prev-click="prev"
          @next-click="prev"
          @current-change="prev"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :title="type === 'appor' ? '入住审批' : '入住详情'"
      :visible.sync="appordialog"
      v-if="appordialog"
      width="60%"
      center
    >
      <div class="form" style="height: 600px; overflow-y: scroll">
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
                    {{ this.scopeRowForm.provinceName }}
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
                    {{ this.scopeRowForm.house.houseEstate }}
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
                    {{ this.scopeRowForm.house.unit }}
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
                    {{ this.scopeRowForm.house.roomNumber }}
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
                    {{ this.scopeRowForm.house.allArea + "㎡" }}
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
                    {{ this.scopeRowForm.house.actualArea + "㎡" }}
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
                    {{ this.scopeRowForm.house.shareArea + "㎡" }}
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
                      this.scopeRowForm.house.bedroomNum +
                      "室" +
                      this.scopeRowForm.house.parlorNum +
                      "厅" +
                      this.scopeRowForm.house.toiletNum +
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
                    {{ this.scopeRowForm.house.propertyNature }}
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
                  <span> {{ this.scopeRowForm.house.allArea + "㎡" }}</span>
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
                  <span>{{ this.scopeRowForm.house.propertyNature }}</span>
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
                    {{ this.scopeRowForm.house.propertyOwner }}
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
                    {{ this.scopeRowForm.house.certificateTitle }}
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
                      this.rentType[
                        this.scopeRowForm.house.houseDetails.rentCycleCode - 1
                      ]
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
                    {{ this.scopeRowForm.house.houseDetails.rentUnitPrice }}
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
                    {{ this.scopeRowForm.house.houseDetails.waterMeter }}
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
                    {{ this.scopeRowForm.house.houseDetails.electricMeter }}
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
                    {{ this.scopeRowForm.house.houseDetails.broadbandMeter }}
                  </span>
                </div>
              </div>
              <span style="text-align: left; font-size: 18px; color: #000"
                >房屋图片</span
              >
              <div class="img" style="display: flex">
                <el-image
                  style="width: 200px; height: 200px; margin-right: 5px"
                  v-for="item in scopeRowForm.house.imageList"
                  :key="item"
                  :src="item"
                  :preview-src-list="scopeRowForm.house.imageList"
                  fit="cover"
                >
                </el-image>
              </div>
              <span style="text-align: left; font-size: 18px; color: #000"
                >备注</span
              >
              <div style="margin-top: 10px; margin-bottom: 15px">
                {{ this.scopeRowForm.notes }}
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
                  <span>
                    {{ this.scopeRowForm.roomId + "室" }}
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
                  <div style="width: 130px">入住周期:</div>
                  <span>
                    {{ this.scopeRowForm.stayCycle }}
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
                    {{ this.scopeRowForm.handleType }}
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
                    {{ this.scopeRowForm.name }}
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
                    {{ this.scopeRowForm.idCard }}
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
                  <div style="width: 130px">性别:</div>
                  <span>
                    {{ sexlist[this.scopeRowForm.sex] }}
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
                  <div style="width: 130px">联系电话:</div>
                  <span>
                    {{ this.scopeRowForm.phone }}
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
                  <div style="width: 130px">紧急联系人:</div>
                  <span>
                    {{ this.scopeRowForm.contactsName }}
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
                  <div style="width: 130px">紧急联系人电话:</div>
                  <span>
                    {{ this.scopeRowForm.contactsPhone }}
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
                    {{ this.scopeRowForm.rankName }}
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
                    {{ this.scopeRowForm.organizationLife }}
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
                ></div>
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
                    {{ this.isture[this.scopeRowForm.isDeleted] }}
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
                    {{ this.isture[this.scopeRowForm.marriageCode] }}
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
                {{ this.scopeRowForm.explains }}
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
              <div
                :style="{
                  width: '100%',
                }"
              >
                <el-table
                  border
                  v-if="this.scopeRowForm.marriageCode !== 0"
                  :data="this.scopeRowForm.marriageProveList"
                  style="width: 200px"
                >
                  <el-table-column label="附件">
                    <div slot-scope="scope">
                      {{ slice(scope.row) }}
                    </div>
                  </el-table-column>
                  <el-table-column label="操作">
                    <div slot-scope="scope">
                      <el-button type="text" @click="down(scope.row)"
                        >下载附件</el-button
                      >
                    </div>
                  </el-table-column>
                </el-table>
              </div>
              <span>
                {{ this.scopeRowForm.notes }}
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
            审批历史
          </div>
          <el-table :data="historylist" max-height="200" border>
            <el-table-column
              prop="taskTitle"
              label="审批节点"
            ></el-table-column>
            <el-table-column prop="userName" label="审批人"></el-table-column>
            <el-table-column prop="userDept" label="审批部门"></el-table-column>
            <el-table-column prop="examineApprove" label="审批意见">
              <div slot-scope="scope">
                {{ scope.row.examineApprove === 0 ? "同意" : "拒绝" }}
              </div>
            </el-table-column>
            <el-table-column prop="opinion" label="备注"></el-table-column>
          </el-table>
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
      <span slot="footer" class="dialog-footer" v-if="type === 'appor'">
        <el-button @click="appordialog = false">取 消</el-button>
        <el-button type="primary" @click="handleAppro('apporForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { submitpass } from "@/api/house/post";
import { getMaplist } from "@/api/map";
import {
  gethouseApproList,
  getUserauditList,
  getApprodetile,
} from "@/api/house/gethouselist";
import { getHistory, getHistoryNode } from "@/api/activite/modle";
import { gethouseAsset } from "@/api/house/getAsset";
import { Disablebutton } from "@/utils/button";
import http from "@/utils/request";
import { getModle } from "@/api/download/download";
export default {
  data() {
    return {
      length: 1,
      current: 1,
      active: "2",
      apporEditdialog: false,
      showDetile: false,
      appordialog: false,
      rentType: ["月", "季", "年"],
      isture: ["否", "是"],
      form: {
        current: 1,
        houseValue: "",
        stateValue: "",
        submitValue: "",
        submitType: [
          {
            label: "不限",
            value: null,
          },
          {
            label: "自己办",
            value: "0",
          },
          {
            label: "代办",
            value: "1",
          },
        ],
        stateType: [
          {
            label: "不限",
            value: null,
          },

          {
            label: "入住审批",
            value: "housing_business",
          },
          {
            label: "退租审批",
            value: "house_rent_refund",
          },
        ],
        housetype: [
          {
            label: "不限",
            value: null,
          },
          {
            label: "集体宿舍",
            value: "1",
          },
          {
            label: "干部交流用房",
            value: "2",
          },
          {
            label: "临时周转用房",
            value: "3",
          },
          {
            label: "集中工作用饭",
            value: "4",
          },
        ],
        submitList: [],
      },
      apporForm: {
        input: "",
        selectRadio: null,
        file: "",
      },
      data: {
        userId: this.$store.state.userinfo.userID,
        size: 10,
        current: 1,
        houseCode: null,
        handleTypeCode: null,
        status: null,
        processCode: null,
        propertyNatureCode: null,
      },
      rankName: ["其他干部", "副处级", "正处级", "副司级", "正司级"],
      scopeRowForm: {},
      flowForm: [],
      cityParams: [],
      countyParams: [],
      townParams: [],
      houseList: [],
      cityValue: "",
      countyValue: "",
      townValue: "",
      type: "",
      houseobject: [],
      total: 0,
      historylist: [],
      sexlist: ["男", "女"],
    };
  },
  methods: {
    //打开审批模块
    apporOpen(row) {
      // this.scopeRowForm = row;
      // console.log(this.scopeRowForm);
      this.$router.push({
        path: "/houseprocure",
        query: {
          id: row.id,
          processCode: row.processCode,
        },
      });
      // getApprodetile(row.id)
      //   .then((res) => {
      //     this.scopeRowForm = res.data;
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      // getHistoryNode(row.id).then((res) => {
      //   console.log(res);
      //   // this.title = res.data.title + "审批";
      //   // this.confirmstatus = res.data.status;
      // });
      // getHistory(row.id)
      //   .then((res) => {
      //     this.historylist = res.data;
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      // this.type = "appor";
      // this.appordialog = true;
    },
    //打开详情
    detile(row) {
      this.appordialog = true;
      this.scopeRowForm = row;
      console.log(this.scopeRowForm);
      this.type = "detile";
      this.houseobject = [];
      gethouseAsset(row.houseId)
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.houseobject.push(list[i]);
          }
          console.log(this.houseobject);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //增加审核节点
    addFlow() {
      const id = this.flowForm.length;
      this.flowForm.push({
        name: id,
        apporMan: [],
        sumbitMan: [],
        id: id,
      });
    },
    //删除审核节点
    remove(index) {
      const i = index;
      console.log(i);
      this.flowForm.splice(i, 1);
      console.log(this.flowForm);
    },
    //打开流程模块
    openFlowEdit() {
      this.apporEditdialog = true;
    },
    //获取当前用户审核列表
    getuserApprolist() {
      getUserauditList(this.data)
        .then((res) => {
          this.total = Number(res.data.total);
          const list = res.data.records;
          const lenght = list.length;
          for (var i = 0; i < lenght; i++) {
            this.form.submitList.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    search() {
      this.form.submitList = [];
      getUserauditList(this.data)
        .then((res) => {
          const list = res.data.records;
          const lenght = list.length;
          for (var i = 0; i < lenght; i++) {
            this.form.submitList.push(list[i]);
          }
          console.log(this.form.submitList);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //获取申请列表
    getApproList() {
      gethouseApproList(this.current)
        .then((res) => {
          // this.form.current = Number(res.data.pages);
          // const list = res.data.records;
          // const lenght = list.length;
          // for (var i = 0; i < lenght; i++) {
          //   this.form.submitList.push(list[i]);
          // }
          // console.log(this.form.submitList, "aa");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //提交审核
    handleAppro(forName) {
      this.$refs[forName].validate((vaild) => {
        if (vaild) {
          const judge = this.apporForm.selectRadio;
          const relatedId = this.scopeRowForm.id;
          const userId = this.$store.state.userinfo.userID;
          const option = this.apporForm.input;
          const annex = this.apporForm.file;
          submitpass(judge, relatedId, userId, option, annex)
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
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    //翻页
    prev(index) {
      console.log(index);
      this.data.current = index;
      this.form.submitList = [];
      this.getuserApprolist();
    },
    //省市选择
    changeCity(value) {
      this.data.houseCode = value;
      for (var i = 0; i < this.cityParams.length; i++) {
        var secondObject = this.cityParams[i];
        if (value === secondObject.id) {
          this.countyParams = secondObject.children;
          this.countyParams.id = "";
        }
      }
    },
    changeCounty(value) {
      this.data.houseCode = value;
      for (var i = 0; i < this.countyParams.length; i++) {
        var thredObject = this.countyParams[i];
        if (value === thredObject.id) {
          this.townParams = thredObject.children;
          this.townParams.id = "";
        }
      }
    },
    //获取地图
    getmap() {
      getMaplist()
        .then((res) => {
          const citylist = res.data[0].children;
          const citylength = res.data[0].children.length;
          for (var i = 0; i < citylength; i++) {
            this.cityParams.push(citylist[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //上传文件
    upload(data) {
      const imgData = data.file;
      console.log(imgData);
      const form = new FormData();
      form.append("file", imgData);
      http({
        method: "post",
        url: "/file/upload",
        data: form,
        header: { "content-type": "multipart/form-data;" },
      })
        .then((res) => {
          this.apporForm.file = res.data;
          this.$notify({
            title: "成功",
            message: res.message,
            type: "success",
          });
        })
        .catch((error) => {
          console.error(error);
          this.$notify({
            title: "成功",
            message: res.message,
            type: "success",
          });
        });
    },
    changetown(value) {
      this.data.houseCode = value;
    },
    refesh() {
      this.$router.go();
    },
    down(row) {
      getModle(row);
    },
    slice(row) {
      const index = row.lastIndexOf("/");
      const text = row.substr(index + 1);
      return text;
    },
  },
  mounted() {
    this.getmap();
    this.getuserApprolist();
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(100vh - 60px);
  background-color: #ffffff;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  ::v-deep .el-form-item__label {
    font-size: 16px;
  }
  .top-container {
    width: calc(100% - 80px);
    margin: 20px;
    padding: 20px;
    display: flex;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    border-radius: 20px;
    justify-content: space-between;
    .top-select {
      display: flex;
      align-items: center;
      .el-select {
        margin-left: 5px;
        width: 200px;
        margin-right: 15px;
      }
    }
    .top-seach {
      padding-right: 20px;
      display: flex;
    }
    .ref {
      margin-left: 20px;
      margin-right: 20px;
    }
    .addbutton {
      margin-right: 20px;
    }
  }
  .mid-container {
    width: calc(100% - 50px);
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 20px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    .pagination {
      display: flex;
      margin-top: 5px;
      justify-content: flex-end;
    }
    .table {
      border-radius: 20px;
      padding: 15px;
      ::v-deep .el-table__expanded-cell el-table__row {
        background-color: transparent;
      }

      ::v-deep .el-table-column,
      ::v-deep .el-table__row tr,
      ::v-deep .el-table__row td {
        background-color: transparent;
      }
    }
  }
}
</style>