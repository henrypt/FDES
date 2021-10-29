<template>
  <div>
    <!--
      <div class="my-4 text-subtitle-1">
        趋势图采样周期: <input v-model.number="graph" type="text" @change="limit"></input>
        系统采样周期: <input v-mode.number="system" type="text" @change="limit"></input>
      </div>

      输入采样周期设置值应大于60秒!
      系统采样周期长度大于9位数!
      只可以输入整数!

      输入趋势图采样周期设置值应大于1个!
      趋势图采样周期长度大于9位数!
      只可以输入整数!
    -->

    <v-card
      :loading="loading"
      class="mx-auto my-12"
      max-width="550"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        />
      </template>

      <v-card-title>系统采样周期</v-card-title>
      <v-divider class="mx-4" />

      <v-card-text>
        <v-text-field
          ref="systemConfigure"
          v-model="system"
          :rules="rulesSystem"
          :maxlength="maxLength"
          clearable
          dense
          readonly
          disabled
          hint="只能输入整数"
          :label="`值应大于${systemTime}秒`"
          hide-details="auto"
        />
        <v-divider />
      </v-card-text>

      <v-card-title>趋势图采样周期</v-card-title>
      <v-divider class="mx-4" />
      <v-card-text>
        <v-text-field
          ref="graphConfigure"
          v-model="graph"
          :rules="rulesGraph"
          :maxlength="maxLength"
          clearable
          dense
          :readonly="readonly"
          hint="只能输入整数"
          :label="`值应大于${graphTime}秒`"
          hide-details="auto"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          @click="submit"
        >
          保存
        </v-btn>
      </v-card-actions>

      <v-alert elevation="2" class="overline py-1 text-left">
        <div class="float-left pr-2">
          <v-icon color="warning">
            mdi-alert-circle
          </v-icon>
        </div>
        <div class="float-left subtitle-1 pt-1 text--warning">
          系统采样周期是指本系统从用户数据系统中两次获取数据的时间间隔
        </div>
      </v-alert>
    </v-card>

    <Tips ref="Tips" :bottom="true" />
  </div>
</template>

<script type="text/ecmascript-6">
import { readConfigure, updateConfigure } from '@/api/index.js'

import Tips from '@/components/common/Tips/'
export default {
  components: {
    Tips
  },
  data () {
    return {
      title: '设置采样周期',
      systemTime: 60,
      graphTime: 1,
      system: 60,
      graph: 1,
      maxLength: 9,
      loading: true,
      selection: 1,
      readonly: false,
      rulesSystem: [
        value => !!value || '必需有值！',
        value => (value && !isNaN(value) && parseInt(value, 10) >= this.systemTime) || `值不能小于${this.systemTime}秒!`
      ],
      rulesGraph: [
        value => !!value || '必需有值！',
        value => (value && !isNaN(value) && parseInt(value, 10) >= this.graphTime) || `值不能小于${this.graphTime}秒!`
      ]
    }
  },
  computed: {

  },
  watch: {

  },
  mounted () {
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      const self = this
      self.loading = true
      const params = {
        crud: 'read'
      }
      const r = await readConfigure(params)
      if (r) {
        self.system = r?.system
        self.graph = r?.graph
      }
      self.loading = false
    },
    async submit () {
      const self = this
      if (self.system && self.graph && self.system > 0 && self.graph > 0) {
        self.loading = true
        const params = {
          crud: 'update',
          system: self.system,
          graph: self.graph
        }
        const r = await updateConfigure(params)
        if (r.code === 200) {
          self.$refs.Tips.UpdateTips(1)
        }

        self.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.no-power {
  background-color: #eee;
}
</style>
