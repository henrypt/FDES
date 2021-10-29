<template>
  <v-app id="app">
    <div />
    <NuxtLink to="/">
      返回
    </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '无此页面！（404）',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError

    return {
      title
    }
  }
}
</script>

<style scoped>
#app div {
  background-image: url(/img/404.gif);
  background-repeat: no-repeat;
  background-position: center;
  background-position-y: 50px;
  width: 100%;
  max-width: 1800px;
  height: auto;
  max-height: 700px;
  background-color: #ffffff;
  text-align: center;
  vertical-align: middle;
  margin: 0 auto;
}

#app a {
  font-size: 30px;
}
</style>
