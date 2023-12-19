export default {
  namespaced: true,
    state: {
        tabList: [
            {  
                path: "/data",
                name: "data",
                lable: "数据池",
            }
        ]
    },
    mutations: {
      //更新tab数据
      selectMume(state , val){
        console.log(val , "val")
        //判断添加的数据是否为首页
        if(val.name !== 'home'){
          const index = state.tabsList.findIndex(item => item.name === val.name)
          //如果不存在
          if(index === -1){
            state.tabsList.push(val)
          }
        }
      },
      //删除tab
      closetag(state , item){
            
        const index = state.tabsList.findIndex(val => val.name === item.name)
        state.tabsList.splice(index , 1)
    }
    }
}