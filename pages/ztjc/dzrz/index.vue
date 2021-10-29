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
        <v-data-iterator
          class="dingziraozuwendu mt-5"
          :items="items"
          :items-per-page.sync="itemsPerPage"
          hide-default-footer
          light
        >
          <template #header>
            <v-toolbar
              width="200"
              height="24"
              color="sub_title1 words--text"
              class="ml-3"
              dense
              tile
              short
            >
              <h5 class="font-weight-bold">
                定子绕组温度
              </h5>
            </v-toolbar>
          </template>

          <template #default="props">
            <v-row class="ml-1 mr-1 mt-0">
              <v-col
                v-for="item in props.items"
                :key="item.name"
                cols="12"
                sm="6"
                md="3"
                lg="2"
                class="pa-0 ma-0 px-1 py-0 mx-0 my-0"
              >
                <v-card>
                  <v-card-title v-if="false" class="subheading font-weight-bold">
                    {{ item.name }}
                  </v-card-title>
                  <v-divider />
                  <v-list dense class="px-0 py-0 my-1">
                    <v-list-item v-for="d in item.data" :key="d.key">
                      <v-list-item-content
                        class="d-inline-block text-truncate subtitle-2 words--text"
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
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-data-iterator
          class="yinchuxianwendu"
          :items="items2"
          :items-per-page.sync="itemsPerPage"
          hide-default-footer
          light
        >
          <template #header>
            <v-toolbar
              width="200"
              height="24"
              color="sub_title1 words--text"
              class="ml-3"
              tile
              dense
              short
            >
              <h5 class="font-weight-bold">
                引出线出水温度
              </h5>
            </v-toolbar>
          </template>

          <template #default="props">
            <v-row class="ml-1 mr-1 mt-0">
              <v-col
                v-for="item in props.items"
                :key="item.name"
                cols="12"
                sm="4"
                md="3"
                lg="2"
                class="px-1 py-0 mx-0 my-0 text-center"
              >
                <v-card>
                  <v-card-title v-if="false" class="subheading font-weight-bold">
                    {{ item.name }}
                  </v-card-title>
                  <v-divider />
                  <v-list dense class="px-0 py-0 mt-0 mb-1">
                    <v-list-item v-for="d in item.data" :key="d.key">
                      <v-list-item-content
                        class="text-center text-truncate px-0 py-1 mx-0 my-0 words--text"
                      >
                        <v-list-item-title
                          class="d-inline-block text-truncate subtitle-2"
                          v-text="d.key"
                        />
                        <v-spacer />
                        <v-list-item-subtitle
                          class="text-center words--text"
                          v-text="d.name"
                        />
                      </v-list-item-content>

                      <v-list-item-content class="align-end">
                        <CeDian v-model="selectedItems" :node="d" />
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
      selectedIDS: [],
      itemsPerPage: 999,
      hover: false,
      selectedItems: [],

      items: [
        {
          name: 1,
          data: [
            {
              key: 'GRH201MT',
              id: 4001,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH301MT',
              id: 5001,
              value: 64.9,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH101MT',
              id: 6001,
              value: 64.96,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 2,
          data: [
            {
              key: 'GRH201MT',
              id: 4002,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH301MT',
              id: 5002,
              value: 64.9,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH101MT',
              id: 6002,
              value: 64.96,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 3,
          data: [
            {
              key: 'GRH201MT',
              id: 4002,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH301MT',
              id: 5002,
              value: 64.9,
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'GRH101MT',
              id: 6002,
              value: 64.96,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 4,
          data: [
            {
              key: 'GRH201MT',
              id: 4003,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH301MT',
              id: 5003,
              value: 64.9,
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'GRH101MT',
              id: 6003,
              value: 64.96,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 5,
          data: [
            {
              key: 'GRH201MT',
              id: 4004,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH301MT',
              id: 5004,
              value: 64.9,
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'GRH101MT',
              id: 6004,
              value: 64.96,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 6,
          data: [
            {
              key: 'GRH201MT',
              id: 4005,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH301MT',
              id: 5005,
              value: 64.9,
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'GRH101MT',
              id: 6005,
              value: 64.96,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 7,
          data: [
            {
              key: 'GRH201MT',
              id: 4006,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH301MT',
              id: 5006,
              value: 64.9,
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'GRH101MT',
              id: 6006,
              value: 64.96,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 8,
          data: [
            {
              key: 'GRH201MT',
              id: 4007,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH301MT',
              id: 5007,
              value: 64.9,
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'GRH101MT',
              id: 6007,
              value: 64.96,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 9,
          data: [
            {
              key: 'GRH201MT',
              id: 4008,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH301MT',
              id: 5008,
              value: 64.9,
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'GRH101MT',
              id: 6008,
              value: 64.96,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 10,
          data: [
            {
              key: 'GRH201MT',
              id: 4009,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH301MT',
              id: 5009,
              value: 64.9,
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'GRH101MT',
              id: 6009,
              value: 64.96,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 11,
          data: [
            {
              key: 'GRH201MT',
              id: 4012,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH301MT',
              id: 5012,
              value: 64.9,
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'GRH101MT',
              id: 6012,
              value: 64.96,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 12,
          data: [
            {
              key: 'GRH201MT',
              id: 4022,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH301MT',
              id: 5022,
              value: 64.9,
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'GRH101MT',
              id: 6022,
              value: 64.96,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 13,
          data: [
            {
              key: 'GRH201MT',
              id: 4032,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH301MT',
              id: 5032,
              value: 64.9,
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'GRH101MT',
              id: 6032,
              value: 64.96,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 14,
          data: [
            {
              key: 'GRH201MT',
              id: 4042,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH301MT',
              id: 5042,
              value: 64.9,
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'GRH101MT',
              id: 6042,
              value: 64.96,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 16,
          data: [
            {
              key: 'GRH201MT',
              id: 4052,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH301MT',
              id: 5052,
              value: 64.9,
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'GRH101MT',
              id: 6052,
              value: 64.96,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 17,
          data: [
            {
              key: 'GRH201MT',
              id: 4062,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH301MT',
              id: 5062,
              value: 64.9,
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'GRH101MT',
              id: 6062,
              value: 64.96,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 18,
          data: [
            {
              key: 'GRH201MT',
              id: 4072,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH301MT',
              id: 5072,
              value: 64.9,
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'GRH101MT',
              id: 6072,
              value: 64.96,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 19,
          data: [
            {
              key: 'GRH201MT',
              id: 4082,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH301MT',
              id: 5082,
              value: 64.9,
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'GRH101MT',
              id: 6082,
              value: 64.96,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 20,
          data: [
            {
              key: 'GRH201MT',
              id: 4092,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH301MT',
              id: 5092,
              value: 64.9,
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'GRH101MT',
              id: 6092,
              value: 64.96,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 21,
          data: [
            {
              key: 'GRH201MT',
              id: 40021,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH301MT',
              id: 50021,
              value: 64.9,
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'GRH101MT',
              id: 60021,
              value: 64.96,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 22,
          data: [
            {
              key: 'GRH201MT',
              id: 40022,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            },
            {
              key: 'GRH301MT',
              id: 50022,
              value: 64.9,
              grade: { class: 4, status: 'error', content: '严重' }
            },
            {
              key: 'GRH101MT',
              id: 60022,
              value: 64.96,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        }
      ],
      // 引出线出水温度
      items2: [
        {
          name: 1,
          data: [
            {
              key: 'GRH001MT',
              name: 'U1',
              id: 14001,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 2,
          data: [
            {
              key: 'GRH002MT',
              name: 'V1',
              id: 14002,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 3,
          data: [
            {
              key: 'GRH003MT',
              name: 'U2',
              id: 14003,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 4,
          data: [
            {
              key: 'GRH004MT',
              name: 'V2',
              id: 14004,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 5,
          data: [
            {
              key: 'GRH005MT',
              name: 'V2',
              id: 14005,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        },
        {
          name: 6,
          data: [
            {
              key: 'GRH006MT',
              name: 'W2',
              id: 14006,
              value: 66.52,
              grade: { class: 0, status: 'normal', content: '' }
            }
          ]
        }
      ]
    }
  },
  computed: {},
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
.dingziraozuwendu{
  .v-list-item .align-end{
    flex:0 1 auto !important;
    min-width: 90px !important
  }
}

.yinchuxianwendu{
  .v-list-item{
    padding: 0 0 0 auto;
  }
  .v-list-item__title{
    border-bottom: solid 1px #ccc;
    padding: 5px 5px 5px 0;
  }
}
</style>
