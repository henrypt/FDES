<template>
  <div>
    <v-select
      v-model="select"
      :items="languages"
      item-text="name"
      item-value="value"
      append-icon="fdesfont fdes-logistic"
      color="orange darken-2"
      hide-details
      dense
      return-object
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Language',
  data () {
    return {
      select: null
    }
  },
  watch: {
    select (val) {
      if (val) {
        // 更新项目语言
        this.$i18n.locale = val.value
        window.localStorage.setItem(
          this.$store.state.i18n.info.localStorageName,
          val.value
        )
      }
    }
  },
  mounted () {
    this.select = this.$store.state.i18n.info.languages.find((obj) => {
      return obj.value === this.$store.state.i18n.locale
    })
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapState({
      languages: state => state.i18n.info.languages
    })
  }
}
</script>

<style lang="scss" scoped></style>
