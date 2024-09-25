<template>
  <div class="bottomContainer">
    <div class="left">
      <div class="timeContainer">
        <div class="yearContainer">
          <div class="year">{{ this.times.year }}</div>
          <div class="timetemp">-</div>
          <div class="month">{{ this.times.month }}</div>
          <div class="timetemp">-</div>
          <div class="day">{{ this.times.day }}</div>
        </div>
        <div class="minContainer">
          <div id="hours" class="text">{{ this.times.hours }}</div>
          <div class="timetemp">:</div>
          <div id="minutes" class="text">{{ this.times.minutes }}</div>
          <div class="timetemp">:</div>
          <div id="seconds" class="text">{{ this.times.seconds }}</div>
        </div>
      </div>
    </div>
    <div class="mid">
      <div class="box">
        <div
          class="btmlist"
          v-for="item in bottomList"
          :key="item.lable"
          :index="item.lable"
          @click="topath(item)"
        >
          <el-button>
            {{ item.lable }}
          </el-button>
        </div>
      </div>
    </div>
    <div class="right">
      <div></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.bottomContainer {
  width: calc(100% - 40px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    width: calc(100% / 3);
    margin-left: 60px;
    font-size: 18px;
    display: flex;
    .timeContainer {
      display: flex;
      justify-content: space-around;
      align-items: center;
      justify-content: center;
      .yearContainer,
      .minContainer {
        display: flex;
        margin-left: 10px;
        .timetemp {
          margin: 0 2px 0 2px;
        }
      }
    }
  }
  .mid {
    width: calc(100% / 3);
    display: flex;
    justify-content: center;
    color: #fff;
    .box {
      display: flex;
      justify-content: space-around;
      width: 100%;
      .btmlist {
        .el-button {
          background-color: rgba($color: #d7d7d7, $alpha: 0.1);
          color: #fff;
        }
        .el-button:hover {
          transform: scale(0.8);
          box-shadow: 0 0 10px rgb(0, 153, 184) inset, 0 0 30px rgb(0, 153, 184);
          transition: all 0.2s inherit;
        }
      }
    }
  }
  .right {
    width: calc(100% / 3);
  }
}
</style>
<script>
export default {
  data() {
    return {
      bottomList: [
        { path: "/index/one", name: "indexone", lable: "总览" },
        { path: "/index/two", name: "indextwo", lable: "数据池" },
        { path: "/index/three", name: "indexthree", lable: "采购审批" },
        { path: "/index/four", name: "indexfour", lable: "公有住房" },
      ],
      times: {
        year: "0",
        month: "0",
        day: "0",
        hours: "",
        minutes: "",
        seconds: "",
      },
    };
  },
  methods: {
    time() {
      var time = new Date();
      var timem = time.getMonth();
      if (timem < 9 && timem > 0) {
        this.times.month = "0" + (timem + 1);
      } else {
        this.times.month = timem + 1;
      }
      var timed = time.getDate();

      if (timed < 9 && timed > 0) {
        this.times.day = "0" + timed;
      } else {
        this.times.day = timed;
      }
      var timeh = time.getHours();
      if (timeh < 9 && timeh > 0) {
        this.times.hours = "0" + timeh;
      } else {
        this.times.hours = timeh;
      }
      var timemi = time.getMinutes();
      if (timemi < 10 && timemi > 0) {
        this.times.minutes = "0" + timemi;
      } else {
        this.times.minutes = timemi;
      }
      var times = time.getSeconds();
      if (times < 10 && times >= 0) {
        this.times.seconds = "0" + times;
      } else {
        this.times.seconds = times;
      }
      if (timeh < 9 && timeh > 0) {
        this.times.hours = "0" + timeh;
      } else {
        this.times.hours = timeh;
      }
      this.times.year = time.getFullYear();
    },
    showtime() {
      window.setInterval(this.time, 1000);
    },
    topath(item) {
      if (
        this.$router.path !== item.path &&
        !(this.$router.path === "/home" && item.path !== "/")
      ) {
        this.$router.push(item.path);
      }
    },
  },
  created() {
    this.showtime();
  },
};
</script>
   