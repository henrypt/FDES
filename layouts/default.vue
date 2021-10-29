<template>
  <v-app dark>
    <v-flex>
      <v-main class="hContent">
        <Navbar v-if="isShowNav" fluid />

        <!--  ml-12 -->
        <v-container id="mainContent" ref="mainContent" fluid>
          <nuxt class="mt-7" />
        </v-container>
      </v-main>
    </v-flex>
  </v-app>
</template>

<script>
// import Cookie from 'js-cookie'
import { mapState, mapGetters } from 'vuex'
import Navbar from '@/components/common/Navbar'
import { getTokenByRedis, expireTokenByRedis, checkExistentKey } from '@/api/index.js'

export default {
  name: 'Default',
  components: {
    Navbar
  },
  scrollToTop: true,
  data () {
    return {
      title: 'FDES',
      fixed: true,
      isShowNav: false,
      timer: null,
      overtime: {
        lastTime: null, // 最后一次点击的时间
        timeOut: null // 超时时间
      }
    }
  },
  computed: {
    ...mapState({
      system: state => state.system,
      user: state => state.user,
      roles: state => state.roles
    }),
    ...mapGetters('user', ['isLoggedIn'])
  },
  watch: {},
  created () {
    const self = this
    // 在 created() 里记录页面第一次打开的时间
    self.overtime.lastTime = new Date().getTime()

    self.initPage()
    // self.hGetStateData()
  },
  mounted () {
    const self = this
    self.$nextTick(() => {
      const systemInfo = self.$store?.getters['system/getSystemInfo']
      self.overtime.timeOut = systemInfo?.overtime ? Number(systemInfo.overtime) * 60 * 1000 : 20 * 60 * 1000
      if (systemInfo?.overtime > 0) {
        self.$refs.mainContent.addEventListener('click', self.isOperation)
      }
    })
    // if (Cookie) {
    //   if (!this.$store.state.token.authorization) {
    //     const _token = Cookie.get('token')
    //     this.$store.commit('setToken', _token)
    //   }
    // }
    window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
    window.addEventListener('unload', e => this.unloadHandler(e))
  },
  destroyed () {
    window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
    window.removeEventListener('unload', e => this.unloadHandler(e))
  },
  methods: {
    async initPage () {
      const self = this
      const tokenId = self.$common.getTokenid() || null
      // const tokenInfo = this.$store.getters['token/getTokenInfo'](tokenId) || null

      const meta = self.$route.meta
      const sessionKey = self.$store.state.system.info.sname
      // from welcome to home
      if (meta && meta.loginState && meta.loginState === 'logining') {
        window.console.log('从 登录页 到 首页', tokenId)
        window.console.log('------------- session: ', JSON.parse(window.sessionStorage.getItem('FDES')).token, '------------- ')
        window.console.log('------------- vuex: ', self.$store.state.token, '------------- ')
        let _menu = JSON.parse(window.sessionStorage.getItem(sessionKey)).menu
        _menu = _menu?.info?.info || _menu?.info || _menu
        window.console.log('layouts>deafult.vue initPage() _menu = ', _menu, _menu?.length)
        window.console.log('layouts>deafult.vue initPage() state.menu.info = ', self.$store.state.menu.info, _menu?.info || _menu)

        _menu && self.$store.dispatch('menu/GetMenuInfo', _menu).then((res) => {
          if (res === 'go') {
            self.$common.go('welcome', self)
            // if (tokenId) {
            //   const userId = tokenId.substring(tokenId.indexOf('BJVAG') + 5, tokenId.lastIndexOf('BJVAG'))
            //   window.console.log('------------- layouts/default.vue .dispatch(user/LogOut) --------------')
            //   self.$store.dispatch('user/LogOut', userId).then((res) => {
            //     self.$common.go('welcome', self)
            //   })
            // }
          }

          self.isShowNav = true
          self.$common.resetSession('menu', sessionKey, res)

          self.hGetStateData()
        })
      } else {
        const r = await getTokenByRedis(tokenId)
        window.console.log('layouts>default.vue => r = ', r, tokenId)
        window.console.log('layouts>deafult.vue => state.menu.info = ', self.$store.state.menu.info)

        if (r && r.data) {
          const objR = JSON.parse(r.data.replaceAll('$', '"')) || []
          if (objR) {
            const { id, loginId, name, dynamoId, dynamoName, dynamoShortName, roleName, dynamo } = objR
            const dynamos = []
            dynamo.forEach((p) => {
              dynamos.push(p)
            })

            const info = {
              roles: dynamos, // [{"AlarmView":"1","BaseDataView":"1","CanMngSys":"1","CanOverhaul":"1","CanQuery":"1","CanRepair":"1","CanRun":"1","CanStatus":"1","CanUpdate":"1","CurvesView":"1","Descr":"VIP用户","Text":"VIP用户","DoPointE":"1","FaultProcV":"1","PopedomId":"undefined","ReportView":"1","StatView":"1","StatusView":"1","Shadow":"0","_DType":"100","_ID":"19","_Name":"19号发电机","_ShortNM":"1F","_Status":"0"}, ..., {} ]
              user: {
                id,
                loginId,
                name,
                dynamoId,
                dynamoName,
                dynamoShortName,
                roleName
              },
              tokenId
            }

            const tokenInfo = {
              id: tokenId,
              info: JSON.stringify(objR)
            }

            const r1 = self.$store.dispatch('user/ResetUser', info)
            const r2 = self.$store.dispatch('token/ResetToken', info)
            const r3 = self.$store.dispatch('roles/ResetRoles', dynamos)
            window.console.log('Promise.all ', r1, r2, r3, tokenInfo)

            Promise.all([r1, r2, r3]).then(() => {
              let _menu = JSON.parse(window.sessionStorage.getItem(sessionKey)).menu
              _menu = _menu?.info?.info || _menu?.info || _menu
              // 根据当前用户的角色信息，更新菜单权限，并返回新的菜单信息
              self.$store.dispatch('menu/GetMenuInfo', _menu).then((res) => {
                if (res === 'go') {
                  self.$common.go('welcome', self)
                  // const tokenId = self.$store.getters['token/getTokenid']
                  // const userId = tokenId.substring(tokenId.indexOf('BJVAG') + 5, tokenId.lastIndexOf('BJVAG'))
                  // window.console.log('------------- layouts/default.vue .dispatch(user/LogOut) --------------')
                  // self.$store.dispatch('user/LogOut', userId).then((res) => {
                  //   self.$common.go('welcome', self)
                  // })
                }

                self.isShowNav = true
                self.$common.resetSession('menu', sessionKey, res)
                self.$common.resetSession('token', sessionKey, tokenInfo)
              }).catch((err) => {
                window.console.log(err)
              })

              self.hGetStateData()
              // self.$common.go('home', self) // 路由跳转
            })

            self.timer && window.clearTimeout(self.timer)
            self.timer = window.setTimeout(() => {
              self.$common.resetSession('token', sessionKey, tokenInfo)
            }, 3 * 1000)
          }
        } else if (window) {
          self.$common.go('welcome', self)
          // if (tokenId) {
          // // tokenId has userId
          //   const userId = tokenId.substring(tokenId.indexOf('BJVAG') + 5, tokenId.lastIndexOf('BJVAG'))
          //   window.console.log('------------- layouts/default.vue .dispatch(user/LogOut) --------------')
          //   self.$store.dispatch('user/LogOut', userId).then((res) => {
          //     self.$common.go('welcome', self)
          //   })
          // }
          // else {
          //   window?.localStorage?.removeItem('tokenid')
          // }
        }
      }
    },
    async hGetStateData () {
      const self = this
      self.menu_active = 1

      window.console ?? window.console.log('layouts>default.vue [hGetStateData] state.menu = ', self.$store.state.menu)

      await self.$store.dispatch('roles/GetRolesInfo')
      this.menu = self.$store?.state?.menu?.info || self.$store.state.menu // this.$t('menuClass1') || null

      // self.updateMenuPowerByState(self.$store.state)

      // if(self.$store.state.user.info){
      //   if(self.$store.state.user.info.id===1) { // guest
      //     self.loginComponent && self.updateMenuPowerByState(self.$store.state)
      //   }
      // }
    },
    // async updateMenuPowerByState (state) {
    //   const self = this
    //   let roleId = -1
    //   let powers = null

    //   if (state.user.info) {
    //     roleId = state.user.info.roles.value // 用户角色ID
    //     powers = state.roles.info.find((item) => { return item.id === roleId }).powers // 用户角色ID对应的角色信息

    //     // 更新Vuext-state-menu-info xxx.can 处理菜单权限
    //     state.menu && await self.$store.dispatch('menu/UpdateMenuInfo', powers)
    //   }
    // },
    beforeunloadHandler () {
      this._beforeUnload_time = new Date().getTime()
    },
    unloadHandler (e) {
      // const self = this
      // self._gap_time = new Date().getTime() - self._beforeUnload_time
      // // 判断是窗口关闭还是刷新
      // if (self._gap_time <= 5) {
      //   // 关闭窗口前，登录注销用户
      //   if (self.user.info) {
      //     self.$store.dispatch('user/LogOut')
      //   }
      // }
      return false
    },
    async isOperation () {
      const self = this
      const currentTime = new Date().getTime() // 当前点击的时间
      const dif = currentTime - self.overtime.lastTime
      const max = 5 * 1000 // 判断上限(5秒钟)

      if (dif > max) {
        const tokenId = self.$common.getTokenid() // $store.getters['token/getTokenid']
        if (dif > self.overtime.timeOut) {
          const r0 = await checkExistentKey(tokenId) // 检测用户token在Redis还存不存在
          window.console.log('============ checkTokenKey Token By Redis ============ ', r0?.data?.toString().toLowerCase())
          // 从服务端Redis验证当前token是否有效
          if (r0?.data?.toString().toLowerCase() !== 'true') {
            window.alert('用户长时间没有操作！系统会自己注销当前用户。[时长：' + self.overtime.timeOut + ']')
            // const userInfo = self.$store.getters['user/getUserInfo'](self)
            // const r = await self.$store.dispatch('user/LogOut', userInfo?.id)
            // if (r === 'ok') {
            //   self.$common.go('welcome', self) // 路由跳转
            // }
          } else {
            self.overtime.lastTime = new Date().getTime()
          }
        } else {
          self.overtime.lastTime = new Date().getTime()
          // 刷新token-redis
          // const userInfo = await self.$store.getters['user/getUserInfo'](self)

          await self.$store.getters['token/getTokenInfo'](tokenId).then((res) => {
            expireTokenByRedis(tokenId, self.overtime.timeOut).then((res) => {
              window.console.log('============ Expire Token By Redis ============')
              self.overtime.lastTime = new Date().getTime()
            })
          })
        }
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.transparentBg01{
  background-color: rgba(0, 0, 0, 0.01);
}

.hContent{
  padding: 0 !important;
  margin: 0 !important;
}

/* large desktop */
@media screen and (min-width:1200px){
  #mainContent{
    padding: 2px 1px 5px 1px;
    margin: 0;
  }
}

/* Normal desktop */
@media screen and (min-width: 960px) and (max-width: 1199px){
  #mainContent{
    padding: 2px 1px 5px 1px;
    margin: 0;
  }
}
/* Tablet desktop */
@media screen and (min-width: 768px) and (max-width: 959px){
  #mainContent{
    padding: 42px 1px 5px 1px;
    margin: 0;
  }
}

/* Large Mobile */
@media only screen and (min-width: 480px) and (max-width: 767px){
  #mainContent{
    padding: 40px 0 0 0 !important;
  }
}

/* small mobile */
@media screen and (min-width:375px) and (max-width:479px){
  #mainContent{
    padding: 40px 0 0 0 !important;
  }
}

@media screen and (min-width:360px) and (max-width:374px){
  #mainContent{
    padding: 40px 0 0 0 !important;
  }
}

@media screen and (max-width:359px){
  #mainContent{
    padding: 40px 0 0 0;
  }
}
</style>
