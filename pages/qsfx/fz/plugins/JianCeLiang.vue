<template>
  <v-list dense max-height="100%">
    <v-list-group
      v-for="list in lists"
      :key="list.title"
      v-model="list.active"
      :prepend-icon="list.action"
      :no-action="true"
    >
      <template #activator>
        <v-list-item-content>
          <v-list-item-title v-text="list.title" />
        </v-list-item-content>
      </template>

      <template #default>
        <v-chip-group
          v-if="selectChips"
          v-model="selectChips"
          column
          multiple
          class="chips_group ml-10"
          :sub-group="true"
        >
          <v-chip
            v-for="(item, i) in list.items"
            :key="i"
            filter
            outlined
            small
            text-color="info"
            :value="item.value"
          >
            {{ item.name }}
          </v-chip>
        </v-chip-group>
      </template>
    </v-list-group>

    <span v-show="false">{{ arrChks }}</span>
  </v-list>
</template>

<script>
import { reqTCategories } from '~/api/index.js'

export default {
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
      lists: [
        {
          action: 'mdi-file-tree',
          title: '发电机工况',
          chks: [],
          items: [
            { name: 'GEX402MW_发电机有功AA（MW）', value: 10 },
            { name: 'GEX403MQ_发电机无功（Mvar）', value: 11 },
            { name: 'GEX404MU_定子电压U－V（kV）', value: 12 },
            { name: 'GEX405MU_定子电压V－W（kV）', value: 13 },
            { name: 'GEX406MU_定子电压W－U（kV）', value: 14 }
          ]
        },
        {
          action: 'mdi-file-tree',
          title: '上层线棒出水温度',
          chks: [],
          // active: true,
          items: [
            { name: 'GRH201MT_槽1上部线棒出水温度（℃）', value: 2002 },
            { name: 'GRH201MT_槽2上部线棒出水温度（℃）', value: 2003 },
            { name: 'GRH201MT_槽3上部线棒出水温度（℃）', value: 2004 }
          ]
        },
        {
          action: 'mdi-file-tree',
          title: '下层线棒出水温度',
          chks: [],
          items: [
            { name: 'GRH101MT_槽1下部线棒出水温度（℃）', value: 2005 },
            { name: 'GRH101MT_槽2下部线棒出水温度（℃）', value: 2006 },
            { name: 'GRH101MT_槽3下部线棒出水温度（℃）', value: 2007 },
            { name: 'GRH101MT_槽4下部线棒出水温度（℃）', value: 2008 },
            { name: 'GRH101MT_槽5下部线棒出水温度（℃）', value: 2009 },
            { name: 'GRH101MT_槽6下部线棒出水温度（℃）', value: 2001 }
          ]
        },
        {
          action: 'mdi-file-tree',
          title: '线棒层间温度',
          chks: [],
          items: [
            { name: 'GRH301MT_定子槽1层间温度（℃）', value: 40 },
            { name: 'GRH301MT_定子槽2层间温度（℃）', value: 41 },
            { name: 'GRH301MT_定子槽3层间温度（℃）', value: 42 },
            { name: 'GRH301MT_定子槽4层间温度（℃）', value: 43 },
            { name: 'GRH301MT_定子槽5层间温度（℃）', value: 44 },
            { name: 'GRH301MT_定子槽6层间温度（℃）', value: 45 }
          ]
        },
        {
          action: 'mdi-file-tree',
          title: '引出线出水温度',
          chks: [],
          items: [
            { name: 'GRH001MT_发电机U1引出线温度（℃）', value: 50 },
            { name: 'GRH001MT_发电机V1引出线温度（℃）', value: 51 },
            { name: 'GRH001MT_发电机W1引出线温度（℃）', value: 52 },
            { name: 'GRH001MT_发电机U2引出线温度（℃）', value: 53 },
            { name: 'GRH001MT_发电机V2引出线温度（℃）', value: 54 },
            { name: 'GRH001MT_发电机W2引出线温度（℃）', value: 55 }
          ]
        },
        {
          action: 'mdi-file-tree',
          title: '铁芯温度',
          chks: [],
          items: [
            { name: 'GRH071MT_铜屏蔽温度（汽端）（℃）', value: 60 },
            { name: 'GRH072MT_铜屏蔽温度（汽端）（℃）', value: 61 },
            { name: 'GRH073MT_铜屏蔽温度（汽端）（℃）', value: 62 },
            { name: 'GRH074MT_铜屏蔽温度（汽端）（℃）', value: 63 },
            { name: 'GRH075MT_铜屏蔽温度（汽端）（℃）', value: 64 },
            { name: 'GRH076MT_铜屏蔽温度（汽端）（℃）', value: 65 },
            { name: 'GRH077MT_铜屏蔽温度（汽端）（℃）', value: 66 }
          ]
        },
        {
          action: 'mdi-file-tree',
          title: '氢冷器',
          chks: [],
          items: [
            { name: '1汽侧冷氢平均温度_411MT、412MT平均值(℃)', value: 70 },
            { name: '2汽侧冷氢平均温度_411MT、412MT平均值(℃)', value: 71 },
            { name: '3As侧冷氢平均温度_411MT、412MT平均值(℃)', value: 72 },
            { name: '4汽侧冷氢平均温度_411MT、412MT平均值(℃)', value: 73 },
            { name: '5汽侧冷氢平均温度_411MT、412MT平均值(℃)', value: 74 },
            { name: '6汽侧冷氢平均温度_411MT、412MT平均值(℃)', value: 75 },
            { name: '7汽侧冷氢平均温度_411MT、412MT平均值(℃)', value: 76 },
            { name: '8汽侧冷氢平均温度_411MT、412MT平均值(℃)', value: 77 },
            { name: '9汽侧冷氢平均温度_411MT、412MT平均值(℃)', value: 78 },
            { name: '0汽侧冷氢平均温度_411MT、412MT平均值(℃)', value: 79 }
          ]
        }
      ],
      amenities: [1, 4],
      model: ['Carrots'],
      selectChips: [],
      tCategoryData: null
    }
  },
  computed: {
    arrChks () {
      // const self = this
      // let arr = []
      // let chks = self.lists.map((l)=>{arr = arr.concat(l.chks)})

      // // 通过$emit触发input（model内定义）事件，将内部值传递给给父组件
      // self.$emit('input', this.value)

      // return arr
      return []
    }
  },
  watch: {
    selectChips: {
      // deep: true,
      handler (val) {
        // 通过$emit触发input（model内定义）事件，将内部值传递给给父组件
        this.$emit('input', this.selectChips)
      },
      immediate: true
    }
  },
  mounted () {
    const self = this
    // const date = self.$moment.moment().format('YYYY-MM-DD hh:mm:ss')
    this.selectChips = self.value

    self.GetTCategories(-1)
  },
  methods: {
    // 获取监测量列表数据
    async GetTCategories (dynamoId) {
      const self = this
      const data = await reqTCategories(dynamoId)
      if (data && data.GetTCategory && data.GetTCategory.Dtype) {
        // const dTypes = data.GetTCategory.Dtype
        // const dynamos = dTypes.Dynamos || null
        // const id = dTypes._ID
        // const descr = dTypes._Descr
        // const categories = dTypes.Categorys || null
      } else {
        // 离线数据
        self.tCategoryData = [
          {
            ID: '100',
            Descr: 'D1发电机',
            Dynamos: [{ ID: '19', ShortNM: 'D1', Descr: '大亚湾一号机' }],
            Categorys: [
              { Tag: '0', TagName: '发电机工况', Ord: '1', ItemAttr: '0' },
              { Tag: '1', TagName: '线棒出水温度', Ord: '2', ItemAttr: '0' },
              { Tag: '2', TagName: '线棒层间温度', Ord: '3', ItemAttr: '0' },
              { Tag: '6', TagName: '铁芯温度', Ord: '4', ItemAttr: '0' },
              { Tag: '9', TagName: '转子及轴承', Ord: '5', ItemAttr: '0' },
              { Tag: '7', TagName: '氢冷器', Ord: '6', ItemAttr: '0' },
              { Tag: '8', TagName: '氢气密封油', Ord: '7', ItemAttr: '0' },
              { Tag: '13', TagName: '定子冷却水', Ord: '8', ItemAttr: '0' },
              { Tag: '10', TagName: '励磁机', Ord: '9', ItemAttr: '0' },
              { Tag: '11', TagName: '运行巡检', Ord: '10', ItemAttr: '0' },
              { Tag: '14', TagName: '集水环温度', Ord: '11', ItemAttr: '0' },
              {
                Tag: '12',
                TagName: '主系统及厂用电',
                Ord: '12',
                ItemAttr: '0'
              },
              {
                Tag: '41',
                TagName: '定子绕组直流电阻',
                Ord: '13',
                ItemAttr: '4'
              },
              {
                Tag: '242',
                TagName: '定子线圈屏蔽绝缘电阻',
                Ord: '14',
                ItemAttr: '4'
              },
              {
                Tag: '142',
                TagName: '定子线圈三相整体绝缘电阻',
                Ord: '15',
                ItemAttr: '4'
              },
              {
                Tag: '143',
                TagName: '定子线圈三相整体直流泄漏试验',
                Ord: '16',
                ItemAttr: '4'
              },
              {
                Tag: '66',
                TagName: '转子直阻、绝缘电阻',
                Ord: '17',
                ItemAttr: '4'
              },
              { Tag: '77', TagName: '转子RSO试验', Ord: '18', ItemAttr: '4' },
              {
                Tag: '67',
                TagName: '转子交流阻抗测量',
                Ord: '19',
                ItemAttr: '4'
              },
              {
                Tag: '81',
                TagName: '定子绕组端部自振频率测量',
                Ord: '20',
                ItemAttr: '4'
              },
              { Tag: '83', TagName: '气隙波形测量', Ord: '21', ItemAttr: '4' },
              {
                Tag: '78',
                TagName: '定子线棒压力试验',
                Ord: '22',
                ItemAttr: '4'
              },
              {
                Tag: '97',
                TagName: '定子线棒真空试验',
                Ord: '23',
                ItemAttr: '4'
              },
              {
                Tag: '69',
                TagName: '定子水流量分配试验',
                Ord: '24',
                ItemAttr: '4'
              },
              { Tag: '96', TagName: '水管间距测量', Ord: '25', ItemAttr: '4' },
              {
                Tag: '70',
                TagName: '发电机空载特性',
                Ord: '26',
                ItemAttr: '4'
              },
              {
                Tag: '71',
                TagName: '发电机短路特性',
                Ord: '27',
                ItemAttr: '4'
              },
              {
                Tag: '82',
                TagName: '定子铁芯EL-CID试验',
                Ord: '28',
                ItemAttr: '4'
              },
              {
                Tag: '95',
                TagName: '轴承、密封瓦绝缘电阻',
                Ord: '29',
                ItemAttr: '4'
              },
              { Tag: '88', TagName: '励磁机试验', Ord: '30', ItemAttr: '4' },
              { Tag: '89', TagName: '避雷器试验', Ord: '31', ItemAttr: '4' },
              {
                Tag: '76',
                TagName: '转子交流电压分布试验',
                Ord: '32',
                ItemAttr: '4'
              },
              {
                Tag: '94',
                TagName: '轴端磁通密度测量',
                Ord: '33',
                ItemAttr: '4'
              },
              {
                Tag: '90',
                TagName: '转子导电连板检查',
                Ord: '34',
                ItemAttr: '4'
              },
              { Tag: '98', TagName: '槽楔松动检查', Ord: '35', ItemAttr: '4' },
              {
                Tag: '93',
                TagName: '气隙探测线圈检查',
                Ord: '36',
                ItemAttr: '4'
              },
              {
                Tag: '99',
                TagName: '出线软连接接触情况检查',
                Ord: '37',
                ItemAttr: '4'
              },
              {
                Tag: '86',
                TagName: '发电机台板密封试验',
                Ord: '38',
                ItemAttr: '4'
              },
              {
                Tag: '91',
                TagName: '停机碳刷长度拉力检查',
                Ord: '39',
                ItemAttr: '4'
              },
              {
                Tag: '92',
                TagName: '电刷刷架绝缘测量',
                Ord: '40',
                ItemAttr: '4'
              },
              {
                Tag: '84',
                TagName: '运行工况电刷检查',
                Ord: '41',
                ItemAttr: '4'
              },
              {
                Tag: '80',
                TagName: '转子导电杆气密试验',
                Ord: '50',
                ItemAttr: '4'
              },
              {
                Tag: '149',
                TagName: '定子线圈三相整体交流耐压试验',
                Ord: '52',
                ItemAttr: '4'
              },
              {
                Tag: '49',
                TagName: '定子线圈分相交流耐压试验',
                Ord: '53',
                ItemAttr: '4'
              },
              {
                Tag: '42',
                TagName: '定子线圈分相绝缘电阻',
                Ord: '54',
                ItemAttr: '4'
              },
              {
                Tag: '43',
                TagName: '定子线圈分相直流泄漏试验',
                Ord: '55',
                ItemAttr: '4'
              },
              {
                Tag: '141',
                TagName: '定子绕组分支直流电阻',
                Ord: '56',
                ItemAttr: '4'
              }
            ]
          },
          {
            ID: '101',
            Descr: 'D2L1L2发电机',
            Dynamos: [
              { ID: '20', ShortNM: 'D2', Descr: '大亚湾二号机' },
              { ID: '21', ShortNM: 'L1', Descr: '岭澳一号机' },
              { ID: '22', ShortNM: 'L2', Descr: '岭澳二号机' }
            ],
            Categorys: [
              { Tag: '0', TagName: '发电机工况', Ord: '1', ItemAttr: '0' },
              { Tag: '1', TagName: '线棒出水温度', Ord: '2', ItemAttr: '0' },
              { Tag: '2', TagName: '线棒层间温度', Ord: '3', ItemAttr: '0' },
              { Tag: '6', TagName: '铁芯温度', Ord: '4', ItemAttr: '0' },
              { Tag: '9', TagName: '转子及轴承', Ord: '5', ItemAttr: '0' },
              { Tag: '7', TagName: '氢冷器', Ord: '6', ItemAttr: '0' },
              { Tag: '8', TagName: '氢气密封油', Ord: '7', ItemAttr: '0' },
              { Tag: '13', TagName: '定子冷却水', Ord: '8', ItemAttr: '0' },
              { Tag: '10', TagName: '励磁机', Ord: '9', ItemAttr: '0' },
              { Tag: '11', TagName: '运行巡检', Ord: '10', ItemAttr: '0' },
              { Tag: '14', TagName: '集水环温度', Ord: '11', ItemAttr: '0' },
              {
                Tag: '12',
                TagName: '主系统及厂用电',
                Ord: '12',
                ItemAttr: '0'
              },
              {
                Tag: '41',
                TagName: '定子绕组直流电阻',
                Ord: '13',
                ItemAttr: '4'
              },
              {
                Tag: '42',
                TagName: '定子线圈分相绝缘电阻',
                Ord: '14',
                ItemAttr: '4'
              },
              {
                Tag: '43',
                TagName: '定子线圈分相直流泄漏试验',
                Ord: '15',
                ItemAttr: '4'
              },
              {
                Tag: '66',
                TagName: '转子直阻、绝缘电阻',
                Ord: '16',
                ItemAttr: '4'
              },
              {
                Tag: '69',
                TagName: '定子水流量分配试验',
                Ord: '18',
                ItemAttr: '4'
              },
              {
                Tag: '67',
                TagName: '转子交流阻抗测量',
                Ord: '20',
                ItemAttr: '4'
              },
              {
                Tag: '49',
                TagName: '定子线圈分相交流耐压试验',
                Ord: '22',
                ItemAttr: '4'
              },
              {
                Tag: '70',
                TagName: '发电机空载特性',
                Ord: '23',
                ItemAttr: '4'
              },
              {
                Tag: '71',
                TagName: '发电机短路特性',
                Ord: '24',
                ItemAttr: '4'
              },
              {
                Tag: '141',
                TagName: '定子绕组分支直流电阻',
                Ord: '34',
                ItemAttr: '4'
              },
              {
                Tag: '142',
                TagName: '定子线圈三相整体绝缘电阻',
                Ord: '35',
                ItemAttr: '4'
              },
              {
                Tag: '242',
                TagName: '定子线圈屏蔽绝缘电阻',
                Ord: '36',
                ItemAttr: '4'
              },
              {
                Tag: '143',
                TagName: '定子线圈三相整体直流泄漏试验',
                Ord: '37',
                ItemAttr: '4'
              },
              {
                Tag: '149',
                TagName: '定子线圈三相整体交流耐压试验',
                Ord: '38',
                ItemAttr: '4'
              },
              {
                Tag: '76',
                TagName: '转子交流电压分布试验',
                Ord: '39',
                ItemAttr: '4'
              },
              { Tag: '77', TagName: '转子RSO试验', Ord: '40', ItemAttr: '4' },
              {
                Tag: '81',
                TagName: '定子绕组端部自振频率测量',
                Ord: '41',
                ItemAttr: '4'
              },
              {
                Tag: '82',
                TagName: '定子铁芯EL-CID试验',
                Ord: '42',
                ItemAttr: '4'
              },
              {
                Tag: '78',
                TagName: '定子线棒压力试验',
                Ord: '43',
                ItemAttr: '4'
              },
              { Tag: '88', TagName: '励磁机试验', Ord: '44', ItemAttr: '4' },
              { Tag: '89', TagName: '避雷器试验', Ord: '45', ItemAttr: '4' },
              { Tag: '83', TagName: '气隙波形测量', Ord: '46', ItemAttr: '4' },
              {
                Tag: '93',
                TagName: '气隙探测线圈检查',
                Ord: '48',
                ItemAttr: '4'
              },
              {
                Tag: '94',
                TagName: '轴端磁通密度测量',
                Ord: '49',
                ItemAttr: '4'
              },
              {
                Tag: '95',
                TagName: '轴承、密封瓦绝缘电阻',
                Ord: '50',
                ItemAttr: '4'
              },
              { Tag: '96', TagName: '水管间距测量', Ord: '51', ItemAttr: '4' },
              {
                Tag: '97',
                TagName: '定子线棒真空试验',
                Ord: '52',
                ItemAttr: '4'
              },
              {
                Tag: '80',
                TagName: '转子导电杆气密试验',
                Ord: '53',
                ItemAttr: '4'
              },
              { Tag: '98', TagName: '槽楔松动检查', Ord: '55', ItemAttr: '4' },
              {
                Tag: '91',
                TagName: '停机碳刷长度拉力检查',
                Ord: '56',
                ItemAttr: '4'
              },
              {
                Tag: '92',
                TagName: '电刷刷架绝缘测量',
                Ord: '57',
                ItemAttr: '4'
              },
              {
                Tag: '86',
                TagName: '发电机台板密封试验',
                Ord: '58',
                ItemAttr: '4'
              },
              {
                Tag: '84',
                TagName: '运行工况电刷检查',
                Ord: '59',
                ItemAttr: '4'
              },
              {
                Tag: '90',
                TagName: '转子导电连板检查',
                Ord: '60',
                ItemAttr: '4'
              },
              {
                Tag: '99',
                TagName: '出线软连接接触情况检查',
                Ord: '61',
                ItemAttr: '4'
              },
              {
                Tag: '65',
                TagName: '转子绕组绝缘电阻',
                Ord: '62',
                ItemAttr: '4'
              }
            ]
          },
          {
            ID: '102',
            Descr: 'L3L4N2发电机',
            Dynamos: [
              { ID: '23', ShortNM: 'L3', Descr: '岭澳三号机' },
              { ID: '24', ShortNM: 'L4', Descr: '岭澳四号机' },
              { ID: '76', ShortNM: 'F2', Descr: '二号发电机' }
            ],
            Categorys: [
              { Tag: '0', TagName: '发电机工况', Ord: '1', ItemAttr: '0' },
              {
                Tag: '1',
                TagName: '上层线棒出水温度',
                Ord: '2',
                ItemAttr: '0'
              },
              {
                Tag: '3',
                TagName: '下层线棒出水温度',
                Ord: '3',
                ItemAttr: '0'
              },
              { Tag: '2', TagName: '线棒层间温度', Ord: '4', ItemAttr: '0' },
              { Tag: '5', TagName: '引出线出水温度', Ord: '5', ItemAttr: '0' },
              { Tag: '6', TagName: '铁芯温度', Ord: '6', ItemAttr: '0' },
              { Tag: '7', TagName: '氢冷器', Ord: '7', ItemAttr: '0' },
              { Tag: '9', TagName: '转子及轴承', Ord: '8', ItemAttr: '0' },
              { Tag: '13', TagName: '定子冷却水', Ord: '9', ItemAttr: '0' },
              { Tag: '8', TagName: '氢气密封油', Ord: '10', ItemAttr: '0' },
              { Tag: '10', TagName: '励磁机', Ord: '11', ItemAttr: '0' },
              {
                Tag: '12',
                TagName: '主系统及厂用电',
                Ord: '14',
                ItemAttr: '0'
              },
              {
                Tag: '41',
                TagName: '定子绕组直流电阻',
                Ord: '15',
                ItemAttr: '4'
              },
              {
                Tag: '66',
                TagName: '转子直阻、绝缘电阻',
                Ord: '16',
                ItemAttr: '4'
              },
              {
                Tag: '67',
                TagName: '转子交流阻抗测量',
                Ord: '17',
                ItemAttr: '4'
              },
              { Tag: '77', TagName: '转子RSO试验', Ord: '18', ItemAttr: '4' },
              {
                Tag: '142',
                TagName: '定子绕组三相整体绝缘电阻',
                Ord: '19',
                ItemAttr: '4'
              },
              {
                Tag: '143',
                TagName: '定子线圈三相整体直流泄漏试验',
                Ord: '20',
                ItemAttr: '4'
              },
              { Tag: '83', TagName: '气隙波形测量', Ord: '21', ItemAttr: '4' },
              { Tag: '88', TagName: '励磁机试验', Ord: '22', ItemAttr: '4' },
              {
                Tag: '101',
                TagName: '耦合电容器试验',
                Ord: '23',
                ItemAttr: '4'
              },
              { Tag: '80', TagName: '转子气密试验', Ord: '32', ItemAttr: '4' },
              {
                Tag: '81',
                TagName: '定子绕组端部自振频率测量',
                Ord: '33',
                ItemAttr: '4'
              },
              {
                Tag: '78',
                TagName: '定子线棒压力试验',
                Ord: '34',
                ItemAttr: '4'
              },
              {
                Tag: '69',
                TagName: '定子水流量分配试验',
                Ord: '35',
                ItemAttr: '4'
              },
              {
                Tag: '82',
                TagName: '定子铁芯EL-CID试验',
                Ord: '36',
                ItemAttr: '4'
              },
              {
                Tag: '93',
                TagName: '气隙探测线圈检查',
                Ord: '37',
                ItemAttr: '4'
              },
              {
                Tag: '94',
                TagName: '转子轴端磁通密度',
                Ord: '38',
                ItemAttr: '4'
              },
              { Tag: '98', TagName: '槽楔松动检查', Ord: '39', ItemAttr: '4' },
              {
                Tag: '76',
                TagName: '转子交流电压分布试验',
                Ord: '40',
                ItemAttr: '4'
              },
              {
                Tag: '70',
                TagName: '发电机空载特性',
                Ord: '41',
                ItemAttr: '4'
              },
              {
                Tag: '71',
                TagName: '发电机短路特性',
                Ord: '42',
                ItemAttr: '4'
              },
              {
                Tag: '99',
                TagName: '出线软连接平整度及接触电阻',
                Ord: '45',
                ItemAttr: '4'
              },
              {
                Tag: '141',
                TagName: '定子绕组分支直流电阻',
                Ord: '46',
                ItemAttr: '4'
              },
              {
                Tag: '42',
                TagName: '定子线圈分相绝缘电阻',
                Ord: '47',
                ItemAttr: '4'
              },
              {
                Tag: '43',
                TagName: '定子线圈分相直流泄漏试验',
                Ord: '48',
                ItemAttr: '4'
              },
              {
                Tag: '91',
                TagName: '停机碳刷长度拉力检查',
                Ord: '49',
                ItemAttr: '4'
              },
              {
                Tag: '92',
                TagName: '电刷刷架绝缘测量',
                Ord: '50',
                ItemAttr: '4'
              },
              {
                Tag: '84',
                TagName: '运行工况电刷检查',
                Ord: '51',
                ItemAttr: '4'
              },
              {
                Tag: '97',
                TagName: '定子线棒真空试验',
                Ord: '52',
                ItemAttr: '4'
              },
              {
                Tag: '149',
                TagName: '定子线圈三相整体交流耐压试验',
                Ord: '54',
                ItemAttr: '4'
              },
              {
                Tag: '49',
                TagName: '定子线圈分相交流耐压试验',
                Ord: '55',
                ItemAttr: '4'
              },
              { Tag: '30', TagName: '端部振动', Ord: '56', ItemAttr: '26' },
              { Tag: '72', TagName: '转子匝间短路', Ord: '57', ItemAttr: '25' },
              { Tag: '19', TagName: '在线局放', Ord: '58', ItemAttr: '23' }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
>>> .v-chip.v-chip--outlined .v-icon{
    color: #00c58e !important;
    font-size: 16px;
}
</style>
