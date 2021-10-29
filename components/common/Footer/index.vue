<template>
  <v-footer app absolute color="secondary--text info" class="transparentBg01">
    <div class="text-center" style="width:100%">
      <v-icon medium class="mdi mdi-help-circle" color="warning" />
      <b class="subtitle-1">常见问题</b>
      <b class="pl-2">
        <v-icon class="mdi mdi-copyright" color="secondary" />
        {{ new Date().getFullYear() }} —
        <strong v-if="system && system.info" v-text="system.info.sname" />
      </b>
    </div>
  </v-footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      system: state => state.system
    })
  }
}
</script>

<style scoped>
.transparentBg01 {
  /* background-color: rgba(0, 0, 0, 0.01); */
  opacity: 0.5;
  filter: alpha(opacity=50);
}
</style>
