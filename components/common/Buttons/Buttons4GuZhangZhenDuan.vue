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
            <v-icon class="fdesfont">
              &#xe61c;
            </v-icon>
          </v-btn>
        </template>
        <span class="hidden-sm-and-down">故障部位</span>
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
            <v-icon class="fdesfont">
              &#xe634;
            </v-icon>
          </v-btn>
        </template>
        <span class="hidden-sm-and-down">报表</span>
      </v-tooltip>

      <!-- <v-tooltip left>
        <template #activator="{ on }">
          <v-btn
            fab
            dark
            small
            color="warning"
            @click="toggleAlarmList(true)"
            v-on="on"
          >
            <v-icon class="fdesfont">&#xe649;</v-icon>
          </v-btn>
        </template>
        <span class="hidden-sm-and-down">导出</span>
      </v-tooltip> -->

      <ExportExcel tid="table1" class="outTable" :name="t" />
    </v-speed-dial>
  </div>
</template>

<script type="text/ecmascript-6">
import ExportExcel from '@/components/common/ExportExcel'

export default {
  components: { ExportExcel },
  props: {
    t: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      fab: false
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

<style scoped lang="stylus" rel="stylesheet/stylus">
.v-speed-dial
  position: absolute;
  top: 90px !important;

.v-toolbar
  right: 0;
  top: 20;

.v-btn--floating
  position: relative;
</style>
