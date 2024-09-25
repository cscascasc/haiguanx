<template>
  <div class="container">
    <div class="tab">
      <el-tabs v-model="activit" @tab-click="push">
        <el-tab-pane
          label="审计署近期关注重点"
          :disabled="disabled('focus:focus:typeone')"
          name="0"
        >
          <div class="content">
            <div class="top-container">
              <div class="top-select">
                <div class="select-title">业务领域：</div>
                <el-select
                  v-model="newtypeone.form.businessAreaCode"
                  clearable
                  filterable
                >
                  <el-option
                    v-for="item in businessArea"
                    :key="item.dictLabel"
                    :value="item.dictValue"
                    :label="item.dictLabel"
                  >
                    {{ item.dictLabel }}
                  </el-option>
                </el-select>
                <div class="select-title">上线状态：</div>
                <el-select
                  v-model="newtypeone.form.status"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="item in status"
                    :key="item.label"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
                <el-button icon="el-icon-search" @click="serchtypeone"
                  >搜索</el-button
                >
                <el-button icon="el-icon-refresh" @click="refesh"
                  >重置</el-button
                >
              </div>
              <div class="top-seach">
                <el-button
                  icon="el-icon-circle-plus-outline"
                  @click="topathone"
                  :disabled="disabled('focus:typeone:add')"
                >
                  新增
                </el-button>
                <el-button
                  icon="el-icon-upload2"
                  @click="upload = true"
                  :disabled="disabled('focus:typeone:add')"
                >
                  导入
                </el-button>
                <el-button icon="el-icon-download" @click="download">
                  下载
                </el-button>
                <!-- <el-button icon="el-icon-upload2"> 导入 </el-button> -->
              </div>
            </div>
            <div class="table">
              <el-table :data="newtypeone.tablist" border max-height="600">
                <el-table-column
                  prop="title"
                  label="标题"
                  fixed="left"
                  width="180"
                >
                </el-table-column>
                <el-table-column prop="content" label="内容">
                  <div
                    slot-scope="scope"
                    :style="{
                      maxHeight: '80px',
                      overflowY: 'scroll',
                    }"
                  >
                    {{ scope.row.content }}
                  </div>
                </el-table-column>
                <el-table-column prop="businessArea" label="业务领域">
                </el-table-column>
                <!-- <el-table-column prop="regionName" label="涉及部门">
                  <div slot-scope="scope">
                    <span v-for="item in scope.row.deptList" :key="item.id">{{
                      item.name + "、"
                    }}</span>
                  </div>
                </el-table-column> -->
                <el-table-column label="上线状态">
                  <div slot-scope="scope">
                    <el-button
                      size="small"
                      :type="scope.row.status === 1 ? 'success' : 'warning'"
                    >
                      {{ scope.row.status === 1 ? "上线" : "下线" }}
                    </el-button>
                  </div>
                </el-table-column>
                <el-table-column prop="userName" label="录入人">
                </el-table-column>
                <el-table-column prop="createTime" label="录入日期">
                </el-table-column>
                <el-table-column
                  prop="roomNumber"
                  label="操作"
                  fixed="right"
                  width="300"
                >
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      :type="scope.row.status === 1 ? 'warning' : 'success'"
                      :disabled="disabled('focus:typeone:status')"
                      @click="StatusOne(scope.row)"
                    >
                      {{ scope.row.status === 1 ? "下线" : "上线" }}
                    </el-button>
                    <el-button
                      size="small"
                      type="primary"
                      @click="edit(scope.row)"
                      :disabled="disabled('focus:typeone:edit')"
                      >编辑</el-button
                    >
                    <el-button
                      size="small"
                      type="success"
                      @click="detile(scope.row)"
                      >详情</el-button
                    >
                    <el-button
                      size="small"
                      type="danger"
                      @click="opendelateNewOne(scope.row)"
                      :disabled="disabled('focus:typeone:delate')"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination
                  background
                  layout="total,prev, pager, next"
                  :total="newtypeone.total"
                  :page-size="newtypeone.form.size"
                  @prev-click="changepageone"
                  @next-click="changepageone"
                  @current-change="changepageone"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="总署近期关注重点"
          :disabled="disabled('focus:focus:typetwo')"
          name="1"
        >
          <div class="content">
            <div class="top-container">
              <div class="top-select">
                <div class="select-title">业务领域：</div>
                <el-select
                  v-model="newtypetwo.form.businessAreaCode"
                  clearable
                  filterable
                >
                  <el-option
                    v-for="item in businessArea"
                    :key="item.dictLabel"
                    :value="item.dictValue"
                    :label="item.dictLabel"
                  >
                    {{ item.dictLabel }}
                  </el-option>
                </el-select>
                <div class="select-title">上线状态：</div>
                <el-select v-model="newtypetwo.form.status" filterable>
                  <el-option
                    v-for="item in status"
                    :key="item.label"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
                <el-button icon="el-icon-search" @click="serchtypetwo"
                  >搜索</el-button
                >
                <el-button icon="el-icon-refresh" @click="refesh"
                  >重置</el-button
                >
              </div>
              <div class="top-seach">
                <el-button
                  icon="el-icon-circle-plus-outline"
                  @click="topathtwo"
                  :disabled="disabled('focus:typetwo:add')"
                >
                  新增
                </el-button>
                <el-button
                  icon="el-icon-upload2"
                  @click="uploadtwo = true"
                  :disabled="disabled('focus:typetwo:add')"
                >
                  导入
                </el-button>
                <el-button icon="el-icon-download" @click="downloadtwo">
                  下载
                </el-button>
                <!-- <el-button icon="el-icon-upload2"> 导入 </el-button> -->
              </div>
            </div>
            <div class="table">
              <el-table :data="newtypetwo.tablist" border max-height="600">
                <el-table-column
                  prop="title"
                  label="标题"
                  fixed="left"
                  width="180"
                >
                </el-table-column>
                <el-table-column prop="content" label="内容">
                  <div
                    slot-scope="scope"
                    :style="{
                      maxHeight: '80px',
                      overflowY: 'scroll',
                    }"
                  >
                    {{ scope.row.content }}
                  </div>
                </el-table-column>
                <el-table-column prop="businessArea" label="业务领域">
                </el-table-column>
                <!-- <el-table-column prop="regionName" label="涉及部门">
                </el-table-column> -->
                <el-table-column label="上线状态">
                  <div slot-scope="scope">
                    <el-button
                      size="small"
                      :type="status[scope.row.status].type"
                    >
                      {{ status[scope.row.status].label }}
                    </el-button>
                  </div>
                </el-table-column>
                <el-table-column prop="userName" label="录入人">
                </el-table-column>
                <el-table-column prop="createTime" label="录入日期">
                </el-table-column>
                <el-table-column
                  prop="roomNumber"
                  label="操作"
                  fixed="right"
                  width="350"
                >
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      :type="scope.row.status === 1 ? 'warning' : 'success'"
                      @click="Status(scope.row)"
                      :disabled="disabled('focus:typetwo:status')"
                    >
                      {{ scope.row.status === 1 ? "下线" : "上线" }}
                    </el-button>
                    <el-button
                      size="small"
                      type="primary"
                      @click="edit(scope.row)"
                      :disabled="disabled('focus:typetwo:edit')"
                      >编辑</el-button
                    >
                    <el-button
                      size="small"
                      type="success"
                      @click="detile(scope.row)"
                      >详情</el-button
                    >
                    <el-button
                      size="small"
                      type="danger"
                      @click="opendelateNew(scope.row)"
                      :disabled="disabled('focus:typetwo:delate')"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination
                  background
                  layout="total,prev, pager, next"
                  :total="newtypetwo.total"
                  :page-size="newtypetwo.form.size"
                  @prev-click="changepageone"
                  @next-click="changepageone"
                  @current-change="changepageone"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="单位基本情况"
          :disabled="disabled('unit:unit')"
          name="2"
        >
          <div class="content">
            <div class="top-container">
              <div class="top-select">
                <div class="select-title">上线状态：</div>
                <el-select v-model="unit.form.status" filterable>
                  <el-option
                    v-for="item in status"
                    :key="item.label"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
                <el-button icon="el-icon-search" @click="serchunit"
                  >搜索</el-button
                >
                <el-button icon="el-icon-refresh" @click="refesh"
                  >重置</el-button
                >
              </div>
              <div class="top-seach">
                <el-button
                  icon="el-icon-circle-plus-outline"
                  @click="topath"
                  :disabled="disabled('unit:unit:add')"
                >
                  新增
                </el-button>
                <el-button icon="el-icon-download" @click="downloadunit">
                  下载
                </el-button>
                <!-- <el-button icon="el-icon-upload2"> 导入 </el-button> -->
              </div>
            </div>
            <div class="table">
              <el-table :data="unit.tablelist" border max-height="600">
                <el-table-column label="单位" fixed="left" width="180">
                  <div slot-scope="scope">
                    {{ scope.row.dept.name }}
                  </div>
                </el-table-column>
                <el-table-column
                  prop="institutionalPosition"
                  label="在编关员人数"
                >
                </el-table-column>
                <el-table-column
                  prop="nonInstitutionalPosition"
                  label="协勤人员人数"
                >
                </el-table-column>
                <el-table-column prop="unitIntroduce" label="单位概述">
                  <div
                    slot-scope="scope"
                    :style="{
                      maxHeight: '60px',
                      overflowY: 'scroll',
                    }"
                  >
                    {{ scope.row.unitIntroduce }}
                  </div>
                </el-table-column>
                <el-table-column label="上线状态">
                  <div slot-scope="scope">
                    <el-button
                      size="small"
                      :type="status[scope.row.status].type"
                    >
                      {{ status[scope.row.status].label }}
                    </el-button>
                  </div>
                </el-table-column>
                <el-table-column prop="createTime" label="录入日期">
                </el-table-column>
                <el-table-column
                  prop="roomNumber"
                  label="操作"
                  fixed="right"
                  width="300"
                >
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      :type="scope.row.status === 1 ? 'warning' : 'success'"
                      @click="unitStatus(scope.row)"
                      :disabled="disabled('unit:unit:status')"
                    >
                      {{ scope.row.status === 1 ? "下线" : "上线" }}
                    </el-button>
                    <el-button
                      size="small"
                      type="primary"
                      @click="editunit(scope.row)"
                      :disabled="disabled('unit:unit:edit')"
                      >编辑</el-button
                    >
                    <el-button
                      size="small"
                      type="success"
                      @click="detileunit(scope.row)"
                      >详情</el-button
                    >
                    <el-button
                      size="small"
                      type="danger"
                      @click="opendelateUnit(scope.row)"
                      :disabled="disabled('unit:unit:delate')"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination
                  background
                  layout="total,prev, pager, next"
                  :total="unit.total"
                  :page-size="unit.form.size"
                  @prev-click="unitpageone"
                  @next-click="unitpageone"
                  @current-change="unitpageone"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="是否删除" width="30%" :visible.sync="delectlog" center>
      <span slot="footer" class="el-dialog-footer">
        <el-button @click="delectlog = false">取消</el-button>
        <el-button @click="delateNew" type="danger">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="是否删除" width="30%" :visible.sync="delectlog2" center>
      <span slot="footer" class="el-dialog-footer">
        <el-button @click="delectlog2 = false">取消</el-button>
        <el-button @click="delateUnit" type="danger">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="批量导入" width="40%" :visible.sync="upload">
      <el-upload class="uploademo" drag :http-request="uplodeone" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传xlsx文件</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="upload = false">取消</el-button>
        <el-button type="success" @click="downloadmodel">模板导出</el-button>
      </span>
    </el-dialog>
    <el-dialog title="批量导入" width="40%" :visible.sync="uploadtwo">
      <el-upload class="uploademo" drag :http-request="loadtwo" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传xlsx文件</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="uploadtwo = false">取消</el-button>
        <el-button type="success" @click="downloadmodel">模板导出</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
<script>
import {
  getnews,
  getdeptinfo,
  newsstatus,
  unitstatus,
  delateunit,
  delatenew,
} from "@/api/data/news/getnews";
import { getbusinessAear, getbusinessType } from "@/api/dict/getdict";
import {
  exportFocus,
  exportUnit,
  importFocus,
  importFocustype,
  getModle,
} from "@/api/download/download";
import { Disablebutton } from "@/utils/button";
export default {
  name: "orderlist",
  data() {
    return {

      newtypeone: {
        total: 0,
        form: {
          size: 10,
          current: "1",
          type: "0",
          status: null,
          businessAreaCode: null,
        },
        tablist: [],
      },
      newtypetwo: {
        total: 0,
        form: {
          size: 10,
          current: "1",
          type: "1",
          status: null,
          businessAreaCode: null,
        },
        tablist: [],
      },
      unit: {
        total: 0,
        form: {
          size: 10,
          current: "1",
          status: null,
        },
        tablelist: [],
      },
      status: [
        {
          label: "待上线",
          type: "danger",
          value: "0",
        },
        {
          label: "上线",
          type: "success",
          value: "1",
        },
        {
          label: "下线",
          type: "warning",
          value: "2",
        },
      ],
      businessArea: [
        {
          dictLabel: "不限",
          dictValue: null,
        },
      ],
      deletid: "",
      delectlog: false,
      delectlog2: false,
      upload: false,
      uploadtwo: false,
      activit: "0",
    };
  },
  methods: {
    topathone() {
      this.$router.push({
        path: "/info_audi_audiadd",
        query: {
          type: 0,
        },
      });
    },
    topathtwo() {
      this.$router.push({
        path: "/info_audi_audiadd",
        query: {
          type: 1,
        },
      });
    },
    detile(row) {
      this.$router.push({
        path: "/audidetile",
        query: {
          id: row.id,
          type: "detile",
        },
      });
    },
    edit(row) {
      this.$router.push({
        path: "/audidetile",
        query: {
          id: row.id,
          type: "edit",
        },
      });
    },
    topath() {
      this.$router.push("/addunit");
    },
    editunit(row) {
      this.$router.push({
        path: "/unitdetile",
        query: {
          id: row.id,
          type: "edit",
        },
      });
    },
    detileunit(row) {
      this.$router.push({
        path: "/unitdetile",
        query: {
          id: row.id,
          type: "detile",
        },
      });
    },
    //获取新闻
    getnewslist() {
      getnews(this.newtypeone.form)
        .then((res) => {
          this.newtypeone.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.newtypeone.tablist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getnews(this.newtypetwo.form)
        .then((res) => {
          this.newtypetwo.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.newtypetwo.tablist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getdeptinfo(this.unit.form)
        .then((res) => {
          this.unit.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.unit.tablelist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    unitpageone(value) {
      this.unit.form.current = value;
      this.unit.tablelist = [];
      getnews(this.newtypeone.form)
        .then((res) => {
          this.unit.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.unit.tablelist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //新闻上线
    Status(row) {
      newsstatus(row.id)
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
    //新闻上线
    StatusOne(row) {
      newsstatus(row.id)
        .then((res) => {
          const message = res.msg;
          this.$notify({
            title: "成功",
            message: message,
            type: "success",
          });
          this.newtypeone.tablist = [];
          getnews(this.newtypeone.form)
            .then((res) => {
              this.newtypeone.total = Number(res.data.total);
              const list = res.data.records;
              const length = list.length;
              for (var i = 0; i < length; i++) {
                this.newtypeone.tablist.push(list[i]);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    unitStatus(row) {
      unitstatus(row.id)
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
    //分页
    changepageone(value) {
      this.newtypeone.form.current = value;
      this.newtypeone.tablist = [];
      getnews(this.newtypeone.form)
        .then((res) => {
          this.unit.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.newtypeone.tablist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //单位删除
    opendelateUnit(row) {
      this.deletid = row.id;
      this.delectlog2 = true;
    },
    delateUnit() {
      delateunit(this.deletid)
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
    //资讯删除
    opendelateNew(row) {
      this.deletid = row.id;
      this.delectlog = true;
    },
    //资讯删除
    opendelateNewOne(row) {
      this.deletid = row.id;
      this.delectlog = true;
    },
    delateNew() {
      delatenew(this.deletid)
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
    getoption() {
      getbusinessAear()
        .then((res) => {
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.businessArea.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    serchtypeone() {
      this.newtypeone.tablist = [];
      getnews(this.newtypeone.form)
        .then((res) => {
          this.newtypeone.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.newtypeone.tablist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    serchtypetwo() {
      this.newtypetwo.tablist = [];
      getnews(this.newtypetwo.form)
        .then((res) => {
          this.newtypetwo.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.newtypetwo.tablist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    serchunit() {
      this.unit.tablelist = [];
      getdeptinfo(this.unit.form)
        .then((res) => {
          this.unit.total = Number(res.data.total);
          const list = res.data.records;
          const length = list.length;
          for (var i = 0; i < length; i++) {
            this.unit.tablelist.push(list[i]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    download() {
      const form = {
        type: "0",
        status: this.newtypeone.form.status,
        businessAreaCode: this.newtypeone.form.businessAreaCode,
      };
      exportFocus(form);
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
    downloadtwo() {
      const form = {
        type: "1",
        status: this.newtypeone.form.status,
        businessAreaCode: this.newtypeone.form.businessAreaCode,
      };
      exportFocus(form);
    },
    downloadunit() {
      const form = {
        status: this.unit.form.status,
      };
      exportUnit(form);
    },
    disabled(data) {
      return Disablebutton(data);
    },
    uplodeone(data) {
      const imgData = data.file;
      const form = new FormData();
      form.append("file", imgData);
      importFocus(form)
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
    loadtwo(data) {
      const imgData = data.file;
      const form = new FormData();
      form.append("file", imgData);
      importFocustype(form)
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
    downloadmodel() {
      getModle(
        "http://10.84.1.223:9000/gy-file/2023/10/16/关注重点导入模板/7724/关注重点导入模板.xlsx"
      );
    },
    refesh() {
      this.$router.go();
    },
    push(value) {
      this.$router.push({
        path: "/data/info",
        query: {
          id: value.index,
        },
      });
    },
  },
  mounted() {
    this.getnewslist();
    this.getoption();
  },
  created() {
    if (this.$route.query.id) {
      this.activit = this.$route.query.id;
    }
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
  .tab {
    padding: 10px;
    width: 95%;
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