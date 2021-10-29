<template>
  <v-row justify="center">
    <v-btn id="menuYiChangShuJu" icon @click="open">
      <v-icon size="24" color="blue">
        mdi-shield-edit-outline
      </v-icon>
    </v-btn>
    <v-tooltip
      bottom
      activator="#menuYiChangShuJu"
    >
      <span v-text="title" />
    </v-tooltip>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :close-on-click="false"
      :nudge-width="250"
      max-width="250"
      offset-y
      fixed
    >
      <template #default>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card dense>
            <v-card-title>
              <v-icon size="20" color="success" class="mr-1">
                mdi-tools
              </v-icon>
              {{ title }}
            </v-card-title>
            <v-divider />
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="device"
                      label="设 备"
                      readonly
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-for="(time, index) in times"
                      :key="index"
                      :value="time.replace('\n', ' ')"
                      :label="index === 0 ? '开始时间点 *' : '结束时间点 *'"
                      required
                      dense
                      readonly
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="describe"
                      :counter="50"
                      :error-messages="describeErrors"
                      label="描述"
                      @input="$v.describe.$touch()"
                      @blur="$v.describe.$touch()"
                    />
                  </v-col>
                </v-row>
              </v-container>
              <small class="red--text ml-3">* 为必填项</small>
              <small>{{ times }}</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                :disabled="!valid"
                small
                @click="submit"
              >
                保存
              </v-btn>
              <v-btn text small @click="exit">
                取消
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </template>
    </v-menu>
  </v-row>
</template>

<script type="text/ecmascript-6">
import { validationMixin } from 'vuelidate'
import { maxLength } from 'vuelidate/lib/validators'
import WatchJS from 'melanke-watchjs'

export default {
  mixins: [validationMixin],
  validations: {
    describe: { maxLength: maxLength(50) }
  },
  data () {
    return {
      title: '异常数据设置',
      valid: true,
      menu: false,
      items: null,
      device: 'N1', // 设备名称
      describe: '', // 描述
      describeRules: [
        v => v.length <= 50 || '描述内容必须少于50字'
      ],
      times: null
    }
  },
  computed: {
    describeErrors () {
      const errors = []
      if (!this.$v.describe.$dirty) { return errors }
      !this.$v.describe.maxLength && errors.push('不多于50个字！')
      return errors
    }
  },
  mounted () {
    const self = this
    if (WatchJS) {
      WatchJS.watch(window.chart, 'selectNodes', function (d) {
        self.selectItems()
        self.times = window.chart.arrTimes.map(a => a.time)
      })
    }
    self.items = this.selectItems()
  },
  methods: {
    open () {
      this.menu = true
      window.chart.type = 'YiChangShuJu'

      this.closeOthers()

      this.selectItems()
      this.times = window.chart.arrTimes.map(a => a.time)
    },
    submit () {
      const self = this
      self.$v.$touch()

      if (!self.$v.$error) {
        self.$parent.$parent.$parent.$parent.$refs.Tips.open('保存成功')

        self.sketch = ''
        self.describe = ''
        self.times = []

        self.exit()
      }
    },
    exit () {
      if (this.$parent.$parent.$parent.$parent.$refs.chart) {
        this.$parent.$parent.$parent.$parent.$refs.chart.clearMarkLines()
      }
      this.menu = false
    },
    selectItems () {
      // 图控件上选择的点的时间信息
      const self = this
      self.items = null
      self.items = window.chart.selectNodes || null

      if (self.items) {
        self.items = self.items.map(item => item.value.name)
        self.items = new Array(self.timeSelect)
      }
      return self.items
    },
    // 关闭其他打开的对话框
    closeOthers () {
      const $refs = this.$parent.$parent.$parent.$parent.$refs
      if ($refs) {
        $refs.ZhuangTaiBiJiao && $refs.ZhuangTaiBiJiao.exit()
        $refs.GongKuangBiaoZhu && $refs.GongKuangBiaoZhu.exit()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
small{
  color: red;
  font-weight: bold;
}
.v-card__text{
  padding: 10px;
  .container{
    padding: 0;
    .row, .col{
      padding: 0;
      margin: 0;
    }
  }
}
</style>
