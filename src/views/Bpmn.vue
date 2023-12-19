<template>
  <div
    style="
      width: 20vw;
      height: 20vh;
      color: #000;
      overflow: hidden;
      word-break: break-word;
      white-space: pre-line;
    "
  >
    sadasdasdasdasdasdkjaslkdjaskdjaslkjdlaskjdlkasjdlkashflkhasjfhasjfhaslkdlaskhdlkasdlkasjdlkasflkhaslfasjlfhaslhfaslhflashdljkashdljashdklhasfjlkhaslfhaslfhlaslhfjkashfashdkashdkash
  </div>
</template>

<script>
import router from "@/router";
import { getuser } from "@/api/getUser";
import { mapGetters, mapState } from "vuex";
import { getUserRole, getUserMeun } from "@/api/getUser";
export default {
  data() {
    return {
      user: [],
    };
  },
  methods: {
    getuserole() {
      getUserRole({})
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getusermeun() {
      getUserMeun()
        .then((res) => {
          const sdata = JSON.parse(JSON.stringify(res.data));
          const sidebarRoutes = filterAsyncRouter(sdata);
          router.addRoute(sidebarRoutes);
          console.log(this.$router.options);
        })
        .catch((error) => {
          console.log(error);
        });
      function filterAsyncRouter(
        asyncRouterMap,
        lastRouter = false,
        type = false
      ) {
        return asyncRouterMap.filter((route) => {
          if (type && route.children) {
            route.children = filterChildren(route.children);
          }
          if (route.component) {
            // Layout ParentView 组件特殊处理
            if (route.component === "Layout") {
              route.component = Layout;
            } else if (route.component === "ParentView") {
              route.component = ParentView;
            } else if (route.component === "InnerLink") {
              route.component = InnerLink;
            } else {
              route.component = loadView(route.component); //对路由进行组件匹配
            }
          }
          //有子路由
          if (
            route.children != null &&
            route.children &&
            route.children.length
          ) {
            route.children = filterAsyncRouter(route.children, route, type);
          } else {
            delete route["children"];
            delete route["redirect"];
          }
          return true;
        });
      }

      function filterChildren(childrenMap, lastRouter = false) {
        var children = [];
        //遍历子节点中的每一项
        childrenMap.forEach((el, index) => {
          //存在子节点
          if (el.children && el.children.length) {
            //检查是否拥有子节点
            if (el.component === "ParentView" && !lastRouter) {
              el.children.forEach((c) => {
                c.path = el.path + "/" + c.path;
                if (c.children && c.children.length) {
                  children = children.concat(filterChildren(c.children, c));
                  return;
                }
                children.push(c);
              });
              return;
            }
          }
          if (lastRouter) {
            el.path = lastRouter.path + "/" + el.path;
          }
          children = children.concat(el);
        });
        return children;
      }
      const loadView = (view) => {
        return "../" + view + ".vue";
      };
    },
    get() {
      getuser()
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // component:{
    //   ...mapState({
    //       sidemeun : state => state.permission.sidebarRoutes
    //   })
    // },
  },
  mounted() {
    // this.$store.dispatch('GenerateRoutes')
    // this.getuser();
    // this.getusermeun();
    // this.$store.dispatch('GenerateRoutes')
    // console.log(this.$router.options ,'www')
    // console.log(this.$store.state.defualtRoutes ,'222')
    // console.log(this.$store.permission.state.defualtRoutes)
    // this.get();
    this.$store.dispatch("user");
  },
};
</script>

<style>
</style>