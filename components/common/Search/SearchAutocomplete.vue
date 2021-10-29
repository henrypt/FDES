<template>
  <div class="search">
    <v-autocomplete
      v-model="val"
      :items="items"
      :loading="isLoading"
      dense
      light
      clearable
      hide-details
      single-line
      item-text="name"
      item-value="name"
      no-data-text="请输入搜索内容"
      prepend-icon="mdi-magnify"
      class="caption"
      color="info"
      :counter="counter"
      :hide-no-data="true"
      :label="txt"
      :placeholder="txt"
      @input="inputChange"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchAutocomplete',
  model: {
    // 定义model
    prop: 'value', // 绑定prop传递的值
    event: 'input' // 定义触发事件名称
  },
  props: {
    // 接受父组件传递的值
    value: {
      type: String,
      default: '',
      required: true
    },
    txt: {
      type: String,
      default: 'Search',
      required: false
    },
    entries: {
      type: [Array, Object],
      default: null,
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
      val: this.value, // 关联值
      isLoading: false
    }
  },
  computed: {
    items () {
      if (this.entries) {
        return this.entries
      } else {
        return []
      }
    }
  },
  methods: {
    inputChange () {
      const val = this.val || ''
      // 通过$emit触发input（model内定义）事件，将内部值传递给给父组件
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.search{
  >>> .v-input__control{
    height: 0.65rem;
  }
  >>> .v-input__icon{
    .v-icon{
      font-size: 18px !important;
      color: green;
    }
  }
}

.search{
  >>> .v-label{
    font-size: 14px !important;
  }
}

@media (min-width: 1200.00001px){
  .search >>> .v-input__control{
    height: 0.5rem;
  }
}
</style>
