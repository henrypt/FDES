<template id="FooterBottom">
  <!-- 底部菜单 -->
  <v-bottom-nav
    v-if="onlyMainContentShow"
    ref="MenuBottom"
    class="hidden-md-and-up"
    height="56"
    :active.sync="bottomNav"
    :value="true"
    color="indigo lighten-1"
    light
    flat
    fixed
  >
    >
    <v-btn
      v-for="(item, i) in navItems"
      :key="i"
      color="warning"
      :value="item.val"
      flat
      @click="btnNavClick(`${item.val}`)"
    >
      <span>{{ item.name }}</span>
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
// import { VApp, VBtn, VChip } from 'vuetify/lib'

export default {
  name: 'FooterBottom',
  components: {
    // VApp,
    // VBtn,
    // VChip
  },
  data () {
    return {
      isButton: false,
      bottomNav: 'home'
      // navItems: [
      //   { "name": "首页", "val":"home", "to":"home", "icon":"home" },
      //   { "name": "我的", "val":"mine", "to":"mine", "icon":"perm_identity" },
      //   { "name": "返回", "val":"back", "to":"back", "icon":"undo" }
      // ]
    }
  },
  computed: {
    onlyMainContentShow () {
      return !this.$route.meta.onlyMainContentShow
    },
    navItems () {
      return this.$t('menuClass2.data')
    }
  },

  methods: {
    // 通过编程式导航实现路由的切换显示($router)
    goto (path) {
      this.$router.replace(path)
    },
    // 通过动态class和$route.path来实现tab样式切换
    isCurrent (path) {
      // (this.$route.path)
      return this.$route.path === path
    },
    // 底部菜单
    btnNavClick (routeName) {
      if (routeName === 'home') {
        this.$router.push({ path: '/' })
      }
      if (routeName === 'back') {
        this.$router.back(-1)
      } else {
        this.$router.push({ path: `/${routeName}` })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
