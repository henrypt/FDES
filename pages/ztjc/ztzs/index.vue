<template>
  <div class="page">
    <!-- <h1 class="headline">健康状态</h1> -->
    <v-row>
      <v-col
        v-for="d in items"
        :key="d.title"
        cols="12"
        sm="6"
        md="3"
        lg="3"
      >
        <v-expansion-panels focusable hover>
          <v-expansion-panel>
            <v-card class="mx-auto" outlined dense>
              <v-expansion-panel-header class="py-1 secondary">
                <h4 v-text="d.title" />
                <v-spacer />
                <span class="subtitle-2">
                  <v-chip
                    label
                    small
                    :class="`${d.status} text-caption white--text`"
                  >
                    {{ d.content }}
                  </v-chip>
                </span>
              </v-expansion-panel-header>
              <v-card-text class="pt-2 pb-2">
                <ul>
                  <li
                    v-for="gl in d.gonglv"
                    :key="gl.name"
                    class="pr-4 mr-4 float-left"
                  >
                    {{ gl.name }}: <b>{{ gl.content }}</b>
                  </li>
                </ul>
              </v-card-text>

              <v-card-text class="px-0">
                <v-expansion-panel-content eager class="px-0 py-0 mx-0 my-0">
                  <!-- <span class="subheading">Select item</span> -->
                  <v-chip-group column>
                    <v-chip
                      v-for="item in d.data"
                      :key="item.name"
                      label
                      filter
                      small
                      :class="`${item.status} px-1 py-1 ma-1 mt-1 mb-0`"
                      active-class="normal1"
                      nuxt
                      :to="item.to"
                    >
                      {{ item.name }}
                    </v-chip>
                  </v-chip-group>
                </v-expansion-panel-content>
              </v-card-text>
            </v-card>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <dl v-for="item in menuInfo" :key="item.id">
      <dt>{{ item.id }} : {{ item.name }}, Can: {{ item.can }}</dt>
    </dl>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Home',
  components: {

  },
  data () {
    return {
      title: '状态展示',
      expand: false,
      items1: [
        {
          name: '一号机',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        }
      ],
      items: [
        {
          title: '一号机',
          status: 'error',
          content: '报警',
          gonglv: [
            { name: '有功功率', status: 'warning', content: '58.30' },
            { name: '无功功率', status: 'normal', content: '69.10' }
          ],
          data: [
            { name: '发电机工况', status: 'normal', content: '正常', to: '/ztjc/dzrz' },
            { name: '上层线棒出水温度', status: 'warning', content: '注意', to: '/ztjc/ztzs' },
            { name: '下层线棒出水温度', status: 'warning', content: '注意', to: '/ztjc/ztzs' },
            { name: '线棒层间温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '引出线出水温度', status: 'error', content: '报警', to: '/ztjc/ztzs' },
            { name: '铁芯温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '氢冷器', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '转子及轴承', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '定子冷却水', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '氢气密封油', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '励磁机', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '主系统及厂用电', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '定子绕组端部振动', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '转子匝间短路', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '局放放电', status: 'normal', content: '正常', to: '/ztjc/ztzs' }
          ]
        },
        {
          title: '二号机',
          status: 'normal',
          content: '正常',
          gonglv: [
            { name: '有功功率', status: 'warning', content: '58.30' },
            { name: '无功功率', status: 'normal', content: '69.10' }
          ],
          data: [
            { name: '发电机工况', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '上层线棒出水温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '下层线棒出水温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '线棒层间温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '引出线出水温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '铁芯温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '氢冷器', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '转子及轴承', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '定子冷却水', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '氢气密封油0', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '励磁机', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '主系统及厂用电', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '定子绕组端部振动', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '转子匝间短路', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '局放放电', status: 'normal', content: '正常', to: '/ztjc/ztzs' }
          ]
        },
        {
          title: '三号机',
          status: 'normal',
          content: '正常',
          gonglv: [
            { name: '有功功率', status: 'warning', content: '58.30' },
            { name: '无功功率', status: 'normal', content: '69.10' }
          ],
          data: [
            { name: '发电机工况', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '上层线棒出水温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '下层线棒出水温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '线棒层间温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '引出线出水温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '铁芯温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '氢冷器', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '转子及轴承', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '定子冷却水', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '氢气密封油1', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '励磁机', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '主系统及厂用电', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '定子绕组端部振动', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '转子匝间短路', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '局放放电', status: 'normal', content: '正常', to: '/ztjc/ztzs' }
          ]
        },
        {
          title: '四号机',
          status: 'warning',
          content: '注意',
          gonglv: [
            { name: '有功功率', status: 'warning', content: '58.30' },
            { name: '无功功率', status: 'normal', content: '69.10' }
          ],
          data: [
            { name: '发电机工况', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '上层线棒出水温度', status: 'warning', content: '注意', to: '/ztjc/ztzs' },
            { name: '下层线棒出水温度', status: 'warning', content: '注意', to: '/ztjc/ztzs' },
            { name: '线棒层间温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '引出线出水温度', status: 'warning', content: '注意', to: '/ztjc/ztzs' },
            { name: '铁芯温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '氢冷器', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '转子及轴承', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '定子冷却水', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '氢气密封油2', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '励磁机', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '主系统及厂用电', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '定子绕组端部振动', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '转子匝间短路', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '局放放电', status: 'normal', content: '正常', to: '/ztjc/ztzs' }
          ]
        },
        {
          title: '五号机',
          status: 'warning',
          content: '注意',
          gonglv: [
            { name: '有功功率', status: 'warning', content: '58.30' },
            { name: '无功功率', status: 'normal', content: '69.10' }
          ],
          data: [
            { name: '发电机工况', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '上层线棒出水温度', status: 'warning', content: '注意', to: '/ztjc/ztzs' },
            { name: '下层线棒出水温度', status: 'warning', content: '注意', to: '/ztjc/ztzs' },
            { name: '线棒层间温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '引出线出水温度', status: 'warning', content: '注意', to: '/ztjc/ztzs' },
            { name: '铁芯温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '氢冷器', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '转子及轴承', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '定子冷却水', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '氢气密封油3', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '励磁机', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '主系统及厂用电', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '定子绕组端部振动', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '转子匝间短路', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '局放放电', status: 'normal', content: '正常', to: '/ztjc/ztzs' }
          ]
        },
        {
          title: '六号机',
          status: 'warning',
          content: '注意',
          gonglv: [
            { name: '有功功率', status: 'warning', content: '58.30' },
            { name: '无功功率', status: 'normal', content: '69.10' }
          ],
          data: [
            { name: '发电机工况', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '上层线棒出水温度', status: 'warning', content: '注意', to: '/ztjc/ztzs' },
            { name: '下层线棒出水温度', status: 'warning', content: '注意', to: '/ztjc/ztzs' },
            { name: '线棒层间温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '引出线出水温度', status: 'warning', content: '注意', to: '/ztjc/ztzs' },
            { name: '铁芯温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '氢冷器', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '转子及轴承', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '定子冷却水', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '氢气密封油4', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '励磁机', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '主系统及厂用电', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '定子绕组端部振动', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '转子匝间短路', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '局放放电', status: 'normal', content: '正常', to: '/ztjc/ztzs' }
          ]
        },
        {
          title: '七号机',
          status: 'warning',
          content: '注意',
          gonglv: [
            { name: '有功功率', status: 'warning', content: '58.30' },
            { name: '无功功率', status: 'normal', content: '69.10' }
          ],
          data: [
            { name: '发电机工况', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '上层线棒出水温度', status: 'warning', content: '注意', to: '/ztjc/ztzs' },
            { name: '下层线棒出水温度', status: 'warning', content: '注意', to: '/ztjc/ztzs' },
            { name: '线棒层间温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '引出线出水温度', status: 'warning', content: '注意', to: '/ztjc/ztzs' },
            { name: '铁芯温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '氢冷器', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '转子及轴承', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '定子冷却水', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '氢气密封油5', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '励磁机', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '主系统及厂用电', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '定子绕组端部振动', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '转子匝间短路', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '局放放电', status: 'normal', content: '正常', to: '/ztjc/ztzs' }
          ]
        },
        {
          title: '八号机',
          status: 'normal',
          content: '正常',
          gonglv: [
            { name: '有功功率', status: 'warning', content: '58.30' },
            { name: '无功功率', status: 'normal', content: '69.10' }
          ],
          data: [
            { name: '发电机工况', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '上层线棒出水温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '下层线棒出水温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '线棒层间温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '引出线出水温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '铁芯温度', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '氢冷器', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '转子及轴承', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '定子冷却水', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '氢气密封油6', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '励磁机', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '主系统及厂用电', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '定子绕组端部振动', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '转子匝间短路', status: 'normal', content: '正常', to: '/ztjc/ztzs' },
            { name: '局放放电', status: 'normal', content: '正常', to: '/ztjc/ztzs' }
          ]
        }
      ]
    }
  },
  computed: {
    menuInfo () {
      const menu = this.$t('menuClass1') || null
      return menu.data
    }
  },
  // async
  created () {

  },
  mounted () {
    // 页面加载数据完毕
    // this.$nextTick(function() {

    // })
    // const pwd = this.$store.getters['user/getUserPassword']()
    // window.console.log(this.$store?.state?.user?.info?.user, pwd)
  }
}
</script>

<style lang="scss" scoped>
$color-error: '#f83e70';
$color-warning: 'orange';
$color-normal : '#3cd1c2';

.v-chip.normal{
  background-color: $color-normal !important;
}

.v-chip.warning{
  background-color: $color-warning !important;
}

.v-chip.error{
  background-color: $color-error !important;
}

.normal1{
  font-weight: bolder;
  border: solid 1px pink;
}
</style>
