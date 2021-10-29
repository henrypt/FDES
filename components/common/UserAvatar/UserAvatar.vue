<template>
  <v-layout id="UserAvatar" align-center justify-center row fill-height>
    <v-select
      v-model="values"
      :item-avatar="items"
      append-outer-icon="home"
    />

    <v-dialog
      v-if="false"
      v-model="dialog"
      width="400"
      scrollable
      persistent
      transition="dialog-bottom-transition"
    >
      <template #activator="{ on }">
        <svg class="icon" aria-hidden="true" v-on="on">
          <use :xlink:href="currentAvatar" />
        </svg>
      </template>

      <v-card>
        <v-item-group
          v-if="false"
          v-model="avatar_active"
          max
          active-class="item_active"
        >
          <v-item v-for="(item, index) in data" :key="index">
            <svg
              slot-scope="{ active, toggle }"
              class="icon"
              aria-hidden="true"
              :selected="active"
              @click="toggle"
            >
              <use :xlink:href="item.icon" :value="item.val" />
            </svg>
            <i style="font-size:0.13rem; color:yellow;">{{ item.active }}</i>
          </v-item>
        </v-item-group>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" flat @click="dialog = false">
            OK{{ activeId }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script type="text/ecmascript-6">
// import custom icon from assets/lib/iconfont
import '../../../assets/lib/iconfont/iconfont.js'
export default {
  components: {

  },
  data () {
    return {
      dialog: true,
      data: null,
      avatar_active: 1,

      items: null,
      values: null
    }
  },
  computed: {
    currentAvatar () {
      if (this.data) {
        const d = this.data.find(i => i.active)
        if (d) { return d.icon }
      }
      return null
    },
    // return current active avatar id
    activeId () {
      return this.avatar_active
    }
  },
  mounted () {
    const _t = this.$t('userAvatar.data') || null
    if (_t) {
      this.data = _t
    }

    if (_t) {
      this.items = _t.map(i => i.icon)
      this.values = _t.map(i => i.icon)
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style lang="scss" scoped>
.icon{
  width: 0.75rem;
  height: 0.65rem;
  vertical-align: -0.1rem;
  fill: currentColor;
  overflow:hidden;
  margin: 0 0.2rem;
}
.iconfont{
  font-size: 0.8rem;
}
.active{
  background-color: #64c2e6;
  border-radius: 100%;
}
.item_active{
  background-color: #64c2e6;
  border-radius: 100%;
}
.v-card{
  background-color: rgba(0,0,0,.26) !important;
}
.v-card__actions{
  background-color: rgba(0,0,0,.2) !important;
}
.v-btn{
  color: #ffff00 !important;
  font-weight: bolder !important;
  background-color: rgba(255,255,255,0.12);
  font-size: 0.24rem;
}
</style>
