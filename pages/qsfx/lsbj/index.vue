<template>
  <div class="page">
    <!-- <v-row>
      <v-col>
        {{stepperSelections}}
      </v-col>
    </v-row> -->
    <v-row class="fill-height" no-gutters>
      <v-col cols="12">
        <Chart
          v-if="cData"
          ref="chart"
          v-model="chartReturnInfo"
          :cdata="cData"
        />

        <v-sheet class="overflow-hidden">
          <v-container class="fill-height">
            <v-navigation-drawer
              v-model="drawer"
              absolute
              right
              permanent
              dense
              :temporary="!mini"
              :mini-variant.sync="mini"
              :inverted-scroll="true"
              :expand-on-hover="false"
              :hide-overlay="true"
              width="350"
              height="auto"
              max-width="400"
              max-height="100%"
              class="mt-10"
            >
              <template #prepend>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon medium color="info">
                      mdi-tools
                    </v-icon>
                  </v-list-item-avatar>

                  <!-- 模板 -->
                  <MoBan :types="2" :dynamos="[]" />

                  <!-- 关闭 -->
                  <v-btn icon @click.stop="mini = !mini">
                    <v-icon size="26" color="info">
                      mdi-close-circle
                    </v-icon>
                  </v-btn>
                </v-list-item>
              </template>
              <v-divider />

              <Steppers
                v-show="!mini"
                ref="steppers"
                v-model="stepperSelections"
                :select-focuse="mini"
                @drawChart="drawChartBySteppers"
              />
            </v-navigation-drawer>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>

    <Tips ref="Tips" />
  </div>
</template>

<script>
import MoBan from '@/components/common/MoBan/index.vue'
import Chart from '@/components/common/Chart/index.vue'
import Tips from '@/components/common/Tips/'
import Steppers from './plugins/Steppers.vue'

// 缓存图控件所用的window.document信息
window.chart = {
  selectNodes: null, // 图控件上选择的点的时间信息
  type: '', // 打开图设置对话框的类型：如工况标注，屏蔽异常数据，状态比较... e.g. 'GongKuangBiaoZhu'
  arrTimes: []
}

export default {
  components: {
    Chart,
    Steppers,
    Tips,
    MoBan
  },
  data () {
    return {
      title: '历史比较',
      drawer: true,
      mini: true,
      menuJianCeLiang: false,
      menuChartModal: false,
      stepperSelections: {}, // Steppers组件中缓存的数据
      chartReturnInfo: {}, // 图控件返回的信息
      xmlData: [],
      chartDATA: null, // 图线的数据
      chartInfo: {
        dynamos: null,
        sDate: null,
        eDate: null,
        jianCeLiang: null,
        gongKuangBiaoZhu: null,
        isModel: false
      }
    }
  },
  computed: {
    selectNodesFromChart () {
      if (this.$refs.chart) {
        return this.$refs.chart
      } else {
        return {}
      }
    },
    cData () {
      if (this.chartDATA) {
        return this.chartDATA
      } else {
        return null
      }
    }
  },
  watch: {
    mini (val) {
      // JianCeLiang
      // document.getElementById('JianCeLiang').style.display = val === true ? 'block' : 'none'
      return val
    }
  },
  mounted () {
    this.selectedDy()

    // 测试：给图控件加载数据，出图
    this.countData()
  },
  methods: {
    // 默认选择那些机组
    selectedDy () {
      return []
    },
    // 根据读取的数据，重新构建JSON数据给图控件
    countData () {
      const self = this
      if (!self.chartDATA) {
        // 绘图前，如果没有图控件的数据加载，则默认打开Steppers，以便用户操作
        self.mini = false
      }
    },
    // 根据Steppers返回的信息，重新绘图
    drawChartBySteppers (obj, jianCeLiangLists, gongKuangBiaoZhuListItems) {
      const self = this
      // 绘图前，默认关闭Steppers
      self.mini = true

      if (obj) {
        const {
          dynamoInfo,
          dateInfo,
          jianCeLiangInfo,
          gongKuangBiaoZhuInfo
        } = obj

        // 机型 & 机组
        self.chartInfo.dynamosType = dynamoInfo.dynamosType || 'single'
        self.chartInfo.dynamos = dynamoInfo.dynamos

        self.chartInfo.dynamos = []

        gongKuangBiaoZhuInfo.items.forEach(item =>
          self.chartInfo.dynamos.push(item.dynamo)
        )

        // 日期时间范围
        const d1 = dateInfo.dateRange[0] + ' ' + obj.dateInfo.time
        const d2 = dateInfo.dateRange[1] + ' ' + obj.dateInfo.time
        self.chartInfo.sDate = self.$moment
          .moment(d1)
          .format('YYYY-MM-DD hh:mm:ss')
        self.chartInfo.eDate = self.$moment
          .moment(d2)
          .format('YYYY-MM-DD hh:mm:ss')

        // 监测量
        self.chartInfo.jianCeLiang = jianCeLiangInfo.items
        self.chartInfo.isModel = false

        if (self.chartInfo) {
          const newData =
            self.getNewLines(self.chartInfo, jianCeLiangLists) || null

          if (newData && newData.length > 0) {
            self.chartDATA = null
            setTimeout(() => {
              // computed: cData -> chartDATA
              // <Chart v-if="cData" ... />
              // 计算属性cData根据chartDATA值的变化来更新图控件Chart
              self.chartDATA = newData
            }, 500)
          }
        }
      }
    },
    getNewLines (chartInfo, jianCeLiangLists) {
      const self = this
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const genRandom = (min, max) =>
        ((Math.random() * (max - min + 1)) | 0) + min
      const arrLines = []
      let values = null
      let values1 = null
      const dynamos = chartInfo.dynamos
      const jianCeLiang = chartInfo.jianCeLiang
      const title = chartInfo.sDate + '~' + chartInfo.eDate

      for (let d = 0, dLen = dynamos.length; d < dLen; d++) {
        const dynamo = dynamos[d] || null
        const dynamoInfo = self.$store.getters['system/getDynamoInfoById'](
          dynamo
        )

        if (dynamo) {
          for (let j = 0, jLen = jianCeLiang.length; j < jLen; j++) {
            const jcl = jianCeLiang[j] || null

            if (jcl) {
              let jclName = null
              for (let j = 0, jLen = jianCeLiangLists.length; j < jLen; j++) {
                const kv = jianCeLiangLists[j].items.find(
                  item => item.value === jcl
                )
                if (kv) {
                  const name = kv ? kv.name : null
                  if (name && name.indexOf('_')) {
                    jclName = name.substring(0, name.indexOf('_'))
                  }
                  break
                }
              }

              if (jclName) {
                // 生成随机数
                values = []
                values1 = []
                for (let a = 0, aLen = arr.length; a < aLen; a++) {
                  values.push(genRandom(0, 20))
                }
                for (let b = 0, bLen = arr.length; b < bLen; b++) {
                  values1.push(genRandom(10, 30))
                }

                // 添加新的线
                arrLines.push({
                  id: dynamoInfo.id + '_' + jcl,
                  name: dynamoInfo.shortName + '_' + jclName,
                  legend: dynamoInfo.shortName + '_' + jclName,
                  dynamoInfo,
                  title,
                  yAxis0Name: null,
                  yAxis1Name: null,
                  nodes: null,
                  names: [...arr].map((i) => {
                    return i
                  }),
                  index: [...arr],
                  value: [...values],
                  convert: [...values1],
                  lineAttr: null,
                  selected: true
                })
              }
            }
          }
        }
      }

      return arrLines
    }
  }
}
</script>

<style lang="scss" scoped>
.page{
  width: 100%;
  max-width: 100% !important;
  padding: 0 !important;
  margin: 36px 0 0 0 !important;
}

>>> .v-navigation-drawer__content{
  overflow-y: hidden !important;
}
</style>
