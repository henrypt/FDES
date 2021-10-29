<template>
  <div>
    <v-speed-dial
      v-model="fab"
      left
      direction="right"
      open-on-hover
      transition="slide-y-reverse-transition"
      fixed
    >
      <template #activator>
        <v-btn v-model="fab" color="orange light-2" dark fab small>
          <v-icon v-if="fab">
            mdi-close
          </v-icon>

          <span v-else class="green--text font-weight-bolder title">
            T
            <!-- <v-icon>chevron_right</!-->
          </span>
          <!-- <v-icon v-else>chevron_right</v-icon> -->
        </v-btn>
      </template>

      <!-- <v-tooltip left light>
      <template v-slot:activator="{ on }">
        <v-btn
          fab
          dark
          small
          color="orange"
          @click="toggleStable"
          v-on="on">
          <v-icon>assignment</v-icon>
        </v-btn>
      </template>
      <span class="hidden-sm-and-down">稳定点列表</span>
    </v-tooltip> -->

      <v-chip-group v-model="tab" active-class="orange--text light-2" mandatory>
        <v-chip
          v-for="tag in tags"
          :key="tag.name"
          color="teal"
          class="white--text"
        >
          {{ tag.name }}
        </v-chip>
      </v-chip-group>

      <v-chip-group
        v-model="chartSubType"
        active-class="orange--text light-2"
        multiple
      >
        <v-chip color="teal" class="white--text">
          <v-avatar left>
            <v-icon>mdi-checkbox-marked-circle</v-icon>
          </v-avatar>
          折算
        </v-chip>
        <v-chip color="teal" class="white--text">
          <v-avatar left>
            <v-icon>mdi-checkbox-marked-circle</v-icon>
          </v-avatar>
          雷达图
        </v-chip>
      </v-chip-group>
    </v-speed-dial>
  </div>
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
      type: [Boolean, Object],
      default: false,
      required: false
    }
  },
  data () {
    return {
      fab: false,
      tab: [],
      switch1: false,
      switch2: false,
      chartSubType: [],
      isShowStable: false,
      tags: [
        { name: '上层水温', icon: 'show_chart' },
        { name: '层间温度', icon: 'show_chart' },
        { name: '下层水温', icon: 'show_chart' },
        { name: '引出线', icon: 'show_chart' },
        { name: '铁芯', icon: 'show_chart' }
      ]
    }
  },
  mounted () {

  },
  methods: {
    toggleStable () {
      this.$emit('vModel', true)
    },
    routerback () {
      this.$router.back(-1)
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
