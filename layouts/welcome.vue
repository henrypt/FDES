<template>
  <v-app class="page_welcome">
    <v-flex>
      <v-app-bar color="rgba(0,0,0,0.1)" dense height="70">
        <v-list color="rgba(0,0,0,0.01)" min-width="100%">
          <template v-if="system && system.info">
            <v-list-item dense>
              <v-list-item-avatar size="50">
                <v-img
                  :src="system.info.logoInfo.img"
                  :alt="system.info.name"
                />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  class="title secondary--text"
                  v-text="system.info.name"
                />
                <v-list-item-subtitle
                  class="subtitle-1 info--text font-italic"
                  v-text="system.info.enname"
                />
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-app-bar>
      <v-container fluid>
        <v-row dense>
          <v-col>
            <nuxt />
          </v-col>
        </v-row>
      </v-container>

      <Footer />
    </v-flex>
  </v-app>
</template>

<script>
// import Cookie from 'js-cookie'
import { mapState } from 'vuex'
import Footer from '@/components/common/Footer'
import { getTokenByRedis } from '@/api/index.js'

export default {
  components: { Footer },
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      system: state => state.system
    })
  },
  created () {
    /*
      路由至：/welcome，是否就证明当前用户就注销掉？
      什么情况下会路由到？
        1、打开此系统
        2、正常注销
        3、用户丢了
        4、用户自己路由到此页面

      判断用户是否登录过，条件如下：
        a、有window.localStrage>tokenid
        b、根据tokenid从服务端Redis中获取用户信息
        根据以上2条都成立，则表示此用户还在登录状态，系统自动跳转至“首页”。
        如果以上2条有1条不成立，则表示用户不在了（不在的情况有很多，比如：tokenid丢了，服务端Redis字段过期/出错等），此时注销掉当前用户。
      注：当前用户的缓存在window.sessionStorage>FDES>user.info.user.id

      其他情况属于正常打开系统，坐等用户自己登录。
    */

  },
  mounted () {
    this.logOut()
    // const sessionKey = this.$store.state.system.info.sname
    // const menuData = this.$common.getSession(sessionKey)
    // if (menuData?.user?.info?.user) {
    //   this.logOut(menuData?.user?.info || menuData?.user)
    // }

    // if (Cookie) {
    //   if (!this.$store.state.token.authorization) {
    //     const _token = Cookie.get('token')
    //     this.$store.commit('setToken', _token)
    //   }
    // }
    const tokenId = this.$common.getTokenid() || null
    getTokenByRedis(tokenId).then((res) => {})
  },
  methods: {
    async logOut (user) {
      // const tokenId = this.$common.getTokenid()
      // if (tokenId) {
      //   const id = tokenId.substring(tokenId.indexOf('BJVAG') + 5, tokenId.lastIndexOf('BJVAG'))
      //   window.console.log('------------- layouts/welcome.vue .dispatch(user/LogOut) --------------')
      //   this.$store.dispatch('user/LogOut', id)
      // }
      // else {
      //   window?.localStorage?.removeItem('tokenid')
      // }
      // if (user?.user) {
      //   this.$store.dispatch('user/LogOut')
      //   return user
      // } else {
      //   return null
      // }
    }
  }
}
</script>

<style scoped>
.page_welcome {
  background-image: url('/img/welcome.jpg');
  background-size: cover;
}

.transparentBg01 {
  background-color: rgba(0, 0, 0, 0.01);
}
</style>
