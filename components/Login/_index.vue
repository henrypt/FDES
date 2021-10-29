<template>
  <div class="login">
    <v-form ref="loginForm" v-model="valid">
      <v-card dense color="rgba(255, 255, 255, 0.8)">
        <v-card-title>
          <span class="headline teal--text subtitle-1">用户登录</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="username"
                  :error-messages="nameErrors"
                  label="用户名 *"
                  :counter="10"
                  required
                  autofocus
                  clearable
                  @input="$v.username.$touch()"
                  @blur="$v.username.$touch()"
                  @keyup.enter.native="submit"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  :error-messages="passwordErrors"
                  label="用户密码 *"
                  required
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  hint="至少4个字符"
                  @click:append="show1 = !show1"
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                  @keyup.enter.native="submit"
                />
              </v-col>
            </v-row>
          </v-container>
          <big class="red--text ml-3">
            * 为必填项
          </big>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn v-if="showClose" color="gray mr-4" @click="close">
            关闭
          </v-btn>
          <v-btn color="success" @click="submit">
            登录
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script type="text/ecmascript-6">
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import { encrypt } from '../../api/index.js' // 加密

export default {
  name: 'Login',
  mixins: [validationMixin],
  model: {
    prop: 'msg',
    event: 'vmodel'
  },
  props: {
    showClose: {
      default: true,
      type: [String, Boolean]
    }
  },
  validations: {
    username: { required, maxLength: maxLength(10) },
    password: { required }
  },
  data () {
    return {
      valid: null,
      username: 'henry2021',
      password: '8888',
      show1: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 4 || '至少4个字符',
        emailMatch: () => ('The email and password you entered don\'t match')
      }
    }
  },
  computed: {
    nameErrors () {
      const errors = []

      if (!this.$v.username.$dirty) { return errors }
      !this.$v.username.maxLength && errors.push('用户名最多10个字长度')
      !this.$v.username.required && errors.push('请填写用户名.')

      const u = this.$store.getters['system/hasUser'](this.username)
      if (!u) { errors.push('无此用户') }
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) { return errors }
      !this.$v.password.required && errors.push('请填写用户密码')
      return errors
    }
  },
  watch: {},
  mounted () {},
  methods: {
    submit () {
      const self = this
      self.$v.$touch()

      if (!self.$v.$error) {
        this.login({
          userId: self.username,
          password: encrypt(self.password),
          dynamoId: self.$store.getters['system/getStationInfo']().dynamo.default
        })
      }
    },
    clear () {
      // this.$v.$reset()
      this.username = ''
      this.password = ''
    },
    close () {
      // this.$router.push({path:'/'})
      // this.$router.push({path:'/'})
      this.$emit('closeLogin')
    },
    async login (params) {
      const self = this
      // this.$store.dispatch('Login', {"name":objUser.name, "pwd":objUser.pwd})
      await self.$store.dispatch('user/Login', params)
      await self.$store.dispatch('initToken')
      await self.$store.dispatch('user/loginedInState', true)

      self.close()
      // self.updateMenuPowerByState(self.$store.state)

      self.showClose && self.close()

      self.$emit('welcomeUser')
      // self.updateMenuPowerByState(self.$store.state)
      self.$router.push({ path: '/' })
    }
    // async updateMenuPowerByState (state, self) {
    //   // let roleId = -1
    //   let powers = null

    //   if (state.user.info) {
    //     const roleInfo = self.$store.getters['user/getUserRoles'] || null
    //     if (roleInfo) {
    //       powers = roleInfo // state.roles.info.find((item) => { return item.id === roleId }).powers // 用户角色ID对应的角色信息
    //       // 更新Vuext-state-menu-info xxx.can 处理菜单权限
    //       state.menu && await self.$store.dispatch('menu/UpdateMenuInfo', powers)
    //       // return self.menu?.info || self.menu
    //     }
    //   }
    // }
  }
}
</script>
