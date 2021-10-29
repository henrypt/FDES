<template>
  <v-container>
    <v-row v-if="roles.length>0" justify="center">
      <v-col
        v-for="(item, idx) in roles"
        :key="idx"
        cols="12"
        sm="6"
        md="2"
      >
        <v-card class="mx-auto" max-width="280" dense nuxt>
          <v-toolbar
            dense
            flat
            dark
            short
            height="32"
            color="warning lighten-4"
          >
            <!-- <v-btn icon small color="warning"><v-icon>mdi-close</v-icon></v-btn> -->
            <v-toolbar-title class="subtitle-2 primary--text">
              {{ item.Descr }}
            </v-toolbar-title>
          </v-toolbar>
          <div
            v-for="item2 in item.powers"
            :key="item2.header"
            class="px-1 pt-2 pb-0 caption"
          >
            <h3 class="blue-grey--text">
              {{ item2.header }}
            </h3>
            <v-switch
              v-for="(p, i) in item2.power"
              :key="p.key"
              v-model="p.can"
              class="secondary px-0 py-0 my-0"
              @change="updateRoleCan(item, item2, p, i)"
            >
              <template #label>
                <label class="subtitle-2" :title="p.key">{{ p.name }}</label>
              </template>
            </v-switch>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <Tips ref="Tips" :centered="true" />
    <Tips
      ref="EnterTips"
      txt="需重新登录用户，修改的信息才会生效！"
      :close="false"
      :show="true"
      :centered="true"
      ctype="warning"
    />
  </v-container>
</template>

<script type="text/ecmascript-6">
import Tips from '@/components/common/Tips/index.vue'

export default {
  components: { Tips },
  data () {
    return {
      title: '角色管理',
      isShow: true,
      roles: [],
      roleTemplate: {
        Descr: '游客',
        Text: '游客',
        id: -1,
        powers: [
          {
            header: '状态监测', // self.roleNames['StatusView'] => '状态监测',
            power: [
              {
                name: '状态监测',
                key: 'StatusView',
                can: 0
              }
            ]
          },
          {
            header: '趋势分析',
            power: [
              {
                name: '趋势分析',
                key: 'CurvesView',
                can: 0
              }
            ]
          },
          {
            header: '故障诊断',
            power: [
              {
                name: '浏览报警',
                key: 'AlarmView',
                can: 0
              },
              {
                name: '浏览查询录入、故障诊断',
                key: 'FaultProcV',
                can: 0
              },
              {
                name: '运行中处理故障、人工提交先兆、提交录入数据',
                key: 'CanRun',
                can: 0
              },
              {
                name: '检修处理故障、人工提交先兆、提交录入数据',
                key: 'CanRepair',
                can: 0
              },
              {
                name: '测点异常处理',
                key: 'DoPointE',
                can: 0
              }
            ]
          },
          {
            header: '统计分析',
            power: [
              {
                name: '统计分析',
                key: 'StatView',
                can: 0
              }
            ]
          },
          {
            header: '数据处理',
            power: [
              {
                name: '查询',
                key: 'BaseDataView',
                can: 0
              },
              {
                name: '设置',
                key: 'CanUpdate',
                can: 0
              },
              {
                name: '报表',
                key: 'ReportView',
                can: 0
              }
            ]
          },
          {
            header: '系统设置',
            power: [
              {
                name: '系统设置',
                key: 'CanMngSys',
                can: 0
              }
            ]
          },
          {
            header: '维修管理',
            power: [
              {
                name: '维修管理',
                key: 'CanOverhaul',
                can: 0
              }
            ]
          }
        ]
      }
      // roleNames: {
      //   StatusView: '状态监测',
      //   CurvesView: '趋势分析',
      //   AlarmView: '浏览报警',
      //   FaultProcV: '浏览查询录入、故障诊断',
      //   CanRun: '运行中处理故障、人工提交先兆、提交录入数据',
      //   CanRepair: '检修处理故障、人工提交先兆、提交录入数据',
      //   DoPointE: '测点异常处理',
      //   StatView: '统计分析',
      //   BaseDataView: '查询',
      //   CanUpdate: '设置',
      //   ReportView: '报表',
      //   CanMngSys: '系统设置',
      //   CanOverhaul: '维修管理'
      // }
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '新角色' : '编辑内容'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    this.initialize()
  },
  mounted () {},
  methods: {
    initialize () {
      const self = this
      const sessionKey = self.$store.state.system.info.sname
      const currentRoles = JSON.parse(window.sessionStorage.getItem(sessionKey))?.system?.info?.roles

      currentRoles.forEach((role) => {
        if (role.Descr !== '游客') {
          const _templdate = JSON.parse(JSON.stringify(self.roleTemplate)) // = self.roleTemplate
          // Object.assign(_templdate, self.roleTemplate)
          _templdate.Descr = role.Descr
          _templdate.Text = role.Text
          _templdate.id = role.PopedomId

          _templdate.powers.forEach((itm) => {
            itm.power.forEach((p) => {
              p.can = role[p.key] === '1'
            })
          })

          self.roles.push(_templdate)
        }
      })

      self.loading = !!self.roles
    },
    async updateRoleCan (item, item2, p, index) {
      window.console.log(this.roles)
      // (this.roles, item, item2, p, index)
      const self = this
      const params = {
        popedomId: -1,
        xml: ''
      }

      self.roles.forEach((role) => {
        if (role.id === item.id) {
          params.popedomId = item.id
          params.xml += `<Data><Descr>${encodeURIComponent(item.Descr)}</Descr>`
          item?.powers.forEach((p) => {
            p.power.forEach((itm) => {
              const { key, can } = itm
              const _can = can ? 1 : 0
              params.xml += '<' + key + '>' + _can + '</' + key + '>' // `<${key}>${_can}</${key}>`
            })
          })
          params.xml += '</Data>'
        }
      })
      /*
        <Data>
          <Descr>%E6%99%AE%E9%80%9A%E7%94%A8%E6%88%B7</Descr>
          <StatusView>0</StatusView><CurvesView>1</CurvesView><AlarmView>1</AlarmView><FaultProcV>0</FaultProcV><CanRun>0</CanRun>
          <CanRepair>0</CanRepair><DoPointE>0</DoPointE><StatView>1</StatView><BaseDataView>1</BaseDataView><CanUpdate>0</CanUpdate>
          <ReportView>0</ReportView><CanMngSys>0</CanMngSys><CanOverhaul>0</CanOverhaul>
        </Data>
      */
      const r = await self.$store.dispatch('roles/UpdateRolesInfo', { info: self.roles, params })
      self.$refs.Tips.UpdateTips(r?.code === 200 ? 1 : 0)
      self.$refs.EnterTips.closeTip()
      // self.roles = JSON.parse(JSON.stringify(self.$store.state.roles.info))
    }
  }
}
</script>

<style lang="scss" scoped></style>
