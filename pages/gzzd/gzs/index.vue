<template>
  <div class="page">
    <v-row dense>
      <v-col
        v-for="d in items"
        :key="d.title"
        cols="12"
        sm="6"
        md="2"
        lg="2"
      >
        <v-expansion-panels v-model="panel" focusable hover :multiple="true">
          <v-expansion-panel>
            <v-card class="mx-auto" outlined dense>
              <v-expansion-panel-header class="header1">
                <h4 class="black--text" v-text="d.title" />
                <v-spacer />
              </v-expansion-panel-header>

              <v-card-text class="px-0 py-0 mx-0 my-0">
                <v-expansion-panel-content eager>
                  <!-- <span class="subheading">Select item</span> -->
                  <v-chip-group column>
                    <span
                      v-for="dd in d.data"
                      :key="dd.name"
                      :class="`${dd.status}`"
                    >
                      <v-chip
                        label
                        class="subtitle-2 white info--text"
                        @click.stop="open(dd.name)"
                      >
                        {{ dd.name }}
                      </v-chip>
                    </span>
                  </v-chip-group>
                </v-expansion-panel-content>
              </v-card-text>
            </v-card>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <v-layout align-center justify-center row fill-height>
      <v-dialog
        v-model="dialog"
        fullscreen
        scrollable
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card flat dense>
          <v-toolbar dark dense color="primary" class="dialogToolbar">
            <v-toolbar-title
              class="subtitle-1"
              v-text="item.name"
            />
            <v-spacer />
            <v-btn icon small dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text dense>
            <!-- 故障树图 -->
            <FaultTree
              v-if="dialog"
              fault-type="faultTree"
              :dynamo-id="item.dynamoId"
              :tree-id="item.treeId"
              :item-name="item.name"
            />
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script type="text/ecmascript-6">
import FaultTree from '@/components/common/FaultTree/index.vue'

export default {
  name: 'Home',
  components: {
    FaultTree
  },
  data () {
    return {
      panel: [0],
      items: [
        {
          title: '定子',
          status: '正常',
          content: '',
          gonglv: [
            { name: '', status: 'normal', content: '' },
            { name: '', status: 'normal', content: '' }
          ],
          data: [
            { name: '定子线棒温度高', status: 'normal', content: '正常', to: '/gzzd/gzs/1.1' },
            { name: '定子铁芯温度高', status: 'normal', content: '正常', to: '/gzzd/gzs/1.2' },
            { name: '引出线出水温度高', status: 'normal', content: '正常', to: '/gzzd/gzs/1.3' },
            { name: '定子铁芯铜屏蔽温度高', status: 'normal', content: '正常', to: '/gzzd/gzs/1.4' },
            { name: '引出线出水温度', status: 'normal', content: '正常', to: '/gzzd/gzs/1.5' },
            { name: '定子绕组直流泄漏电流试验不合格', status: 'normal', content: '正常', to: '/gzzd/gzs/1.6' },
            { name: '定子绕组真空、压力试验不合格', status: 'normal', content: '正常', to: '/gzzd/gzs/1.7' },
            { name: '定子三相电流不平衡', status: 'normal', content: '正常', to: '/gzzd/gzs/1.8' },
            { name: '进相运行调整不当', status: 'normal', content: '正常', to: '/gzzd/gzs/1.9' },
            { name: '定子绕组端部振动大', status: 'normal', content: '正常', to: '/gzzd/gzs/1.10' },
            { name: '发电机局部放电量大', status: 'normal', content: '正常', to: '/gzzd/gzs/1.11' },
            { name: '发电机过负荷', status: 'normal', content: '正常', to: '/gzzd/gzs/1.12' },
            { name: '定子线棒流量分配试验不合格', status: 'normal', content: '正常', to: '/gzzd/gzs/1.13' },
            { name: '引出线水路流量试验不合格', status: 'normal', content: '正常', to: '/gzzd/gzs/1.14' },
            { name: '定子绕组电气回路接触不良', status: 'normal', content: '正常', to: '/gzzd/gzs/1.15' }
          ]
        },
        {
          title: '转子',
          status: 'normal',
          content: '',
          gonglv: [
            { name: '', status: 'normal', content: '' },
            { name: '', status: 'normal', content: '' }
          ],
          data: [
            { name: '发电机轴承振动大', status: 'normal', content: '正常', to: '/gzzd/gzs/2.1' },
            { name: '轴电压高', status: 'normal', content: '正常', to: '/gzzd/gzs/2.2' },
            { name: '转子绕组匝间短路', status: 'normal', content: '正常', to: '/gzzd/gzs/2.3' },
            { name: '转子绕组一点接地', status: 'normal', content: '正常', to: '/gzzd/gzs/2.4' },
            { name: '轴电流大', status: 'normal', content: '正常', to: '/gzzd/gzs/2.5' },
            { name: '转子绕组平均温度高', status: 'normal', content: '正常', to: '/gzzd/gzs/2.6' },
            { name: '发电机轴承回油温度高', status: 'normal', content: '正常', to: '/gzzd/gzs/2.7' },
            { name: '发电机轴承金属温度高', status: 'normal', content: '正常', to: '/gzzd/gzs/2.8' },
            { name: '轴承进油母管温度GGR102MT低', status: 'normal', content: '正常', to: '/gzzd/gzs/2.9' },
            { name: '轴承进油母管温度GGR102MT高', status: 'normal', content: '正常', to: '/gzzd/gzs/2.10' },
            { name: '发电机发生了非全相运行故障', status: 'normal', content: '正常', to: '/gzzd/gzs/2.11' },
            { name: '发电机发生了不对称短路故障', status: 'normal', content: '正常', to: '/gzzd/gzs/2.12' },
            { name: '发电机发生了异步启动故障', status: 'normal', content: '正常', to: '/gzzd/gzs/2.13' }
          ]
        },
        {
          title: '机壳',
          status: 'normal',
          content: '',
          onglv: [
            { name: '', status: 'normal', content: '' },
            { name: '', status: 'normal', content: '' }
          ],
          data: [
            { name: '发电机漏液检测计液位高', status: 'normal', content: '正常', to: '/gzzd/gzs/3.1' },
            { name: '机座振动大', status: 'normal', content: '正常', to: '/gzzd/gzs/3.2' },
            { name: '励磁机液位检测计液位高', status: 'normal', content: '正常', to: '/gzzd/gzs/3.3' }
          ]
        },
        {
          title: '氢气冷却器',
          status: 'normal',
          content: '',
          onglv: [
            { name: '', status: 'normal', content: '' },
            { name: '', status: 'normal', content: '' }
          ],
          data: [
            { name: '冷氢温度高', status: 'normal', content: '正常', to: '/gzzd/gzs/4.1' },
            { name: '发电机两侧冷氢温差大', status: 'normal', content: '注意', to: '/gzzd/gzs/4.2' },
            { name: '热氢温度高', status: 'normal', content: '注意', to: '/gzzd/gzs/4.3' },
            { name: '冷氢与定子进口水温差大', status: 'normal', content: '正常', to: '/gzzd/gzs/4.4' },
            { name: '冷热氢温差大', status: 'normal', content: '注意', to: '/gzzd/gzs/4.5' },
            { name: '发电机两侧热氢温差大', status: 'normal', content: '正常', to: '/gzzd/gzs/4.6' },
            { name: '闭路水供水温度SRI001MT高', status: 'normal', content: '正常', to: '/gzzd/gzs/4.7' },
            { name: '闭路水总流量SRI001MD低', status: 'normal', content: '正常', to: '/gzzd/gzs/4.8' },
            { name: '励磁机冷风温度高', status: 'normal', content: '正常', to: '/gzzd/gzs/4.9' },
            { name: '励磁机热风温度高', status: 'normal', content: '正常', to: '/gzzd/gzs/4.10' }
          ]
        },
        {
          title: '定子冷却水系统',
          status: '正常',
          content: '',
          onglv: [
            { name: '', status: 'normal', content: '' },
            { name: '', status: 'normal', content: '' }
          ],
          data: [
            { name: '定子水进口温度GST001MT高', status: 'normal', content: '正常', to: '/gzzd/gzs/5.1' },
            { name: '定子水进口压力GST004MP高于正常值', status: 'normal', content: '注意', to: '/gzzd/gzs/5.2' },
            { name: '定子水箱气表流量GST002QD增加', status: 'normal', content: '注意', to: '/gzzd/gzs/5.3' },
            { name: '定子水流量GST002MD低', status: 'normal', content: '正常', to: '/gzzd/gzs/5.4' },
            { name: '定子水箱GST001CW水位低', status: 'normal', content: '注意', to: '/gzzd/gzs/5.5' },
            { name: '定子水箱GST001CW水位高', status: 'normal', content: '正常', to: '/gzzd/gzs/5.6' },
            { name: '定子水进口压力GST004MP高', status: 'normal', content: '正常', to: '/gzzd/gzs/5.7' },
            { name: '定子水入口电导率GST001MR等高', status: 'normal', content: '正常', to: '/gzzd/gzs/5.8' },
            { name: '定子水进口温度GST001MT低', status: 'normal', content: '正常', to: '/gzzd/gzs/5.9' },
            { name: '定子水出口温度GST002MT等高', status: 'normal', content: '正常', to: '/gzzd/gzs/5.10' },
            { name: '定子水进口压力GST004MP低', status: 'normal', content: '正常', to: '/gzzd/gzs/5.11' }
          ]
        },
        {
          title: '氢气系统',
          status: '正常',
          content: '',
          onglv: [
            { name: '', status: 'normal', content: '' },
            { name: '', status: 'normal', content: '' }
          ],
          data: [
            { name: '氢气压力GRV001／002MP低', status: 'normal', content: '正常', to: '/gzzd/gzs/6.1' },
            { name: '氢气压力GRV001／002MP高', status: 'normal', content: '注意', to: '/gzzd/gzs/6.2' },
            { name: '氢气露点温度GRV004MZ高', status: 'normal', content: '注意', to: '/gzzd/gzs/6.3' },
            { name: '氢气纯度GRV001／002MG低', status: 'normal', content: '正常', to: '/gzzd/gzs/6.4' },
            { name: '氢气干燥器出口露点温度GRV003MZ高', status: 'normal', content: '注意', to: '/gzzd/gzs/6.5' },
            { name: '铁芯监测仪读数GRV005MG低', status: 'normal', content: '正常', to: '/gzzd/gzs/6.6' },
            { name: '补氢量GRV001QD大', status: 'normal', content: '正常', to: '/gzzd/gzs/6.7' }
          ]
        },
        {
          title: '油系统',
          status: '正常',
          content: '',
          onglv: [
            { name: '', status: 'normal', content: '' },
            { name: '', status: 'normal', content: '' }
          ],
          data: [
            { name: '油氢压差GHE001MP低', status: 'normal', content: '正常', to: '/gzzd/gzs/7.1' },
            { name: '真空油箱GHE001CW液位低', status: 'normal', content: '正常', to: '/gzzd/gzs/7.2' },
            { name: '真空油箱GHE001CW真空度低', status: 'normal', content: '正常', to: '/gzzd/gzs/7.3' },
            { name: '密封油泵GHE101／201／301PO出口压力低', status: 'normal', content: '正常', to: '/gzzd/gzs/7.4' }
          ]
        }
      ],
      dialog: false,
      item: {
        dynamoId: -1,
        treeId: -1,
        name: ''
      },
      hData: [
        {
          id: '125006',
          name: '定子铁芯铜屏蔽温度高',
          side: '0',
          Color: '0',
          children: [
            {
              id: '151001',
              name: '冷氢温度高',
              side: '1',
              Color: '0',
              children: [
                {
                  id: '151007',
                  name: '氢冷器水侧窝气',
                  side: '1',
                  Color: '0',
                  children: []
                },
                {
                  id: '151008',
                  name: '氢冷器泄漏',
                  side: '1',
                  Color: '0',
                  children: [
                    {
                      id: '171003',
                      name: '氢气露点温度GRV004MZ高',
                      side: '2',
                      Color: '0',
                      children: []
                    },
                    {
                      id: '171008',
                      name: '漏氢量大',
                      side: '2',
                      Color: '0',
                      children: []
                    },
                    {
                      id: '141007',
                      name: '机壳内积水',
                      side: '2',
                      Color: '0',
                      children: []
                    },
                    {
                      id: '171001',
                      name: '氢气压力GRV001／002MP低',
                      side: '2',
                      Color: '0',
                      children: []
                    }
                  ]
                },
                {
                  id: '171029',
                  name: '氢冷器冷却效能低或通风系统异常',
                  side: '1',
                  Color: '0',
                  children: [
                    {
                      id: '151005',
                      name: '氢气冷却器冷却效能低',
                      side: '0',
                      Color: '0',
                      children: [
                        {
                          id: '151006',
                          name: '氢冷器堵塞故障',
                          side: '1',
                          Color: '0',
                          children: []
                        },
                        {
                          id: '171025',
                          name: '氢冷器外表脏污、损伤',
                          side: '1',
                          Color: '0',
                          children: []
                        }
                      ]
                    },
                    {
                      id: '171028',
                      name: '发电机通风冷却系统异常',
                      side: '0',
                      Color: '0',
                      children: [
                        {
                          id: '171026',
                          name: '冷、热氢短路',
                          side: '1',
                          Color: '0',
                          children: []
                        }
                      ]
                    },
                    {
                      id: '151013',
                      name: '冷热氢温差小',
                      side: '2',
                      Color: '0',
                      children: []
                    }
                  ]
                },
                {
                  id: '151003',
                  name: '氢冷器冷却水流量低',
                  side: '1',
                  Color: '0',
                  children: [
                    {
                      id: '171024',
                      name: '氢气温度控制阀GRH001VD故障',
                      side: '1',
                      Color: '0',
                      children: []
                    },
                    {
                      id: '151019',
                      name: '氢冷器冷却水系统泄漏',
                      side: '1',
                      Color: '0',
                      children: [
                        {
                          id: '151021',
                          name: '氢冷器疏水阀关闭不严',
                          side: '0',
                          Color: '0',
                          children: []
                        },
                        {
                          id: '151020',
                          name: '氢冷器冷却水系统管路泄漏',
                          side: '0',
                          Color: '0',
                          children: []
                        }
                      ]
                    },
                    {
                      id: '151018',
                      name: '氢冷器及其冷却水系统中某些阀门开度异常',
                      side: '1',
                      Color: '0',
                      children: []
                    },
                    {
                      id: '162011',
                      name: '闭路水总流量SRI001MD低',
                      side: '1',
                      Color: '0',
                      children: []
                    }
                  ]
                },
                {
                  id: '151004',
                  name: '氢冷器冷却水入口温度高',
                  side: '1',
                  Color: '0',
                  children: [
                    {
                      id: '162008',
                      name: '闭路水供水温度SRI001MT高',
                      side: '1',
                      Color: '0',
                      children: []
                    }
                  ]
                }
              ]
            },
            {
              id: '125001',
              name: '定子铁芯铜屏蔽松动',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '125002',
              name: '定子铁芯铜屏蔽通风不良',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '171001',
              name: '氢气压力GRV001／002MP低',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '114023',
              name: '发电机过负荷',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '151002',
              name: '热氢温度高',
              side: '2',
              Color: '0',
              children: []
            },
            {
              id: '151014',
              name: '冷热氢温差大',
              side: '2',
              Color: '0',
              children: []
            }
          ]
        }
      ]
    }
  },
  computed: {

  },
  // async
  created () {
  },
  mounted () {
    // 页面加载数据完毕
    // this.$nextTick(function() {

    // })
  },
  methods: {
    open (name) {
      const self = this
      self.item = {
        dynamoId: 84,
        treeId: 11345,
        name
      }

      self.dialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
.normal1{
  font-weight: bolder;
  border: solid 1px pink;
}

.header1{
  background-color: #edf2f7 !important;
  color: #edf2f7 !important;
}

.v-dialog{
  .dialogToolbar{
    flex: 0 1 auto !important;
  }
}

>>> .v-expansion-panel-content{
  .v-expansion-panel-content__wrap{
    padding: 2px !important;
  }
}
</style>
