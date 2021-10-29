<template>
  <v-card
    class="mx-auto py-3"
    tile
    :loading="loading"
    min-width="880"
  >
    <!-- <v-card-title>{{ title }}</v-card-title> -->
    <v-card-text class="py-0 my-0">
      <v-text-field
        v-model="search"
        label="搜索"
        hide-details
        clearable
        flat
        light
        clear-icon="mdi-close-circle-outline"
      />
    </v-card-text>
    <v-card-text class="my-0 px-0 py-0">
      <v-row class="mx-0">
        <v-col dense>
          <draggable
            v-model="list"
            element="ul"
            chosen-class="chosen"
            :no-transition-on-drag="true"
            :options="{group:'title', animation:150}"
            @change="sort"
          >
            <transition-group type="transition" :value="true" :css="true">
              <v-list
                v-for="(itm,idx) in list"
                :key="idx"
                dense
                subheader
                class="move"
              >
                <v-list-group no-action sub-group color="info">
                  <template #activator>
                    <v-list-item-content>
                      {{ itm.text }}
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-divider vertical class="mx-2" /><v-icon @click.stop="open(itm)" v-text="itm.icon" />
                    </v-list-item-icon>
                  </template>

                  <v-list-item v-for="(item,index) in itm.subItem" :key="index">
                    <v-list-item-content>
                      <v-text-field
                        v-model="item.text"
                        :append-outer-icon="item.icon"
                        color="primary"
                        @keyup.enter.native="updateItem(item, itm)"
                        @change="updateItem(item, itm)"
                        @click:append-outer="deleteItem(item, itm)"
                      />
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider inset />
                </v-list-group>
                <v-divider inset light class="anchor" />
              </v-list>
            </transition-group>
          </draggable>
        </v-col>
      </v-row>
    </v-card-text>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2" v-text="addItem.name" />
        <v-card-text class="py-0">
          <v-text-field
            v-model="addName"
            :error-messages="nameErrors"
            required
            autofocus
            clearable
            full-width
            label="*"
            @input="$v.addName.$touch()"
            @blur="$v.addName.$touch()"
            @keyup.enter.native="createSubItem"
          />
        </v-card-text>
        <v-divider class="mx-4" />
        <v-card-actions class="mx-0 my-0">
          <v-spacer />
          <v-btn color="blue darken-1" text small @click="dialog=false">
            取消
          </v-btn>
          <v-btn color="white darken-1" class="primary" text small @click="createSubItem">
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogTips.show" :hide-overlay="true" max-width="500px">
      <div class="v-snack v-snack--absolute v-snack--active v-snack--centered v-snack--text">
        <div class="v-snack__wrapper v-sheet theme--light rounded tip--text">
          <div role="status" aria-live="polite" class="v-snack__content text-center">
            <strong id="tipInfo" :class="dialogTips.class" v-text="dialogTips.text" />
            <button type="button" class="v-btn v-btn--icon v-btn--right v-btn--round v-btn--text theme--light v-size--default anchor--text" @click.stop="dialogTips.show=false">
              <span class="v-btn__content"><i class="v-icon notranslate mdi mdi-close-circle theme--light" style="font-size: 16px;" /></span>
            </button>
          </div>
          <div class="v-snack__action " />
        </div>
      </div>
    </v-dialog>
  </v-card>
</template>

<script type="text/ecmascript-6">
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import draggable from 'vuedraggable'

import {
  createEntryOption,
  readEntryOption,
  updateEntryOption,
  deleteEntryOption,
  sortEntryOption
} from '@/api/index.js'

export default {
  components: { draggable },
  mixins: [validationMixin],
  validations: {
    addName: { required, maxLength: maxLength(20) }
  },
  data () {
    return {
      title: '录入选项-分类信息',
      drag: true,
      dialog: false,
      loading: true,
      selectedItem: 0,
      search: null,
      bufferList: null,

      dialogTips: {
        show: false,
        text: '操作成功',
        class: 'tip primary--text',
        tipsTimer: null
      },
      addItem: {
        id: -1,
        name: '',
        subItem: {
          id: -1,
          name: ''
        }
      },
      addName: '',
      list: null
    }
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.addName?.$dirty) { return errors }
      !this.$v.addName.maxLength && errors.push('输入内容最多20个字长度')
      !this.$v.addName.required && errors.push('请填写内容.')
      return errors
    }
  },
  watch: {
    // 搜索
    search (key) {
      if (this.bufferList) {
        this.list = this.bufferList
      }

      if (key && (key + '').toString().trim() !== '') {
        key = (key + '').toString().trim()
        this.list = this.list.filter((item) => {
          const p = item?.text?.toString().includes(key)
          const c = item?.subItem.find((itm) => { return itm?.text?.toString().includes(key) })
          return p || c
        })
      } else {
        this.list = this.bufferList
      }
    }
  },
  created () {

  },
  mounted () {
    this.readItems()
  },
  methods: {
    open (item) {
      this.selectedItem = item
      this.addItem.id = item.id
      this.addItem.name = item.text

      this.addItem.subItem.id = -1
      this.addItem.subItem.name = ''
      this.dialog = true
    },
    // read
    async readItems () {
      const self = this

      self.list = []
      self.search = null
      self.loading = true

      const r = await readEntryOption({ crud: 'read', typeId: -1 })
      if (r?.code === 200) {
        /*
        <Type Ord="1" TypeID="41" TypeDescr="（定子）绕组直流电阻">
          <Info ID="115">┅</Info>
          <Info ID="161">不抽转子</Info>
          <Info ID="162">抽转子前</Info>
          <Info ID="165">回装前</Info>
          <Info ID="191">回装后</Info>
          <Info ID="200">安装调试</Info>
          <Info ID="233">出厂试验</Info>
        </Type>
        */
        const types = r?.data?.Data?.Type || []
        types.forEach((type) => {
          // const subItem = Array.from(type?.Info).map((t) => {
          //   return { id: t?._ID, text: t?.__text.toString().trim(), icon: 'mdi-delete' }
          //   // [ { id: 11, text: '┅', icon: 'mdi-delete' }, ... {} ]
          // }) || []
          self.list.push({
            // type._TypeID,type.ID, type._Ord, type._TypeDescr
            id: type?._TypeID,
            ord: type?._Ord,
            text: type?._TypeDescr?.toString().trim(),
            icon: 'mdi-plus-outline',
            active: false,
            subItem: Array.from(type?.Info).map((t) => {
              return { id: t?._ID, text: t?.__text.toString().trim(), icon: 'mdi-delete' }
            // [ { id: 11, text: '┅', icon: 'mdi-delete' }, ... {} ]
            }) || []
          })
        })

        self.bufferList = self.list

        self.loading = false
      }
    },
    // create SubItem
    async createSubItem () {
      const self = this
      if (self?.addItem && self?.addItem?.toString().trim() !== '') {
        self.addItem.subItem.name = self.addName // 刷新缓存数据
      } else {
        self.$v.addName.touch()
      }

      const params = {
        crud: 'create',
        typeDescr: self.addItem.name,
        infoDescr: self.addName // '子节点-描述信息'
      }

      self.dialog = false
      const r = await createEntryOption(params)
      if (r?.code === 200) {
        if (r?.data === 0) { // 重复添加 self.$refs.Tips.open('重复添加!', 1500, 'error')
          self.tips(-1, '重复添加！')
        } else if (r?.data > 0) {
          self.list.find((item) => {
            if (item.id === self.addItem.id) {
              item.subItem.push({ id: r?.data, text: self.addItem.subItem.name, icon: 'mdi-delete' })
            }
            return item
          })

          self.tips(1) // 操作成功 self.$refs.Tips.open('操作失败！', 1500, 'error')
        } else {
          self.tips(-1) // 操作失败 self.$refs.Tips.UpdateTips(0)
        }
      }
    },
    async updateItem (item, parentItem) {
      const self = this
      const id = item.id || null
      const typeDescr = parentItem.text || null
      const infoDescr = item.text || null

      if (id && typeDescr && infoDescr) {
        const params = {
          crud: 'update',
          id, // <Info ID="302">--</Info>
          typeDescr, // <Type Ord="104" TypeID="90" TypeDescr="AAAA">
          infoDescr // '子节点-描述信息'
        }
        const r = await updateEntryOption(params)
        if (r?.code === 200) {
          if (r?.data === 1) {
            self.tips(-1, '发生重复记录，不允许更新!') // 操作失败
          } else {
            if (r?.data === 0) {
              self.list.find((item) => {
                if (item.id === parentItem.id) {
                  item.subItem.find((item2) => {
                    if (item2.id === item.id) {
                      item2.text = item.text
                      return item2
                    }
                    return null
                  })
                  return item
                }
                return null
              })

              self.tips(1)
            } else {
              self.tips(-1)
            }
            self.tips(r?.data === 0 ? 1 : -1) // self.$refs.Tips.UpdateTips(r?.data === 0 ? 1 : 0)
          }
        }
      } else {
        self.tips(-1)
      }
    },
    async deleteItem (item, parentItem) {
      const self = this
      const id = item?.id || null

      if (!id) {
        self.tips(-1) // failed
        return false
      }

      if (!window.confirm('确定删除？')) {
        return false
      }

      const params = {
        crud: 'delete',
        id: item.id // <Info ID="310">┅</Info>
      }

      const r = await deleteEntryOption(params)
      window.console.log('r = ', r)

      if (r?.code === 200) {
        if (parseInt(r?.data, 10) === 0) {
          // self.readItems() // 重载数据，刷新页面
          // 从缓存中（list）删除数据
          self.list.find((itm) => {
            if (itm.id === parentItem?.id) {
              itm.subItem = itm.subItem.filter(item => item.id !== id)
              return itm
            }
            return null
          })

          self.tips(1) // self.$refs.Tips.open('操作成功', 1500, 'success')
        } else if (r?.data === 1) {
          self.tips(-1, '此条记录已被引用，不能删除!') // self.$refs.Tips.open('此条记录已被引用，不能删除!', 1500, 'error')
        } else {
          self.tips(-1, '发生其他操作异常！') // self.$refs.Tips.open('发生其他操作异常！', 1500, 'error')
        }
      }
    },
    // evt里面有两个值，一个evt.added 和evt.removed  可以分别知道移动元素的ID和删除元素的ID
    // evt.item // 可以知道拖动的本身
    // evt.to // 可以知道拖动的目标列表
    // evt.from // 可以知道之前的列表
    // evt.oldIndex // 可以知道拖动前的位置
    // evt.newIndex // 可以知道拖动后的位置
    async sort (evt) {
      const self = this
      // (evt, 'sort...', evt.moved.newIndex, evt.moved.oldIndex)

      const params = {
        crud: 'sort',
        curOrd: evt.moved.oldIndex + 1,
        newOrd: evt.moved.newIndex + 1 // 這里沒有使用數據里的Ord --- evt.moved.element.ord
      }

      window.console.log('sort params = ', params)

      const r = await sortEntryOption(params)
      if (r?.code === 200) {
        self.tips(r?.data === 0 ? 1 : -1)
      }
    },
    // start ,end ,add,update, sort, remove 得到的都差不多
    // start (evt) {
    //   this.drag = true
    //   window.console.log(evt, 'start...')
    // },
    // end (evt) {
    //   window.console.log(evt, 'end....')
    //   this.drag = true
    // },
    // move (evt, originalEvent) {
    //   window.console.log(evt, 'move')
    //   window.console.log(originalEvent) // 鼠标位置
    // }
    tips (type, info) {
      const self = this
      switch (type) {
        case 1:
          self.dialogTips.show = true
          self.dialogTips.text = '操作成功'
          self.dialogTips.class = 'tip primary--text'
          break

        case -1:
          self.dialogTips.show = true
          self.dialogTips.text = info || '操作失败！'
          self.dialogTips.class = 'tip warning--text'
          break
      }

      self.dialogTips?.tipsTimer && window.clearTimeout(self.dialogTips.tipsTimer)
      self.dialogTips.tipsTimer = window.setTimeout(() => {
        self.dialogTips.show = false
      }, 1.5 * 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.move {
  cursor: move;
}
.delete{
  cursor: pointer;
}
/*选中样式*/
.chosen {
  border: solid 2px #3089dc !important;
}
</style>
-
