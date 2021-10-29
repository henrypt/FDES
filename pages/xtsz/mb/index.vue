<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-select
          v-model="mType1"
          :items="items1"
          solo
          dense
          hide-details
          @change="mType1Change"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-data-table
          v-if="models"
          v-show="isShowPage"
          :headers="headers"
          :items="models"
          :loading="loading"
          :items-per-page="perPage"
          loading-text="加载中..."
          class="elevation-3"
          dense
        >
          <template #top>
            <v-toolbar flat color="white">
              <v-toolbar-title class="text--h6">
                <v-icon color="success">
                  mdi-human-handsup
                </v-icon>{{ title }}
              </v-toolbar-title>
              <!-- <v-divider class="mx-4" inset vertical /> -->
              <v-spacer />
              <v-radio-group v-model="mType2" dense row>
                <v-radio
                  v-for="item in items2"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"
                  dense
                  @change="mType2Change"
                />
              </v-radio-group>
            </v-toolbar>
          </template>

          <template #[`item.no`]="{ item }">
            {{ item.no }}
          </template>

          <template #[`item.name`]="{ item }">
            {{ item.name }}
          </template>

          <template #[`item.createTime`]="{ item }">
            {{ item.createTime }}
          </template>

          <template #[`item.creator`]="{ item }">
            {{ item.creator }}
          </template>

          <template #[`item.modelAttr`]="{ item }">
            <v-radio-group v-model="item.attr" row @change="ModelAttrUpdate(item)">
              <v-radio
                v-for="itm in item.modelAttr"
                :key="itm.value"
                :label="itm.text"
                :value="itm.value"
                return-object
              />
            </v-radio-group>
          </template>

          <template
            #[`item.actions`]="{ item }"
          >
            <!-- <v-icon
              :id="
                `update-${item.actions}`"
              class="mr-2"
              color="primary"
              @click="updateModel(item)"
            >
              mdi-pen
            </v-icon>
            <v-tooltip
              top
              :activator="`#update-${item.actions}`"
            >
              <span>更新</span>
            </v-tooltip> -->
            <span :title="item.actions">
              <v-icon :id="`delete-${item.actions}`" color="primary" :disabled="currentUser!==item.actinos" @click="deleteItem(item)">
                mdi-delete
              </v-icon>
              <v-tooltip
                top
                :activator="`#delete-${item.actions}`"
              >
                <span>删除</span>
              </v-tooltip>
            </span>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <Tips ref="Tips" />
  </v-container>
</template>

<script type="text/ecmascript-6">
import { readModels, updateModel, deleteModel } from '@/api/'
import Tips from '@/components/common/Tips/index.vue'

let BufferData = null
export default {
  components: { Tips },
  data () {
    return {
      title: '模板管理',
      isShowPage: true,
      loading: true,
      perPage: 5,
      models: null,
      mType1: 0,
      mType2: 1,
      currentUser: null,
      items1: [{ text: '单机组-趋势图', value: 0 }, { text: '多机组-趋势图', value: 1 }, { text: '历史比较-趋势图', value: 2 }, { text: '状态比较', value: 3 }],
      items2: [{ text: '故障跟踪', value: 1 }, { text: '日常状态监测', value: 2 }]
    }
  },
  computed: {
    headers () {
      return [
        { text: '编码', value: 'no', sortable: false, align: 'center' },
        { text: '模板名称', value: 'name', sortable: false },
        { text: '创建时间', value: 'createTime' },
        { text: '创建人', value: 'creator', sortable: false },
        { text: '属 性', value: 'modelAttr', sortable: false },
        { text: '操 作', value: 'actions', sortable: false, align: 'center' }
      ]
    }
  },
  created () {

  },
  mounted () {
    const self = this
    self.currentUser = self?.$store?.state?.user?.info?.user?.id
    self.initialize()
  },
  methods: {
    async initialize (isLoadData = false) {
      const self = this
      const params = {
        crud: 'read',
        T: self.mType1
      }

      if (isLoadData) {
        BufferData && self.initModels(BufferData)
      } else {
        const r = await readModels(params)
        if (r.code === 200) {
          BufferData = r
          self.initModels(r)
        }
      }
      self.isShowPage = !!self.models
      self.loading = !self.models
    },
    initModels (r) {
      const self = this
      self.models = []
      let idx = 1

      r?.data?.ModelInfo?.Model?.forEach((m) => {
        /*
          _Category: "0"
          _CreateTime: "2009-12-12 16:04:15"
          _ID: "185"
          _ModelAttr: "1"
          _Name: "ccc"
          _TimeLong: "0"
          _UserName: "ccc"
        */
        if (self.mType2.toString() === m._Category.toString()) {
          self.models.push({
            id: m._ID,
            no: idx++,
            name: m._Name, // 模板名称
            createTime: m._CreateTime, // 创建时间
            creator: m._UserName, // 用户名
            modelAttr: [{ text: '公用', value: '1', selected: false }, { text: '私用', value: '0', selected: false }].map((t) => {
              t.selected = t.value === m._ModelAttr
              return t
            }), // 属性: 1-公用, 0-私用
            actions: m._ID, // 模板ID
            attr: m._ModelAttr,
            category: m._Category || -1 // 模版分类: 1-故障跟踪，2-日常状态监测
          })
        }
      })
      /*
        <ModelInfo>
          <Model ID="1318" Name="N2测点" ModelAttr="1" CreateTime="2020-10-20 16:18:38" UserName="吴志鹏" Category="1" TimeLong="43200"></Model>
          ...
        </ModelInfo>
      */
    },
    async ModelAttrUpdate (item) {
      if (item) {
        const self = this
        const params = {
          crud: 'update',
          id: item?.id,
          ispublic: item?.attr
        }
        window.console.log(params)
        const r = await updateModel(params)
        if (r.code === 200) {
          self.initialize()
          self.$refs.Tips.UpdateTips(1)
        }
      }
    },
    async deleteItem (item) {
      if (item) {
        if (!window.confirm(`确定要删除 [${item?.name}], 此操作不可逆！`)) {
          return false
        }
        const self = this
        const params = {
          crud: 'delete',
          id: item?.id
        }

        const r = await deleteModel(params)
        if (r?.code === 200) {
          if (r?.data === 1) {
            self.$refs.Tips.open('您不是创建此模板的用户，所以不能删除！', 1500, 'error')
          }
        }
      }
    },
    mType1Change () {
      const self = this
      self.$nextTick(() => {
        self.initialize()
      })
    },
    mType2Change () {
      const self = this
      self.$nextTick(() => {
        self.initialize(true)
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
-
