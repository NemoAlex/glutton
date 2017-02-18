<style src="../assets/modal.sass" lang="sass"></style>
<style scoped lang="sass">
@import "../assets/variables.sass"
.subtitle-modal
  .content
    .vender
      margin-top: 10px
      color: $color-grey-1
      text-align: right
      font-size: 13px
      a
        margin-left: 4px
    .subtitles
      max-height: 300px
      overflow: auto
    .not-found
      margin-bottom: 10px
</style>

<template lang="jade">
modal.subtitle-modal(:showing.sync="showing")
  .header
    .container SUBTITLES
    .close(@click="showing = false")
  .content
    .container
      .subtitles(v-if="!searching && subtitles.length")
        subtitle-line(v-for="subtitle in subtitles", :subtitle.sync="subtitle", :file-path="filePath")
      .loading(v-if="searching") Searching...
      div(v-if="!searching && !subtitles.length")
        .not-found No results found.
        btn.try-again(@click="searchForMore") Try Again
      .vender Provided by
        a(:href="searchLink", target="_blank") {{serviceName}}
</template>

<script>
import Modal from './modal.vue'
import SubtitleLine from './subtitle-line.vue'
import * as subtitleService from '../services/subtitle.shooter_fake'
import * as util from '../services/util'
import Btn from './btn.vue'

export default {
  data () {
    return {
      name: '',
      serviceName: subtitleService.name,
      showing: false,
      subtitles: [],
      searching: false,
      filePath: '',
      download: null
    }
  },
  components: {
    Modal,
    SubtitleLine,
    Btn
  },
  computed: {
    title: function () {
      let title = this.name.match(/.*(?=.\b\d{3,4}p)/i)
      return title ? title[0] : this.name
    },
    searchLink: function () {
      return subtitleService.searchLink(this.title)
    }
  },
  events: {
    searchSubtitle: function (download) {
      this.searchForSubtitle(download)
      this.download = download
    },
    closeWindow: function () {
      this.showing = false
    }
  },
  methods: {
    searchForMore: function () {
      this.searchForSubtitle(this.download, true)
    },
    searchForSubtitle: function (download, searchMore) {
      this.name = download.bittorrent ? download.bittorrent.info.name : util.getEntryFileName(download)
      this.filePath = util.getFilePath(download.files[0].path)
      this.subtitles = []
      this.searching = true
      this.showing = true
      subtitleService.search(this.title, searchMore)
      .then(subs => {
        this.subtitles = subs
        this.searching = false
      })
    }
  }
}
</script>
