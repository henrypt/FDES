<template>
  <div class="page" />
</template>

<script type="text/ecmascript-6">
export default {
  components: {

  },
  data () {
    return {

    }
  },
  mounted () {
    this.hDefaultTo()
  },
  methods: {
    hDefaultTo () {
      const self = this
      let current = null

      const menuInfo = self?.$store?.state?.menu?.info || self?.$store?.state?.menu || null

      if (menuInfo) {
        current = menuInfo.find((item) => {
          window.console.log(item.to, this.$route.path)
          return item.to === self.$route.path
        })

        if (current) {
          if (current?.defaultTo) {
            self.$router.push(current.defaultTo) // 页面加载时跳转
          } else {
            self.$router.push(current.subMenu[0].to) // 页面加载时跳转
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
