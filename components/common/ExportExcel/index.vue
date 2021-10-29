<template>
  <v-tooltip left>
    <template #activator="{ on }">
      <v-btn
        fab
        dark
        small
        color="indigo"
        v-on="on"
        @click="exportExcel"
      >
        <v-icon normal>
          mdi-microsoft-excel
        </v-icon>
      </v-btn>
    </template>
    <span class="hidden-sm-and-down">导出</span>
  </v-tooltip>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  components: {},
  props: {
    tid: {
      type: String,
      default: 'Table'
    },
    name: {
      type: String,
      default: 'Table'
    }
  },
  data () {
    return {}
  },
  methods: {
    // 导出Excel表格
    exportExcel () {
      const xlsxParam = { raw: true }
      const wb = XLSX.utils.table_to_book(
        document.querySelector('#' + this.tid),
        xlsxParam
      )

      const wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })

      try {
        FileSaver.saveAs(
          new Blob([wbout], {
            type: 'application/octet-stream'
          }),
          this.name + '.xlsx'
        )
      } catch (e) {
        window.console && window.console.log(e, wbout)
      }

      return wbout
    }
  }
}
</script>
