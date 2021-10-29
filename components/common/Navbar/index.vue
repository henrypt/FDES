<template>
  <div>
    <v-card class="hide-overflow">
      <!-- Left navigation drawer menu -->
      <v-navigation-drawer
        v-model="drawer"
        color="primary"
        enable-resize-watcher
        app
        :src="bg"
        class="hidden-md-and-up"
      >
        <v-list v-if="menuInfo" nav dense>
          <v-list-item v-if="user.info" two-line class="px-0 pl-3">
            <v-list-item-avatar>
              <img :src="user.img" alt="">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-if="user.info.user && user.info.user.name" v-text="user.info.user.name" />
              <v-list-item-subtitle v-if="user.info.user" v-text="user.info.user.roleName" />
            </v-list-item-content>
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
              <v-list-item-content class="white--text">
                <v-list-item-title v-text="item.desc" />
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="subItem in item.subMenu"
              :key="subItem.id"
              active-class="subMenu_selected"
              :disabled="subItem.can"
              :to="subItem.to"
            >
              <v-list-item-content>
                <v-list-item-title class="white--text" v-text="subItem.desc" />
              </v-list-item-content>
              <!-- <v-list-item-action>
                <v-icon></v-icon>
              </v-list-item-action> -->
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>

      <!-- Top app bar： Logo、系统-名称、用户信息、登录/注销  -->
      <v-app-bar
        class="left-0"
        app
        dark
        fixed
        dense
        :src="bg"
        height="40px"
        color="primary"
      >
        <v-app-bar-nav-icon
          class="white--text hidden-md-and-up"
          @click.stop="drawer = !drawer"
        />

        <!-- logo -->
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

        <!-- system name -->
        <v-toolbar-title v-if="system && system.info" class="pl-2 left-0">
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
              v-text="user.info.user.roleName"
            />
          </v-chip>

          <v-chip label small dark color="rgba(0,0,0,0)">
            <v-icon left>
              mdi-security
            </v-icon>
            <label
              v-if="user.info.user && user.info.user.name"
              class="yellow--text subtitle-2"
              v-text="user.info.user.name"
            />
          </v-chip>

          <v-tooltip v-if="!isGuest" bottom>
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

      <Login
        v-show="showLogin"
        ref="loginComponent"
        v-model="showLogin"
        @welcomeUser="welcomeUser"
        @closeLogin="closeLogin"
      />

      <!-- TOP 菜单 -->
      <div id="topMenuTemplate">
        <v-toolbar
          id="vertical-menu"
          color="primary"
          dark
          dense
          flat
          height="35px"
          class="hidden-sm-and-down"
          style="margin-top:40px;"
        >
          <v-toolbar-title>
            <!-- 主页返回 图标按钮 -->
            <v-btn
              v-if="system && system.info"
              text
              icon
              :to="system.info.route.home"
              style="justify-content:normal"
              @click="menu_active = ''"
            >
              <v-icon color="orange">
                mdi-home
              </v-icon>
            </v-btn>
          </v-toolbar-title>

          <!-- <span class="subheading"></span> -->
          <v-divider class="mx-4" inset vertical />

          <v-toolbar-items v-for="item in menuInfo" :key="item.id">
            <v-menu ref="vmenu" offset-y close-on-content-click open-on-hover>
              <template #activator="{ on }">
                <v-btn
                  text
                  tile
                  :disabled="!item.can"
                  :class="{ 'v-btn--active': item.id == menu_active }"
                  v-on="on"
                >
                  <v-icon left>
                    {{ item.icon }}
                  </v-icon>
                  {{ item.desc }}
                </v-btn>
              </template>
              <v-list dense>
                <v-list-item-group :disabled="item.disabled">
                  <v-list-item
                    v-for="subItem in item.subMenu"
                    :key="subItem.id"
                    dense
                    :to="subItem.to"
                    :disabled="subItem.disabled"
                    @click="hMenuClick(item, subItem.id)"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{ subItem.desc }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>

            <v-divider inset vertical />
          </v-toolbar-items>

          <LazyRender :time="300">
            <Breadcrumbs v-if="menu_active !== 0" />
          </LazyRender>

          <v-spacer />

          <!-- 机组切换 图标按钮 -->
          <v-menu
            open-on-hover
            bottom
            :disabled="false"
            :close-on-content-click="false"
            offset-x
          >
            <template #activator="{ on }">
              <v-btn
                class="mx-0 mt-0"
                fab
                x-small
                dark
                color="white"
                v-on="on"
              >
                <v-icon color="orange">
                  mdi-fire
                </v-icon>
              </v-btn>
            <!-- <v-icon orange v-on="on">category</v-icon> -->
            <!-- </v-btn> -->
            </template>

            <!-- v-if="isLoggedIn && !isGuest" -->
            <Stations
              v-if="!isGuest"
              v-show="stationShow"
              v-model="selectedDynamos"
              @close="close"
            />
          </v-menu>
        </v-toolbar>
      </div>

      <Tips ref="Tips" />
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
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState, mapGetters } from 'vuex'

import Login from '@/components/Login/'
import Tips from '@/components/common/Tips/'
import Stations from '@/components/common/Stations'
import Breadcrumbs from '@/components/common/Breadcrumbs'

export default {
  components: {
    Login,
    Tips,
    Stations,
    Breadcrumbs
  },
  data () {
    return {
      title: 'Navbar',
      drawer: false,
      group: true,
      bg: '/img/bg/bg-2.jpg', // '/img/bg/sea-1920x1080.jpg',
      // hasLogin: false, // 判断用户是否登录 --- 根据token是否为空
      selectedDynamos: [19], // 机组选中的ID
      model_menu: 0,
      model_subMenu: -1,
      menu_active: 0,
      systemInfo: null,
      showLogin: false,
      dialogConfirm: false,

      menu: null,
      stationShow: true
    }
  },
  computed: {
    ...mapState({
      system: state => state.system,
      user: state => state.user,
      roles: state => state.roles
    }),
    ...mapGetters('user', ['isLoggedIn']),
    isGuest () {
      if (this.$store.state.user.info) {
        return this.$store.state.user.info.id === 1 // this.$store.state.user.info.id.toString().toLowerCase() === 'guest'
      }
      return false
    },
    menuInfo () {
      const self = this
      return self.menu?.info || self.menu
    }
  },
  watch: {
    // testMenu: {
    //   set(newVal){
    //     const self = this
    //     self.menu0 = self.$store.state.menu // this.$t('menuClass1') || null
    //   },
    //   get(){
    //     self.menu0 = self.$store.state.menu // this.$t('menuClass1') || null
    //     return self.menu0
    //   }
    // }

  },
  created () {
    const self = this
    const paths = self.$route.fullPath.split('/') || []

    self.hGetStateData()

    for (let i = 0, iLen = paths.length; i < iLen; i++) {
      if (paths[i] !== '') {
        self.menu_active = paths[i]
        break
      }
    }
  },
  mounted () {
    window.console.log('Navbar>index.vue => mounted() => state.menu.info = ', this.$store.state.menu.info, ' this.user = ', this.user)
  },
  methods: {
    hGetStateData () {
      const self = this
      self.menu_active = 1

      this.menu = self.$store.state.menu?.info || self.$store.state.menu // this.$t('menuClass1') || null

      window.console && window.console.log('Navbar/index.vue', this.menu)
    },
    switchUserLogin (state) {
      if (state === 'logout') { // 注销用户
        this.logout()
        this.showLogin = false
      } else {
        this.showLogin = true
      }
    },
    welcomeUser () {
      // this.showLogin = false
      // this.tips.show = true
      // this.tips.txt = '欢迎回来, ' + this.user.info.name
      debugger
      this.$refs.Tips.open('欢迎回来, ' + this.user.info.name, 5000)
    },
    closeLogin () {
      this.showLogin = false
    },
    logout () {
      window.console.log('------------- Navbar/index.vue -> .dispatch(user/LogOut) --------------')
      const self = this
      self.$store
        .dispatch('user/LogOut')
        .then(() => {
          self.dialogConfirm = false // 关闭确认注销对话框
          // Logout User Success.
          // self.tips.show = true
          // self.tips.txt = '已成功注销当前用户.'
          self.$refs.Tips.open('已成功注销当前用户.')
          self.$common.go('welcome', self) // 路由跳转
        })
        .catch((error) => {
          window.console.log('common > Navbar > ' + error.message + '[Navbar]')
        })
    },
    close () {
      this.stationShow = false
    },
    hMenuClick (item, subItemId) {
      const self = this
      self.menu_active = 0

      window.setTimeout(function () {
        self.menu_active = item.id

        self.breadcrumbsInfo = [
          {
            text: '首页',
            disabled: true,
            href: '/'
          }
        ]

        // 一级菜单
        for (const i in self.menuInfo) {
          const class1 = self.menuInfo[i] || null
          class1.active = (class1.id === item.id)
          // 二级菜单
          if (class1.active) {
            // 选择的active设置为true
            class1.subMenu.forEach((item) => {
              if (item.id === subItemId) {
                class1.subMenu.active = true
              }
            })
          } else {
            // 没有选择的active所部恢复为false
            for (const j in class1.subMenu) {
              const class2 = class1.subMenu[j] || null
              if (typeof class2 === 'object' && class2.active) {
                class2.active = false
              }
            }
          }
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.left-0{
  left: 0 !important;
}
.menu_selected{
  color: orange !important;
}

.subMenu_selected{
  color: #ffffff !important;
  opacity: 0.9 !important
}
</style>
