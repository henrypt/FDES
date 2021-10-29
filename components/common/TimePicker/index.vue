<template>
  <span>
    <!-- 时 -->
    <v-select
      v-if="time.hours"
      v-model="hour"
      :items="time.hours"
      label="时"
      :cache-items="true"
      dense
      hide-details
      :title="title"
      @input="TimeChange()"
    />

    <!-- 分 -->
    <v-select
      v-if="time.minutes"
      v-model="minute"
      :items="time.minutes"
      label="分"
      :cache-items="true"
      dense
      hide-details
      :title="title"
      @input="TimeChange()"
    />

    <!-- 秒 -->
    <v-select
      v-if="time.seconds"
      v-model="second"
      :items="time.seconds"
      label="秒"
      :cache-items="true"
      dense
      hide-details
      :title="title"
      @input="TimeChange()"
    />
  </span>
</template>

<script>
export default {
  model: {
    prop: 'msg',
    event: 'vModel'
  },
  props: {
    msg: {
      type: String,
      default: '',
      required: false
    },
    title: {
      type: String,
      default: 'time',
      required: false
    }
  },
  data () {
    return {
      modal: false,
      date: new Date(),
      hour: '00',
      minute: '00',
      second: '00',
      time: {
        hours: [],
        minutes: [],
        seconds: []
      }
    }
  },
  created () {
    for (let h = 0; h < 24; h++) {
      this.time.hours.push(h < 10 ? '0' + h : h)
    }
    for (let m = 0; m < 60; m++) {
      this.time.minutes.push(m < 10 ? '0' + m : m)
    }
    for (let s = 0; s < 60; s++) {
      this.time.seconds.push(s < 10 ? '0' + s : s)
    }
  },
  mounted () {
    this.hour = this.date.getHours()
    this.minute = this.date.getMinutes()
    this.second = this.date.getSeconds()
    this.hour = this.hour < 10 ? '0' + this.hour : this.hour
    this.minute = this.minute < 10 ? '0' + this.minute : this.minute
    this.second = this.second < 10 ? '0' + this.second : this.second
  },
  methods: {
    TimeChange () {
      const self = this
      self.$emit('vModel', self.GetTime())
    },
    GetTime () {
      return this.hour + ':' + this.minute + ':' + this.second
    }
  }
}
</script>

<style lang="scss" scoped>
.v-select{
  max-width: 52px;
  float:left;
}
.v-select{
  >>> .v-select__selection--comma{
    font-weight: bold;
  }
}
</style>
