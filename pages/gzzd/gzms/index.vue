<template>
  <div class="page">
    <v-item-group mandatory>
      <v-container>
        <v-row>
          <v-col v-for="n in items" :key="n.title" cols="12" md="2">
            <v-item v-slot="{ active }">
              <v-card
                :color="active ? 'secondary' : 'secondary'"
                :hover="true"
                :rounded="true"
                :shaped="false"
                class="d-flex align-center words--text"
                height="100"
                dark
                @click="open(n.title)"
              >
                <v-scroll-y-transition>
                  <div class="headline flex-grow-1 text-center">
                    {{ n.title }}
                  </div>
                </v-scroll-y-transition>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>

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
              fault-type="faultMode"
              :dynamo-id="item.dynamoId"
              :tree-id="item.treeId"
              :item-name="item.name"
              orient="horizontal"
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
          data: null
        },
        {
          title: '转子',
          status: 'normal',
          content: '',
          gonglv: [
            { name: '', status: 'normal', content: '' },
            { name: '', status: 'normal', content: '' }
          ],
          data: null
        },
        {
          title: '机壳',
          status: 'normal',
          content: '',
          onglv: [
            { name: '', status: 'normal', content: '' },
            { name: '', status: 'normal', content: '' }
          ],
          data: null
        },
        {
          title: '氢气冷却器',
          status: 'normal',
          content: '',
          onglv: [
            { name: '', status: 'normal', content: '' },
            { name: '', status: 'normal', content: '' }
          ],
          data: null
        },
        {
          title: '定子冷却水系统',
          status: '正常',
          content: '',
          onglv: [
            { name: '', status: 'normal', content: '' },
            { name: '', status: 'normal', content: '' }
          ],
          data: null
        },
        {
          title: '氢气系统',
          status: '正常',
          content: '',
          onglv: [
            { name: '', status: 'normal', content: '' },
            { name: '', status: 'normal', content: '' }
          ],
          data: null
        },
        {
          title: '油系统',
          status: '正常',
          content: '',
          onglv: [
            { name: '', status: 'normal', content: '' },
            { name: '', status: 'normal', content: '' }
          ],
          data: null
        }
      ],
      dialog: false,
      item: {
        dynamoId: -1,
        treeId: -1,
        name: ''
      }
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
