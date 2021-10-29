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
        <v-toolbar
          width="200"
          height="24"
          color="sub_title1 words--text"
          class="ml-2"
          dense
          tile
          short
        >
          <h6 class="font-weight-bold" v-text="tiexinInfo.title" />
        </v-toolbar>

        <v-card
          elevation="2"
          class="mx-auto pl-1 mt-0 ml-1 mr-1 mb-2"
          style="max-width:910px"
        >
          <v-simple-table>
            <template #default>
              <thead>
                <tr>
                  <th
                    v-for="(th, index) in tiexinInfo.header"
                    :key="index"
                    class="text-center text-truncate"
                    style="height:30px; line-height:30px;"
                    v-text="th"
                  />
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in tiexinInfo.data" :key="item.subtitle">
                  <td class="text-truncate">
                    {{ item.subtitle }}
                  </td>
                  <td class="text-center text-truncate">
                    {{ item.node1.name }}
                    <CeDian
                      v-model="selectedItems"
                      :node="item.node1"
                      class="pl-2"
                    />
                  </td>
                  <td class="text-center text-truncate">
                    {{ item.node2.name }}
                    <CeDian
                      v-model="selectedItems"
                      :node="item.node2"
                      class="pl-2"
                    />
                  </td>
                  <td class="text-center text-truncate">
                    {{ item.node3.name }}
                    <CeDian
                      v-model="selectedItems"
                      :node="item.node3"
                      class="pl-2"
                    />
                  </td>
                  <td class="text-center text-truncate">
                    {{ item.node4.name }}
                    <CeDian
                      v-model="selectedItems"
                      :node="item.node4"
                      class="pl-2"
                    />
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script type="text/ecmascript-6">
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
      selected: [],
      tiexinInfo: {
        title: '铁芯温度',
        header: ['测点埋没位置', '汽端屏蔽环', '第5段', '第90段', '励端屏蔽环'],
        data: [
          {
            subtitle: '4x5槽',
            node1: { id: '1001', name: '071MT', value: '48.6', grade: { id: '', class: 0, status: '', content: '' } },
            node2: { id: '', name: '', value: '', grade: { id: '', class: 0, status: '', content: '' } },
            node3: { id: '', name: '', value: '', grade: { id: '', class: 0, status: '', content: '' } },
            node4: { id: '1002', name: '072MT', value: '47.5', grade: { id: '', class: 0, status: '', content: '' } }
          },
          {
            subtitle: '5号槽壁',
            node1: { id: '', name: '', value: '', grade: { id: '', class: 0, status: '', content: '' } },
            node2: { id: '1003', name: '051MT', value: '45.1', grade: { id: '', class: 0, status: '', content: '' } },
            node3: { id: '1004', name: '052MT', value: '45.5', grade: { id: '', class: 0, status: '', content: '' } },
            node4: { id: '', name: '', value: '', grade: { id: '', class: 0, status: '', content: '' } }
          },
          {
            subtitle: '7号槽壁',
            node1: { id: '', name: '', value: '', grade: { id: '', class: 0, status: '', content: '' } },
            node2: { id: '1005', name: '053MT', value: '46.6', grade: { id: '', class: 1, status: 'warning', content: '警告' } },
            node3: { id: '1006', name: '054MT', value: '45.5', grade: { id: '', class: 0, status: '', content: '' } },
            node4: { id: '', name: '', value: '', grade: { id: '', class: 0, status: '', content: '' } }
          },
          {
            subtitle: '12x13槽',
            node1: { id: '1007', name: '071MT', value: '48.6', grade: { id: '', class: 0, status: '', content: '' } },
            node2: { id: '', name: '', value: '', grade: { id: '', class: 0, status: '', content: '' } },
            node3: { id: '', name: '', value: '', grade: { id: '', class: 0, status: '', content: '' } },
            node4: { id: '1008', name: '074MT', value: '45.2', grade: { id: '', class: 0, status: '', content: '' } }
          },
          {
            subtitle: '13槽',
            node1: { id: '', name: '', value: '', grade: { id: '', class: 0, status: '', content: '' } },
            node2: { id: '1009', name: '055MT', value: '47.2', grade: { id: '', class: 0, status: '', content: '' } },
            node3: { id: '1010', name: '056MT', value: '44.3', grade: { id: '', class: 0, status: '', content: '' } },
            node4: { id: '', name: '', value: '', grade: { id: '', class: 0, status: '', content: '' } }
          },
          {
            subtitle: '39槽',
            node1: { id: '', name: '', value: '', grade: { id: '', class: 0, status: '', content: '' } },
            node2: { id: '1011', name: '057MT', value: '47.2', grade: { id: '', class: 0, status: '', content: '' } },
            node3: { id: '1012', name: '057MT', value: '44.3', grade: { id: '', class: 0, status: '', content: '' } },
            node4: { id: '', name: '', value: '', grade: { id: '', class: 0, status: '', content: '' } }
          },
          {
            subtitle: '44x45槽',
            node1: { id: '1013', name: '075MT', value: '46.9', grade: { id: '', class: 0, status: '', content: '' } },
            node2: { id: '', name: '', value: '', grade: { id: '', class: 0, status: '', content: '' } },
            node3: { id: '', name: '', value: '', grade: { id: '', class: 0, status: '', content: '' } },
            node4: { id: '1014', name: '076MT', value: '45.1', grade: { id: '', class: 0, status: '', content: '' } }
          },
          {
            subtitle: '45槽',
            node1: { id: '', name: '', value: '', grade: { id: '', class: 0, status: '', content: '' } },
            node2: { id: '1015', name: '059MT', value: '47.2', grade: { id: '', class: 0, status: '', content: '' } },
            node3: { id: '1016', name: '060MT', value: '44.3', grade: { id: '', class: 0, status: '', content: '' } },
            node4: { id: '', name: '', value: '', grade: { id: '', class: 0, status: '', content: '' } }

          },
          {
            subtitle: '47槽',
            node1: { id: '', name: '', value: '', grade: { id: '', class: 0, status: '', content: '' } },
            node2: { id: '1017', name: '061MT', value: '47.2', grade: { id: '', class: 1, status: 'warning', content: '警告' } },
            node3: { id: '1018', name: '062MT', value: '44.3', grade: { id: '', class: 1, status: 'warning', content: '警告' } },
            node4: { id: '', name: '', value: '', grade: { id: '', class: 0, status: '', content: '' } }
          }

        ]
      }
    }
  },
  watch: {
    selectedItems (arr, old) {
      const arr3 = [...arr, ...old, ...this.selected]
      this.selected = Array.from(new Set(arr3))
      // arr.push(old)
      // this.selected = Array.from(new Set(arr))
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.v-data-table{
  width: 900px;
  td{
    height: 38px;
    padding: 12px 16px;
  }
}
</style>
