<template>
  <div>
    <v-data-table
      v-if="users"
      v-show="isShowPage"
      :headers="headers"
      :items="users"
      :loading="loading"
      :items-per-page="perPage"
      loading-text="加载中..."
      class="elevation-1"
      hide-default-header
      hide-default-footer
      dense
    >
      <template #top>
        <v-toolbar flat color="white">
          <v-toolbar-title>
            <v-icon color="success">
              mdi-human-handsup
            </v-icon>用户管理
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical />
          <Tips
            ref="EnterTips"
            txt="需重新登录用户，修改的信息才会生效！"
            :close="false"
            :show="true"
            :centered="true"
            ctype="warning"
          />
          <v-spacer />

          <v-dialog v-model="dialog" max-width="800px">
            <template #activator="{ on }">
              <v-btn color="blue" size="20" dark class="mb-2" v-on="on">
                新用户
              </v-btn>
            </template>
            <v-form ref="addNewUserForm">
              <v-card>
                <v-card-title>
                  <span class="headline subtitle-1">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="1" sm="6" md="4" class="px-0 py-0">
                        <v-text-field
                          v-model="addName"
                          :error-messages="nameErrors"
                          required
                          autofocus
                          clearable
                          label="用户名 *"
                          @input="$v.addName.$touch()"
                          @blur="$v.addName.$touch()"
                          @keyup.enter.native="save"
                        />
                      </v-col>
                      <v-col cols="10" sm="6" md="4">
                        <Dys
                          v-model="addDynamos"
                          :userid="-1"
                          :user="null"
                          :loading="loading"
                          @save="save"
                        />
                      </v-col>
                      <v-col cols="1" sm="6" md="4">
                        <Roles
                          v-model="addRoles"
                          :userid="-1"
                          :user="null"
                          :loading="loading"
                          @save="save"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                  <big class="red--text ml-3">
                    * 为必填项
                  </big>
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <v-btn color="blue darken-1" text small @click="close">
                    取消
                  </v-btn>
                  <v-btn color="white darken-1" class="primary" text small @click="save">
                    确定
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
        </v-toolbar>
      </template>

      <template #[`item.name`]="{ item }" :class="item.dynamos.length<1 ? 'no-data': ''">
        <v-text-field
          v-model="item.Usernm"
          :class="item.dynamos.length<1 ? 'no-power': ''"
          label="用户名 (只读)"
          placeholder="请输入用户名"
          readonly
        />
      </template>

      <template #[`item.dynamos`]="{ item }" :class="item.dynamos.length<1 ? 'no-data': ''">
        <Dys
          v-if="item.dynamos.length>0"
          v-model="item.dynamos"
          :userid="item.Userid"
          :user="item"
          :loading="loading"
          @UpdateTips="UpdateTips"
        />
        <v-chip
          v-else
          class="ma-2"
          color="red"
          text-color="white"
        >
          无权限
        </v-chip>
      </template>
      <template #[`item.roles`]="{ item }" :class="item.dynamos.length<1 ? 'no-data': ''">
        <Roles
          v-if="item.dynamos.length>0"
          v-model="item.roles"
          :userid="item.Userid"
          :user="item"
          :loading="loading"
          @UpdateTips="UpdateTips"
        />
      </template>
      <template #[`item.actions`]="{ item }" :class="item.dynamos.length<1 ? 'no-data': ''">
        <!-- <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pen
        </v-icon> -->
        <v-icon
          v-if="item.dynamos.length>0"
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">重置</v-btn>
      </template> -->
    </v-data-table>

    <Tips ref="Tips" />
  </div>
</template>

<script type="text/ecmascript-6">
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import Dys from '@/components/common/DYS/index.vue'
import Roles from '@/components/common/Roles/index.vue'
import Tips from '@/components/common/Tips/'

import { reqUsers, encrypt } from '@/api/index.js'

export default {
  components: {
    Dys,
    Roles,
    Tips
  },
  mixins: [validationMixin],
  validations: {
    addName: { required, maxLength: maxLength(20) },
    addDynamos: { required },
    addRoles: { required }
  },
  data () {
    return {
      title: '用户管理',
      perPage: 9999,
      dialog: false,
      loading: true,
      loadClock: null,
      isShowPage: false,
      headers: [
        { text: '名称', value: 'name', sortable: false, align: 'start' },
        { text: '机组', value: 'dynamos', sortable: false },
        { text: '角色', value: 'roles' },
        { text: '操作', value: 'actions', sortable: false }
      ],
      users: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        dynamos: [],
        roles: []
      },
      valid: null,
      addName: '',
      addDynamos: [],
      addRoles: [],
      arr: []
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '新用户' : '编辑内容'
    },
    nameErrors () {
      const errors = []

      if (!this.$v.addName.$dirty) { return errors }
      !this.$v.addName.maxLength && errors.push('用户名最多20个字长度')
      !this.$v.addName.required && errors.push('请填写用户名.')
      return errors
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  mounted () {
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      const self = this
      self.users = []
      self.isShowPage = false
      const r = await reqUsers()
      // res?.data?.list
      self.users = (r.code === 200) ? r?.data?.Record : null

      // item.dynamos roles
      const stationInfo = self.$store.getters['system/getStationInfo']()
      const dynamoTypes = stationInfo?.types?.ids

      self.users.forEach((item) => {
        if (!item.dynamos) { item.dynamos = [] }
        if (!item.roles) { item.roles = [] }
        // if (item.Usernm === 'ay_henry') {
        //   debugger
        // }
        if (item.Dynamos && item.Dynamos.length > 0) {
          item.Dynamos.forEach((d) => {
            if (dynamoTypes.includes(parseInt(d?.DynamoType, 10))) {
              item.dynamos.push({
                id: parseInt(d.PopedomID, 10),
                dynamoId: parseInt(d.DynamoID),
                descr: d.PopedomDesc
              })
            }
          })
          item.roles = item.dynamos
        } else if (dynamoTypes.includes(parseInt(item?.Dynamos?.DynamoType, 10))) {
          item.dynamos = [
            {
              id: parseInt(item.Dynamos.PopedomID, 10),
              dynamoId: parseInt(item.Dynamos.DynamoID, 10),
              descr: item.Dynamos.PopedomDesc
            }
          ]
          item.roles = item.dynamos
        }
      })

      self.loadClock && window.clearTimeout(self.loadClock)
      self.loadClock = window.setTimeout(() => {
        self.ClearInvalidUser()
        self.loading = false
        self.isShowPage = true
      }, 1000)

      /*
      Descr: "",
      Dynamos: [{
        DynamoDesc: "19号发电机",
        DynamoID: "19",
        DynamoType: "100",
        PopedomDesc: "游客",
        PopedomID: "1",
        _ID: "19"
      }],
      Userid: "111",
      Usernm: "111"
      */

      // setTimeout(() => {
      //   self.loading = false
      // }, 1.0 * 1000)
    },
    async deleteItem (item) {
      const self = this
      const index = self.users.indexOf(item)
      let current = null
      if (confirm('您确定删除此用户吗?')) {
        // self.users.splice(index, 1)
        current = self.users[index]

        if (current?.Userid) {
          const r = await self.$store.dispatch(
            'users/UpdateUsersInfo',
            {
              key: 'users/delete',
              info: { Userid: current.Userid }
            }
          )

          // self.showLogin = false
          // self.tips.show = true
          // self.tips.time = 1500
          // self.tips.txt = '删除成功'
          self.UpdateTips(r?.code === 200 ? 1 : 0)
        }
      }
    },
    close () {
      const self = this
      this.dialog = false
      setTimeout(() => {
        self.addName = ''
        self.addDynamos = []
        self.addRoles = []
        self.editedIndex = -1
      }, 300)
    },
    async save () {
      const self = this
      if (self.editedIndex > -1) {
        // Object.assign(this.users[this.editedIndex], this.editedItem)
      } else {
        let newUser = null
        self.$v.$touch()
        if (!self.$v.$error) {
          newUser = {
            id: self.addName + 'BJVAGRHTFUOTK' + Math.random(),
            name: self.addName,
            pwd: encrypt(self.$store?.state?.system?.info?.user?.pwd),
            dynamos: self.addDynamos,
            popedomId: self.$store?.state?.roles?.info.find(itm => itm?.Descr === self.addRoles).PopedomId
          }
        }

        if (self.addName && self.addName !== '' && self.addDynamos && self.addDynamos.length > 0 && self.addRoles) {
          if (newUser) {
            const r = await self.$store.dispatch(
              'users/UpdateUsersInfo',
              {
                key: 'users/add',
                info: {
                  Userid: newUser.id,
                  Usernm: newUser.name,
                  popedomId: newUser.popedomId,
                  pwd: newUser.pwd,
                  dynamoPopedom: newUser.dynamos
                }
              }
            )

            self.UpdateTips(r?.code === 200 ? 1 : 0)

            // self.showLogin = false
            // self.tips.show = true
            // self.tips.time = 1500
            // self.tips.txt = '添加成功'

            self.close()
          }
        }
      }
    },
    UpdateTips (state) {
      this.$refs.EnterTips.closeTip()
      switch (parseInt(state, 10)) {
        case 0:
          this.$refs.Tips.open('操作失败！', 1500, 'error')
          break
        case 1:
          this.loading = true
          this.initialize()
          this.$refs.Tips.open('操作成功', 1500, 'success')
          break
      }
    },

    ClearInvalidUser () {
      const trs = document.querySelectorAll('.red') || []
      for (let i = 0, iLen = trs.length; i < iLen; i++) {
        try {
          trs[i]?.parentNode?.parentNode?.remove()
        } catch (err) {
          break
        }
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.no-power {
  background-color: #eee;
}
</style>
