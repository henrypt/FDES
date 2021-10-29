<template>
  <v-snackbar
    v-if="snackbar"
    v-model="snackbar"
    text
    rounded
    absolute
    :bottom="isBottomShow"
    :centered="isCenteredShow"
    :color="classType"
    :timeout="showTime"
    content-class="text-center"
  >
    <strong id="tipInfo" ref="tipInfo" :class="classType">{{ text }}</strong>
    <v-btn
      v-if="showClose"
      icon
      right
      color="anchor"
      text
      @click="snackbar = false"
    >
      <v-icon small>
        mdi-close-circle
      </v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    txt: { type: String, default: '', required: false },
    ctype: { type: String, default: 'tip', required: false },
    show: { type: Boolean, default: false, required: false },
    close: { type: Boolean, default: true, required: false },
    time: { type: [Number, String], default: null, required: false },
    centered: { type: Boolean, default: false, required: false },
    bottom: { type: Boolean, default: false, required: false },
    top: { type: Boolean, default: false, required: false }
  },
  data () {
    return {
      snackbar: false,
      text: '',
      showTime: null,
      classType: 'tip',
      isCenteredShow: false,
      isBottomShow: false,
      isTopShow: false
    }
  },
  mounted () {
    this.snackbar = this.show
    this.text = this.txt
    this.showClose = this.close
    this.showTime = this.time || 5000
    this.classType = this.ctype
    this.isCenteredShow = this.centered
    this.isBottomShow = this.bottom
    this.isTopShow = this.top
  },
  methods: {
    open (txt, time, stype) {
      const self = this
      if (txt) {
        self.text = txt
      }
      if (time) {
        self.showTime = time
      }

      self.snackbar = true

      if (stype && self.$refs?.tipInfo) {
        self.classType = stype
      }
    },
    closeTip () {
      this.snackbar = false
    },
    UpdateTips (state) {
      switch (parseInt(state, 10)) {
        case 0:
          this.open('操作失败！', 1500, 'error')
          break
        case 1:
          this.open('操作成功', 1500, 'success')
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#tipInfo{
  color: #00c58e;
  background-color: #fff !important;
  font-size: 0.95rem;
}

.error{
  color: #D81B60 !important;
  background-color: #fff !important;
  font-size: 0.95rem;
}
.success {
  color: #00c58e !important;
  background-color: #fff !important;
  font-size: 0.95rem;
}
.warning {
  color: #F56565 !important;
  background-color: #fff !important;
  font-size: 0.95rem;
}
</style>
