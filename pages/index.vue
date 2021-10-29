<template>
  <!-- <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      Page Contents
    </v-flex>
  </v-layout> -->
  <v-layout id="henryLayout" column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-row class="fill-height">
        <v-col>
          <div class="text-center justify-center">
            <Loading />
          </div>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import Loading from '@/components/common/Loading'
export default {
  components: { Loading },
  async asyncData ({ redirect, $axios }) {
    // redirect('/ztjc/ztzs')
  },
  fetch ({ app, store, req }) {
    // await store.dispatch('system/GetSystemInfo')
    // const result = await getTokenByRedis()
    // if (result.code === 200) {
    //   store.commit('setToken', result.Authorization)
    // }
  },
  watch: {
    $route (to, from) {
      // this.$router.go(0)
    }
  },
  created () {
  },
  mounted () {

  },
  methods: {

  }
}
</script>
