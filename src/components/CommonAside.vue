<template>
  <div class="aside-container" style="transform: translateX(-100%)">
    <div class="aside">
      <el-menu mode="vertical" class="el-menu-aside" unique-opened>
        <el-menu-item :index="(1).toString()" @click="tohome()">
          <span>主页</span>
        </el-menu-item>
        <el-submenu
          v-for="item in hasChildren"
          :key="item.title"
          :index="item.title"
          @click="topath(item)"
        >
          <template slot="title">
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item
            v-for="subitem in item.children"
            :key="subitem.title"
            :index="subitem.title"
            @click="topath(subitem)"
          >
            <span>{{ subitem.title }}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          v-for="item in noChildren"
          :key="item.name"
          :index="item.name"
          @click="topath(item)"
        >
          <span>{{ item.lable }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="btn-box" @click="show">
      <div class="show-btn">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.aside-container {
  position: absolute;
  min-height: calc(100vh - 60px);
  background-color: beige;
  width: 12%;
  transition: all 0.2s ease-in;
  display: flex;
  z-index: 100;

  .aside {
    width: 100%;
    height: 100%;
    .el-menu-aside {
      font-size: 16px;
      text-align: left;
      min-height: calc(100vh - 60px);
    }
  }
  .btn-box {
    width: 50px;
    height: 50px;
    right: -50px;
    bottom: 30px;
    position: absolute;
    background-color: rgba($color: #bdbdbd, $alpha: 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    .show-btn {
      width: 100%;
      font-size: 30px;
      color: #fff;
    }
    .active {
      transform: rotate(-180deg);
    }
  }
}
</style>
<script>
import { getUserMeun } from "@/api/getUser";
export default {
  data() {
    return {
      menuList: [
        // {
        //   path: "/data",
        //   name: "data",
        //   lable: "数据池",
        //   children: [
        //     {
        //       path: "/dataselect",
        //       name: "dataselect",
        //       lable: "审计全景",
        //     },
        //     {
        //       path: "/data1",
        //       name: "data1",
        //       lable: "问题库",
        //     },
        //     {
        //       path: "/data2",
        //       name: "data2",
        //       lable: "内控库",
        //     },
        //     {
        //       path: "/data3",
        //       name: "data3",
        //       lable: "规章制度库",
        //     },
        //     { path: "/setrules", name: "SetRules", lable: "预警规则设置" },
        //     { path: "/info", name: "Info", lable: "资讯管理" },
        //     {
        //       path: "/excli",
        //       name: "Excli",
        //       lable: "报表管理",
        //     },
        //   ],
        // },
        // {
        //   path: "",
        //   name: "",
        //   lable: "公共住房",
        //   children: [
        //     {
        //       path: "/public1",
        //       name: "public1",
        //       lable: "住房管理",
        //     },
        //     { path: "/publicobject", name: "publicobject", lable: "资产管理" },
        //     {
        //       path: "/public2",
        //       name: "public2",
        //       lable: "入住申请",
        //     },
        //     {
        //       path: "/public3",
        //       name: "public3",
        //       lable: "入住审批",
        //     },
        //     {
        //       path: "/rent",
        //       name: "Rent",
        //       lable: "收费管理",
        //     },
        //   ],
        // },
        // {
        //   lable: "采购管理",
        //   children: [
        //     {
        //       path: "/shop",
        //       name: "shop",
        //       lable: "发起采购审批",
        //     },
        //     { path: "/collabappro", name: "CollabAppro", lable: "协同审批" },
        //     { path: "/addappor", name: "Addappor", lable: "材料补充" },
        //   ],
        // },
        // {
        //   path: "/notice",
        //   name: "notice",
        //   lable: "预警通知",
        //   children: [
        //     {
        //       path: "/datanotice",
        //       name: "datanotice",
        //       lable: "数据池",
        //     },
        //     {
        //       path: "/housenotice",
        //       name: "housenotice",
        //       lable: "公有住房",
        //     },
        //     {
        //       path: "/procurenotice",
        //       name: "procurenotice",
        //       lable: "采购审批",
        //     },
        //   ],
        // },
        // {
        //   path: "",
        //   name: "",
        //   lable: "流程菜单",
        //   children: [
        //     {
        //       path: "/activit",
        //       name: "activit",
        //       lable: "流程部署",
        //     },
        //     {
        //       path: "/task",
        //       name: "task",
        //       lable: "部署管理",
        //     },
        //   ],
        // },
        // {
        //   path: "",
        //   name: "",
        //   lable: "设置中心",
        //   children: [
        //     {
        //       path: "/dictsetting",
        //       name: "DictSetting",
        //       lable: "字典设置",
        //     },
        //     {
        //       path: "/rolesetting",
        //       name: "RoleSetting",
        //       lable: "角色设置",
        //     },
        //     {
        //       path: "/meunsetting",
        //       name: "MeunSetting",
        //       lable: "菜单设置",
        //     },
        //   ],
        // },
      ],
    };
  },
  computed: {
    noChildren() {
      return this.menuList.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menuList.filter((item) => item.children);
    },
  },
  methods: {
    show() {
      this.getmeun();
      var contianer = document.querySelector(".aside-container");
      var showbtn = document.querySelector(".show-btn");
      if (!contianer.style.transform) {
        showbtn.classList.remove("active");
        contianer.style.cssText = "transform : translateX(-100%);";

        this.$emit("show", "0");
      } else {
        contianer.style.removeProperty("transform");
        showbtn.classList.add("active");
        this.$emit("show", "1");
      }
    },
    clos() {
      var contianer = document.querySelector(".aside-container");
      var showbtn = document.querySelector(".show-btn");
      contianer.style.cssText = "transform : translateX(-100%);";
      showbtn.classList.remove("active");
    },
    topath(item) {
      // const path = '/' + item.path
      if (
        this.$router.path !== item.path &&
        !(this.$router.path === "/home" && item.path !== "/")
      ) {
        this.$router.push(item.path);
      }
    },
    tohome() {
      if (this.$router.path !== "/" && this.$router.path !== "/home") {
        this.$router.push("/index/one");
      }
    },
    getmeun() {
      this.menuList = [];
      this.menuList = this.$store.state.permission.meunRouter;
      console.log(this.$store.state.permission.meunRouter, "1");
    },
  },
  created() {},
  mounted() {
    // this.menuList = this.$store.state.permission.meunRouter
  },
};
</script>