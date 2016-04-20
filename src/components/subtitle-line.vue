<style scoped lang="sass">
@import "../assets/variables.sass"
.subtitle
  padding: 10px
  background: $color-white
  margin-bottom: 4px
  border-radius: 2px
  &:hover
    background-color: $color-grey-4
  .panel
    cursor: pointer
    padding-right: 30px
    position: relative
    .icon
      position: absolute
      right: 6px
      top: 50%
      margin-top: -4px
      &.extended
        transform: rotate(-90deg)
    .name, .release-site
      white-space: nowrap
      text-overflow: ellipsis
      overflow: hidden
    .release-site, .desc
      display: inline-block
      font-size: 13px
      background: $color-grey-1
      color: white
      padding: 2px 6px
      border-radius: 3px
      margin-top: 4px
      vertical-align: top
      margin-right: 10px
    .desc
      background: $color-grey-2
  .files
    margin-top: 2px
    .file
      display: inline-block
      height: 30px
      margin: 6px 10px 0 0
      border-radius: 3px
      overflow: hidden
      color: white
      line-height: 30px
      &.all
        padding-left: 28px
        padding-right: 8px
        background: url(../assets/icon_file_zip.svg) 10px center no-repeat $color-blue
        &:hover
          background-color: $color-blue-dim
        &:active
          background-color: $color-blue-dark
      .btn-s
        display: inline-block
        height: 30px
        vertical-align: top
        line-height: 30px
        color: white
        background-color: $color-primary
        cursor: pointer
        &.to-server
          padding: 0 8px 0 28px
          background-image: url(../assets/icon_cloud.svg)
          background-position: 8px center
          background-repeat: no-repeat
        &.to-client
          display: inline-block
          width: 28px
          background-image: url(../assets/icon_download.svg)
          background-position: 8px center
          background-repeat: no-repeat
          background-color: $color-hover
        &:hover
          background-color: $color-active
  .loading
    margin-top: 10px
</style>

<template lang="jade">
.subtitle
  .panel(@click="showDetail()")
    .name(:title="name") {{name}}
    .release-site(v-show="subtitle.release_site") {{subtitle.release_site}}
    .desc(v-show="subtitle.lang.desc") {{subtitle.lang.desc}}
    img.icon(src="../assets/icon_caret.svg", :class="{extended: extended}")
  .files.group(v-show="extended && !loading")
    .file(v-for="(i, file) in files", )
      .btn-s.to-server(title="Download to Server", @click="downloadSubtitleOnServer(file)") {{displayNames.diff[i]}}
      a.btn-s.to-client(title="Download to Browser", :href="file.url", target="_blank")
    br
    a.file.all(:href="details.url", target="_blank") Download as .zip
  .loading(v-show="loading") Loading...
</template>

<script>
import * as subtitleService from '../services/subtitle.shooter_fake'
import * as util from '../services/util'

export default {
  data () {
    return {
      extended: false,
      loading: false,
      details: {}
    }
  },
  props: {
    subtitle: Object,
    filePath: String
  },
  methods: {
    showDetail: function () {
      this.extended = !this.extended
      if (this.files.length) return
      this.loading = true
      subtitleService.detail(this.subtitle.id)
      .then(result => {
        this.loading = false
        this.details = result
      })
    },
    downloadSubtitleOnServer: function (file) {
      this.$dispatch('addUriDownloads', {
        uris: [file.url],
        options: {
          'dir': this.filePath
        }
      })
      this.$dispatch('closeWindow')
    }
  },
  computed: {
    name: function () {
      return this.subtitle.native_name || this.subtitle.videoname
    },
    files: function () {
      return this.details.filelist || []
    },
    displayNames: function () {
      var names = this.files.map(file => file.f)
      return util.findDiff(names)
    }
  }
}
</script>
