<template>
  <div>
    <v-card class="hide-overflow">
      <!-- left side menu src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"-->
      <v-navigation-drawer
        v-model="drawer"
        :clipped="clipped"
        :fixed="fixed"
        :src="bg"
        :permanent="permanent"
        :disable-resize-watcher="true"
        :hide-overlay="true"
        :temporary="true"
        expand-on-hover
        app
        dark
      >
        <v-list-item v-if="user.info" class="px-2">
          <v-list-item-avatar @click.stop="mini = !mini">
            <v-img
              src="static/v.png"
              width="45px"
              height="35px"
              srcset="/v.png 1x, /v.png 2x"
            />
          </v-list-item-avatar>

          <v-list-item-title
            class="yellow--text subtitle-1"
            v-text="user.info.name"
          />

          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider />

        <v-list-group
          v-for="item in menuInfo"
          :key="item.id"
          v-model="item.active"
          :prepend-icon="item.icon"
          :disabled="item.disabled"
          active-class="menu_selected"
        >
          <template #activator>
            <v-list-item-content class="white--text px-1">
              <v-list-item-title v-text="item.desc" />
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="subItem in item.subMenu"
            :key="subItem.id"
            active-class="subMenu_selected"
            nuxt
            :disabled="subItem.can"
            :to="subItem.to"
            class="px-1"
          >
            <v-list-item-avatar>
              <v-icon>{{ subItem.icon }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="subItem.desc" />
            </v-list-item-content>
            <v-list-item-action />
          </v-list-item>
        </v-list-group>
      </v-navigation-drawer>

      <!-- top header -->
      <v-app-bar
        :clipped-left="clipped"
        :fade-img-on-scroll="fadeImgOnScroll"
        fixed
        app
        dark
        dense
        :src="bg"
        hide-on-scroll
        color="primary"
      >
        <v-app-bar-nav-icon
          class="white--text hidden-md-and-up left-0"
          @click.stop="drawer = !drawer"
        />

        <nuxt-link
          v-if="system && system.info"
          :to="system.info.logoInfo.to"
          class="hidden-sm-and-down"
        >
          <v-img
            response
            contain
            width="42px"
            height="48px"
            :src="system.info.logoInfo.img"
          />
        </nuxt-link>

        <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
        <v-toolbar-title
          v-if="system && system.info"
          class="yellow--text pl-2"
          v-text="system.info.name"
        >
          <span
            class="yellow--text font-weight-bolder bx-0"
            v-text="system.info.name"
          />
        </v-toolbar-title>

        <v-spacer />

        <!-- 系统-用户信息，登录/注销 -->
        <template v-if="user.info">
          <v-chip label small dark color="rgba(0,0,0,0)">
            <v-icon left>
              mdi-account-circle-outline
            </v-icon>
            <label
              class="yellow--text subtitle-2"
              v-text="user.info.name"
            />
          </v-chip>

          <v-chip label small dark color="rgba(0,0,0,0)">
            <v-icon left>
              mdi-security
            </v-icon>
            <label
              class="yellow--text subtitle-2"
              v-text="user.info.roles.text"
            />
          </v-chip>

          <v-tooltip v-if="isLoggedIn" bottom>
            <template #activator="{ on }">
              <v-btn
                text
                color="orange"
                v-on="on"
                @click.stop="dialogConfirm = true"
              >
                <v-icon left>
                  mdi-exit_to_app
                </v-icon>注销
              </v-btn>
            </template>
            <span>注销</span>
          </v-tooltip>
          <v-tooltip v-else bottom>
            <template #activator="{ on }">
              <v-btn
                text
                color="orange"
                v-on="on"
                @click="switchUserLogin('login')"
              >
                <v-icon left>
                  mdi-person_outline
                </v-icon>登录
              </v-btn>
            </template>
            <span>登录</span>
          </v-tooltip>
        </template>
      </v-app-bar>

      <Login v-if="showLogin" v-model="showLogin" @closelogin="closelogin" />

      <Tips ref="Tips" />

      <v-menu
        open-on-hover
        bottom
        :disabled="false"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template #activator="{ on }">
          <v-btn
            class="mx-0"
            fab
            small
            dark
            color="light-green lighten-5"
            v-on="on"
          >
            <v-icon color="orange">
              mdi-fire
            </v-icon>
          </v-btn>
          <!-- <v-icon orange v-on="on">category</v-icon> -->
          <!-- </v-btn> -->
        </template>

        <Stations v-if="isLoggedIn" />
      </v-menu>
    </v-card>

    <div id="logoutTemplate">
      <v-row justify="center">
        <v-dialog v-model="dialogConfirm" max-width="290">
          <v-card>
            <v-card-title class="headline">
              注销
            </v-card-title>

            <v-card-text class="red--text subtitle-1">
              确定注销当前用户？
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" small nuxt @click="logout()">
                注销
              </v-btn>
              <v-btn text small @click="dialogConfirm = false">
                取消
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>

    <v-row>
      <v-col class="d-lg-none d-xl-flex">
        <br>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import Login from '@/components/Login/'
import Tips from '@/components/common/Tips/'
import Stations from '@/components/common/Stations'

export default {
  name: 'NavbarLeft',
  components: {
    Login,
    Tips,
    Stations
  },
  data () {
    return {
      title: 'Navbar',
      clipped: false, // 剪切的抽屉位于应用程序工具栏下方
      drawer: true,
      bg: 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg', // 'static/img/bg/sea-1920x1080.jpg',
      fixed: true,
      showLogin: false,
      dialogConfirm: false,

      menu_active: 0,

      permanent: true, // 不管屏幕尺寸如何，抽屉都可以看到
      fadeImgOnScroll: true,

      mini: false,
      right: true,
      rightDrawer: false
    }
  },
  computed: {
    ...mapState({
      system: state => state.system,
      user: state => state.user,
      roles: state => state.roles
    }),
    ...mapGetters('user', ['isLoggedIn']),
    hasLogin () {
      return false // this.$store.getters.user.isLoggedIn
    },
    menuInfo () {
      // window.console.log(314, this.$store.state.user.info.dynamos.length)
      const self = this
      const menu = this.$t('menuClass1') || null
      alert(' menuInfo () line: 289')
      if (!!menu.data && !!self.user.info && !!self.roles.info) {
        const roleId = self.user.info.roles.value
        const userRoles = self.roles.info.find((item) => {
          debugger
          return item.id === roleId
        })

        menu.data.forEach((item, index) => {
          const can = userRoles.powers.find(r => r.id === item.key).power[0]
            .can
          // update (vue)object data
          this.$set(item, 'can', !(can === 1))
        })

        self.$store.dispatch('menu/UpdateMenuInfo', menu)
        return menu.data
      } else {
        return null
      }
    }
  },
  created () {
    // this.hGetStateData()
  },
  methods: {
    hGetStateData () {
      window.console && window.console.log('Navbar/index-left.vue')
      // await self.$store.getters['system/getSystemInfo']
      // this.$store.dispatch('system/GetSystemInfo')
      // this.$store.dispatch('roles/GetRolesInfo')
    },
    switchUserLogin (state) {
      if (state === 'logout') {
        // 注销用户
        this.logout()
      }
      this.showLogin = !this.showLogin
    },
    closelogin () {
      this.showLogin = false

      // this.tips.show = true

      const t = this
      setTimeout(function () {
        t.$router.push('/')
      }, 1000)
    },
    logout () {
      debugger

      this.$store
        .dispatch('user/LogOut')
        .then(() => {
          this.dialogConfirm = false // 关闭确认注销对话框
          window.console.log(
            'common/Navbar/index-left.vue window.sessionStorage.removeItem(token)'
          )

          this.$router.push({ path: '/' })
          // Logout User Success.
          // this.tips.show = true
          // this.tips.txt = '已成功注销当前用户.'
          this.$refs.Tips.open('已成功注销当前用户.', 2000)
        })
        .catch((error) => {
          window.console.log('error = ' + error.message + '[Navbar]')
        })
    }
    // updateMenuPowerByState (menu, state) {
    //   const power = state.roles.info.find(
    //     item => item.id === state.user.info.roles.value
    //   ).powers
    //   const arrPower = []
    //   power.forEach((item) => {
    //     arrPower[item.id] = item.disabled
    //     if (item.subMenu) {
    //       item.subMenu.forEach((subItem) => {
    //         arrPower[subItem.id] = subItem.disabled
    //       })
    //     }
    //   })

    //   this.menu.forEach((item) => {
    //     // 父菜单
    //     item.disabled = arrPower[item.id]
    //     item.subMenu.forEach((subItem) => {
    //       // 子菜单
    //       subItem.disabled = arrPower[subItem.id]
    //     })
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.menu_selected{
  color: orange !important;
}

.subMenu_selected{
  color: #ffffff !important;
  opacity: 0.9 !important;
}

#vertical-menu{
  margin-top: 48px;
}
</style>
