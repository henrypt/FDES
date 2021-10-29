<template>
  <div class="page">
    <v-data-table
      v-model="selected"
      :items="stableTimes"
      :single-select="singleSelect"
      :item-key="key"
      :search="search"
      show-select
      fixed-header
      calculate-widths
      dense
      no-data-text="no data"
      :loading="!stableTimes"
      loading-text="loadingText"
      :footer-props="{
        showFirstLastPage: false,
        showEndLastPage: false
      }"
      height="530"
      class="pa-0 ma-0"
      :headers="headers"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-header
      hide-default-footer
      @page-count="pageCount = $event"
    >
      <template #top>
        <v-toolbar
          id="dateArea"
          dense
          flat
          top
          fixed
          color="white"
        >
          <v-btn id="previousBtn" icon @click.stop="previous(10)">
            <v-icon dense size="30">
              mdi-menu-left
            </v-icon>
          </v-btn>
          <v-tooltip bottom activator="#previousBtn">
            过去
          </v-tooltip>
          <Datepicker v-model="datetime" title="" label-text="" />
          <v-btn id="nextBtn" icon @click.stop="next(10)">
            <v-icon dense size="30">
              mdi-menu-right
            </v-icon>
          </v-btn>
          <v-tooltip bottom activator="#nextBtn">
            未来
          </v-tooltip>
          <v-spacer />
          <label class="caption secondary">{{ radios }}</label>
        </v-toolbar>
      </template>

      <!-- eslint-disable-next-line vue/no-template-shadow -->
      <template #body="{ items }">
        <tbody>
          <tr>
            <td>
              <v-radio-group
                v-model="radios"
                :mandatory="false"
                :hide-details="true"
              >
                <v-radio
                  v-for="item in items"
                  :key="item.name"
                  :label="item.stable_time"
                  :value="item.stable_time"
                />
              </v-radio-group>
            </td>
          </tr>
        </tbody>
      </template>

      <template #no-data>
        没有数据！
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Datepicker from '@/components/common/Datepicker'

export default {
  components: {
    Datepicker
  },
  model: {
    prop: 'msg',
    event: 'vModel'
  },
  props: {
    msg: {
      type: [Array, String],
      default: () => {},
      required: false
    },
    singleSelect: {
      type: [Boolean],
      default: false,
      required: false
    },
    currentItem: {
      type: [Object],
      default: () => {},
      required: false
    }
  },
  data () {
    return {
      title: '稳定点列表',
      loadingText: '数据加载中...',
      search: '',
      selected: [],
      datetime: new Date().toISOString().substr(0, 10),
      radios: '',
      items: null,
      page: 1,
      pageCount: 0,
      // itemsPerPage: -1, // 10
      key: 'stable_time',
      stableDateMenu: false,
      stabtype: 1, // 稳定点类型. 默认为1, 铁芯稳定点类型为4
      headers: [
        {
          text: '稳定时间',
          value: 'stable_time',
          align: 'center',
          sortable: false,
          divider: true,
          width: 50
        }
      ],
      // http://192.168.0.191/nd/search/sea_get/sea_get_StabPointlist.asp?setdynamo=84&stabtype=1&Sdate=2020-09-09%2023:59:00&count=7200&isforward=1
      stableTimes: []
    }
  },
  computed: {
    itemsPerPage () {
      const self = this
      if (self.stableTimes) {
        return self.stableTimes.length - 1
      } else {
        return -1
      }
    }
  },
  watch: {
    datetime (newDate) {
      const self = this
      // const date = new Date().toISOString().substr(0, 10)
      const d = self.$moment.moment(newDate).format('YYYY-MM-DD hh:mm')
      if (d) {
        self.stableTimes = []
        self.initStableTimes(d + ':00')
      }
    },
    radios (newDate) {
      // this.$emit('vModel', newDate)
      this.$emit('syncSelectStableList', newDate, this.currentItem)
    }
  },
  mounted () {
    const self = this

    const d = self.$moment.moment().format('YYYY-MM-DD hh:mm')
    self.initStableTimes(d + ':00')
  },
  methods: {
    previous (num) {
      const self = this
      const stableTimesLength = self.stableTimes.length
      const lastStableTime = self.stableTimes[stableTimesLength - 1]

      // 向服务端要数据: 根据当前稳定点列表的最后一个时间点为起点，向未来要num个稳定点
      self.updateStableTimes(lastStableTime, num, 'past')
    },
    next (num) {
      const self = this
      const firstStableTime = self.stableTimes[0]

      // 向服务端要数据: 根据当前稳定点列表的最后一个时间点为起点，向过去要num个稳定点
      self.updateStableTimes(firstStableTime, num, 'future')
    },
    initStableTimes (time) {
      const self = this

      // 从服务端读取稳定点列表数据，根据读取到数据的长度
      // const syncStableListLength = 10
      const num = 10
      for (let i = 0; i < num; i++) {
        const newTime = this.$moment
          .moment(time)
          .add(-i, 'm')
          .format('YYYY-MM-DD hh:mm')

        self.stableTimes.push({
          stable_time: newTime + ':00',
          isSelected: newTime === time
        })
      }

      self.item = self.stableTimes
      let selectTime = self.stableTimes.find(n => !!n.isSelected) || null
      if (selectTime === null) {
        selectTime = self.stableTimes[0]
      }

      if (selectTime) {
        self.radios = selectTime.stable_time
      }
    },
    updateStableTimes (time, num, type) {
      // type: 'future'未来， 'past'过去
      const self = this
      const t = type === 'future' ? 1 : -1
      const arr = []
      if (time) {
        for (let i = 1; i <= num; i++) {
          const newTime = this.$moment
            .moment(time.stable_time)
            .add(i * t, 'm')
            .format('YYYY-MM-DD hh:mm')

          arr.push({
            stable_time: newTime + ':00',
            isSelected: false
          })
          window.console.log(newTime)

          // self.stableTimes.push({
          //   stable_time: newTime + ':00',
          //   isSelected: false
          // })
        }

        // self.stableTimes.concat(arr.reverse())
        if (type === 'future') {
          self.stableTimes = arr.reverse().concat(self.stableTimes)
        } else {
          self.stableTimes = self.stableTimes.concat(arr)
        }
        window.console.log(time, num, type)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page{
  width: 100%;
  max-width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
  #dateArea{
    label{
      height: 25px;
      line-height: 25px;
    }
  }
  >>> .v-data-footer__select{
    display: none;
  }
  .v-input--radio-group{
    padding: 0;
    margin: 0;
    >>> .v-icon{
      font-size: 20px !important;
    }
  }
}
</style>
