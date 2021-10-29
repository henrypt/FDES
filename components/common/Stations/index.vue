<template>
  <div class="page">
    <!-- <v-select  v-if="stations" v-model="selectionType" :items="['leaf','independent']" label="Selection Type"></v-select>
    <v-treeview v-model="selection" :items="items" :selection-type="selectionType" selectable return-object open-all>
    </v-treeview>
    <v-divider vertical></v-divider> -->

    <v-card v-if="stations" id="hStations">
      <DynamoState
        v-if="duotai && items"
        :items="items"
        class="my-4 mx-2 pt-4"
        @close="$emit('close')"
      />

      <template v-if="false">
        <v-switch v-model="dynamosType" class="ma-2" label="多台" />
      </template>
      <v-divider />

      <v-treeview
        dense
        open-on-click
        activatable
        transition
        :hoverable="true"
        :multiple-active="dynamosType"
        open-all
        color="primary"
        item-disabled="disabled"
        :items="items"
        :active.sync="active"
        @update:active="updateActive"
      >
        <!-- @update:active="updateActive" -->
        <template #label="{ item }">
          <label v-if="!!item.children">
            {{ item.name }}
          </label>
          <label v-else>
            <v-tooltip bottom>
              <template #activator="{ on }">
                <div v-on="on">{{ item.name }} ({{ item.shortName }})</div>
              </template>
              <span>{{ item.id }}</span>
            </v-tooltip>
          </label>
        </template>
      </v-treeview>
      <!-- [
        { "id": 11,
          "name": "大亚湾",
          "shortName": "DYW",
          "selected": false,
          "children": [
            { "id": 19, "name": "一号机", "shortName": "D1", "disabled": true, "selected": false },
            { "id": 20, "name": "二号机", "shortName": "D2", "disabled": true, "selected": false }
          ]
        }
      ] -->
      <span v-if="hasClose">{{ active }}</span>
    </v-card>
  </div>
</template>

<script type="text/ecmascript-6">
import DynamoState from '@/components/common/DynamoState'

export default {
  components: {
    DynamoState
  },
  model: {
    prop: 'value', // 绑定prop传递的值
    event: 'input' // 定义触发事件名称
  },
  props: {
    // 接受父组件传递的值
    value: {
      type: [String, Array],
      default: () => {},
      required: true
    },
    duotai: {
      type: [Boolean, String],
      default: null,
      required: false
    },
    hasClose: {
      type: [Boolean, String],
      default: true, // default has close button in compoent
      required: false
    },
    cType: { // dynamosType:false:单台； true:多台
      type: [Boolean, String],
      default: false, // default has close button in compoent
      required: false
    }
  },
  data () {
    return {
      val: this.value,
      items: null,
      stations: null,
      selectSet: null, // new Set(),//定义一个存储 选中状态的 节点容器, Set 对象存储的值总是唯一的
      selectionType: 'leaf',
      selection: [],
      open: [],
      active: this.value || [],
      selected: {
        id: 1,
        name: ''
      }
    }
  },
  computed: {
    // dynamosType: false, // false:单台； true:多台
    dynamosType () {
      const self = this
      return self.cType || false
    }
  },
  watch: {
    active: {
      deep: true,
      handler () {
        // this.selected.id = this.active[0].id
        // 通过$emit触发input（model内定义）事件，将内部值传递给给父组件
        this.$emit('input', this.active)
        if (this.active) {
          this.$store.dispatch('dynamo/updateDynamo', this.active[0])
        }
      }
    }
  },
  created () {

  },
  mounted () {
    this.hInit()
  },
  methods: {
    hInit () {
      const self = this
      const s = self.$t('system')

      if (self.$store.state?.user?.info) {
        // 根据登录用户的权限属性更新
        const userDynamos = self.$store.state.user.info.dynamos || null
        if (userDynamos) {
          const dynamos = userDynamos.map((d) => {
            if (d.disabled === false) {
              return d.id
            }
            return null
          })

          s.stations.items.forEach((item, itemIndex) => {
            if (item.children) {
              item.children.forEach((c, index) => {
                if (dynamos && dynamos[0] === -1 && itemIndex === 0 && index === 0) {
                  c.selected = true
                }

                if (dynamos && (dynamos.includes(c.id) || dynamos[0] === -1)) {
                  item.selected = true
                  c.disabled = false
                } else {
                  item.selected = false
                  c.disabled = true
                }
              })
            }
          })
        }
      }
      this.stations = s.stations
      this.items = s.stations.items

      // this.getSelectedItemId(this.items)
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
    // async
    updateActive (selectedId) {
      const self = this
      if (selectedId.length <= 0) {
        self.hInit()
        return
      }

      self.items.forEach((o) => {
        o.children.forEach((elem) => {
          elem.selected = elem.id === selectedId[0]
        })
      })

      // update user current select dynamo id(s)
      // await self.$store.dispatch('user/UpdateUserInfoSelectDynamos', self.active)
      return self.items
    },
    getSelectedItemId (items) {
      const self = this
      if (self.items) {
        items.forEach((o) => {
          o.children.forEach((elem) => {
            if (elem.selected === true) {
              self.active = [elem.id]
            }
          })
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#hStations{
  min-width: 240px !important
}
</style>
