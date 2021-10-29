<template>
  <v-data-iterator
    class="gongkuang mt-lg-1"
    :items="gongkuangInfo"
    hide-default-footer
    light
    style="max-width:1400px"
  >
    <template #header>
      <v-toolbar
        width="200"
        height="24"
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
      <v-row class="ml-1 mr-1">
        <v-col
          v-for="(item, index) in props.items"
          :key="index"
          cols="12"
          sm="4"
          md="4"
          lg="3"
          class="pa-0 ma-0 px-0 py-0 mx-0 my-0 mt-3"
        >
          <v-card dense>
            <v-divider />
            <v-list dense class="px-0 py-0 mx-0 my-0">
              <v-list-item
                v-for="d in item.data"
                :key="d.key"
                dense
                class="body-1 px-2 py-0 words--text"
              >
                <v-list-item-content
                  class="d-inline-block text-truncate subtitle-2 px-0 py-0 mx-0 my-0"
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
</template>

<script type="text/ecmascript-6">
import CeDian from '@/components/ZhuangTaiJianCe/CeDian'
export default {
  name: 'GongKuang',
  components: {
    CeDian
  },
  model: {
    prop: 'msg',
    event: 'vModel'
  },
  props: {
    msg: {
      type: null,
      default: null,
      required: false
    }
  },
  data () {
    return {
      selectedItems: [],
      title: '发电机工况',
      gongkuangInfo: [
        {
          name: 1,
          data: [
            {
              key: 'GEX402WMT_发电机有功(MW)',
              id: 91001,
              value: 1090.0,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GEX402WMT_发电机无功(Mvar)',
              id: 91002,
              value: 69.0,
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: '功率因数',
              id: 91003,
              value: 0.9980,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 2,
          data: [
            {
              key: 'GEX404MUT_定子电压(kA)',
              id: 91004,
              value: 23.0,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GEX408MIT_定子电流(kA)',
              id: 91005,
              value: 26.0,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRV001MP_发电机壳体氢压(kPa)',
              id: 91006,
              value: 289.0,
              grade: { class: 2, status: 'purple', content: '注意' }
            }
          ]
        },
        {
          name: 3,
          data: [
            {
              key: 'GRH401MT_101氢气进口温度(°C)',
              id: 91007,
              value: 48.0,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH401MT_101氢气出口温度(°C)',
              id: 91008,
              value: 37.0,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GST002MD_定子冷却水流量(m3/h)',
              id: 91009,
              value: 192.0,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 4,
          data: [
            {
              key: 'GST001MT_定子水进口温度(°C)',
              id: 91010,
              value: 44.0,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GST002MT_定子水出口温度(°C)',
              id: 92001,
              value: 64.0,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GST004MP_定冷却水入口压力(kPa)',
              id: 92002,
              value: 259.0,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        }
      ]
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
.gongkuang{
  .v-list-item .align-end{
    flex:0 1 auto !important;
    min-width:90px !important;
  }
}
</style>
