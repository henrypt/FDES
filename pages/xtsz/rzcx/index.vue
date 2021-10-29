<!-- page info:  -->
<template>
  <v-card class="page overflow-hidden">
    <div>
      <!-- 时间范围 -->
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
          <v-btn color="blue darken-1" text small @click="menuDate = false">
            取消
          </v-btn>
          <v-btn color="white darken-1" class="primary" text small @click="submit()">
            确定
          </v-btn>
        </v-date-picker>
      </v-menu>
    </div>
    <v-tabs
      v-model="tab"
      center-active
      grow
      background-color="grey lighten-5"
    >
      <v-tab
        v-for="itm in tabs"
        :key="itm.tab"
        class="subtitle-2 font-weight-bold"
        @change="tabChange(itm.logType, itm.index)"
      >
        {{ itm.tab }} <i>{{ itm.content }}</i>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-if="items" v-model="tab">
      <v-tab-item v-for="(item,idx) in items" :key="idx">
        <v-data-table
          :headers="headers"
          :items="item.data || []"
          item-key="item.tab"
          :items-per-page="perPage"
          class="elevation-1"
          :loading="loading"
          loading-text="加载中... 请稍等"
          no-data-text="无数据！"
          dense
        />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { reqDateTime, readLog } from '@/api/index.js'
export default {
  components: { },
  data () {
    return {
      title: '日志查询',
      perPage: 10,
      timeLong: 100 * 1, // 时间跨度，单位：day(天)
      dates: [],
      // oldDates: -1,
      loading: true,
      // time: new Date().toLocaleTimeString('chinese', { hour12: false }),
      menuDate: false,
      tab: 0, // TAB 当前索引
      tabs: [
        { id: 1, tab: '登录日志', index: 0, logType: 'login', content: '', select: true },
        { id: 2, tab: '修改日志', index: 1, logType: 'modify', content: '', select: false },
        { id: 3, tab: '数据维护日志', index: 2, logType: 'data_maintenance ', content: '', select: false }
      ],
      headers: [
        { text: '操作人', value: 'userNm' },
        { text: '操作时间', value: 'time' },
        { text: '操作内容', value: 'content' }
      ],
      items: [],
      selectedLogType: null // 当前选择的TAB对应的type类型(string)
    }
  },
  computed: {
    dateRangeText: {
      set () {},
      get (val) {
        return this.dates.join(' ~ ') || ''
      }
    }
  },
  async created () {
    const self = this

    // 初始化 items 模板
    self.tabs.forEach((itm) => {
      self.items.push({
        tab: itm.index,
        logType: itm.logType,
        data: null
      })
    })

    // 初始化时间范围
    const dateTime = await reqDateTime()
    self.dates = [
      self.$moment?.moment(dateTime)?.add(-1 * self.timeLong, 'd')?.format('YYYY-MM-DD'),
      self.$moment?.moment(dateTime)?.add(1, 'd')?.format('YYYY-MM-DD')
    ]

    // 初始化 默认选择类型
    self.selectedLogType = self.tabs[0]?.index || 0

    // this.initContentData()
    this.tabChange(this.tabs[0]?.logType, this.tabs[0]?.index)

    /*
      1. Init Content Data --- items = dataItems
      2. Init Search Data   ---  searchItems
      3. Search Text Change
         Has key words -> Init Search Data --- searchItems
         Has Null key word -> Init Content Data & Init Search Data
    */
  },
  mounted () {

  },
  methods: {
    async initContentData () {
      const self = this

      // const tabData = self.items.find(itm => itm.tab === self.selectedLogType)
      // const isForceRefresh = false

      // 纠正日期前后顺序
      if (self.dates && self.dates.length > 1) {
        const _time1 = new Date(self.dates[0]).getTime()
        const _time2 = new Date(self.dates[1]).getTime()
        if (_time1 > _time2) {
          self.dates = [self.dates[1], self.dates[0]]
          window.console.log(self.dates)
        }
      }

      self.loading = true
      // if (self.oldDates !== -1) {
      //   if (self.dates && self.dates.length > 1) {
      //     const _time = new Date(self.dates[0]).getTime() + new Date(self.dates[1]).getTime()
      //     if (self.oldDates !== _time) {
      //       isForceRefresh = true
      //       self.oldDates = _time
      //     }
      //   }
      // }

      const params = {
        crud: 'read',
        userId: self.$store?.state?.user?.info?.user?.id,
        startDate: self.dates[0],
        endDate: self.dates[1],
        logType: self.selectedLogType
      }
      const r = await readLog(params)
      if (r) {
        const arrRecords = r['日志']?.Record || []
        const arrItems = []
        for (let i = 0, iLen = arrRecords.length; i < iLen; i++) {
          // arrRecords?.forEach((itm) => {
          const itm = arrRecords[i]
          // 内容: "登录,在主机：192.168.0.208 上。"
          // 时间: "2021-08-27 16:17:50"
          // 用户id: "dyw_henry"
          arrItems.push({
            userNm: itm['用户id'],
            time: itm['时间'],
            content: itm['内容']
          })
        }// )

        if (arrItems && arrItems?.length > 0) {
          self.items.find((item) => {
            if (item.tab === parseInt(self.selectedLogType, 10)) {
              item.data = arrItems
              return true
            }
            return false
          })
        }

        window.console.log(self.items)
        self.loading = false
      } else {
        self.loading = false
      }
    },
    tabChange (logType, index) {
      this.selectedLogType = index
      this.initContentData()
    },
    submit () {
      this.menuDate = false
      this.initContentData()
    }
  }
}
</script>

<style lang="scss" scoped></style>
