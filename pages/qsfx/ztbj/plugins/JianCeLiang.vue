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
  </v-list>
</template>

<script>
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
          chks: [10, 12],
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
          chks: [20, 21],
          // active: true,
          items: [
            { name: 'GRH201MT_槽1上部线棒出水温度（℃）', value: 20 },
            { name: 'GRH201MT_槽2上部线棒出水温度（℃）', value: 21 },
            { name: 'GRH201MT_槽3上部线棒出水温度（℃）', value: 22 }
          ]
        },
        {
          action: 'mdi-file-tree',
          title: '下层线棒出水温度',
          chks: [32, 33],
          items: [
            { name: 'GRH101MT_槽1下部线棒出水温度（℃）', value: 30 },
            { name: 'GRH101MT_槽2下部线棒出水温度（℃）', value: 31 },
            { name: 'GRH101MT_槽3下部线棒出水温度（℃）', value: 32 },
            { name: 'GRH101MT_槽4下部线棒出水温度（℃）', value: 33 },
            { name: 'GRH101MT_槽5下部线棒出水温度（℃）', value: 34 },
            { name: 'GRH101MT_槽6下部线棒出水温度（℃）', value: 35 }
          ]
        },
        {
          action: 'mdi-file-tree',
          title: '线棒层间温度',
          chks: [40, 42],
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
          chks: [52, 55],
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
          chks: [64, 65],
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
          chks: [73, 76],
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
      selectChips: []
    }
  },
  computed: {},
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
    this.selectChips = this.value
  }
}
</script>

<style lang="scss" scoped>
>>> .v-chip.v-chip--outlined .v-icon{
  color: #00c58e !important;
  font-size: 16px;
}
</style>
