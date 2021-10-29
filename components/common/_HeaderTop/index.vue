<template>
  <div class="HeaderTop">
    <v-toolbar light-blue fixed color="primary">
      <v-app-bar-nav-icon>
        <v-img src="/v.png" srcset="/v.png 1x, /v.png 2x" />
      </v-app-bar-nav-icon>
      <v-toolbar-title class="white--text hidden-sm-and-down">
        {{ logo_text }}
      </v-toolbar-title>

      <v-spacer />

      <!-- 主菜单 -->
      <v-toolbar-items
        v-if="isShow"
        floating
        :active.sync="topMenu"
        :value="true"
      >
        <v-btn
          v-for="(item, i) in menuInfo"
          :key="i"
          class="topMenuBtn"
          :input-value="topMenu == item.id"
          small
          flat
          dark
          @click.stop="handleClick(item, item.active)"
        >
          <span>{{ item.desc }}</span>
        </v-btn>
      </v-toolbar-items>

      <div>
        <v-menu offset-y :close-on-content-click="false">
          <template #activator="{ on }">
            <v-avatar size="30" class="pb-3" v-on="on">
              <img
                src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                alt="avatar"
              >
            </v-avatar>
          </template>
          <v-list v-if="menuClass3" dense two-line subheader>
            <v-list-tile
              v-for="(item, index) in menuClass3"
              :key="index"
              avatar
              @click.stop="go(item)"
            >
              <v-list-tile-avatar>
                <v-icon color="primary" :class="[item.iconClass]">
                  {{
                    item.icon
                  }}
                </v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content v-text="item.name" />
              <!--
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
              -->
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
    </v-toolbar>

    <!-- dynamic component -->
    <component
      :is="currentComponent"
      v-if="isShowDialog"
      @closeDialog="closeDialog"
    />
  </div>
</template>
<script type="text/ecmascript-6">

export default {
  name: 'HeaderTop',
  components: {},
  props: {
    title: {
      type: String,
      default: '',
      required: false
    }
  },
  data: () => ({
    topMenu: 'ZhuangTaiJianCe',
    logo_text: '',
    // logoImg: '/v.png',
    reload: true,
    lang: null,
    languageInfo: [],
    current_flag: '',
    current_locale: 'cn',
    isShow: true,

    isShowDialog: false,

    currentComponent: ''

  }),
  computed: {
    // get language, menuClass Info from Vuex->state
    menuInfo () {
      return this.$t('menuClass1.data')
    },
    menuClass3 () {
      return this.$t('menuClass3.data')
    }
  },
  watch: {
    $route (to, from) {
      const path = to.path
      const arrRouteParams = path.match(/\b\w+\b/g)
      const t1 = arrRouteParams[0]
      // let t2 = arrRouteParams[1]
      this.topMenu = t1
    }
  },
  created () {
    this.lang = global.localStorage.getItem(this.$store.state.i18n.info.localStorageName) || this.$store.state.i18n.locale
    // this.lang =  cookie({'name':'site_language', 'is_json':false})
    // get menuClass1 json data by Vuex->actions
    // this.$store.dispatch('getMenuClass1')
    // this.$store.dispatch('getMenuClass2')
  },
  mounted () {
    // this.$store.dispatch('getCategories', this.language)
    const t = this.$t('message') || null
    if (t) {
      this.logo_text = t.logo_text
    }
  },
  methods: {
    // 一级菜单 点击事件
    handleClick (item, active) {
      if (!!item.id && !!active) {
        this.reload = false
        this.topMenu = item.id

        const type = item.id // this.$route.meta.carouselType

        this.$store.dispatch('setMenuClass1', { key: 'current', val: type })

        this.$router.replace({ path: item.to })
        this.$nextTick(() => {
          this.reload = true
        })
      }
    },

    requireImg (url) {
      if (url) {
        return require(`./images/${url}.svg`)
      }
    },

    go (item) {
      if (item) {
        // Mine --- User Center
        if (item.to === 'mine') {
          this.$router.push({ path: `/${item.to}` })
          return
        }

        // switch dynamic component
        this.currentComponent = item.to
        this.isShowDialog = true
      }
    },

    closeMenu (t) {

    },
    closeDialog () {
      this.isShowDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.topMenuBtn{
  padding: 0 !important;
  font-size: 0.13rem;
}

.wrapper-padding-2 .container-fluid{
  padding: 0 50px;
}

.header-sticky-3{
  left: 0;
  padding: 15px 0 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: all 0.5s ease 0s;
  z-index: 99999;
}

.wrapper-padding-2 .container-fluid{
  padding: 0 50px;
}

.movie-header{
  padding: 0px;
}
.movie-header .menu-style-2 nav > ul > li > a{
  color: #1c3f95;
}
.movie-header .menu-style-2 nav > ul > li > a.active{
  color: #f78f1e;
}

.menu_login{
  padding-top: 0.15rem !important;
}

.v-menu__content{
  .v-avatar .v-icon{
    align-items: flex-end;
    justify-content: end;
  }
}

.v-toolbar__title{
  width: 0.85rem;
  height: 0.85rem;
  line-height: 0.85rem;
  margin: 0;
}

/* large desktop :1366px. */
@media (min-width: 1200px){
  header{
    min-height: 100px;
  }
  .movie-header .menu-style-2 nav > ul > li > a{
    font-size: 30px;
  }
  .movie-header .menu-style-2 nav > ul > li > a:active{
    color: #ffc107
  }
  .movie-header .menu-style-2 nav > ul > li > a:hover{
    color: #ffc107
  }

  .topMenuBtn{
    padding: 0 0.3rem !important;
    font-size: 0.16rem;
  }
  .v-toolbar__title{
    height: 0.64rem;
    line-height: 0.67rem;
    margin: 0 0.1rem;
    .current_flag{
      height: 0.25rem !important;
      width: 0.25rem !important;
    }
  }
}

/* Normal desktop :992px. */
@media (min-width: 992px) and (max-width: 1200px){
  .v-toolbar__title{
    width: 0.64rem;
    height: 0.64rem;
    line-height: 0.64rem;
    .current_flag{
      height: 0.25rem !important;
      width: 0.25rem !important;
    }
  }
}

/* Tablet desktop :768px. */
@media (min-width: 768px) and (max-width: 991px){
  .topMenuBtn{
    font-size: 0.14rem !important;
  }
  .v-toolbar__title{
    width: 0.55rem;
    height: 0.55rem;
    line-height: 0.55rem;
    .v-avatar{
      width: 0.4rem;
      height: 0.39rem;
      line-height: 1.1rem;
    }
    .current_flag{
      height: 0.3rem !important;
      width: 0.3rem !important;
    }
  }
  .v-menu__content{
    .v-avatar{
      width: 0.4rem !important;
      height: 0.5rem !important;
    }
  }
  .v-list__tile{
    padding: 0 0.1rem !important;
    .list__tile__avatar{
      min-width: 0.65rem !important;
    }
  }
}

/* small mobile :320px. */
@media (max-width: 767px){
  .topMenuBtn{
    font-size: 0.22rem !important;
  }
  .v-toolbar__title{
    .v-avatar{
      width: 0.4rem !important;
      height: 0.39rem !important;
      line-height: 1.1rem;
    }
  }
  .v-menu__content{
    .v-avatar{
      width: 0.4rem !important;
      height: 0.4rem !important;
    }
  }
  .v-list__tile{
    padding: 0 0.1rem !important;
  }
  .v-list__tile__avatar{
    min-width: 0.65rem !important;
  }
}
</style>
