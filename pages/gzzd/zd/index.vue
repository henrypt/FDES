<!-- page info:  -->
<template>
  <v-container fluid class="page_zd">
    <v-row align="left">
      <v-col class="d-flex" cols="12" sm="2" md="2">
        <sbyc-types />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import sbycTypes from './plugins/sbyc_types'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { sbycTypes },
  data () {
    // 这里存放数据
    return {
      title: ''
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // created
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // mounted
  },
  // 方法集合
  methods: {
    // methods
  }
  // beforeCreate () {}, // 生命周期 - 创建之前
  // beforeMount () {}, // 生命周期 - 挂载之前
  // beforeUpdate () {}, // 生命周期 - 更新之前
  // updated () {}, // 生命周期 - 更新之后
  // beforeDestroy () {}, // 生命周期 - 销毁之前
  // destroyed () {}, // 生命周期 - 销毁完成
  // activated () {}, // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="scss" scoped>
.page_zd{
  border-bottom: solid 1px #eeeeee;
  padding: 0;
}
</style>
