<!-- page info:  -->
<template>
  <div class="page_gongkuangbiaozhulist">
    <!-- <v-sheet class="secondary lighten-1">
      <v-text-field
        id="searchTextField"
        v-model="search"
        label="搜索"
        dense
        light
        solo-inverted
        hide-details
        clearable
        append-icon="mdi-"
      ></v-text-field>
      <v-tooltip bottom activator="#searchTextField"><span>搜索指定的工况标注</span></v-tooltip>
    </v-sheet> -->
    <div absolute top light dense width="100%">
      <cSearch
        v-model="search"
        :value="search"
        :txt="btns.search.label"
        :entries="searchItems"
      />
    </div>
    {{ selectChips }}
    <v-treeview
      v-if="staionItems"
      dense
      open-on-click
      transition
      :hoverable="true"
      :multiple-active="dynamosType"
      open-all
      color="primary"
      item-disabled="disabled"
      :items="staionItems"
      :active.sync="active"
      :open.sync="open"
      :search="search"
      :filter="filter"
      @update:active="updateActive"
    >
      <!-- @update:active="updateActive" -->
      <template #label="{ item }">
        <label v-if="!!item.children">
          {{ item.name }}
        </label>
        <label v-else>
          <span>
            <!-- 工况标注列表 -->
            <v-chip-group
              v-model="selectChips"
              column
              multiple
              class="chips_group"
              :sub-group="true"
            >
              <v-chip
                filter
                small
                outlined
                text-color="primary"
                :value="item.id"
                @click.prevent="chipSelect(value, item)"
              >
                <span :id="`chip_${item.id}`">
                  {{ item.name }} - {{ item.labelTime }}
                </span>
                <v-tooltip
                  v-if="item.labelTime"
                  bottom
                  :activator="`#chip_${item.id}`"
                ><span v-text="item.labelTime" /></v-tooltip>

                <v-menu offset-y>
                  <template #activator="{ on }">
                    <v-icon
                      v-if="item.reserved === 1"
                      small
                      right
                      @click.stop="add(item.id, item.reserved)"
                      v-on="on"
                    >
                      mdi-message-plus-outline
                    </v-icon>

                    <v-icon
                      v-else-if="item.reserved === 0"
                      small
                      right
                      @click.stop="del(item.id)"
                    >
                      mdi-minus
                    </v-icon>
                    <span v-else />
                  </template>

                  <stableList
                    v-if="isStableList || false"
                    v-model="selectedStableList"
                    :current-item="item"
                    @syncSelectStableList="syncSelectStableList"
                  />
                </v-menu>
              </v-chip>
            </v-chip-group>
          </span>
        </label>
      </template>
    </v-treeview>
  </div>
</template>

<script>
import cSearch from '@/components/common/Search/'
import stableList from '@/components/common/StableList'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    cSearch,
    stableList
  },
  // 定义model
  model: {
    prop: 'value', // 绑定prop传递的值
    event: 'input' // 定义触发事件名称
  },
  props: {
    // 接受父组件传递的值
    value: {
      type: [String, Array],
      default: () => {},
      required: true
    }
  },
  data () {
    return {
      title: '工况标注列表',
      menuStableList: false,
      dynamosType: false, // false:单台； true:多台
      active: [],
      stations: null,
      staionItems: null,
      items: [
        {
          name: '最近稳定点ZZZ当前最近一个稳定点',
          id: 999,
          reserved: 1,
          labelTime: null,
          dynamoType: 1022,
          dynamo: 19,
          disabled: false
        },
        {
          name: '当前时间ZZZ当前时间',
          id: 1000,
          reserved: 3,
          labelTime: '2020-09-06 11:04:00',
          dynamoType: 1022,
          dynamo: 19,
          disabled: false
        },
        {
          name: '最近整点ZZZ最近整点',
          id: 1001,
          reserved: 4,
          labelTime: '2020-09-06 11:00:00',
          dynamoType: 1022,
          dynamo: 19,
          disabled: false
        },
        {
          name: '当天ZZZ当天的当前整点',
          id: 1002,
          reserved: 5,
          labelTime: '2020-09-06 00:00:00',
          dynamoType: 1022,
          dynamo: 19,
          disabled: false
        },
        {
          name: '最近启机后ZZZ最近一次启机[12]',
          id: 1004,
          reserved: 2,
          labelTime: '2020-01-02 00:00:00',
          dynamoType: 1022,
          dynamo: 19,
          disabled: false
        },
        {
          name: '最近停机前ZZZ最近一次停机前满功率[12]',
          id: 1003,
          reserved: 6,
          labelTime: '2020-01-02 00:00:00',
          dynamoType: 1022,
          dynamo: 19,
          disabled: false
        },
        {
          name: 'test01ZZZtest 01 details',
          id: 1030,
          reserved: 0,
          labelTime: '2020-08-22 15:10:00',
          dynamoType: 1022,
          dynamo: 19,
          disabled: false
        },
        {
          name: 'test02ZZZtest 02 details',
          id: 1031,
          reserved: 0,
          labelTime: '2020-08-23 15:10:00',
          dynamoType: 1022,
          dynamo: 19,
          disabled: false
        },
        {
          name: 'test03ZZZtest 03 details',
          id: 1032,
          reserved: 0,
          labelTime: '2020-08-24 15:10:00',
          dynamoType: 1022,
          dynamo: 19,
          disabled: false
        },
        {
          name: 'test04ZZZtest 04 details',
          id: 1033,
          reserved: 0,
          labelTime: '2020-08-25 15:10:00',
          dynamoType: 1022,
          dynamo: 19,
          disabled: false
        },
        {
          name: 'test05ZZZtest 05 details',
          id: 1034,
          reserved: 0,
          labelTime: '2020-08-26 15:10:00',
          dynamoType: 1022,
          dynamo: 19,
          disabled: false
        },

        {
          name: '最近稳定点ZZZ当前最近一个稳定点',
          id: 1006,
          reserved: 1,
          labelTime: null,
          dynamoType: 1022,
          dynamo: 20,
          disabled: false
        },
        {
          name: '当前时间ZZZ当前时间',
          id: 1007,
          reserved: 3,
          labelTime: '2020-09-06 11:04:00',
          dynamoType: 1022,
          dynamo: 20,
          disabled: false
        },
        {
          name: '最近整点ZZZ最近整点',
          id: 1008,
          reserved: 4,
          labelTime: '2020-09-06 11:00:00',
          dynamoType: 1022,
          dynamo: 20,
          disabled: false
        },
        {
          name: '当天ZZZ当天的当前整点',
          id: 1009,
          reserved: 5,
          labelTime: '2020-09-06 00:00:00',
          dynamoType: 1022,
          dynamo: 20,
          disabled: false
        },
        {
          name: '最近启机后ZZZ最近一次启机[12]',
          id: 1010,
          reserved: 2,
          labelTime: '2020-01-02 00:00:00',
          dynamoType: 1022,
          dynamo: 20,
          disabled: false
        },
        {
          name: '最近停机前ZZZ最近一次停机前满功率[12]',
          id: 1011,
          reserved: 6,
          labelTime: '2020-01-02 00:00:00',
          dynamoType: 1022,
          dynamo: 20,
          disabled: false
        },
        {
          name: 'test11ZZZtest 11 details',
          id: 1040,
          reserved: 0,
          labelTime: '2020-05-22 15:10:00',
          dynamoType: 1022,
          dynamo: 20,
          disabled: false
        },
        {
          name: 'test12ZZZtest 12 details',
          id: 1041,
          reserved: 0,
          labelTime: '2020-05-23 15:10:00',
          dynamoType: 1022,
          dynamo: 20,
          disabled: false
        },
        {
          name: 'test13ZZZtest 13 details',
          id: 1042,
          reserved: 0,
          labelTime: '2020-05-24 15:10:00',
          dynamoType: 1022,
          dynamo: 20,
          disabled: false
        },
        {
          name: 'test14ZZZtest 14 details',
          id: 1043,
          reserved: 0,
          labelTime: '2020-05-25 15:10:00',
          dynamoType: 1022,
          dynamo: 20,
          disabled: false
        },
        {
          name: 'test15ZZZtest 15 details',
          id: 1044,
          reserved: 0,
          labelTime: '2020-05-26 15:10:00',
          dynamoType: 1022,
          dynamo: 20,
          disabled: false
        },

        {
          name: '最近稳定点ZZZ当前最近一个稳定点',
          id: 1013,
          reserved: 1,
          labelTime: null,
          dynamoType: 1022,
          dynamo: 22,
          disabled: false
        },
        {
          name: '当前时间ZZZ当前时间',
          id: 1018,
          reserved: 3,
          labelTime: '2020-09-06 11:04:00',
          dynamoType: 1022,
          dynamo: 22,
          disabled: false
        },
        {
          name: '最近整点ZZZ最近整点',
          id: 1019,
          reserved: 4,
          labelTime: '2020-09-06 11:00:00',
          dynamoType: 1022,
          dynamo: 22,
          disabled: false
        },
        {
          name: '当天ZZZ当天的当前整点',
          id: 1020,
          reserved: 5,
          labelTime: '2020-09-06 00:00:00',
          dynamoType: 1022,
          dynamo: 22,
          disabled: false
        },
        {
          name: '最近启机后ZZZ最近一次启机[12]',
          id: 1021,
          reserved: 2,
          labelTime: '2020-01-02 00:00:00',
          dynamoType: 1022,
          dynamo: 22,
          disabled: false
        },
        {
          name: '最近停机前ZZZ最近一次停机前满功率[12]',
          id: 1022,
          reserved: 6,
          labelTime: '2020-01-02 00:00:00',
          dynamoType: 1022,
          dynamo: 22,
          disabled: false
        },
        {
          name: 'test21ZZZtest 21 details',
          id: 1050,
          reserved: 0,
          labelTime: '2020-01-22 15:10:00',
          dynamoType: 1022,
          dynamo: 22,
          disabled: false
        },
        {
          name: 'test22ZZZtest 22 details',
          id: 1051,
          reserved: 0,
          labelTime: '2020-01-23 15:10:00',
          dynamoType: 1022,
          dynamo: 22,
          disabled: false
        },
        {
          name: 'test23ZZZtest 23 details',
          id: 1052,
          reserved: 0,
          labelTime: '2020-01-24 15:10:00',
          dynamoType: 1022,
          dynamo: 22,
          disabled: false
        },
        {
          name: 'test24ZZZtest 24 details',
          id: 1053,
          reserved: 0,
          labelTime: '2020-01-25 15:10:00',
          dynamoType: 1022,
          dynamo: 22,
          disabled: false
        },
        {
          name: 'test25ZZZtest 25 details',
          id: 1054,
          reserved: 0,
          labelTime: '2020-01-26 15:10:00',
          dynamoType: 1022,
          dynamo: 22,
          disabled: false
        },

        {
          name: '最近稳定点ZZZ当前最近一个稳定点',
          id: 1049,
          reserved: 1,
          labelTime: null,
          dynamoType: 1022,
          dynamo: 23,
          disabled: false
        },
        {
          name: '当前时间ZZZ当前时间',
          id: 1058,
          reserved: 3,
          labelTime: '2020-09-06 11:04:00',
          dynamoType: 1022,
          dynamo: 23,
          disabled: false
        },
        {
          name: '最近整点ZZZ最近整点',
          id: 1059,
          reserved: 4,
          labelTime: '2020-09-06 11:00:00',
          dynamoType: 1022,
          dynamo: 23,
          disabled: false
        },
        {
          name: '当天ZZZ当天的当前整点',
          id: 888,
          reserved: 5,
          labelTime: '2020-09-06 00:00:00',
          dynamoType: 1022,
          dynamo: 23,
          disabled: false
        },
        {
          name: '最近启机后ZZZ最近一次启机[12]',
          id: 889,
          reserved: 2,
          labelTime: '2020-01-02 00:00:00',
          dynamoType: 1022,
          dynamo: 23,
          disabled: false
        },
        {
          name: '最近停机前ZZZ最近一次停机前满功率[12]',
          id: 890,
          reserved: 6,
          labelTime: '2020-01-02 00:00:00',
          dynamoType: 1022,
          dynamo: 23,
          disabled: false
        },
        {
          name: 'test31ZZZtest 31 details',
          id: 1060,
          reserved: 0,
          labelTime: '2020-03-22 15:10:00',
          dynamoType: 1022,
          dynamo: 23,
          disabled: false
        },
        {
          name: 'test32ZZZtest 32 details',
          id: 1061,
          reserved: 0,
          labelTime: '2020-03-23 15:10:00',
          dynamoType: 1022,
          dynamo: 23,
          disabled: false
        },
        {
          name: 'test33ZZZtest 33 details',
          id: 1062,
          reserved: 0,
          labelTime: '2020-03-24 15:10:00',
          dynamoType: 1022,
          dynamo: 23,
          disabled: false
        },
        {
          name: 'test34ZZZtest 34 details',
          id: 1063,
          reserved: 0,
          labelTime: '2020-03-25 15:10:00',
          dynamoType: 1022,
          dynamo: 23,
          disabled: false
        },
        {
          name: 'test35ZZZtest 35 details',
          id: 1064,
          reserved: 0,
          labelTime: '2020-03-26 15:10:00',
          dynamoType: 1022,
          dynamo: 23,
          disabled: false
        }
      ],
      lists: [
        {
          action: 'mdi-file-tree',
          title: '发电机工况',
          chks: [10, 12],
          items: null
        }
      ],
      amenities: [1, 4],
      model: ['Carrots'],
      open: [1, 2, 3], // 默认展开的层级
      search: '',
      btns: {
        search: {
          label: '搜索'
        }
      },
      searchItems: [],
      selectChips: [],
      isStableList: false,
      selectedStableList: []
    }
  },
  // 监听属性 类似于data概念
  computed: {
    filter () {
      return (item, search, textKey) => item[textKey].includes(search)
    }
  },
  // 监控data中的数据变化
  watch: {
    selectChips: {
      // deep: true,
      handler (val) {
        // 通过$emit触发input（model内定义）事件，将内部值传递给给父组件
        const arrSelect = []
        this.selectChips.forEach((sc) => {
          arrSelect.push(this.items.find(item => item.id === sc))
        })
        window.console.log('arrSelect = ', arrSelect)
        this.$emit('input', arrSelect)
      },
      immediate: true
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // created
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.selectChips = this.value

    this.lists.items = this.items
    // ----------------
    this.hInit()
    // ----------------
  },
  // 方法集合
  methods: {
    hInit () {
      const self = this
      const s = self.$t('system')

      if (self.$store.state.user.info) {
        // 根据登录用户的权限属性更新
        const userDynamos = self.$store.state.user.info.dynamos || null
        if (userDynamos) {
          const dynamos = userDynamos.map((d) => {
            return d.disabled === false
          })

          s.stations.items.forEach((item, itemIndex) => {
            if (item.children) {
              item.children.forEach((c, index) => {
                if (
                  dynamos &&
                  dynamos[0] === -1 &&
                  itemIndex === 0 &&
                  index === 0
                ) {
                  c.selected = true
                }

                if (dynamos && (dynamos.includes(c.id) || dynamos[0] === -1)) {
                  item.selected = true
                  c.disabled = false
                } else {
                  item.selected = false
                  c.disabled = true
                }

                const lists =
                  self.items.filter((item) => {
                    return item.dynamo === c.id
                  }) || null
                if (lists) {
                  lists.forEach((list) => {
                    if (list.name && list.name.includes('ZZZ')) {
                      list.name = list.name.split('ZZZ')[0]
                    }
                  })
                  c.children = null
                  c.children = lists
                }
              })
            }
          })
        }
      }
      self.stations = s.stations
      self.staionItems = s.stations.items
    },
    // 点击节点的时候 会触发该函数
    updateActive (selectedId) {},
    chipSelect (chip, item) {
      const self = this
      // 避免无日期的工况标注被选中
      setTimeout(() => {
        if (item && item.labelTime === null) {
          self.selectChips.splice(
            self.selectChips.findIndex(s => s.id === item.id),
            1
          )
        }
      }, 100)
      return false
    },
    add (id, reserved) {
      if (reserved === 1) {
        // 稳定点追加
        // 打开稳定点列表弹出窗口（窗口加载对应组件）
        this.isStableList = true
        return false
      } else {
        this.isStableList = false
        alert('add: ' + id, reserved)
      }
    },
    del (id) {
      alert('delete: ' + id)
    },
    syncSelectStableList (date, item) {
      if (this.isStableList === true) {
        item.labelTime = date
        // if (!this.selectChips.includes(item.id)) {
        //   this.selectChips.push(item.id)
        // }
      }
    }
  }
  // beforeCreate () {}, // 生命周期 - 创建之前
  // beforeMount () {}, // 生命周期 - 挂载之前
  // beforeUpdate () {}, // 生命周期 - 更新之前
  // updated () {}, // 生命周期 - 更新之后
  // beforeDestroy () {}, // 生命周期 - 销毁之前
  // destroyed () {}, // 生命周期 - 销毁完成
  // activated () {}, // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang="scss" scoped>
>>> .v-chip.v-chip--outlined .v-icon{
    color: #00c58e !important;
    font-size: 16px;
}

>>> .v-treeview-node__level{
  width: 10px !important;
}
</style>
