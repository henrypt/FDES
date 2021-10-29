<template>
  <div class="page">
    <button @click="ab=!ab">
      切换AB
    </button>
    <div class="title">
      {{ title }}
    </div>
    <component :is="currentComponent" />
  </div>
</template>
<script>
import Component1 from './component1.vue'
import Component2 from './component2.vue'

export default {
  layout: 'test',
  data () {
    return {
      ab: true
    }
  },
  computed: {
    title () {
      return this.ab ? 'title1' : 'title2'
    },
    currentComponent () {
      return this.ab ? Component1 : Component2
    }
  }
}
</script>
