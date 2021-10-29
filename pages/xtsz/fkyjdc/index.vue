<!-- page info:  -->
<template>
  <v-container>
    <v-row justify="space-around">
      <v-card
        class="mx-auto mx-12 my-12 pa-5"
      >
        <v-card-title>{{ title }}</v-card-title>
        <v-divider class="mx-4" />
        <v-card-text class="text-justify">
          <v-row
            justify="space-around"
          >
            <v-btn
              elevation="2"
              fab
              color="primary"
              @click="hExportFeedback()"
            >
              <v-icon light>
                mdi-microsoft-excel
              </v-icon>
            </v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { exportFeedback } from '@/api/index.js'

// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'

export default {
  components: { },
  data () {
    return {
      title: '反馈意见导出 ',
      loading: true,
      perPage: 9999,
      // time: new Date().toLocaleTimeString('chinese', { hour12: false }),
      menuDate: false,
      headers: [
        { text: '用户编码', value: 'userNm' },
        { text: '登录机组', value: 'dynamos' },
        { text: '操作', value: 'actions' }
      ],
      items: null,
      selectedLogType: null // 当前选择的TAB对应的type类型(string)
    }
  },
  computed: {},
  methods: {
    async hExportFeedback () {
      const r = await exportFeedback()
      if (r?.code === 200) {
        window.location.href = r?.data
      }

      // 注：下面的方法感觉没有成功导出EXCEL，因为现在没有数据可以测试，所以需要在后期有数据时再进一步修改
      // 参考插件：import FileSaver from 'file-saver'  import XLSX from 'xlsx'

      // const r = await exportFeedback()
      // if (r?.code === 200) {
      //   window.console.log(r?.data)
      //   const blob = new Blob([r?.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      //   const objectUrl = URL.createObjectURL(blob)
      //   const a = document.createElement('a')
      //   document.body.appendChild(a)
      //   a.style = 'display:none'
      //   a.href = objectUrl
      //   a.download = this.title + '[' + new Date().toLocaleDateString() + ']'
      //   a.click()
      //   document.body.removeChild(a)
      // }
    }
  }
}
</script>

<style lang="scss" scoped></style>
