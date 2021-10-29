<template>
  <div>
    <v-toolbar
      dense
      flat
    >
      <v-text-field
        v-model="search"
        single-line
        append-icon="mdi-magnify"
        label="搜索"
        dense
        hide-details
        class="mr-1"
        :clearable="true"
        :disabled="items.length===0"
      />

      <template #extension>
        <v-tabs
          id="tabCondition1"
          v-model="tab"
          height="32"
          background-color="sub_title1 lighten-1"
        >
          <v-tab
            v-for="item in tabs"
            :key="item.value"
            class="subtitle-1 font-weight-bold my-1"
            return-object
            v-text="item.text"
          />
        </v-tabs>
      </template>
    </v-toolbar>

    <v-card class="mx-auto" color="primary">
      <v-data-table
        :headers="header"
        :items="items"
        :calculate-widths="false"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        :show-expand="true"
        item-key="no"
        dense
        hide-default-footer
        :items-per-page="-1"
        :loading="loading"
        loading-text="加载中..."
        no-data-text="无数据！"
        group-by="[tag]"
        class="elevation-1"
        :search="search"
      >
        <template #[`group.header`]="props">
          <td :colspan="props.headers.length" @click="props.toggle()">
            <v-icon class="mr-2" :class="props.isOpen ? 'mdi mdi-minus-circle-outline' : 'mdi mdi-plus-circle-outline'" />
            {{ getTagName(props.group) }}
          </td>
        </template>

        <!-- 屏蔽/未屏蔽 -->
        <template #[`header.shadow`]>
          <v-select
            v-if="more.length"
            id="selectMore"
            v-model="select"
            :items="more"
            :label="select.text"
            return-object
            dense
            hide-details
            hide-selected
            class="shadow mt-2 caption"
            single-line
          />
        </template>

        <!-- 扩展开 -->
        <template #expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="px-1">
            <v-form ref="amountEdit">
              <v-container fluid :title="item.tag">
                <v-row dense>
                  <v-col dense>
                    <v-card
                      class="mx-auto secondary"
                      max-width="400"
                      min-height="150"
                      tile
                    >
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="caption accent--text">
                            监测量设置
                          </v-list-item-title>
                          <v-divider />
                          <v-list-item-subtitle class="py-1">
                            <!-- 测点名称 -->
                            <v-edit-dialog
                              :return-value="item.tsitmNm"
                            >
                              <template #default>
                                {{ unBatch.item.tsitmNm }}
                                <p v-if="!unBatch.item.tsitmNm">
                                  {{ itemNames.tsitmNm }}：{{ item.tsitmNm }}
                                </p>
                                <p v-else class="text--disabled">
                                  {{ itemNames.tsitmNm }}：{{ item.tsitmNm }} <b class="caption">{{ unBatch.text }}</b>
                                </p>
                              </template>

                              <template #input>
                                <v-text-field
                                  v-model="item.tsitmNm"
                                  single-line
                                  counter
                                  :disabled="unBatch.item.tsitmNm"
                                  class="minWidth"
                                />
                              </template>
                            </v-edit-dialog>
                          </v-list-item-subtitle>

                          <v-list-item-subtitle class="py-1">
                            <!-- 标准/要求 -->
                            <v-edit-dialog
                              :return-value="item.criterion"
                            >
                              <template #default>
                                {{ itemNames.criterion }}：{{ item.criterion }}
                              </template>

                              <template #input>
                                <v-text-field
                                  ref="criterion"
                                  v-model="item.criterion"
                                  single-line
                                  counter
                                  class="minWidth"
                                >
                                  <v-switch
                                    slot="append-outer"
                                    v-model="batch.chk.criterion"
                                    inset
                                    dense
                                  >
                                    <template #label>
                                      <v-chip
                                        x-small
                                        :color="batch.chk.criterion ? 'primary' : 'default'"
                                      >
                                        {{ batch.name }}
                                      </v-chip>
                                    </template>
                                  </v-switch>
                                </v-text-field>
                              </template>
                            </v-edit-dialog>
                          </v-list-item-subtitle>

                          <v-list-item-subtitle class="py-1">
                            <!-- 小数位 -->
                            <v-edit-dialog
                              :return-value="item.precis"
                            >
                              <template #default>
                                {{ itemNames.precis }}：{{ item.precis }}
                              </template>

                              <template #input>
                                <v-text-field
                                  ref="precis"
                                  v-model="item.precis"
                                  single-line
                                  counter
                                >
                                  <v-switch
                                    slot="append-outer"
                                    v-model="batch.chk.precis"
                                    inset
                                    dense
                                  >
                                    <template #label>
                                      <v-chip
                                        x-small
                                        :color="batch.chk.precis ? 'primary' : 'default'"
                                      >
                                        {{ batch.name }}
                                      </v-chip>
                                    </template>
                                  </v-switch>
                                </v-text-field>
                              </template>
                            </v-edit-dialog>
                          </v-list-item-subtitle>

                          <v-list-item-subtitle class="py-1">
                            <!-- 单位 -->
                            <v-edit-dialog
                              :return-value="item.factDW"
                            >
                              <template #default>
                                {{ itemNames.factDW }}：{{ item.factDW }}
                              </template>

                              <template #input>
                                <v-text-field
                                  ref="factDW"
                                  v-model="item.factDW"
                                  single-line
                                  counter
                                >
                                  <v-switch
                                    slot="append-outer"
                                    v-model="batch.chk.factDW"
                                    inset
                                    dense
                                  >
                                    <template #label>
                                      <v-chip
                                        x-small
                                        :color="batch.chk.factDW ? 'primary' : 'default'"
                                      >
                                        {{ batch.name }}
                                      </v-chip>
                                    </template>
                                  </v-switch>
                                </v-text-field>
                              </template>
                            </v-edit-dialog>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                  </v-col>

                  <v-col dense>
                    <v-card
                      class="mx-auto secondary"
                      max-width="400"
                      min-height="150"
                      tile
                    >
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="caption accent--text">
                            趋势图基准
                          </v-list-item-title>
                          <v-divider />
                          <v-list-item-subtitle class="py-1">
                            <!-- 趋势图基准 -->
                            <v-edit-dialog
                              :return-value="item.rating"
                            >
                              <template #default>
                                {{ itemNames.rating }}：{{ item.rating }}
                              </template>

                              <template #input>
                                <v-text-field
                                  ref="rating"
                                  v-model="item.rating"
                                  single-line
                                  counter
                                >
                                  <v-switch
                                    slot="append-outer"
                                    v-model="batch.chk.rating"
                                    inset
                                    dense
                                  >
                                    <template #label>
                                      <v-chip
                                        x-small
                                        :color="batch.chk.rating ? 'primary' : 'default'"
                                      >
                                        {{ batch.name }}
                                      </v-chip>
                                    </template>
                                  </v-switch>
                                </v-text-field>
                              </template>
                            </v-edit-dialog>
                          </v-list-item-subtitle>
                          <v-list-item-subtitle class="py-1">
                            <!-- 变量区间上线 -->
                            <v-edit-dialog
                              :return-value="item.hbound"
                            >
                              <template #default>
                                {{ itemNames.hbound }}：{{ item.hbound }}
                              </template>

                              <template #input>
                                <v-text-field
                                  ref="hbound"
                                  v-model="item.hbound"
                                  single-line
                                  counter
                                >
                                  <v-switch
                                    slot="append-outer"
                                    v-model="batch.chk.hbound"
                                    inset
                                    dense
                                  >
                                    <template #label>
                                      <v-chip
                                        x-small
                                        :color="batch.chk.hbound ? 'primary' : 'default'"
                                      >
                                        {{ batch.name }}
                                      </v-chip>
                                    </template>
                                  </v-switch>
                                </v-text-field>
                              </template>
                            </v-edit-dialog>
                          </v-list-item-subtitle>
                          <v-list-item-subtitle class="py-1">
                            <!-- 变量区间下线 -->
                            <v-edit-dialog
                              :return-value="item.lbound"
                            >
                              <template #default>
                                {{ itemNames.lbound }}：{{ item.lbound }}
                              </template>

                              <template #input>
                                <v-text-field
                                  ref="lbound"
                                  v-model="item.lbound"
                                  single-line
                                  counter
                                >
                                  <v-switch
                                    slot="append-outer"
                                    v-model="batch.chk.lbound"
                                    inset
                                    dense
                                  >
                                    <template #label>
                                      <v-chip
                                        x-small
                                        :color="batch.chk.lbound ? 'primary' : 'default'"
                                      >
                                        {{ batch.name }}
                                      </v-chip>
                                    </template>
                                  </v-switch>
                                </v-text-field>
                              </template>
                            </v-edit-dialog>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                  </v-col>

                  <v-col v-if="item.tag===31 || item.tag===41 || item.tag===44 || item.tag===42" dense>
                    <v-card
                      class="mx-auto secondary"
                      max-width="400"
                      min-height="150"
                      tile
                    >
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="caption accent--text">
                            测点异常判断设置
                          </v-list-item-title>
                          <v-divider />
                          <!-- 合理数据上线 -->
                          <v-list-item-subtitle v-if="item.tag===31 || item.tag===41 || item.tag===44 || item.tag===43" class="py-1">
                            <v-edit-dialog
                              :return-value="item.drawHBound"
                            >
                              <template #default>
                                {{ itemNames.drawHBound }}：{{ item.drawHBound }}
                              </template>

                              <template #input>
                                <v-text-field
                                  ref="drawHBound"
                                  v-model="item.drawHBound"
                                  single-line
                                  counter
                                >
                                  <v-switch
                                    slot="append-outer"
                                    v-model="batch.chk.drawHBound"
                                    inset
                                    dense
                                  >
                                    <template #label>
                                      <v-chip
                                        x-small
                                        :color="batch.chk.drawHBound ? 'primary' : 'default'"
                                      >
                                        {{ batch.name }}
                                      </v-chip>
                                    </template>
                                  </v-switch>
                                </v-text-field>
                              </template>
                            </v-edit-dialog>
                          </v-list-item-subtitle>
                          <!-- 合理数据下线 -->
                          <v-list-item-subtitle v-if="item.tag===31 || item.tag===41 || item.tag===44 || item.tag===43" class="py-1">
                            <v-edit-dialog
                              :return-value="item.drawLBound"
                            >
                              <template #default>
                                {{ itemNames.drawLBound }}：{{ item.drawLBound }}
                              </template>

                              <template #input>
                                <v-text-field
                                  ref="drawLBound"
                                  v-model="item.drawLBound"
                                  single-line
                                  counter
                                >
                                  <v-switch
                                    slot="append-outer"
                                    v-model="batch.chk.drawLBound"
                                    inset
                                    dense
                                  >
                                    <template #label>
                                      <v-chip
                                        x-small
                                        :color="batch.chk.drawLBound ? 'primary' : 'default'"
                                      >
                                        {{ batch.name }}
                                      </v-chip>
                                    </template>
                                  </v-switch>
                                </v-text-field>
                              </template>
                            </v-edit-dialog>
                          </v-list-item-subtitle>
                          <v-list-item-subtitle v-if="item.tag===31 || item.tag===41 || item.tag===44 || item.tag===42" class="py-1">
                            <!-- 跳变率 -->
                            <v-edit-dialog
                              :return-value="item.leapRate"
                            >
                              <template #default>
                                {{ itemNames.leapRate }}：{{ item.leapRate }}
                              </template>

                              <template #input>
                                <v-text-field
                                  ref="leapRate"
                                  v-model="item.leapRate"
                                  single-line
                                  counter
                                >
                                  <v-switch
                                    slot="append-outer"
                                    v-model="batch.chk.leapRate"
                                    inset
                                    dense
                                  >
                                    <template #label>
                                      <v-chip
                                        x-small
                                        :color="batch.chk.leapRate ? 'primary' : 'default'"
                                      >
                                        {{ batch.name }}
                                      </v-chip>
                                    </template>
                                  </v-switch>
                                </v-text-field>
                              </template>
                            </v-edit-dialog>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                  </v-col>

                  <v-col dense>
                    <v-card
                      class="mx-auto secondary"
                      max-width="400"
                      min-height="150"
                      tile
                    >
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="caption accent--text">
                            其它
                          </v-list-item-title>
                          <v-divider />
                          <v-list-item-subtitle v-if="item.fdnm===0" class="py-1">
                            <!-- 数据标签 -->
                            <v-edit-dialog
                              :return-value="item.fdnm"
                            >
                              <template #default>
                                {{ itemNames._fdnm }}：{{ item.fdnm }}
                              </template>

                              <template #input>
                                <v-text-field
                                  ref="fdnm"
                                  v-model="item.fdnm"
                                  single-line
                                  counter
                                />
                              </template>
                            </v-edit-dialog>
                          </v-list-item-subtitle>
                          <v-list-item-subtitle class="py-1">
                            <!-- 修正值 -->
                            <v-edit-dialog
                              :return-value="item.sSillCompensation"
                            >
                              <template #default>
                                {{ itemNames._sSillCompensation }}：{{ item.sSillCompensation }}
                              </template>

                              <template #input>
                                <v-text-field
                                  ref="sSillCompensation"
                                  v-model="item.sSillCompensation"
                                  single-line
                                  counter
                                />
                              </template>
                            </v-edit-dialog>
                          </v-list-item-subtitle>
                          <v-list-item-subtitle v-if="item.tag===31" class="py-1">
                            <!-- 吸收比免考核 -->
                            <v-edit-dialog
                              :return-value="item.threshold"
                            >
                              <template #default>
                                {{ itemNames._threshold }}：{{ item.threshold }}
                              </template>

                              <template #input>
                                <v-text-field
                                  ref="threshold"
                                  v-model="item.threshold"
                                  single-line
                                  counter
                                />
                              </template>
                            </v-edit-dialog>
                          </v-list-item-subtitle>
                          <v-list-item-subtitle v-else-if="item.tag===42 || item.tag===44" dense class="py-1">
                            <v-edit-dialog
                              :return-value="item.threshold"
                            >
                              <template #default>
                                {{ itemNames._threshold }}：{{ item.threshold }}
                              </template>

                              <template #input>
                                <v-text-field
                                  ref="threshold"
                                  v-model="item.threshold"
                                  single-line
                                  counter
                                />
                              </template>
                            </v-edit-dialog>
                          </v-list-item-subtitle>
                          <v-list-item-subtitle v-if="item.DUnvName!==null" class="py-1">
                            <!-- 测点名称 -->
                            <v-edit-dialog
                              :return-value="item.DUnvName"
                            >
                              <template #default>
                                {{ itemNames._DUnvName }}：{{ item.DUnvName }}
                              </template>

                              <template #input>
                                <v-text-field
                                  ref="DUnvName"
                                  v-model="item.DUnvName"
                                  single-line
                                  counter
                                  class="minWidth"
                                />
                              </template>
                            </v-edit-dialog>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                  </v-col>

                  <v-col dense>
                    <v-card
                      class="mx-auto secondary"
                      max-width="400"
                      min-height="150"
                      tile
                    >
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="caption accent--text">
                            机组选择
                          </v-list-item-title>
                          <v-divider />
                          <v-container class="px-0 py-0 mx-0 my-0">
                            <v-row dense>
                              <v-col
                                v-for="(itm,i) in Dys.data"
                                :key="i"
                                dense
                                class="px-2 py-0 mx-0 my-0"
                              >
                                <v-checkbox
                                  v-model="Dys.selected"
                                  dense
                                  multiple
                                  hide-details
                                  :label="itm.text"
                                  :value="itm.value"
                                  class="shrink float-left"
                                />
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="11" />
                  <v-col>
                    <v-btn color="white darken-1" class="primary" text small @click="updateAmount(item)">
                      保存
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </td>
        </template>

        <!-- 无数据提示信息 -->
        <template #[`no-result`]>
          <div class="no-result">
            无数据！
          </div>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2" v-text="title" />
        <v-card-text class="py-0">
          <v-text-field
            v-model="addName"
            single-line
            required
            autofocus
            full-width
            label="*"
            @keyup.enter.native="createAmount"
          />
        </v-card-text>
        <v-divider class="mx-4" />
        <v-card-actions class="mx-0 my-0">
          <v-spacer />
          <v-btn color="blue darken-1" text small @click="dialog=false">
            取消
          </v-btn>
          <v-btn color="white darken-1" class="primary" text small @click="createAmount">
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script type="text/ecmascript-6">

import {
  crudAmount,
  crudDTypeTagRItem
} from '@/api/index.js'

export default {
  components: { },
  data () {
    return {
      title: '数据处理-监测量管理',
      dialog: false,
      loading: true,
      addName: '',
      search: '',
      tab: null,
      tabs: [{ text: '运行监测', value: 0 }, { text: '停电试验', value: 4 }],
      more: [{ text: '全部', value: -1 }, { text: '屏蔽', value: 1 }, { text: '未屏蔽', value: 0 }],
      select: { text: '全部', value: -1 },
      batch: null,
      unBatch: null,
      expanded: [],
      singleExpand: true,
      card: [],
      header: [],
      Dys: {
        selected: [],
        data: []
      },
      roles: null,
      itemNames: {
        _no: '序号',
        _ord: '顺序',
        _tag: '标签ID',
        _tagName: '标签名称',
        tsitmNm: '名称',
        criterion: '标准/要求',
        factDW: '单位',
        precis: '小数位',
        shadow: '状态',
        drawHBound: '测点异常-上线',
        drawLBound: '测点异常-下线',
        leapRate: '测点异常-跳变率',
        rating: '趋势图-基准',
        hbound: '趋势图-上线',
        lbound: '趋势图-下线',
        _dynamoType: '机型',
        _fdnm: '数据标签',
        _sSillCompensation: '修正值',
        _theType: '',
        _threshold: [
          { id: '31', name: '产气率考核起点' },
          { id: '8808', name: '极化指数免考核设置：R60S &gt;' },
          { id: '8807', name: '吸收比免考核设置：R60S &gt;' },
          { id: '8877', name: '互差免考核设置：泄漏电流' },
          { id: '0', name: '吸收比免考核设置：' }
        ],
        _tsitmID: '测点ID',
        _typeTag: '',
        _DUnvName: '监测量机型名称'
      },
      items: [
        // {
        //   tsitmNm: 'xxx',
        //   criterion: '---',
        //   drawHBound: 1200,
        //   drawLBound: -50,
        //   leapRate: 0,
        //   rating: 1200,
        //   hbound: 1200,
        //   lbound: 0,
        //   factDW: 'MW',
        //   precis: '2',
        //   shadow: '未屏蔽',
        // }
      ],
      bufferItems: null
    }
  },
  computed: {
    getTabValue () {
      const _tab = this.tab || 0
      return this.tabs[_tab].value
    }
  },
  watch: {
    // 运行监测、停电试验 切换
    tab: {
      handler (val, oldVal = 0) {
        window.console.log('watch tab start')
        if (oldVal !== val) {
          this.readAmount()
        }
      },
      immediate: false
    },
    // 屏蔽、非屏蔽 切换
    select (val, oldVal = 0) {
      window.console.log('watch select start')
      const self = this

      if (val.value === -1 && self.bufferItems) {
        self.items = self.bufferItems
      } else if (oldVal !== val) {
        const filterData = this.items.filter(item => item.shadow === val.text) || null
        if (filterData) {
          self.items = null
          self.items = filterData
        }
      }
    },
    expanded (item) { // val, oldVal
      // 获取机型监测量名称 && 绑定到 items数据的DUnvName属性中
      this.bindDUnvName(item)

      // 重置多机修改复选为false
      this.resetBatch()
    },
    'batch.chk': {
      handler (chk) {
        if (chk) {
          let isBatchChecked = false
          // 如果批量选项有选择了，即checkbox had checked，那么批量
          for (const name in chk) {
            if (chk[name]) {
              isBatchChecked = true
            }
          }
          // 批量修改时，false表示只读，即不参与批量修改；true表示可修改，即可以参与单台或多台的修改
          this.unBatch.item.tsitmNm = isBatchChecked
          window.console.log(this.unBatch.item.tsitmNm)
          // const chked = val.chk.find(item => item === true)
          // if (chked) {
          //   alert(788)
          // }
        }
      },
      immediate: false,
      deep: true
    }
  },
  created () {

  },
  mounted () {
    const self = this
    self.roles = self.$store?.state?.user?.info?.roles || []

    // 重置多机修改复选为false
    this.resetBatch()

    // 根据itemNames构建表格头信息
    this.initHeader()

    // 初始化机组-角色
    this.initDynamos()
    // this.readAmount()
    // this.readDTypeTagRItem()
  },
  methods: {
    // 根据itemNames构建表格头信息
    initHeader () {
      const self = this
      for (const [k, v] of Object.entries(self.itemNames)) {
        if (!k.includes('_')) {
          self.header.push({
            text: v,
            align: 'center',
            groupable: false,
            sortable: false,
            value: k
          })
        }
      }

      // 扩展打开
      self.header.push({
        text: '',
        groupable: false,
        sortable: false,
        value: 'data-table-expand'
      })
      window.console.log(self.header)
    },
    // 初始化机组-角色
    initDynamos () {
      // Dys: {
      //   selected: [19],
      //   data: [
      //     { text: 'D1', value: 19 },
      const self = this
      const id = self.$store.getters['dynamo/getDynamoId']
      self.Dys.selected = [id.toString()]
      self.Dys.data = []

      for (const r of self.roles) {
        const { dynamoId, dynamoName, dynamoShortName, DType } = r
        const hasDType = self.$store.getters['system/hasDynamoType'](DType)
        if (hasDType) {
          self.Dys.data.push({
            text: dynamoShortName,
            value: dynamoId,
            name: dynamoName,
            dtype: DType
          })
        }
      }
    },
    open (item) {
      this.dialog = false
    },
    getTagName (tag) {
      const self = this
      return self.items.find(item => item.tag === tag).tagName
    },
    // read amounts
    async readAmount () {
      const self = this
      self.items = []
      self.loading = true
      self.search = ''
      self.select = { text: '全部', value: -1 }

      const user = self.$store.getters['user/getUserInfo'](self)
      let group = -1
      if (typeof user?.dynamoId === 'undefined') {
        group = -1
      } else {
        group = user?.dynamoId
      }
      window.console.log('readAmount group = ', group)
      const r = await crudAmount({
        crud: 'read',
        group
      })

      if (r?.code === 200) {
        const types = r?.data?.GetCategory?.Type || []
        self.initTsitmList(types)

        self.loading = false
      } else {
        window.console.log('read failed r = ', r)
      }
    },
    initTsitmList (types) {
      const self = this
      const arrData = []
      for (let t = 0, no = 1, tLen = types?.length; t < tLen; t++) {
        const type = types[t] || null
        if (type) {
          const { _ItemAttr, _Ord, _Tag, _TagName } = type
          self.card.push({
            ord: _Ord,
            tag: _Tag,
            tagName: _TagName,
            itemAttr: _ItemAttr
          })

          // window.console.log(_Tag, _TagName, _ItemAttr, self.getTabValue, t)

          if (parseInt(_ItemAttr, 10) !== self.getTabValue) {
            continue
          }

          const testItems = type?.TestItem || []
          for (let ti = 0, tiLen = testItems.length; ti < tiLen; ti++) {
            // Shadow select.value  -1:all 1:shadow-False, 0:shadow-True
            const item = testItems[ti] || null
            if (item) {
              const { _Criterion, _DrawHBound, _DrawLBound, _DynamoType, _FDNM, _FactDW, _Hbound, _LBound, _LeapRate, _Precis, _Rating, _SSillCompensation, _Shadow, _Thetype, _Threshold, _TsitmID, _TsitmNm, _TypeTag } = item

              if (!self.$store.getters['system/hasDynamoType'](_DynamoType)) { continue }
              if (typeof _Criterion === 'undefined' || typeof _Shadow === 'undefined') { continue } // 过滤有问题的数据

              const _shadow = _Shadow.toString().toLowerCase()
              if (self.select.value !== -1) { // 非全部
                if (self.select.value === 1 && _shadow !== 'true') { // 屏蔽
                  continue
                } else if (_shadow !== 'true') { // 未屏蔽
                  continue
                }
              }

              arrData.push({
                no: no++,
                ord: _Ord,
                tag: _Tag,
                tagName: _TagName,
                tsitmNm: _TsitmNm || '---',
                criterion: _Criterion || '---',
                drawHBound: _DrawHBound,
                drawLBound: _DrawLBound,
                leapRate: _LeapRate,
                rating: _Rating,
                hbound: _Hbound,
                lbound: _LBound,
                factDW: _FactDW,
                precis: _Precis,
                shadow: _shadow === 'true' ? self.more.find(m => m.value === 1).text : self.more.find(m => m.value === 0).text,
                dynamoType: _DynamoType,
                fdnm: _FDNM,
                sSillCompensation: _SSillCompensation,
                theType: _Thetype,
                threshold: _Threshold,
                tsitmID: _TsitmID,
                typeTag: _TypeTag,
                DUnvName: null
              })
            }
          }
        }
      }

      self.items = arrData
      self.bufferItems = arrData
      self.loading = false
    },
    // create amount
    async createAmount () {
      const self = this

      self.dialog = false
      const r = await crudAmount({ crud: 'create' })
      if (r?.code === 200) {
        if (r?.data === 0) { // 重复添加 self.$refs.Tips.open('重复添加!', 1500, 'error')
          self.tips(-1, '重复添加！')
        } else if (r?.data > 0) {
          debugger
        }

        self.initDynamos()
      }
    },
    async updateAmount (item) {
      /*
      item: {
        DUnvName: "GME001MW_发电机输出有功功率（MW）GME001MW_发电机输出有功功率（MW）"
        criterion: "---"
        drawHBound: "1000.000"
        drawLBound: "0.000"
        dynamoType: "100"
        factDW: "MW"
        fdnm: "D1GME001MW"
        hbound: "1200.000"
        lbound: "-20.000"
        leapRate: "0.000"
        no: 1
        ord: "1"
        precis: "2"
        rating: "1000.000"
        sSillCompensation: "0.00"
        shadow: "未屏蔽"
        tag: "0"
        tagName: "发电机工况"
        theType: "0"
        threshold: "0.00"
        tsitmID: "1001"
        tsitmNm: "GME001MW_发电机输出有功功率"
        typeTag: "0"

        注：修改更新操作时，批量+单台（或多台）时，监测量名称不能修改（灰掉），反之可以单台（或多台）修改
      }
      */
      const self = this
      const dys = self.Dys.selected.join()
      const SName = ''
      const id = item.tsitmID
      const state = 1 // checkbox: true-1, false-0 批量修改

      const xml = []
      xml.push('<modify>')
      item?.tsitmNm && item?.tsitmID && xml.push(`<TsitmID Descr="${item.tsitmNm}">${item.tsitmID}</TsitmID>`)
      SName && dys && xml.push(`<Dynamo Descr="${SName}">${dys}</Dynamo>`)
      item?.hbound && xml.push(`<Hbound>${item.hbound}</Hbound>`)
      item?.lbound && xml.push(`<Lbound>${item.hbound}</Lbound>`)
      item?.leapRate && xml.push(`<LeapRate>${item.leapRate}</LeapRate>`)
      item?.threshold && xml.push(`<Threshold>${item.threshold}</Threshold>`)
      item?.sSillCompensation && xml.push(`<SSillCompensation>${item.sSillCompensation}</SSillCompensation>`)
      item?.rating && xml.push(`<Rating>${item.rating}</Rating>`)
      item?.drawHBound && xml.push(`<DrawHBound>${item.drawHBound}</DrawHBound>`)
      item?.drawLBound && xml.push(`<DrawLBound>${item.drawLBound}</DrawLBound>`)
      item?.tsitmNm && xml.push(`<Localname>${item.tsitmNm}</Localname>`)
      item?.criterion && xml.push(`<Criterion>${self.$common.toSBC(item.criterion)}</Criterion>`)
      item?.factDW && xml.push(`<FactDW>${self.$common.toSBC(item.factDW)}</FactDW>`)
      item?.precis && xml.push(`<Precis>${item.precis}</Precis>`)
      item?.shadow && xml.push(`<Shadow>${item.shadow === '屏蔽' ? 'True' : 'False'}</Shadow>`)
      item?.fdnm && xml.push(`<FDNM>${item.fdnm}</FDNM>`)
      xml.push('</modify>')

      // 用户是否选择批量修改使用 batch.chk['xxx'] 来判断

      if (id && dys) {
        const params = {
          xml: xml.join(''),
          state,
          dy: dys,
          tag: item.tag
        }

        const r = await crudAmount({ crud: 'update', params })
        if (r?.code === 200) {
          window.console && window.console.log(r.data)
        }

        self.initDynamos()
      }
    },
    async deleteAmount (item) {
      const self = this
      const id = item?.id || null

      if (!id) {
        return false
      }

      if (!window.confirm('确定删除？')) {
        return false
      }

      const r = await crudAmount({ curd: 'delete', id: item.id })
      window.console.log('r = ', r)
      if (r?.code === 200) {
        if (parseInt(r?.data, 10) === 0) {
          debugger
        }
        self.initDynamos()
      }
    },
    // 修改监测量名称
    async updateTsitmNm (item, dys, state) {
      const xml = []
      for (let i = 0, iLen = dys.length; i < iLen; i++) {
        const id = dys[i]
        xml.push('<modify>')
        xml.push(`<TsitmID Descr="">${item.tsitmID}</TsitmID>`)
        xml.push(`<Thetype>${item.theType}</Thetype>`)
        xml.push(`<Dynamo Descr="">${id}</Dynamo>`)
        xml.push('</modify>')
      }
      const params = {
        xml: xml.join(''),
        state,
        dy: dys,
        tag: item.tag
      }
      const r = await crudAmount({ crud: 'update', params })
      if (r?.code === 200) {
        debugger
      }

      self.initDynamos()
    },
    // 获取机型监测量名称 && 绑定到 items数据的DUnvName属性中
    async bindDUnvName (item) {
      const self = this
      if (item && item?.length > 0) {
        const tsitmid = item[0]?.tsitmID
        const dtype = item[0]?.dynamoType

        const r = await crudDTypeTagRItem({
          crud: 'read',
          dtype,
          tsitmid
        })
        if (r?.code === 200 && r?.data) {
          const current = self.items.find(item => item.dynamoType === dtype && item.tsitmID === tsitmid)
          if (current) {
            current.DUnvName = r.data?.text
          }
        }
      }
    },
    async updateDTypeTagRItem (item) {
      const r = await crudDTypeTagRItem({
        crud: 'update',
        dtype: 100,
        tsitmid: 1001,
        newdunvname: 'GME001MW_发电机输出有功功率（MW）GME001MW_发电机输出有功功率（MW）'
      })

      if (r?.code === 200) {
        debugger
      }
    },
    // 重置多机修改复选为false
    resetBatch () {
      this.batch = {
        name: '批量修改',
        chk: {
          // tsitmNm: false,
          criterion: false,
          factDW: false,
          precis: false,
          // shadow: false,
          drawHBound: false,
          drawLBound: false,
          leapRate: false,
          rating: false,
          hbound: false,
          lbound: false,
          // fdnm: false,
          // sSillCompensation: false
          DUnvName: false
        }
      }
      this.unBatch = {
        text: `(此项不参与${this.batch.name})`,
        item: {
          tsitmNm: false
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#tabCondition.v-input {
  justify-content: flex-end;
}
#tabCondition .v-input__control{
  width: 100px !important;
}

.v-row-group__header td{
  cursor: pointer !important;
}
.no-result{
  min-height: 500px;
}

.tabActive {
  background-color: seashell;
}

.shadow {
  width: 70px;
  font-size:13px;
  padding: 0;
  margin: 0;
}

.minWidth {
  min-width: 500px !important;
}

</style>
