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
        <el-select v-model="form.propertyNatureCode">
          <el-option
            v-for="item in houseStyle"
            :key="item.dictValue"
            :value="item.dictValue"
            :label="item.dictLabel"
          >
          </el-option>
        </el-select>
      </div>
      <div class="top-seach">
        <el-input placeholder="请输入关键信息"> </el-input>
        <el-button class="ref" icon="el-icon-search" @click="search">
          查询
        </el-button>
        <el-button class="ref" icon="el-icon-refresh"> 重置 </el-button>
        <el-button
          type="primary"
          class="addbutton"
          @click="topath"
          :disabled="disabled('house:house:add')"
          >新增</el-button
        >
        <el-button icon="el-icon-download" @click="download"> 下载 </el-button>
        <el-button
          icon="el-icon-upload2"
          @click="upload = true"
          :disabled="disabled('house:house:add')"
        >
          导入
        </el-button>
      </div>
    </div>
    <div class="mid-container">
      <div class="table">
        <el-table :data="houseList" style="width: 100%" border max-height="650">
          <el-table-column prop="roomNumber" label="门牌号" fixed="left">
          </el-table-column>
          <el-table-column prop="houseEstate" label="小区名称">
          </el-table-column>
          <el-table-column prop="cityName" label="市州"> </el-table-column>
          <el-table-column prop="regionName" label="区县"> </el-table-column>
          <el-table-column prop="address" label="社区/街道"> </el-table-column>
          <el-table-column prop="propertyNature" label="房屋性质">
          </el-table-column>
          <el-table-column prop="allArea" label="房屋面积"> </el-table-column>
          <el-table-column prop="actualArea" label="实际使用面积">
          </el-table-column>
          <el-table-column prop="shareArea" label="公摊使用面积">
          </el-table-column>
          <el-table-column prop="roomNumber" label="户型">
            <div slot-scope="scope">
              {{
                scope.row.bedroomNum +
                "室" +
                scope.row.parlorNum +
                "厅" +
                scope.row.toiletNum +
                "卫"
              }}
            </div>
          </el-table-column>
          <el-table-column prop="roomNumber" label="房间"> </el-table-column>
          <el-table-column prop="roomNumber" label="状态">
            <div slot-scope="scope">
              <el-button
                :type="buttontype[scope.row.status].type"
                size="small"
                icon="el-icon-open"
                @click="ModelActive(scope.row)"
                disabled
              >
                {{ buttontype[scope.row.status].label }}
              </el-button>
            </div>
          </el-table-column>
          <el-table-column prop="createTime" label="录入时间">
          </el-table-column>
          <el-table-column
            prop="roomNumber"
            label="操作"
            fixed="right"
            width="300"
          >
            <template slot-scope="scope">
              <el-button size="small" @click="detile(scope.row)"
                >详情</el-button
              >
              <el-button
                :type="buttontype[scope.row.status].type"
                size="small"
                @click="changeStatus(scope.row)"
                :disabled="disabled('house:house:status')"
                >{{ scope.row.status === 1 ? "挂起" : "激活" }}</el-button
              >
              <el-button
                type="primary"
                size="small"
                @click="edit(scope.row)"
                :disabled="disabled('house:house:edit')"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="small"
                @click="delect(scope.row)"
                :disabled="disabled('house:house:delate')"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    <el-dialog title="批量导入" width="40%" :visible.sync="upload">
      <el-upload class="uploademo" drag :http-request="uplode" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传xlsx文件</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="upload = false">取消</el-button>
        <el-button type="success" @click="downloadmodel">模板下载</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMaplist } from "@/api/map";
import { getHouseList } from "@/api/house/gethouselist";
import { houseturnON, housedelect } from "@/api/house/post";
import { importHouse, exportHouse, getModle } from "@/api/download/download";
import { Disablebutton } from "@/utils/button";
import { getdict } from "@/api/dict/getdict";
export default {
  name: "orderlist",
  data() {
    return {
      buttontype: [
        {
          label: "未激活",
          type: "danger",
        },
        {
          label: "激活",
          type: "success",
        },
        {
          label: "挂起",
          type: "warning",
        },
      ],
      cityParams: [],
      countyParams: [],
      townParams: [],
      houseList: [],
      cityValue: "",
      countyValue: "",
      townValue: "",
      houseValue: "",
      houseStyle: [],
      show: "",
      value1: "",
      value2: "",
      form: {
        size: 10,
        current: 1,
        total: null,
        houseCode: null,
        propertyNatureCode: null,
        keyword: null,
      },
      upload: false,
    };
  },
  methods: {
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
      getdict("property_nature").then((res) => {
        const list = res.data.records;
        const length = list.length;
        for (var i = 0; i < length; i++) {
          this.houseStyle.push(list[i]);
        }
      });
    },
    changeCity(value) {
      this.form.houseCode = value;
      for (var i = 0; i < this.cityParams.length; i++) {
        var secondObject = this.cityParams[i];
        if (value === secondObject.id) {
          this.countyParams = secondObject.children;
          this.countyParams.id = "";
        }
      }
    },
    changetown(value) {
      this.form.houseCode = value;
    },
    changeCounty(value) {
      this.form.houseCode = value;
      for (var i = 0; i < this.countyParams.length; i++) {
        var thredObject = this.countyParams[i];
        if (value === thredObject.id) {
          this.townParams = thredObject.children;
          this.townParams.id = "";
        }
      }
    },
    topath() {
      this.$router.push("/pulicadd");
    },
    getHList() {
      getHouseList(this.form)
        .then((res) => {
          this.houseList = [];
          this.form.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.houseList.push(list[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    detile(row) {
      this.$router.push({
        path: "/pulicdtile/",
        query: { id: row.id, type: "detile" },
      });
    },
    edit(row) {
      this.$router.push({
        path: "/pulicdtile/",
        query: { id: row.id, type: "edit" },
      });
    },
    //更新房间状态
    changeStatus(row) {
      houseturnON(row.id)
        .then((res) => {
          const message = res.message;
          this.$notify({
            title: "成功",
            message: message,
            type: "success",
          });
          this.getHList();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //删除房间
    delect(row) {
      this.$confirm("确认删除该房间吗？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      }).then(() => {
        housedelect(row.id)
          .then((res) => {
            const message = res.message;
            this.$notify({
              title: "成功",
              message: message,
              type: "success",
            });
            this.getHList();
          })
          .catch((error) => {
            console.error(error);
          });
      });
    },
    changepage(value) {
      this.form.current = value;
      this.getHList();
    },
    search() {
      this.houseList = [];
      getHouseList(this.form)
        .then((res) => {
          this.houseList = [];
          this.form.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.houseList.push(list[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    download() {
      const form = {
        houseCode: this.form.houseCode,
        propertyNatureCode: this.form.propertyNatureCode,
        keyword: this.form.keyword,
      };
      console.log(this.form);
      exportHouse(form);
    },
    downloadmodel() {
      getModle(
        "http://10.84.1.223:9000/gy-file/2023/10/16/住房信息导入模板/7991/住房信息导入模板.xlsx"
      );
    }, //批量上传
    uplode(data) {
      const imgData = data.file;
      const form = new FormData();
      form.append("file", imgData);

      importHouse(form)
        .then((res) => {
          this.$notify({
            title: "成功",
            message: res.msg,
            type: "success",
          });
          this.getHList();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    disabled(data) {
      return Disablebutton(data);
    },
  },
  mounted() {
    this.getmap();
    this.changeCity();
    this.changeCounty();
    this.getHList();
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