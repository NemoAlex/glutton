<style scoped lang="sass?indentedSyntax">
@import "../assets/variables.sass"
.download-list
  height: 100%
  padding-top: 5.6rem
  margin-top: -5.6rem
  background: $color-grey-1
  .list
    -webkit-user-select: none
    .download
      height: 5rem
      // border-bottom: 1px solid $color-white
      background: $color-white
      &:nth-child(even)
        background: white
      &.selected
        background: $color-grey-3
      .container
        height: 100%
        .inner
          padding-left: 2.9rem
          position: relative
          height: 100%
          .circle-progress
            position: absolute
            left: 0
            top: 1.5rem
          .right-part
            height: 100%
            position: relative
            overflow: hidden
            .name
              position: absolute
              left: 0
              bottom: 50%
              font-size: 1.4rem
              line-height: 1.8rem
              -webkit-user-select: initial
            .status
              position: absolute
              left: 0
              top: 50%
              color: $color-grey-1
              font-weight: 400
              font-size: 1.2rem
              line-height: 1.5rem


</style>

<template lang="jade">
.download-list(@click.self="clearSelected", @keyup.enter="clearSelected")
  .list
    .download(v-for="download in list", track-by="gid", :class="{selected: ~selected.indexOf(download.gid)}", @click="select(download.gid, $event)")
      .container
        .inner
          circle-progress(:progress="download.completedLength / download.totalLength", :status="download.status")
          .right-part
            .name {{util.getFileName(download.files[0].path)}}
            .status
              span.size
                |{{util.bytesToSize(download.totalLength)}}

</template>

<script>
import * as rpc from '../services/rpc'
import * as util from '../services/util'
import * as config from 'json!../config.json'
import { concat } from 'lodash'
import CircleProgress from './circle-progress.vue'

export default {
  data () {
    return {
      list: [],
      selected: [],
      util: util
    }
  },
  computed: {
    gids: function () {
      return this.list.map(function (download) {
        return download.gid
      })
    }
  },
  methods: {
    fetch: function () {
      var self = this
      rpc.multicall({
        'aria2.tellActive': [],
        'aria2.tellWaiting': [0, 1000],
        'aria2.tellStopped': [0, 1000]
      })
      .then(function (result) {
        self.list = concat(...result)
      })
    },
    select: function (gid, e) {
      if (e.ctrlKey || e.metaKey || e.shiftKey) this.selected.push(gid)
      else this.selected = [ gid ]
      if (e.shiftKey && this.selected.length) {
        let first = this.selected[0]
        let last = this.selected[this.selected.length - 1]
        let args = [this.gids.indexOf(first), this.gids.indexOf(last)]
        if (args[0] > args[1]) args.reverse()
        this.selected = this.gids.slice(args[0], args[1] + 1)
      }
    },
    clearSelected: function (e) {
      this.selected = []
    }
  },
  ready: function () {
    this.fetch()
    setInterval(this.fetch, config.fetchTime)
  },
  components: {
    CircleProgress
  }
}
</script>
