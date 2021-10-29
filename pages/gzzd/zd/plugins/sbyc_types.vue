<template>
  <div>
    <v-select
      dense
      :items="items"
      :item-disabled="itemDisabled"
      item-text="text"
      item-value="value"
      label="种类"
      :value="selectValue"
    />
  </div>
</template>

<script>
export default {
  model: {
    prop: 'msg',
    event: 'vModel'
  },
  props: {
    msg: {
      type: String,
      default: '',
      required: false
    },
    title: {
      type: String,
      default: '',
      required: false
    },
    labelText: {
      type: String,
      default: '',
      required: false
    }
  },
  data () {
    return {
      modal: false,
      items: [
        { value: -1, text: '全部' },
        { value: 0, text: '待处理' },
        { value: 3, text: '已结束' },
        { value: 2, text: '已忽略' }
      ],
      selectValue: -1,
      itemDisabled: []
    }
  },
  created () {},
  mounted () {},
  methods: {
    DateChange () {
      const self = this
      const d = self.date
      window.console.log('Datepicker => ', d)
      self.$emit('vModel', d)
      self.modal = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
