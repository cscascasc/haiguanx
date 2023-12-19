<template>
  <div class="container">
    <div class="top">
      <DataHeader />
    </div>
    <div class="viewcontainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import DataHeader from "@/components/DataHeader.vue";
export default {
  data() {
    return {};
  },
  components: {
    DataHeader,
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