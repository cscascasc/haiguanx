<template>
  <div class="container">
    <el-radio-group v-model="label" @change="topath">
      <el-radio-button
        :label="tebList.serch.path"
        :disabled="disabled('inarea:inarea:in')"
        >执法领域</el-radio-button
      >
      <el-radio-button
        :label="tebList.manage.path"
        :disabled="disabled('inarea:inarea:out')"
        >非执法领域</el-radio-button
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
          path: "/control-in",
          name: "Control-In",
          label: "执法领域",
        },
        manage: {
          path: "/control-out",
          name: "Control-Out",
          lable: "非执法领域",
        },
      },
      label: "执法领域",
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
    disabled(data) {
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