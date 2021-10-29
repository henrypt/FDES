<template>
  <v-container fluid>
    <!-- 工具按钮组 -->
    <Buttons />
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
            <v-tab
              v-for="item in items"
              :key="item.tab"
              class="subtitle-2 font-weight-bold"
            >
              {{ item.tab }} <i>{{ item.content }}</i>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-img src="/img/shuidianlianjie/connection1-A.png" />
            </v-tab-item>
            <v-tab-item>
              <v-img src="/img/shuidianlianjie/connection1-A.png" />
            </v-tab-item>
            <v-tab-item>
              <v-img src="/img/shuidianlianjie/connection1-A.png" />
            </v-tab-item>
            <v-tab-item>
              <v-img src="/img/shuidianlianjie/connection1-A.png" />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script type="text/ecmascript-6">
import Buttons from '@/components/common/Buttons/Buttons4ZhuangTaiJianCe.vue'
export default {
  components: {
    Buttons
  },
  data () {
    return {
      selectedItems: [],
      tab: null,
      items: [
        { id: 1, tab: 'A相', content: '' },
        { id: 2, tab: 'B相', content: '' },
        { id: 3, tab: 'C相', content: '' },
        { id: 4, tab: '展开图', content: '' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
