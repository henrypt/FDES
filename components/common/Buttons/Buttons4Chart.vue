<template>
  <div>
    <v-speed-dial
      v-if="fab"
      v-model="fab"
      right
      botom
      direction="bottom"
      open-on-hover
      transition="slide-y-reverse-transition"
      fixed
    >
      <template #activator>
        <v-btn v-model="fab" color="blue light-2" dark fab small>
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </template>

      <v-tooltip v-if="goBack" left light>
        <template #activator="{ on }">
          <v-btn
            fab
            dark
            small
            color="green"
            @click="routerback"
            v-on="on"
          >
            <v-icon>mdi-reply</v-icon>
          </v-btn>
        </template>
        <span class="hidden-sm-and-down">返回</span>
      </v-tooltip>

      <v-tooltip v-if="listData" left light>
        <template #activator="{ on }">
          <v-btn
            fab
            dark
            small
            color="green"
            @click="listDialog = true"
            v-on="on"
          >
            <v-icon class="fdesfont fdes-list" />
          </v-btn>
        </template>
        <span class="hidden-sm-and-down">列表</span>
      </v-tooltip>
    </v-speed-dial>

    <!-- 列表对话框 -->
    <v-dialog
      v-model="listDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark dense bottom color="primary">
          <v-toolbar-title class="subtitle-1" v-text="title" />
          <v-spacer />
          <v-toolbar-items>
            <ExportExcel id="table1" class="outTable" :name="title" />

            <v-tooltip bottom>
              <template #activator="{ on }">
                <v-btn icon dark v-on="on" @click="listDialog = false">
                  <v-icon normal>
                    mdi-close
                  </v-icon>
                </v-btn>
              </template>
              <span>关闭</span>
            </v-tooltip>
          </v-toolbar-items>
        </v-toolbar>

        <v-card-title v-if="false">
          <span class="headline">{{ title }}</span>
        </v-card-title>

        <table id="table1">
          <v-card-text :color="`secondary ${'darken-2'}`" class="px-0 py-0">
            <v-list dense expand>
              <v-list-group
                v-for="item in listData"
                :key="item.id"
                value="true"
                prepend-icon="mdi-clipboard-list"
                dense
              >
                <template #activator>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </template>
                <v-list-item>
                  <v-list-item-content>
                    <v-simple-table dense fixed-header>
                      <template #default>
                        <thead>
                          <tr>
                            <th
                              :colspan="hasConvert(item)"
                              class="caption blue-grey lighten-4 pl-2 py-2"
                            >
                              {{ item.name }}
                            </th>
                          </tr>
                          <tr>
                            <th class="text-left">
                              序号
                            </th>
                            <th class="text-left">
                              名称
                            </th>
                            <th class="text-left">
                              值
                            </th>
                            <th v-if="hasConvert(item)" class="text-left">
                              折算
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(node, index) in item.nodes"
                            :key="node.id"
                          >
                            <td>{{ index + 1 }}</td>
                            <td>{{ node.name }}</td>
                            <td>{{ node.value }}</td>
                            <td v-if="item.convert && item.convert.length > 0">
                              {{ item.convert[index] }}
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    <v-simple-table dense fixed-header>
                      <template #default>
                        <thead>
                          <tr>
                            <th class="caption grey lighten-4 pl-3 py-1">
                              最大值
                            </th>
                            <th class="caption grey lighten-4 pl-3 py-1">
                              最小值
                            </th>
                            <th class="caption grey lighten-4 pl-3 py-1">
                              平均值
                            </th>
                            <th class="caption grey lighten-4 pl-3 py-1">
                              差值
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="text-left">
                              {{ item.max.value }}
                            </td>
                            <td class="text-left">
                              {{ item.min.value }}
                            </td>
                            <td class="text-left">
                              {{ item.avg }}
                            </td>
                            <td class="text-left">
                              {{ item.diff }}
                            </td>
                          </tr>
                          <tr>
                            <td />
                            <td />
                            <td />
                            <td />
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-card-text>
        </table>

        <v-card-actions>
          <v-toolbar dark dense bottom color="primary">
            <v-spacer />
            <v-toolbar-items>
              <ExportExcel id="table1" class="outTable" :name="title" />
              <v-tooltip top>
                <template #activator="{ on }">
                  <v-btn icon dark v-on="on" @click="listDialog = false">
                    <v-icon normal>
                      mdi-close
                    </v-icon>
                  </v-btn>
                </template>
                <span>关闭</span>
              </v-tooltip>
            </v-toolbar-items>
          </v-toolbar>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ExportExcel from '@/components/common/ExportExcel'
export default {
  components: { ExportExcel },
  model: {
    prop: 'msg',
    event: 'vModel'
  },
  props: {
    msg: {
      type: [Boolean, Object],
      default: false,
      required: false
    },
    // 返回
    goBack: {
      type: Boolean,
      default: false,
      required: false
    },
    // 标题
    title: {
      type: String,
      default: '列表',
      required: false
    },
    // 列表的数据
    listData: {
      type: null,
      default: null,
      required: false
    }
  },
  data () {
    return {
      fab: false,
      listDialog: false
    }
  },
  computed: {},
  mounted () {
    this.fab = this.msg
  },
  methods: {
    // toggleStable() {
    //   this.$emit('vModel', true)
    // },
    routerback () {
      this.$router.back(-1)
    },
    hasConvert (item) {
      return item.convert && item.convert.length > 0 ? 4 : 3
    }
  }
}
</script>

<style lang="scss" scoped>
#table1{
  padding: 0;
  margin: 0;
  width: 100%;
}

>>>.v-list-item__icon{
  margin-right: 15px !important;
  color: #aaa
}

>>>.v-data-table--fixed-header{
  thead{
    th{
      top: 0 !important;
    }
  }
}
</style>
