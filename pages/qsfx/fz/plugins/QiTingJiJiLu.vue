<template>
  <v-row justify="space-around">
    <v-dialog v-model="dialog" persistent scrollable max-width="600px">
      <template #activator="{ on, attrs }">
        <v-btn
          id="menuQiTingJiJiLu"
          x-small
          fab
          v-bind="attrs"
          class="float-right"
          v-on="on"
        >
          <v-icon>mdi-record-circle-outline</v-icon>
        </v-btn>
        <v-tooltip bottom activator="#menuQiTingJiJiLu">
          {{ title }}
        </v-tooltip>
      </template>
      <v-card>
        <v-card-title v-text="title" />
        <v-divider />
        <v-card-text>
          <v-container>
            <v-row dense>
              <v-col>
                <v-combobox
                  v-if="items"
                  v-model="selectTime"
                  :items="items"
                  chips
                  label="启机时间"
                  prepend-icon="mdi-timer"
                  solo
                >
                  <template
                    #selection="{ attrs, item, select, selected }"
                  >
                    <v-chip
                      v-bind="attrs"
                      :input-value="selected"
                      @click="select"
                    >
                      <strong>{{ item }}</strong>&nbsp;
                    </v-chip>
                  </template>
                </v-combobox>
              </v-col>
            </v-row>
          </v-container>
          <small>* 注意：只能选择1个时间点</small>
          <small>{{ selectTime }}</small>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text small @click="dialog = false">
            取消
          </v-btn>
          <v-btn color="white darken-1" class="primary" text small @click="submit">
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      title: '启机记录',
      dialog: false,
      items: null,
      selectTime: []
    }
  },
  watch: {
    dialog () {
      // 图控件上选择的点的时间信息
      const items = [
        { name: 'D1', value: '2010-10-10 01:11:00' },
        { name: 'D1', value: '2009-10-10 00:00:00' },
        { name: 'D1', value: '2020-08-20 10:10:00' }
      ] || null
      if (items) {
        this.items = items.map(item => item.name + ' [' + item.value + ']')
        this.selectTime = this.items[0]
        // window.console.log(this.items, this.selectTime)
      }
    }
  },
  mounted () {
    // this.dialog = this.value

  },
  methods: {
    submit () {
      const s = this.selectTime
      const d = s.substring(s.indexOf('[') + 1, s.lastIndexOf(' '))
      const t = s.substring(s.lastIndexOf(' ') + 1, s.lastIndexOf(']'))
      this.dialog = false

      this.$emit('syncDates', d, t)
    }
  }
}
</script>

<style lang="scss" scoped>
small{
  color: red;
}
</style>
