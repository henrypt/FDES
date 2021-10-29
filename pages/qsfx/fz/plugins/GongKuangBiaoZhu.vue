<template>
  <v-row justify="center">
    <v-btn id="menuGongKuangBiaoZhu" icon @click="open">
      <v-icon size="24" color="blue">
        mdi-tag-heart
      </v-icon>
    </v-btn>
    <v-tooltip
      bottom
      activator="#menuGongKuangBiaoZhu"
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
      <template #fefault>
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
                    <v-select
                      v-if="items"
                      v-model="timeSelect"
                      :items="items"
                      :error-messages="selectErrors"
                      label="时间点 *"
                      required
                      dense
                      :full-width="true"
                      :loading="!items"
                      no-data-text=""
                      @change="$v.timeSelect.$touch()"
                      @blur="$v.timeSelect.$touch()"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="name"
                      :counter="20"
                      :error-messages="nameErrors"
                      label="名称 *"
                      placeholder="请输入"
                      required
                      @input="$v.name.$touch()"
                      @blur="$v.name.$touch()"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="detail"
                      :counter="50"
                      :error-messages="detailErrors"
                      label="描述"
                      @input="$v.detail.$touch()"
                      @blur="$v.detail.$touch()"
                    />
                  </v-col>
                </v-row>
              </v-container>
              <small class="red--text ml-3">* 为必填项</small>
              <small>{{ items }}</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" :disabled="!valid" small @click="submit">
                保存
              </v-btn>
              <v-btn text small @click="exit">
                取消
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </template>
      <!-- </v-dialog> -->
    </v-menu>
  </v-row>
</template>

<script type="text/ecmascript-6">
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import WatchJS from 'melanke-watchjs'

export default {
  mixins: [validationMixin],
  validations: {
    timeSelect: { required },
    name: { required, maxLength: maxLength(20) },
    detail: { maxLength: maxLength(50) }
  },
  data () {
    return {
      title: '工况标注设置',
      valid: true,
      dialog: false,
      menu: false,
      items: null,
      device: 'N1', // 设备名称
      timeSelect: null, // 时间点选择
      name: '', // 简述
      detail: '', // 描述
      detailRules: [
        v => v.length <= 50 || '描述内容必须少于50字'
      ]
    }
  },
  computed: {
    selectErrors () {
      const errors = []
      if (!this.$v.timeSelect.$dirty) { return errors }
      !this.$v.timeSelect.required && errors.push('请选择时间点')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) { return errors }
      !this.$v.name.maxLength && errors.push('不多于20个字！')
      !this.$v.name.required && errors.push('内容不可为空！')
      return errors
    },
    detailErrors () {
      const errors = []
      if (!this.$v.detail.$dirty) { return errors }
      !this.$v.detail.maxLength && errors.push('不多于50个字！')
      return errors
    }
  },
  mounted () {
    // this.dialog = this.value
    const self = this
    if (WatchJS) {
      WatchJS.watch(window.chart, 'selectNodes', function (d) {
        self.selectItems()
      })
    }

    self.name = 'N1: 118.200 MW' // 有功功率 需要按用户选择的时间点取得
    self.items = this.selectItems()
  },
  methods: {
    open () {
      this.menu = true
      window.chart.type = 'GongKuangBiaoZhu'
      this.closeOthers()

      this.items = []
    },
    submit () {
      const self = this
      self.$v.$touch()

      if (!self.$v.$error) {
        self.$parent.$parent.$parent.$parent.$refs && self.$parent.$parent.$parent.$parent.$refs.Tips.open('保存成功')
        self.name = ''
        self.detail = ''

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
        self.timeSelect = self.items[self.items.length - 1]
        self.items = new Array(self.timeSelect)
      }
      return self.items
    },
    // 关闭其他打开的对话框
    closeOthers () {
      const $refs = this.$parent.$parent.$parent.$parent.$refs
      if ($refs) {
        $refs.YiChangShuJu && $refs.YiChangShuJu.exit()
        $refs.ZhuangTaiBiJiao && $refs.ZhuangTaiBiJiao.exit()
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
