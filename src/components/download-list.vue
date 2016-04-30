<style lang="sass">
@import "../assets/variables.sass"
.download-list
  user-select: none
  .download
    height: 50px
    white-space: nowrap
    cursor: default
    background: $color-white
    position: relative
    &:nth-child(odd)
      background: white
    &.selected
      &:after
        content: ""
        display: block
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 51px
        background: rgba(43, 177, 37, 0.2)
        border: 1px solid $color-dim
        border-width: 1px 0
        box-sizing: border-box
        z-index: 10
    .container
      height: 100%
      .inner
        padding-left: 29px
        padding-right: 34px
        position: relative
        height: 100%
        .circle-progress
          position: absolute
          left: 0
          top: 15px
        .right-part
          height: 100%
          position: relative
          .name
            position: absolute
            left: 0
            bottom: 50%
            width: 100%
            overflow: hidden
            text-overflow: ellipsis
            font-size: 14px
            line-height: 18px
          .status
            position: absolute
            left: 0
            top: 50%
            color: $color-grey-1
            font-weight: 400
            font-size: 12px
            line-height: 15px
            span
              margin-right: 6px
            .speed
              padding-left: 15px
              background: url(../assets/icon-download.svg) 3px 3px no-repeat
              color: $color-primary
              &.upload
                background-image: url(../assets/icon-upload.svg)
          .search-subtitle
            position: absolute
            right: -34px
            top: 13px
            height: 24px
            width: 24px
            line-height: 24px
            padding: 0
            text-align: center
            z-index: 11
            background-image: url(../assets/icon_search_subtitles.svg)
            background-repeat: no-repeat
            background-position: center
</style>

<template lang="jade">
.download-list(@click.self="clearSelected")
  download-line(v-for="download in list", track-by="gid", :download="download", :selected="~selected.indexOf(download.gid)", @mousedown="select(download.gid, $event)", v-touch:doubletap="startOrPause(download)")

</template>

<script>
import DownloadLine from './download-line.vue'

export default {
  props: {
    list: Array,
    selected: Array
  },
  computed: {
    gids: function () {
      return this.list.map(download => download.gid)
    }
  },
  methods: {
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
    startOrPause: function (download) {
      if (download.status === 'paused') this.$dispatch('startSelectedDownloads')
      else if (download.status === 'active') this.$dispatch('pauseSelectedDownloads')
    },
    clearSelected: function (e) {
      this.selected = []
    },
    searchSubtitle: function (download) {
      this.$dispatch('searchSubtitle', download)
    }
  },
  components: { DownloadLine }
}
</script>
