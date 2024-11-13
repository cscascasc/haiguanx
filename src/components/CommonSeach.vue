
<template>
  <div style="color: #000" class="container">
    <div class="selectContainer">
      <div class="select-item">
        <span>业务领域：</span>
        <el-select v-model="value" filterable placeholder="请选择" clearable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="select-item">
        <span>业务小类：</span>
        <el-select v-model="value" filterable placeholder="请选择" clearable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="results">
      <el-row :gutter="20">
        <el-col :span="16" :offset="5">
            <div class="bg-purple">
             <div class="title">问题简述</div>
             <div class="content">具体描述</div>
             <div class="rule">违反依据</div>
             <div class="footer">
                <p>业务领域</p>
                <p>业务领域</p>
                <p>业务领域</p>
             </div>
            </div>
        </el-col >
      </el-row>
    </div>
    <div class="results">
      <el-row :gutter="20">
        <el-col :span="16" :offset="5">
            <div class="bg-purple">
             <div class="title">问题简述</div>
             <div class="content">具体描述</div>
             <div class="rule">违反依据</div>
             <div class="footer">
                <p>业务领域</p>
                <p>业务领域</p>
                <p>业务领域</p>
             </div>
            </div>
        </el-col >
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "",
          label: "",
        },
      ],
      value: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 30px;
  overflow: hidden;
  width: 100%;
  .selectContainer {
    display: flex;
    justify-content: center;
    .select-item {
      margin-left: 100px;
      margin-right: 100px;
    }
  }
  .results {
    .bg-purple {
      margin-top: 20px;
      text-align: left;
      border-radius: 20px;
      background: #f2f4f9;
      .title{
        margin-left: 40px;
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 15px;
      }
      .content{
        margin-left: 40px;
        font-size: 16px;
        color: #4b4848;
        margin-bottom: 10px;
      }
      .rule{
         margin-left: 40px;
        font-size: 16px;
        color: #4b4848;
        margin-bottom: 10px;
      }
      .footer{
        display: flex;
        margin-left: 40px;
        p{
            margin-right: 10px;
        }
      }
    }
    .bg-purple:hover{
        box-shadow: 0 0 10px rgba(128, 128, 128, 0.7), 0 0 20px rgba(128, 128, 128, 0.7);
    }
  }
}
</style>