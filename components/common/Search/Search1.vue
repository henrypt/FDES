<template>
  <div class="search">
    <v-text-field
      outlined
      placeholder="search info"
      label="Searching"
    />
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.search >>> .v-input__control{
  height: 0.65rem;
}

@media (min-width: 1200.00001px){
  .search >>> .v-input__control{
    height: 0.5rem;
  }
}
</style>
