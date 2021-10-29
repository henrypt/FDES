<template>
  <v-breadcrumbs
    v-if="breadcrumbsInfo.length > 1"
    :items="breadcrumbsInfo"
    divider="/"
  />
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Breadcrumbs',
  data () {
    return {
      menu: null,
      breadcrumbsInfo: []
    }
  },
  computed: {
    menuInfo () {
      const self = this
      return self.menu?.info || self.menu
    }
  },
  created () {
    const self = this
    self.menu = self.$store.state.menu?.info || self.$store.state.menu
  },
  mounted () {
    const self = this
    const paths = self.$route.fullPath.split('/') || []
    const { home } = self.$store.state.system.info.route

    for (let i = 0, iLen = paths.length; i < iLen; i++) {
      if (paths[i] === '') {
        self.breadcrumbsInfo = [{
          text: '首页',
          href: home,
          disabled: true
        }]
      } else if (self.menuInfo) {
        // 一级菜单
        for (let j = 0, jLen = self.menuInfo.length; j < jLen; j++) {
          const class1 = self.menuInfo[j] || null

          if (class1.to.includes('/' + paths[i])) {
            self.setBreadcrumbs(class1, iLen)
            if (typeof paths[i + 1] === 'undefined' && paths.length > 1 && class1.subMenu.length > 0) {
              self.setBreadcrumbs(class1.subMenu[0], 1)
            } else {
              // 二级菜单
              class1.subMenu.forEach((item) => {
                if (item.to.includes('/' + paths[i + 1])) {
                  self.setBreadcrumbs(item, iLen)
                }
              })
            }
            break
          }
        }
      }
    }
  },
  methods: {
    setBreadcrumbs (item, pathsLen) {
      const self = this
      if (item && pathsLen) {
        const len = self.breadcrumbsInfo.length || 1

        self.breadcrumbsInfo.push({
          disabled: false,
          href: (len < pathsLen - 1) ? '..' + item.to : '',
          text: item.desc
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
>>> div.v-breadcrumbs__item{
  color: rgba(255, 255, 255, 0.9);
}
</style>
