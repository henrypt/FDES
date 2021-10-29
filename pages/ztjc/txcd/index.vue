<template>
  <v-container fluid>
    <!-- 工具按钮组 -->
    <Buttons />

    <v-row>
      <v-col>
        <!-- 发电机工况 -->
        <GongKuang v-model="selectedItems" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card color="basil">
          <v-tabs
            v-model="tab"
            center-active
            grow
            height="32"
            background-color="grey lighten-5"
          >
            <v-tab v-for="item in tabs" :key="item.tab" class="font-weight-bold">
              {{ item.tab }}
              <i class="caption danwei--text">{{ item.content }}</i>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item v-for="(item, index) in items" :key="item.index">
              <v-container fluid class="pt-0">
                <v-data-iterator
                  class="shangcengxianbangchushuiwendu"
                  :items="item.data"
                  :items-per-page.sync="itemsPerPage"
                  hide-default-footer
                  light
                >
                  <template #default="props">
                    <v-row dense>
                      <v-col
                        v-for="item2 in props.items"
                        :key="item2.id"
                        cols="12"
                        sm="4"
                        md="4"
                        lg="2"
                      >
                        <v-card
                          dense
                          p-0
                          m-0
                          width="100%"
                          min-width="100%"
                          max-width="220px"
                          class="px-0 py-0 mx-0 my-0"
                        >
                          <h3
                            class="text-truncate caption sub_title2 font-weight-bold px-3 pt-1 pb-0"
                          >
                            {{ item2.head }}
                          </h3>
                          <v-divider />
                          <v-list dense>
                            <v-list-item v-for="d in item2.data" :key="d.key">
                              <v-list-item-content
                                class="d-inline-block pb-0 words--text text-center"
                              >
                                <v-text-field
                                  label="编号: 线棒/测点"
                                  outlined
                                  readonly
                                  dense
                                  :hide-details="true"
                                  class="d-inline-block caption"
                                  style="max-width:120px;"
                                  :value="`${d.title1}/${d.title2}`"
                                />

                                <CeDian v-model="selectedItems" :node="d" />
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-card>
                      </v-col>
                    </v-row>

                    <v-row class="pb-2">
                      <v-col cols="4" class="py-0">
                        <v-card p-0 m-0 dense>
                          <v-list dense>
                            <v-list-item>
                              <v-list-item-content>
                                <v-text-field
                                  label="最大值"
                                  :value="ItemsCount[index].max"
                                  :hide-details="true"
                                  outlined
                                  readonly
                                  dense
                                  style="max-width:120px"
                                />
                              </v-list-item-content>

                              <v-list-item-content>
                                <v-text-field
                                  label="平均值"
                                  :value="ItemsCount[index].aver"
                                  :hide-details="true"
                                  outlined
                                  readonly
                                  dense
                                  class="d-inline-block"
                                  style="max-width:120px"
                                />
                              </v-list-item-content>

                              <v-list-item-content>
                                <v-text-field
                                  label="差值"
                                  :value="ItemsCount[index].dif"
                                  :hide-details="true"
                                  outlined
                                  readonly
                                  dense
                                  class="d-inline-block"
                                  style="max-width:120px"
                                />
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-card>
                      </v-col>
                      <v-col cols="8" />
                    </v-row>
                  </template>
                </v-data-iterator>
              </v-container>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
    <!-- {{selectedItems}} -->
  </v-container>
</template>

<script>
import Buttons from '@/components/common/Buttons/Buttons4ZhuangTaiJianCe.vue'
import GongKuang from '@/components/ZhuangTaiJianCe/GongKuang'
import CeDian from '@/components/ZhuangTaiJianCe/CeDian'

export default {
  components: {
    GongKuang,
    Buttons,
    CeDian
  },
  data () {
    return {
      selectedItems: [],
      itemsPerPage: 999,

      tab: null,
      tabs: [
        {
          tab: '上层线棒出水温度',
          content: '(N1GRH)'
        },
        {
          tab: '下层线棒出水温度',
          content: '(N1GRH)'
        },
        {
          tab: '线棒层间温度',
          content: '(N1GRH)'
        }
      ],
      items: [
        { id: 1, data: [] },
        { id: 2, data: [] },
        { id: 3, data: [] }
      ]
    }
  },
  computed: {
    btnsShow () {
      return this.selectedItems.length > 0
    },
    ItemsCount () {
      return [
        { max: 10, aver: 10, dif: 1 },
        { max: 100, aver: 2, dif: 3 },
        { max: 200, aver: 10, dif: 20 }
      ]
    }
  },
  mounted () {
    const _this = this
    const arrHead = [
      {
        id: 1,
        data: [
          'U相1分支',
          'U相2分支',
          'V相1分支',
          'V相2分支',
          'W相1分支',
          'W相2分支'
        ]
      },
      {
        id: 2,
        data: [
          'U相1分支',
          'U相2分支',
          'V相1分支',
          'V相2分支',
          'W相1分支',
          'W相2分支'
        ]
      },
      { id: 3, data: ['UU', 'VV', 'WW', 'UV', 'UW', 'VW'] }
    ]

    arrHead.forEach((item, index) => {
      const headData = item.data
      const headId = item.id
      const arrIndex = index

      headData.forEach((d, index) => {
        const obj = {
          id: index + 1,
          head: d,
          data: []
        }

        for (let k = 0; k < 10; k++) {
          obj.data.push({
            id: parseInt(headId + '' + obj.id + '00' + k, 10),
            title1: '46上',
            title2: '246MT',
            value: 45.9,
            grade: { class: 0, status: 'normal', content: '' }
          })
        }

        _this.items[arrIndex].data.push(obj)
      })
    })
  },
  methods: {
    GongKuangSelectedItems (arr) {
      this.MergeArray(arr, this.selectedItems)
    },
    MergeArray (arr0, arr1) {
      const arr3 = [...arr0, ...arr1]
      let arr4 = new Set(arr3)
      arr4 = [...arr4]
      return arr4
    }
  }
}
</script>

<style lang="scss" scoped>
.page{
  width: 100%;
  max-width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
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
