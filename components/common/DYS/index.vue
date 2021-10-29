<template>
  <div class="page">
    <v-select
      v-if="items"
      v-model="selected"
      :items="items"
      item-color="primary"
      label="机组 *"
      multiple
      dense
      small-chips
      hide-details
      persistent-hint
      required
      :error-messages="dynamosErrors"
      @input="$v.selected.$touch()"
      @blur="$v.selected.$touch()"
      @keyup.enter.native="$emit('save')"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'DYS',
  components: {},
  mixins: [validationMixin],
  validations: {
    selected: { required }
  },
  model: {
    prop: 'msg',
    event: 'vModel'
  },
  props: { // ['msg','userid'],
    msg: {
      type: undefined,
      default: (r) => { return r },
      required: false
    },
    userid: {
      type: [Number, String],
      default: -1,
      required: false
    },
    user: {
      type: undefined,
      default: (r) => { return r },
      required: true
    },
    loading: {
      type: [Boolean, String],
      default: true,
      required: true
    }
  },
  data () {
    return {
      selected: [],
      items: [], // ['D1','D2','D3','D4','L1','L2','L3','L4'],
      arr: []
    }
  },
  computed: {
    dynamosErrors () {
      const errors = []
      if (!this.$v.selected.$dirty) { return errors }
      !this.$v.selected.required && errors.push('请选择机组.')
      return errors
    }
  },
  watch: {
    async selected (val, oldVal) {
      const self = this

      if (self.selected && !self.loading) {
        if (self.userid === -1) { // 添加用户时用
          self.$emit('vModel', self.selected)
        } else if (self.userid && self.msg) {
          const params = {
            key: 'users/dys',
            info: { val, oldVal },
            user: self.user
          }

          if (self.user) {
            const r = await self.$store.dispatch('users/UpdateUsersInfo', params)

            // 更新完毕后，重新读取用户的机组和角色
            self.$emit('UpdateTips', r?.code === 200 ? 1 : 0) // 1 更新成功,  0 更新失败
          }
        }
      }
    }
  },
  mounted () {
    const self = this
    const system = this.$store.state.system
    const station = system.info.stations // .items

    // 系统拥有的机组
    station.forEach((item) => {
      item.children.forEach((child) => {
        self.items.push({
          text: child.ShortNM,
          value: parseInt(child._ID, 10) // child.id
        })
      })
    })

    // 用户拥有的机组
    if (self.msg && this.msg.length > 0) {
      // const userDynamoIds = self.msg.map(item => parseInt(item.id, 10)) || []
      // self.selected = userDynamoIds
      self.selected = []
      self.msg.forEach((item) => {
        item?.dynamoId && self.selected.push(parseInt(item.dynamoId, 10))
      })
    }
  },
  methods: {
    async updateSelect () { }
  }
}
</script>

<style lang="scss" scoped>
div {
  padding: 0;
}
</style>
