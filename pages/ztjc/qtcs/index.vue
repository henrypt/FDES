<template>
  <v-container fluid>
    <!-- 工具按钮组 -->
    <Buttons />
    <v-row>
      <v-col>
        <v-data-iterator
          class="dingzixianbang1"
          :items="items1.items"
          :items-per-page.sync="itemsPerPage"
          hide-default-footer
          light
        >
          <template #header>
            <v-toolbar
              width="200"
              height="24"
              color="sub_title1 words--text"
              class="ml-1"
              dense
              tile
              short
            >
              <h6 class="font-weight-bold" v-text="items1.title" />
            </v-toolbar>
          </template>

          <template #default="props">
            <v-row class="px-0 py-0 mx-0 my-0">
              <v-col
                v-for="item in props.items"
                :key="item.id"
                cols="12"
                sm="4"
                md="4"
                lg="2"
                class="px-0 py-0 mr-1"
              >
                <v-card dense>
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content class="d-inline-block pb-0 mb-0">
                        <v-text-field
                          label="测点名称"
                          outlined
                          readonly
                          dense
                          :hide-details="true"
                          class="d-inline-block caption words--text"
                          :value="item.key"
                        />
                        <CeDian v-model="selectedItems" :node="item" />
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-data-iterator
          class="dingzixianbang2"
          :items="items2.items"
          :items-per-page.sync="itemsPerPage"
          hide-default-footer
          light
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
              <h6 class="font-weight-bold" v-text="items1.title" />
            </v-toolbar>
          </template>

          <template #default="props">
            <v-row class="ml-1 mr-1 mt-0">
              <v-col
                v-for="item in props.items"
                :key="item.id"
                cols="12"
                sm="4"
                md="4"
                lg="2"
                class="px-0 py-0 mr-1"
              >
                <v-card>
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content class="d-inline-block pb-0 mb-0">
                        <v-text-field
                          label="测点名称"
                          outlined
                          readonly
                          dense
                          :hide-details="true"
                          class="d-inline-block caption"
                          :value="item.key"
                        />
                        <CeDian v-model="selectedItems" :node="item" />
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-data-iterator
          class="dingzixianbang3"
          :items="items3.items"
          :items-per-page.sync="itemsPerPage"
          hide-default-footer
          light
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
              <h6 class="font-weight-bold" v-text="items1.title" />
            </v-toolbar>
          </template>

          <template #default="props">
            <v-row class="ml-1 mr-1 mt-0">
              <v-col
                v-for="item in props.items"
                :key="item.id"
                cols="12"
                sm="4"
                md="4"
                lg="2"
                class="px-0 py-0 mr-1"
              >
                <v-card dense>
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content class="d-inline-block pb-0 mb-0">
                        <v-text-field
                          label="测点名称"
                          outlined
                          readonly
                          dense
                          :hide-details="true"
                          class="d-inline-block caption"
                          :value="item.key"
                        />
                        <CeDian v-model="selectedItems" :node="item" />
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Buttons from '@/components/common/Buttons/Buttons4ZhuangTaiJianCe.vue'
import CeDian from '@/components/ZhuangTaiJianCe/CeDian'

export default {
  components: {
    Buttons,
    CeDian
  },
  data () {
    return {
      selectedItems: [],
      itemsPerPage: 999,
      items1: {
        title: '定子线棒普遍堵塞监测',
        items: [
          {
            id: '1001',
            key: 'GST004MP_定冷水入口压力(kPa)',
            value: '321.90',
            grade: { class: 0, status: 'normal', content: '' }
          },
          {
            id: '1002',
            key: 'GST004MP_定冷却水流量(m3/h)',
            value: '191.09',
            grade: { class: 0, status: 'normal', content: '' }
          },
          {
            id: '1003',
            key: 'GST004MP_高位水箱压力(kPa(abs))',
            value: '321.90',
            grade: { class: 0, status: 'normal', content: '' }
          },
          {
            id: '1004',
            key: 'GST004MP_定冷水入口压力计算值(kPa)',
            value: '313.09',
            grade: { class: 4, status: 'error', content: '严重' }
          },
          {
            id: '1005',
            key: 'GST004MP_定冷水入口压力实测值/计算值',
            value: '1.028',
            grade: { class: 0, status: 'normal', content: '' }
          }
        ]
      },

      items2: {
        title: '定子冷却水系统',
        items: [
          {
            id: '2001',
            key: 'GST001MK_定子冷却水入口电导率(us/cm)',
            value: '321.90',
            grade: { class: 0, status: 'normal', content: '' }
          },
          {
            id: '2002',
            key: 'GST001MT_定子冷却水进口温度(C)',
            value: '191.09',
            grade: { class: 0, status: 'normal', content: '' }
          },
          {
            id: '2003',
            key: 'GRH200MT_上部线棒出水温度平均值(C)',
            value: '321.90',
            grade: { class: 0, status: 'normal', content: '' }
          },

          {
            id: '2004',
            key: 'GST002MK_定子冷却水入口电导率(us/cm)',
            value: '313.09',
            grade: { class: 4, status: 'error', content: '严重' }
          },
          {
            id: '2005',
            key: 'GST002MT_定子冷却水出口温度(C)',
            value: '1.028',
            grade: { class: 0, status: 'normal', content: '' }
          },
          {
            id: '2006',
            key: 'GRH100MT_下部线棒出水温度平均值(C)',
            value: '321.90',
            grade: { class: 0, status: 'normal', content: '' }
          },

          {
            id: '2007',
            key: 'GST003MK_定子冷却水入口电导率(us/cm)',
            value: '191.09',
            grade: { class: 0, status: 'normal', content: '' }
          },
          {
            id: '2008',
            key: 'GST003MT_定子冷却水出口温度(C)',
            value: '321.90',
            grade: { class: 0, status: 'normal', content: '' }
          },
          {
            id: '2009',
            key: '线棒层间温度平均值(C)',
            value: '31.09',
            grade: { class: 0, status: 'normal', content: '' }
          },

          {
            id: '2010',
            key: 'GST004MP_定冷水入口压力实测值/计算值',
            value: '1.028',
            grade: { class: 0, status: 'normal', content: '' }
          },
          {
            id: '2011',
            key: 'GST004MP_定冷水入口压力(kPa)',
            value: '321.90',
            grade: { class: 0, status: 'normal', content: '' }
          },
          {
            id: '2012',
            key: 'GST004MP_定冷却水流量(m3/h)',
            value: '191.09',
            grade: { class: 2, status: 'warning', content: '警告' }
          },

          {
            id: '2013',
            key: 'GST004MP_高位水箱压力(kPa(abs))',
            value: '321.90',
            grade: { class: 4, status: 'error', content: '严重' }
          },
          {
            id: '2014',
            key: 'GST004MP_定冷水入口压力计算值(kPa)',
            value: '313.09',
            grade: { class: 0, status: 'normal', content: '' }
          },
          {
            id: '2015',
            key: 'GST004MP_定冷水入口压力实测值/计算值',
            value: '1.028',
            grade: { class: 0, status: 'normal', content: '' }
          }
        ]
      },

      items3: {
        title: '氢气、密封油系统',
        items: [
          {
            id: '2001',
            key: 'GST001MK_定子冷却水入口电导率(us/cm)',
            value: '321.90',
            grade: { class: 2, status: 'warning', content: '警告' }
          },
          {
            id: '2002',
            key: 'GST001MT_定子冷却水进口温度(C)',
            value: '191.09',
            grade: { class: 0, status: 'normal', content: '' }
          },
          {
            id: '2003',
            key: 'GRH200MT_上部线棒出水温度平均值(C)',
            value: '321.90',
            grade: { class: 0, status: 'normal', content: '' }
          },

          {
            id: '2004',
            key: 'GST002MK_定子冷却水入口电导率(us/cm)',
            value: '313.09',
            grade: { class: 0, status: 'normal', content: '' }
          },
          {
            id: '2005',
            key: 'GST002MT_定子冷却水出口温度(C)',
            value: '1.028',
            grade: { class: 0, status: 'normal', content: '' }
          },
          {
            id: '2006',
            key: 'GRH100MT_下部线棒出水温度平均值(C)',
            value: '321.90',
            grade: { class: 0, status: 'normal', content: '' }
          },

          {
            id: '2007',
            key: 'GST003MK_定子冷却水入口电导率(us/cm)',
            value: '191.09',
            grade: { class: 0, status: 'normal', content: '' }
          },
          {
            id: '2008',
            key: 'GST003MT_定子冷却水出口温度(C)',
            value: '321.90',
            grade: { class: 0, status: 'normal', content: '' }
          },
          {
            id: '2009',
            key: '线棒层间温度平均值(C)',
            value: '31.09',
            grade: { class: 0, status: 'normal', content: '' }
          },

          {
            id: '2010',
            key: 'GST004MP_定冷水入口压力实测值/计算值',
            value: '1.028',
            grade: { class: 2, status: 'warning', content: '警告' }
          },
          {
            id: '2011',
            key: 'GST004MP_定冷水入口压力(kPa)',
            value: '321.90',
            grade: { class: 0, status: 'normal', content: '' }
          },
          {
            id: '2012',
            key: 'GST004MP_定冷却水流量(m3/h)',
            value: '191.09',
            grade: { class: 0, status: 'normal', content: '' }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dingzixianbang1, .dingzixianbang2, .dingzixianbang3{
  .v-list-item{
    padding: 0 0 0 auto;
  }
  .v-list-item__title{
    border-bottom: solid 1px #ccc;
    padding: 5px 5px 5px 0;
  }
  .v-list-item .align-end{
    flex:0 1 auto !important;
    min-width:90px !important;
  }
}

>>>.v-input__slot{
  height: 33px !important;
  min-height: 33px !important;
  .v-text-field__slot{
    color: #45678E;
    padding-top: 0px;
  }
}

>>> .v-input input{
  margin-top: 8px !important;
}
</style>
