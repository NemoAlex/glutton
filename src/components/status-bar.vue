<style scoped lang="sass?indentedSyntax">
@import "../assets/variables.sass"
.status-bar
  height: 3.2rem
  line-height: 3.2rem
  background: $color-white
  position: relative
  border-bottom: 0.1rem solid #F7F7F7
  font-size: 1.2rem
  input
    height: 2.2rem
    padding-left: 0.6rem
    width: 14rem
  .status
    position: absolute
    right: 1.5rem
    top: 0
    font-size: 1.2rem
    .speed
      margin-left: 0.8rem
      padding-left: 1.5rem
      background: url(../assets/icon-download.svg) 0.3rem 0.3rem no-repeat
      &.upload
        background-image: url(../assets/icon-upload.svg)

</style>

<template lang="jade">
.status-bar
  .container
    input(type="text", placeholder="Filter", v-model="filter")
    .status
      span.speed
        |{{util.bytesToSize(downloadSpeed)}}/s
      span.speed.upload
        |{{util.bytesToSize(uploadSpeed)}}/s
</template>

<script>
import * as util from '../services/util'

export default {
  data () {
    return {
      util: util
    }
  },
  props: {
    downloadSpeed: 0,
    uploadSpeed: 0,
    filter: ''
  },
  methods: {

  }
}
</script>
