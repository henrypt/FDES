<template>
  <div class="page">
    <v-row justify="space-around">
      <v-col cols="9" class="pa-0">
        <Chart
          v-if="cinfo && chartDATA"
          ref="chart"
          :cinfo="cinfo"
          :functions="chartFunctions"
          :cdata="chartDATA"
          :mode="legendSelectedMode"
          :gongkuang-info="gongkuangInfo"
        />
      </v-col>
      <v-col cols="3" class="pa-0">
        <!-- 工具按钮组 -->
        <Buttons
          v-if="chartDATA"
          :title="title"
          :go-back="false"
          :list-data="chartDATA"
          class="my-5"
        />
        <div id="datetimePickerComponent">
          <Datepicker v-model="date" title="日期" />
          <Timepicker v-model="time" title="时间" />
        </div>
        <v-sheet :color="`secondary ${'darken-2'}`">
          <v-simple-table dense fixed-header>
            <template #default>
              <caption
                class="text-left caption font-weight-bold sub_title1 pl-2 py-2"
                v-text="gongkuangInfo.title"
              />
              <thead>
                <tr>
                  <th class="text-left">
                    名称
                  </th>
                  <th class="text-left">
                    值
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in gongkuangInfo.data" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td>{{ item.value }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Datepicker from '@/components/common/Datepicker'
import Timepicker from '@/components/common/TimePicker'
import Chart from '@/components/common/Chart/Chart.vue'
import Buttons from '@/components/common/Buttons/Buttons4Chart.vue'

let DY_ID = null
export default {
  components: {
    Datepicker,
    Timepicker,
    Chart,
    Buttons
  },
  data () {
    return {
      title: '极限工况',
      date: new Date().toISOString().substr(0, 10),
      time: '',
      legendSelectedMode: 'multiple', // 图例是单选(single)还是多选(multiple) // multiple single
      gongkuangInfo: {
        title: '工况信息:',
        data: [
          {
            id: '1001',
            name: '有功功率(MW)',
            value: 278.9
          },
          {
            id: '1002',
            name: '无功功率(Mvar)',
            value: 155.6
          },
          {
            id: '1003',
            name: '定子电压(kV)',
            value: 26.9
          },
          {
            id: '1004',
            name: '定子电流(kA)',
            value: 7.49
          },
          {
            id: '1005',
            name: '进水温度(℃)',
            value: 44.56
          },
          {
            id: '1006',
            name: '进水压力(kPa)',
            value: 314.8
          },
          {
            id: '1007',
            name: '定子冷却水流量(m3/h)',
            value: 191.6
          },
          {
            id: '1008',
            name: '冷氢温度(℃)',
            value: 38.13
          },
          {
            name: '氢气压力(kPa)',
            value: 283.1
          }
        ]
      },
      cinfo: null,
      xmlData: [
        {
          delta0: '0.000',
          delta11: '0.000',
          delta2: '0.000',
          basetime: '2017-1.1～2019-4.28',
          viewPos: '',
          drawLBound: '0.000',
          drawHBound: '1200.000',
          tagDesc: '发电机工况',
          ExpItemID: 0,
          selected: false,
          avg: '129.881',
          min: { name: null, value: '0' },
          max: { name: null, value: '1079.300' },

          yAxis0Name: '(℃)',
          yAxis1Name: '(℃)',

          xAxisType: 'category',
          pointSelect: false, // 线上的点的可以选择 (注: 默认情况下，雷达图模式下不显示此项)
          chartType: false, // 图切换（曲线图、雷达图）
          convert: false, // 折算 (注: 默认情况下，雷达图模式下不显示此项)
          conditionLabel: false, // 工况标注 (注: 默认情况下，雷达图模式下不显示此项)
          maskAbnormalData: false, // 屏蔽异常数据  (注: 默认情况下，雷达图模式下不显示此项)
          listTable: false, // 列表
          modal: false, // 模板
          scale: false,

          testItem: [
            {
              factDW: 'MW',
              shadow: '0',
              convert: null,
              rating: '0.000',
              tagDescr: '发电机实时参数',
              tagType: '0',
              name: 'GEX402MW_发电机有功',
              id: '1001',
              value: '1079.300'
            },
            {
              factDW: 'Mvar',
              shadow: '0',
              convert: null,
              rating: '0.000',
              tagDescr: '发电机实时参数',
              tagType: '0',
              name: 'GEX403MQ_发电机无功',
              id: '1002',
              value: '166.200'
            },

            {
              factDW: 'kV',
              shadow: '0',
              convert: null,
              rating: '0.000',
              tagDescr: '发电机实时参数',
              tagType: '0',
              name: 'GEX404MU_定子电压U－V',
              id: '1003',
              value: '23.990'
            },
            {
              factDW: 'kV',
              shadow: '0',
              convert: null,
              rating: '0.000',
              tagDescr: '发电机实时参数',
              tagType: '0',
              name: 'GEX405MU_定子电压V－W',
              id: '1004',
              value: '0.000'
            },
            {
              factDW: 'kV',
              shadow: '0',
              convert: null,
              rating: '0.000',
              tagDescr: '发电机实时参数',
              tagType: '0',
              name: 'GEX406MU_定子电压W－U',
              id: '1005',
              value: '0.000'
            },
            {
              factDW: 'kV',
              shadow: '0',
              convert: null,
              rating: '0.000',
              tagDescr: '发电机实时参数',
              tagType: '0',
              name: 'GEX408MI_U相定子电流',
              id: '1006',
              value: '26.170'
            },
            {
              factDW: 'kA',
              shadow: '0',
              convert: null,
              rating: '0.000',
              tagDescr: '发电机实时参数',
              tagType: '0',
              name: 'GEX409MI_V相定子电流',
              id: '1007',
              value: '26.170'
            },
            {
              factDW: 'kA',
              shadow: '0',
              convert: null,
              rating: '0.000',
              tagDescr: '发电机实时参数',
              tagType: '0',
              name: 'GEX410MI_W相定子电流',
              id: '1008',
              value: '26.170'
            },
            {
              factDW: 'kA',
              shadow: '0',
              convert: null,
              rating: '0.000',
              tagDescr: '冷却水参数',
              tagType: '4',
              name: 'GST002MD_定子冷却水流量',
              id: '2101',
              value: '203.100'
            },
            {
              factDW: 'kPa',
              shadow: '0',
              convert: null,
              rating: '0.000',
              tagDescr: '冷却水参数',
              tagType: '4',
              name: 'GST004MP_定冷水入口压力',
              id: '2102',
              value: '315.600'
            }
          ]
        },
        {
          delta0: '-2.000',
          delta11: '2.000',
          delta2: '1.500',
          basetime: '2017-1.1～2019-4.28',
          viewPos: '汽端视图',
          drawLBound: '35.000',
          drawHBound: '75.000',
          tagDesc: '上层线棒出水温度-最大工况',
          ExpItemID: 1,
          selected: true,
          avg: '50.461',
          min: { name: null, value: '49.640' },
          max: { name: null, value: '55.860' },

          yAxis0Name: '(℃)',
          yAxis1Name: '(℃)',

          xAxisType: 'category',
          pointSelect: false, // 线上的点的可以选择 (注: 默认情况下，雷达图模式下不显示此项)
          chartType: true, // 图切换（曲线图、雷达图）
          convert: false, // 折算 (注: 默认情况下，雷达图模式下不显示此项)
          conditionLabel: false, // 工况标注 (注: 默认情况下，雷达图模式下不显示此项)
          maskAbnormalData: false, // 屏蔽异常数据  (注: 默认情况下，雷达图模式下不显示此项)
          listTable: true, // 列表
          modal: false, // 模板
          scale: false,

          testItem: [
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.112',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH201MT_槽1上部线棒出水温度',
              id: '2001',
              value: '50.200'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.662',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH202MT_槽2上部线棒出水温度',
              id: '2002',
              value: '50.200'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.494',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH203MT_槽3上部线棒出水温度',
              id: '2003',
              value: '50.330'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.203',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH204MT_槽4上部线棒出水温度',
              id: '2004',
              value: '49.910'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '85.530',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH205MT_槽5上部线棒出水温度',
              id: '2005',
              value: '55.860'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.953',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH206MT_槽6上部线棒出水温度',
              id: '2006',
              value: '50.750'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '61.476',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH207MT_槽7上部线棒出水温度',
              id: '2007',
              value: '49.640'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.015',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH208MT_槽8上部线棒出水温度',
              id: '2008',
              value: '50.780'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.181',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH209MT_槽9上部线棒出水温度',
              id: '2009',
              value: '50.140'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.801',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH210MT_槽10上部线棒出水温度',
              id: '2010',
              value: '50.540'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.081',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH211MT_槽11上部线棒出水温度',
              id: '2011',
              value: '50.180'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.140',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH212MT_槽12上部线棒出水温度',
              id: '2012',
              value: '50.550'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.916',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH213MT_槽13上部线棒出水温度',
              id: '2013',
              value: '50.610'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.117',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH214MT_槽14上部线棒出水温度',
              id: '2014',
              value: '50.400'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.626',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH215MT_槽15上部线棒出水温度',
              id: '2015',
              value: '50.190'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.475',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH216MT_槽16上部线棒出水温度',
              id: '2016',
              value: '50.570'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.717',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH217MT_槽17上部线棒出水温度',
              id: '2017',
              value: '50.190'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.811',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH218MT_槽18上部线棒出水温度',
              id: '2018',
              value: '50.260'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.755',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH219MT_槽19上部线棒出水温度',
              id: '2019',
              value: '50.530'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.839',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH220MT_槽20上部线棒出水温度',
              id: '2020',
              value: '50.680'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.721',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH221MT_槽21上部线棒出水温度',
              id: '2021',
              value: '50.640'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.320',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH222MT_槽22上部线棒出水温度',
              id: '2022',
              value: '50.330'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.056',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH223MT_槽23上部线棒出水温度',
              id: '2023',
              value: '49.760'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.468',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH224MT_槽24上部线棒出水温度',
              id: '2024',
              value: '50.030'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.896',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH225MT_槽25上部线棒出水温度',
              id: '2025',
              value: '50.330'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.077',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH226MT_槽26上部线棒出水温度',
              id: '2026',
              value: '50.230'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '61.420',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH227MT_槽27上部线棒出水温度',
              id: '2027',
              value: '49.860'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.853',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH228MT_槽28上部线棒出水温度',
              id: '2028',
              value: '50.310'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.679',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH229MT_槽29上部线棒出水温度',
              id: '2029',
              value: '50.350'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.309',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH230MT_槽30上部线棒出水温度',
              id: '2030',
              value: '50.500'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.691',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH231MT_槽31上部线棒出水温度',
              id: '2031',
              value: '50.380'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.584',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH232MT_槽32上部线棒出水温度',
              id: '2032',
              value: '50.470'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.317',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH233MT_槽33上部线棒出水温度',
              id: '2033',
              value: '50.520'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.172',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH234MT_槽34上部线棒出水温度',
              id: '2034',
              value: '50.080'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.403',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH235MT_槽35上部线棒出水温度',
              id: '2035',
              value: '50.420'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.422',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH236MT_槽36上部线棒出水温度',
              id: '2036',
              value: '50.620'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.926',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH237MT_槽37上部线棒出水温度',
              id: '2037',
              value: '50.590'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.395',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH238MT_槽38上部线棒出水温度',
              id: '2038',
              value: '50.160'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.509',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH239MT_槽39上部线棒出水温度',
              id: '2039',
              value: '50.290'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.218',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH240MT_槽40上部线棒出水温度',
              id: '2040',
              value: '50.340'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.071',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH241MT_槽41上部线棒出水温度',
              id: '2041',
              value: '50.590'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.012',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH242MT_槽42上部线棒出水温度',
              id: '2042',
              value: '50.570'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.094',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH243MT_槽43上部线棒出水温度',
              id: '2043',
              value: '50.380'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.824',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH244MT_槽44上部线棒出水温度',
              id: '2044',
              value: '50.570'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '61.992',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH245MT_槽45上部线棒出水温度',
              id: '2045',
              value: '49.750'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.163',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH246MT_槽46上部线棒出水温度',
              id: '2046',
              value: '50.740'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.381',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH247MT_槽47上部线棒出水温度',
              id: '2047',
              value: '50.270'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.284',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH248MT_槽48上部线棒出水温度',
              id: '2048',
              value: '50.540'
            }
          ]
        },
        {
          delta0: '-2.000',
          delta11: '2.000',
          delta2: '1.500',
          basetime: '2017-1.1～2019-4.28',
          viewPos: '汽端视图',
          drawLBound: '35.000',
          drawHBound: '75.000',
          tagDesc: '上层线棒出水温度-最小工况',
          ExpItemID: 1,
          selected: true,
          avg: '50.461',
          min: { name: null, value: '39.640' },
          max: { name: null, value: '45.860' },

          yAxis0Name: '(℃)',
          yAxis1Name: '(℃)',

          xAxisType: 'category',
          pointSelect: false, // 线上的点的可以选择 (注: 默认情况下，雷达图模式下不显示此项)
          chartType: true, // 图切换（曲线图、雷达图）
          convert: false, // 折算 (注: 默认情况下，雷达图模式下不显示此项)
          conditionLabel: false, // 工况标注 (注: 默认情况下，雷达图模式下不显示此项)
          maskAbnormalData: false, // 屏蔽异常数据  (注: 默认情况下，雷达图模式下不显示此项)
          listTable: true, // 列表
          modal: false, // 模板
          scale: false,

          testItem: [
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.112',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH201MT_槽1上部线棒出水温度',
              id: '2001',
              value: '40.200'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.662',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH202MT_槽2上部线棒出水温度',
              id: '2002',
              value: '40.200'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.494',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH203MT_槽3上部线棒出水温度',
              id: '2003',
              value: '40.330'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.203',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH204MT_槽4上部线棒出水温度',
              id: '2004',
              value: '39.910'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '85.530',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH205MT_槽5上部线棒出水温度',
              id: '2005',
              value: '45.860'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.953',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH206MT_槽6上部线棒出水温度',
              id: '2006',
              value: '40.750'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '61.476',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH207MT_槽7上部线棒出水温度',
              id: '2007',
              value: '39.640'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.015',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH208MT_槽8上部线棒出水温度',
              id: '2008',
              value: '40.780'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.181',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH209MT_槽9上部线棒出水温度',
              id: '2009',
              value: '40.140'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.801',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH210MT_槽10上部线棒出水温度',
              id: '2010',
              value: '40.540'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.081',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH211MT_槽11上部线棒出水温度',
              id: '2011',
              value: '40.180'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.140',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH212MT_槽12上部线棒出水温度',
              id: '2012',
              value: '40.550'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.916',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH213MT_槽13上部线棒出水温度',
              id: '2013',
              value: '40.610'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.117',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH214MT_槽14上部线棒出水温度',
              id: '2014',
              value: '40.400'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.626',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH215MT_槽15上部线棒出水温度',
              id: '2015',
              value: '40.190'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.475',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH216MT_槽16上部线棒出水温度',
              id: '2016',
              value: '40.570'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.717',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH217MT_槽17上部线棒出水温度',
              id: '2017',
              value: '40.190'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.811',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH218MT_槽18上部线棒出水温度',
              id: '2018',
              value: '40.260'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.755',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH219MT_槽19上部线棒出水温度',
              id: '2019',
              value: '40.530'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.839',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH220MT_槽20上部线棒出水温度',
              id: '2020',
              value: '40.680'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.721',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH221MT_槽21上部线棒出水温度',
              id: '2021',
              value: '40.640'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.320',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH222MT_槽22上部线棒出水温度',
              id: '2022',
              value: '40.330'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.056',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH223MT_槽23上部线棒出水温度',
              id: '2023',
              value: '39.760'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.468',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH224MT_槽24上部线棒出水温度',
              id: '2024',
              value: '40.030'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.896',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH225MT_槽25上部线棒出水温度',
              id: '2025',
              value: '40.330'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.077',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH226MT_槽26上部线棒出水温度',
              id: '2026',
              value: '40.230'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '61.420',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH227MT_槽27上部线棒出水温度',
              id: '2027',
              value: '39.860'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.853',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH228MT_槽28上部线棒出水温度',
              id: '2028',
              value: '40.310'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.679',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH229MT_槽29上部线棒出水温度',
              id: '2029',
              value: '40.350'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.309',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH230MT_槽30上部线棒出水温度',
              id: '2030',
              value: '40.500'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.691',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH231MT_槽31上部线棒出水温度',
              id: '2031',
              value: '40.380'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.584',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH232MT_槽32上部线棒出水温度',
              id: '2032',
              value: '40.470'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.317',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH233MT_槽33上部线棒出水温度',
              id: '2033',
              value: '40.520'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.172',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH234MT_槽34上部线棒出水温度',
              id: '2034',
              value: '40.080'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.403',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH235MT_槽35上部线棒出水温度',
              id: '2035',
              value: '40.420'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.422',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH236MT_槽36上部线棒出水温度',
              id: '2036',
              value: '40.620'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.926',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH237MT_槽37上部线棒出水温度',
              id: '2037',
              value: '40.590'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.395',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH238MT_槽38上部线棒出水温度',
              id: '2038',
              value: '40.160'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.509',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH239MT_槽39上部线棒出水温度',
              id: '2039',
              value: '40.290'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.218',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH240MT_槽40上部线棒出水温度',
              id: '2040',
              value: '40.340'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.071',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH241MT_槽41上部线棒出水温度',
              id: '2041',
              value: '40.590'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.012',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH242MT_槽42上部线棒出水温度',
              id: '2042',
              value: '40.570'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.094',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH243MT_槽43上部线棒出水温度',
              id: '2043',
              value: '40.380'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.824',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH244MT_槽44上部线棒出水温度',
              id: '2044',
              value: '40.570'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '61.992',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH245MT_槽45上部线棒出水温度',
              id: '2045',
              value: '39.750'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.163',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH246MT_槽46上部线棒出水温度',
              id: '2046',
              value: '40.740'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.381',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH247MT_槽47上部线棒出水温度',
              id: '2047',
              value: '40.270'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.284',
              rating: '0.000',
              tagDescr: '上层线棒出水温度',
              tagType: '100',
              name: 'GRH248MT_槽48上部线棒出水温度',
              id: '2048',
              value: '40.540'
            }
          ]
        },

        {
          delta0: '-2.000',
          delta11: '2.000',
          delta2: '1.500',
          basetime: '2017-1.1～2019-4.28',
          viewPos: '汽端视图',
          drawLBound: '35.000',
          drawHBound: '75.000',
          tagDesc: '层间温度-最大工况',
          ExpItemID: 2,
          selected: false,
          avg: '50.461',
          min: { name: null, value: '49.640' },
          max: { name: null, value: '55.860' },

          xAxisType: 'category',
          pointSelect: false, // 线上的点的可以选择 (注: 默认情况下，雷达图模式下不显示此项)
          chartType: true, // 图切换（曲线图、雷达图）
          convert: false, // 折算 (注: 默认情况下，雷达图模式下不显示此项)
          conditionLabel: false, // 工况标注 (注: 默认情况下，雷达图模式下不显示此项)
          maskAbnormalData: false, // 屏蔽异常数据  (注: 默认情况下，雷达图模式下不显示此项)
          listTable: true, // 列表
          modal: false, // 模板
          scale: false,

          testItem: [
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.112',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH301MT_槽1上部线棒出水温度',
              id: '3001',
              value: '30.200'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.662',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH202MT_槽2上部层间温度',
              id: '3002',
              value: '30.300'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.494',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH303MT_槽3上部层间温度',
              id: '3003',
              value: '30.330'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.303',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH304MT_槽4上部层间温度',
              id: '3004',
              value: '29.910'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '85.530',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH305MT_槽5上部层间温度',
              id: '3005',
              value: '35.860'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.953',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH306MT_槽6上部层间温度',
              id: '3006',
              value: '30.750'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '61.476',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH307MT_槽7上部层间温度',
              id: '3007',
              value: '29.640'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.015',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH308MT_槽8上部层间温度',
              id: '3008',
              value: '30.780'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.181',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH309MT_槽9上部层间温度',
              id: '3009',
              value: '30.140'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.801',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH210MT_槽10上部层间温度',
              id: '3010',
              value: '30.540'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.081',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH211MT_槽11上部层间温度',
              id: '3011',
              value: '30.180'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.140',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH212MT_槽12上部层间温度',
              id: '3012',
              value: '30.550'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.916',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH213MT_槽13上部层间温度',
              id: '3013',
              value: '30.610'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.117',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH214MT_槽14上部层间温度',
              id: '3014',
              value: '30.400'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.626',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH215MT_槽15上部层间温度',
              id: '3015',
              value: '30.190'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.475',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH216MT_槽16上部层间温度',
              id: '3016',
              value: '30.570'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.717',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH217MT_槽17上部层间温度',
              id: '3017',
              value: '30.190'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.811',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH218MT_槽18上部层间温度',
              id: '3018',
              value: '30.260'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.755',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH219MT_槽19上部层间温度',
              id: '3019',
              value: '30.530'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.839',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH230MT_槽30上部层间温度',
              id: '3020',
              value: '30.680'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.721',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH221MT_槽21上部层间温度',
              id: '3021',
              value: '30.640'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.330',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH222MT_槽22上部层间温度',
              id: '3022',
              value: '30.330'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.056',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH223MT_槽23上部层间温度',
              id: '3023',
              value: '29.760'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.468',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH224MT_槽24上部层间温度',
              id: '3024',
              value: '30.030'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.896',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH225MT_槽25上部层间温度',
              id: '3025',
              value: '30.330'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.077',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH226MT_槽26上部层间温度',
              id: '3026',
              value: '30.230'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '61.430',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH227MT_槽27上部层间温度',
              id: '3027',
              value: '29.860'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.853',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH228MT_槽28上部层间温度',
              id: '3028',
              value: '30.310'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.679',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH229MT_槽29上部层间温度',
              id: '3029',
              value: '30.350'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.309',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH230MT_槽30上部层间温度',
              id: '3030',
              value: '30.500'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.691',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH231MT_槽31上部层间温度',
              id: '3031',
              value: '30.380'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.584',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH232MT_槽32上部层间温度',
              id: '3032',
              value: '30.470'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.317',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH233MT_槽33上部层间温度',
              id: '3033',
              value: '30.530'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.172',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH234MT_槽34上部层间温度',
              id: '3034',
              value: '30.080'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.403',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH235MT_槽35上部层间温度',
              id: '3035',
              value: '30.430'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.422',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH236MT_槽36上部层间温度',
              id: '3036',
              value: '30.630'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.926',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH237MT_槽37上部层间温度',
              id: '3037',
              value: '30.590'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.395',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH238MT_槽38上部层间温度',
              id: '3038',
              value: '30.160'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.509',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH239MT_槽39上部层间温度',
              id: '3039',
              value: '30.290'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.218',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH240MT_槽40上部层间温度',
              id: '3040',
              value: '30.340'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.071',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH241MT_槽41上部层间温度',
              id: '3041',
              value: '30.590'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.012',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH242MT_槽42上部层间温度',
              id: '3042',
              value: '30.570'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.094',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH243MT_槽43上部层间温度',
              id: '3043',
              value: '30.380'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.824',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH244MT_槽44上部层间温度',
              id: '3044',
              value: '30.570'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '61.992',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH245MT_槽45上部层间温度',
              id: '3045',
              value: '29.750'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.163',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH246MT_槽46上部层间温度',
              id: '3046',
              value: '30.740'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.381',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH247MT_槽47上部层间温度',
              id: '3047',
              value: '30.270'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.284',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH248MT_槽48上部层间温度',
              id: '3048',
              value: '30.540'
            }
          ]
        },
        {
          delta0: '-2.000',
          delta11: '2.000',
          delta2: '1.500',
          basetime: '2017-1.1～2019-4.28',
          viewPos: '汽端视图',
          drawLBound: '35.000',
          drawHBound: '75.000',
          tagDesc: '层间温度-最小工况',
          ExpItemID: 2,
          selected: false,
          avg: '50.461',
          min: { name: null, value: '49.640' },
          max: { name: null, value: '55.860' },

          xAxisType: 'category',
          pointSelect: false, // 线上的点的可以选择 (注: 默认情况下，雷达图模式下不显示此项)
          chartType: true, // 图切换（曲线图、雷达图）
          convert: false, // 折算 (注: 默认情况下，雷达图模式下不显示此项)
          conditionLabel: false, // 工况标注 (注: 默认情况下，雷达图模式下不显示此项)
          maskAbnormalData: false, // 屏蔽异常数据  (注: 默认情况下，雷达图模式下不显示此项)
          listTable: true, // 列表
          modal: false, // 模板
          scale: false,

          testItem: [
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.112',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH301MT_槽1上部线棒出水温度',
              id: '3001',
              value: '20.200'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.662',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH202MT_槽2上部层间温度',
              id: '3002',
              value: '20.300'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.494',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH303MT_槽3上部层间温度',
              id: '3003',
              value: '20.330'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.303',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH304MT_槽4上部层间温度',
              id: '3004',
              value: '29.910'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '85.530',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH305MT_槽5上部层间温度',
              id: '3005',
              value: '25.860'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.953',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH306MT_槽6上部层间温度',
              id: '3006',
              value: '20.750'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '61.476',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH307MT_槽7上部层间温度',
              id: '3007',
              value: '19.640'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.015',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH308MT_槽8上部层间温度',
              id: '3008',
              value: '20.780'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.181',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH309MT_槽9上部层间温度',
              id: '3009',
              value: '20.140'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.801',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH210MT_槽10上部层间温度',
              id: '3010',
              value: '20.540'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.081',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH211MT_槽11上部层间温度',
              id: '3011',
              value: '20.180'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.140',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH212MT_槽12上部层间温度',
              id: '3012',
              value: '20.550'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.916',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH213MT_槽13上部层间温度',
              id: '3013',
              value: '20.610'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.117',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH214MT_槽14上部层间温度',
              id: '3014',
              value: '20.400'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.626',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH215MT_槽15上部层间温度',
              id: '3015',
              value: '20.190'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.475',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH216MT_槽16上部层间温度',
              id: '3016',
              value: '20.570'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.717',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH217MT_槽17上部层间温度',
              id: '3017',
              value: '20.190'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.811',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH218MT_槽18上部层间温度',
              id: '3018',
              value: '20.260'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.755',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH219MT_槽19上部层间温度',
              id: '3019',
              value: '20.530'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.839',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH230MT_槽30上部层间温度',
              id: '3020',
              value: '20.680'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.721',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH221MT_槽21上部层间温度',
              id: '3021',
              value: '20.640'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.330',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH222MT_槽22上部层间温度',
              id: '3022',
              value: '20.330'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.056',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH223MT_槽23上部层间温度',
              id: '3023',
              value: '19.760'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.468',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH224MT_槽24上部层间温度',
              id: '3024',
              value: '20.030'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.896',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH225MT_槽25上部层间温度',
              id: '3025',
              value: '20.330'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.077',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH226MT_槽26上部层间温度',
              id: '3026',
              value: '20.230'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '61.430',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH227MT_槽27上部层间温度',
              id: '3027',
              value: '19.860'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.853',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH228MT_槽28上部层间温度',
              id: '3028',
              value: '20.310'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.679',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH229MT_槽29上部层间温度',
              id: '3029',
              value: '20.350'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.309',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH230MT_槽30上部层间温度',
              id: '3030',
              value: '20.500'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.691',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH231MT_槽31上部层间温度',
              id: '3031',
              value: '20.380'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.584',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH232MT_槽32上部层间温度',
              id: '3032',
              value: '20.470'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.317',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH233MT_槽33上部层间温度',
              id: '3033',
              value: '20.530'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.172',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH234MT_槽34上部层间温度',
              id: '3034',
              value: '20.080'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.403',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH235MT_槽35上部层间温度',
              id: '3035',
              value: '20.430'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.422',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH236MT_槽36上部层间温度',
              id: '3036',
              value: '20.630'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.926',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH237MT_槽37上部层间温度',
              id: '3037',
              value: '20.590'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.395',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH238MT_槽38上部层间温度',
              id: '3038',
              value: '20.160'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.509',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH239MT_槽39上部层间温度',
              id: '3039',
              value: '20.290'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.218',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH240MT_槽40上部层间温度',
              id: '3040',
              value: '20.340'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.071',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH241MT_槽41上部层间温度',
              id: '3041',
              value: '20.590'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.012',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH242MT_槽42上部层间温度',
              id: '3042',
              value: '20.570'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.094',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH243MT_槽43上部层间温度',
              id: '3043',
              value: '20.380'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.824',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH244MT_槽44上部层间温度',
              id: '3044',
              value: '20.570'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '61.992',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH245MT_槽45上部层间温度',
              id: '3045',
              value: '19.750'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.163',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH246MT_槽46上部层间温度',
              id: '3046',
              value: '20.740'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '63.381',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH247MT_槽47上部层间温度',
              id: '3047',
              value: '20.270'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '64.284',
              rating: '0.000',
              tagDescr: '层间温度',
              tagType: '100',
              name: 'GRH248MT_槽48上部层间温度',
              id: '3048',
              value: '20.540'
            }
          ]
        },

        {
          delta0: '-2.000',
          delta11: '2.000',
          delta2: '1.500',
          basetime: '2017-1.1～2019-4.28',
          viewPos: '汽端视图',
          drawLBound: '135.000',
          drawHBound: '175.000',
          tagDesc: '下层线棒出水温度-最大工况',
          ExpItemID: 3,
          selected: false,
          avg: '150.461',
          min: { name: null, value: '149.640' },
          max: { name: null, value: '155.860' },

          xAxisType: 'category',
          pointSelect: false, // 线上的点的可以选择 (注: 默认情况下，雷达图模式下不显示此项)
          chartType: true, // 图切换（曲线图、雷达图）
          convert: false, // 折算 (注: 默认情况下，雷达图模式下不显示此项)
          conditionLabel: false, // 工况标注 (注: 默认情况下，雷达图模式下不显示此项)
          maskAbnormalData: false, // 屏蔽异常数据  (注: 默认情况下，雷达图模式下不显示此项)
          listTable: true, // 列表
          modal: false, // 模板
          scale: false,

          testItem: [
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.112',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH201MT_槽1上部线棒出水温度',
              id: '2051',
              value: '150.200'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.662',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH202MT_槽2上部线棒出水温度',
              id: '2052',
              value: '150.200'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.494',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH203MT_槽3上部线棒出水温度',
              id: '2053',
              value: '150.330'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.203',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH204MT_槽4上部线棒出水温度',
              id: '2054',
              value: '149.910'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '185.530',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH205MT_槽5上部线棒出水温度',
              id: '2055',
              value: '155.860'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.953',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH206MT_槽6上部线棒出水温度',
              id: '2056',
              value: '150.750'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '161.476',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH207MT_槽7上部线棒出水温度',
              id: '2057',
              value: '149.640'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '164.015',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH208MT_槽8上部线棒出水温度',
              id: '2058',
              value: '150.780'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.181',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH209MT_槽9上部线棒出水温度',
              id: '2059',
              value: '150.140'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.801',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH210MT_槽10上部线棒出水温度',
              id: '2060',
              value: '150.540'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.081',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH211MT_槽11上部线棒出水温度',
              id: '2061',
              value: '150.180'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '164.140',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH212MT_槽12上部线棒出水温度',
              id: '2062',
              value: '150.550'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.916',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH213MT_槽13上部线棒出水温度',
              id: '2063',
              value: '150.610'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.117',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH214MT_槽14上部线棒出水温度',
              id: '2064',
              value: '150.400'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.626',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH215MT_槽15上部线棒出水温度',
              id: '2065',
              value: '150.190'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.475',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH216MT_槽16上部线棒出水温度',
              id: '2066',
              value: '150.570'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.717',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH217MT_槽17上部线棒出水温度',
              id: '2067',
              value: '150.190'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.811',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH218MT_槽18上部线棒出水温度',
              id: '2068',
              value: '150.260'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.755',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH219MT_槽19上部线棒出水温度',
              id: '2069',
              value: '150.530'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.839',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH220MT_槽20上部线棒出水温度',
              id: '2070',
              value: '150.680'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.721',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH221MT_槽21上部线棒出水温度',
              id: '2071',
              value: '150.640'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.320',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH222MT_槽22上部线棒出水温度',
              id: '2072',
              value: '150.330'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.056',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH223MT_槽23上部线棒出水温度',
              id: '2073',
              value: '49.760'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.468',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH224MT_槽24上部线棒出水温度',
              id: '2074',
              value: '150.030'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.896',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH225MT_槽25上部线棒出水温度',
              id: '2075',
              value: '150.330'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.077',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH226MT_槽26上部线棒出水温度',
              id: '2076',
              value: '150.230'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '161.420',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH227MT_槽27上部线棒出水温度',
              id: '2077',
              value: '149.860'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.853',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH228MT_槽28上部线棒出水温度',
              id: '2078',
              value: '150.310'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.679',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH229MT_槽29上部线棒出水温度',
              id: '2079',
              value: '150.350'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.309',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH230MT_槽30上部线棒出水温度',
              id: '2080',
              value: '150.500'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.691',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH231MT_槽31上部线棒出水温度',
              id: '2081',
              value: '150.380'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.584',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH232MT_槽32上部线棒出水温度',
              id: '2082',
              value: '150.470'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.317',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH233MT_槽33上部线棒出水温度',
              id: '2083',
              value: '150.520'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.172',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH234MT_槽34上部线棒出水温度',
              id: '2084',
              value: '150.080'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.403',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH235MT_槽35上部线棒出水温度',
              id: '2085',
              value: '150.420'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '164.422',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH236MT_槽36上部线棒出水温度',
              id: '2086',
              value: '150.620'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.926',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH237MT_槽37上部线棒出水温度',
              id: '2087',
              value: '150.590'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.395',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH238MT_槽38上部线棒出水温度',
              id: '2088',
              value: '150.160'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.509',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH239MT_槽39上部线棒出水温度',
              id: '2089',
              value: '150.290'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.218',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH240MT_槽40上部线棒出水温度',
              id: '2090',
              value: '150.340'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.071',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH241MT_槽41上部线棒出水温度',
              id: '2091',
              value: '150.590'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '164.012',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH242MT_槽42上部线棒出水温度',
              id: '2092',
              value: '150.570'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.094',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH243MT_槽43上部线棒出水温度',
              id: '2093',
              value: '150.380'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.824',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH244MT_槽44上部线棒出水温度',
              id: '2094',
              value: '150.570'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '161.992',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH245MT_槽45上部线棒出水温度',
              id: '2095',
              value: '149.750'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '164.163',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH246MT_槽46上部线棒出水温度',
              id: '2096',
              value: '150.740'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.381',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH247MT_槽47上部线棒出水温度',
              id: '2097',
              value: '150.270'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '164.284',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH248MT_槽48上部线棒出水温度',
              id: '2098',
              value: '150.540'
            }
          ]
        },
        {
          delta0: '-2.000',
          delta11: '2.000',
          delta2: '1.500',
          basetime: '2017-1.1～2019-4.28',
          viewPos: '汽端视图',
          drawLBound: '135.000',
          drawHBound: '175.000',
          tagDesc: '下层线棒出水温度-最小工况',
          ExpItemID: 3,
          selected: false,
          avg: '150.461',
          min: { name: null, value: '149.640' },
          max: { name: null, value: '155.860' },

          xAxisType: 'category',
          pointSelect: false, // 线上的点的可以选择 (注: 默认情况下，雷达图模式下不显示此项)
          chartType: true, // 图切换（曲线图、雷达图）
          convert: false, // 折算 (注: 默认情况下，雷达图模式下不显示此项)
          conditionLabel: false, // 工况标注 (注: 默认情况下，雷达图模式下不显示此项)
          maskAbnormalData: false, // 屏蔽异常数据  (注: 默认情况下，雷达图模式下不显示此项)
          listTable: true, // 列表
          modal: false, // 模板
          scale: false,

          testItem: [
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.112',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH201MT_槽1上部线棒出水温度',
              id: '2051',
              value: '130.200'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.662',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH202MT_槽2上部线棒出水温度',
              id: '2052',
              value: '130.200'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.494',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH203MT_槽3上部线棒出水温度',
              id: '2053',
              value: '130.330'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.203',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH204MT_槽4上部线棒出水温度',
              id: '2054',
              value: '149.910'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '185.530',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH205MT_槽5上部线棒出水温度',
              id: '2055',
              value: '135.860'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.953',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH206MT_槽6上部线棒出水温度',
              id: '2056',
              value: '130.750'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '161.476',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH207MT_槽7上部线棒出水温度',
              id: '2057',
              value: '149.640'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '164.015',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH208MT_槽8上部线棒出水温度',
              id: '2058',
              value: '130.780'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.181',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH209MT_槽9上部线棒出水温度',
              id: '2059',
              value: '130.140'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.801',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH210MT_槽10上部线棒出水温度',
              id: '2060',
              value: '130.540'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.081',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH211MT_槽11上部线棒出水温度',
              id: '2061',
              value: '130.180'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '164.140',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH212MT_槽12上部线棒出水温度',
              id: '2062',
              value: '130.550'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.916',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH213MT_槽13上部线棒出水温度',
              id: '2063',
              value: '130.610'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.117',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH214MT_槽14上部线棒出水温度',
              id: '2064',
              value: '130.400'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.626',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH215MT_槽15上部线棒出水温度',
              id: '2065',
              value: '130.190'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.475',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH216MT_槽16上部线棒出水温度',
              id: '2066',
              value: '130.570'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.717',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH217MT_槽17上部线棒出水温度',
              id: '2067',
              value: '130.190'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.811',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH218MT_槽18上部线棒出水温度',
              id: '2068',
              value: '130.260'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.755',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH219MT_槽19上部线棒出水温度',
              id: '2069',
              value: '130.530'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.839',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH220MT_槽20上部线棒出水温度',
              id: '2070',
              value: '130.680'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.721',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH221MT_槽21上部线棒出水温度',
              id: '2071',
              value: '130.640'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.320',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH222MT_槽22上部线棒出水温度',
              id: '2072',
              value: '130.330'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '62.056',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH223MT_槽23上部线棒出水温度',
              id: '2073',
              value: '49.760'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.468',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH224MT_槽24上部线棒出水温度',
              id: '2074',
              value: '130.030'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.896',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH225MT_槽25上部线棒出水温度',
              id: '2075',
              value: '130.330'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.077',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH226MT_槽26上部线棒出水温度',
              id: '2076',
              value: '130.230'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '161.420',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH227MT_槽27上部线棒出水温度',
              id: '2077',
              value: '149.860'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.853',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH228MT_槽28上部线棒出水温度',
              id: '2078',
              value: '130.310'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.679',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH229MT_槽29上部线棒出水温度',
              id: '2079',
              value: '130.350'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.309',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH230MT_槽30上部线棒出水温度',
              id: '2080',
              value: '130.500'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.691',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH231MT_槽31上部线棒出水温度',
              id: '2081',
              value: '130.380'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.584',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH232MT_槽32上部线棒出水温度',
              id: '2082',
              value: '130.470'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.317',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH233MT_槽33上部线棒出水温度',
              id: '2083',
              value: '130.520'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.172',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH234MT_槽34上部线棒出水温度',
              id: '2084',
              value: '130.080'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.403',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH235MT_槽35上部线棒出水温度',
              id: '2085',
              value: '130.420'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '164.422',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH236MT_槽36上部线棒出水温度',
              id: '2086',
              value: '130.620'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.926',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH237MT_槽37上部线棒出水温度',
              id: '2087',
              value: '130.590'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.395',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH238MT_槽38上部线棒出水温度',
              id: '2088',
              value: '130.160'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '162.509',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH239MT_槽39上部线棒出水温度',
              id: '2089',
              value: '130.290'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.218',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH240MT_槽40上部线棒出水温度',
              id: '2090',
              value: '130.340'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.071',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH241MT_槽41上部线棒出水温度',
              id: '2091',
              value: '130.590'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '164.012',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH242MT_槽42上部线棒出水温度',
              id: '2092',
              value: '130.570'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.094',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH243MT_槽43上部线棒出水温度',
              id: '2093',
              value: '130.380'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.824',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH244MT_槽44上部线棒出水温度',
              id: '2094',
              value: '130.570'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '161.992',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH245MT_槽45上部线棒出水温度',
              id: '2095',
              value: '149.750'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '164.163',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH246MT_槽46上部线棒出水温度',
              id: '2096',
              value: '130.740'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '163.381',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH247MT_槽47上部线棒出水温度',
              id: '2097',
              value: '130.270'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: '164.284',
              rating: '0.000',
              tagDescr: '下层线棒出水温度',
              tagType: '100',
              name: 'GRH248MT_槽48上部线棒出水温度',
              id: '2098',
              value: '130.540'
            }
          ]
        },

        {
          delta0: '-2.000',
          delta11: '2.000',
          delta2: '1.500',
          basetime: '2017-1.1～2019-4.28',
          viewPos: '汽端视图',
          drawLBound: '35.000',
          drawHBound: '75.000',
          tagDesc: '引出线出水温度-最大工况',

          xAxisType: 'category',
          pointSelect: false, // 线上的点的可以选择 (注: 默认情况下，雷达图模式下不显示此项)
          chartType: false, // 图切换（曲线图、雷达图）
          convert: false, // 折算 (注: 默认情况下，雷达图模式下不显示此项)
          conditionLabel: false, // 工况标注 (注: 默认情况下，雷达图模式下不显示此项)
          maskAbnormalData: false, // 屏蔽异常数据  (注: 默认情况下，雷达图模式下不显示此项)
          listTable: true, // 列表
          modal: false, // 模板
          scale: false,

          ExpItemID: 5,
          selected: false,
          avg: '48.935',
          min: { name: null, value: '45.490' },
          max: { name: null, value: '52.040' },

          Interval: '7.040',
          testItem: [
            {
              factDW: '℃',
              shadow: '0',
              convert: null,
              rating: null,
              tagDescr: '引出线出水温度',
              tagType: '501',
              id: '2201',
              time: '2020-07-16 17:38:36',
              name: 'GRH001MT_发电机U1引出线温度',
              value: '45.490'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: null,
              rating: null,
              tagDescr: '引出线出水温度',
              tagType: '501',
              id: '2202',
              time: '2020-07-16 17:38:36',
              name: 'GRH002MT_发电机V1引出线温度',
              value: '48.370'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: null,
              rating: null,
              tagDescr: '引出线出水温度',
              tagType: '501',
              id: '2203',
              time: '2020-07-16 17:38:36',
              name: 'GRH003MT_发电机W1引出线温度',
              value: '46.420'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: null,
              rating: null,
              tagDescr: '引出线出水温度',
              tagType: '501',
              id: '2204',
              time: '2020-07-16 17:38:36',
              name: 'GRH004MT_发电机U2引出线温度',
              value: '48.870'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: null,
              rating: null,
              tagDescr: '引出线出水温度',
              tagType: '501',
              id: '2205',
              time: '2020-07-16 17:38:36',
              name: 'GRH005MT_发电机V2引出线温度',
              value: '48.770'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: null,
              rating: null,
              tagDescr: '引出线出水温度',
              tagType: '501',
              id: '2206',
              time: '2020-07-16 17:38:37',
              name: 'GRH006MT_发电机W2引出线温度',
              value: '52.040'
            }
          ]
        },
        {
          delta0: '-2.000',
          delta11: '2.000',
          delta2: '1.500',
          basetime: '2017-1.1～2019-4.28',
          viewPos: '汽端视图',
          drawLBound: '35.000',
          drawHBound: '75.000',
          tagDesc: '引出线出水温度-最小工况',

          xAxisType: 'category',
          pointSelect: false, // 线上的点的可以选择 (注: 默认情况下，雷达图模式下不显示此项)
          chartType: false, // 图切换（曲线图、雷达图）
          convert: false, // 折算 (注: 默认情况下，雷达图模式下不显示此项)
          conditionLabel: false, // 工况标注 (注: 默认情况下，雷达图模式下不显示此项)
          maskAbnormalData: false, // 屏蔽异常数据  (注: 默认情况下，雷达图模式下不显示此项)
          listTable: true, // 列表
          modal: false, // 模板
          scale: false,

          ExpItemID: 5,
          selected: false,
          avg: '48.935',
          min: { name: null, value: '35.490' },
          max: { name: null, value: '42.040' },

          Interval: '7.040',
          testItem: [
            {
              factDW: '℃',
              shadow: '0',
              convert: null,
              rating: null,
              tagDescr: '引出线出水温度',
              tagType: '501',
              id: '2201',
              time: '2020-07-16 17:38:36',
              name: 'GRH001MT_发电机U1引出线温度',
              value: '35.490'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: null,
              rating: null,
              tagDescr: '引出线出水温度',
              tagType: '501',
              id: '2202',
              time: '2020-07-16 17:38:36',
              name: 'GRH002MT_发电机V1引出线温度',
              value: '38.370'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: null,
              rating: null,
              tagDescr: '引出线出水温度',
              tagType: '501',
              id: '2203',
              time: '2020-07-16 17:38:36',
              name: 'GRH003MT_发电机W1引出线温度',
              value: '36.420'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: null,
              rating: null,
              tagDescr: '引出线出水温度',
              tagType: '501',
              id: '2204',
              time: '2020-07-16 17:38:36',
              name: 'GRH004MT_发电机U2引出线温度',
              value: '38.870'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: null,
              rating: null,
              tagDescr: '引出线出水温度',
              tagType: '501',
              id: '2205',
              time: '2020-07-16 17:38:36',
              name: 'GRH005MT_发电机V2引出线温度',
              value: '38.770'
            },
            {
              factDW: '℃',
              shadow: '0',
              convert: null,
              rating: null,
              tagDescr: '引出线出水温度',
              tagType: '501',
              id: '2206',
              time: '2020-07-16 17:38:37',
              name: 'GRH006MT_发电机W2引出线温度',
              value: '42.040'
            }
          ]
        },

        {
          delta0: '-2.000',
          delta11: '2.000',
          delta2: '1.500',
          basetime: '2017-1.1～2019-4.28',
          viewPos: '汽端视图',
          drawLBound: '20.000',
          drawHBound: '100.000',
          tagDesc: '铁芯温度-最大工况',
          ExpItemID: 6,
          selected: false,
          avg: '50.739',
          min: { name: null, value: '45.400' },
          max: { name: null, value: '60.600' },
          Interval: '15.200',

          xAxisType: 'category',
          pointSelect: false, // 线上的点的可以选择 (注: 默认情况下，雷达图模式下不显示此项)
          chartType: false, // 图切换（曲线图、雷达图）
          convert: false, // 折算 (注: 默认情况下，雷达图模式下不显示此项)
          conditionLabel: false, // 工况标注 (注: 默认情况下，雷达图模式下不显示此项)
          maskAbnormalData: false, // 屏蔽异常数据  (注: 默认情况下，雷达图模式下不显示此项)
          listTable: true, // 列表
          modal: false, // 模板
          scale: false,

          testItem: [
            {
              id: '5051',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH071MT_铜屏蔽（4-5）温度（汽端）',
              time: '2020-07-16 21:47:28',
              shadow: '0',
              typetag: '601',
              tagDescr: '汽侧端部铜屏蔽温度',
              value: '59.300'
            },
            {
              id: '5053',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH073MT_铜屏蔽（12-13）温度（汽端）',
              time: '2020-07-16 21:14:28',
              shadow: '0',
              typetag: '601',
              tagDescr: '汽侧端部铜屏蔽温度',
              value: '55.500'
            },
            {
              id: '5055',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH075MT_铜屏蔽（44-45）温度（汽端）',
              time: '2020-07-16 21:47:28',
              shadow: '0',
              typetag: '601',
              tagDescr: '汽侧端部铜屏蔽温度',
              value: '57.500'
            },
            {
              id: '5013',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH051MT_定子铁心齿部（4-5，5＃槽壁）温度（汽端）',
              time: '2020-07-16 11:32:24',
              shadow: '0',
              typetag: '605',
              tagDescr: '汽侧端部铁芯温度',
              value: '46.100'
            },
            {
              id: '5015',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH053MT_定子铁心齿部（6-7，7＃槽壁）温度（汽端）',
              time: '2020-07-16 20:47:29',
              shadow: '0',
              typetag: '605',
              tagDescr: '汽侧端部铁芯温度',
              value: '48.600'
            },
            {
              id: '5017',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH055MT_定子铁心齿部（12-13，13＃槽壁）温度（汽端）',
              time: '2020-07-16 22:45:28',
              shadow: '0',
              typetag: '605',
              tagDescr: '汽侧端部铁芯温度',
              value: '49.000'
            },
            {
              id: '5019',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH057MT_定子铁心齿部（38-39，39＃槽壁）温度（汽端）',
              time: '2020-07-16 21:22:28',
              shadow: '0',
              typetag: '605',
              tagDescr: '汽侧端部铁芯温度',
              value: '49.000'
            },
            {
              id: '5021',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH059MT_定子铁心齿部（44-45，45＃槽壁）温度（汽端）',
              time: '2020-07-16 20:46:28',
              shadow: '0',
              typetag: '605',
              tagDescr: '汽侧端部铁芯温度',
              value: '46.100'
            },
            {
              id: '5023',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH061MT_定子铁心齿部（46-47，47＃槽壁）温度（汽端）',
              time: '2020-07-16 13:07:39',
              shadow: '0',
              typetag: '605',
              tagDescr: '汽侧端部铁芯温度',
              value: '48.200'
            },
            {
              id: '5014',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH052MT_定子铁心齿部（4-5，5＃槽壁）温度（励端）',
              time: '2020-07-16 11:43:28',
              shadow: '0',
              typetag: '612',
              tagDescr: '励侧端部铁芯温度',
              value: '46.600'
            },
            {
              id: '5016',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH054MT_定子铁心齿部（6-7，7＃槽壁）温度（励端）',
              time: '2020-07-16 13:05:25',
              shadow: '0',
              typetag: '612',
              tagDescr: '励侧端部铁芯温度',
              value: '46.800'
            },
            {
              id: '5018',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH056MT_定子铁心齿部（12-13，13＃槽壁）温度（励端）',
              time: '2020-07-16 13:06:27',
              shadow: '0',
              typetag: '612',
              tagDescr: '励侧端部铁芯温度',
              value: '45.400'
            },
            {
              id: '5020',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH058MT_定子铁心齿部（38-39，39＃槽壁）温度（励端）',
              time: '2020-07-16 13:04:25',
              shadow: '0',
              typetag: '612',
              tagDescr: '励侧端部铁芯温度',
              value: '46.200'
            },
            {
              id: '5022',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH060MT_定子铁心齿部（44-45，45＃槽壁）温度（励端）',
              time: '2020-07-16 22:47:28',
              shadow: '0',
              typetag: '612',
              tagDescr: '励侧端部铁芯温度',
              value: '48.800'
            },
            {
              id: '5024',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH062MT_定子铁心齿部（46-47，47＃槽壁）温度（励端）',
              time: '2020-07-16 22:47:28',
              shadow: '0',
              typetag: '612',
              tagDescr: '励侧端部铁芯温度',
              value: '48.400'
            },
            {
              id: '5052',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH072MT_铜屏蔽（4-5）温度（励端）',
              time: '2020-07-16 21:16:27',
              shadow: '0',
              typetag: '616',
              tagDescr: '励侧端部铜屏蔽温度',
              value: '60.600'
            },
            {
              id: '5054',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH074MT_铜屏蔽（12-13）温度（励端）',
              time: '2020-07-16 21:46:28',
              shadow: '0',
              typetag: '616',
              tagDescr: '励侧端部铜屏蔽温度',
              value: '54.200'
            },
            {
              id: '5056',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH076MT_铜屏蔽（44-45）温度（励端）',
              time: '2020-07-16 21:47:28',
              shadow: '0',
              typetag: '616',
              tagDescr: '励侧端部铜屏蔽温度',
              value: '57.000'
            }
          ]
        },
        {
          delta0: '-2.000',
          delta11: '2.000',
          delta2: '1.500',
          basetime: '2017-1.1～2019-4.28',
          viewPos: '汽端视图',
          drawLBound: '20.000',
          drawHBound: '100.000',
          tagDesc: '铁芯温度-最小工况',
          ExpItemID: 6,
          selected: false,
          avg: '50.739',
          min: { name: null, value: '35.400' },
          max: { name: null, value: '50.600' },
          Interval: '15.200',

          xAxisType: 'category',
          pointSelect: false, // 线上的点的可以选择 (注: 默认情况下，雷达图模式下不显示此项)
          chartType: false, // 图切换（曲线图、雷达图）
          convert: false, // 折算 (注: 默认情况下，雷达图模式下不显示此项)
          conditionLabel: false, // 工况标注 (注: 默认情况下，雷达图模式下不显示此项)
          maskAbnormalData: false, // 屏蔽异常数据  (注: 默认情况下，雷达图模式下不显示此项)
          listTable: true, // 列表
          modal: false, // 模板
          scale: false,

          testItem: [
            {
              id: '5051',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH071MT_铜屏蔽（4-5）温度（汽端）',
              time: '2020-07-16 21:47:28',
              shadow: '0',
              typetag: '601',
              tagDescr: '汽侧端部铜屏蔽温度',
              value: '49.300'
            },
            {
              id: '5053',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH073MT_铜屏蔽（12-13）温度（汽端）',
              time: '2020-07-16 21:14:28',
              shadow: '0',
              typetag: '601',
              tagDescr: '汽侧端部铜屏蔽温度',
              value: '45.500'
            },
            {
              id: '5055',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH075MT_铜屏蔽（44-45）温度（汽端）',
              time: '2020-07-16 21:47:28',
              shadow: '0',
              typetag: '601',
              tagDescr: '汽侧端部铜屏蔽温度',
              value: '47.500'
            },
            {
              id: '5013',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH051MT_定子铁心齿部（4-5，5＃槽壁）温度（汽端）',
              time: '2020-07-16 11:32:24',
              shadow: '0',
              typetag: '605',
              tagDescr: '汽侧端部铁芯温度',
              value: '36.100'
            },
            {
              id: '5015',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH053MT_定子铁心齿部（6-7，7＃槽壁）温度（汽端）',
              time: '2020-07-16 20:47:29',
              shadow: '0',
              typetag: '605',
              tagDescr: '汽侧端部铁芯温度',
              value: '38.600'
            },
            {
              id: '5017',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH055MT_定子铁心齿部（12-13，13＃槽壁）温度（汽端）',
              time: '2020-07-16 22:45:28',
              shadow: '0',
              typetag: '605',
              tagDescr: '汽侧端部铁芯温度',
              value: '39.000'
            },
            {
              id: '5019',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH057MT_定子铁心齿部（38-39，39＃槽壁）温度（汽端）',
              time: '2020-07-16 21:22:28',
              shadow: '0',
              typetag: '605',
              tagDescr: '汽侧端部铁芯温度',
              value: '39.000'
            },
            {
              id: '5021',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH059MT_定子铁心齿部（44-45，45＃槽壁）温度（汽端）',
              time: '2020-07-16 20:46:28',
              shadow: '0',
              typetag: '605',
              tagDescr: '汽侧端部铁芯温度',
              value: '36.100'
            },
            {
              id: '5023',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH061MT_定子铁心齿部（46-47，47＃槽壁）温度（汽端）',
              time: '2020-07-16 13:07:39',
              shadow: '0',
              typetag: '605',
              tagDescr: '汽侧端部铁芯温度',
              value: '38.200'
            },
            {
              id: '5014',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH052MT_定子铁心齿部（4-5，5＃槽壁）温度（励端）',
              time: '2020-07-16 11:43:28',
              shadow: '0',
              typetag: '612',
              tagDescr: '励侧端部铁芯温度',
              value: '36.600'
            },
            {
              id: '5016',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH054MT_定子铁心齿部（6-7，7＃槽壁）温度（励端）',
              time: '2020-07-16 13:05:25',
              shadow: '0',
              typetag: '612',
              tagDescr: '励侧端部铁芯温度',
              value: '36.800'
            },
            {
              id: '5018',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH056MT_定子铁心齿部（12-13，13＃槽壁）温度（励端）',
              time: '2020-07-16 13:06:27',
              shadow: '0',
              typetag: '612',
              tagDescr: '励侧端部铁芯温度',
              value: '35.400'
            },
            {
              id: '5020',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH058MT_定子铁心齿部（38-39，39＃槽壁）温度（励端）',
              time: '2020-07-16 13:04:25',
              shadow: '0',
              typetag: '612',
              tagDescr: '励侧端部铁芯温度',
              value: '36.200'
            },
            {
              id: '5022',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH060MT_定子铁心齿部（44-45，45＃槽壁）温度（励端）',
              time: '2020-07-16 22:47:28',
              shadow: '0',
              typetag: '612',
              tagDescr: '励侧端部铁芯温度',
              value: '38.800'
            },
            {
              id: '5024',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH062MT_定子铁心齿部（46-47，47＃槽壁）温度（励端）',
              time: '2020-07-16 22:47:28',
              shadow: '0',
              typetag: '612',
              tagDescr: '励侧端部铁芯温度',
              value: '38.400'
            },
            {
              id: '5052',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH072MT_铜屏蔽（4-5）温度（励端）',
              time: '2020-07-16 21:16:27',
              shadow: '0',
              typetag: '616',
              tagDescr: '励侧端部铜屏蔽温度',
              value: '50.600'
            },
            {
              id: '5054',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH074MT_铜屏蔽（12-13）温度（励端）',
              time: '2020-07-16 21:46:28',
              shadow: '0',
              typetag: '616',
              tagDescr: '励侧端部铜屏蔽温度',
              value: '44.200'
            },
            {
              id: '5056',
              factDW: '℃',
              convert: null,
              rating: null,
              name: 'GRH076MT_铜屏蔽（44-45）温度（励端）',
              time: '2020-07-16 21:47:28',
              shadow: '0',
              typetag: '616',
              tagDescr: '励侧端部铜屏蔽温度',
              value: '47.000'
            }
          ]
        }
      ],
      // 图线的数据
      chartDATA: null
    }
  },
  computed: {
    dateTime () {
      return this.date + ' ' + this.time
    },
    chartTitle () {
      return this.title
    },
    // 图全局配置属性
    // 坐标轴类型。可选：
    // 'value' 数值轴，适用于连续数据。
    // 'category' 类目轴，适用于离散的类目数据。为该类型时类目数据可自动从 series.data 或 dataset.source 中取，或者可通过 xAxis.data 设置类目数据。
    // 'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
    // 'log' 对数轴。适用于对数数据
    chartFunctions () {
      let obj = null
      if (this.legendSelectedMode === 'single') {
        obj = {
          xAxisType: 'category', // X轴类型
          pointSelect: false, // 线上的点的可以选择
          chartType: true, // 图切换（曲线图、雷达图）
          convert: false, // 折算图
          conditionLabel: false, // 工况标注
          maskAbnormalData: false, // 屏蔽异常数据
          listTable: true, // 列表
          modal: false, // 模板
          scale: false // 比例尺
        }
      } else {
        obj = {
          xAxisType: 'value', // X轴类型
          pointSelect: false, // 线上的点的可以选择
          chartType: true, // 图切换（曲线图、雷达图）
          convert: false, // 折算图
          conditionLabel: false, // 工况标注
          maskAbnormalData: false, // 屏蔽异常数据
          listTable: true, // 列表
          modal: false, // 模板
          scale: false // 比例尺
        }
      }
      return obj
    }
  },
  mounted () {
    const self = this

    DY_ID = 95

    // 根据读取的数据，重新构建JSON数据给图控件
    self.chartDATA = []
    self.xmlData.forEach((line, index) => {
      const testItem = line.testItem || []
      let lineData = self.chartDATA[index] || {}
      lineData = {}
      // id = 机组ID+线项目ID+日期时间戳
      lineData.id =
        DY_ID + line.ExpItemID + self.$moment.timeStamp(self.dateTime) // 机组ID+Tag分类ID+时间戳
      lineData.name = '' + line.tagDesc // 线名称
      lineData.legend = '' + line.tagDesc // 线名称 - 图例
      lineData.title = line.viewPos // 图 名称
      lineData.chartType = line.chartType // 图切换（曲线图、雷达图）

      lineData.yAxis0Name = line.yAxis0Name // '(单位：摄氏度)',
      lineData.yAxis1Name = line.yAxis1Name // yAxis1Name: '(单位：摄氏度)',

      // 清空
      lineData.nodes = []
      lineData.fullNames = []
      lineData.names = []
      lineData.index = []
      lineData.value = []
      lineData.convert = []

      lineData.lineAttr = {
        xAxisType: line.xAxisType || 'category',
        pointSelect: line.pointSelect || false,
        chartType: line.chartType || false,
        convert: line.convert || false,
        conditionLabel: line.conditionLabel || false,
        maskAbnormalData: line.maskAbnormalData || false,
        listTable: line.listTable || false,
        modal: line.modal || false,
        scale: line.scale || false
      }

      testItem.forEach((item, index) => {
        lineData.nodes.push({ id: item.id, name: item.name, value: item.value }) // 测点基本信息
        lineData.fullNames.push(item.name) // 测点全称
        lineData.names.push(item.name.split('_')[0].replace(/GRH/gi, '') || '') // 测点简称
        lineData.index.push(index + 1)
        // 点数值
        if (item.shadow === '1') {
          lineData.value.push(item.value + '|error')
        } else if (item.value === 'NULL') {
          lineData.value.push('NULL')
        } else {
          lineData.value.push(item.value || '')
        }

        // 折算
        lineData.convert.push(item.convert || '')

        lineData.others = []
        lineData.others.push({
          factDW: item.factDW || '', // 点单位
          shadow: item.shadow || '0', // 屏蔽数据
          rating: item.rating || '0.000',
          tagDescr: item.tagDesc || '',
          tagType: item.tagType || '',
          name: item.name || '', // 点全称
          id: item.id || null
        })
      })

      self.cinfo = {
        datetime: self.dateTime, // self.chartDATA[0].title,
        ctitle: self.chartTitle,
        dynamo: null // 单台 or 多台 怎么办？
      }

      lineData.expItemID = line.ExpItemID
      lineData.avg = line.avg // 温度平均值
      lineData.min = line.min // 温度最小值
      lineData.max = line.max // 温度最大值
      lineData.selected = line.selected // 其是否默认显示
      lineData.diff =
        (parseFloat(line.max.value * 1000) -
          parseFloat(line.min.value * 1000)) /
        1000 // 温度最大-最小值
      lineData.drawLBound = line.drawLBound
      lineData.drawHBound = line.drawHBound

      self.chartDATA[index] = lineData || {}
    })

    // 注：折算 时需要加入判断 此时间 是不是稳定点，如果不是稳定点，提示非稳定点没有折算数据！
    // 根据时间确定 是否为 稳态 "sea_get/sea_GetStabStatus.asp?dynamo=" + Dynamo + "&setTime=" + STAB_DATE + "&stab="+CurrentTabInfo.stabtype
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.page{
  width: 100%;
  max-width: 100% !important;
  padding: 0 !important;
  margin: 36px 0 0 0 !important;
}
#datetimePickerComponent{
  display: flex;
  height:32px;
  line-height:32px;
  padding: 2px;
}
</style>
