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
      padding: 0 6px
      height: 30px
      line-height: 30px
      background: $color-primary
      margin: 6px 10px 0 0
      color: white
      border-radius: 4px
      text-decoration: none
      &:hover
        background-color: $color-hover
      &:active
        background-color: $color-active
      &.all
        padding-left: 22px
        background-image: url(../assets/icon_file_zip.svg)
        background-position: 6px center
        background-repeat: no-repeat
        background-color: $color-blue
        &:hover
          background-color: $color-blue-dim
        &:active
          background-color: $color-blue-dark
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
    a.file(v-for="(i, file) in files", :href="file.url", target="_blank") {{displayNames.diff[i]}}
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
    subtitle: Object
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
