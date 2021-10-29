<template>
  <v-layout align-center justify-center row fill-height class="mt-0">
    <v-dialog v-model="dialog" scrollable max-width="400px">
      <template #activator="{ attrs }">
        <v-btn id="menuMoBan" icon v-bind="attrs" @click.stop="open">
          <v-icon size="20" color="blue">
            fdesfont fdes-model
          </v-icon>
        </v-btn>
        <v-tooltip bottom activator="#menuMoBan">
          {{ title }}
        </v-tooltip>
      </template>

      <v-card dense>
        <v-card-title dense color="green darken-1">
          <v-icon
            size="20"
            color="success"
            class="mr-1 fdesfont fdes-model pr-1"
          />
          模板
          <v-spacer />
          <!-- <v-btn text small outlined class="blue--text mr-1" :disabled="!valid" @click="submit">新建<v-icon right class="mx-0">mdi-pencil</v-icon></v-btn> -->

          <v-menu
            id="newModel"
            v-model="menuNewModel"
            :close-on-click="false"
            :close-on-content-click="false"
            :nudge-width="200"
            :max-width="200"
            fixed
            bottom
          >
            <template #activator="{ on, attrs }">
              <v-btn
                id="newModelTooltip"
                color="primary"
                dark
                small
                absolute
                top
                right
                fab
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-tooltip bottom activator="#newModelTooltip">
                新建模板
              </v-tooltip>
            </template>
            <v-card>
              <v-list dense>
                <v-list-item dense>
                  <v-list-item-title>
                    <v-icon
                      size="16"
                      color="success"
                      class="mr-1 fdesfont fdes-model"
                    />
                    <b class="subtitle-1">新建模板</b>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
              <v-divider />
              <v-list dense>
                <v-list-item dense>
                  <v-list-item-content>
                    <!-- 新建模板 -->
                    <v-form
                      id="formNewModel"
                      ref="formNewModel"
                      v-model="valid"
                      lazy-validation
                    >
                      <!-- 模板名称 -->
                      <v-text-field
                        v-model="newModelName"
                        :counter="20"
                        label="模板名称"
                        :error-messages="newModelNameErrors"
                        required
                        autofocus
                        type="text"
                        @input="$v.newModelName.$touch()"
                        @blur="$v.newModelName.$touch()"
                      />
                      <!-- 时间长度 -->
                      <v-text-field
                        v-model="newModelTimeLong"
                        label="时间长度"
                        :error-messages="newModelTimeLongErrors"
                        required
                        type="number"
                        @input="$v.newModelTimeLong.$touch()"
                        @blur="$v.newModelTimeLong.$touch()"
                      />
                      <!-- 类型 -->
                      <v-select
                        v-model="newModelType"
                        :items="itemsModelTypes"
                        item-text="name"
                        item-value="type"
                        label="类型"
                        required
                        dense
                        single-line
                        hide-details
                      />
                    </v-form>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" text small @click="menuNewModel = false">
                  取消
                </v-btn>
                <v-btn
                  color="white darken-1"
                  class="primary"
                  text
                  small
                  :disabled="!valid"
                  @click="submit_newmodel()"
                >
                  确定
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-card-title>
        <v-divider />
        <v-card-text dense style="height:500px;">
          <v-radio-group
            v-if="modelTypeInfo"
            v-model="select"
            class="py-0 my-0"
            column
          >
            <div v-for="(item, idx) in modelTypeInfo" :key="idx">
              <h4 class="py-1 my-1 info--text">
                {{ item.name }}
              </h4>
              <div
                v-for="(d, index) in item.data"
                :key="d._ID"
                class="radioArea"
              >
                <v-radio :value="d._ID" class="radioSelect" />
                <span
                  v-if="!!(d.user !== 'henrypt')"
                  :id="`modelItem_${idx}_${index}`"
                  class="h6"
                >
                  {{ d._Name }}
                  <v-tooltip bottom :activator="`#modelItem_${idx}_${index}`">
                    创建人：{{ d._UserName }}
                  </v-tooltip>
                </span>
                <span v-else>
                  <v-text-field
                    :id="`modelItem_${idx}_${index}`"
                    v-model="d._Name"
                    dense
                    solo-inverted
                    class="radioText p0 m0"
                    label="模板名称"
                    type="text"
                    append-outer-icon="mdi-window-close"
                    @click:append-outer="remove(item, d)"
                    @change="save()"
                  />
                  <v-tooltip bottom :activator="`#modelItem_${idx}_${index}`">
                    创建人：{{ d._UserName }}
                  </v-tooltip>
                </span>
              </div>
            </div>
          </v-radio-group>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <div v-if="select">
            modelId: {{ select }}
          </div>
          <v-spacer />
          <v-btn color="primary" :disabled="!hasSelect" small @click="browser">
            浏览
          </v-btn>
          <v-btn color="primary" :disabled="!hasSelect" small @click="clear">
            清除
          </v-btn>
          <v-btn text small @click="exit">
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, between } from 'vuelidate/lib/validators'

import { reqModelList, reqModelDataById } from '~/api/index.js'

export default {
  components: {},
  mixins: [validationMixin],
  validations: {
    newModelName: {
      required,
      maxLength: maxLength(20)
    },
    newModelTimeLong: {
      required,
      between: between(0, 9999)
    }
  },
  props: {
    types: {
      type: [Number, String],
      default: 0,
      required: true
    },
    dynamos: {
      type: [Object, Array],
      default: () => {},
      required: true
    }
  },
  data () {
    return {
      title: '模板',
      dialog: false,
      valid: true,
      items: null,
      select: [],

      enabled: false,
      menuNewModel: false,
      toggleModelType: 1,
      newModelName: '', // 模板名称
      newModelTimeLong: 0, // 模板时间长度
      newModelType: 1, // 模板类型ID

      itemsModelTypes: [
        {
          type: 1,
          name: '故障跟踪'
        },
        {
          type: 2,
          name: '日常状态监测'
        }
      ],
      modelData: null,
      modelTypeInfo: [
        {
          id: 0,
          name: '故障跟踪',
          data: []
        },
        {
          id: 1,
          name: '日常状态监测',
          data: []
        }
      ],
      modelList: [
        {
          _ID: '727',
          _Name: '1111',
          _ModelAttr: '0',
          _CreateTime: '2010-10-19 14:48:50',
          _UserName: '夏玉秋',
          _Category: '1',
          _TimeLong: '0'
        },
        {
          _ID: '1106',
          _Name: 'test1',
          _ModelAttr: '0',
          _CreateTime: '2017-12-08 13:29:07',
          _UserName: 'sjb_test',
          _Category: '1',
          _TimeLong: '0'
        },
        {
          _ID: '1116',
          _Name: '33333',
          _ModelAttr: '0',
          _CreateTime: '2018-03-19 16:22:38',
          _UserName: 'lx',
          _Category: '1',
          _TimeLong: '0'
        },
        {
          _ID: '1117',
          _Name: '22222',
          _ModelAttr: '0',
          _CreateTime: '2018-03-19 16:23:44',
          _UserName: 'lx',
          _Category: '1',
          _TimeLong: '0'
        },
        {
          _ID: '1222',
          _Name: 'test01',
          _ModelAttr: '0',
          _CreateTime: '2020-09-11 11:35:54',
          _UserName: 'nd_henry123',
          _Category: '1',
          _TimeLong: '0'
        },

        {
          _ID: '185',
          _Name: '双回路线棒出水温度1',
          _ModelAttr: '1',
          _CreateTime: '2009-12-12 16:04:15',
          _UserName: '夏玉秋',
          _Category: '0',
          _TimeLong: '0'
        },
        {
          _ID: '186',
          _Name: '双回路线棒出水温度2',
          _ModelAttr: '1',
          _CreateTime: '2009-12-12 16:05:02',
          _UserName: '夏玉秋',
          _Category: '0',
          _TimeLong: '0'
        },
        {
          _ID: '187',
          _Name: '双回路线棒出水温度3',
          _ModelAttr: '1',
          _CreateTime: '2009-12-12 16:06:22',
          _UserName: '夏玉秋',
          _Category: '0',
          _TimeLong: '0'
        },
        {
          _ID: '188',
          _Name: '双回路线棒出水温度4',
          _ModelAttr: '1',
          _CreateTime: '2009-12-12 16:06:57',
          _UserName: '夏玉秋',
          _Category: '0',
          _TimeLong: '0'
        },
        {
          _ID: '189',
          _Name: '双回路线棒出水温度5',
          _ModelAttr: '1',
          _CreateTime: '2009-12-12 16:07:25',
          _UserName: '夏玉秋',
          _Category: '0',
          _TimeLong: '0'
        },
        {
          _ID: '190',
          _Name: '双回路线棒出水温度6',
          _ModelAttr: '1',
          _CreateTime: '2009-12-12 16:10:26',
          _UserName: '夏玉秋',
          _Category: '0',
          _TimeLong: '0'
        },
        {
          _ID: '192',
          _Name: '单回路下层线棒出水温度',
          _ModelAttr: '1',
          _CreateTime: '2009-12-12 16:12:28',
          _UserName: '夏玉秋',
          _Category: '0',
          _TimeLong: '0'
        },
        {
          _ID: '193',
          _Name: '单回路上层线棒出水温度',
          _ModelAttr: '1',
          _CreateTime: '2010-02-23 16:26:18',
          _UserName: '夏玉秋',
          _Category: '0',
          _TimeLong: '0'
        },
        {
          _ID: '196',
          _Name: 'L207起机监视',
          _ModelAttr: '1',
          _CreateTime: '2010-01-08 10:47:01',
          _UserName: '刘海河',
          _Category: '0',
          _TimeLong: '0'
        },
        {
          _ID: '197',
          _Name: '转子状态监测',
          _ModelAttr: '1',
          _CreateTime: '2010-01-08 11:30:57',
          _UserName: '刘海河',
          _Category: '0',
          _TimeLong: '0'
        },
        {
          _ID: '198',
          _Name: '铁芯状态监测',
          _ModelAttr: '1',
          _CreateTime: '2010-01-08 11:39:38',
          _UserName: '刘海河',
          _Category: '0',
          _TimeLong: '0'
        }
      ]
    }
  },
  computed: {
    hasSelect () {
      return this.select > 0
    },
    newModelNameErrors () {
      const errors = []
      if (!this.$v.newModelName.$dirty) {
        return errors
      }
      !this.$v.newModelName.maxLength && errors.push('不多于20个字！')
      return errors
    },
    newModelTimeLongErrors () {
      const errors = []
      if (!this.$v.newModelTimeLong.$dirty) {
        return errors
      }
      !this.$v.newModelTimeLong.between && errors.push('数字在0~9999之间！')
      return errors
    }
  },
  mounted () {
    this.GetModelList()

    // 图控件上选择的点的时间信息

    const items =
      [
        {
          type: 1,
          name: '故障跟踪',
          data: [
            {
              modelId: 10,
              name: 'L1GRH086MT跟踪',
              user: '夏玉秋',
              type: {
                id: 1,
                name: '故障跟踪'
              }
            },
            {
              modelId: 11,
              name: '进相试验1',
              user: 'henrypt',
              type: {
                id: 1,
                name: '故障跟踪'
              }
            },
            {
              modelId: 12,
              name: 'L2降功率前',
              user: '宋波',
              type: {
                id: 1,
                name: '故障跟踪'
              }
            },
            {
              modelId: 13,
              name: 'L1GRH086MT',
              user: '林沛',
              type: {
                id: 1,
                name: '故障跟踪'
              }
            },
            {
              modelId: 14,
              name: '转子电流观察',
              user: '夏玉秋',
              type: {
                id: 1,
                name: '故障跟踪'
              }
            },
            {
              modelId: 15,
              name: 'L1GRH086MT跟踪',
              user: '夏玉秋',
              type: {
                id: 1,
                name: '故障跟踪'
              }
            }
          ]
        },
        {
          type: 2,
          name: '日常状态监测',
          data: [
            {
              modelId: 16,
              name: 'U1分支上层水温',
              user: 'henrypt',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 17,
              name: 'U2分支上层水温',
              user: 'aaaa',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 18,
              name: 'V1分支上层水温',
              user: 'bbbb',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 19,
              name: 'V2分支上层水温',
              user: 'cccc',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 20,
              name: '铁芯齿部温度（汽端第1段）',
              user: 'henrypt',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 21,
              name: '铁芯齿部温度（汽端第5段）',
              user: 'dddd1',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 22,
              name: '铁芯齿部温度（励端第90段）',
              user: 'eeee',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 23,
              name: '铁芯齿部温度（励端第94段）',
              user: 'henrypt',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 26,
              name: 'U1分支上层水温',
              user: 'ffff',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 27,
              name: 'U2分支上层水温',
              user: 'hhhh',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 28,
              name: 'V1分支上层水温',
              user: 'g1',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 29,
              name: 'V2分支上层水温',
              user: 'henrypt',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 30,
              name: '铁芯齿部温度（汽端第1段）',
              user: 'ewwww',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 31,
              name: '铁芯齿部温度（汽端第5段）',
              user: 'ttttt',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 32,
              name: '铁芯齿部温度（励端第90段）',
              user: 'uuuuu',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 33,
              name: '铁芯齿部温度（励端第94段）',
              user: 'mmmmm',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 46,
              name: 'U1分支上层水温',
              user: 'qqqq',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 47,
              name: 'U2分支上层水温',
              user: 'pppp',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 48,
              name: 'V1分支上层水温',
              user: 'henrypt',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 49,
              name: 'V2分支上层水温',
              user: 'qaqaqaq',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 50,
              name: '铁芯齿部温度（汽端第1段）',
              user: 'ededed',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 51,
              name: '铁芯齿部温度（汽端第5段）',
              user: 'rfrrfrf',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 52,
              name: '铁芯齿部温度（励端第90段）',
              user: 'tgtgtggt',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 53,
              name: '铁芯齿部温度（励端第94段）',
              user: 'gtgtgt',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 66,
              name: 'U1分支上层水温',
              user: 'hyhyhy',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 67,
              name: 'U2分支上层水温',
              user: 'jhu7juj',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 68,
              name: 'V1分支上层水温',
              user: 'uujj',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 69,
              name: 'V2分支上层水温',
              user: 'uuiii',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 70,
              name: '铁芯齿部温度（汽端第1段）',
              user: 'ikik',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 71,
              name: '铁芯齿部温度（汽端第5段）',
              user: 'ddfe',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 72,
              name: '铁芯齿部温度（励端第90段）',
              user: 'cxvcvxxcv',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            },
            {
              modelId: 73,
              name: '铁芯齿部温度（励端第94段）',
              user: 'vcvx',
              type: {
                id: 1,
                name: '日常状态监测'
              }
            }
          ]
        }
      ] || null

    this.modelData = [
      {
        id: 10,
        typeId: 1,
        selectedDynamos: [19],
        jiangCeLiangSelectValue: [10],
        linesData: this.getNewLines(1, 19),
        gongKuangBiaoZhu: [],

        modelId: 1178,
        modelType: 3,
        modelName: 'N1-test-henry',
        swMarks: 0,
        swLegend: 1,
        swTitle: 1,
        converted: 0,
        modelCategory: 1,
        timeLong: 1,
        leftAxis: {
          hBound: 10,
          lBound: 0,
          increm: 0,
          value: 1
        },
        rightAxis: {
          hBound: 100,
          lBound: 0,
          increm: 0,
          value: 0
        },
        bottomAxis: {
          hBound: 100,
          lBound: 0,
          increm: 0,
          value: 2
        },
        lines: [
          {
            index: 0,
            color: 255,
            type: 0,
            width: 2,
            refAxis: 1,
            labeiId: 1013,
            swPoint: 0,
            pointWidth: 2,
            pointHeight: 2,
            swMark: 1,
            swValue: 0,
            markWidth: 1,
            markHeight: 8,
            dynamo: 19,
            labelTime: '',
            descr: '最近稳定点ZZZ当前最近一个稳定点',
            lAdjust: 0,
            reserved: 1,
            value: 1001
          }
        ]
      },
      {
        id: 11,
        typeId: 1,
        selectedDynamos: [20],
        timeLong: 50, // 天
        jiangCeLiangSelectValue: [10, 11],
        lines: this.getNewLines(2)
      },
      {
        id: 12,
        typeId: 1,
        selectedDynamos: [20],
        timeLong: 50, // 天
        jiangCeLiangSelectValue: [10, 11, 12],
        lines: this.getNewLines(3)
      },
      {
        id: 13,
        typeId: 1,
        selectedDynamos: [20],
        timeLong: 50, // 天
        jiangCeLiangSelectValue: [10, 11, 12, 13],
        lines: this.getNewLines(4)
      },
      {
        id: 14,
        typeId: 1,
        selectedDynamos: [20],
        timeLong: 50, // 天
        jiangCeLiangSelectValue: [10, 11, 12, 13, 14],
        lines: this.getNewLines(5)
      },
      {
        id: 15,
        typeId: 1,
        selectedDynamos: [20],
        timeLong: 50, // 天
        jiangCeLiangSelectValue: [10, 11, 12, 13, 14, 20],
        lines: this.getNewLines(6)
      },
      {
        id: 16,
        typeId: 1,
        selectedDynamos: [20],
        timeLong: 50, // 天
        jiangCeLiangSelectValue: [20],
        lines: this.getNewLines(1)
      },
      {
        id: 17,
        typeId: 1,
        selectedDynamos: [20],
        timeLong: 50, // 天
        jiangCeLiangSelectValue: [20, 21],
        lines: this.getNewLines(2)
      },
      {
        id: 18,
        typeId: 1,
        selectedDynamos: [20],
        timeLong: 50, // 天
        jiangCeLiangSelectValue: [20, 21, 22],
        lines: this.getNewLines(3)
      },
      {
        id: 19,
        typeId: 1,
        selectedDynamos: [20],
        timeLong: 50, // 天
        jiangCeLiangSelectValue: [20, 21, 22, 30],
        lines: this.getNewLines(4)
      },
      {
        id: 20,
        typeId: 1,
        selectedDynamos: [20],
        timeLong: 50, // 天
        jiangCeLiangSelectValue: [30, 31, 32, 33, 34],
        lines: this.getNewLines(5)
      },
      {
        id: 21,
        typeId: 1,
        selectedDynamos: [20],
        timeLong: 50, // 天
        jiangCeLiangSelectValue: [30, 31, 32, 33, 34, 35],
        lines: this.getNewLines(6)
      },
      {
        id: 22,
        typeId: 1,
        selectedDynamos: [20],
        timeLong: 50, // 天
        jiangCeLiangSelectValue: [40, 41, 42, 43, 44, 45, 50],
        lines: this.getNewLines(7)
      },
      {
        id: 23,
        typeId: 1,
        selectedDynamos: [20],
        timeLong: 50, // 天
        jiangCeLiangSelectValue: [40, 41, 42, 43, 44, 45, 50, 51],
        lines: this.getNewLines(8)
      }
    ]

    if (items) {
      this.items = items // items.map(item=>item.name+' ['+item.value+']')
    }
  },
  methods: {
    // 获取模板列表
    async GetModelList () {
      const self = this
      const modelListData = await reqModelList(this.types)
      if (modelListData) {
        if (modelListData.ModelInfo && modelListData.ModelInfo.Model) {
          self.modelTypeInfo.forEach((mt) => {
            modelListData.ModelInfo.Model.forEach((model) => {
              if (model._ModelAttr === String(mt.id)) {
                mt.data.push(model)
              }
            })
          })
        }
      } else {
        // 离线数据
        self.modelTypeInfo.forEach((mt) => {
          self.modelList.forEach((model) => {
            if (model._ModelAttr === String(mt.id)) {
              mt.data.push(model)
            }
          })
        })
      }
    },

    open () {
      this.dialog = true
      this.closeOthers()
    },
    exit () {
      this.dialog = false
    },
    submit () {
      // this.exit()
      this.$parent.$parent.$parent.$parent.$refs.Tips &&
        this.$parent.$parent.$parent.$parent.$refs.Tips.open('新建成功', 1000)
    },
    save () {
      // this.exit()
      this.$parent.$parent.$parent.$parent.$refs.Tips &&
        this.$parent.$parent.$parent.$parent.$refs.Tips.open('保存成功', 1000)
    },
    remove (item, d) {
      const modelId = d.modelId
      const type = item.type
      if (confirm('您确定删除此项吗?')) {
        const arr = this.items.find(item => item.type === type)
        arr.data.splice(
          arr.data.findIndex(item => item.modelId === modelId),
          1
        )
      }
    },
    clear () {
      this.select = []
    },
    submit_newmodel () {
      const self = this
      self.$v.$touch()

      if (!self.$v.$error) {
        const arr = self.items.find(item => item.type === self.newModelType)

        arr.data.push({
          modelId: arr.data.length + 1,
          name: self.newModelName,
          user: 'henry',
          type: {
            id: self.items.length + 1,
            name: arr.name
          }
        })

        self.newModelName = ''
        self.newModelTimeLong = 0
        self.newModelType = 1

        self.$parent.$parent.$parent.$parent.$refs.Tips.open('新建成功', 1000)
        self.menuNewModel = false
      }
      // this.$parent.$parent.$parent.$parent.$refs.Tips.open('新建成功',1000)
    },
    async browser () {
      const modelId = this.select
      if (modelId) {
        const self = this
        let data = null
        this.modelTypeInfo.forEach((mt) => {
          if (!!mt.data && mt.data.length > 0) {
            data = mt.data.find(d => d._ID === modelId)
            return false
          }
        })

        // const data self.modelData.find((item) => item.id === modelId)
        if (self.dynamos && data) {
          if (data._TimeLong) {
            // this.$moment.moment().add(-1*data.timeLong,'d').format('YYYY-MM-DD hh:mm:ss')
            const d = this.$moment
              .moment()
              .add(-1 * data._TimeLong, 'd')
              .format('YYYY-MM-DD')

            const t = this.$moment
              .moment()
              .add(-1 * data._TimeLong, 'd')
              .format('hh:mm:ss')

            // 根据模板ID, 获取模板数据
            const modelData = (await reqModelDataById(modelId)) || null
            if (modelData) {
              let tsitm = null

              const selectType =
                self.$parent.$parent.$parent.$parent.$refs.steppers.selectType
              if (selectType === 'single' || selectType === 'multiple') {
                const lineIDs = modelData.DrawModel.Lines.Line.map(line =>
                  parseInt(line.__text, 10)
                )

                const data = await self.$parent.$parent.$parent.$parent.$refs.steppers.$refs.stations.GetTsitmes(
                  {
                    id: self.dynamos.id || -1,
                    name: self.dynamos.name,
                    dynamoType: self.dynamos.dynamoType,
                    children: []
                  }
                )

                tsitm = data.filter((d) => {
                  return lineIDs.includes(parseInt(d.tsitmId, 10))
                })

                if (!tsitm || tsitm.length < 1) {
                  this.$parent.$parent.$parent.$parent.$refs.Tips &&
                    this.$parent.$parent.$parent.$parent.$refs.Tips.open(
                      '数据查询不到！',
                      2500
                    )
                } else {
                  if (selectType === 'single') {
                    debugger
                    self.$parent.$parent.$parent.$parent.$refs.steppers.$refs.stations.danTaiData[0].tsitm = tsitm
                  }

                  window.console.log(
                    self.$parent.$parent.$parent.$parent.$refs.steppers.$refs
                      .stations.danTaiData[0]
                  )

                  self.$parent.$parent.$parent.$parent.$refs.steppers.syncStepperSelections(
                    {
                      dynamos: data._Dynamo ? data._Dynamo : [self.dynamos],
                      d,
                      t,
                      jianCeLiang: data,
                      tsitm,
                      dynamoType: self.dynamos.dynamoType
                    },
                    null,
                    true
                  )
                  self.clear()

                  // 关闭模板对话框
                  this.exit()
                }
              }

              // this.GetTsitmes(item)
              // self.$parent.$parent.$parent.$parent.$refs.steppers.$refs.stations.data
            }
          }
        }
      }
    },
    getNewLines (count) {
      if (count) {
        const self = this
        const genRandom = (min, max) =>
          ((Math.random() * (max - min + 1)) | 0) + min
        const arrLines = []
        let values = null
        let values1 = null
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

        for (let i = 0; i < count; i++) {
          // 生成随机数
          values = []
          values1 = []
          for (let a = 0, aLen = arr.length; a < aLen; a++) {
            values.push(genRandom(0, 20))
          }
          for (let b = 0, bLen = arr.length; b < bLen; b++) {
            values1.push(genRandom(10, 30))
          }

          // 添加新的线
          arrLines.push({
            id: i + 10 + self.$moment.timeStamp(),
            name: '线0-M' + i,
            legend: '线0-M' + i,
            title: '',
            yAxis0Name: null,
            yAxis1Name: null,
            nodes: null,
            names: [...arr].map((i) => {
              return self.$moment.add(i)
            }),
            index: [...arr],
            value: [...values],
            convert: [...values1],
            lineAttr: null,
            selected: true
          })
        }

        return arrLines
      }
      return null
    },
    // 关闭其他打开的对话框
    closeOthers () {
      const $refs = this.$parent.$parent.$parent.$parent.$refs
      if ($refs) {
        $refs.GongKuangBiaoZhu && $refs.GongKuangBiaoZhu.exit()
        $refs.YiChangShuJu && $refs.YiChangShuJu.exit()
        $refs.ZhuangTaiBiJiao && $refs.ZhuangTaiBiJiao.exit()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card__actions{
  justify-content: flex-end !important;
}
.radioArea{
  display: block;
  width: 100%;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px !important;
  font-weight: normal;
  .radioSelect{
    display: inline-block;
    width: 24px;
    margin-right:5px;
  }
  .radioText{
    display: inline-block;
    width: auto !important;
    max-width: 350px !important;
    height: 20px !important;
    line-height: 20px !important;
    font-size: 14px !important;
    >>>.v-input__control{
      float: left;
      width: 250px;
    }
  }
}

>>>.v-btn--top{
  top: 38px !important;
}

#formNewModel{
  >>>label, input, div{
    font-size: 14px !important;
  }
}
</style>
