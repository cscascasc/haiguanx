import { getuser } from "@/api/getUser"
const userinfo = {
  state: {
    userName: "",
    userID: '',
    userCustoms: '',
    userdepartmentPath: '',
    // userdepartment:'c2aa4c82-95ae-474a-909f-ff34fa35a1e2'
    userdepartment: '',
    userPremisson: [],
    userRole: [],
    token: false,
    userlist: {}
  },
  mutations: {
    SET__USER: (state, user) => {
      state.userName = user.user.name
      state.userID = user.user.id
      state.userCustoms = user.user.customsName
      state.userdepartmentPath = user.user.deptName
      state.userdepartment = user.user.deptId
      state.userPremisson = user.permissions
      state.userRole = user.roles
      state.token = true
      state.userlist = user.user
    },
  },
  actions: {
    user({ state, dispatch, commit }) {
      return new Promise(resolve => {
        getuser().then(res => {
          const data = res.data
          commit('SET__USER', data)
          // dispatch('GenerateRoutes')
          resolve(data)
        }).catch(error => {
          console.error(error)
        })

      })

    }
  }
}
export default userinfo