<template>
  <div class="page">
    <v-card v-if="stations">
      <v-treeview
        dense
        open-on-click
        activatable
        transition
        selectable
        :active.sync="active"
        color="primary"
        :items="items"
        @update:active="updateActive"
      >
        <template #label="{ item }">
          <label v-if="!!item.children">
            {{ item.name }}
          </label>
          <label v-else> {{ item.name }} ({{ item.shortName }}) </label>
        </template>
      </v-treeview>
    </v-card>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'Dynamos',
  components: {

  },
  model: {
    prop: 'msg',
    event: 'vModel'
  },
  props: {
    msg: {
      type: Object,
      default: null,
      required: false
    }
  },
  data () {
    return {
      items: null,
      stations: null,
      selectSet: null, // new Set(),//定义一个存储 选中状态的 节点容器, Set 对象存储的值总是唯一的
      selectionType: 'leaf',
      selection: [],
      open: [],
      active: [],
      selected: {
        id: 1,
        name: ''
      }
    }
  },
  mounted () {
    this.hInit()
  },
  methods: {
    hInit () {
      const s = this.$t('system')
      alert('components/common/DYS s = ' + s)

      this.stations = s.stations
      this.items = s.stations.items

      this.getSelectedItemId(this.items)
    },
    loadStations (pid) {
      return this.axios
        .get('/item/station/list', {
          params: {
            pid
          }
        }
          .then((resp) => {
            if (resp.status !== 200) {
              this.$message.error('Error')
            }

            // resp.data.forEach(el => {
            //   el._name = el.name
            //   if( el.isParent ){
            //     el.children = []
            //   }
            // })

            this.stations = resp.data
          }))
    },
    // 点击节点的时候 会触发该函数
    updateActive (id) {
      this.items.forEach((o) => {
        o.children.forEach((elem) => {
          elem.selected = elem.id === id
        })
      })
      this.$emit('vModel', id)
    },
    getSelectedItemId (items) {
      if (this.items) {
        items.forEach((o) => {
          o.children.forEach((elem) => {
            if (elem.selected === true) {
              this.active = [elem.id]
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
