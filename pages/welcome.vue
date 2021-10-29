<!-- page info:  -->
<template>
  <div id="welcome">
    <v-row justify-center class="px-sm-1 px-md-10 px-lg-10">
      <v-col cols="6" sm="12" md="5" lg="5">
        <FaultStatistics />
      </v-col>
      <v-col cols="6" sm="12" md="5" lg="5">
        <Login ref="loginComponent" :show-close="false" @welcomeGo="welcomeGo" @loginError="loginError" />
      </v-col>
    </v-row>
    <Tips ref="Tips" />
  </div>
</template>

<script>
import Tips from '@/components/common/Tips/'
import Login from '~/components/Login/'
import FaultStatistics from '~/components/common/Chart/FaultStatistics'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { Login, FaultStatistics, Tips },
  layout: 'welcome',
  data () {
    // 这里存放数据
    return {
      title: 'FDES Welcome Page',
      b: [0, 1]
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // store.getters.user.isLoggedIn
    // const self = this
    // const isLoggedIn = self.$store.getters['user/isLoggedIn'] || false
    // self.$store.dispatch('user/loginedInState', !!isLoggedIn)

    // this.hGetStateData()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // mounted
  },
  // 方法集合
  methods: {
    loginError (text) {
      this.$refs.Tips.open(text)
    },
    welcomeGo () {
      this.$common.go('home', this) // 路由跳转
    }
  }
}
</script>

<style lang="scss" scoped></style>
