<template>
  <div class="container">
    <el-radio-group v-model="label" @change="topath">
      <el-radio-button
        :label="tebList.serch.path"
        :disabled="Disable('data:data:serch')"
        >数据查询</el-radio-button
      >
      <el-radio-button
        :label="tebList.manage.path"
        :disabled="Disable('data:data:manage')"
        >问题库</el-radio-button
      >
    </el-radio-group>
  </div>
</template>

<script>
import { Disablebutton } from "@/utils/button";
export default {
  data() {
    return {
      tebList: {
        serch: {
          path: "/data1/datasearch",
          name: "datasearch",
          label: "数据查询",
        },
        manage: {
          path: "/data1/datamanage",
          name: "datamanage",
          lable: "问题库",
        },
      },
      label: "",
    };
  },
  mounted() {
    this.label = this.$route.path;
  },
  methods: {
    topath(value) {
      if (this.$route.path !== value) {
        this.$router.push(value);
      }
    },
    Disable(data) {
      Disablebutton(data);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  padding-left: 30px;
}
</style>