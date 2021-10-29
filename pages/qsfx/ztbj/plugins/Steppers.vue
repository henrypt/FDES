<template>
  <v-stepper v-model="e1" class="fill-height" :non-linear="true">
    <v-stepper-header>
      <v-stepper-step id="step1" :complete="e1 > 1" step="1">
        工况标注
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items class="fill-height">
      <v-stepper-content step="1">
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

export default {
  components: {
    GongKuangBiaoZhuList
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
      gongKuangBiaoZhuListItems: [], // 工况标注选中的ID
      isModel: false
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
      self.$emit(
        'drawChart',
        self.stepperSelections,
        null, // 监测量
        self.gongKuangBiaoZhuListItems
      )
    },
    // 同步StepperSelections
    syncStepperSelections (obj, jianCeLiangLists, isModel) {
      const self = this
      self.dates = null
      self.selectedDynamos = null

      window.setTimeout(() => {
        self.dates = [obj.d, new Date().toISOString().substr(0, 10)]
        self.time = obj.t
        self.selectedDynamos = obj.dynamos
        self.isModel = isModel

        debugger

        self.submitDrawLines()
      }, 500)
    },
    syncDates (d, t) {
      const self = this
      const d1 = self.dates[1]
      self.dates = null
      self.dates = [d, d1] // 日期范围
      self.time = t
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
