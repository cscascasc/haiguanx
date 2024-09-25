<template>
  <div class="container">
    <div class="top">
      <control-hearder />
    </div>
    <div class="viewcontainer">
      <keep-alive include="orderlist">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import ControlHearder from "./ControlHearder.vue";
export default {
  name: "orderlist",
  data() {
    return {};
  },
  components: {
    ControlHearder,
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 100%;
  background-color: #fff;
  color: #000;
  .top {
    padding-top: 20px;
    height: 40px;
  }
  .viewcontainer {
    width: 100%;
    height: calc(100vh - 100px);
    background-color: #fff;
  }
}
</style>