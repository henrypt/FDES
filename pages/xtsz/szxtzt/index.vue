<template>
  <v-container>
    <!-- <v-row justify="space-around" dense class="float-right">
    </v-row> -->
    <v-row justify="space-around">
      <v-card
        elevation="5"
        class="mx-auto mx-12 my-12 pa-5"
      >
        <v-card-text class="text-right my-0 px-0 py-0">
          <!-- 机组切换 图标按钮 -->
          <v-menu
            open-on-hover
            :disabled="false"
            :close-on-content-click="false"
            offset-y
          >
            <template #activator="{ on }">
              <v-btn
                class="mx-0 mt-0"
                fab
                x-small
                dark
                color="white"
                v-on="on"
              >
                <v-icon color="orange">
                  mdi-fire
                </v-icon>
              </v-btn>
            </template>

            <!-- v-if="isLoggedIn && !isGuest" -->
            <Stations
              v-show="stationShow"
              v-model="selectedDynamoId"
              @close="close"
            />
          </v-menu>
        </v-card-text>
        <!-- <v-card-title>{{ dynamoName }}{{ title }}</v-card-title> -->
        <v-divider class="mx-1 my-4" />

        <v-card-text class="my-0">
          <v-row class="justify-center text-h5">
            {{ dynamoName }}系统当前运行状态：
            <v-chip
              label
              small
              class="mx-2"
              color="info"
              text-color="white"
            >
              {{ status }}
            </v-chip>
          </v-row>
          <!-- <v-row>
            发电机监测诊断专家系统的运行状态将转为：{{ state2 }}
          </v-row> -->
        </v-card-text>

        <v-divider class="mx-1 my-4" />
        <v-card-actions right>
          <v-spacer />
          <v-btn color="primary" small @click.stop="dialog = true">
            转换
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <!-- <v-card-title>
          {{ dynamoName }}{{ title }}
        </v-card-title> -->
        <v-card-text>
          <v-card-text>
            <v-text-field
              v-model="pwd"
              :rules="[rules.required, rules.number,rules.counter, rules.same]"
              hide-details="auto"
              clearable
              label="请输入密码"
              :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPwd ? 'text' : 'password'"
              @click:append="showPwd = !showPwd"
              @click:clear="pwd=''"
            />
          </v-card-text>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" small :disabled="pwdChange" @click.prevent="tranform">
            确定
          </v-btn>
          <v-btn text small @click="dialog = false">
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <Tips ref="Tips" />
  </v-container>
</template>

<script>
import { dynamoStatus } from '@/api/'
import Stations from '@/components/common/Stations'
import Tips from '@/components/common/Tips/'

export default {
  components: {
    Stations,
    Tips
  },
  data () {
    return {
      title: '设置系统状态', // 设置系统状态
      selectedDynamoId: [19], // 机组选中的ID
      stationShow: true,
      // status: '', // 0 '运行',  1 '停机'
      faultCount: 0,
      showPwd: false,
      dialog: false, // 转换弹出对话窗口
      userPwd: null,
      pwd: '',
      rules: {
        required: value => !!value || '必需填写秘密',
        counter: value => value?.length <= 20 || '最多20个字符',
        number: (value) => {
          const pattern = /^\d+$|^\d+[.]?\d+$/
          return pattern.test(value) || '只能输入数字'
        },
        same: (value) => {
          return (value === this.userPwd) ? true : '密码不正确'
        }
      }

    }
  },
  computed: {
    isGuest () {
      if (this.$store?.state?.user?.info) {
        return this.$store.state.user.info?.id === 1 // this.$store.state.user.info.id.toString().toLowerCase() === 'guest'
      }
      return false
    },
    pwdChange () {
      return this.pwd?.toString() !== this.userPwd
    },
    dynamoName () {
      return this.$store.getters['user/getUserDynamoStatus'](this.selectedDynamoId[0])?.dynamoName
    },
    status () {
      const role = this.$store.getters['user/getUserDynamoStatus'](this.selectedDynamoId[0])
      return (role?.dynamoStatus || 0) === '0' ? '运行' : '停机'
    }
  },
  mounted () {
    this.userPwd = this.$store.getters['user/getUserPassword']()
  },
  methods: {
    async tranform () {
      const self = this
      // CanMngSys 您没有转换的权限
      if (window.confirm('现有' + this.faultCount + '个需要转交的故障，如转换发电机状态系统会自动转交这些故障，是否继续？')) {
        const params = {
          crud: 'update',
          dynamoId: self.selectedDynamoId.join(),
          dynamoStatus: self.dynamoStatus?.toString() === '运行' ? '1' : '0'
        }

        const r = await dynamoStatus(params)
        self.$refs.Tips.UpdateTips(r.code === 200 ? 1 : 0)
        self.dialog = false
      }
    },
    close () {
      this.stationShow = false
    }
  }

}
</script>
