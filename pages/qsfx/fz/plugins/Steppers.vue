<template>
  <v-stepper v-model="e1" class="fill-height" :non-linear="true">
    <v-stepper-header>
      <v-stepper-step id="step1" step="1" :complete="true">
        <v-select
          v-model="selectType"
          :items="[
            { text: '单台', value: 'single' },
            { text: '多台', value: 'multiple' }
          ]"
          hide-details
          single-line
          dense
          :disabled="e1 > 1"
          :autofocus="selectFocus"
        />
      </v-stepper-step>
      <v-divider />
      <v-stepper-step step="2" :complete="true">
        日期范围
      </v-stepper-step>
      <v-divider />
      <v-stepper-step step="3" :complete="selectOK" :rules="[() => selectOK]">
        监测量
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items class="fill-height">
      <v-stepper-content step="1">
        <v-row dense :no-gutters="true">
          <v-col v-if="selectType === 'single'">
            <!-- 机组选择 -->
            <StationsSingle
              v-if="selectedStationInfo"
              ref="stations"
              v-model="selectedStationInfo"
              :duotai="false"
              :has-close="false"
              :c-type="selectType !== 'single'"
            />
          </v-col>
          <v-col v-else>
            <!-- 机组选择 -->
            <StationsMultiple
              v-if="selectedStationInfo"
              ref="stations"
              v-model="selectedStationInfo"
              :duotai="false"
              :has-close="false"
              :c-type="selectType !== 'single'"
            />
          </v-col>
        </v-row>
        <v-row dense :no-gutters="true">
          <v-col v-if="dates" cols="7">
            <v-menu
              ref="menuDate"
              v-model="menuDate"
              :close-on-content-click="false"
              :return-value.sync="dateRangeText"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template #activator="{ on, attrs }">
                <!-- 日期范围  -->
                <v-text-field
                  v-model="dateRangeText"
                  class="daterangeInput"
                  label="日期范围"
                  prepend-icon="mdi-timer-outline"
                  hide-details
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="dates"
                locale="zh-cn"
                :first-day-of-week="1"
                no-title
                scrollable
                range
              >
                <v-spacer />
                <v-btn color="primary" small @click="$refs.menuDate.save(date)">
                  确定
                </v-btn>
                <v-btn text small @click="menuDate = false">
                  取消
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="3">
            <!-- 时间范围 -->
            <v-menu
              ref="menuTimer"
              v-model="menuTimer"
              :close-on-content-click="false"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="time"
                  class="timeInput"
                  label="时间范围"
                  hide-details
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
                width="290px"
                ampm-in-title
                no-title
                scrollable
                @click:minute="$refs.menuTimer.save(time)"
              >
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  text
                  small
                  @click="$refs.menuTimer.save(time)"
                >
                  确定
                </v-btn>
                <v-btn color="white darken-1" class="primary" text small @click="menuTimer = false">
                  取消
                </v-btn>
              </v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="2" class="pt-4">
            <!-- 启停机记录 -->
            <QiTingJiJiLu v-model="selectQiTingJiJiLu" @syncDates="syncDates" />
          </v-col>
        </v-row>

        <v-row>
          <v-col class="align-center">
            <v-btn
              color="white darken-1"
              class="primary"
              text
              small
              block
              :disabled="!selectOK"
              @click="submitDrawLines"
            >
              确定
            </v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import StationsSingle from '@/components/common/Stations/DanTai.vue'
import StationsMultiple from '@/components/common/Stations/DuoTai.vue'
import QiTingJiJiLu from './QiTingJiJiLu.vue'

export default {
  components: {
    StationsSingle,
    StationsMultiple,
    QiTingJiJiLu
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
      menuDate: false,
      dates: ['2019-01-01', new Date().toISOString().substr(0, 10)],
      time: new Date().toLocaleTimeString('chinese', { hour12: false }),
      selectType: 'single', // 机型选中关键字
      selectedStationInfo: [], // 机组选中的ID
      jianCeLiangItems: [], // 10,11 监测量选中的ID
      isModel: false,
      selectQiTingJiJiLu: [],
      jianCeLiangLists: null // 监测量列表数据
    }
  },
  computed: {
    dateRangeText: {
      set () {},
      get (val) {
        return this.dates.join(' ~ ') || ''
      }
    },
    datetimeOK () {
      return this.dates && this.time
    },
    dynamoOK () {
      if (this.selectedStationInfo && this.selectedStationInfo.length > 0) {
        const selectArray = this.selectedStationInfo.filter(
          item => item.dynamo.length
        )
        return selectArray.length > 0
      } else {
        return false
      }
    },
    tsitmOK () {
      if (this.selectedStationInfo && this.selectedStationInfo.length > 0) {
        const selectArray = this.selectedStationInfo.filter(
          item => item.tsitm.length
        )
        return selectArray.length > 0
      } else {
        return false
      }
    },
    selectOK () {
      return this.dynamoOK && this.tsitmOK
    },
    // 用于记录用户每一步选择了那些信息
    stepperSelections () {
      const self = this
      const obj = {
        // Step 1
        dynamoInfo: {
          type: self.selectType || 'single', // 机型
          dynamos: self.selectedStationInfo || [] // 机组
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
      // this.selectType || 'single' // 单台 or 多台

      self.e1 = 1 // self.isModel ? 1 : 3 // return Step 1

      // 根据Steppers返回的信息，重新绘图
      // if (
      //   typeof self.$refs.jianCeLiang !== 'undefined' &&
      //   typeof self.$refs.jianCeLiang.lists !== 'undefined' &&
      //   self.$refs.jianCeLiang.lists.length > 0
      // ) {
      //   self.jianCeLiangLists = self.$refs.jianCeLiang.lists
      // }
      const obj = {
        type: self.selectedStationInfo.type || 'single',
        dateInfo: {
          dateRange: self.dates || '', // 日期范围
          time: self.time || '' // 时间
        },
        selectedStation: self.selectedStationInfo || [],
        jianCeLiangLists: self.jianCeLiangItems || [],
        drawChart: self.selectedStationInfo.drawChart
      }

      self.$emit('drawChart', obj)
    },
    // 同步StepperSelections
    syncStepperSelections (obj, jianCeLiangLists, isModel) {
      const self = this
      const oldSelectedDynamos = self.selectedStationInfo
      self.dates = null
      self.selectedStationInfo = null
      self.jianCeLiangItems = null

      window.setTimeout(() => {
        self.dates = [obj.d, new Date().toISOString().substr(0, 10)]
        if (obj.t) {
          self.time = obj.t
        }

        // self.selectedStationInfo = obj.dynamos
        //   ? obj.dynamos
        //   : oldSelectedDynamos

        self.selectedStationInfo = [
          {
            dtypeId: obj.dynamoType,
            dynamo: obj.dynamos ? obj.dynamos : oldSelectedDynamos,
            tsitm: obj.tsitm || [],
            jianCeLiang: obj.jianCeLiang || []
          }
        ]

        // if (self.selectedStationInfo && self.selectedStationInfo.length < 1) {
        //   self.selectedStationInfo =
        //     self.$parent.$parent.$parent.selectedDynamos
        // }

        self.jianCeLiangItems = obj.jianCeLiang ? obj.jianCeLiang : []

        if (jianCeLiangLists) {
          self.jianCeLiangLists = jianCeLiangLists
        }
        if (isModel) {
          self.isModel = isModel
        }

        self.submitDrawLines()
      }, 600)
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
      const old = self.jianCeLiangItems
      self.jianCeLiangItems = null
      window.setTimeout(() => {
        self.jianCeLiangItems = ids || old
      }, 500)
    },
    // 同步监测量
    syncDynamo (ids) {
      const self = this
      const old = self.selectedStationInfo
      self.selectedStationInfo = null
      window.setTimeout(() => {
        self.selectedStationInfo = ids || old
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

>>> .v-stepper__items{
  min-height: 500px !important;
  .v-stepper__content{
    padding: 0;
    height: 100% !important;
    .row--dense{
      flex: 0 1 auto !important;
      .full-width{
        width: 100% !important;
      }
    }
    .v-stepper__wrapper{
      display: flex;
      flex-direction: column;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding-left: 4px !important;
      padding-right: 4px !important;
      .v-card__text{
        min-height: 480px !important;
      }
    }
  }
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

.daterangeInput, .timeInput{
  flex: 0 1 auto !important;
  font-size: 14px;
  margin-top: 10px;
  margin-right: 3px;
}
#step1{
  >>> .v-select__selection{
    font-size: 15px !important;
  }
}
</style>
