<template>
  <div class="welcomLogin">
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
import { encrypt, reqUsers } from '@/api/index.js' // 加密

export default {
  name: 'Login',
  components: { },
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
    username: { required, maxLength: maxLength(20) },
    password: { required }
  },
  data () {
    return {
      valid: null,
      username: 'dyw_henry',
      password: '8888',
      users: null,
      show1: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 4 || '至少4个字符',
        emailMatch: () => ('The email and password you entered don\'t match')
      },
      timer: null
    }
  },
  computed: {
    nameErrors () {
      const errors = []

      if (!this.$v.username.$dirty) { return errors }
      !this.$v.username.maxLength && errors.push('用户名最多20个字长度')
      !this.$v.username.required && errors.push('请填写用户名.')

      const r = this.hasUser()
      if (!r) {
        errors.push('无此用户')
      }

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
  async created () {
    const r = await reqUsers()
    this.users = (r.code === 200) ? r.data : null
  },
  mounted () {},
  methods: {
    submit () {
      const self = this
      const stationInfo = self.$store.getters['system/getStationInfo']()
      self.$v.$touch()
      if (!self.$v.$error) {
        this.welcomeLogin({
          userId: self.username,
          pwd: encrypt(self.password),
          dynamoId: stationInfo?.dynamo
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
    async welcomeLogin (params) {
      const self = this
      const loginResult = await self.$store.dispatch('user/Login', params)
      if (loginResult?.code !== 200) {
        self.$emit('loginError', loginResult.data)
        return null
      } else if (loginResult) {
        // await self.$store.dispatch('initToken')
        const system = self.$store.getters['system/getStationInfo']() || []
        const r = await self.$store.dispatch('token/InitToken', {
          loginInfo: params,
          userInfo: loginResult.data,
          dTypes: system.types.ids
        })

        // reset session: token, menu
        const sessionKey = self.$store.state.system.info.sname
        self.$common.resetSession('menu', sessionKey, null)
        self.$common.resetSession('token', sessionKey, r)

        window.console.log('welcomeLogin > token/InitToken & resetSession/token')

        self.timer && window.clearTimeout(self.timer)
        self.timer = window.setTimeout(() => {
          self.$common.resetSession('token', sessionKey, r)
          window.console.log('--------------', JSON.parse(window.sessionStorage.getItem('FDES')).token, '--------------')
          window.console.log('--------------', self.$store.state.token, '--------------')
        }, 3 * 1000)

        self.$emit('welcomeGo')
        self.close()
        // 同步登录成功后，系统其他功能模块的信息
      }
    },
    // async updateMenuPowerByState (state, self) {
    //   const self = this
    //   // let roleId = -1
    //   // let powers = null

    //   // STATION_INFO.dynamo.default
    //   window.console && window.console.log('components\\Login\\index.vue', state.user.info.user.name)

    //   if (state.user.info) {
    //     // roleId = state.user.info.roles[dy] // .value // 用户角色ID
    //     // powers = state.roles.info.find((item) => { return item.id === roleId }).powers // 用户角色ID对应的角色信息
    //     const _staion = self.$store.getters['system/getStationInfo']()
    //     // window.console && window.console.log(state.user.info.roles, _staion.dynamo.default)

    //     // 更新Vuext-state-menu-info xxx.can 处理菜单权限
    //     state.menu && await self.$store.dispatch(
    //       'menu/UpdateMenuInfo',
    //       state.user.info.roles[_staion.dynamo.default]
    //     )
    //     // return self.menu

    //     self.showClose && self.close()

    //     self.$emit('welcomeUser')
    //     self.$common.go('home', self) // 路由跳转
    //   }
    // },
    tipOpen (txt, time) {
      const self = this
      if (txt) {
        self.tip.text = txt
      }
      if (time) {
        self.tip.showTime = time
      }
      self.tip.snackbar = true
    },
    hasUser () {
      if (this.users) {
        window.console.log('components/Login/index.vue => this?.users?.Record = ', this?.users?.Record)
        return this?.users?.Record.map(user => user.Usernm).includes(this.username)
      }
      return false
    }
  }
}
</script>
