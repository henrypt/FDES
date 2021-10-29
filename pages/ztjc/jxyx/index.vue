<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-iterator
          class="jinxiangyunxing"
          :items="jinxiangyunxingInfo"
          hide-default-footer
          light
        >
          <template #header>
            <v-toolbar
              width="200"
              height="30"
              color="sub_title1 words--text"
              class="ml-2"
              dense
              tile
              short
            >
              <h6 class="font-weight-bold" v-text="title" />
            </v-toolbar>
          </template>

          <template #default="props">
            <v-row dense>
              <v-col
                v-for="(item, index) in props.items"
                :key="index"
                cols="12"
                sm="6"
                md="4"
                lg="4"
                class="mx-auto pa-0"
              >
                <v-card dense>
                  <v-divider />
                  <v-list class="pa-0 ma-0">
                    <v-list-item v-for="d in item.data" :key="d.key" dense>
                      <v-list-item-content
                        class="d-inline-block subtitle-2 text-truncate words--text pr-5"
                        style="min-width:320px"
                        :title="d.key"
                        v-text="d.key"
                      />
                      <v-list-item-content class="align-end">
                        <CeDian v-model="selectedItems" :node="d" />
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          <!-- {{selectedItems}} -->
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>

    <v-row
      dense
      class="mt-2 float-left"
      style="width:100% !important; max-width:1330px"
    >
      <v-col cols="12" class="subtitle-2 mx-auto">
        <v-alert elevation="2" class="overline py-1 text-left">
          <div class="float-left pr-2">
            <v-icon color="warning">
              mdi-alert-circle
            </v-icon>
          </div>
          <div class="float-left subtitle-2">
            {{ tips.tip1 }}
            <br>
            <strong class="warning--text subtitle-2">
              {{ tips.tip2.title }}
            </strong>
            <ul class="px-0">
              <li
                v-for="(item, index) in tips.tip2.items"
                :key="index"
                style="list-style:none;"
              >
                <v-icon
                  color="info"
                  v-text="`mdi-numeric-${index + 1}-circle`"
                />
                {{ item }}
              </li>
            </ul>
          </div>
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script type="text/ecmascript-6">
import CeDian from '@/components/ZhuangTaiJianCe/CeDian'
export default {
  name: 'JinXiangYunXing',
  components: {
    CeDian
  },
  model: {
    prop: 'msg',
    event: 'vModel'
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['msg'],
  data () {
    return {
      selectedItems: [],
      title: '进相运行监测屏',
      jinxiangyunxingInfo: [
        {
          name: 1,
          data: [
            {
              key: 'GEX402WMT_发电机有功(MW)',
              id: 91001,
              value: '279.0',
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: '静稳裕度',
              id: 92001,
              value: '',
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GEX404MU_定子电压U-V(kV)',
              id: 93001,
              value: '24.090',
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GEX405MU_定子电压V-W(kV)',
              id: 94001,
              value: '24.090',
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GEX405MU_定子电压W-U(kV)',
              id: 95001,
              value: '24.090',
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GEX405MU_定子电压W-U(kV)1',
              id: 96001,
              value: '24.090',
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GEX404MU_定子电压U-V(kV)1',
              id: 97001,
              value: '24.090',
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GEX405MU_定子电压V-W(kV)1',
              id: 98001,
              value: '24.090',
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 2,
          data: [
            {
              key: 'GEX402WMT_发电机无功(Mvar)',
              id: 91002,
              value: '69.0',
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: '发电机功角计算',
              id: 92002,
              value: '',
              grade: { class: 0, status: '', content: '' }
            },
            {
              key: 'GEX408MI_U相定子电流(kA)',
              id: 93002,
              value: '6.720',
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'GEX408MI_V相定子电流(kA)2',
              id: 94002,
              value: '6.820',
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'GEX408MI_W相定子电流(kA)2',
              id: 95002,
              value: '7.720',
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'GST004MP_定冷水入口压力(kPa)2',
              id: 96002,
              value: '319.40',
              grade: { class: 0, status: '', content: '' }
            },
            {
              key: 'GST002MD_定子冷却水流量(m3/h)2',
              id: 97002,
              value: '193.70',
              grade: { class: 0, status: '', content: '' }
            },
            {
              key: 'GST101MT_定子水进口温度(o)2',
              id: 98002,
              value: '44.29',
              grade: { class: 0, status: '', content: '' }
            }
          ]
        },
        {
          name: 3,
          data: [
            {
              key: '功率因数',
              id: 91003,
              value: 0.9980,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'OGEWO*1MU_主变高压侧电压(kV)',
              id: 92003,
              value: '528.10',
              grade: { class: 2, status: 'warning', content: '警告' }
            },
            {
              key: 'LKA202MU_低压母线LKA001TB电压(V)',
              id: 93003,
              value: '389.2',
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'LKA202MU_低压母线LKB001TB电压(V)',
              id: 94003,
              value: '389.2',
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'LKQ850MU_低压母线LKB001TB电压(V)',
              id: 95003,
              value: '401.3',
              grade: { class: 2, status: 'warning', content: '警告' }
            },
            {
              key: 'LKQ850MU_低压母线LKB001TB电压(kPa)',
              id: 96003,
              value: '301.40',
              grade: { class: 0, status: '', content: '' }
            },
            {
              key: 'LKQ850MU_低压母线LKB001TB电压(m3/h)',
              id: 97003,
              value: '293.70',
              grade: { class: 0, status: '', content: '' }
            },
            {
              key: 'LKQ850MU_低压母线LKB001TB电压(o)',
              id: 98003,
              value: '144.29',
              grade: { class: 0, status: '', content: '' }
            }
          ]
        }
      ],
      tips: {
        tip1: '发电机功角计算值不得大于75度（进相100Mvar为73度），定子电压不得低于24.7kV(-5%)，6.6kV母线电压不低于6.2kV(-6%)，380V母线电压不低于357.2V(-6%).',
        tip2: {
          title: '同时还应注意监视:',
          items: ['定子铁芯温度不得高于规定值', '定子线棒出水温度和定子线棒层间温度不得高于正常值', '发电机氢温不得高于规定值', '氢气压力不得低于额定值']
        },
        tip3: {
          title: '运行中应注意：',
          items: [
            '发电机在进相运行期间，应尽量减少有功功率的波动',
            '当需要调节进相深度时，应注意：'
          ]
        }
      }
    }
  },
  computed: {

  },
  watch: {
    selectedItems (val) {
      this.$emit('vModel', this.selectedItems)
    }
  },
  mounted () {
    this.selectedItems = this.msg
  }
}
</script>

<style lang="scss" scoped>
.jinxiangyunxing{
  .v-list-item .align-end{
    flex:0 1 auto !important;
    min-width:90px !important;
  }
}
</style>
