<!-- page info:  -->
<template>
  <v-card class="overflow-hidden">
    <v-toolbar
      absolute
      dark
      dense
      flat
      color="secondary"
      width="100%"
      height="35px"
    >
      <cSearch
        v-model="searchText"
        value=""
        :txt="btns.search.label"
        :entries="searchItems"
        style="width:400px"
      />

      <v-spacer />
      <v-btn
        v-if="btns.submit"
        small
        class="blue white--text"
        :disabled="itemSelected.length < 1"
      >
        {{ btns.submit.label }}
      </v-btn>
      <label class="success--text">
        TAB: {{ tab }} - SELECTED: {{ itemSelected }}
      </label>
    </v-toolbar>

    <v-tabs
      v-model="tab"
      center-active
      grow
      height="32"
      background-color="grey lighten-5 mt-9"
    >
      <v-tab
        v-for="item in tabs"
        :key="item.tab"
        class="subtitle-2 font-weight-bold"
        @change="tabChange(item.type)"
      >
        {{ item.tab }} <i>{{ item.content }}</i>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.id">
        <v-card color="basil" flat>
          <v-sheet
            v-if="item"
            id="scrolling-techniques-3"
            class="overflow-y-auto"
            max-height="600"
          >
            <v-container fluid>
              <v-list>
                <v-list-item-group v-model="itemSelected" multiple>
                  <template v-for="(c, i) in item.child">
                    <v-divider v-if="!c" :key="`divider-${i}`" />
                    <v-list-item
                      v-else
                      :key="`item-${i}`"
                      :value="c.id"
                      active-class="deep-purple--text text--accent-4"
                    >
                      <template #default="{ active, toggle }">
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ i + 1 }}、
                            {{ c.name }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ c.content }}
                          </v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-checkbox
                            :input-value="active"
                            color="deep-purple accent-4"
                            @click="toggle"
                          />
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-container>
          </v-sheet>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import cSearch from '@/components/common/Search/SearchAutocomplete.vue'

export default {
  components: { cSearch },
  data () {
    return {
      btns: {
        search: {
          label: '搜索'
        },
        submit: {
          label: '提交'
        }
      },

      tab: 0, // TAB 当前索引
      tabs: [
        { id: 1, tab: '在线非实时先兆', type: 'fss', content: '' },
        { id: 2, tab: '检修先兆', type: 'jx', content: '' },
        { id: 3, tab: '试验先兆', type: 'sy', content: '' }
      ],
      // 模拟数据源
      dataItems: [
        {
          id: 100,
          type: 'fss',
          child: [
            {
              id: 1,
              name: '经发电机轴接地电刷工况检查发现转子轴接地电刷运行状态不良1',
              content:
                '转子轴接地电刷运行状态不良可能导致发电机轴电压高，增加产生轴电流风险，导致轴颈表面受损、轴瓦及氢气密封装置受损乃至大轴磁化更严重的故障发生。当发现'
            },
            {
              id: 2,
              name: '发电机发生了非全相运行故障 2',
              content:
                '运行中发电机发生非全相运行故障时，将产生较大的负序电流。而负序电流的产生必将引发转子表面过热故障，其故障的严重程度将与负序电流的大小和负序电流持续'
            },
            {
              id: 3,
              name: '发电机发生了不对称短路故障 3',
              content:
                '运行中发电机发生不对称短路故障后，可能会引发出转子因负序产生过热及定子绕组的多种故障。所以故障停机后，应进行提交，并按照专家系统的建议做进一步的检'
            },
            {
              id: 4,
              name: '发电机发生了异步启动故障 4',
              content:
                '发电机发生异步启动故障后将引发出转子表面过热故障。所以故障停机后，应进行提交，并按照专家系统的建议做进一步的检查。'
            },
            {
              id: 5,
              name: '密封油过滤器压降高 5',
              content:
                '这是密封油过滤器堵塞的先兆，它可能诱发氢气漏入主油系统，运行中当密封油过滤器压降高报警时，应进行提交，并按照专家系统的建议进行检查处理。'
            }
          ]
        },
        {
          id: 101,
          type: 'jx',
          child: [
            {
              id: 11,
              name:
                '11 经发电机轴接地电刷工况检查发现转子轴接地电刷运行状态不良2',
              content:
                '转子轴接地电刷运行状态不良可能导致发电机轴电压高，增加产生轴电流风险，导致轴颈表面受损、轴瓦及氢气密封装置受损乃至大轴磁化更严重的故障发生。当发现'
            },
            {
              id: 12,
              name: '12 发电机发生了非全相运行故障',
              content:
                '运行中发电机发生非全相运行故障时，将产生较大的负序电流。而负序电流的产生必将引发转子表面过热故障，其故障的严重程度将与负序电流的大小和负序电流持续'
            },
            {
              id: 13,
              name: '13 发电机发生了不对称短路故障',
              content:
                '运行中发电机发生不对称短路故障后，可能会引发出转子因负序产生过热及定子绕组的多种故障。所以故障停机后，应进行提交，并按照专家系统的建议做进一步的检'
            },
            {
              id: 14,
              name: '14 发电机发生了异步启动故障',
              content:
                '发电机发生异步启动故障后将引发出转子表面过热故障。所以故障停机后，应进行提交，并按照专家系统的建议做进一步的检查。'
            },
            {
              id: 15,
              name: '15 密封油过滤器压降高',
              content:
                '这是密封油过滤器堵塞的先兆，它可能诱发氢气漏入主油系统，运行中当密封油过滤器压降高报警时，应进行提交，并按照专家系统的建议进行检查处理。'
            }
          ]
        },
        {
          id: 102,
          type: 'sy',
          child: [
            {
              id: 21,
              name:
                '21 经发电机轴接地电刷工况检查发现转子轴接地电刷运行状态不良3',
              content:
                '转子轴接地电刷运行状态不良可能导致发电机轴电压高，增加产生轴电流风险，导致轴颈表面受损、轴瓦及氢气密封装置受损乃至大轴磁化更严重的故障发生。当发现'
            },
            {
              id: 22,
              name: '22 发电机发生了非全相运行故障',
              content:
                '运行中发电机发生非全相运行故障时，将产生较大的负序电流。而负序电流的产生必将引发转子表面过热故障，其故障的严重程度将与负序电流的大小和负序电流持续'
            },
            {
              id: 23,
              name: '23 发电机发生了不对称短路故障',
              content:
                '运行中发电机发生不对称短路故障后，可能会引发出转子因负序产生过热及定子绕组的多种故障。所以故障停机后，应进行提交，并按照专家系统的建议做进一步的检'
            },
            {
              id: 24,
              name: '24 发电机发生了异步启动故障',
              content:
                '发电机发生异步启动故障后将引发出转子表面过热故障。所以故障停机后，应进行提交，并按照专家系统的建议做进一步的检查。'
            },
            {
              id: 25,
              name: '25 密封油过滤器压降高',
              content:
                '这是密封油过滤器堵塞的先兆，它可能诱发氢气漏入主油系统，运行中当密封油过滤器压降高报警时，应进行提交，并按照专家系统的建议进行检查处理。'
            }
          ]
        }
      ],
      // 缓存数据，操作数据源
      items: [],
      itemSelected: [], // 选择的先兆ID数组数据
      selectedType: null, // 当前选择的TAB对应的type类型(string)
      searchItems: [] // buffer search data items(include filter by key words of searching)
    }
  },
  computed: {
    searchText: {
      get () {
        return ''
      },
      set (val) {
        // 处理过滤内容，修改searchItems
        const self = this
        if (self.searchItems && val) {
          // const currentItem = self.items.find(
          //   (item) => item.type === self.selectedType
          // )
          for (const idx in self.items) {
            const item = self.items[idx]
            if (item.type === self.selectedType) {
              item.child = self.searchItems.filter(c => c.name.includes(val))
              break
            }
          }
        } else {
          self.initContentData()
          self.initSearchData()
        }

        return val || ''
      }
    }
  },
  created () {
    this.initContentData()
    this.tabChange(this.tabs[0].type)

    /*
      1. Init Content Data --- items = dataItems
      2. Init Search Data   ---  searchItems
      3. Search Text Change
         Has key words -> Init Search Data --- searchItems
         Has Null key word -> Init Content Data & Init Search Data
    */
  },
  methods: {
    initContentData () {
      this.items = JSON.parse(JSON.stringify(this.dataItems)) // copy object
    },
    initSearchData () {
      const self = this
      self.dataItems.forEach((item) => {
        if (item.type === self.selectedType) {
          self.searchItems = item.child
        }
      })
    },
    tabChange (type) {
      this.itemSelected = []
      this.searchItems = []
      this.searchText = ''

      this.selectedType = type
      this.initSearchData()
    }
  }
}
</script>

<style lang="scss" scoped>
// @import url(); 引入公共css类
</style>
