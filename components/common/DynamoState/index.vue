<template>
  <div>
    <div v-if="selectedItem" class="page subtitle-1 primary--text">
      <v-icon left color="primary">
        mdi-label
      </v-icon>
      {{ selectedItem }}
      <v-icon
        v-if="hasClose"
        right
        color="info"
        class="float-right"
        @click="$emit('close')"
      >
        mdi-close-circle
      </v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // items: {
    //   type: [Object, Array],
    //   default: null,
    //   required: true
    // },
    hasClose: {
      type: [Boolean, String],
      default: true, // default has close button in compoent
      required: false
    }
  },
  data () {
    return {
      items: []
    }
  },
  computed: {
    selectedItem () {
      let name = ''
      if (this.items && this.items.length > 0) {
        let objChildren = null
        for (const i in this.items) {
          objChildren = this.items[i].children
          for (const k in objChildren) {
            if (objChildren[k].selected) {
              // this.items[i] 电站 + objChildren[k] 机组
              name = this.items[i].name + objChildren[k].name
            }
          }
        }
      }
      return name
    }
  },
  mounted () {
    this.items = this.$t('system.stations.info') || []
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped></style>
