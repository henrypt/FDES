<template>
  <div>
    <v-speed-dial
      v-model="fab"
      right
      botom
      direction="bottom"
      open-on-hover
      transition="slide-y-reverse-transition"
      fixed
    >
      <template #activator>
        <v-btn v-model="fab" color="blue light-2" dark fab small>
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </template>

      <v-tooltip left light>
        <template #activator="{ on }">
          <v-btn
            fab
            dark
            small
            color="green"
            to="/qsfx/fz"
            v-on="on"
          >
            <v-icon class="fdesfont fdes-wxbbaobiao" />
          </v-btn>
        </template>
        <span class="hidden-sm-and-down">发展趋势</span>
      </v-tooltip>

      <v-tooltip left>
        <template #activator="{ on }">
          <v-btn
            fab
            dark
            small
            color="indigo"
            to="/qsfx/fz"
            v-on="on"
          >
            <v-icon class="fdesfont fdes-wxbbaobiao" />
          </v-btn>
        </template>
        <span class="hidden-sm-and-down">计算值分析</span>
      </v-tooltip>

      <v-tooltip left>
        <template #activator="{ on }">
          <v-btn
            fab
            dark
            small
            color="warning"
            @click="toggleAlarmList(true)"
            v-on="on"
          >
            <v-icon class="fdesfont fdes-icon_index_line" />
          </v-btn>
        </template>
        <span class="hidden-sm-and-down">待处理设备异常</span>
      </v-tooltip>
    </v-speed-dial>

    <!-- 待处理设备异常 -->
    <AlarmList v-model="AlarmListIsShow" />
  </div>
</template>

<script type="text/ecmascript-6">
import AlarmList from '@/components/common/AlarmList' // 待处理设备异常

export default {
  components: {
    AlarmList
  },
  data () {
    return {
      fab: false,
      AlarmListIsShow: false // 控制待处理设备异常的显示或隐藏
    }
  },
  mounted () {

  },
  methods: {
    toggleAlarmList (s) {
      this.AlarmListIsShow = s
    }
  }
}
</script>

<style lang="scss" scoped>
.v-toolbar{
  right: 0;
  top: 20;
}

.v-speed-dial{
  position: absolute;
}

.v-btn--floating{
  position: relative;
}
</style>
