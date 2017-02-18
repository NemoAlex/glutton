<style scoped lang="sass">
@import "../assets/variables.sass"
.status-bar
  height: 32px
  line-height: 32px
  background: $color-white
  position: relative
  border-bottom: 01px solid #F7F7F7
  font-size: 12px
  input
    height: 22px
    padding-left: 06px
    width: 140px
  .order
    padding-left: 15px
  .status
    position: absolute
    right: 15px
    top: 0
    font-size: 12px
    .speed
      margin-left: 8px
      padding-left: 15px
      background: url(../assets/icon-download.svg) 03px 03px no-repeat
      &.upload
        background-image: url(../assets/icon-upload.svg)

</style>

<template lang="jade">
.status-bar
  .container
    input(type="text", placeholder="Filter", v-model="filter")
    span.order Order by: 
      select(v-model="orderBy")
        option(v-for="option in orderOptions" v-bind:value="option.value") {{option.text}}
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
      util: util,
      orderOptions: [
        {text: 'Size', value: 'size'},
        {text: 'Name', value: 'name'}
      ]
    }
  },
  props: {
    downloadSpeed: {
      type: Number,
      default: 0
    },
    uploadSpeed: {
      type: Number,
      default: 0
    },
    filter: {
      type: String,
      default: ''
    },
    orderBy: {
      type: String,
      default: ''
    }
  },
  methods: {

  }
}
</script>
