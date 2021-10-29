<template>
  <div class="page">
    <v-select
      v-if="roles"
      v-model="selected"
      :items="selectRoles"
      item-color="primary"
      label="角色 *"
      dense
      hide-details
      persistent-hint
      required
      :error-messages="rolesErrors"
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
  name: 'Roles',
  components: {

  },
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
      default: (r) => {
        return r
      },
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
      selected: null,
      roles: [],
      selectRoles: []
    }
  },
  computed: {
    rolesErrors () {
      const errors = []
      if (!this.$v.selected.$dirty) { return errors }
      !this.$v.selected.required && errors.push('请选择角色.')
      return errors
    }
  },
  watch: {
    async selected (val, oldVal) {
      const self = this
      if (self.selected && !self.loading) {
        if (self.userid === -1) {
          // 添加用户时用
          self.$emit('vModel', self.selected)
        } else if (self.userid && self.msg) {
          debugger
          const params = {
            key: 'users/roles',
            info: {
              popedomId: self.roles.filter(item => item.Text === val).map((item) => { return item.PopedomId }),
              dynamos: self.user.dynamos.map((item) => { return item.dynamoId })
            },
            user: self.user
          }
          const r = await self.$store.dispatch(
            'users/UpdateUsersInfo',
            params
          )

          // 更新完毕后，重新读取用户的机组和角色
          self.$emit('UpdateTips', r?.code === 200 ? 1 : 0) // 1 更新成功,  0 更新失败
        }
      }
    }
  },
  mounted () {
    const self = this
    const system = this.$store.state.system
    // 系统有的角色
    self.roles = system.info.roles
    self.selectRoles = self.roles.map((role) => {
      return role.Descr
    })

    // 注意：
    // 新系统不在用机组-角色的一一对应关系设置（后台仍然一一对应）
    // 新系统使用一个用户对应一个角色，比如：用户1 - VIP用户
    // 用户的角色
    if (self.msg && self.msg.length > 0) {
      const result = self.msg.find(item => item.descr)
      self.selected = result?.descr
    }

    // if (self.msg && self.msg.length > 0) {
    //   self.selected = self.msg[0].value
    // } else if (self.roles.length > 0) {
    //   self.selected = self.roles[0].value
    // }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped></style>
