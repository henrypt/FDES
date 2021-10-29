<template>
  <div class="CategoryList">
    <div class="category-box">
      <div class="list-title">
        {{ c_title }}
      </div>
      <div ref="wrapper" class="list-wrapper">
        <ul ref="ulBox" class="list-content" :style="{ width: W }">
          <li v-for="(item, n) in list" :key="n" class="list-item">
            <v-chip
              small
              value
              :class="{ 'v-chip--active': item.selected }"
              :color="chip_color"
              :text-color="text_color"
              @click.prevent="ChipToggle(item, list)"
            >
              <router-link v-if="item.to" :to="item.to">
                {{ item.name }}
              </router-link>

              <label v-else>
                {{ item.name }}
              </label>
            </v-chip>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'CategoryList',
  props: {
    title: { type: String, default: '' },
    list: { type: Array, default: null },
    fresh: { type: [String, Boolean], default: false }
  },
  data () {
    return {
      c_title: '',
      c_list: [],

      chip_color: '',
      text_color: ''
    }
  },
  computed: {
    W () {
      return 100 + (this.list.length - 4) * 25 + '%'
    }
  },
  created () {
    this.c_title = this.title
    this.c_list = this.list
  },
  mounted () {
    const options = {
      scrollX: true,
      scrollY: false,
      mouseWheel: false,
      click: true,
      taps: true
    }

    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, options)
      }
    })
  },
  methods: {
    ChipToggle (item, list) {
      for (const c in list) {
        list[c].selected = false
      }
      item.selected = true

      this.$emit(
        'changeIndex',
        list.findIndex(i => i.id === item.id),
        item.fresh
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.CategoryList{
  .category-box{
    display:flex;
    .list-title{
      flex-basis: auto;
      white-space: nowrap;
      height: 32px;
      line-height: 32px;
    }
    .list-wrapper{
      position:relative;
      width: 100%;
      overflow: hidden;

      .list-content{
        min-width: 101%;
        height: 32px;
        line-height: 32px;
        list-style: none;
        padding: 0;
        white-space: nowrap;
        .list-item{
          width: auto;
          display: inline;
          float: left;
          margin: 0;
          .v-chip--active{
            background-color: #ee8d25 !important;
          }
        }
      }
    }
  }
}
</style>
