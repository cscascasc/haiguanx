<template>
  <div class="container">
    <el-tabs type="card" v-model="active">
      <el-tab-pane label="我的缴费" name="0">
        <div class="top-container">
          <div class="top-select">
            <div class="select-title">姓名:</div>
            <el-input placeholder="入住人姓名：" v-model="form.name"></el-input>
            <div class="select-title">房屋所在地:</div>
            <el-select v-model="house.cityValue" clearable @change="changeCity">
              <el-option
                v-for="item in house.cityParams"
                :key="item.cityName"
                :label="item.cityName"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="house.countyValue"
              clearable
              @change="changeCounty"
            >
              <el-option
                v-for="item in house.countyParams"
                :key="item.countyName"
                :label="item.countyName"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-select v-model="house.townValue" clearable @change="changetown">
              <el-option
                v-for="item in house.townParams"
                :key="item.townName"
                :label="item.townName"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <div class="select-title">交费状态:</div>
            <el-select v-model="form.isPay">
              <el-option
                v-for="item in ispay"
                :key="item.label"
                :value="item.value"
                :label="item.label"
              >
                {{ item.label }}
              </el-option>
            </el-select>
            <div class="select-title">年份:</div>
            <el-date-picker
              v-model="form.year"
              type="year"
              value-format="yyyy"
              format="yyyy"
            ></el-date-picker>
          </div>
          <div class="top-search">
            <el-button @click="search">搜索</el-button>
            <el-button @click="referch">重置</el-button>
            <el-button icon="el-icon-download" @click="download">
              下载
            </el-button>
          </div>
        </div>
        <div class="mid-container">
          <div class="table" v-if="myRentList.length === 0">
            <el-table style="width: 100%" border>
              <el-table-column label="入住人" fixed="left"> </el-table-column>
              <el-table-column label="门牌号"> </el-table-column>
              <el-table-column label="小区/楼道/单元"> </el-table-column>
              <el-table-column label="归属地"> </el-table-column>
              <el-table-column label="房屋面积"> </el-table-column>
              <el-table-column label="实际使用面积"> </el-table-column>
              <el-table-column label="公摊使用面积"> </el-table-column>
              <el-table-column label="户型"> </el-table-column>
              <el-table-column label="房间"> </el-table-column>
              <el-table-column label="季度周期"> </el-table-column>
              <el-table-column label="房间租金"> </el-table-column>
              <el-table-column label="公摊租金"> </el-table-column>
              <el-table-column label="共交租金"> </el-table-column>
              <el-table-column label="交费状态"> </el-table-column>
              <el-table-column label="备注"> </el-table-column>
              <el-table-column label="操作" fixed="right" width="180">
              </el-table-column>
            </el-table>
          </div>
          <div class="table" v-if="myRentList.length !== 0">
            <el-table style="width: 100%" :data="rentlist" border>
              <el-table-column prop="lodging.name" label="入住人" fixed="left">
              </el-table-column>
              <el-table-column prop="lodging.house.roomNumber" label="门牌号">
              </el-table-column>
              <el-table-column
                prop="lodging.house.houseEstate"
                label="小区/楼道/单元"
              >
              </el-table-column>
              <el-table-column prop="lodging.provinceName" label="归属地">
              </el-table-column>
              <el-table-column prop="lodging.house.allArea" label="房屋面积">
              </el-table-column>
              <el-table-column
                prop="lodging.house.actualArea"
                label="实际使用面积"
              >
              </el-table-column>
              <el-table-column
                prop="lodging.house.shareArea"
                label="公摊使用面积"
              >
              </el-table-column>
              <el-table-column prop="" label="户型">
                <div slot-scope="scope">
                  {{
                    scope.row.lodging.house.bedroomNum +
                    "室" +
                    scope.row.lodging.house.parlorNum +
                    "厅" +
                    scope.row.lodging.house.toiletNum +
                    "卫"
                  }}
                </div>
              </el-table-column>
              <el-table-column label="房间">
                <div slot-scope="scope" v-if="scope.row.lodging.roomId">
                  {{ scope.row.lodging.roomId + "室" }}
                </div>
              </el-table-column>
              <el-table-column prop="dueDate" label="季度周期">
              </el-table-column>
              <el-table-column prop="roomRent" label="房间租金">
              </el-table-column>
              <el-table-column prop="shareRent" label="公摊租金">
              </el-table-column>
              <el-table-column prop="totalRent" label="共交租金">
              </el-table-column>
              <el-table-column label="缴费凭证状态">
                <div slot-scope="scope">
                  <el-button :type="rentStauts[scope.row.status].type">
                    {{ rentStauts[scope.row.status].name }}
                  </el-button>
                </div>
              </el-table-column>
              <el-table-column label="缴费状态">
                <div slot-scope="scope">
                  <el-button :type="scope.row.isPay ? 'success' : 'danger'">
                    {{ scope.row.isPay ? "已交" : "待交" }}
                  </el-button>
                </div>
              </el-table-column>
              <el-table-column prop="lodging.notes" label="备注">
              </el-table-column>
              <el-table-column label="操作" fixed="right" width="300">
                <div slot-scope="scope">
                  <el-button
                    type="success"
                    size="small"
                    @click="openUpload(scope.row)"
                    :disabled="scope.row.isPay"
                    >上传交费凭证</el-button
                  >
                </div>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="myRentTotal"
              :page-size="myRentForm.size"
              @prev-click="prevMy"
              @next-click="prevMy"
              @current-change="prevMy"
            >
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="缴费管理"
        name="1"
        :disabled="disabled('rent:rent:export')"
      >
        <div class="top-container">
          <div class="top-select">
            <div class="select-title">姓名:</div>
            <el-input placeholder="入住人姓名：" v-model="form.name"></el-input>
            <div class="select-title">房屋所在地:</div>
            <el-select v-model="house.cityValue" clearable @change="changeCity">
              <el-option
                v-for="item in house.cityParams"
                :key="item.cityName"
                :label="item.cityName"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="house.countyValue"
              clearable
              @change="changeCounty"
            >
              <el-option
                v-for="item in house.countyParams"
                :key="item.countyName"
                :label="item.countyName"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-select v-model="house.townValue" clearable @change="changetown">
              <el-option
                v-for="item in house.townParams"
                :key="item.townName"
                :label="item.townName"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <div class="select-title">交费状态:</div>
            <el-select v-model="form.isPay">
              <el-option
                v-for="item in ispay"
                :key="item.label"
                :value="item.value"
                :label="item.label"
              >
                {{ item.label }}
              </el-option>
            </el-select>
            <div class="select-title">年份:</div>
            <el-date-picker
              v-model="form.year"
              type="year"
              value-format="yyyy"
              format="yyyy"
            ></el-date-picker>
          </div>
          <div class="top-search">
            <el-button @click="search">搜索</el-button>
            <el-button @click="referch">重置</el-button>
            <el-button icon="el-icon-download" @click="download">
              下载
            </el-button>
          </div>
        </div>
        <div class="mid-container">
          <div class="table" v-if="rentlist.length === 0">
            <el-table style="width: 100%" border>
              <el-table-column label="入住人" fixed="left"> </el-table-column>
              <el-table-column label="门牌号"> </el-table-column>
              <el-table-column label="小区/楼道/单元"> </el-table-column>
              <el-table-column label="归属地"> </el-table-column>
              <el-table-column label="房屋面积"> </el-table-column>
              <el-table-column label="实际使用面积"> </el-table-column>
              <el-table-column label="公摊使用面积"> </el-table-column>
              <el-table-column label="户型"> </el-table-column>
              <el-table-column label="房间"> </el-table-column>
              <el-table-column label="季度周期"> </el-table-column>
              <el-table-column label="房间租金"> </el-table-column>
              <el-table-column label="公摊租金"> </el-table-column>
              <el-table-column label="共交租金"> </el-table-column>
              <el-table-column label="交费状态"> </el-table-column>
              <el-table-column label="备注"> </el-table-column>
              <el-table-column label="操作" fixed="right" width="180">
              </el-table-column>
            </el-table>
          </div>
          <div class="table" v-if="rentlist.length !== 0">
            <el-table style="width: 100%" :data="rentlist" border>
              <el-table-column prop="lodging.name" label="入住人" fixed="left">
              </el-table-column>
              <el-table-column prop="lodging.house.roomNumber" label="门牌号">
              </el-table-column>
              <el-table-column
                prop="lodging.house.houseEstate"
                label="小区/楼道/单元"
              >
              </el-table-column>
              <el-table-column prop="lodging.provinceName" label="归属地">
              </el-table-column>
              <el-table-column prop="lodging.house.allArea" label="房屋面积">
              </el-table-column>
              <el-table-column
                prop="lodging.house.actualArea"
                label="实际使用面积"
              >
              </el-table-column>
              <el-table-column
                prop="lodging.house.shareArea"
                label="公摊使用面积"
              >
              </el-table-column>
              <el-table-column prop="" label="户型">
                <div slot-scope="scope">
                  {{
                    scope.row.lodging.house.bedroomNum +
                    "室" +
                    scope.row.lodging.house.parlorNum +
                    "厅" +
                    scope.row.lodging.house.toiletNum +
                    "卫"
                  }}
                </div>
              </el-table-column>
              <el-table-column label="房间">
                <div slot-scope="scope" v-if="scope.row.lodging.roomId">
                  {{ scope.row.lodging.roomId + "室" }}
                </div>
              </el-table-column>
              <el-table-column prop="dueDate" label="季度周期">
              </el-table-column>
              <el-table-column prop="roomRent" label="房间租金">
              </el-table-column>
              <el-table-column prop="shareRent" label="公摊租金">
              </el-table-column>
              <el-table-column prop="totalRent" label="共交租金">
              </el-table-column>
              <el-table-column label="交费状态">
                <div slot-scope="scope">
                  <el-button :type="scope.row.isPay ? 'success' : 'danger'">
                    {{ scope.row.isPay ? "已交" : "待交" }}
                  </el-button>
                </div>
              </el-table-column>
              <el-table-column prop="lodging.notes" label="备注">
              </el-table-column>
              <el-table-column label="操作" fixed="right" width="180">
                <div slot-scope="scope">
                  <el-button
                    type="success"
                    @click="openrent(scope.row)"
                    :disabled="scope.row.isPay"
                    >交费</el-button
                  >
                </div>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="form.size"
              @prev-click="prev"
              @next-click="prev"
              @current-change="prev"
            >
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog width="60%" title="收费" :visible.sync="rentdialog" center>
      <div
        class="form"
        style="height: 600px; overflow-y: scroll"
        v-if="rentdialog"
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
                    {{
                      this.scopeRowForm.roomId +
                      "室-" +
                      this.scopeRowForm.house.houseDetails.roomAreaList[
                        Number(this.scopeRowForm.roomId - 1)
                      ] +
                      "㎡"
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
              </div>
            </div>
          </div>
        </div>
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
            缴费凭证
          </div>
          <el-image
            v-for="item in annexList"
            :key="item"
            :src="item"
            :style="{
              width: '10%',
              height: '10%',
            }"
            :preview-src-list="annexList"
          ></el-image>
        </div>
      </div>
      <div>
        <el-input
          type="textarea"
          placeholder="备注"
          :autosize="{ minRows: 5 }"
          v-model="data.note"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rentdialog = false">取 消</el-button>
        <el-button type="primary" @click="rent">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="title" width="40%" :visible.sync="upload">
      <el-upload
        class="uploademo"
        action="http"
        list-type="picture-card"
        accept=".jpg, .pnd"
        :http-request="uplode"
        multiple
      >
        <i class="el-icon-plus"></i>
        <div
          class="el-upload__tip"
          slot="tip"
          :style="{
            fontSize: '16px',
          }"
        >
          请上传房租缴费凭证，燃气缴费凭证，水电费用凭证文件
        </div>
        <div
          class="el-upload__tip"
          slot="tip"
          :style="{
            fontSize: '16px',
          }"
        >
          只能上传jpg、pnd文件
        </div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="upload = false">取消</el-button>
        <el-button type="primary" @click="uploadRent">上传附件</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getrentlist, changerent, uploadRentFlie } from "@/api/house/rent";
import { getMaplist } from "@/api/map";
import { exportRent } from "@/api/download/download";
import { Disablebutton } from "@/utils/button";
import http from "@/utils/request";
export default {
  data() {
    return {
      house: {
        cityValue: "",
        countyValue: "",
        townValue: "",
        cityParams: [],
        countyParams: [],
        townParams: [],
      },
      total: 0,
      form: {
        size: 10,
        current: 1,
        name: null,
        isPay: null,
        houseCode: null,
      },
      ispay: [
        {
          label: "全部",
          value: null,
        },
        {
          label: "已交",
          value: true,
        },
        {
          label: "待交",
          value: false,
        },
      ],
      rentdialog: false,
      rentlist: [],
      data: {
        note: null,
        id: "",
      },
      active: 0,
      myRentForm: {
        size: 10,
        current: 1,
        name: null,
        isPay: null,
        houseCode: null,
        applicantId: this.$store.state.userinfo.userID,
      },
      myRentTotal: 0,
      myRentList: [],
      upload: false,
      annexForm: {
        id: "",
        applicantId: this.$store.state.userinfo.userID,
        annexList: [],
      },
      rentStauts: {
        0: {
          name: "未提交",
          type: "danger",
        },
        2: {
          name: "已提交",
          type: "success",
        },
      },
      showDetile: false,
      scopeRowForm: {},
      rentType: ["月", "季", "年"],
      isture: ["否", "是"],
      sexlist: ["男", "女"],
      annexList: [],
      title: "",
    };
  },
  methods: {
    //省市选择
    changeCity(value) {
      this.form.houseCode = value;
      for (var i = 0; i < this.house.cityParams.length; i++) {
        var secondObject = this.house.cityParams[i];
        if (value === secondObject.id) {
          this.house.countyParams = secondObject.children;
          this.house.countyParams.id = "";
        }
      }
    },
    changeCounty(value) {
      this.form.houseCode = value;
      for (var i = 0; i < this.house.countyParams.length; i++) {
        var thredObject = this.house.countyParams[i];
        if (value === thredObject.id) {
          this.house.townParams = thredObject.children;
          this.house.townParams.id = "";
        }
      }
    },
    changetown(value) {
      this.form.houseCode = value;
    },
    //获取地图
    getmap() {
      getMaplist()
        .then((res) => {
          const citylist = res.data[0].children;
          const citylength = res.data[0].children.length;
          for (var i = 0; i < citylength; i++) {
            this.house.cityParams.push(citylist[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //获取租金列表、
    getrent() {
      getrentlist(this.form)
        .then((res) => {
          console.log(res);
          this.total = Number(res.data.total);
          for (var i = 0; i < res.data.records.length; i++) {
            this.rentlist.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getrentlist(this.myRentForm).then((res) => {
        this.myRentTotal = Number(res.data.total);
        for (var i = 0; i < res.data.records.length; i++) {
          this.myRentList.push(res.data.records[i]);
        }
      });
    },
    prev(value) {
      this.form.current = value;
      this.rentlist = [];
      getrentlist(this.form)
        .then((res) => {
          console.log(res);
          this.form.total = Number(res.data.total);
          for (var i = 0; i < res.data.records.length; i++) {
            this.rentlist.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    openrent(row) {
      this.data.id = row.id;
      this.scopeRowForm = row.lodging;
      this.annexList = row.annexList;
      console.log(this.scopeRowForm);
      this.rentdialog = true;
    },
    rent() {
      this.$confirm("确认收费后, 收费状态不可以更改,是否确认收费", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(() => {
          changerent(this.data)
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
        })
        .catch(() => {
          return false;
        });
    },
    search() {
      this.rentlist = [];
      getrentlist(this.form)
        .then((res) => {
          console.log(res);
          this.total = Number(res.data.total);
          for (var i = 0; i < res.data.records.length; i++) {
            this.rentlist.push(res.data.records[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    referch() {
      this.$router.go();
    },
    download() {
      exportRent(this.form);
      // .then((res) => {
      //   this.$notify({
      //     title: "成功",
      //     message: res.msg,
      //     type: "success",
      //   });
      // })
      // .catch((error) => {
      //   console.error(error);
      // });
    },
    disabled(name) {
      return Disablebutton(name);
    },
    openUpload(row) {
      this.title = "缴费凭证上传";
      this.annexForm.annexList = [];
      this.annexForm.id = row.id;
      this.upload = true;
    },
    editUpload(row) {
      this.title = "缴费凭证编辑";
      this.annexForm.id = row.id;
      this.annexForm.annexList = row.annexList;
      this.upload = true;
    },
    uplode(data) {
      this.$confirm("是否确定上传此文件", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(() => {
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
              this.annexForm.annexList.push(res.data);
              console.log(this.annexForm.annexList, "img");
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
        })
        .catch(() => {
          return false;
        });
    },
    uploadRent() {
      this.$confirm("确认上传", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(() => {
          uploadRentFlie(this.annexForm).then((res) => {
            this.$notify({
              title: "成功",
              message: res.msg,
              type: "success",
            });
            this.$router.go();
          });
        })
        .catch(() => {
          return false;
        });
    },
    remove(value) {
      console.log(value);
      const list = this.annexForm.annexList.filter((item) =>
        item.indexOf(value.name)
      );
      const name = list[0];
      console.log(list, name);
      const index = this.annexForm.annexList.indexOf(name);
      this.annexForm.annexList.shift(index);
    },
    prevMy(value) {
      this.myRentForm.current = value;
      this.myRentList = [];
      getrentlist(this.myRentForm).then((res) => {
        this.myRentTotal = Number(res.data.total);
        for (var i = 0; i < res.data.records.length; i++) {
          this.myRentList.push(res.data.records[i]);
        }
      });
    },
  },
  mounted() {
    this.getmap();
    this.getrent();
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
  .el-tabs {
    margin: 10px;
    height: calc(100vh - 60px);
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
        justify-content: space-between;
        align-items: center;
        width: 80%;
        .el-select {
          margin-left: 5px;
          width: 200px;
          margin-right: 15px;
        }
        .el-input {
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
      width: calc(100% - 80px);
      margin: 20px;
      border-radius: 20px;
      box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
        rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
      .pagination {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
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

  .el-dialog {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      font-size: 18px;
      color: #000;
      margin-bottom: 17px;
    }
  }
}
</style>