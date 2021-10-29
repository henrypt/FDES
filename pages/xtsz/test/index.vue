<template>
  <div class="page_test">
    {{ title }}
    <input id="T1" ref="T1" type="button" text="T" value="T">
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
const vm = {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      title: 'Test Page'
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // mounted
    // created
    document.getElementById('T1').onclick = function () {
      alert('e1')
    }
  },
  // 方法集合
  methods: {
    T1 () {
      alert('vue T1')
    }
  }
}

// function T1() {
//   alert(37)
// }
export default vm
</script>
<style lang="scss" scoped></style>
