<template>
  <div class="search">
    <v-text-field
      v-model="val"
      class="caption"
      light
      dense
      clearable
      hide-details
      :counter="counter"
      :label="txt"
      :prepend-inner-icon="search.prependIcon"
      solo-inverted
      color="info"
      :full-width="true"
      @input="inputChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Search',
  model: {
    // 定义model
    prop: 'value', // 绑定prop传递的值
    event: 'input' // 定义触发事件名称
  },
  props: {
    // 接受父组件传递的值
    value: {
      type: undefined,
      default: (r) => {
        return r
      },
      required: false
    },
    txt: {
      type: String,
      default: 'Search',
      required: false
    },
    counter: {
      type: [String, Number],
      default: 20,
      required: false
    }
  },
  data () {
    return {
      search: {
        label: 'search',
        appendIcon: 'mdi-magnify',
        prependIcon: 'mdi-magnify'
      },
      val: this.value // 关联值
    }
  },
  methods: {
    inputChange () {
      // 通过$emit触发input（model内定义）事件，将内部值传递给给父组件
      this.$emit('input', this.val)
    }
  }
}
</script>

<style lang="scss" scoped>
.search{
  width: 100% !important;
  >>> .v-input__control{
    height: 0.65rem;
  }
  >>> .v-input__icon{
    .v-icon{
      font-size: 18px !important;
      color: green;
    }
    .info--text{
      color: green !important;
    }
  }
}
.search{
  >>> .v-label{
    font-size: 14px !important;
  }
}
>>> .v-input--is-focused{
  .v-input__slot{
    background-color: rgba(0, 0, 0, 0.06) !important;
    height: 0.65rem;
    input{
      color: #000000 !important;
    }
  }
}

@media (min-width: 1200.00001px){
  .search >>> .v-input__control{
    height: 0.5rem;
  }
}
</style>
