<!--
图控件
  工况标注
  屏蔽异常数据
  折算
  清除
  日期范围  开始日期~终止日期，时间间隔
  属性（待定）

小功能：
清除
  清除图控件中的线
  清除监测量列表中选择的监测量
  清除模板列表中选择的模板
  注：可否放至图控件里，因为这是图的属性范畴
打印（取消）
  使用图控件的下载图片功能，通过图片再打印
隐藏（取消）
  使用了可伸缩的列表后，没必要加入此功能
设置 ？？？

状态比较
  记录图控件选择的2~4个时间点（至少2个时间点）后，跳转至“状态比较”页面
  注：可否根据当前图的时间轴生成一个时间轴，然后根据这个小版本的时间轴选择时间点

监测量
  单台&多台
  机组
    分为单台&多台，即机组的单选和多选
  监测量列表
    分为单台&多台，列表中载入的数据不同
    加入筛选功能
  模板列表
    分为单台&多台，列表中载入的数据不同
    模板载入的数据 同步更新到 监测量列表数据中模板列表中显示：
      当前用户自己创建的模板
      管理员设置为公共属性的模板
      注：当前用户自己创建的模板可更新模板名称、删除模板
-->

<!--
  发展趋势功能：
    新建图控件---发展趋势专用
      线：多选
      点：点选
      日期时间长度+间隔控件：默认加载1年数据量，用户可自行拖拉时间范围控制条查看图点的详细数据
      按钮：折算、清除

    界面右上角浮动按钮：屏蔽异常数据、工况标注、启停机记录

    侧边弹出配置对话框（带关闭按钮），
    提示用户从图控件中选择要配置的数据点（在对话框中列出用户选择的点信息，再由用户在此处选择要配置的点），
    同步用户点选的点数据至此处
    提交或关闭对话框后，清空（图控件）点选记录 + 清空对话框选择的点信息

    监测量列表（分：单台、多台）（列表中加入筛选：电站、机组）
    注：后期再做列表按需加载数据

-->
<template>
  <div class="page">
    <!-- <v-row>
      <v-col>
        {{stepperSelections}}
      </v-col>
    </v-row> -->
    <v-row class="fill-height" no-gutters>
      <v-col cols="12">
        <vChart
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
              width="400px"
              height="auto"
              min-width="500px"
              max-width="500px"
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

                  <!-- 状态比较 -->
                  <ZhuangTaiBiJiao
                    ref="ZhuangTaiBiJiao"
                    v-model="selectNodesFromChart"
                  />

                  <!-- 异常数据屏蔽 -->
                  <YiChangShuJu
                    ref="YiChangShuJu"
                    v-model="selectNodesFromChart"
                  />

                  <!-- 工况标注 -->
                  <GongKuangBiaoZhu
                    ref="GongKuangBiaoZhu"
                    v-model="selectNodesFromChart"
                  />

                  <!-- 模板 -->
                  <MoBan
                    v-if="selectedDynamos"
                    :types="0"
                    :dynamos="selectedDynamos"
                  />

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
import vChart from '@/components/common/Chart/index.vue'
import Tips from '@/components/common/Tips/'
import Steppers from './plugins/Steppers.vue'
import ZhuangTaiBiJiao from './plugins/ZhuangTaiBiJiao.vue'
import YiChangShuJu from './plugins/YiChangShuJu.vue'
import GongKuangBiaoZhu from './plugins/GongKuangBiaoZhu.vue'

// 缓存图控件所用的window.document信息
window.chart = {
  selectNodes: null, // 图控件上选择的点的时间信息
  type: '', // 打开图设置对话框的类型：如工况标注，屏蔽异常数据，状态比较... e.g. 'GongKuangBiaoZhu'
  arrTimes: []
}

export default {
  components: {
    vChart,
    Steppers,
    ZhuangTaiBiJiao,
    YiChangShuJu,
    GongKuangBiaoZhu,
    Tips,
    MoBan
  },
  data () {
    return {
      title: '发展趋势',
      drawer: true,
      mini: true,
      menuJianCeLiang: false,
      menuChartModal: false,
      stepperSelections: {}, // Steppers组件中缓存的数据
      chartReturnInfo: {}, // 图控件返回的信息
      xmlData: [],
      chartDATA: null, // 图线的数据
      chartInfo: {
        type: 'single',
        dynamos: null,
        sDate: null,
        eDate: null,
        tsitm: null,
        isModel: false
      },
      dynamos: null
    }
  },
  computed: {
    selectedDynamos () {
      return this.dynamos || null
    },
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

    this.dynamos = this.$store.getters['user/getUserRoles']
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
    drawChartBySteppers (obj) {
      const self = this
      let newData = []
      // 绘图前，默认关闭Steppers
      self.mini = true

      if (obj.type === 'multiple' || obj.type === 'single') {
        const selectItems =
          obj.selectedStation.filter(item => item.dynamo.length > 0) || []

        selectItems.forEach((item) => {
          // 机型
          self.chartInfo.type = obj.type

          // 机组
          self.chartInfo.dynamos = item.dynamo

          // 日期时间范围
          const d1 = obj.dateInfo.dateRange[0] + ' ' + obj.dateInfo.time
          const d2 = obj.dateInfo.dateRange[1] + ' ' + obj.dateInfo.time
          self.chartInfo.sDate = self.$moment
            .moment(d1)
            .format('YYYY-MM-DD hh:mm:ss')
          self.chartInfo.eDate = self.$moment
            .moment(d2)
            .format('YYYY-MM-DD hh:mm:ss')

          // 监测量
          self.chartInfo.tsitm = item.tsitm
          self.chartInfo.isModel = false

          if (self.chartInfo) {
            const newLines =
              self.getNewLines(self.chartInfo, self.chartInfo.tsitm) || null

            if (newLines && newLines.length > 0) {
              newData = newData.concat(newLines)
            }
          }
        })

        self.chartDATA = null
        setTimeout(() => {
          // computed: cData -> chartDATA
          // <vChart v-if="cData" ... />
          // 计算属性cData根据chartDATA值的变化来更新图控件Chart
          self.chartDATA = newData
        }, 500)
      }

      // if (obj) {
      //   const { dynamoInfo, dateInfo, jianCeLiangInfo } = obj
      //   // 机型 & 机组
      //   self.chartInfo.type = dynamoInfo.type || 'single'
      //   self.chartInfo.dynamos = dynamoInfo.dynamos

      //   // 日期时间范围
      //   const d1 = dateInfo.dateRange[0] + ' ' + obj.dateInfo.time
      //   const d2 = dateInfo.dateRange[1] + ' ' + obj.dateInfo.time
      //   self.chartInfo.sDate = self.$moment
      //     .moment(d1)
      //     .format('YYYY-MM-DD hh:mm:ss')
      //   self.chartInfo.eDate = self.$moment
      //     .moment(d2)
      //     .format('YYYY-MM-DD hh:mm:ss')

      //   // 监测量
      //   self.chartInfo.tsitm = jianCeLiangInfo.items
      //   self.chartInfo.isModel = false

      //   if (self.chartInfo) {
      //     const newData =
      //       self.getNewLines(self.chartInfo, jianCeLiangLists) || null
      //     if (newData && newData.length > 0) {
      //       self.chartDATA = null
      //       setTimeout(() => {
      //         // computed: cData -> chartDATA
      //         // <vChart v-if="cData" ... />
      //         // 计算属性cData根据chartDATA值的变化来更新图控件Chart
      //         self.chartDATA = newData
      //       }, 500)
      //     }
      //   }
      // }
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
      const jianCeLiang = jianCeLiangLists // chartInfo.jianCeLiang
      const title1 = chartInfo.sDate + '~' + chartInfo.eDate

      for (let d = 0, dLen = dynamos.length; d < dLen; d++) {
        const dynamo = dynamos[d] || null
        // const dynamoInfo = self.$store.getters['system/getDynamoInfoById'](dynamo)

        if (dynamo) {
          for (let j = 0, jLen = jianCeLiang.length; j < jLen; j++) {
            const jcl = jianCeLiang[j] || null

            if (jcl) {
              let jclName = jcl.name
              if (jclName && jclName.indexOf('_')) {
                jclName = jclName.substring(0, jclName.indexOf('_'))
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
                  id: dynamo.id + '_' + jcl.id,
                  name: dynamo.shortName + '_' + jclName,
                  legend: dynamo.shortName + '_' + jclName,
                  dynamoInfo: dynamo,
                  title: title1,
                  yAxis0Name: null,
                  yAxis1Name: null,
                  nodes: null,
                  names: [...arr].map((i) => {
                    return self.$moment.add(i)
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
