<template>
  <v-stepper v-model="e1" class="fill-height" :non-linear="true">
    <v-stepper-header>
      <v-stepper-step
        id="step1"
        :complete="e1 > 1"
        step="1"
      >
        监测量
      </v-stepper-step>
      <v-divider />
      <v-stepper-step :complete="e1 > 2" step="2">
        日期范围
      </v-stepper-step>
      <v-divider />
      <v-stepper-step :complete="e1 > 3" step="3">
        工况标注
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items class="fill-height">
      <v-stepper-content step="1">
        <!-- 监测量列表 -->
        <JianCeLiang
          v-if="jianCeLiangItems"
          ref="jianCeLiang"
          v-model="jianCeLiangItems"
        />

        <v-btn
          color="primary"
          :disabled="jianCeLiangItems && jianCeLiangItems.length < 1"
          @click="e1 = 2"
        >
          下一步
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2" class="fill-height">
        <v-row dense :no-gutters="true">
          <v-col v-if="dates">
            <!-- 日期范围  -->
            <v-text-field
              v-model="dateRangeText"
              class="daterangeInput"
              label="日期范围"
              prepend-icon="mdi mdi-timer"
              hide-details
              readonly
            />
            <v-date-picker
              v-model="dates"
              locale="zh-cn"
              :first-day-of-week="1"
              full-width
              range
            />
          </v-col>
        </v-row>

        <!-- 时间范围 -->
        <v-row dense>
          <v-col>
            <b class="warning caption">时间间隔由时间范围，时间长度计算出来</b>
            <v-menu
              ref="menuTimer"
              v-model="menuTimer"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="time"
                  label="时间范围"
                  prepend-icon="mdi-timer-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>

              <v-time-picker
                v-if="menuTimer"
                v-model="time"
                format="24hr"
                :landscape="true"
                full-width
                ampm-in-title
                no-title
                scrollable
                @click:minute="$refs.menuTimer.save(time)"
              >
                <v-spacer />
                <v-btn color="blue darken-1" text small @click="menuTimer = false">
                  取消
                </v-btn>
                <v-btn color="white darken-1" class="primary" text small @click="$refs.menuTimer.save(time)">
                  确定
                </v-btn>
              </v-time-picker>
            </v-menu>
          </v-col>
        </v-row>

        <!-- 操作 -->
        <v-row dense>
          <v-col>
            <v-btn class="full-width" color="primary" @click="e1 = 3">
              下一步
            </v-btn>
            <v-btn class="full-width" text @click="e1 = 1">
              取消
            </v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>

      <v-stepper-content step="3" class="fill-height">
        <GongKuangBiaoZhuList
          v-if="gongKuangBiaoZhuListItems"
          ref="gongKuangBiaoZhuList"
          v-model="gongKuangBiaoZhuListItems"
        />

        <v-btn color="blue darken-1" text small @click="e1 = 1">
          取消
        </v-btn>
        <v-btn
          color="white darken-1"
          class="primary"
          text
          small
          :disabled="gongKuangBiaoZhuListItems.length < 1"
          @click="submitDrawLines"
        >
          确定
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import GongKuangBiaoZhuList from '../plugins/GongKuangBiaoZhuList'
import JianCeLiang from './JianCeLiang'

export default {
  components: {
    GongKuangBiaoZhuList,
    JianCeLiang
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [Object],
      default: () => {},
      required: false
    },
    selectFocus: {
      type: [Boolean, String],
      default: false,
      required: false
    }
  },
  data () {
    return {
      e1: 1,
      menuTimer: false,
      dates: ['2019-01-01', new Date().toISOString().substr(0, 10)],
      time: new Date().toLocaleTimeString('chinese', { hour12: false }),
      selectedDynamos: [19], // 机组选中的ID
      jianCeLiangItems: [], // 10,11 监测量选中的ID
      gongKuangBiaoZhuListItems: [], // 工况标注选中的ID
      isModel: false,
      jianCeLiangLists: null // 监测量列表数据
    }
  },
  computed: {
    dateRangeText () {
      return this.dates.join(' ~ ') || ''
    },
    // 用于记录用户每一步选择了那些信息
    stepperSelections () {
      const self = this
      const obj = {
        // Step 1
        dynamoInfo: {
          type: 'multiple', // 机型
          dynamos: self.selectedDynamos || [] // 机组
        },
        // Step 2
        dateInfo: {
          dateRange: self.dates || '', // 日期范围
          time: self.time || '' // 时间
        },
        // Step 3
        jianCeLiangInfo: {
          items: self.jianCeLiangItems || [] // 监测量IDs
        },
        gongKuangBiaoZhuInfo: {
          items: self.gongKuangBiaoZhuListItems
        },
        isModel: false
      }
      self.$emit('input', obj)
      return obj
    }
  },
  watch: {},
  mounted () {},
  methods: {
    // 提交确认操作图控件Chart
    submitDrawLines () {
      const self = this

      self.e1 = self.isModel ? 1 : 3 // return Step 1

      // 根据Steppers返回的信息，重新绘图
      if (
        typeof self.$refs.jianCeLiang !== 'undefined' &&
        typeof self.$refs.jianCeLiang.lists !== 'undefined' &&
        self.$refs.jianCeLiang.lists.length > 0
      ) {
        self.jianCeLiangLists = self.$refs.jianCeLiang.lists
      }

      self.$emit(
        'drawChart',
        self.stepperSelections,
        self.jianCeLiangLists,
        self.gongKuangBiaoZhuListItems
      )
    },
    // 同步StepperSelections
    syncStepperSelections (obj, jianCeLiangLists, isModel) {
      const self = this
      self.dates = null
      self.selectedDynamos = null
      self.jianCeLiangItems = null

      window.setTimeout(() => {
        self.dates = [obj.d, new Date().toISOString().substr(0, 10)]
        self.time = obj.t
        self.selectedDynamos = obj.dynamos
        self.jianCeLiangItems = obj.jiangCeLiang
        self.jianCeLiangLists = jianCeLiangLists
        self.isModel = isModel

        self.submitDrawLines()
      }, 500)
    },
    syncDates (d, t) {
      const self = this
      const d1 = self.dates[1]
      self.dates = null
      self.dates = [d, d1] // 日期范围
      self.time = t
    },

    // 同步监测量
    syncJianCeLiang (ids) {
      const self = this
      self.jianCeLiangItems = null
      window.setTimeout(() => {
        self.jianCeLiangItems = ids
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
>>> .v-picker__title{
  display: none;
}

>>> .v-stepper__header{
  border-top: dotted 1px #ccc;
  height: 45px !important;
}

>>> .v-stepper__step{
  padding: 5px !important;
  >>> .v-icon{
    font-size: 0.75rem !important;
  }
}

>>> .v-stepper__label{
  width: 70px !important;
  font-size: 14px !important;
}

>>> .v-stepper__content{
  padding: 0;
  height: 100% !important;
  .row--dense{
    flex: 0 1 auto !important;
    .full-width{
      width: 100% !important;
    }
  }
}

>>> .v-stepper__wrapper{
  display: flex;
  flex-direction: column;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-left: 4px !important;
  padding-right: 4px !important;
  height: 100% !important;
}

.daterangeInput{
  flex: 0 1 auto !important;
  font-size: 14px;
  margin-top: 10px;
}

#step1{
  >>> .v-select__selection{
    font-size: 15px !important;
  }
}
</style>
