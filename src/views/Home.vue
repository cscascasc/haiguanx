<template>
  <div class="container">
    <div class="mianContainer">
      <router-view></router-view>
      <CommonBorrom />
    </div>
    <div class="bottom"></div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: linear-gradient(45deg, #003366, #006699, #0099cc);
  background-size: 200% 200%;
  animation: sci-fi-animation 12s linear infinite;
  transition: all 0.6s;

  @keyframes sci-fi-animation {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
  .mianContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 20px;
    min-width: calc(100% - 40px);
    min-height: calc(100vh - 100px);
  }
}
</style>
<script>
import CommonBorrom from "../components/CommonBorrom.vue";
export default {
  components: {
    CommonBorrom,
  },
};
</script>