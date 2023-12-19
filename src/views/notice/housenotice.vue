<template>
  <div class="container">
    <div class="tab">
      <el-tabs v-model="tab" @tab-click="changetab">
        <el-tab-pane name="1" label="审批通知">
          <div class="content">
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
                <el-select
                  v-model="countyValue"
                  clearable
                  @change="changeCounty"
                >
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
                <el-select v-model="form.houseValue" clearable>
                  <el-option
                    v-for="item in form.housetype"
                    :key="item.label"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="top-seach">
                <el-button type="success" @click="serchone">查询</el-button>
                <el-button>重置</el-button>
              </div>
            </div>
            <div class="table">
              <el-table :data="loadingnotice" border>
                <el-table-column label="房屋">
                  <div slot-scope="scope">
                    {{
                      scope.row.house.cityName +
                      scope.row.house.regionName +
                      scope.row.house.communityName +
                      scope.row.house.houseEstate +
                      scope.row.house.unit
                    }}
                  </div>
                </el-table-column>
                <el-table-column label="房屋性质">
                  <div slot-scope="scope">
                    {{
                      form.housetype[scope.row.house.propertyNatureCode - 1]
                        .label
                    }}
                  </div>
                </el-table-column>
                <el-table-column prop="name" label="入住人"></el-table-column>
                <el-table-column prop="dept.allPath" label="单位/部门">
                  <!-- <div slot-scope="scope">
                    {{ scope.row.dept.customsName + "-" + scope.row.dept.name }}
                  </div> -->
                </el-table-column>
                <el-table-column label="办理形式">
                  <div slot-scope="scope">
                    {{ form.handletype[scope.row.handleTypeCode - 1].label }}
                  </div>
                </el-table-column>
                <el-table-column
                  prop="sendTime"
                  label="发送时间"
                ></el-table-column>
                <el-table-column label="操作">
                  <div slot-scope="scope">
                    <el-button type="text" @click="detile(scope.row)">
                      去查看
                    </el-button>
                  </div>
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="data.total"
                  :page-size="data.size"
                  @prev-click="changepage"
                  @next-click="changepage"
                  @current-change="changepage"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="2" label="房屋临近到期通知">
          <div class="content">
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
                <el-select
                  v-model="countyValue"
                  clearable
                  @change="changeCounty"
                >
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
                <el-select v-model="form.houseValue">
                  <el-option
                    v-for="item in form.housetype"
                    :key="item.label"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="top-seach">
                <el-button type="success" @click="seachtow">查询</el-button>
                <el-button>重置</el-button>
              </div>
            </div>
            <div class="table">
              <el-table :data="Warningnotice" border>
                <el-table-column label="房屋">
                  <div slot-scope="scope">
                    {{
                      scope.row.house.cityName +
                      scope.row.house.regionName +
                      scope.row.house.communityName +
                      scope.row.house.houseEstate +
                      scope.row.house.unit
                    }}
                  </div>
                </el-table-column>
                <el-table-column label="房屋性质">
                  <div slot-scope="scope">
                    {{
                      form.housetype[scope.row.house.propertyNatureCode].label
                    }}
                  </div>
                </el-table-column>
                <el-table-column prop="name" label="入住人"></el-table-column>
                <el-table-column prop="dept.allPath" label="单位/部门">
                </el-table-column>
                <el-table-column label="办理形式">
                  <div slot-scope="scope">
                    {{ form.handletype[scope.row.handleTypeCode - 1].label }}
                  </div>
                </el-table-column>
                <el-table-column
                  prop="stayCycle"
                  label="租赁期限"
                ></el-table-column>
                <el-table-column
                  prop="sendTime"
                  label="发送时间"
                ></el-table-column>
                <el-table-column label="操作">
                  <div slot-scope="scope">
                    <el-button type="text" @click="detile(scope.row)">
                      去查看
                    </el-button>
                  </div>
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="datatwo.total"
                  :page-size="datatwo.size"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="3" label="房屋过期通知">
          <div class="content">
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
                <el-select
                  v-model="countyValue"
                  clearable
                  @change="changeCounty"
                >
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
                <el-select v-model="form.houseValue">
                  <el-option
                    v-for="item in form.housetype"
                    :key="item.label"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="top-seach">
                <el-button type="success" @click="serchthree">查询</el-button>
                <el-button>重置</el-button>
              </div>
            </div>
            <div class="table">
              <el-table :data="Expirenotice" border>
                <el-table-column label="房屋">
                  <div slot-scope="scope">
                    {{
                      scope.row.house.cityName +
                      scope.row.house.regionName +
                      scope.row.house.communityName +
                      scope.row.house.houseEstate +
                      scope.row.house.unit
                    }}
                  </div>
                </el-table-column>
                <el-table-column label="房屋性质">
                  <div slot-scope="scope">
                    {{
                      form.housetype[scope.row.house.propertyNatureCode].label
                    }}
                  </div>
                </el-table-column>
                <el-table-column prop="name" label="入住人"></el-table-column>
                <el-table-column prop="dept.allPath" label="单位/部门">
                </el-table-column>
                <el-table-column label="办理形式">
                  <div slot-scope="scope">
                    {{ form.handletype[scope.row.handleTypeCode - 1].label }}
                  </div>
                </el-table-column>
                <el-table-column
                  prop="stayCycle"
                  label="租赁期限"
                ></el-table-column>
                <el-table-column
                  prop="sendTime"
                  label="发送时间"
                ></el-table-column>
                <el-table-column label="操作">
                  <div slot-scope="scope">
                    <el-button type="text" @click="detile(scope.row)">
                      去查看
                    </el-button>
                  </div>
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="dataone.total"
                  :page-size="dataone.size"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="房屋详情"
      :visible.sync="appordialog"
      width="60%"
      center
      v-if="appordialog === true"
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
                    {{ this.form.submitList.provinceName }}
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
                    {{ this.form.submitList.house.houseEstate }}
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
                    {{ this.form.submitList.house.unit }}
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
                    {{ this.form.submitList.house.roomNumber }}
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
                    {{ this.form.submitList.house.allArea + "㎡" }}
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
                    {{ this.form.submitList.house.actualArea + "㎡" }}
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
                    {{ this.form.submitList.house.shareArea + "㎡" }}
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
                      this.form.submitList.house.bedroomNum +
                      "室" +
                      this.form.submitList.house.parlorNum +
                      "厅" +
                      this.form.submitList.house.toiletNum +
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
                    {{ this.form.submitList.house.propertyNature }}
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
                  <span> {{ form.submitList.house.allArea }} </span>
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
                    {{ form.submitList.house.propertyNature }}
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
                    {{ this.form.submitList.house.propertyOwner }}
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
                    {{ this.form.submitList.house.certificateTitle }}
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
                        this.form.submitList.house.houseDetails.rentCycleCode -
                          1
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
                    {{ this.form.submitList.house.houseDetails.rentUnitPrice }}
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
                    {{ this.form.submitList.house.houseDetails.waterMeter }}
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
                    {{ this.form.submitList.house.houseDetails.electricMeter }}
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
                    {{ this.form.submitList.house.houseDetails.broadbandMeter }}
                  </span>
                </div>
              </div>
              <span style="text-align: left; font-size: 18px; color: #000"
                >房屋图片</span
              >
              <div class="img" style="display: flex">
                <el-image
                  v-for="item in form.submitList.house.imageList"
                  style="width: 200px; height: 200px; margin-right: 5px"
                  fit="cover"
                  :key="item"
                  :src="item"
                  @click="showiamge"
                  :preview-src-list="form.submitList.house.imageList"
                >
                </el-image>
              </div>
              <span style="text-align: left; font-size: 18px; color: #000"
                >备注</span
              >
              <div style="margin-top: 10px; margin-bottom: 15px">
                {{ this.form.submitList.notes }}
              </div>
              <span style="text-align: left; font-size: 18px; color: #000"
                >房屋资产</span
              >
              <el-table border>
                <el-table-column label="序号"></el-table-column>
                <el-table-column label="资产名称"></el-table-column>
                <el-table-column label="品牌"></el-table-column>
                <el-table-column label="规格型号"></el-table-column>
                <el-table-column label="单价"></el-table-column>
                <el-table-column label="取得日期"></el-table-column>
                <el-table-column label="使用年限"></el-table-column>
                <el-table-column label="使用部门"></el-table-column>
                <el-table-column label="确认完好">
                  <el-radio border></el-radio>
                </el-table-column>
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
                    {{ this.form.submitList.stayCycle }}
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
                    {{ this.form.submitList.handleType }}
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
                    {{ this.form.submitList.name }}
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
                    {{ this.form.submitList.idCard }}
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
                    {{ this.form.submitList.provinceName }}
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
                    {{ this.form.submitList.rankCode }}
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
                    {{ this.form.submitList.organizationLife }}
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
                    {{ this.isture[this.form.submitList.isDeleted] }}
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
                    {{ this.isture[this.form.submitList.isDeleted] }}
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
                    {{ this.isture[this.form.submitList.marriageCode] }}
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
                {{ this.form.submitList.explains }}
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
                {{ this.form.submitList.notes }}
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
import {
  houseloding,
  houseExpire,
  houseWarning,
} from "@/api/notice/housenotice";
import { getApprodetile } from "@/api/house/gethouselist";
import { getMaplist } from "@/api/map";
export default {
  data() {
    return {
      tab: "1",
      appordialog: false,
      showDetile: false,
      isture: ["是", "否"],
      cityParams: [],
      countyParams: [],
      townParams: [],
      houseList: [],
      houseValue: "",
      form: {
        houseValue: "",
        housetype: [
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
            label: "集中工作用房",
            value: "4",
          },
        ],
        handletype: [
          {
            label: "自己办",
          },
          {
            label: "代办",
          },
        ],
        namevalue: "",
        submitList: {},
      },
      rentType: ["月", "季", "年"],
      data: {
        size: 8,
        current: "1",
        total: "",
        houseCode: null,
        onticeUser: this.$store.state.userinfo.userID,
        propertyNatureCode: null,
      },
      dataone: {
        size: 8,
        current: "1",
        total: "",
        onticeUser: this.$store.state.userinfo.userID,
        houseCode: null,
        propertyNatureCode: null,
      },
      datatwo: {
        size: 8,
        current: "1",
        total: "",
        onticeUser: this.$store.state.userinfo.userID,
        houseCode: null,
        propertyNatureCode: null,
      },
      houseCode: "",
      type: "",
      cityValue: "",
      countyValue: "",
      townValue: "",
      loadingnotice: [],
      Expirenotice: [],
      Warningnotice: [],
      imglog: true,
    };
  },
  methods: {
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
    //打开详情
    detile(row) {
      getApprodetile(row.id)
        .then((res) => {
          console.log(res);
          this.form.submitList = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
      this.appordialog = true;
      this.type = "detile";
    },
    //省市选择
    changeCity(value) {
      this.houseCode = value;
      for (var i = 0; i < this.cityParams.length; i++) {
        var secondObject = this.cityParams[i];
        if (value === secondObject.id) {
          this.countyParams = secondObject.children;
          this.countyParams.id = "";
        }
      }
    },
    changeCounty(value) {
      this.houseCode = value;
      for (var i = 0; i < this.countyParams.length; i++) {
        var thredObject = this.countyParams[i];
        if (value === thredObject.id) {
          this.townParams = thredObject.children;
          this.townParams.id = "";
        }
      }
    },
    changetown(value) {
      this.houseCode = value;
    },
    //获取消息列表
    getnotice() {
      houseloding(this.data)
        .then((res) => {
          this.data.total = Number(res.data.total);
          for (var i = 0; i < res.data.records.length; i++) {
            this.loadingnotice.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      houseExpire(this.dataone)
        .then((res) => {
          this.dataone.total = Number(res.data.total);
          for (var i = 0; i < res.data.records.length; i++) {
            this.Expirenotice.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      houseWarning(this.datatwo)
        .then((res) => {
          this.datatwo.total = Number(res.data.total);
          for (var i = 0; i < res.data.records.length; i++) {
            this.Warningnotice.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    changepage(value) {
      this.data.current = value;
      houseloding(this.data)
        .then((res) => {
          this.loadingnotice = [];
          this.data.total = Number(res.data.total);
          for (var i = 0; i < res.data.records.length; i++) {
            this.loadingnotice.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    changetab() {
      console.log("1");
      this.cityValue = null;
      this.countyValue = null;
      this.townValue = null;
    },
    serchone() {
      this.data.houseCode = this.houseCode;
      this.data.propertyNatureCode = this.form.houseValue;
      this.loadingnotice = [];
      houseloding(this.data)
        .then((res) => {
          this.data.total = Number(res.data.total);
          for (var i = 0; i < res.data.records.length; i++) {
            this.loadingnotice.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    serchthree() {
      this.dataone.houseCode = this.houseCode;
      this.dataone.propertyNatureCode = this.form.houseValue;
      this.Expirenotice = [];
      houseExpire(this.dataone)
        .then((res) => {
          this.dataone.total = Number(res.data.total);
          for (var i = 0; i < res.data.records.length; i++) {
            this.Expirenotice.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    seachtow() {
      this.datatwo.houseCode = this.houseCode;
      this.datatwo.propertyNatureCode = this.form.houseValue;
      this.Warningnotice = [];
      houseWarning(this.datatwo)
        .then((res) => {
          this.datatwo.total = Number(res.data.total);
          for (var i = 0; i < res.data.records.length; i++) {
            this.Warningnotice.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    showiamge(value) {},
  },
  mounted() {
    this.getnotice();
    this.getmap();
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
    width: calc(100vw - 80px);
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
      .el-input {
        width: 200px;
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
  .tab {
    padding: 10px;
    width: 96%;
    margin: 10px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
    .el-tabs {
      padding: 10px;
      box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
        hsla(0, 0%, 0%, 0.23) 0px 6px 6px;
      border-radius: 13px;
      .content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .top-container {
          width: 95%;
          padding: 10px;
          display: flex;
          justify-content: space-between;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          margin-bottom: 15px;
          border-radius: 13px;
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
        .table {
          width: 95%;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          padding: 10px;
          margin-bottom: 5px;
          border-radius: 13px;
          .pagination {
            display: flex;
            justify-content: flex-end;
          }
        }
      }
    }
  }
}
</style>