<template>
   <div class="tabs">
        <el-tag v-for="(item, index ) in tags" :key="item.path" :effect="$route.name === item.name ? 'dark' : 'plain'"
            :closable="item.path !== 'home'" @click="changeMenu(item)" @close="handleClose(item, index)">
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name:'CommonTag',
    data(){
        return{
        }
    },
    comments:{
        ...mapState({
            tags: state => state.Tab.tabList
        })
    },
    methods:{
       ...mapMutations(['closeTag']),
       //跳转
       changeMenu(item){
         this.$router.push(
            {
                path: item.path
            }
         )
       },
       //删除
       handleClose(item, index) {
            //调用store中的方法
            this.closetag(item)
            //获取长度
            const length = this.tags.length 
            //删除后的路由跳转
            if (item.name !== this.$route.name) {
                return
            }
            //表示删除最后一项
            if (index === length) {
                this.$router.push({
                    name: this.tags[index - 1].name
                })
            } else {
                this.$router.push({
                    name: this.tags[index].name
                })
            }
        }
    }

};
</script>

<style lang="scss" scoped>
  .tabs{
    padding: 20px;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
  }
</style>