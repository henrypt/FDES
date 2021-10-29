<template>
  <div class="page">
    <v-responsive max-width="500" class="mx-auto mb-4">
      <v-card v-if="items" id="hStations" dense class="mx-auto pa-0 ma-0">
        <v-card-text class="secondary darken-5">
          {{ selection }}
          <v-treeview
            v-if="items"
            item-disabled="locked"
            hoverable
            transition
            return-object
            dense
            :items="items"
            open-on-click
            :open.sync="open"
            :open-all="false"
            :load-children="LoadChildren"
          >
            <!-- eslint-disable-next-line vue/no-template-shadow -->
            <template #label="{ item, open }">
              <div
                v-if="!!item.children"
                :id="`#span_${item.type}_${item.id}`"
                :title="item.name"
              >
                <label :title="item.id">{{ item.name }}</label>
                <div v-if="open">
                  {{ openTree(item) }}
                </div>
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

                  <v-chip-group
                    v-if="item.type === 'tsitm'"
                    v-model="selection"
                    dense
                    multiple
                  >
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
                      {{ item.name }}
                      <label v-if="item.factDW">({{ item.factDW }})</label>
                    </v-chip>
                    <!-- {{ item.name }} <label v-if="item.factDW">({{ item.factDW }})</label> -->
                  </v-chip-group>
                </div>
              </div>
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
    </v-responsive>
  </div>
</template>

<script>
import { reqTsitmes, reqEquips } from '~/api/index.js'

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
      data: [],
      data2: Array.from({ length: this.length }, (k, v) => v + 1),
      active: [1101, 1102],
      // 可同步属性，允许您控制打开哪些节点。 该数组由每个打开项目的 item-key 组成。
      open: ['DYW'],
      selection: [],
      danTaiData: [
        {
          dtypeId: -1, // 机型ID
          dynamo: [], // 机组数据
          tsitm: [] // 监测量数据
        }
      ],
      jianCeLiang: [],
      type: 'single'
    }
  },
  computed: {
    items () {
      return this.data
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
    selection: {
      deep: true,
      handler () {
        this.$emit('input', this.danTaiData)
      }
    }
  },
  mounted () {
    const self = this
    // self.hInit()
    // self.GetTCategories()
    self.GetEquips()
  },
  methods: {
    openTree (item) {
      const self = this

      if (
        item.id > 0 &&
        self.danTaiData[0].dynamo.length > 0 &&
        self.danTaiData[0].dynamo[0].id !== item.id
      ) {
        // self.selection = []
      } else if (
        self.danTaiData[0].tsitm &&
        self.danTaiData[0].tsitm.length > 0
      ) {
        self.selection = self.danTaiData[0].tsitm.map(item => item.id)
      }
    },
    async GetEquips () {
      const data = await reqEquips()
      if (data && data.Data && data.Data.Station) {
        // const newStations = []
        /*
          发电机设备数据结构
          Station
            TransfGroup
              Dynamo
                PartOrgNo
                  PlateItem
        */
        const stationData = []
        data.Data.Station.map((station, idx) => {
          if (
            station.TransfGroup &&
            typeof station.TransfGroup.length !== 'undefined'
          ) {
            stationData[idx] = {
              id: idx,
              sid: station._ID,
              name: station._Name,
              subAttr: station._SubAttr,
              type: 'station',
              children: []
            }

            // 变压器
            station.TransfGroup.map((t) => {
              // 发电机
              if (typeof t.TransfGroup === 'undefined' && t.Dynamo._ID !== '') {
                // Dynamo: { Descr: '', ShortNM: '', Status: '0', DynamoType: '100', ETypeID: '101', ETypeName: '', StationID: 'DYWD1', OrgNo: 'DYWD1', PartOrgNo: { PlateItem: [...]}}
                const {
                  Descr,
                  ShortNM,
                  DynamoType,
                  ETypeID,
                  ETypeName,
                  StationID,
                  OrgNo
                } = t.Dynamo

                const dynamoData = {
                  id: t.Dynamo._ID,
                  name: Descr,
                  pid: t._ID,
                  pName: t._Name,
                  subAttr: t._SubAttr,
                  descr: Descr,
                  shortName: ShortNM,
                  dynamoType: DynamoType,
                  eTypeID: ETypeID,
                  eTypeName: ETypeName,
                  stationID: StationID,
                  orgNo: OrgNo,
                  type: 'dynamo',
                  children: []
                }

                stationData[idx].children.push(dynamoData)
              } else {
                // 变压器
              }
              return null
            })
          }
          return null
        })

        this.data = stationData
      } else {
        // 离线数据
        this.data = [
          {
            id: 0,
            sid: 'DYW',
            name: '大亚湾核电站',
            subAttr: '0',
            type: 'station',
            children: [
              {
                id: 'DYWD1',
                name: 'D1发电机',
                subAttr: '1',
                descr: '大亚湾一号机',
                shortName: 'D1',
                dynamoType: '100',
                eTypeID: '1001',
                eTypeName: 'D1发电机',
                stationID: 'DYWD1',
                orgNo: 'DYWD1',
                type: 'dynamo',
                children: []
              },
              {
                id: 'DYWD2',
                name: 'D2发电机',
                subAttr: '1',
                descr: '大亚湾二号机',
                shortName: 'D2',
                dynamoType: '101',
                eTypeID: '1011',
                eTypeName: 'D2发电机',
                stationID: 'DYWD2',
                orgNo: 'DYWD2',
                type: 'dynamo',
                children: []
              }
            ]
          },
          {
            id: 1,
            sid: 'HNANYUAN',
            name: '华能江西安源电厂',
            subAttr: '0',
            type: 'station',
            children: [
              {
                id: 'HNANYUAN1',
                name: '安源一号发电机',
                subAttr: '1',
                descr: '一号发电机',
                shortName: '1F',
                dynamoType: '108',
                eTypeID: '1081',
                eTypeName: '安源东电600',
                stationID: 'HNANYUAN1',
                orgNo: 'ANYUAN1F',
                type: 'dynamo',
                children: []
              },
              {
                id: 'HNANYUAN2',
                name: '安源二号发电机',
                subAttr: '1',
                descr: '二号发电机',
                shortName: '2F',
                dynamoType: '108',
                eTypeID: '1081',
                eTypeName: '安源东电600',
                stationID: 'HNANYUAN2',
                orgNo: 'ANYUAN2F',
                type: 'dynamo',
                children: []
              }
            ]
          },
          {
            id: 2,
            sid: 'HNCX',
            name: '长兴电厂',
            subAttr: '0',
            type: 'station',
            children: [
              {
                id: 'HNCX1',
                name: '长兴一号发电机',
                subAttr: '1',
                descr: '一号发电机',
                shortName: '1F',
                dynamoType: '104',
                eTypeID: '1041',
                eTypeName: '长兴发电机',
                stationID: 'HNCX1',
                orgNo: 'HNGX1F',
                type: 'dynamo',
                children: []
              },
              {
                id: 'HNCX2',
                name: '长兴二号发电机',
                subAttr: '1',
                descr: '二号发电机',
                shortName: '2F',
                dynamoType: '104',
                eTypeID: '1041',
                eTypeName: '长兴发电机',
                stationID: 'HNCX2',
                orgNo: 'HNGX2F',
                type: 'dynamo',
                children: []
              }
            ]
          },
          {
            id: 4,
            sid: 'JINING',
            name: '集宁电厂',
            subAttr: '0',
            type: 'station',
            children: [
              {
                id: 'JINING1',
                name: '集宁电厂1号机',
                subAttr: '1',
                descr: '一号发电机',
                shortName: '1F',
                dynamoType: '601',
                eTypeID: '601',
                eTypeName: '集宁发电机',
                stationID: 'JINING1',
                orgNo: 'JINING1F',
                type: 'dynamo',
                children: []
              },
              {
                id: 'JINING2',
                name: '集宁电厂2号机',
                subAttr: '1',
                descr: '二号发电机',
                shortName: '2F',
                dynamoType: '601',
                eTypeID: '601',
                eTypeName: '集宁发电机',
                stationID: 'JINING2',
                orgNo: 'JINING2F',
                type: 'dynamo',
                children: []
              }
            ]
          },
          {
            id: 5,
            sid: 'LA1',
            name: '岭澳核电站一期111',
            subAttr: '0',
            type: 'station',
            children: [
              {
                id: 'DYWL1',
                name: 'L1发电机',
                subAttr: '1',
                descr: '岭澳一号机',
                shortName: 'L1',
                dynamoType: '101',
                eTypeID: '1012',
                eTypeName: 'L1L2发电机',
                stationID: 'DYWL1',
                orgNo: 'DYWL1',
                type: 'dynamo',
                children: []
              },
              {
                id: 'DYWL2',
                name: 'L2发电机',
                subAttr: '1',
                descr: '岭澳二号机',
                shortName: 'L2',
                dynamoType: '101',
                eTypeID: '1012',
                eTypeName: 'L1L2发电机',
                stationID: 'DYWL2',
                orgNo: 'DYWL2',
                type: 'dynamo',
                children: []
              }
            ]
          },
          {
            id: 6,
            sid: 'LA2',
            name: '岭澳核电站二期',
            subAttr: '0',
            type: 'station',
            children: [
              {
                id: 'DYWL3',
                name: 'L3发电机',
                subAttr: '1',
                descr: '岭澳三号机',
                shortName: 'L3',
                dynamoType: '102',
                eTypeID: '1021',
                eTypeName: 'L3L4N2发电机',
                stationID: 'DYWL3',
                orgNo: 'DYWL3',
                type: 'dynamo',
                children: []
              },
              {
                id: 'DYWL4',
                name: 'L4发电机',
                subAttr: '1',
                descr: '岭澳四号机',
                shortName: 'L4',
                dynamoType: '102',
                eTypeID: '1021',
                eTypeName: 'L3L4N2发电机',
                stationID: 'DYWL4',
                orgNo: 'DYWL4',
                type: 'dynamo',
                children: []
              },
              {
                id: 'NDN2',
                name: 'N2发电机',
                subAttr: '1',
                descr: '二号发电机',
                shortName: 'F2',
                dynamoType: '102',
                eTypeID: '1021',
                eTypeName: 'L3L4N2发电机',
                stationID: 'NDN2',
                orgNo: 'NINGDE2',
                type: 'dynamo',
                children: []
              }
            ]
          },
          {
            id: 7,
            sid: 'LAIWU',
            name: '莱芜电厂',
            subAttr: '0',
            type: 'station',
            children: [
              {
                id: 'LAIWU1',
                name: '莱芜一号机',
                subAttr: '1',
                descr: '六号发电机',
                shortName: '6F',
                dynamoType: '109',
                eTypeID: '1091',
                eTypeName: '莱芜上海1000',
                stationID: 'LAIWU1',
                orgNo: 'LAIWU1',
                type: 'dynamo',
                children: []
              },
              {
                id: 'LAIWU2',
                name: '莱芜二号机',
                subAttr: '1',
                descr: '七号发电机',
                shortName: '7F',
                dynamoType: '109',
                eTypeID: '1091',
                eTypeName: '莱芜上海1000',
                stationID: 'LAIWU2',
                orgNo: 'LAIWU2',
                type: 'dynamo',
                children: []
              }
            ]
          },
          {
            id: 8,
            sid: 'NANT',
            name: '南通电厂',
            subAttr: '0',
            type: 'station',
            children: [
              {
                id: 'NANT1',
                name: '南通一号机',
                subAttr: '1',
                descr: '一号发电机',
                shortName: '1F',
                dynamoType: '107',
                eTypeID: '1071',
                eTypeName: '南通上电1000',
                stationID: 'NANT1',
                orgNo: 'NANT1F',
                type: 'dynamo',
                children: []
              },
              {
                id: 'NANT2',
                name: '南通二号机',
                subAttr: '1',
                descr: '二号发电机',
                shortName: '2F',
                dynamoType: '107',
                eTypeID: '1071',
                eTypeName: '南通上电1000',
                stationID: 'NANT2',
                orgNo: 'NANT2F',
                type: 'dynamo',
                children: []
              }
            ]
          },
          {
            id: 9,
            sid: 'NDHD',
            name: '宁德核电站',
            subAttr: '0',
            type: 'station',
            children: [
              {
                id: 'NDHD1',
                name: '宁德一号机',
                subAttr: '1',
                descr: '宁德一号机',
                shortName: 'N1',
                dynamoType: '1022',
                eTypeID: '1022',
                eTypeName: '宁德核电发电机',
                stationID: 'NDHD1',
                orgNo: 'NDHD1',
                type: 'dynamo',
                children: []
              },
              {
                id: 'NDHD2',
                name: '宁德二号机',
                subAttr: '1',
                descr: '宁德二号机',
                shortName: 'N2',
                dynamoType: '1022',
                eTypeID: '1022',
                eTypeName: '宁德核电发电机',
                stationID: 'NDHD2',
                orgNo: 'NDHD2',
                type: 'dynamo',
                children: []
              },
              {
                id: 'NDHD3',
                name: '宁德三号机',
                subAttr: '1',
                descr: '宁德三号机',
                shortName: 'N3',
                dynamoType: '1022',
                eTypeID: '1022',
                eTypeName: '宁德核电发电机',
                stationID: 'NDHD3',
                orgNo: 'NDHD3',
                type: 'dynamo',
                children: []
              },
              {
                id: 'NDHD4',
                name: '宁德四号机',
                subAttr: '1',
                descr: '宁德四号机',
                shortName: 'N4',
                dynamoType: '1022',
                eTypeID: '1022',
                eTypeName: '宁德核电发电机',
                stationID: 'NDHD4',
                orgNo: 'NDHD4',
                type: 'dynamo',
                children: []
              }
            ]
          },
          {
            id: 12,
            sid: 'SHAZHOU',
            name: '沙洲电厂',
            subAttr: '0',
            type: 'station',
            children: []
          },
          {
            id: 13,
            sid: 'TJCTRD',
            name: '天津陈塘热电',
            subAttr: '0',
            type: 'station',
            children: [
              {
                id: 'TJCTRD1',
                name: '陈塘一号发电机',
                subAttr: '1',
                descr: '一号发电机',
                shortName: '1F',
                dynamoType: '106',
                eTypeID: '1061',
                eTypeName: '天津陈塘发电机',
                stationID: 'TJCTRD1',
                orgNo: 'TJCTRD1',
                type: 'dynamo',
                children: []
              },
              {
                id: 'TJCTRD2',
                name: '陈塘二号发电机',
                subAttr: '1',
                descr: '二号发电机',
                shortName: '2F',
                dynamoType: '106',
                eTypeID: '1061',
                eTypeName: '天津陈塘发电机',
                stationID: 'TJCTRD2',
                orgNo: 'TJCTRD1',
                type: 'dynamo',
                children: []
              },
              {
                id: 'TJCTRD3',
                name: '陈塘三号发电机',
                subAttr: '1',
                descr: '三号发电机',
                shortName: '3F',
                dynamoType: '106',
                eTypeID: '1061',
                eTypeName: '天津陈塘发电机',
                stationID: 'TJCTRD3',
                orgNo: 'TJCTRD1',
                type: 'dynamo',
                children: []
              },
              {
                id: 'TJCTRD4',
                name: '陈塘四号发电机',
                subAttr: '1',
                descr: '四号发电机',
                shortName: '4F',
                dynamoType: '106',
                eTypeID: '1061',
                eTypeName: '天津陈塘发电机',
                stationID: 'TJCTRD4',
                orgNo: 'TJCTRD1',
                type: 'dynamo',
                children: []
              },
              {
                id: 'TJCTRD5',
                name: '陈塘五号发电机',
                subAttr: '1',
                descr: '五号发电机',
                shortName: '5F',
                dynamoType: '106',
                eTypeID: '1061',
                eTypeName: '天津陈塘发电机',
                stationID: 'TJCTRD5',
                orgNo: 'TJCTRD1',
                type: 'dynamo',
                children: []
              },
              {
                id: 'TJCTRD6',
                name: '陈塘六号发电机',
                subAttr: '1',
                descr: '六号发电机',
                shortName: '6F',
                dynamoType: '106',
                eTypeID: '1061',
                eTypeName: '天津陈塘发电机',
                stationID: 'TJCTRD6',
                orgNo: 'TJCTRD1',
                type: 'dynamo',
                children: []
              }
            ]
          }
        ]
      }
    },
    LoadChildren (item) {
      if (item.type === 'dynamo' && item.children.length === 0) {
        this.GetTsitmes(item)
      }

      return () => {}
    },
    // 获取多台-监测量数据
    async GetTsitmes (item) {
      const self = this
      const data = await reqTsitmes(item.id, -1, 0)

      if (data.Category) {
        item.children = []
        data.Category.TestItem.map((item1) => {
          if (typeof item1.children === 'undefined') {
            item1.children = []
          }

          item.children.push({
            id: item.dynamoType + item.id + (item1._TsitmID || item1.TsitmID), // 机型ID + 机组ID + 监测量ID
            tsitmId: item1._TsitmID || item1.TsitmID,
            name: item1._Name || item1.Name,
            tsitmNM: item1._TsItmNM || item1.TsItmNM,
            dUnvName: item1._DUnvName || item1.DUnvName,
            FactDW: item1._FactDW || item1.FactDW,
            typeTag: item1._TypeTag || item1.TypeTag,
            dtypeId: item.dynamoType,
            dynamo: item,
            type: 'tsitm'
          })
          return null
        })
      } else {
        // 离线数据
        const arr = [
          {
            id: '1001',
            tsitmId: '1001',
            name: 'GEX402MW_发电机有功',
            TsItmNM: '发电机有功功率（MW）',
            DUnvName: 'GEX402MW_发电机有功（MW）',
            FactDW: 'MW',
            TypeTag: '0',
            dtypeId: '100',
            type: 'tsitm'
          },
          {
            id: '1002',
            tsitmId: '1002',
            name: 'GEX403MQ_发电机无功',
            TsItmNM: '发电机无功功率（Mvar）',
            DUnvName: 'GEX403MQ_发电机无功（Mvar）',
            FactDW: 'Mvar',
            TypeTag: '0',
            dtypeId: '100',
            type: 'tsitm'
          },
          {
            id: '1003',
            tsitmId: '1003',
            name: 'GEX404MU_定子电压U－V',
            TsItmNM: '发电机定子电压Uab（kV）',
            DUnvName: 'GEX404MU_定子电压U－V（kV）',
            FactDW: 'kV',
            TypeTag: '0',
            dtypeId: '100',
            type: 'tsitm'
          },
          {
            id: '1004',
            tsitmId: '1004',
            name: 'GEX405MU_定子电压V－W',
            TsItmNM: '发电机定子电压Ubc（kV）',
            DUnvName: 'GEX405MU_定子电压V－W（kV）',
            FactDW: 'kV',
            TypeTag: '0',
            dtypeId: '100',
            type: 'tsitm'
          },
          {
            id: '1005',
            tsitmId: '1005',
            name: 'GEX406MU_定子电压W－U',
            TsItmNM: '发电机定子电压Uca（kV）',
            DUnvName: 'GEX406MU_定子电压W－U（kV）',
            FactDW: 'kV',
            TypeTag: '0',
            dtypeId: '100',
            type: 'tsitm'
          },
          {
            id: '1006',
            tsitmId: '1006',
            name: 'GEX408MI_U相定子电流',
            TsItmNM: '发电机A相电流（kA）',
            DUnvName: 'GEX408MI_U相定子电流（kA）',
            FactDW: 'kA',
            TypeTag: '0',
            dtypeId: '100',
            type: 'tsitm'
          },
          {
            id: '1007',
            tsitmId: '1007',
            name: 'GEX409MI_V相定子电流',
            TsItmNM: '发电机B相电流（kA）',
            DUnvName: 'GEX409MI_V相定子电流（kA）',
            FactDW: 'kA',
            TypeTag: '0',
            dtypeId: '100',
            type: 'tsitm'
          },
          {
            id: '1008',
            tsitmId: '1008',
            name: 'GEX410MI_W相定子电流',
            TsItmNM: '发电机C相电流（kA）',
            DUnvName: 'GEX410MI_W相定子电流（kA）',
            FactDW: 'kA',
            TypeTag: '0',
            dtypeId: '100',
            type: 'tsitm'
          },
          {
            id: '7048',
            tsitmId: '7048',
            name: '功率因数',
            TsItmNM: '功率因数',
            DUnvName: '功率因数',
            FactDW: '',
            TypeTag: '0',
            dtypeId: '100',
            type: 'tsitm'
          },
          {
            id: '2001',
            tsitmId: '2001',
            name: 'GST002MD_定子冷却水流量',
            TsItmNM: '定子冷却水流量1（t/h）',
            DUnvName: 'GST002MD_定子冷却水流量（m3/h）',
            FactDW: 'm3/h',
            TypeTag: '4',
            type: 'tsitm'
          },
          {
            id: '2002',
            tsitmId: '2002',
            name: 'GST004MP_定冷水进口压力',
            TsItmNM: '定子水入口压力1（kPa）',
            DUnvName: 'GST004MP_定冷水入口压力（kPa）',
            FactDW: 'kPa（abs）',
            TypeTag: '0',
            dtypeId: '100',
            type: 'tsitm'
          },
          {
            id: '2003',
            tsitmId: '2003',
            name: 'GST001MT_定子冷却水进口温度',
            TsItmNM: '定子冷却水进水温度1（℃）',
            DUnvName: 'GST001MT_定子冷却水进口温度（℃）',
            FactDW: '℃',
            TypeTag: '0',
            dtypeId: '100',
            type: 'tsitm'
          },
          {
            id: '2004',
            tsitmId: '2004',
            name: 'GST002MT_定子冷却水出口温度',
            TsItmNM: '定子冷却水出水温度1（℃）',
            DUnvName: 'GST002MT_定子冷却水出口温度（℃）',
            FactDW: '℃',
            TypeTag: '0',
            dtypeId: '100',
            type: 'tsitm'
          },
          {
            id: '2005',
            tsitmId: '2005',
            name: 'GRV001MP_发电机壳体氢压',
            TsItmNM: '发电机氢气压力（单流环式）1',
            DUnvName: 'GRV001MP_发电机壳体氢压（kPa）',
            FactDW: 'kPa',
            TypeTag: '0',
            dtypeId: '100',
            type: 'tsitm'
          },
          {
            id: '2006',
            tsitmId: '2006',
            name: '冷氢温度平均值_411、412、413、414MT平均值',
            TsItmNM: '冷氢温度平均值',
            DUnvName: '冷氢温度平均值_411、412、413、414MT平均值',
            FactDW: '℃',
            TypeTag: '0',
            dtypeId: '100',
            type: 'tsitm'
          },
          {
            id: '2007',
            tsitmId: '2007',
            name: '热氢温度平均值_401、402、403、404MT平均值',
            TsItmNM: '热氢温度平均值',
            DUnvName: '热氢温度平均值_401、402、403、404MT平均值',
            FactDW: '℃',
            TypeTag: '0',
            dtypeId: '100',
            type: 'tsitm'
          },
          {
            id: '7085',
            tsitmId: '7085',
            name:
              '氢气温度平均值_401、402、403、404、411、412、413、414MT平均值',
            TsItmNM: '氢气温度平均值',
            DUnvName:
              '氢气温度平均值_401、402、403、404、411、412、413、414MT平均值',
            FactDW: '℃',
            TypeTag: '0',
            dtypeId: '100',
            type: 'tsitm'
          }
        ]
        arr.map((item1) => {
          item1.id = item1.dtypeId + item.id + item1.id
          item1.dynamo = item
          return null
        })
        item.children = arr
      }

      // 临时：缓存读取的监测量列表数据，用于制图
      self.jianCeLiang.push(item.children)

      return item.children
    },
    NodeClick (item) {
      const self = this

      // 临时：查找选择监测量对应的监测量列表，用于制图
      let jcl = null
      self.jianCeLiang.map((j) => {
        j.find((d) => {
          if (d.dynamo.id === item.dynamo.id) {
            jcl = j
          }
          return null
        })
        return null
      })

      if (
        typeof self.danTaiData[0].dynamo !== 'undefined' &&
        self.danTaiData[0].dynamo.length > 0
      ) {
        if (
          typeof self.danTaiData[0].dynamo[0].id !== 'undefined' &&
          self.danTaiData[0].dynamo[0].id !== item.dynamo.id
        ) {
          self.danTaiData[0].dtypeId = -1
          self.danTaiData[0].dynamo = []
          self.danTaiData[0].jianCeLiang = []
          self.danTaiData[0].tsitm = []
        }
      }

      if (!self.danTaiData[0].dtypeId || self.danTaiData[0].dtypeId === -1) {
        self.danTaiData[0].dtypeId = item.dynamo.dynamoType // 机型ID
        self.danTaiData[0].dynamo = [item.dynamo] // 机组数据
        // self.danTaiData[0].tsitm.push(item) // 监测量数据
        self.danTaiData[0].jianCeLiang = jcl
      }

      if (item.type === 'tsitm') {
        let index = -1
        if (self.danTaiData[0].tsitm) {
          index = self.danTaiData[0].tsitm.findIndex(d => d.id === item.id)

          if (index > -1) {
            // 删除添加过的
            self.danTaiData[0].tsitm.splice(index, 1)
          } else if (!self.selection.includes(item.id)) {
            // 添加新的
            self.danTaiData[0].tsitm.push(item)
          }
        }
      }

      self.$emit('input', self.danTaiData)
    }
  }
}
</script>

<style lang="scss" scoped>
#hStations{
  min-width: 240px !important;
  .v-card__text {
    padding: 0;
    line-height: 1.0rem !important;
    .stepperProgress {
      min-height: 400px !important;
    }
    >>> .v-treeview-node__level {
      width: 9px !important;
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
