<!-- page info:  -->
<template>
  <div>
    <v-card class="page overflow-hidden">
      <v-data-table
        :headers="headers"
        :items="items || []"
        :items-per-page="perPage"
        :loading="loading"
        item-key="items.userNm"
        class="elevation-1"
        loading-text="加载中... 请稍等"
        no-data-text="无数据！"
      >
        <template #[`item.actions`]="{ item }">
          <v-icon color="accent" small :title="`${item.actions}-${item.userID}`" @click="forceLogout(item)">
            mdi-account-minus-outline
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <Tips ref="Tips" />
  </div>
</template>

<script>
import { reqOnlineUsers, reqLogoutKickOffline } from '@/api/index.js'
import Tips from '@/components/common/Tips/'

export default {
  components: { Tips },
  data () {
    return {
      title: '在线用户列表',
      loading: true,
      perPage: 20,
      // time: new Date().toLocaleTimeString('chinese', { hour12: false }),
      menuDate: false,
      headers: [
        { text: '用户编码', value: 'userNm' },
        { text: '登录机组', value: 'dynamos' },
        { text: '操作', value: 'actions' }
      ],
      items: [],
      selectedLogType: null // 当前选择的TAB对应的type类型(string)
    }
  },
  computed: {},
  created () {
    const self = this

    // 初始化 items
    self.initContentData()
  },
  mounted () {

  },
  methods: {
    async initContentData () {
      const self = this
      self.items = []
      self.loading = true

      const r = await reqOnlineUsers()
      if (r) {
        const arrItems = []

        const users = r?.UserList?.User?.length > 0 ? r.UserList.User : [r.UserList.User]
        window.console.log('r.UserList.User.forEach = ', r.UserList.User, users)
        users.forEach((user) => {
          /*
          user{
            Dynamo: "0"
            ExistFlag: "1"
            RefreshTime: "2021-08-30 14:01:55"
            RemoteAddr: "192.168.0.208"
            UserID: "dyw_henryBJVAGRHTFUOTK0.23159838026491586"
            repaircommit: "0"
            runcommit: "0"
          }
          */
          window.console.log('user = ', user)
          arrItems.push({
            userID: user?.UserID,
            userNm: user?.UserID && user?.UserID.indexOf('BJVAG') > 0 ? user?.UserID.substring(0, user?.UserID.indexOf('BJVAG')) : '',
            dynamos: user?.Dynamo === '0' ? '多机组' : user?.Dynamo,
            actions: '强制下线'
          })
        })

        self.items = arrItems?.length > 0 ? arrItems : []
        self.loading = false
      } else {
        self.loading = false
      }
    },
    async forceLogout (user) {
      const self = this
      const params = {
        userID: user.userID
      }

      const r = await reqLogoutKickOffline(params)
      if (r.code === 200) {
        self.initContentData()
        self.$refs.Tips.open('操作成功', 1500, 'success')
      } else {
        self.$refs.Tips.open('操作失败！', 1500, 'error')
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
