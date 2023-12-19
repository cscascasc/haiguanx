<template>
  <div class="container">
    <div class="top-container">
      <div class="top-select">
        <div class="select-title">单位：</div>
        <el-select v-model="form.unitId" clearable @change="changeDev">
          <el-option
            v-for="item in customsType"
            :key="item.id"
            :label="item.customsName"
            :value="item.id"
          >
            {{ item.customsName }}
          </el-option>
        </el-select>
      </div>
      <div class="top-seach">
        <el-input v-model="form.assetName" placeholder="请输入资产名" clearable>
        </el-input>
        <el-button icon="el-icon-search" @click="search">查询</el-button>
        <el-button class="ref" icon="el-icon-refresh" @click="refesh">
          重置
        </el-button>
        <el-button type="primary" class="addbutton" @click="topath"
          >新增</el-button
        >
        <el-button
          icon="el-icon-download"
          @click="download"
          :disabled="disabled('object:object:add')"
        >
          下载
        </el-button>
        <el-button
          icon="el-icon-upload2"
          @click="upload = true"
          :disabled="disabled('object:object:add')"
        >
          导入
        </el-button>
      </div>
    </div>
    <div class="mid-container">
      <div class="table">
        <el-table :data="AssetList" max-height="650" border>
          <el-table-column type="index" label="序号" fixed="left">
          </el-table-column>
          <el-table-column prop="unit" label="单位"> </el-table-column>
          <el-table-column prop="assetName" label="资产名称"> </el-table-column>
          <el-table-column prop="specificationType" label="规格型号">
          </el-table-column>
          <el-table-column prop="unitPrice" label="单价"> </el-table-column>
          <el-table-column prop="assetSource" label="资产来源">
          </el-table-column>
          <el-table-column prop="acquisitionDate" label="取得日期">
          </el-table-column>
          <el-table-column prop="usefulLife" label="使用年限">
          </el-table-column>
          <el-table-column prop="cardNum" label="卡片号"> </el-table-column>
          <el-table-column prop="userDept" label="使用部门"> </el-table-column>
          <el-table-column
            prop="invoiceNum"
            label="发票号或调援单号"
            width="150px"
            align="left"
          >
          </el-table-column>
          <el-table-column prop="brand" label="品牌"> </el-table-column>
          <el-table-column prop="roomNumber" label="标注存放地点">
            <div slot-scope="scope">
              {{ scope.row.roomNum + "室" }}
            </div>
          </el-table-column>
          <el-table-column prop="notes" label="备注"> </el-table-column>
          <el-table-column
            prop="roomNumber"
            label="操作"
            fixed="right"
            width="200"
          >
            <template slot-scope="scope">
              <el-button
                icon="el-icon-search"
                type="text"
                @click="detile(scope.row)"
                >详情</el-button
              >
              <el-button
                type="text"
                icon="el-icon-edit"
                @click="edit(scope.row)"
                :disabled="disabled('object:object:edit')"
                >编辑</el-button
              >
              <el-button
                type="text"
                icon="el-icon-check"
                @click="remove(scope.row)"
                :disabled="disabled('object:object:delate')"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
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
  </div>
</template>

<script>
import { getAssetList, deleteAsset } from "@/api/house/getAsset";
import { getdept, getdeptcustoms } from "@/api/dept/getdept";
import { exportObject, importObject, getModle } from "@/api/download/download";
import { Disablebutton } from "@/utils/button";
export default {
  data() {
    return {
      devmentValue: "",
      devmentType: [], //借调部门
      customsType: [],
      customsValue: "",
      value1: "",
      value2: "",
      ObjectList: [
        {
          roomNumber: "1",
          id: "1",
        },
      ],
      form: {
        size: 10,
        current: 1,
        unitId: null,
        userDept: null,
        assetName: null,
      },
      total: null,
      AssetList: [],
      upload: false,
    };
  },
  methods: {
    topath() {
      this.$router.push("/objectadd");
    },
    //获取单位
    depet() {
      getdept().then((res) => {
        const list = res.data;
        const length = list.length;
        for (var i = 0; i < length; i++) {
          this.customsType.push(list[i]);
        }
      });
    },
    //获取部门
    changeDev(value) {
      this.devmentType = [];
      getdeptcustoms(value)
        .then((res) => {
          const list = res.data;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.devmentType.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    detile(row) {
      this.$router.push({
        path: "/objectdetil",
        query: { id: row.id, type: "detile" },
      });
    },
    edit(row) {
      this.$router.push({
        path: "/objectdetil",
        query: { id: row.id, type: "edit" },
      });
    },
    //获取资产列表
    getlist() {
      getAssetList(this.form)
        .then((res) => {
          this.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          this.AssetList = [];
          for (var i = 0; i < length; i++) {
            this.AssetList.push(list[i]);
          }
          console.log(this.AssetList);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    changepage(value) {
      this.form.current = value;
      this.getlist();
    },
    search() {
      getAssetList(this.form)
        .then((res) => {
          this.form.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          this.AssetList = [];
          for (var i = 0; i < length; i++) {
            this.AssetList.push(list[i]);
          }
          console.log(this.AssetList);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    refesh() {
      this.$router.go();
    },
    //删除资产
    remove(row) {
      this.$confirm("确认删除该资产吗？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      }).then(() => {
        deleteAsset(row.id)
          .then((res) => {
            console.log(res);
            const message = res.msg;
            this.$notify({
              title: "成功",
              message: message,
              type: "success",
            });
            this.$router.go(0);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    download() {
      //     let str=null
      //     for(item in this.form ){
      //       str=`${item}=${this.form[item]}`
      //     }
      // // let value =
      // const newHref = `/asset/export?${value}`;
      // console.log(newHref)
      // window.location.href = newHref;
      const form = {
        unitId: this.form.unitId,
        userDept: this.form.userDept,
        keyword: this.form.keyword,
      };
      exportObject(form);
      //   .then((res) => {
      //     this.$notify({
      //       title: "成功",
      //       message: res.msg,
      //       type: "success",
      //     });
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    },
    downloadmodel() {
      getModle(
        "http://10.84.1.223:9000/gy-file/2023/10/16/资产信息导入模板/7705/资产信息导入模板.xlsx"
      );
    }, //批量上传
    uplode(data) {
      const imgData = data.file;
      const form = new FormData();
      form.append("file", imgData);
      importObject(form)
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
    },
    disabled(data) {
      return Disablebutton(data);
    },
  },
  mounted() {
    this.getlist();
    this.depet();
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
    .table {
      border-radius: 20px;
      padding: 15px;
      .pagination {
        display: flex;
        justify-content: flex-end;
      }
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