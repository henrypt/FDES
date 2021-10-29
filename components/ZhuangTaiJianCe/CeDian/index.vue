<template>
  <v-badge
    v-if="d && !!d.id"
    left
    offset-x="88"
    overlap
    :color="d.grade.status"
    :content="d.grade.content"
    class="caption"
  >
    <v-btn-toggle v-model="selectedItems" multiple active-class="primary">
      <v-menu open-on-hover right offset-x open-delay="1200">
        <template #activator="{ on }">
          <v-btn
            outlined
            depressed
            small
            :color="d.grade.status"
            :title="d.grade.content"
            :value="d.id"
            v-on="on"
          >
            {{ d.value }}
          </v-btn>
        </template>

        <v-card dense class="mx-auto">
          <v-list-item
            v-for="item in popDetails"
            :key="item.name"
            two-line
            dense
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.name" />
              <v-list-item-subtitle v-text="item.content" />
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-menu>
    </v-btn-toggle>
  </v-badge>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'CeDian',
  components: {

  },
  model: {
    prop: 'msg',
    event: 'vModel'
  },
  props: {
    msg: {
      type: null,
      default: null,
      required: false
    },
    node: {
      type: Object,
      default: null,
      required: true
    }
  },
  data () {
    return {
      d: null,
      selectedItems: [],
      popDetails: [
        { name: 'name1', content: '11111' },
        { name: 'name2', content: '11111' },
        { name: 'name3', content: '11111' },
        { name: 'name4', content: '11111' },
        { name: 'name5', content: '11111' }
      ]
    }
  },
  watch: {
    selectedItems (val) {
      if (this.msg) {
        let arr = Array.from(this.msg)
        const id = val[0]
        if (id) { // add
          arr.push(id)
          arr = Array.from(new Set(arr))
        } else { // remove
          arr.splice(arr.indexOf(id), 1)
        }

        this.$emit('vModel', arr)
      }
    }
  },
  mounted () {
    this.d = this.node // { id: '1009', name:'055MT', val:'47.2', grade: { id: '', class: 0, status: '', content: ''} },
    this.selectedItems = this.msg
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped></style>
