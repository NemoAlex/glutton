<template lang="jade">
.download(:class="{selected: selected}")
  .container
    .inner
      circle-progress(:progress="progress", :status="download.status")
      .right-part
        .name
          | {{name}}
        .status
          span(v-if="download.errorMessage") {{download.errorMessage}}
          span(v-if="!download.errorMessage")
            span.removed(v-if="download.status === 'removed'") Removed
            span.size(v-if="download.totalLength !== '0'") {{size}}
            span.speed(v-if="isDownloading") {{downloadSpeed}}
            span.speed.upload(v-if="isUploading") {{uploadSpeed}}
            span.eta(v-if="isDownloading") ETA: {{eta}}
        btf(v-if="download.status === 'active'", :num-pieces="download.numPieces", :bitfield="download.bitfield")
        btn.search-subtitle(v-if="$root.config.enableSubtitleFeatures", @mousedown.stop.prevent="", @click="searchSubtitle(download)", passive, title="Search Subtitles")
</template>
<script>
import CircleProgress from './circle-progress.vue'
import * as util from '../services/util'
import * as moment from 'moment'
import Btn from './btn.vue'
import Btf from './bitfield.vue'

export default {
  props: ['download', 'selected'],
  computed: {
    eta: function () {
      var seconds = (this.download.totalLength - this.download.completedLength) / this.download.downloadSpeed
      return moment.duration(seconds, 'seconds').humanize()
    },
    name: function () {
      return util.getEntryFileName(this.download)
    },
    progress: function () {
      return this.download.totalLength === '0' ? 0 : this.download.completedLength / this.download.totalLength
    },
    size: function () {
      return util.bytesToSize(this.download.totalLength)
    },
    isDownloading: function () {
      return this.download.status === 'active' && this.download.downloadSpeed !== '0'
    },
    isUploading: function () {
      return this.download.status === 'active' && this.download.uploadSpeed !== '0'
    },
    downloadSpeed: function () {
      return util.bytesToSize(this.download.downloadSpeed) + '/s'
    },
    uploadSpeed: function () {
      return util.bytesToSize(this.download.uploadSpeed) + '/s'
    }
  },
  methods: {
    searchSubtitle: function () {
      this.$dispatch('searchSubtitle', this.download)
    }
  },
  components: {
    CircleProgress,
    Btn,
    Btf
  }
}
</script>
