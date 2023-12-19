<template>
  <div class="home">
    <el-container class="container">
      <el-header>
        <CommonHeader />
      </el-header>
      <el-aside>
        <CommonAside @show="show" />
      </el-aside>
      <el-main>
        <div id="mainview">
          <router-view />
        </div>
        <!--主路由接口-->
      </el-main>
    </el-container>
  </div>
</template>
<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  color: #fff;
  overflow: hidden;
  .el-header,
  .el-main {
    padding: 0;
  }
  .el-main {
    width: 100vw;
    display: flex;
    justify-content: flex-end;
    #mainview {
      width: 100%;
      display: flex;
    }
  }
}
</style>
<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";
import CommonTab from "@/components/CommonTab.vue";
export default {
  components: {
    CommonHeader,
    CommonAside,
    CommonTab,
  },
  data() {
    return {
      size: "",
    };
  },
  methods: {
    show(value) {
      this.size = value;
    },
  },
  watch: {
    size() {
      var mian = document.querySelector("#mainview");
      if (this.size === "0") {
        mian.style.width = "100vw";
      }
      if (this.size === "1") {
        mian.style.width = "88vw";
      }
    },
  },
  created() {
    
  },
};
</script>
