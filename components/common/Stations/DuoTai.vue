<template>
  <div class="page">
    <v-card v-if="items" id="hStations" dense class="mx-auto pa-0 ma-0">
      <!-- search box -->
      <v-sheet
        v-if="selection1 && selection1.length > 0"
        dense
        class="pa-0 ma-0 info lighten-5"
      >
        <v-text-field
          v-model="search"
          label="search"
          dark
          flat
          dense
          solo-inverted
          hide-details
          clearable
          full-width
          clear-icon="mdi-close-circle-outline"
          class="font-weight-light"
        />
      </v-sheet>
      <v-card-text class="secondary darken-5">
        <v-treeview
          v-if="items && items[0].children.length"
          v-model="selection"
          item-disabled="locked"
          hoverable
          transition
          return-object
          dense
          :items="items"
          :search="search"
          :open.sync="open"
          :filter="filter"
          item-key="id"
          open-all
          :load-children="LoadChildren"
        >
          <template #label="{ item }">
            <v-chip-group v-model="selection1" dense multiple>
              <div
                v-if="!!item.children"
                :id="`#span_${item.type}_${item.id}`"
                :title="item.name"
              >
                <label>{{ item.name }}</label> {{ item.id }}
              </div>
              <div v-else :title="item.name">
                <div class="tsitmid">
                  <v-chip
                    v-if="item.type === 'dynamo'"
                    :id="`chip_${item.type}_${item.id}`"
                    filter
                    outlined
                    small
                    text-color="words"
                    :value="item.id"
                    :title="item.id"
                    @change="NodeClick(item)"
                  >
                    {{ item.name }}
                    <label v-if="item.shortName">({{ item.shortName }})</label>
                  </v-chip>
                  <!-- <v-chip-group dense multiple v-model="dynamos"></v-chip-group> -->

                  <v-chip
                    v-if="item.type === 'tsitm'"
                    :id="`chip_${item.type}_${item.id}`"
                    filter
                    outlined
                    small
                    text-color="words"
                    class="nowrap"
                    :value="item.id"
                    @change="NodeClick(item)"
                  >
                    {{ item.name
                    }}<label v-if="item.factDW">({{ item.factDW }})</label>
                  </v-chip>
                  <!-- {{ item.name }} <label v-if="item.factDW">({{ item.factDW }})</label> -->
                </div>
              </div>
            </v-chip-group>
          </template>
        </v-treeview>

        <div v-else class="text-center full-width" style="width: 100%">
          <v-progress-circular
            :size="20"
            color="primary"
            class="stepperProgress"
            indeterminate
          />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import x2js from 'x2js'
import { reqTCategories, reqTsitmes } from '~/api/index.js'

export default {
  components: {},
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
    },
    cType: {
      // dynamosType:false:单台； true:多台
      type: [Boolean, String],
      default: false, // default has close button in compoent
      required: false
    }
  },
  data () {
    return {
      // items: [
      //   {
      //     id: -1,
      //     name: '监测量',
      //     locked: false,
      //     type: 'root',
      //     children: []
      //   }
      // ],
      data: [],
      active: [1101, 1102],
      // 可同步属性，允许您控制打开哪些节点。 该数组由每个打开项目的 item-key 组成。
      open: [1, 2],
      selection: [],
      selection1: [],
      dynamos: [],
      search: null,
      duoTaiData: [
        // {
        //  dtypeId: 100, // 机型ID
        //  dynamo: [19], // 机组数据
        //  tsitm: [1001], // 监测量数据
        //  jianCeLiang: [...]
        // },
        // {
        //  dtypeId: 101, // 机型ID
        //  dynamo: [20,21,22], // 机组数据
        //  tsitm: [1001,1002,1003], // 监测量数据
        //  jianCeLiang: [...]
        // }
      ]
    }
  },
  computed: {
    filter () {
      return (item, search, textKey) => item[textKey].includes(search)
    },
    items () {
      return [
        {
          id: -1,
          name: '监测量',
          locked: false,
          type: 'root',
          children: this.data
        }
      ]
    },
    selected () {
      if (!this.active.length) {
        return undefined
      }
      const id = this.active[0]

      return this.users.find(user => user.id === id)
    }
  },
  watch: {
    active: {
      deep: true,
      handler () {
        // this.selected.id = this.active[0].id
        // 通过$emit触发input（model内定义）事件，将内部值传递给给父组件
        // this.$emit('input', this.active)
      }
    },
    selection1: {
      deep: true,
      handler () {
        this.$emit('input', this.duoTaiData)
      }
    }
  },
  mounted () {
    const self = this
    // self.hInit()
    // self.GetTCategories()
    self.LoadChildren({ type: 'root', children: [] })
  },
  methods: {
    hInit () {},
    async LoadChildren (item) {
      if (item.type === 'root' && item.children.length === 0) {
        await this.GetTCategories(item)
      }

      if (item.type === 'item' && item.children.length === 0) {
        this.GetTsitmes(item, item.cTypeId)
      }

      return () => {}
    },
    // 获取多台-机型+机组+项目数据
    async GetTCategories (item, $axios) {
      const self = this
      const data = await reqTCategories(-1, $axios)

      // JSON Data from server: GetTCategory > Dtype > Dynamos
      if (data && data.GetTCategory && data.GetTCategory.Dtype) {
        const dTypes = data.GetTCategory.Dtype
        const rData = []

        // 遍历机型
        for (const dtype of dTypes) {
          // 机型
          const dtypeData = {
            id: dtype._ID,
            name: dtype._Descr,
            type: 'dtype',
            locked: false,
            children: []
          }

          // 机组
          const arrDynamos = []
          if (typeof dtype.Dynamos.Dynamo !== 'undefined') {
            if (typeof dtype.Dynamos.Dynamo.length === 'undefined') {
              dtype.Dynamos.Dynamo = [dtype.Dynamos.Dynamo]
            }

            // 多个机组的需要遍历
            dtype.Dynamos.Dynamo.map((dynamo) => {
              dtypeData.children.push({
                id: dynamo._ID,
                name: dynamo._Descr,
                type: 'dynamo',
                shortName: dynamo._ShortNM,
                dtypeId: dtypeData.id,
                locked: false
              })
              return null
            })
          }
          // else{
          //   const dynamo = dtype.Dynamos.Dynamo || null

          //   if( dynamo ){
          //     // 单个机组的不需要遍历
          //     dtypeData.children.push({
          //       id: dynamo._ID,
          //       name: dynamo._Descr,
          //       type: 'dynamo',
          //       shortName: dynamo._ShortNM,
          //       dtypeId: dtypeData.id,
          //       locked: false
          //     })
          //   }
          // }

          self.duoTaiData.push({
            dtypeId: dtypeData.id, // 机型ID
            dynamo: arrDynamos, // 机组数据
            tsitm: [], // 监测量数据
            jianCeLiang: null
          })

          // 项目
          if (
            dtype.Categorys &&
            dtype.Categorys.Type &&
            dtype.Categorys.Type.length > 0
          ) {
            for (const category of dtype.Categorys.Type) {
              dtypeData.children.push({
                id: category._Tag,
                name: category._TagName,
                type: 'item',
                cTypeId: dtypeData.id,
                ord: category._Ord,
                attr: category._ItemAttr,
                locked: false,
                children: []
              })
            }
          }
          rData.push(dtypeData)
        }

        if (rData) {
          self.data = rData
          // self.items[0].children = rData

          return () => {
            // item.children = rData
          }
        }
      } else {
        // 离线数据
        self.data = [
          // self.items[0].children = [
          {
            // 机型
            id: 100,
            name: 'D1发电机',
            locked: false,
            type: 'dType',
            children: [
              {
                // 机组
                id: 1,
                name: '大亚湾一号机',
                shortName: 'D1',
                type: 'dynamo',
                locked: false
              },
              {
                // 项目
                id: 11,
                name: '发电机工况',
                locked: false,
                type: 'item',
                cTypeId: 0,
                // 监测量
                children: []
              },
              {
                // 项目
                id: 12,
                name: '线棒出水温度',
                type: 'item',
                cTypeId: 1,
                // 监测量
                children: []
              }
            ]
          },
          {
            id: 101,
            name: 'D2L1L2电发机',
            locked: false,
            type: 'dType',
            children: [
              {
                // 机组
                id: 20,
                name: '大亚湾二号机',
                shortName: 'D2',
                type: 'dynamo',
                locked: false
              },
              {
                // 机组
                id: 21,
                name: '岭东一号机',
                shortName: 'L1',
                type: 'dynamo',
                locked: false
              },
              {
                // 机组
                id: 22,
                name: '岭东二号机',
                shortName: 'L2',
                type: 'dynamo',
                locked: false
              },
              {
                // 项目
                id: 41,
                name: '发电机工况',
                locked: false,
                type: 'item',
                cTypeId: 2,
                // 监测量
                children: []
              },
              {
                // 项目
                id: 42,
                name: '线棒出水温度',
                locked: false,
                type: 'item',
                cTypeId: 3,
                children: []
              }
            ]
          }
        ]
      }
    },
    // 获取多台-监测量数据
    async GetTsitmes (item, dType) {
      const data = await reqTsitmes(-1, dType, 0)

      if (data && typeof data.category !== 'undefined') {
        const data1 = data
        if (data1 && data1.Category && data1.Category.TestItem) {
          const dType = data1.Category.DType || -1
          const items = data1.Category.TestItem || []
          const children = []

          items &&
            items.map((testItem) => {
              // {_TsitmID: "1001", _Name: "GEX402MWT_发电机有功（MW）", _TsItmNM: "发电机有功功率（MW）", _DUnvName: "GEX402MWT_发电机有功（MW）", _FactDW: "MW
              children.push({
                id: testItem._TsitmID,
                dtypeId: dType,
                dynamo_id: item.dynamo_id,
                name: testItem._Name,
                tsitmNM: testItem._TsItmNM,
                dunvName: testItem._DUnvName,
                factDW: testItem._FactDW,
                typeTag: testItem._TypeTag,
                locked: false,
                type: 'tsitm'
              })
              return null
            })

          this.duoTaiData.jianCeLiang = children
          this.duoTaiData.type = 'multiple'
          return () => {
            item.children = children
          }
        }
      } else {
        // 离线数据
        let xmlData =
          '<?xml version="1.0" encoding="GB2312" ?><Category Dynamo="-1" DType="100" Cat="0"><TestItem TsitmID="1001" Name="GEX402MWT_发电机有功（MW）" TsItmNM="发电机有功功率（MW）" DUnvName="GEX402MWT_发电机有功（MW）" FactDW="MW" TypeTag="0"/><TestItem TsitmID="1002" Name="GEX403MQT_发电机无功（Mvar）" TsItmNM="发电机无功功率（Mvar）" DUnvName="GEX403MQT_发电机无功（Mvar）" FactDW="Mvar" TypeTag="0"/><TestItem TsitmID="1003" Name="GEX404MUT_定子电压U-V（kV）" TsItmNM="发电机定子电压Uab（kV）" DUnvName="GEX404MUT_定子电压U-V（kV）" FactDW="kV" TypeTag="0"/><TestItem TsitmID="1004" Name="GEX405MUT_定子电压V-W（kV）" TsItmNM="发电机定子电压Ubc（kV）" DUnvName="GEX405MUT_定子电压V-W（kV）" FactDW="kV" TypeTag="0"/><TestItem TsitmID="1005" Name="GEX406MUT_定子电压W-U（kV）" TsItmNM="发电机定子电压Uca（kV）" DUnvName="GEX406MUT_定子电压W-U（kV）" FactDW="kV" TypeTag="0"/><TestItem TsitmID="1006" Name="GEX408MIT_U相定子电流（kA）" TsItmNM="发电机A相电流（kA）" DUnvName="GEX408MIT_U相定子电流（kA）" FactDW="kA" TypeTag="0"/><TestItem TsitmID="1007" Name="GEX409MIT_V相定子电流（kA）" TsItmNM="发电机B相电流（kA）" DUnvName="GEX409MIT_V相定子电流（kA）" FactDW="kA" TypeTag="0"/><TestItem TsitmID="1008" Name="GEX410MIT_W相定子电流（kA）" TsItmNM="发电机C相电流（kA）" DUnvName="GEX410MIT_W相定子电流（kA）" FactDW="kA" TypeTag="0"/><TestItem TsitmID="7048" Name="功率因数" TsItmNM="功率因数" DUnvName="功率因数" FactDW="" TypeTag="0"/><TestItem TsitmID="2101" Name="GST002MD_定子冷却水流量（m3/h）" TsItmNM="定子冷却水流量1（t/h）" DUnvName="GST002MD_定子冷却水流量（m3/h）" FactDW="m3/h" TypeTag="4"/><TestItem TsitmID="2102" Name="GST004MP_定冷水入口压力（kPa）" TsItmNM="定子水入口压力1（kPa）" DUnvName="GST004MP_定冷水入口压力（kPa）" FactDW="kPa" TypeTag="4"/><TestItem TsitmID="2103" Name="GST001MT_定子冷却水进口温度（℃）" TsItmNM="定子冷却水进水温度1（℃）" DUnvName="GST001MT_定子冷却水进口温度（℃）" FactDW="℃" TypeTag="4"/><TestItem TsitmID="2104" Name="GST002MT_定子冷却水出口温度（℃）" TsItmNM="定子冷却水出水温度1（℃）" DUnvName="GST002MT_定子冷却水出口温度（℃）" FactDW="℃" TypeTag="4"/><TestItem TsitmID="14001" Name="发电机氢气压力（单流环式）（kPa）" TsItmNM="发电机氢气压力（单流环式）1" DUnvName="发电机氢气压力（单流环式）（kPa）" FactDW="kPa" TypeTag="5"/><TestItem TsitmID="7083" Name="冷氢温度平均值_411、412、413、414MT平均值" TsItmNM="冷氢温度平均值" DUnvName="冷氢温度平均值_411、412、413、414MT平均值" FactDW="℃" TypeTag="6"/><TestItem TsitmID="7084" Name="热氢温度平均值_401、402、403、404MT平均值" TsItmNM="热氢温度平均值" DUnvName="热氢温度平均值_401、402、403、404MT平均值" FactDW="℃" TypeTag="6"/><TestItem TsitmID="7085" Name="氢气温度平均值_401、402、403、404、411、412、413、414MT平均值" TsItmNM="氢气温度平均值" DUnvName="氢气温度平均值_401、402、403、404、411、412、413、414MT平均值" FactDW="℃" TypeTag="6"/></Category>'

        if (dType !== 100) {
          const str1 = 'DType="' + dType
          xmlData = xmlData.replace(/DType="100/g, str1)

          const str2 =
            'TsitmID="' + (parseInt(dType.substring(dType.length - 1), 10) + 1)
          xmlData = xmlData.replace(/TsitmID="1/g, str2)
        }

        // eslint-disable-next-line new-cap
        const data1 = new x2js().xml2js(xmlData)
        if (data1 && data1.Category && data1.Category.TestItem) {
          const items = data1.Category.TestItem || []
          const children = []

          items &&
            items.map((testItem) => {
              // {_TsitmID: "1001", _Name: "GEX402MWT_发电机有功（MW）", _TsItmNM: "发电机有功功率（MW）", _DUnvName: "GEX402MWT_发电机有功（MW）", _FactDW: "MW
              children.push({
                id: testItem._TsitmID,
                dtypeId: data1.Category._DType || -1,
                dynamo_id: item.id,
                name: testItem._Name,
                tsitmNM: testItem._TsItmNM,
                dunvName: testItem._DUnvName,
                factDW: testItem._FactDW,
                typeTag: testItem._TypeTag,
                locked: false,
                type: 'tsitm'
              })
              return null
            })

          item.children = children

          this.duoTaiData.jianCeLiang = children
          this.duoTaiData.type = 'multiple'

          return () => {
            item.children = children
          }
        }
      }
    },
    NodeClick (item) {
      const self = this
      const data =
        self.duoTaiData.find(d => d.dtypeId === item.dtypeId) || null
      if (data) {
        let index = -1
        if (data[item.type].length > 0) {
          index = data[item.type].findIndex(d => d.id === item.id)
        }

        if (index > -1) {
          // 删除添加过的
          data[item.type].splice(index, 1)
        } else {
          // 添加新的
          data[item.type].push(item)
        }
      }
      // self.duoTaiData.push({
      //   dtypeId: dtypeData.id,
      //   dynamo: arrDynamos,
      //   tsitm: []
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
#hStations{
  min-width: 240px !important;
  .v-card__text{
    padding: 0;
    .stepperProgress{
      min-height: 400px !important;
    }
    >>> .v-treeview-node__level{
      width: 13px !important;
    }
  }
}

.tsitmid{
  display: inline-block;
  min-width: 150px;
  font-size: 13px;
  color: success;
}

>>> .v-slide-group{
  display: block;
}

>>> .v-slide-group__next>i{
  display: none;
}
</style>
