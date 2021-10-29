<script>
import './style.css'

const grids = new Array(8).fill(1).map((_, r) => {
  return new Array(8).fill(1).map((_, c) => {
    return {
      key: `key-${r * 8 + c}`,
      ok: false
    }
  })
})

export default {
  layout: 'test',
  data () {
    return {
      title: 'Eight Queen',
      grids
    }
  },
  render (createElement) {
    return (
      <div>
        <div class="grid">
          <span class="title">{this.title}</span>
          {
            this.grids.map((row) => {
              return <div class="row">
                {
                  row.map((col, idx) => {
                    return <div class="cell"></div>
                  })
                }
              </div>
            })
          }
        </div>
      </div>
    )
  }
}
</script>
