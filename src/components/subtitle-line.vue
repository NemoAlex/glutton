<style scoped lang="sass">
@import "../assets/variables.sass"
.subtitle
  padding: 10px
  background: $color-white
  margin: 3px 0
  border-radius: 2px
  .panel
    cursor: pointer
    padding-right: 30px
    position: relative
    .icon
      position: absolute
      right: 6px
      top: 16px
      &.extended
        transform: rotate(-90deg)
    .name, .release-site
      white-space: nowrap
      text-overflow: ellipsis
      overflow: hidden
    .release-site
      font-size: 13px
  .files
    margin-top: 10px
    .file
      display: inline-block
      padding: 0 6px
      height: 30px
      line-height: 30px
      background: $color-primary
      margin: 0 10px 10px 0
      color: white
      border-radius: 4px
      text-decoration: none
</style>

<template lang="jade">
.subtitle
  .panel(@click="showDetail()")
    .name(:title="subtitle.native_name") {{subtitle.native_name}}
    .release-site {{subtitle.release_site}}
    img.icon(src="../assets/icon_caret.svg", :class="{extended: extended}")
  .files.group(v-show="extended")
    a.file(v-for="(i, file) in files", :href="file.url", target="_blank") {{displayNames.diff[i]}}
</template>

<script>
import btn from './btn.vue'
import * as subtitleService from '../services/subtitle.shooter_fake'
import * as util from '../services/util'

export default {
  data () {
    return {
      extended: false
    }
  },
  props: {
    subtitle: Object
  },
  methods: {
    showDetail: function () {
      this.extended = !this.extended
      if (this.files.length) return
      subtitleService.detail(this.subtitle.id)
      .then(result => {
        this.subtitle = Object.assign(this.subtitle, result)
      })
    }
  },
  computed: {
    files: function () {
      return this.subtitle.filelist || []
    },
    displayNames: function () {
      var names = this.files.map(file => file.f)
      return util.findDiff(names)
    }
  },
  components: {
    btn
  }
}
</script>
