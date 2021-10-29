<template>
  <v-layout align-center justify-center row fill-height>
    <v-dialog
      v-if="data"
      v-model="dialog"
      width="400"
      scrollable
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closeDialog()">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text
          class="title font-weight-black mt-5 mb-5"
          v-text="data.question_contents"
        />

        <v-card-actions class="pb-3 pr-2">
          <v-btn
            normal
            round
            color="success"
            @click="confirm()"
            v-text="data.action_logout"
          />

          <v-btn
            normal
            round
            color="secondary"
            dark
            @click="closeDialog()"
            v-text="data.action_cancel"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Logout',
  components: {

  },
  data () {
    return {
      dialog: true,
      data: null
    }
  },
  mounted () {
    const _t = this.$t('logout.data') || null
    if (_t) {
      this.data = _t
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog')
    },
    confirm () {
      this.closeDialog()
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card__actions{
  justify-content: flex-end !important;
}
</style>
