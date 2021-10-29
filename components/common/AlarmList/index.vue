<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent scrollable max-width="300px">
      <v-card max-width="600" class="mx-auto">
        <v-toolbar color="light-blue" dark>
          <v-toolbar-title
            class="secondary--text"
            v-text="title"
          />
          <v-spacer />
          <v-btn icon>
            <v-icon
              color="info"
              class="mdi mdi-close-circle"
              @click="toggleAlarmList"
            />
          </v-btn>
        </v-toolbar>

        <v-list two-line subheader>
          <v-subheader inset>
            故障统计
          </v-subheader>

          <v-list-item v-for="item in data" :key="item.title">
            <v-list-item-avatar>
              <v-icon
                :color="item.iconClass"
                :class="`mdi mdi-${item.icon}`"
              />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="item.name" />
              <v-list-item-subtitle
                v-text="`故障数: ${item.content}`"
              />
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon :to="{ name: item.to }">
                <v-icon
                  color="warning lighten-1"
                  class="mdi mdi-arrow-right"
                />
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script type="text/ecmascript-6">
export default {
  components: {

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
      title: '待处理设备异常',
      data: [
        { name: '一号机', icon: 'star', iconClass: 'error', to: 'home', content: '10' },
        { name: '二号机', icon: 'star', iconClass: 'warning', to: 'home', content: '5' },
        { name: '三号机', icon: 'star', iconClass: 'error', to: 'home', content: '11' },
        { name: '四号机', icon: 'star', iconClass: 'normal', to: 'home', content: '0' },
        { name: '五号机', icon: 'star', iconClass: 'normal', to: 'home', content: '0' }
      ]
    }
  },
  computed: {
    dialog () {
      return this.msg
    }
  },
  mounted () {
  },
  methods: {
    toggleAlarmList () {
      // this.$emit('toggleAlarmList', false)
      this.$emit('vModel', false)
    }
  }
}
</script>

<style lang="scss" scoped></style>
